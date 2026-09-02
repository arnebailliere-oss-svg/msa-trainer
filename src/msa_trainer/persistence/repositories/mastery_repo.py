"""Mastery repository implementation."""

from datetime import datetime
from typing import Optional

from msa_trainer.core.models import MasteryState
from msa_trainer.persistence.database import Database
from msa_trainer.persistence.repositories.base import BaseRepository


class MasteryRepository(BaseRepository[MasteryState]):
    """CRUD operations for MasteryState entities."""

    def __init__(self, db: Database) -> None:
        self._db = db

    def create(self, mastery: MasteryState) -> None:
        """Insert a new mastery state."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                INSERT INTO mastery (
                    user_id, topic_id, mastery_score, stability,
                    last_practiced_at, streak_days
                )
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    mastery.user_id,
                    mastery.topic_id,
                    mastery.mastery_score,
                    mastery.stability,
                    mastery.last_practiced_at.isoformat() if mastery.last_practiced_at else None,
                    mastery.streak_days,
                ),
            )

    def get_by_id(self, entity_id: str) -> Optional[MasteryState]:
        """Not applicable - use get_by_user_topic instead."""
        raise NotImplementedError("Use get_by_user_topic(user_id, topic_id)")

    def get_by_user_topic(self, user_id: str, topic_id: str) -> Optional[MasteryState]:
        """Get mastery state for a user+topic combination."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM mastery WHERE user_id = ? AND topic_id = ?",
                (user_id, topic_id),
            )
            row = cursor.fetchone()
            return self._row_to_mastery(row) if row else None

    def get_or_create(self, user_id: str, topic_id: str) -> MasteryState:
        """Get existing mastery state or create a new one with defaults."""
        existing = self.get_by_user_topic(user_id, topic_id)
        if existing:
            return existing

        new_mastery = MasteryState(user_id=user_id, topic_id=topic_id)
        self.create(new_mastery)
        return new_mastery

    def get_all(self) -> list[MasteryState]:
        """Get all mastery states."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM mastery")
            return [self._row_to_mastery(row) for row in cursor.fetchall()]

    def get_by_user(self, user_id: str) -> list[MasteryState]:
        """Get all mastery states for a user."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM mastery WHERE user_id = ?",
                (user_id,),
            )
            return [self._row_to_mastery(row) for row in cursor.fetchall()]

    def update(self, mastery: MasteryState) -> None:
        """Update mastery state."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                UPDATE mastery SET
                    mastery_score = ?, stability = ?,
                    last_practiced_at = ?, streak_days = ?
                WHERE user_id = ? AND topic_id = ?
                """,
                (
                    mastery.mastery_score,
                    mastery.stability,
                    mastery.last_practiced_at.isoformat() if mastery.last_practiced_at else None,
                    mastery.streak_days,
                    mastery.user_id,
                    mastery.topic_id,
                ),
            )

    def upsert(self, mastery: MasteryState) -> None:
        """Insert or update mastery state."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                INSERT INTO mastery (
                    user_id, topic_id, mastery_score, stability,
                    last_practiced_at, streak_days
                )
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(user_id, topic_id) DO UPDATE SET
                    mastery_score = excluded.mastery_score,
                    stability = excluded.stability,
                    last_practiced_at = excluded.last_practiced_at,
                    streak_days = excluded.streak_days
                """,
                (
                    mastery.user_id,
                    mastery.topic_id,
                    mastery.mastery_score,
                    mastery.stability,
                    mastery.last_practiced_at.isoformat() if mastery.last_practiced_at else None,
                    mastery.streak_days,
                ),
            )

    def delete(self, entity_id: str) -> None:
        """Not applicable - use delete_by_user_topic instead."""
        raise NotImplementedError("Use delete_by_user_topic(user_id, topic_id)")

    def delete_by_user_topic(self, user_id: str, topic_id: str) -> None:
        """Delete mastery state for a user+topic."""
        with self._db.transaction() as cursor:
            cursor.execute(
                "DELETE FROM mastery WHERE user_id = ? AND topic_id = ?",
                (user_id, topic_id),
            )

    def delete_by_user(self, user_id: str) -> None:
        """Delete all mastery states for a user."""
        with self._db.transaction() as cursor:
            cursor.execute("DELETE FROM mastery WHERE user_id = ?", (user_id,))

    @staticmethod
    def _row_to_mastery(row: dict) -> MasteryState:
        """Convert database row to MasteryState model."""
        return MasteryState(
            user_id=row["user_id"],
            topic_id=row["topic_id"],
            mastery_score=row["mastery_score"],
            stability=row["stability"],
            last_practiced_at=(
                datetime.fromisoformat(row["last_practiced_at"])
                if row["last_practiced_at"]
                else None
            ),
            streak_days=row["streak_days"],
        )
