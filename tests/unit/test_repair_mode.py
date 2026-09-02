"""Unit tests for RepairMode."""

import pytest
from unittest.mock import MagicMock, patch

from msa_trainer.core.constants import REPAIR_SAME_TOPIC_COUNT
from msa_trainer.core.enums import QuestionType, Subject
from msa_trainer.core.models import Question, RepairQueue, Topic
from msa_trainer.core.repair_mode import RepairModeManager


@pytest.fixture
def mock_topic_repo():
    """Create mock topic repository."""
    repo = MagicMock()

    # Default topic with parent
    repo.get_by_id.return_value = Topic(
        id="MATH_ALG_LINEAR",
        subject=Subject.MATH,
        code="ALG_LINEAR",
        name="Lineare Gleichungen",
        parent_id="MATH_ALG",  # Has parent
        pack_id="test_pack",
    )

    return repo


@pytest.fixture
def mock_question_repo():
    """Create mock question repository."""
    repo = MagicMock()

    # Return sample questions
    repo.get_by_topic_and_difficulty.return_value = [
        Question(
            id="Q1",
            subject=Subject.MATH,
            topic_id="MATH_ALG_LINEAR",
            difficulty=2,
            qtype=QuestionType.SHORT,
            prompt="Test question",
            payload={},
            solution={"value": 5},
            explanation="Test",
            tags=["test"],
            pack_id="test",
        )
    ]

    return repo


@pytest.fixture
def manager(mock_topic_repo, mock_question_repo):
    """Create RepairModeManager with mocks."""
    return RepairModeManager(mock_topic_repo, mock_question_repo)


class TestRepairModeActivation:
    """Tests for repair mode activation."""

    def test_activate_creates_queue(self, manager):
        """Activation should create a repair queue."""
        queue = manager.activate("MATH_ALG_LINEAR", difficulty=3)

        assert queue.topic_id == "MATH_ALG_LINEAR"
        assert queue.current_difficulty == 3
        assert queue.same_topic_remaining == REPAIR_SAME_TOPIC_COUNT
        assert queue.transfer_pending is True

    def test_activate_uses_parent_for_transfer(self, manager, mock_topic_repo):
        """Transfer topic should be parent_id when available."""
        queue = manager.activate("MATH_ALG_LINEAR", difficulty=3)

        assert queue.transfer_topic_id == "MATH_ALG"

    def test_activate_uses_same_topic_without_parent(self, manager, mock_topic_repo):
        """Transfer topic should be same topic when no parent."""
        # Topic without parent
        mock_topic_repo.get_by_id.return_value = Topic(
            id="MATH",
            subject=Subject.MATH,
            code="MATH",
            name="Mathematik",
            parent_id=None,
            pack_id="test",
        )

        queue = manager.activate("MATH", difficulty=2)

        assert queue.transfer_topic_id == "MATH"


class TestRepairQueueProgression:
    """Tests for repair queue state transitions."""

    def test_same_topic_questions_first(self, manager):
        """Same topic questions should come before transfer."""
        queue = RepairQueue(
            topic_id="MATH_ALG_LINEAR",
            current_difficulty=3,
            same_topic_remaining=2,
            transfer_pending=True,
            transfer_topic_id="MATH_ALG",
        )

        assert not manager.is_transfer_question(queue)
        assert queue.same_topic_remaining == 2

    def test_transfer_after_same_topic(self, manager):
        """Transfer question should come after same topic questions."""
        queue = RepairQueue(
            topic_id="MATH_ALG_LINEAR",
            current_difficulty=3,
            same_topic_remaining=0,
            transfer_pending=True,
            transfer_topic_id="MATH_ALG",
        )

        assert manager.is_transfer_question(queue)

    def test_correct_transfer_exits_repair(self, manager):
        """Correct transfer answer should exit repair mode."""
        queue = RepairQueue(
            topic_id="MATH_ALG_LINEAR",
            current_difficulty=3,
            same_topic_remaining=0,
            transfer_pending=True,
            transfer_topic_id="MATH_ALG",
        )

        new_queue, should_exit = manager.on_answer(queue, is_correct=True, was_transfer=True)

        assert should_exit is True

    def test_incorrect_transfer_stays_in_repair(self, manager):
        """Incorrect transfer should stay in repair with reduced difficulty."""
        queue = RepairQueue(
            topic_id="MATH_ALG_LINEAR",
            current_difficulty=3,
            same_topic_remaining=0,
            transfer_pending=True,
            transfer_topic_id="MATH_ALG",
        )

        new_queue, should_exit = manager.on_answer(queue, is_correct=False, was_transfer=True)

        assert should_exit is False
        assert new_queue.same_topic_remaining == REPAIR_SAME_TOPIC_COUNT  # Reset
        assert new_queue.current_difficulty == 2  # Decreased

    def test_difficulty_minimum_is_one(self, manager):
        """Difficulty should not go below 1."""
        queue = RepairQueue(
            topic_id="MATH_ALG_LINEAR",
            current_difficulty=1,
            same_topic_remaining=0,
            transfer_pending=True,
            transfer_topic_id="MATH_ALG",
        )

        new_queue, _ = manager.on_answer(queue, is_correct=False, was_transfer=True)

        assert new_queue.current_difficulty == 1  # Stays at minimum

    def test_same_topic_answer_decrements_counter(self, manager):
        """Same topic answer should decrement remaining counter."""
        queue = RepairQueue(
            topic_id="MATH_ALG_LINEAR",
            current_difficulty=3,
            same_topic_remaining=2,
            transfer_pending=True,
            transfer_topic_id="MATH_ALG",
        )

        new_queue, should_exit = manager.on_answer(queue, is_correct=True, was_transfer=False)

        assert should_exit is False
        assert new_queue.same_topic_remaining == 1
