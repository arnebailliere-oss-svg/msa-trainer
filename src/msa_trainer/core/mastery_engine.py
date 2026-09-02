"""Mastery score calculation engine.

Implements the mastery learning algorithm from docs/ALGORITHM.md.
"""

from datetime import datetime

from msa_trainer.core.constants import (
    AMPEL_GREEN_STABILITY,
    AMPEL_RED_THRESHOLD,
    AMPEL_YELLOW_THRESHOLD,
    CORRECT_MASTERY_DELTA,
    CORRECT_STABILITY_DELTA,
    INCORRECT_MASTERY_DELTA,
    INCORRECT_STABILITY_DELTA,
    SPEED_BONUS,
    TARGET_TIMES_MS,
)
from msa_trainer.core.enums import AmpelState
from msa_trainer.core.models import MasteryState


class MasteryEngine:
    """Updates mastery_score and stability based on attempt outcomes.

    Algorithm (from ALGORITHM.md):
    - Correct answer: +0.03 mastery, +0.02 stability
    - Speed bonus: +0.01 mastery if response_time < target_time
    - Incorrect answer: -0.06 mastery, -0.04 stability
    - All values clamped to 0.0 - 1.0

    Ampel thresholds:
    - Red: mastery_score < 0.45
    - Yellow: 0.45 <= mastery_score <= 0.75
    - Green: mastery_score > 0.75 AND stability > 0.55
    """

    def update(
        self,
        state: MasteryState,
        is_correct: bool,
        difficulty: int,
        response_time_ms: int,
    ) -> MasteryState:
        """
        Calculate new mastery state after an attempt.

        Args:
            state: Current mastery state
            is_correct: Whether the answer was correct
            difficulty: Question difficulty (1-5)
            response_time_ms: Time taken to answer in milliseconds

        Returns:
            New MasteryState with updated values
        """
        new_mastery = state.mastery_score
        new_stability = state.stability

        if is_correct:
            new_mastery += CORRECT_MASTERY_DELTA
            new_stability += CORRECT_STABILITY_DELTA

            # Speed bonus if under target time
            target_time = TARGET_TIMES_MS.get(difficulty, TARGET_TIMES_MS[3])
            if response_time_ms < target_time:
                new_mastery += SPEED_BONUS
        else:
            new_mastery += INCORRECT_MASTERY_DELTA  # negative value
            new_stability += INCORRECT_STABILITY_DELTA  # negative value

        # Clamp values to valid range
        new_mastery = self._clamp(new_mastery)
        new_stability = self._clamp(new_stability)

        return MasteryState(
            user_id=state.user_id,
            topic_id=state.topic_id,
            mastery_score=new_mastery,
            stability=new_stability,
            last_practiced_at=datetime.now(),
            streak_days=state.streak_days,  # Streak calculation handled elsewhere
        )

    @staticmethod
    def compute_ampel(mastery_score: float, stability: float) -> AmpelState:
        """
        Compute traffic light state from mastery values.

        Args:
            mastery_score: Current mastery score (0.0-1.0)
            stability: Current stability score (0.0-1.0)

        Returns:
            AmpelState (RED, YELLOW, or GREEN)
        """
        if mastery_score < AMPEL_RED_THRESHOLD:
            return AmpelState.RED
        elif mastery_score > AMPEL_YELLOW_THRESHOLD and stability > AMPEL_GREEN_STABILITY:
            return AmpelState.GREEN
        else:
            return AmpelState.YELLOW

    @staticmethod
    def get_ampel_for_state(state: MasteryState) -> AmpelState:
        """Convenience method to get ampel from MasteryState."""
        return MasteryEngine.compute_ampel(state.mastery_score, state.stability)

    @staticmethod
    def _clamp(value: float, min_val: float = 0.0, max_val: float = 1.0) -> float:
        """Clamp value to range."""
        return max(min_val, min(max_val, value))

    @staticmethod
    def calculate_mastery_delta(is_correct: bool, has_speed_bonus: bool = False) -> float:
        """Calculate the mastery score change for an attempt.

        Useful for showing the delta in UI feedback.
        """
        if is_correct:
            delta = CORRECT_MASTERY_DELTA
            if has_speed_bonus:
                delta += SPEED_BONUS
            return delta
        return INCORRECT_MASTERY_DELTA
