"""MATCH (matching pairs) evaluator."""

from typing import Any

from msa_trainer.core.evaluators.base import BaseEvaluator
from msa_trainer.core.models import RenderedQuestion


class MatchEvaluator(BaseEvaluator):
    """Evaluator for MATCH (matching pairs) questions."""

    def evaluate(
        self, question: RenderedQuestion, user_answer: Any
    ) -> tuple[bool, Any, str]:
        """
        Evaluate MATCH answer.

        Args:
            question: Question with payload containing left/right items
            user_answer: User's pairs as list of [left, right] tuples/lists

        Returns:
            (is_correct, correct_pairs, normalized_answer_str)
        """
        correct_pairs = self.get_correct_answer(question)

        # Normalize user answer
        if not isinstance(user_answer, list):
            return False, correct_pairs, str(user_answer)

        # Convert to set of tuples for comparison
        try:
            user_pairs = {tuple(pair) for pair in user_answer}
            correct_set = {tuple(pair) for pair in correct_pairs}
        except (TypeError, ValueError):
            return False, correct_pairs, str(user_answer)

        is_correct = user_pairs == correct_set
        normalized = str(sorted(user_pairs))

        return is_correct, correct_pairs, normalized

    def get_correct_answer(self, question: RenderedQuestion) -> Any:
        """Get the correct pairs from solution."""
        return question.solution.get("pairs", [])
