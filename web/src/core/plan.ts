/**
 * Tagesplan — a bounded daily session assembled from what moves the student towards the exam:
 * due checks → repairs of recent errors → the next topics on the curriculum ladder (exam-relevant first)
 * → maintenance of "Sicher" topics. See docs/ALGORITHM.md §5.
 */

import { EXAM_DIFFICULTY, LEVEL_WINDOW, PLAN_MAX_CHECKS, PLAN_MAX_REPAIR_SLOTS, PLAN_SIZE } from "./constants";
import type { ContentIndex } from "./contentIndex";
import { topicLevel, type LevelInfo } from "./levels";
import type { ProgressStore } from "./progress";
import type { Subject, Topic } from "./types";

export type SlotReason = "check" | "repair" | "ladder" | "keep";

export interface PlanSlot {
  topicId: string;
  reason: SlotReason;
  minDifficulty: number;
  maxDifficulty: number;
}

export interface TopicLevelRow {
  topic: Topic;
  info: LevelInfo;
}

export const topicPriority = (t: Topic): 1 | 2 | 3 => t.priority ?? 2;

export const difficultyResolver =
  (index: ContentIndex) =>
  (questionId: string): number =>
    index.questionById(questionId)?.difficulty ?? 2;

/** Level of every practicable topic of a subject, in curriculum (topics.json) order. */
export function levelsFor(index: ContentIndex, store: ProgressStore, userId: string, subject: Subject, now: Date): TopicLevelRow[] {
  const diff = difficultyResolver(index);
  return index.practicableTopics(subject).map((topic) => ({ topic, info: topicLevel(store.attempts(userId, topic.id, 40), diff, now) }));
}

const byPriorityThenOldest = (a: TopicLevelRow, b: TopicLevelRow) => topicPriority(b.topic) - topicPriority(a.topic) || (a.info.lastPracticedAt ?? "").localeCompare(b.info.lastPracticedAt ?? "");

export function buildDailyPlan(index: ContentIndex, store: ProgressStore, userId: string, subject: Subject, size = PLAN_SIZE, now: Date = new Date()): PlanSlot[] {
  const rows = levelsFor(index, store, userId, subject, now);
  const slots: PlanSlot[] = [];
  const used = new Set<string>();
  const push = (topicId: string, reason: SlotReason, minDifficulty: number, maxDifficulty: number) => {
    if (slots.length < size) slots.push({ topicId, reason, minDifficulty, maxDifficulty });
  };

  // 1. Checks that are due: one exam-level task each.
  for (const r of rows.filter((r) => r.info.checkDue).sort(byPriorityThenOldest).slice(0, PLAN_MAX_CHECKS)) {
    push(r.topic.id, "check", EXAM_DIFFICULTY, 4);
    used.add(r.topic.id);
  }

  // 2. Repairs: started topics below "Geübt" with a recent error — two easier tasks each.
  let repairSlots = 0;
  const repairs = rows
    .filter((r) => r.info.level === 1 && !used.has(r.topic.id) && store.errorRate(userId, r.topic.id, LEVEL_WINDOW) > 0)
    .sort((a, b) => topicPriority(b.topic) - topicPriority(a.topic) || store.errorRate(userId, b.topic.id, LEVEL_WINDOW) - store.errorRate(userId, a.topic.id, LEVEL_WINDOW));
  for (const r of repairs) {
    if (repairSlots >= PLAN_MAX_REPAIR_SLOTS) break;
    push(r.topic.id, "repair", 1, 2);
    push(r.topic.id, "repair", 2, EXAM_DIFFICULTY);
    repairSlots += 2;
    used.add(r.topic.id);
  }

  // 3. Ladder: next topics below "Sicher" in curriculum order, exam-relevant (priority ≥ 2) before rare ones.
  const ladder = rows.filter((r) => r.info.level < 3 && !used.has(r.topic.id));
  for (const r of [...ladder.filter((r) => topicPriority(r.topic) >= 2), ...ladder.filter((r) => topicPriority(r.topic) === 1)]) {
    if (slots.length >= size) break;
    if (r.info.level === 2) {
      // "Geübt" → "Sicher" needs correct answers at exam difficulty.
      push(r.topic.id, "ladder", EXAM_DIFFICULTY, 4);
      push(r.topic.id, "ladder", EXAM_DIFFICULTY, 4);
    } else {
      push(r.topic.id, "ladder", 1, 2);
      push(r.topic.id, "ladder", 2, EXAM_DIFFICULTY);
      push(r.topic.id, "ladder", 2, EXAM_DIFFICULTY);
    }
    used.add(r.topic.id);
  }

  // 4. Everything "Sicher": keep the least recently practiced topics warm.
  for (const r of rows.filter((r) => !used.has(r.topic.id)).sort((a, b) => (a.info.lastPracticedAt ?? "").localeCompare(b.info.lastPracticedAt ?? ""))) {
    if (slots.length >= size) break;
    push(r.topic.id, "keep", EXAM_DIFFICULTY, 4);
  }

  // 5. Tiny packs: cycle through the topics rather than returning a short plan.
  for (let i = 0; slots.length < size && rows.length > 0 && i < size * 2; i++) push(rows[i % rows.length]!.topic.id, "keep", 1, 4);

  return slots;
}
