"""Unit tests for MasteryEngine."""

import pytest

from msa_trainer.core.constants import (
    CORRECT_MASTERY_DELTA,
    CORRECT_STABILITY_DELTA,
    INCORRECT_MASTERY_DELTA,
    INCORRECT_STABILITY_DELTA,
    SPEED_BONUS,
    TARGET_TIMES_MS,
)
from msa_trainer.core.enums import AmpelState
from msa_trainer.core.mastery_engine import MasteryEngine
from msa_trainer.core.models import MasteryState


@pytest.fixture
def engine() -> MasteryEngine:
    """Create a MasteryEngine instance."""
    return MasteryEngine()


@pytest.fixture
def base_state() -> MasteryState:
    """Create a base mastery state for testing."""
    return MasteryState(
        user_id="test-user",
        topic_id="test-topic",
        mastery_score=0.5,
        stability=0.5,
    )


class TestMasteryUpdate:
    """Tests for mastery score updates."""

    def test_correct_answer_increases_mastery(self, engine: MasteryEngine, base_state: MasteryState):
        """Correct answer should increase mastery by 0.03."""
        new_state = engine.update(base_state, is_correct=True, difficulty=2, response_time_ms=40000)

        assert new_state.mastery_score == pytest.approx(0.5 + CORRECT_MASTERY_DELTA)
        assert new_state.stability == pytest.approx(0.5 + CORRECT_STABILITY_DELTA)

    def test_correct_answer_with_speed_bonus(self, engine: MasteryEngine, base_state: MasteryState):
        """Fast correct answer should get speed bonus."""
        target_time = TARGET_TIMES_MS[2]  # 35000ms
        fast_time = target_time - 5000  # Under target

        new_state = engine.update(base_state, is_correct=True, difficulty=2, response_time_ms=fast_time)

        expected_mastery = 0.5 + CORRECT_MASTERY_DELTA + SPEED_BONUS
        assert new_state.mastery_score == pytest.approx(expected_mastery)

    def test_incorrect_answer_decreases_mastery(self, engine: MasteryEngine, base_state: MasteryState):
        """Incorrect answer should decrease mastery by 0.06."""
        new_state = engine.update(base_state, is_correct=False, difficulty=2, response_time_ms=40000)

        assert new_state.mastery_score == pytest.approx(0.5 + INCORRECT_MASTERY_DELTA)
        assert new_state.stability == pytest.approx(0.5 + INCORRECT_STABILITY_DELTA)

    def test_mastery_clamps_at_one(self, engine: MasteryEngine):
        """Mastery should not exceed 1.0."""
        high_state = MasteryState(
            user_id="test", topic_id="test", mastery_score=0.99, stability=0.99
        )

        new_state = engine.update(high_state, is_correct=True, difficulty=1, response_time_ms=10000)

        assert new_state.mastery_score == 1.0
        assert new_state.stability == 1.0

    def test_mastery_clamps_at_zero(self, engine: MasteryEngine):
        """Mastery should not go below 0.0."""
        low_state = MasteryState(
            user_id="test", topic_id="test", mastery_score=0.02, stability=0.02
        )

        new_state = engine.update(low_state, is_correct=False, difficulty=2, response_time_ms=40000)

        assert new_state.mastery_score == 0.0
        assert new_state.stability == 0.0


class TestAmpelComputation:
    """Tests for traffic light computation."""

    def test_red_for_low_mastery(self, engine: MasteryEngine):
        """Low mastery should be red."""
        ampel = engine.compute_ampel(0.3, 0.5)
        assert ampel == AmpelState.RED

    def test_red_at_boundary(self, engine: MasteryEngine):
        """Mastery below 0.45 should be red."""
        ampel = engine.compute_ampel(0.44, 0.9)
        assert ampel == AmpelState.RED

    def test_yellow_for_medium_mastery(self, engine: MasteryEngine):
        """Medium mastery should be yellow."""
        ampel = engine.compute_ampel(0.6, 0.5)
        assert ampel == AmpelState.YELLOW

    def test_yellow_at_green_threshold_low_stability(self, engine: MasteryEngine):
        """High mastery but low stability should be yellow."""
        ampel = engine.compute_ampel(0.8, 0.5)  # stability below 0.55
        assert ampel == AmpelState.YELLOW

    def test_green_for_high_mastery_and_stability(self, engine: MasteryEngine):
        """High mastery and stability should be green."""
        ampel = engine.compute_ampel(0.8, 0.6)
        assert ampel == AmpelState.GREEN

    def test_green_at_boundary(self, engine: MasteryEngine):
        """Exact boundary values for green."""
        ampel = engine.compute_ampel(0.76, 0.56)
        assert ampel == AmpelState.GREEN
