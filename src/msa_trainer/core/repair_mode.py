"""Repair mode for error-driven learning.

Implements the repair mode algorithm from docs/ALGORITHM.md.
"""

import random
from dataclasses import dataclass
from typing import Optional

from msa_trainer.core.constants import REPAIR_SAME_TOPIC_COUNT, REPAIR_TRANSFER_COUNT
from msa_trainer.core.models import Question, RepairQueue
from msa_trainer.persistence.repositories.question_repo import QuestionRepository
from msa_trainer.persistence.repositories.topic_repo import TopicRepository


@dataclass
class RepairModeState:
    """Extended repair mode state for session tracking."""

    queue: RepairQueue
    is_active: bool = True
    questions_answered: int = 0


class RepairModeManager:
    """Manages repair mode state during training sessions.

    Repair Mode (from ALGORITHM.md):
    - Activated on incorrect answer
    - Queue: 2 same-topic questions (difficulty <= current), then 1 transfer question
    - Transfer question uses parent_id topic (or same topic if no parent)
    - Exit when transfer question is correct
    - If transfer is wrong: stay in repair, decrease difficulty by 1, repeat
    """

    def __init__(
        self,
        topic_repo: TopicRepository,
        question_repo: QuestionRepository,
    ) -> None:
        self._topic_repo = topic_repo
        self._question_repo = question_repo

    def activate(self, topic_id: str, current_difficulty: int) -> RepairQueue:
        """
        Create a new repair queue after an incorrect answer.

        Args:
            topic_id: The topic where the error occurred
            current_difficulty: The difficulty of the failed question

        Returns:
            New RepairQueue ready for processing
        """
        # Find transfer topic (parent or same)
        topic = self._topic_repo.get_by_id(topic_id)
        transfer_topic_id = topic.parent_id if topic and topic.parent_id else topic_id

        return RepairQueue(
            topic_id=topic_id,
            current_difficulty=current_difficulty,
            same_topic_remaining=REPAIR_SAME_TOPIC_COUNT,
            transfer_pending=True,
            transfer_topic_id=transfer_topic_id,
        )

    def get_next_question(
        self,
        queue: RepairQueue,
        rng: Optional[random.Random] = None,
    ) -> Optional[Question]:
        """
        Get the next question from the repair queue.

        Args:
            queue: Current repair queue state
            rng: Optional random generator for deterministic selection

        Returns:
            Next Question, or None if queue is empty
        """
        if rng is None:
            rng = random.Random()

        if queue.same_topic_remaining > 0:
            # Same-topic questions with difficulty <= current
            return self._select_question(
                queue.topic_id,
                max_difficulty=queue.current_difficulty,
                rng=rng,
            )
        elif queue.transfer_pending:
            # Transfer question from parent topic
            # Difficulty at or +1 from current
            transfer_diff = min(5, queue.current_difficulty + 1)
            return self._select_question(
                queue.transfer_topic_id,
                max_difficulty=transfer_diff,
                min_difficulty=queue.current_difficulty,
                rng=rng,
            )

        return None

    def on_answer(
        self,
        queue: RepairQueue,
        is_correct: bool,
        was_transfer: bool,
    ) -> tuple[RepairQueue, bool]:
        """
        Update queue state after an answer.

        Args:
            queue: Current repair queue
            is_correct: Whether the answer was correct
            was_transfer: Whether this was the transfer question

        Returns:
            Tuple of (updated_queue, should_exit_repair_mode)
        """
        if was_transfer:
            if is_correct:
                # Transfer correct - exit repair mode
                return queue, True
            else:
                # Transfer incorrect - stay in repair, decrease difficulty, restart
                new_difficulty = max(1, queue.current_difficulty - 1)
                new_queue = RepairQueue(
                    topic_id=queue.topic_id,
                    current_difficulty=new_difficulty,
                    same_topic_remaining=REPAIR_SAME_TOPIC_COUNT,
                    transfer_pending=True,
                    transfer_topic_id=queue.transfer_topic_id,
                )
                return new_queue, False
        else:
            # Same-topic question answered
            new_queue = RepairQueue(
                topic_id=queue.topic_id,
                current_difficulty=queue.current_difficulty,
                same_topic_remaining=queue.same_topic_remaining - 1,
                transfer_pending=queue.transfer_pending,
                transfer_topic_id=queue.transfer_topic_id,
            )
            return new_queue, False

    def is_transfer_question(self, queue: RepairQueue) -> bool:
        """Check if the next question should be a transfer question."""
        return queue.same_topic_remaining == 0 and queue.transfer_pending

    def _select_question(
        self,
        topic_id: str,
        max_difficulty: int,
        min_difficulty: int = 1,
        rng: Optional[random.Random] = None,
    ) -> Optional[Question]:
        """Select a question from the topic within difficulty range."""
        if rng is None:
            rng = random.Random()

        questions = self._question_repo.get_by_topic_and_difficulty(
            topic_id, min_difficulty, max_difficulty
        )

        if not questions:
            # Fallback: get any question from topic
            questions = self._question_repo.get_by_topic(topic_id)

        if not questions:
            return None

        return rng.choice(questions)
