"""Base evaluator interface."""

from abc import ABC, abstractmethod
from typing import Any

from msa_trainer.core.models import RenderedQuestion


class BaseEvaluator(ABC):
    """Abstract base class for answer evaluation."""

    @abstractmethod
    def evaluate(
        self, question: RenderedQuestion, user_answer: Any
    ) -> tuple[bool, Any, str]:
        """
        Evaluate a user's answer.

        Args:
            question: The rendered question
            user_answer: The user's submitted answer

        Returns:
            Tuple of (is_correct, correct_answer, normalized_user_answer)
        """
        ...

    @abstractmethod
    def get_correct_answer(self, question: RenderedQuestion) -> Any:
        """Extract the correct answer from a question."""
        ...
