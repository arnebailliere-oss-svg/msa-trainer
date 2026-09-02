"""Question selection engine.

Implements the topic selection algorithm from docs/ALGORITHM.md.
"""

import random
from datetime import datetime
from typing import Optional

from msa_trainer.core.constants import (
    DEFAULT_RECENCY_DAYS,
    DIFFICULTY_BY_MASTERY,
    ERROR_RATE_RECENT_ATTEMPTS,
    QUICK_GREEN_RATIO,
    QUICK_TOP_PRIORITY_RATIO,
    QUICK_YELLOW_RATIO,
    RECENCY_NORMALIZATION_DAYS,
    WEIGHT_ERROR_RATE,
    WEIGHT_RECENCY,
    WEIGHT_STABILITY,
    WEIGHT_WEAKNESS,
)
from msa_trainer.core.enums import AmpelState, Subject, TrainingMode
from msa_trainer.core.mastery_engine import MasteryEngine
from msa_trainer.core.models import MasteryState
from msa_trainer.persistence.repositories.attempt_repo import AttemptRepository
from msa_trainer.persistence.repositories.mastery_repo import MasteryRepository
from msa_trainer.persistence.repositories.topic_repo import TopicRepository


class SelectionEngine:
    """Prioritizes topics for training sessions.

    Priority formula (from ALGORITHM.md):
    priority = 0.45 * weakness + 0.25 * error_rate + 0.20 * recency + 0.10 * stability_factor

    Where:
    - weakness = 1 - mastery_score
    - error_rate = errors in last 20 attempts (0.0-1.0)
    - recency_factor = min(1.0, days_since_practiced / 7.0)
    - stability_factor = 1 - stability
    """

    def __init__(
        self,
        attempt_repo: AttemptRepository,
        mastery_repo: MasteryRepository,
        topic_repo: TopicRepository,
    ) -> None:
        self._attempt_repo = attempt_repo
        self._mastery_repo = mastery_repo
        self._topic_repo = topic_repo
        self._mastery_engine = MasteryEngine()

    def compute_priority(self, user_id: str, topic_id: str) -> float:
        """
        Calculate priority score (0.0-1.0) for a topic.

        Higher score = higher priority for selection.
        """
        mastery = self._mastery_repo.get_by_user_topic(user_id, topic_id)

        if mastery is None:
            # New topic - high priority
            return 1.0

        # Calculate factors
        weakness = 1.0 - mastery.mastery_score

        error_rate = self._attempt_repo.get_error_rate(
            user_id, topic_id, ERROR_RATE_RECENT_ATTEMPTS
        )

        recency_factor = self._calculate_recency_factor(mastery.last_practiced_at)

        stability_factor = 1.0 - mastery.stability

        # Weighted sum
        priority = (
            WEIGHT_WEAKNESS * weakness
            + WEIGHT_ERROR_RATE * error_rate
            + WEIGHT_RECENCY * recency_factor
            + WEIGHT_STABILITY * stability_factor
        )

        return min(1.0, max(0.0, priority))

    def select_topics(
        self,
        user_id: str,
        subject: Subject,
        mode: TrainingMode,
        count: int,
        rng: Optional[random.Random] = None,
    ) -> list[str]:
        """
        Select topics for a training session.

        Args:
            user_id: Current user
            subject: Subject to train
            mode: Training mode
            count: Number of topics to select
            rng: Optional random generator for deterministic selection

        Returns:
            List of topic_ids in priority order
        """
        if rng is None:
            rng = random.Random()

        topics = self._topic_repo.get_by_subject(subject)

        if mode == TrainingMode.TOPIC:
            # Topic mode expects a fixed topic - not applicable here
            return [t.id for t in topics[:count]]

        elif mode == TrainingMode.ERRORS:
            # Sort by error rate, then weakness
            return self._select_error_list(user_id, topics, count)

        elif mode in (TrainingMode.QUICK, TrainingMode.MSA):
            # Adaptive selection
            return self._select_quick_training(user_id, topics, count, rng)

        return [t.id for t in topics[:count]]

    def _select_quick_training(
        self,
        user_id: str,
        topics: list,
        count: int,
        rng: random.Random,
    ) -> list[str]:
        """
        Select topics for Quick Training mode.

        Distribution:
        - 70% from top priority topics
        - 20% from yellow topics
        - 10% from green topics
        """
        # Categorize topics by ampel state
        red_yellow_topics: list[tuple[str, float]] = []
        green_topics: list[str] = []

        for topic in topics:
            mastery = self._mastery_repo.get_by_user_topic(user_id, topic.id)
            if mastery is None:
                # Unpracticed - treat as red
                red_yellow_topics.append((topic.id, 1.0))
            else:
                ampel = self._mastery_engine.get_ampel_for_state(mastery)
                if ampel == AmpelState.GREEN:
                    green_topics.append(topic.id)
                else:
                    priority = self.compute_priority(user_id, topic.id)
                    red_yellow_topics.append((topic.id, priority))

        # Sort red/yellow by priority (descending)
        red_yellow_topics.sort(key=lambda x: x[1], reverse=True)

        # Calculate distribution
        top_count = int(count * QUICK_TOP_PRIORITY_RATIO)
        yellow_count = int(count * QUICK_YELLOW_RATIO)
        green_count = count - top_count - yellow_count

        selected: list[str] = []

        # Top priority
        for topic_id, _ in red_yellow_topics[:top_count]:
            selected.append(topic_id)

        # Yellow topics (middle of list)
        mid_start = len(red_yellow_topics) // 3
        mid_end = 2 * len(red_yellow_topics) // 3
        yellow_pool = [t[0] for t in red_yellow_topics[mid_start:mid_end]]
        if yellow_pool:
            rng.shuffle(yellow_pool)
            selected.extend(yellow_pool[:yellow_count])

        # Green topics (random)
        if green_topics:
            rng.shuffle(green_topics)
            selected.extend(green_topics[:green_count])

        # If we don't have enough, fill from remaining
        remaining = [t[0] for t in red_yellow_topics if t[0] not in selected]
        remaining.extend([t for t in green_topics if t not in selected])
        rng.shuffle(remaining)
        while len(selected) < count and remaining:
            selected.append(remaining.pop())

        return selected[:count]

    def _select_error_list(
        self, user_id: str, topics: list, count: int
    ) -> list[str]:
        """Select topics for Error List mode - sorted by error rate."""
        scored: list[tuple[str, float, float]] = []

        for topic in topics:
            error_rate = self._attempt_repo.get_error_rate(
                user_id, topic.id, ERROR_RATE_RECENT_ATTEMPTS
            )
            mastery = self._mastery_repo.get_by_user_topic(user_id, topic.id)
            weakness = 1.0 - (mastery.mastery_score if mastery else 0.0)
            scored.append((topic.id, error_rate, weakness))

        # Sort by error_rate (desc), then weakness (desc)
        scored.sort(key=lambda x: (x[1], x[2]), reverse=True)

        return [t[0] for t in scored[:count]]

    def select_difficulty(self, mastery_score: float) -> tuple[int, int]:
        """
        Select difficulty range based on mastery score.

        Returns (min_difficulty, max_difficulty) tuple.
        """
        for threshold, difficulty_range in DIFFICULTY_BY_MASTERY:
            if mastery_score < threshold:
                return difficulty_range
        return (3, 4)  # Default for high mastery

    @staticmethod
    def _calculate_recency_factor(last_practiced: Optional[datetime]) -> float:
        """Calculate recency factor (0.0-1.0) from last practice time."""
        if last_practiced is None:
            return min(1.0, DEFAULT_RECENCY_DAYS / RECENCY_NORMALIZATION_DAYS)

        days_ago = (datetime.now() - last_practiced).days
        return min(1.0, days_ago / RECENCY_NORMALIZATION_DAYS)
