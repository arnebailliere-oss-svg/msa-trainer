"""Topic repository implementation."""

from typing import Optional

from msa_trainer.core.enums import Subject
from msa_trainer.core.models import Topic
from msa_trainer.persistence.database import Database
from msa_trainer.persistence.repositories.base import BaseRepository


class TopicRepository(BaseRepository[Topic]):
    """CRUD operations for Topic entities."""

    def __init__(self, db: Database) -> None:
        self._db = db

    def create(self, topic: Topic) -> None:
        """Insert a new topic."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                INSERT INTO topics (id, subject, code, name, parent_id, pack_id)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    topic.id,
                    topic.subject.value,
                    topic.code,
                    topic.name,
                    topic.parent_id,
                    topic.pack_id,
                ),
            )

    def create_many(self, topics: list[Topic]) -> None:
        """Insert multiple topics."""
        with self._db.transaction() as cursor:
            cursor.executemany(
                """
                INSERT INTO topics (id, subject, code, name, parent_id, pack_id)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                [
                    (t.id, t.subject.value, t.code, t.name, t.parent_id, t.pack_id)
                    for t in topics
                ],
            )

    def get_by_id(self, topic_id: str) -> Optional[Topic]:
        """Get topic by ID."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM topics WHERE id = ?", (topic_id,))
            row = cursor.fetchone()
            return self._row_to_topic(row) if row else None

    def get_all(self) -> list[Topic]:
        """Get all topics."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM topics ORDER BY subject, code")
            return [self._row_to_topic(row) for row in cursor.fetchall()]

    def get_by_subject(self, subject: Subject) -> list[Topic]:
        """Get all topics for a subject."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM topics WHERE subject = ? ORDER BY code",
                (subject.value,),
            )
            return [self._row_to_topic(row) for row in cursor.fetchall()]

    def get_children(self, parent_id: str) -> list[Topic]:
        """Get child topics of a parent."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM topics WHERE parent_id = ? ORDER BY code",
                (parent_id,),
            )
            return [self._row_to_topic(row) for row in cursor.fetchall()]

    def get_root_topics(self, subject: Subject) -> list[Topic]:
        """Get root topics (no parent) for a subject."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM topics WHERE subject = ? AND parent_id IS NULL ORDER BY code",
                (subject.value,),
            )
            return [self._row_to_topic(row) for row in cursor.fetchall()]

    def update(self, topic: Topic) -> None:
        """Update topic."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                UPDATE topics SET subject = ?, code = ?, name = ?, parent_id = ?, pack_id = ?
                WHERE id = ?
                """,
                (
                    topic.subject.value,
                    topic.code,
                    topic.name,
                    topic.parent_id,
                    topic.pack_id,
                    topic.id,
                ),
            )

    def delete(self, topic_id: str) -> None:
        """Delete topic by ID."""
        with self._db.transaction() as cursor:
            cursor.execute("DELETE FROM topics WHERE id = ?", (topic_id,))

    def delete_by_pack(self, pack_id: str) -> None:
        """Delete all topics from a pack."""
        with self._db.transaction() as cursor:
            cursor.execute("DELETE FROM topics WHERE pack_id = ?", (pack_id,))

    @staticmethod
    def _row_to_topic(row: dict) -> Topic:
        """Convert database row to Topic model."""
        return Topic(
            id=row["id"],
            subject=Subject(row["subject"]),
            code=row["code"],
            name=row["name"],
            parent_id=row["parent_id"],
            pack_id=row["pack_id"],
        )
