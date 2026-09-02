"""Pytest fixtures for MSA Trainer tests."""

import pytest
from pathlib import Path

from msa_trainer.core.enums import QuestionType, Subject
from msa_trainer.core.models import MasteryState, Question, Topic, User
from msa_trainer.persistence.database import Database
from msa_trainer.persistence.migrations import MigrationRunner


@pytest.fixture
def in_memory_db():
    """Create an in-memory SQLite database for fast tests."""
    db = Database(":memory:")
    db.connect()
    MigrationRunner(db).run()
    yield db
    db.close()


@pytest.fixture
def sample_user():
    """Create a sample user for testing."""
    from datetime import datetime
    return User(
        id="test-user-123",
        name="Test Student",
        created_at=datetime.now(),
    )


@pytest.fixture
def sample_topic():
    """Create a sample topic for testing."""
    return Topic(
        id="MATH_NUM_PCT_BASIC",
        subject=Subject.MATH,
        code="NUM_PCT_BASIC",
        name="Prozentrechnung Grundlagen",
        parent_id="MATH_NUM",
        pack_id="test_pack",
    )


@pytest.fixture
def sample_question():
    """Create a sample MCQ question for testing."""
    return Question(
        id="MATH_NUM_PCT_BASIC_001",
        subject=Subject.MATH,
        topic_id="MATH_NUM_PCT_BASIC",
        difficulty=2,
        qtype=QuestionType.MCQ,
        prompt="Wie viel sind 20% von 150?",
        payload={"choices": ["20", "30", "40", "50"], "shuffle": True},
        solution={"correct_choice": "30"},
        explanation="20% = 0,2. 0,2 * 150 = 30.",
        tags=["MSA", "percent", "basic"],
        pack_id="test_pack",
    )


@pytest.fixture
def sample_mastery_state(sample_user, sample_topic):
    """Create a sample mastery state for testing."""
    return MasteryState(
        user_id=sample_user.id,
        topic_id=sample_topic.id,
        mastery_score=0.5,
        stability=0.5,
        streak_days=0,
    )


@pytest.fixture
def content_pack_dir():
    """Return path to test content pack."""
    return Path(__file__).parent.parent / "content_packs" / "berlin_msa_v1"
