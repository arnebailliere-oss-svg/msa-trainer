"""Constants for MSA Trainer algorithms."""

# Mastery score update deltas
CORRECT_MASTERY_DELTA = 0.03
CORRECT_STABILITY_DELTA = 0.02
SPEED_BONUS = 0.01
INCORRECT_MASTERY_DELTA = -0.06
INCORRECT_STABILITY_DELTA = -0.04

# Ampel (traffic light) thresholds
AMPEL_RED_THRESHOLD = 0.45
AMPEL_YELLOW_THRESHOLD = 0.75
AMPEL_GREEN_STABILITY = 0.55

# Selection engine weights
WEIGHT_WEAKNESS = 0.45
WEIGHT_ERROR_RATE = 0.25
WEIGHT_RECENCY = 0.20
WEIGHT_STABILITY = 0.10

# Quick training distribution
QUICK_TOP_PRIORITY_RATIO = 0.70
QUICK_YELLOW_RATIO = 0.20
QUICK_GREEN_RATIO = 0.10

# Target times per difficulty level (in milliseconds)
TARGET_TIMES_MS: dict[int, int] = {
    1: 20_000,
    2: 35_000,
    3: 55_000,
    4: 75_000,
    5: 90_000,
}

# Difficulty selection based on mastery score
DIFFICULTY_BY_MASTERY: list[tuple[float, tuple[int, int]]] = [
    (0.45, (1, 2)),   # mastery < 0.45 -> difficulty 1-2
    (0.75, (2, 3)),   # mastery 0.45-0.75 -> difficulty 2-3
    (1.01, (3, 4)),   # mastery > 0.75 -> difficulty 3-4
]

# Repair mode settings
REPAIR_SAME_TOPIC_COUNT = 2
REPAIR_TRANSFER_COUNT = 1

# Recency calculation
DEFAULT_RECENCY_DAYS = 14
RECENCY_NORMALIZATION_DAYS = 7.0

# Error rate calculation
ERROR_RATE_RECENT_ATTEMPTS = 20

# Variant counter daily limit
MAX_VARIANTS_PER_TOPIC_PER_DAY = 40
