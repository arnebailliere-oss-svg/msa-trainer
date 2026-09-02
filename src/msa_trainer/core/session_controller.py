"""Training session controller.

Orchestrates training sessions, coordinating between engines.
"""

import random
import time
import uuid
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Optional

from msa_trainer.core.enums import QuestionType, SessionState, Subject, TrainingMode
from msa_trainer.core.evaluators.base import BaseEvaluator
from msa_trainer.core.evaluators.cloze_evaluator import ClozeEvaluator
from msa_trainer.core.evaluators.match_evaluator import MatchEvaluator
from msa_trainer.core.evaluators.mcq_evaluator import MCQEvaluator
from msa_trainer.core.evaluators.short_evaluator import ShortEvaluator
from msa_trainer.core.mastery_engine import MasteryEngine
from msa_trainer.core.models import (
    Attempt,
    AttemptResult,
    MasteryState,
    Question,
    RenderedQuestion,
    RepairQueue,
    SessionStats,
    User,
)
from msa_trainer.core.repair_mode import RepairModeManager
from msa_trainer.core.selection_engine import SelectionEngine
from msa_trainer.core.variant_generator import VariantGenerator
from msa_trainer.persistence.repositories.attempt_repo import AttemptRepository
from msa_trainer.persistence.repositories.mastery_repo import MasteryRepository
from msa_trainer.persistence.repositories.question_repo import QuestionRepository


# Evaluator registry
EVALUATORS: dict[QuestionType, type[BaseEvaluator]] = {
    QuestionType.MCQ: MCQEvaluator,
    QuestionType.CLOZE: ClozeEvaluator,
    QuestionType.MATCH: MatchEvaluator,
    QuestionType.SHORT: ShortEvaluator,
}


@dataclass
class SessionContext:
    """Holds the current session state."""

    user: User
    subject: Subject
    mode: TrainingMode
    target_questions: int
    questions_answered: int = 0
    correct_count: int = 0
    total_time_ms: int = 0
    topics_practiced: set[str] = field(default_factory=set)
    state: SessionState = SessionState.IDLE
    current_question: Optional[RenderedQuestion] = None
    question_start_time: Optional[float] = None
    repair_queue: Optional[RepairQueue] = None
    rng: random.Random = field(default_factory=random.Random)


class SessionController:
    """Main controller for training sessions."""

    def __init__(
        self,
        user: User,
        subject: Subject,
        mode: TrainingMode,
        selection_engine: SelectionEngine,
        mastery_engine: MasteryEngine,
        repair_manager: RepairModeManager,
        variant_generator: VariantGenerator,
        attempt_repo: AttemptRepository,
        mastery_repo: MasteryRepository,
        question_repo: QuestionRepository,
        seed: Optional[int] = None,
    ) -> None:
        self._user = user
        self._subject = subject
        self._mode = mode
        self._selection_engine = selection_engine
        self._mastery_engine = mastery_engine
        self._repair_manager = repair_manager
        self._variant_generator = variant_generator
        self._attempt_repo = attempt_repo
        self._mastery_repo = mastery_repo
        self._question_repo = question_repo

        # Session state
        self._context: Optional[SessionContext] = None

        # For deterministic testing
        self._seed = seed

    @property
    def state(self) -> SessionState:
        """Get current session state."""
        return self._context.state if self._context else SessionState.IDLE

    @property
    def current_question(self) -> Optional[RenderedQuestion]:
        """Get current question being displayed."""
        return self._context.current_question if self._context else None

    @property
    def progress(self) -> tuple[int, int]:
        """Get (answered, total) progress."""
        if not self._context:
            return (0, 0)
        return (self._context.questions_answered, self._context.target_questions)

    @property
    def is_in_repair_mode(self) -> bool:
        """Check if currently in repair mode."""
        return self._context is not None and self._context.repair_queue is not None

    def start(self, question_count: int = 10) -> Optional[RenderedQuestion]:
        """
        Initialize session and return first question.

        Args:
            question_count: Target number of questions for the session

        Returns:
            First RenderedQuestion, or None if no questions available
        """
        rng = random.Random(self._seed) if self._seed else random.Random()

        self._context = SessionContext(
            user=self._user,
            subject=self._subject,
            mode=self._mode,
            target_questions=question_count,
            rng=rng,
        )

        self._context.state = SessionState.SHOWING_QUESTION
        return self._select_next_question()

    def submit_answer(self, user_answer: Any) -> Optional[AttemptResult]:
        """
        Evaluate answer, log attempt, update mastery.

        Args:
            user_answer: The user's submitted answer

        Returns:
            AttemptResult with evaluation details, or None if session not active
        """
        if not self._context or not self._context.current_question:
            return None

        question = self._context.current_question

        # Calculate response time
        response_time_ms = 0
        if self._context.question_start_time:
            response_time_ms = int(
                (time.time() - self._context.question_start_time) * 1000
            )

        # Evaluate answer
        evaluator = EVALUATORS[question.qtype]()
        is_correct, correct_answer, normalized_answer = evaluator.evaluate(
            question, user_answer
        )

        # Get current mastery state
        mastery = self._mastery_repo.get_or_create(
            self._user.id, question.topic_id
        )

        # Calculate new mastery
        new_mastery = self._mastery_engine.update(
            mastery, is_correct, question.difficulty, response_time_ms
        )
        mastery_delta = new_mastery.mastery_score - mastery.mastery_score

        # Create and persist attempt
        attempt = Attempt(
            id=str(uuid.uuid4()),
            user_id=self._user.id,
            question_id=question.base_question_id,
            variant_id=question.variant_id,
            topic_id=question.topic_id,
            is_correct=is_correct,
            response_time_ms=response_time_ms,
            answer_json={
                "variant_id": question.variant_id,
                "base_question_id": question.base_question_id,
                "rendered_vars": question.rendered_vars,
                "user_answer": str(user_answer),
                "normalized_answer": normalized_answer,
                "is_correct": is_correct,
            },
            created_at=datetime.now(),
        )
        self._attempt_repo.create(attempt)

        # Update mastery in database
        self._mastery_repo.upsert(new_mastery)

        # Update session stats
        self._context.questions_answered += 1
        self._context.total_time_ms += response_time_ms
        self._context.topics_practiced.add(question.topic_id)
        if is_correct:
            self._context.correct_count += 1

        # Handle repair mode
        if self._context.repair_queue:
            # In repair mode - process answer
            was_transfer = self._repair_manager.is_transfer_question(
                self._context.repair_queue
            )
            self._context.repair_queue, should_exit = self._repair_manager.on_answer(
                self._context.repair_queue, is_correct, was_transfer
            )
            if should_exit:
                self._context.repair_queue = None
        elif not is_correct:
            # Start repair mode on wrong answer
            self._context.repair_queue = self._repair_manager.activate(
                question.topic_id, question.difficulty
            )

        # Update state
        self._context.state = SessionState.SHOWING_FEEDBACK

        return AttemptResult(
            is_correct=is_correct,
            explanation=question.explanation,
            correct_answer=correct_answer,
            mastery_delta=mastery_delta,
            new_mastery_score=new_mastery.mastery_score,
        )

    def next_question(self) -> Optional[RenderedQuestion]:
        """
        Advance to next question.

        Returns:
            Next RenderedQuestion, or None if session complete
        """
        if not self._context:
            return None

        # Check if session should end
        if self._context.questions_answered >= self._context.target_questions:
            self._context.state = SessionState.COMPLETED
            return None

        self._context.state = SessionState.SHOWING_QUESTION
        return self._select_next_question()

    def get_session_stats(self) -> Optional[SessionStats]:
        """Get summary statistics for the session."""
        if not self._context:
            return None

        # Find strengthened and weak topics
        strengthened: list[str] = []
        weak: list[str] = []

        for topic_id in self._context.topics_practiced:
            mastery = self._mastery_repo.get_by_user_topic(self._user.id, topic_id)
            if mastery:
                ampel = self._mastery_engine.get_ampel_for_state(mastery)
                if ampel.value == "GREEN":
                    strengthened.append(topic_id)
                elif ampel.value == "RED":
                    weak.append(topic_id)

        return SessionStats(
            total_questions=self._context.questions_answered,
            correct_count=self._context.correct_count,
            incorrect_count=self._context.questions_answered - self._context.correct_count,
            total_time_ms=self._context.total_time_ms,
            topics_practiced=list(self._context.topics_practiced),
            strengthened_topics=strengthened[:2],  # Top 2
            weak_topics=weak[:2],  # Top 2
        )

    def _select_next_question(self) -> Optional[RenderedQuestion]:
        """Select and render the next question."""
        if not self._context:
            return None

        question: Optional[Question] = None

        # Check if in repair mode
        if self._context.repair_queue:
            question = self._repair_manager.get_next_question(
                self._context.repair_queue, self._context.rng
            )

        # Normal selection if not in repair mode or no repair question found
        if question is None:
            question = self._select_normal_question()

        if question is None:
            self._context.state = SessionState.COMPLETED
            return None

        # Render with variants
        rendered = self._variant_generator.render_variant(
            question,
            self._user.id,
            self._mode,
        )

        self._context.current_question = rendered
        self._context.question_start_time = time.time()

        return rendered

    def _select_normal_question(self) -> Optional[Question]:
        """Select a question using the selection engine."""
        if not self._context:
            return None

        # Get topic priorities
        topics = self._selection_engine.select_topics(
            self._user.id,
            self._subject,
            self._mode,
            count=5,  # Select from top 5 topics
            rng=self._context.rng,
        )

        if not topics:
            return None

        # Select topic
        topic_id = self._context.rng.choice(topics)

        # Get mastery for difficulty selection
        mastery = self._mastery_repo.get_by_user_topic(self._user.id, topic_id)
        mastery_score = mastery.mastery_score if mastery else 0.0
        min_diff, max_diff = self._selection_engine.select_difficulty(mastery_score)

        # Get questions
        questions = self._question_repo.get_by_topic_and_difficulty(
            topic_id, min_diff, max_diff
        )

        if not questions:
            # Fallback to any question in topic
            questions = self._question_repo.get_by_topic(topic_id)

        if not questions:
            return None

        return self._context.rng.choice(questions)
