/**
 * Selection engine — docs/ALGORITHM.md §5–6.
 * priority = 0.45·weakness + 0.25·error_rate + 0.20·recency + 0.10·(1 − stability)
 */

import {
  DEFAULT_RECENCY_DAYS,
  DIFFICULTY_BY_MASTERY,
  ERROR_RATE_RECENT_ATTEMPTS,
  QUICK_TOP_PRIORITY_RATIO,
  QUICK_YELLOW_RATIO,
  RECENCY_NORMALIZATION_DAYS,
  WEIGHT_ERROR_RATE,
  WEIGHT_RECENCY,
  WEIGHT_STABILITY,
  WEIGHT_WEAKNESS,
} from "./constants";
import type { ContentIndex } from "./contentIndex";
import { ampelFor } from "./mastery";
import type { ProgressStore } from "./progress";
import type { Rng } from "./rng";
import type { Subject, Topic, TrainingMode } from "./types";

export function recencyFactor(lastPracticedAt: string | null, now: Date): number {
  if (!lastPracticedAt) return Math.min(1, DEFAULT_RECENCY_DAYS / RECENCY_NORMALIZATION_DAYS);
  const days = (now.getTime() - new Date(lastPracticedAt).getTime()) / 86_400_000;
  return Math.min(1, Math.max(0, days) / RECENCY_NORMALIZATION_DAYS);
}

export function computePriority(store: ProgressStore, userId: string, topicId: string, now: Date = new Date()): number {
  const mastery = store.getMastery(userId, topicId);
  if (!mastery) return 1;
  const weakness = 1 - mastery.masteryScore;
  const errorRate = store.errorRate(userId, topicId, ERROR_RATE_RECENT_ATTEMPTS);
  const recency = recencyFactor(mastery.lastPracticedAt, now);
  const stabilityFactor = 1 - mastery.stability;
  const p = WEIGHT_WEAKNESS * weakness + WEIGHT_ERROR_RATE * errorRate + WEIGHT_RECENCY * recency + WEIGHT_STABILITY * stabilityFactor;
  return Math.min(1, Math.max(0, p));
}

export function selectDifficulty(masteryScore: number): [number, number] {
  for (const [bound, range] of DIFFICULTY_BY_MASTERY) if (masteryScore < bound) return range;
  return [3, 4];
}

export interface TopicScore {
  topic: Topic;
  priority: number;
  ampel: "RED" | "YELLOW" | "GREEN";
}

/** Score every practicable topic of a subject (for dashboard + selection). */
export function scoreTopics(index: ContentIndex, store: ProgressStore, userId: string, subject: Subject, now: Date = new Date()): TopicScore[] {
  return index.practicableTopics(subject).map((topic) => ({
    topic,
    priority: computePriority(store, userId, topic.id, now),
    ampel: ampelFor(store.getMastery(userId, topic.id)),
  }));
}

/** Topics for a session, in priority order (QUICK/MSA: 70 % top, 20 % yellow, 10 % green). */
export function selectTopics(
  index: ContentIndex,
  store: ProgressStore,
  userId: string,
  subject: Subject,
  mode: TrainingMode,
  count: number,
  rng: Rng,
  now: Date = new Date(),
): string[] {
  const scored = scoreTopics(index, store, userId, subject, now);
  if (scored.length === 0) return [];

  if (mode === "ERRORS") {
    return scored
      .map((s) => ({ id: s.topic.id, err: store.errorRate(userId, s.topic.id), weak: 1 - (store.getMastery(userId, s.topic.id)?.masteryScore ?? 0) }))
      .sort((a, b) => b.err - a.err || b.weak - a.weak)
      .slice(0, count)
      .map((s) => s.id);
  }

  const redYellow = scored.filter((s) => s.ampel !== "GREEN").sort((a, b) => b.priority - a.priority);
  const green = rng.shuffle(scored.filter((s) => s.ampel === "GREEN").map((s) => s.topic.id));

  const topCount = Math.floor(count * QUICK_TOP_PRIORITY_RATIO);
  const yellowCount = Math.floor(count * QUICK_YELLOW_RATIO);
  const greenCount = count - topCount - yellowCount;

  const selected: string[] = redYellow.slice(0, topCount).map((s) => s.topic.id);
  const midStart = Math.floor(redYellow.length / 3);
  const midEnd = Math.floor((2 * redYellow.length) / 3);
  const yellowPool = rng.shuffle(redYellow.slice(midStart, midEnd).map((s) => s.topic.id).filter((id) => !selected.includes(id)));
  selected.push(...yellowPool.slice(0, yellowCount));
  selected.push(...green.slice(0, greenCount));

  const remaining = rng.shuffle([...redYellow.map((s) => s.topic.id), ...green].filter((id) => !selected.includes(id)));
  while (selected.length < count && remaining.length) selected.push(remaining.pop()!);
  return selected.slice(0, count);
}
