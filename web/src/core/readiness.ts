/**
 * Prüfungsreife — one visible score per subject: the priority-weighted share of topics at "Sicher"
 * or better, plus the conditions for "prüfungsreif". See docs/ALGORITHM.md §3.
 */

import { EXAM_MIN_TASKS, EXAM_PASS_RATIO, PLAN_SIZE, READY_PERCENT } from "./constants";
import type { ContentIndex } from "./contentIndex";
import { tasksToFinish, type LevelInfo } from "./levels";
import { levelsFor, topicPriority } from "./plan";
import type { ProgressStore } from "./progress";
import type { Attempt, Subject, Topic } from "./types";

export interface TopicStatus {
  topic: Topic;
  priority: 1 | 2 | 3;
  info: LevelInfo;
}

export interface Readiness {
  /** 0..1, priority-weighted: Sicher/Prüfungsfest = 1, Geübt = ½, below = 0. */
  percent: number;
  ready: boolean;
  examPassed: boolean;
  topics: TopicStatus[];
  /** Priority-3 topics not yet "Sicher". */
  missing: TopicStatus[];
  remainingTasks: number;
  remainingDays: number;
  /** Tagesplan tasks answered today. */
  doneToday: number;
  goal: number;
}

/** Older attempts carry the mode only inside the variant id (base::date::mode::counter). */
export const modeOfAttempt = (a: Attempt): string => a.mode ?? a.variantId.split("::")[2] ?? "";

const levelScore = (level: number): number => (level >= 3 ? 1 : level === 2 ? 0.5 : 0);

/** A Prüfungs-Modus day with ≥ EXAM_MIN_TASKS tasks and ≥ EXAM_PASS_RATIO correct counts as a passed run. */
export function examPassed(store: ProgressStore, userId: string, subject: Subject): boolean {
  const byDay = new Map<string, { n: number; c: number }>();
  for (const a of store.attempts(userId, undefined, 10_000)) {
    if (a.subject !== subject || modeOfAttempt(a) !== "MSA") continue;
    const day = a.createdAt.slice(0, 10);
    const e = byDay.get(day) ?? { n: 0, c: 0 };
    e.n += 1;
    if (a.isCorrect) e.c += 1;
    byDay.set(day, e);
  }
  return [...byDay.values()].some((e) => e.n >= EXAM_MIN_TASKS && e.c / e.n >= EXAM_PASS_RATIO);
}

export function readiness(index: ContentIndex, store: ProgressStore, userId: string, subject: Subject, now: Date = new Date(), goal = PLAN_SIZE): Readiness {
  const topics: TopicStatus[] = levelsFor(index, store, userId, subject, now).map((r) => ({ ...r, priority: topicPriority(r.topic) }));
  const weight = topics.reduce((s, t) => s + t.priority, 0);
  const got = topics.reduce((s, t) => s + t.priority * levelScore(t.info.level), 0);
  const percent = weight ? got / weight : 0;
  const missing = topics.filter((t) => t.priority === 3 && t.info.level < 3);
  const passed = examPassed(store, userId, subject);
  const remainingTasks = topics.reduce((s, t) => s + tasksToFinish(t.info), 0);
  const today = now.toISOString().slice(0, 10);
  const doneToday = store.attempts(userId, undefined, 1000).filter((a) => a.subject === subject && modeOfAttempt(a) === "PLAN" && a.createdAt.slice(0, 10) === today).length;
  return {
    percent,
    ready: percent >= READY_PERCENT && missing.length === 0 && passed,
    examPassed: passed,
    topics,
    missing,
    remainingTasks,
    remainingDays: Math.ceil(remainingTasks / goal),
    doneToday,
    goal,
  };
}
