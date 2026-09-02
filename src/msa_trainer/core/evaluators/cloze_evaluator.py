"""CLOZE (fill-in-the-blank) evaluator."""

from typing import Any

from msa_trainer.core.evaluators.base import BaseEvaluator
from msa_trainer.core.models import RenderedQuestion


class ClozeEvaluator(BaseEvaluator):
    """Evaluator for CLOZE (fill-in-the-blank) questions."""

    def evaluate(
        self, question: RenderedQuestion, user_answer: Any
    ) -> tuple[bool, Any, str]:
        """
        Evaluate CLOZE answer.

        Args:
            question: Question with payload containing blank choices
            user_answer: User's selected/typed answer

        Returns:
            (is_correct, correct_answer, normalized_answer)
        """
        correct = self.get_correct_answer(question)
        normalized = str(user_answer).strip() if user_answer else ""

        is_correct = normalized == correct

        return is_correct, correct, normalized

    def get_correct_answer(self, question: RenderedQuestion) -> Any:
        """Get the correct choice for the blank."""
        return question.solution.get("correct_choice", "")
