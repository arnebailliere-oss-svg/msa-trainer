"""Answer normalization functions for comparison."""

import re
from typing import Any, Callable


def normalize_trim(value: str) -> str:
    """Remove leading/trailing whitespace."""
    return value.strip()


def normalize_lowercase(value: str) -> str:
    """Convert to lowercase."""
    return value.lower()


def normalize_comma_to_dot(value: str) -> str:
    """Replace German decimal comma with dot."""
    return value.replace(",", ".")


def normalize_remove_spaces(value: str) -> str:
    """Remove all whitespace."""
    return re.sub(r"\s+", "", value)


def normalize_collapse_spaces(value: str) -> str:
    """Replace multiple spaces with single space."""
    return re.sub(r"\s+", " ", value)


# Registry of available normalizers
NORMALIZERS: dict[str, Callable[[str], str]] = {
    "trim": normalize_trim,
    "lowercase": normalize_lowercase,
    "comma_to_dot": normalize_comma_to_dot,
    "remove_spaces": normalize_remove_spaces,
    "collapse_spaces": normalize_collapse_spaces,
}


def apply_normalizations(value: str, normalizations: list[str]) -> str:
    """Apply a list of normalizations in order."""
    result = value
    for norm_name in normalizations:
        if norm_name in NORMALIZERS:
            result = NORMALIZERS[norm_name](result)
    return result


def normalize_number(value: str) -> float | None:
    """
    Normalize a numeric string to float.

    Handles German number format (comma as decimal separator).
    Returns None if not a valid number.
    """
    try:
        # Apply standard normalizations
        normalized = normalize_trim(value)
        normalized = normalize_comma_to_dot(normalized)
        normalized = normalize_remove_spaces(normalized)
        return float(normalized)
    except (ValueError, TypeError):
        return None


def numbers_equal(a: Any, b: Any, tolerance: float = 0.0) -> bool:
    """Compare two numbers with optional tolerance."""
    try:
        num_a = float(a) if not isinstance(a, float) else a
        num_b = float(b) if not isinstance(b, float) else b
        return abs(num_a - num_b) <= tolerance
    except (ValueError, TypeError):
        return False
