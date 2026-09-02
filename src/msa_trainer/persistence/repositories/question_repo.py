"""Question repository implementation."""

import json
from typing import Optional

from msa_trainer.core.enums import QuestionType, Subject
from msa_trainer.core.models import Question, VariantSpec
from msa_trainer.persistence.database import Database
from msa_trainer.persistence.repositories.base import BaseRepository


class QuestionRepository(BaseRepository[Question]):
    """CRUD operations for Question entities."""

    def __init__(self, db: Database) -> None:
        self._db = db

    def create(self, question: Question) -> None:
        """Insert a new question."""
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                INSERT INTO questions (
                    id, subject, topic_id, difficulty, qtype, prompt,
                    payload_json, solution_json, explanation, tags_json,
                    variants_json, pack_id, image, image_region
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                self._question_to_params(question),
            )

    def create_many(self, questions: list[Question]) -> None:
        """Insert multiple questions."""
        with self._db.transaction() as cursor:
            cursor.executemany(
                """
                INSERT INTO questions (
                    id, subject, topic_id, difficulty, qtype, prompt,
                    payload_json, solution_json, explanation, tags_json,
                    variants_json, pack_id, image, image_region
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                [self._question_to_params(q) for q in questions],
            )

    def get_by_id(self, question_id: str) -> Optional[Question]:
        """Get question by ID."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM questions WHERE id = ?", (question_id,))
            row = cursor.fetchone()
            return self._row_to_question(row) if row else None

    def get_all(self) -> list[Question]:
        """Get all questions."""
        with self._db.cursor() as cursor:
            cursor.execute("SELECT * FROM questions ORDER BY topic_id, difficulty")
            return [self._row_to_question(row) for row in cursor.fetchall()]

    def get_by_topic(self, topic_id: str) -> list[Question]:
        """Get all questions for a topic."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM questions WHERE topic_id = ? ORDER BY difficulty",
                (topic_id,),
            )
            return [self._row_to_question(row) for row in cursor.fetchall()]

    def get_by_topic_and_difficulty(
        self, topic_id: str, min_diff: int, max_diff: int
    ) -> list[Question]:
        """Get questions for a topic within difficulty range."""
        with self._db.cursor() as cursor:
            cursor.execute(
                """
                SELECT * FROM questions
                WHERE topic_id = ? AND difficulty >= ? AND difficulty <= ?
                ORDER BY difficulty
                """,
                (topic_id, min_diff, max_diff),
            )
            return [self._row_to_question(row) for row in cursor.fetchall()]

    def get_by_subject(self, subject: Subject) -> list[Question]:
        """Get all questions for a subject."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM questions WHERE subject = ? ORDER BY topic_id, difficulty",
                (subject.value,),
            )
            return [self._row_to_question(row) for row in cursor.fetchall()]

    def update(self, question: Question) -> None:
        """Update question."""
        params = self._question_to_params(question)
        # Move id to end for WHERE clause
        params = params[1:] + (params[0],)
        with self._db.transaction() as cursor:
            cursor.execute(
                """
                UPDATE questions SET
                    subject = ?, topic_id = ?, difficulty = ?, qtype = ?, prompt = ?,
                    payload_json = ?, solution_json = ?, explanation = ?, tags_json = ?,
                    variants_json = ?, pack_id = ?, image = ?, image_region = ?
                WHERE id = ?
                """,
                params,
            )

    def delete(self, question_id: str) -> None:
        """Delete question by ID."""
        with self._db.transaction() as cursor:
            cursor.execute("DELETE FROM questions WHERE id = ?", (question_id,))

    def delete_by_pack(self, pack_id: str) -> None:
        """Delete all questions from a pack."""
        with self._db.transaction() as cursor:
            cursor.execute("DELETE FROM questions WHERE pack_id = ?", (pack_id,))

    def count_by_topic(self, topic_id: str) -> int:
        """Count questions for a topic."""
        with self._db.cursor() as cursor:
            cursor.execute(
                "SELECT COUNT(*) as cnt FROM questions WHERE topic_id = ?",
                (topic_id,),
            )
            row = cursor.fetchone()
            return row["cnt"] if row else 0

    @staticmethod
    def _question_to_params(q: Question) -> tuple:
        """Convert Question to database parameters."""
        variants_json = None
        if q.variants:
            variants_json = json.dumps({
                "enabled": q.variants.enabled,
                "seedable": q.variants.seedable,
                "template": q.variants.template,
                "variables": q.variants.variables,
            })

        # Serialize image_region as JSON if present
        image_region_json = None
        if q.image_region:
            image_region_json = json.dumps(list(q.image_region))

        return (
            q.id,
            q.subject.value,
            q.topic_id,
            q.difficulty,
            q.qtype.value,
            q.prompt,
            json.dumps(q.payload),
            json.dumps(q.solution),
            q.explanation,
            json.dumps(q.tags),
            variants_json,
            q.pack_id,
            q.image,
            image_region_json,
        )

    @staticmethod
    def _row_to_question(row: dict) -> Question:
        """Convert database row to Question model."""
        variants = None
        if row["variants_json"]:
            v = json.loads(row["variants_json"])
            variants = VariantSpec(
                enabled=v["enabled"],
                seedable=v["seedable"],
                template=v["template"],
                variables=v["variables"],
            )

        # Parse image fields if columns exist (migration v2+)
        image = None
        image_region = None
        row_keys = row.keys()
        if "image" in row_keys and row["image"]:
            image = row["image"]
        if "image_region" in row_keys and row["image_region"]:
            region = json.loads(row["image_region"])
            if len(region) == 4:
                image_region = tuple(region)

        return Question(
            id=row["id"],
            subject=Subject(row["subject"]),
            topic_id=row["topic_id"],
            difficulty=row["difficulty"],
            qtype=QuestionType(row["qtype"]),
            prompt=row["prompt"],
            payload=json.loads(row["payload_json"]),
            solution=json.loads(row["solution_json"]),
            explanation=row["explanation"],
            tags=json.loads(row["tags_json"]),
            pack_id=row["pack_id"],
            variants=variants,
            image=image,
            image_region=image_region,
        )
