"""User repository implementation."""

from datetime import datetime
from typing import Optional

from msa_trainer.core.models import User
from msa_trainer.persistence.database import Database
from msa_trainer.persistence.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    """CRUD operations for User entities."""

    def __init__(self, db: Database) -> None:
        self._db = db

    def create(self, user: User) -> None:
        """Insert a new user."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                INSERT INTO users (id, name, pin_hash, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (user.id, user.name, user.pin_hash, user.created_at.isoformat()),
            )

    def get_by_id(self, user_id: str) -> Optional[User]:
        """Get user by ID."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
            row = cursor.fetchone()
            return self._row_to_user(row) if row else None

    def get_all(self) -> list[User]:
        """Get all users."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM users ORDER BY name")
            return [self._row_to_user(row) for row in cursor.fetchall()]

    def update(self, user: User) -> None:
        """Update user."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                UPDATE users SET name = ?, pin_hash = ?
                WHERE id = ?
                """,
                (user.name, user.pin_hash, user.id),
            )

    def delete(self, user_id: str) -> None:
        """Delete user by ID."""
        with self._db.transaction() as cursor:
            cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))

    @staticmethod
    def _row_to_user(row: dict) -> User:
        """Convert database row to User model."""
        return User(
            id=row["id"],
            name=row["name"],
            pin_hash=row["pin_hash"],
            created_at=datetime.fromisoformat(row["created_at"]),
        )
