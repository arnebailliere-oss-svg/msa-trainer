"""Data models for MSA Trainer."""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Optional

from msa_trainer.core.enums import QuestionType, Subject


@dataclass(frozen=True)
class User:
    """Student profile."""

    id: str
    name: str
    created_at: datetime
    pin_hash: Optional[str] = None


@dataclass(frozen=True)
class Topic:
    """Training topic within a subject."""

    id: str
    subject: Subject
    code: str
    name: str
    parent_id: Optional[str]
    pack_id: str


@dataclass(frozen=True)
class VariantSpec:
    """Specification for question variants."""

    enabled: bool
    seedable: bool
    template: str
    variables: dict[str, Any]


@dataclass(frozen=True)
class Question:
    """Base question definition."""

    id: str
    subject: Subject
    topic_id: str
    difficulty: int
    qtype: QuestionType
    prompt: str
    payload: dict[str, Any]
    solution: dict[str, Any]
    explanation: str
    tags: list[str]
    pack_id: str
    variants: Optional[VariantSpec] = None
    image: Optional[str] = None  # Relative path to image file
    image_region: Optional[tuple[int, int, int, int]] = None  # Crop region (x0, y0, x1, y1)


@dataclass(frozen=True)
class RenderedQuestion:
    """A question ready for display, with any variants applied."""

    base_question_id: str
    variant_id: str
    subject: Subject
    topic_id: str
    difficulty: int
    qtype: QuestionType
    prompt: str
    payload: dict[str, Any]
    solution: dict[str, Any]
    explanation: str
    rendered_vars: dict[str, Any] = field(default_factory=dict)
    image: Optional[str] = None  # Relative path to image file
    image_region: Optional[tuple[int, int, int, int]] = None  # Crop region (x0, y0, x1, y1)


@dataclass
class MasteryState:
    """Mastery tracking for a user+topic combination."""

    user_id: str
    topic_id: str
    mastery_score: float = 0.0
    stability: float = 0.0
    last_practiced_at: Optional[datetime] = None
    streak_days: int = 0


@dataclass(frozen=True)
class Attempt:
    """A single question attempt record."""

    id: str
    user_id: str
    question_id: str
    variant_id: str
    topic_id: str
    is_correct: bool
    response_time_ms: int
    answer_json: dict[str, Any]
    created_at: datetime


@dataclass(frozen=True)
class AttemptResult:
    """Result of submitting an answer."""

    is_correct: bool
    explanation: str
    correct_answer: Any
    mastery_delta: float
    new_mastery_score: float


@dataclass(frozen=True)
class SessionStats:
    """Summary statistics for a completed session."""

    total_questions: int
    correct_count: int
    incorrect_count: int
    total_time_ms: int
    topics_practiced: list[str]
    strengthened_topics: list[str]
    weak_topics: list[str]


@dataclass
class RepairQueue:
    """State for repair mode after incorrect answer."""

    topic_id: str
    current_difficulty: int
    same_topic_remaining: int
    transfer_pending: bool
    transfer_topic_id: str


@dataclass(frozen=True)
class ContentPack:
    """A loaded content pack with all data."""

    pack_id: str
    version: str
    title: str
    min_app_version: str
    subjects: list[Subject]
    topics: list[Topic]
    questions: list[Question]


@dataclass(frozen=True)
class ValidationError:
    """Error from content validation."""

    path: str
    message: str
    details: Optional[dict[str, Any]] = None
