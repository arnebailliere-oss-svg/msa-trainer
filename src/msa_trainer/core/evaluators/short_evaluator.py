"""SHORT (short answer) evaluator."""

from typing import Any

from msa_trainer.core.evaluators.base import BaseEvaluator
from msa_trainer.core.models import RenderedQuestion
from msa_trainer.core.normalizers import (
    apply_normalizations,
    normalize_number,
    numbers_equal,
)


class ShortEvaluator(BaseEvaluator):
    """Evaluator for SHORT (short answer) questions."""

    def evaluate(
        self, question: RenderedQuestion, user_answer: Any
    ) -> tuple[bool, Any, str]:
        """
        Evaluate SHORT answer.

        Args:
            question: Question with payload containing answer_type and normalization
            user_answer: User's typed answer

        Returns:
            (is_correct, correct_value, normalized_answer)
        """
        correct = self.get_correct_answer(question)
        payload = question.payload

        answer_type = payload.get("answer_type", "text")
        normalizations = payload.get("normalization", ["trim"])
        tolerance = payload.get("tolerance", 0)

        user_str = str(user_answer) if user_answer is not None else ""
        normalized = apply_normalizations(user_str, normalizations)

        if answer_type == "number":
            # Numeric comparison with tolerance
            user_num = normalize_number(normalized)
            if user_num is None:
                return False, correct, normalized

            is_correct = numbers_equal(user_num, correct, tolerance)
        else:
            # Text comparison
            correct_normalized = apply_normalizations(str(correct), normalizations)
            is_correct = normalized == correct_normalized

        return is_correct, correct, normalized

    def get_correct_answer(self, question: RenderedQuestion) -> Any:
        """Get the correct value from solution."""
        return question.solution.get("value", "")
