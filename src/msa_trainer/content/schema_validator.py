"""JSON Schema validation for content packs."""

import json
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, ValidationError as JsonSchemaError

from msa_trainer.core.models import ValidationError

# Schema definitions extracted for individual validation
PACK_MANIFEST_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "pack_id": {"type": "string", "minLength": 1},
        "version": {"type": "string", "minLength": 1},
        "title": {"type": "string", "minLength": 1},
        "min_app_version": {"type": "string", "minLength": 1},
        "subjects": {
            "type": "array",
            "items": {"type": "string", "enum": ["MATH", "DE", "EN"]},
            "minItems": 1,
        },
        "topic_file": {"type": "string", "minLength": 1},
        "question_files": {
            "type": "object",
            "additionalProperties": False,
            "properties": {
                "MATH": {"type": "string"},
                "DE": {"type": "string"},
                "EN": {"type": "string"},
            },
            "required": ["MATH", "DE", "EN"],
        },
    },
    "required": [
        "pack_id",
        "version",
        "title",
        "min_app_version",
        "subjects",
        "topic_file",
        "question_files",
    ],
}

TOPIC_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "id": {"type": "string", "minLength": 1},
        "subject": {"type": "string", "enum": ["MATH", "DE", "EN"]},
        "code": {"type": "string", "minLength": 1},
        "name": {"type": "string", "minLength": 1},
        "parent_id": {"type": ["string", "null"]},
    },
    "required": ["id", "subject", "code", "name", "parent_id"],
}

QUESTION_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "id": {"type": "string", "minLength": 1},
        "subject": {"type": "string", "enum": ["MATH", "DE", "EN"]},
        "topic_id": {"type": "string", "minLength": 1},
        "difficulty": {"type": "integer", "minimum": 1, "maximum": 5},
        "qtype": {"type": "string", "enum": ["MCQ", "CLOZE", "MATCH", "SHORT"]},
        "prompt": {"type": "string", "minLength": 1},
        "payload": {"type": "object"},
        "solution": {"type": "object"},
        "explanation": {"type": "string", "minLength": 1},
        "tags": {
            "type": "array",
            "items": {"type": "string", "minLength": 1},
            "minItems": 1,
        },
        "variants": {
            "type": "object",
            "additionalProperties": False,
            "properties": {
                "enabled": {"type": "boolean"},
                "seedable": {"type": "boolean"},
                "template": {"type": "string"},
                "variables": {"type": "object"},
            },
            "required": ["enabled", "seedable", "template", "variables"],
        },
        "image": {
            "type": "string",
            "description": "Relative path to image file within content pack",
        },
        "image_region": {
            "type": "array",
            "description": "Crop region as [x0, y0, x1, y1] in pixels",
            "items": {"type": "integer", "minimum": 0},
            "minItems": 4,
            "maxItems": 4,
        },
    },
    "required": [
        "id",
        "subject",
        "topic_id",
        "difficulty",
        "qtype",
        "prompt",
        "payload",
        "solution",
        "explanation",
        "tags",
    ],
}


class SchemaValidator:
    """Validates content pack data against JSON Schema."""

    def __init__(self, schema_path: Path | None = None) -> None:
        """Initialize validator, optionally loading full schema from file."""
        self._manifest_validator = Draft202012Validator(PACK_MANIFEST_SCHEMA)
        self._topic_validator = Draft202012Validator(TOPIC_SCHEMA)
        self._question_validator = Draft202012Validator(QUESTION_SCHEMA)

        if schema_path and schema_path.exists():
            full_schema = json.loads(schema_path.read_text(encoding="utf-8"))
            self._full_validator = Draft202012Validator(full_schema)
        else:
            self._full_validator = None

    def validate_manifest(self, data: dict[str, Any]) -> list[ValidationError]:
        """Validate pack manifest data."""
        return self._collect_errors(self._manifest_validator, data, "manifest")

    def validate_topics(self, data: list[dict[str, Any]]) -> list[ValidationError]:
        """Validate topics array."""
        errors: list[ValidationError] = []
        for i, topic in enumerate(data):
            topic_errors = self._collect_errors(
                self._topic_validator, topic, f"topics[{i}]"
            )
            errors.extend(topic_errors)
        return errors

    def validate_questions(self, data: list[dict[str, Any]]) -> list[ValidationError]:
        """Validate questions array."""
        errors: list[ValidationError] = []
        for i, question in enumerate(data):
            question_errors = self._collect_errors(
                self._question_validator, question, f"questions[{i}]"
            )
            errors.extend(question_errors)
        return errors

    @staticmethod
    def _collect_errors(
        validator: Draft202012Validator, data: Any, path_prefix: str
    ) -> list[ValidationError]:
        """Collect all validation errors from a validator."""
        errors: list[ValidationError] = []
        for error in validator.iter_errors(data):
            path = path_prefix
            if error.absolute_path:
                path += "." + ".".join(str(p) for p in error.absolute_path)
            errors.append(
                ValidationError(
                    path=path,
                    message=error.message,
                    details={"schema_path": list(error.schema_path)},
                )
            )
        return errors


def validate_cross_references(
    topics: list[dict[str, Any]], questions: list[dict[str, Any]]
) -> list[ValidationError]:
    """Validate that all references between topics and questions are valid."""
    errors: list[ValidationError] = []

    # Build set of valid topic IDs
    topic_ids = {t["id"] for t in topics}

    # Check parent_id references
    for i, topic in enumerate(topics):
        parent_id = topic.get("parent_id")
        if parent_id is not None and parent_id not in topic_ids:
            errors.append(
                ValidationError(
                    path=f"topics[{i}].parent_id",
                    message=f"Invalid parent_id reference: '{parent_id}' not found",
                )
            )

    # Check question topic_id references
    for i, question in enumerate(questions):
        topic_id = question.get("topic_id")
        if topic_id not in topic_ids:
            errors.append(
                ValidationError(
                    path=f"questions[{i}].topic_id",
                    message=f"Invalid topic_id reference: '{topic_id}' not found",
                )
            )

    return errors
