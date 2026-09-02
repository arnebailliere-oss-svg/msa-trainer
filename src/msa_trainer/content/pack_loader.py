"""Content pack loading and validation."""

import json
from pathlib import Path
from typing import Any

from msa_trainer.content.schema_validator import (
    SchemaValidator,
    validate_cross_references,
)
from msa_trainer.core.enums import QuestionType, Subject
from msa_trainer.core.models import ContentPack, Question, Topic, ValidationError, VariantSpec


class ContentPackLoader:
    """Loads and validates content pack directories."""

    def __init__(self, schema_path: Path | None = None) -> None:
        """Initialize loader with optional schema path for validation."""
        self._validator = SchemaValidator(schema_path)

    def load_pack(self, pack_dir: Path) -> tuple[ContentPack | None, list[ValidationError]]:
        """
        Load content pack from directory.

        Returns tuple of (ContentPack, errors). If errors is non-empty,
        ContentPack may be None or incomplete.
        """
        errors: list[ValidationError] = []

        # Load and validate manifest
        manifest_path = pack_dir / "pack_manifest.json"
        if not manifest_path.exists():
            errors.append(
                ValidationError(
                    path="pack_manifest.json",
                    message="Manifest file not found",
                )
            )
            return None, errors

        manifest_data = self._load_json(manifest_path, errors)
        if manifest_data is None:
            return None, errors

        manifest_errors = self._validator.validate_manifest(manifest_data)
        errors.extend(manifest_errors)

        if manifest_errors:
            return None, errors

        # Load topics
        topics_path = pack_dir / manifest_data["topic_file"]
        topics_data = self._load_json(topics_path, errors)
        if topics_data is None:
            return None, errors

        topic_errors = self._validator.validate_topics(topics_data)
        errors.extend(topic_errors)

        # Load questions from all subject files
        all_questions_data: list[dict[str, Any]] = []
        question_files = manifest_data["question_files"]

        for subject, filename in question_files.items():
            if not filename:
                continue
            question_path = pack_dir / filename
            if not question_path.exists():
                errors.append(
                    ValidationError(
                        path=f"question_files.{subject}",
                        message=f"Question file not found: {filename}",
                    )
                )
                continue

            subject_questions = self._load_json(question_path, errors)
            if subject_questions:
                all_questions_data.extend(subject_questions)

        question_errors = self._validator.validate_questions(all_questions_data)
        errors.extend(question_errors)

        # Cross-reference validation
        if not topic_errors and not question_errors:
            xref_errors = validate_cross_references(topics_data, all_questions_data)
            errors.extend(xref_errors)

        # If there are errors, return them
        if errors:
            return None, errors

        # Build ContentPack
        pack_id = manifest_data["pack_id"]

        topics = [
            Topic(
                id=t["id"],
                subject=Subject(t["subject"]),
                code=t["code"],
                name=t["name"],
                parent_id=t["parent_id"],
                pack_id=pack_id,
            )
            for t in topics_data
        ]

        questions = [
            self._dict_to_question(q, pack_id)
            for q in all_questions_data
        ]

        content_pack = ContentPack(
            pack_id=pack_id,
            version=manifest_data["version"],
            title=manifest_data["title"],
            min_app_version=manifest_data["min_app_version"],
            subjects=[Subject(s) for s in manifest_data["subjects"]],
            topics=topics,
            questions=questions,
        )

        return content_pack, errors

    @staticmethod
    def _load_json(path: Path, errors: list[ValidationError]) -> Any | None:
        """Load JSON file, appending errors if it fails."""
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            errors.append(
                ValidationError(
                    path=str(path.name),
                    message=f"Invalid JSON: {e.msg}",
                    details={"line": e.lineno, "column": e.colno},
                )
            )
            return None
        except OSError as e:
            errors.append(
                ValidationError(
                    path=str(path.name),
                    message=f"File read error: {e}",
                )
            )
            return None

    @staticmethod
    def _dict_to_question(data: dict[str, Any], pack_id: str) -> Question:
        """Convert question dict to Question model."""
        variants = None
        if "variants" in data and data["variants"]:
            v = data["variants"]
            variants = VariantSpec(
                enabled=v["enabled"],
                seedable=v["seedable"],
                template=v["template"],
                variables=v["variables"],
            )

        # Parse image_region if present (convert list to tuple)
        image_region = None
        if "image_region" in data and data["image_region"]:
            region = data["image_region"]
            if len(region) == 4:
                image_region = (region[0], region[1], region[2], region[3])

        return Question(
            id=data["id"],
            subject=Subject(data["subject"]),
            topic_id=data["topic_id"],
            difficulty=data["difficulty"],
            qtype=QuestionType(data["qtype"]),
            prompt=data["prompt"],
            payload=data["payload"],
            solution=data["solution"],
            explanation=data["explanation"],
            tags=data["tags"],
            pack_id=pack_id,
            variants=variants,
            image=data.get("image"),
            image_region=image_region,
        )
