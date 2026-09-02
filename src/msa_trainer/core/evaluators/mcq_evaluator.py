"""MCQ (Multiple Choice Question) evaluator."""

from typing import Any

from msa_trainer.core.evaluators.base import BaseEvaluator
from msa_trainer.core.models import RenderedQuestion


class MCQEvaluator(BaseEvaluator):
    """Evaluator for Multiple Choice Questions."""

    def evaluate(
        self, question: RenderedQuestion, user_answer: Any
    ) -> tuple[bool, Any, str]:
        """
        Evaluate MCQ answer.

        Args:
            question: Question with payload containing choices
            user_answer: User's selected choice (string)

        Returns:
            (is_correct, correct_choice, normalized_answer)
        """
        correct = self.get_correct_answer(question)
        normalized = str(user_answer).strip() if user_answer else ""

        is_correct = normalized == correct

        return is_correct, correct, normalized

    def get_correct_answer(self, question: RenderedQuestion) -> Any:
        """Get the correct choice from solution."""
        return question.solution.get("correct_choice", "")
