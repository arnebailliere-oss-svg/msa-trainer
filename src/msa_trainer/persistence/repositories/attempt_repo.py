"""Attempt repository implementation."""

import json
from datetime import datetime
from typing import Optional

from msa_trainer.core.models import Attempt
from msa_trainer.persistence.database import Database
from msa_trainer.persistence.repositories.base import BaseRepository


class AttemptRepository(BaseRepository[Attempt]):
    """CRUD operations for Attempt entities."""

    def __init__(self, db: Database) -> None:
        self._db = db

    def create(self, attempt: Attempt) -> None:
        """Insert a new attempt."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                INSERT INTO attempts (
                    id, user_id, question_id, variant_id, topic_id,
                    is_correct, response_time_ms, answer_json, created_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    attempt.id,
                    attempt.user_id,
                    attempt.question_id,
                    attempt.variant_id,
                    attempt.topic_id,
                    1 if attempt.is_correct else 0,
                    attempt.response_time_ms,
                    json.dumps(attempt.answer_json),
                    attempt.created_at.isoformat(),
                ),
            )

    def get_by_id(self, attempt_id: str) -> Optional[Attempt]:
        """Get attempt by ID."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM attempts WHERE id = ?", (attempt_id,))
            row = cursor.fetchone()
            return self._row_to_attempt(row) if row else None

    def get_all(self) -> list[Attempt]:
        """Get all attempts."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM attempts ORDER BY created_at DESC")
            return [self._row_to_attempt(row) for row in cursor.fetchall()]

    def get_by_user(self, user_id: str, limit: Optional[int] = None) -> list[Attempt]:
        """Get attempts by user, most recent first."""
        with self._db.cursor() as cursor:
            sql = "SELECT * FROM attempts WHERE user_id = ? ORDER BY created_at DESC"
            if limit:
                sql += f" LIMIT {limit}"
            cursor.execute(sql, (user_id,))
            return [self._row_to_attempt(row) for row in cursor.fetchall()]

    def get_by_user_and_topic(
        self, user_id: str, topic_id: str, limit: Optional[int] = None
    ) -> list[Attempt]:
        """Get attempts by user and topic, most recent first."""
        with self._db.cursor() as cursor:
            sql = """
                SELECT * FROM attempts
                WHERE user_id = ? AND topic_id = ?
                ORDER BY created_at DESC
            """
            if limit:
                sql += f" LIMIT {limit}"
            cursor.execute(sql, (user_id, topic_id))
            return [self._row_to_attempt(row) for row in cursor.fetchall()]

    def get_recent_by_user_topic(
        self, user_id: str, topic_id: str, count: int = 20
    ) -> list[Attempt]:
        """Get recent attempts for error rate calculation."""
        return self.get_by_user_and_topic(user_id, topic_id, limit=count)

    def count_by_user_topic(self, user_id: str, topic_id: str) -> int:
        """Count attempts for a user+topic."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT COUNT(*) as cnt FROM attempts WHERE user_id = ? AND topic_id = ?",
                (user_id, topic_id),
            )
            row = cursor.fetchone()
            return row["cnt"] if row else 0

    def get_error_rate(self, user_id: str, topic_id: str, recent_count: int = 20) -> float:
        """Calculate error rate from recent attempts."""
        attempts = self.get_recent_by_user_topic(user_id, topic_id, recent_count)
        if not attempts:
            return 0.0
        incorrect = sum(1 for a in attempts if not a.is_correct)
        return incorrect / len(attempts)

    def update(self, attempt: Attempt) -> None:
        """Update attempt (not typically used)."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                UPDATE attempts SET
                    user_id = ?, question_id = ?, variant_id = ?, topic_id = ?,
                    is_correct = ?, response_time_ms = ?, answer_json = ?
                WHERE id = ?
                """,
                (
                    attempt.user_id,
                    attempt.question_id,
                    attempt.variant_id,
                    attempt.topic_id,
                    1 if attempt.is_correct else 0,
                    attempt.response_time_ms,
                    json.dumps(attempt.answer_json),
                    attempt.id,
                ),
            )

    def delete(self, attempt_id: str) -> None:
        """Delete attempt by ID."""
        with self._db.transaction() as cursor:
            cursor.execute("DELETE FROM attempts WHERE id = ?", (attempt_id,))

    def delete_by_user(self, user_id: str) -> None:
        """Delete all attempts for a user."""
        with self._db.transaction() as cursor:
            cursor.execute("DELETE FROM attempts WHERE user_id = ?", (user_id,))

    @staticmethod
    def _row_to_attempt(row: dict) -> Attempt:
        """Convert database row to Attempt model."""
        return Attempt(
            id=row["id"],
            user_id=row["user_id"],
            question_id=row["question_id"],
            variant_id=row["variant_id"],
            topic_id=row["topic_id"],
            is_correct=bool(row["is_correct"]),
            response_time_ms=row["response_time_ms"],
            answer_json=json.loads(row["answer_json"]),
            created_at=datetime.fromisoformat(row["created_at"]),
        )
