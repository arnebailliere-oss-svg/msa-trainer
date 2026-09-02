"""Main application window and initialization."""

import random
import uuid
from datetime import datetime
from pathlib import Path
from typing import Optional

from PySide6.QtWidgets import QApplication, QMainWindow, QMessageBox

from msa_trainer.content.importer import ContentImporter
from msa_trainer.core.enums import QuestionType, Subject, TrainingMode
from msa_trainer.core.models import Question, RenderedQuestion, SessionStats, User
from msa_trainer.persistence.database import Database
from msa_trainer.persistence.migrations import MigrationRunner
from msa_trainer.persistence.repositories.question_repo import QuestionRepository
from msa_trainer.persistence.repositories.user_repo import UserRepository
from msa_trainer.persistence.repositories.topic_repo import TopicRepository
from msa_trainer.persistence.repositories.mastery_repo import MasteryRepository
from msa_trainer.ui.router import Router
from msa_trainer.ui.styles import BASE_STYLESHEET
from msa_trainer.ui.views.start_view import StartView
from msa_trainer.ui.views.dashboard_view import DashboardView
from msa_trainer.ui.views.session_view import SessionView
from msa_trainer.ui.views.result_view import ResultView


class SimpleSession:
    """Simple session manager for training."""

    def __init__(self, questions: list[Question]) -> None:
        self.questions = questions
        self.current_index = 0
        self.correct_count = 0
        self.total_time_ms = 0
        self.topics: set[str] = set()

    @property
    def current_question(self) -> Optional[Question]:
        if self.current_index < len(self.questions):
            return self.questions[self.current_index]
        return None

    @property
    def progress(self) -> tuple[int, int]:
        return (self.current_index, len(self.questions))

    @property
    def is_complete(self) -> bool:
        return self.current_index >= len(self.questions)

    def render_current(self) -> Optional[RenderedQuestion]:
        """Convert current question to RenderedQuestion."""
        q = self.current_question
        if not q:
            return None

        self.topics.add(q.topic_id)

        return RenderedQuestion(
            base_question_id=q.id,
            variant_id=f"{q.id}_v1",
            subject=q.subject,
            topic_id=q.topic_id,
            difficulty=q.difficulty,
            qtype=q.qtype,
            prompt=q.prompt,
            payload=q.payload,
            solution=q.solution,
            explanation=q.explanation,
            rendered_vars={},
            image=q.image,
            image_region=q.image_region,
        )

    def advance(self) -> None:
        """Move to next question."""
        self.current_index += 1

    def record_answer(self, is_correct: bool) -> None:
        """Record an answer result."""
        if is_correct:
            self.correct_count += 1

    def get_stats(self) -> SessionStats:
        """Get session statistics."""
        return SessionStats(
            total_questions=self.current_index,
            correct_count=self.correct_count,
            incorrect_count=self.current_index - self.correct_count,
            total_time_ms=self.total_time_ms,
            topics_practiced=list(self.topics),
            strengthened_topics=[],
            weak_topics=[],
        )


class MainWindow(QMainWindow):
    """Main application window."""

    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("MSA Trainer Berlin")
        self.setMinimumSize(900, 700)

        # Session state
        self._current_user: Optional[User] = None
        self._session: Optional[SimpleSession] = None
        self._content_pack_path: Optional[Path] = None

        # Initialize database
        self._init_database()

        # Initialize router
        self.router = Router()
        self._register_views()
        self._connect_signals()

        # Set central widget
        self.setCentralWidget(self.router.widget)

        # Load initial data
        self._load_users()

        # Navigate to start screen
        self.router.navigate("start")

    def _init_database(self) -> None:
        """Initialize database connection and run migrations."""
        # Use app data directory for database
        db_path = Path.home() / ".msa_trainer" / "data.db"
        db_path.parent.mkdir(parents=True, exist_ok=True)

        self._db = Database(str(db_path))
        self._db.connect()
        MigrationRunner(self._db).run()

        # Initialize repositories
        self._user_repo = UserRepository(self._db)
        self._topic_repo = TopicRepository(self._db)
        self._mastery_repo = MasteryRepository(self._db)
        self._question_repo = QuestionRepository(self._db)

        # Import content packs if database is empty
        self._import_content_if_needed()

    def _import_content_if_needed(self) -> None:
        """Import content packs if database is empty or content pack has changed."""
        # Find content packs directory (always needed for image resolution)
        possible_paths = [
            Path(__file__).parent.parent.parent.parent / "content_packs" / "berlin_msa_v1",
            Path.cwd() / "content_packs" / "berlin_msa_v1",
        ]

        pack_dir = None
        for path in possible_paths:
            if path.exists() and (path / "pack_manifest.json").exists():
                pack_dir = path
                break

        # Store content pack path for image resolution
        if pack_dir:
            self._content_pack_path = pack_dir

        if not pack_dir:
            return

        # Check if import is needed
        importer = ContentImporter(self._db)
        pack_summary = importer.get_pack_summary(pack_dir)

        if not pack_summary.get("valid"):
            return

        # Get current database counts
        topics = self._topic_repo.get_all()
        questions = self._question_repo.get_all()

        # Re-import if pack has more content than database
        pack_topic_count = pack_summary.get("topic_count", 0)
        pack_question_count = pack_summary.get("question_count", 0)

        needs_import = (
            not topics or
            len(topics) < pack_topic_count or
            len(questions) < pack_question_count
        )

        if not needs_import:
            return

        # Import the content pack
        success, errors = importer.import_pack(pack_dir)

        if not success:
            error_msg = "\n".join(f"- {e.message}" for e in errors[:5])
            QMessageBox.warning(
                self,
                "Content Import",
                f"Fehler beim Importieren der Inhalte:\n{error_msg}",
            )
        else:
            QMessageBox.information(
                self,
                "Inhalte aktualisiert",
                f"Erfolgreich geladen:\n"
                f"- {pack_topic_count} Themen\n"
                f"- {pack_question_count} Fragen",
            )

    def _register_views(self) -> None:
        """Register all application views with the router."""
        self._start_view = StartView()
        self._dashboard_view = DashboardView()
        self._session_view = SessionView()
        self._result_view = ResultView()

        # Set content pack path for image resolution
        if self._content_pack_path:
            self._session_view.set_content_pack_path(self._content_pack_path)

        self.router.register("start", lambda: self._start_view)
        self.router.register("dashboard", lambda: self._dashboard_view)
        self.router.register("session", lambda: self._session_view)
        self.router.register("result", lambda: self._result_view)

    def _connect_signals(self) -> None:
        """Connect view signals to handlers."""
        # Start view signals
        self._start_view.profile_selected.connect(self._on_profile_selected)
        self._start_view.new_profile_requested.connect(self._on_new_profile)

        # Dashboard signals
        self._dashboard_view.quick_training_requested.connect(self._on_quick_training)
        self._dashboard_view.topic_training_requested.connect(self._on_topic_training)

        # Session signals
        self._session_view.exit_requested.connect(self._on_session_ended)
        self._session_view.answer_submitted.connect(self._on_answer_submitted)
        self._session_view.next_requested.connect(self._on_next_question)

        # Result signals
        self._result_view.continue_training.connect(self._on_continue_training)
        self._result_view.return_to_dashboard.connect(self._on_return_to_dashboard)

    def _load_users(self) -> None:
        """Load users and update start view."""
        users = self._user_repo.get_all()
        self._start_view.set_users(users)

    def _on_profile_selected(self, user_id: str) -> None:
        """Handle profile selection."""
        user = self._user_repo.get_by_id(user_id)
        if user:
            self._current_user = user
            self._dashboard_view.set_user(user)

            # Load topics and mastery states
            topics = self._topic_repo.get_all()
            self._dashboard_view.set_topics(topics)

            mastery_list = self._mastery_repo.get_by_user(user_id)
            mastery_states = {m.topic_id: m for m in mastery_list}
            self._dashboard_view.set_mastery_states(mastery_states)

            self.router.navigate("dashboard")

    def _on_new_profile(self, name: str) -> None:
        """Handle new profile creation."""
        user = User(
            id=str(uuid.uuid4()),
            name=name,
            created_at=datetime.now(),
        )
        self._user_repo.create(user)
        self._load_users()
        self._on_profile_selected(user.id)

    def _on_quick_training(self, subject: Subject) -> None:
        """Start quick training session."""
        # Get questions for this subject
        questions = self._question_repo.get_by_subject(subject)

        if not questions:
            QMessageBox.warning(
                self,
                "Keine Fragen",
                f"Keine Fragen für dieses Fach gefunden.",
            )
            return

        # Shuffle and take up to 10 questions
        random.shuffle(questions)
        session_questions = questions[:10]

        # Create session
        self._session = SimpleSession(session_questions)

        # Show first question
        self._show_current_question()
        self.router.navigate("session")

    def _on_topic_training(self, topic_id: str) -> None:
        """Start topic-specific training."""
        questions = self._question_repo.get_by_topic(topic_id)

        if not questions:
            QMessageBox.warning(
                self,
                "Keine Fragen",
                f"Keine Fragen für dieses Thema gefunden.",
            )
            return

        random.shuffle(questions)
        session_questions = questions[:10]

        self._session = SimpleSession(session_questions)
        self._show_current_question()
        self.router.navigate("session")

    def _show_current_question(self) -> None:
        """Display the current question in session view."""
        if not self._session:
            return

        rendered = self._session.render_current()
        if rendered:
            self._session_view.show_question(rendered, self._session.progress)

    def _on_answer_submitted(self, user_answer) -> None:
        """Handle answer submission."""
        if not self._session or not self._session.current_question:
            return

        question = self._session.current_question
        rendered = self._session.render_current()

        # Evaluate the answer
        is_correct = self._evaluate_answer(question, user_answer)
        self._session.record_answer(is_correct)

        # Get correct answer for display
        correct_answer = self._get_correct_answer(question)

        # Create result for feedback
        from msa_trainer.core.models import AttemptResult
        result = AttemptResult(
            is_correct=is_correct,
            explanation=question.explanation,
            correct_answer=correct_answer,
            mastery_delta=0.03 if is_correct else -0.06,
            new_mastery_score=0.5,
        )

        self._session_view.show_feedback(result)

    def _evaluate_answer(self, question: Question, user_answer) -> bool:
        """Evaluate if the answer is correct."""
        solution = question.solution

        if question.qtype == QuestionType.MCQ:
            return str(user_answer) == str(solution.get("correct_choice", ""))

        elif question.qtype == QuestionType.SHORT:
            expected = solution.get("value", "")
            # Normalize both answers
            user_norm = str(user_answer).strip().lower().replace(",", ".")
            expected_norm = str(expected).strip().lower().replace(",", ".")

            # Try numeric comparison
            try:
                return abs(float(user_norm) - float(expected_norm)) < 0.001
            except ValueError:
                # Text comparison - remove spaces
                return user_norm.replace(" ", "") == expected_norm.replace(" ", "")

        elif question.qtype == QuestionType.CLOZE:
            return str(user_answer) == str(solution.get("correct_choice", ""))

        elif question.qtype == QuestionType.MATCH:
            # For matching, compare pairs
            expected_pairs = solution.get("pairs", [])
            user_pairs = user_answer if isinstance(user_answer, list) else []
            return set(map(tuple, user_pairs)) == set(map(tuple, expected_pairs))

        return False

    def _get_correct_answer(self, question: Question):
        """Get the correct answer for display."""
        solution = question.solution

        if question.qtype == QuestionType.MCQ:
            return solution.get("correct_choice", "")
        elif question.qtype == QuestionType.SHORT:
            return solution.get("value", "")
        elif question.qtype == QuestionType.CLOZE:
            return solution.get("correct_choice", "")
        elif question.qtype == QuestionType.MATCH:
            return solution.get("pairs", [])

        return ""

    def _on_next_question(self) -> None:
        """Handle next question request."""
        if not self._session:
            return

        self._session.advance()

        if self._session.is_complete:
            # Session done - show results
            stats = self._session.get_stats()
            self._result_view.show_results(stats)
            self.router.navigate("result")
        else:
            self._show_current_question()

    def _on_session_ended(self) -> None:
        """Handle session end (user clicked Beenden)."""
        if self._session:
            stats = self._session.get_stats()
            self._result_view.show_results(stats)
        self.router.navigate("result")

    def _on_continue_training(self) -> None:
        """Continue training after result."""
        # Start a new session with same subject
        if self._session and self._session.questions:
            subject = self._session.questions[0].subject
            self._on_quick_training(subject)
        else:
            self.router.navigate("dashboard")

    def _on_return_to_dashboard(self) -> None:
        """Return to dashboard from results."""
        self._session = None
        self.router.navigate("dashboard")

    def closeEvent(self, event) -> None:
        """Clean up on close."""
        if hasattr(self, "_db"):
            self._db.close()
        super().closeEvent(event)


def create_app() -> tuple[QApplication, MainWindow]:
    """Create and configure the application."""
    app = QApplication.instance() or QApplication([])
    app.setStyleSheet(BASE_STYLESHEET)

    window = MainWindow()
    return app, window
