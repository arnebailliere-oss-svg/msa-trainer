"""Enumerations for MSA Trainer."""

from enum import Enum, auto


class Subject(str, Enum):
    """Subject areas for training."""

    MATH = "MATH"
    DE = "DE"
    EN = "EN"


class QuestionType(str, Enum):
    """Supported question types."""

    MCQ = "MCQ"
    CLOZE = "CLOZE"
    MATCH = "MATCH"
    SHORT = "SHORT"


class TrainingMode(str, Enum):
    """Training session modes."""

    QUICK = "QUICK"
    TOPIC = "TOPIC"
    ERRORS = "ERRORS"
    MSA = "MSA"


class AmpelState(str, Enum):
    """Traffic light states for mastery display."""

    RED = "RED"
    YELLOW = "YELLOW"
    GREEN = "GREEN"


class SessionState(Enum):
    """States for a training session."""

    IDLE = auto()
    SHOWING_QUESTION = auto()
    AWAITING_ANSWER = auto()
    SHOWING_FEEDBACK = auto()
    IN_REPAIR_MODE = auto()
    COMPLETED = auto()
