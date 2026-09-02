"""Base question renderer interface."""

from typing import Any

from PySide6.QtCore import Signal
from PySide6.QtWidgets import QWidget

from msa_trainer.core.models import RenderedQuestion


class BaseRenderer(QWidget):
    """Abstract base class for question type renderers.

    Note: Cannot use ABC due to metaclass conflict with QWidget.
    Subclasses must implement all methods.
    """

    answer_submitted = Signal(object)  # Emits user answer

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)

    def render(self, question: RenderedQuestion) -> None:
        """Display the question."""
        raise NotImplementedError("Subclasses must implement render()")

    def get_answer(self) -> Any:
        """Return current user answer."""
        raise NotImplementedError("Subclasses must implement get_answer()")

    def show_feedback(self, is_correct: bool, correct_answer: Any, explanation: str) -> None:
        """Display feedback after submission."""
        raise NotImplementedError("Subclasses must implement show_feedback()")

    def reset(self) -> None:
        """Clear for next question."""
        raise NotImplementedError("Subclasses must implement reset()")

    def is_answer_ready(self) -> bool:
        """Check if user has provided an answer."""
        raise NotImplementedError("Subclasses must implement is_answer_ready()")
