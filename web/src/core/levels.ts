/**
 * Nachweis-Modell — a topic's level is derived from the student's recent evidence, never accumulated.
 * See docs/ALGORITHM.md §2.
 *
 *   0 Neu          no attempts
 *   1 Angefangen   attempts, but fewer than 4 of the last 6 correct
 *   2 Geübt        4 of the last 6 correct
 *   3 Sicher       5 of the last 6 correct, ≥ 2 of them at exam difficulty, on ≥ 2 different days
 *   4 Prüfungsfest Sicher, plus a correct exam-level answer ≥ 3 days after reaching Sicher
 *
 * A Sicher/Prüfungsfest topic idle for more than 14 days shows as Geübt ("stale") until a check is passed.
 */

import { CHECK_AFTER_DAYS, EXAM_DIFFICULTY, GEUEBT_MIN_CORRECT, LEVEL_WINDOW, SICHER_MIN_CORRECT, SICHER_MIN_DAYS, SICHER_MIN_HARD, STALE_DAYS } from "./constants";
import type { Attempt, Level } from "./types";

export type { Level };

export const LEVEL_LABEL: Record<Level, string> = { 0: "Neu", 1: "Angefangen", 2: "Geübt", 3: "Sicher", 4: "Prüfungsfest" };

export interface LevelInfo {
  level: Level;
  /** Correct answers among the attempts in the window. */
  correct: number;
  /** Attempts in the window (≤ LEVEL_WINDOW). */
  window: number;
  /** Correct answers at exam difficulty in the window. */
  hardCorrect: number;
  /** Different days with a correct answer in the window. */
  days: number;
  /** When the current "Sicher" streak began, null if not Sicher. */
  sicherSince: string | null;
  lastPracticedAt: string | null;
  /** A short exam-level check is due (Sicher for ≥ 3 days without the check, or stale). */
  checkDue: boolean;
  /** Was Sicher/Prüfungsfest but idle for more than STALE_DAYS. */
  stale: boolean;
}

export const EMPTY_LEVEL: LevelInfo = { level: 0, correct: 0, window: 0, hardCorrect: 0, days: 0, sicherSince: null, lastPracticedAt: null, checkDue: false, stale: false };

const DAY_MS = 86_400_000;
const dayKey = (iso: string) => iso.slice(0, 10);
export const daysBetween = (fromIso: string, to: Date): number => (to.getTime() - new Date(fromIso).getTime()) / DAY_MS;

interface Row {
  isCorrect: boolean;
  hard: boolean;
  day: string;
}

function evaluate(window: Row[]): { correct: number; hardCorrect: number; days: number; geuebt: boolean; sicher: boolean } {
  const correct = window.filter((r) => r.isCorrect).length;
  const hardCorrect = window.filter((r) => r.isCorrect && r.hard).length;
  const days = new Set(window.filter((r) => r.isCorrect).map((r) => r.day)).size;
  const geuebt = correct >= GEUEBT_MIN_CORRECT;
  const sicher = correct >= SICHER_MIN_CORRECT && hardCorrect >= SICHER_MIN_HARD && days >= SICHER_MIN_DAYS;
  return { correct, hardCorrect, days, geuebt, sicher };
}

/**
 * Compute the level of one topic from its attempts (any order) — `difficultyOf` resolves an attempt's
 * question difficulty (older attempts do not carry it).
 */
export function topicLevel(attempts: readonly Attempt[], difficultyOf: (questionId: string) => number, now: Date): LevelInfo {
  if (attempts.length === 0) return EMPTY_LEVEL;
  const sorted = [...attempts].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const window: Row[] = [];
  let sicherSince: string | null = null;
  let pruefungsfest = false;
  for (const a of sorted) {
    window.push({ isCorrect: a.isCorrect, hard: (a.difficulty ?? difficultyOf(a.questionId)) >= EXAM_DIFFICULTY, day: dayKey(a.createdAt) });
    if (window.length > LEVEL_WINDOW) window.shift();
    const e = evaluate(window);
    if (!e.sicher) {
      sicherSince = null;
      pruefungsfest = false;
      continue;
    }
    if (sicherSince === null) sicherSince = a.createdAt;
    else if (a.isCorrect && window[window.length - 1]!.hard && daysBetween(sicherSince, new Date(a.createdAt)) >= CHECK_AFTER_DAYS) pruefungsfest = true;
  }
  const e = evaluate(window);
  const lastPracticedAt = sorted[sorted.length - 1]!.createdAt;
  let level: Level = pruefungsfest ? 4 : e.sicher ? 3 : e.geuebt ? 2 : 1;
  let stale = false;
  let checkDue = false;
  if (level >= 3 && daysBetween(lastPracticedAt, now) > STALE_DAYS) {
    level = 2;
    stale = true;
    checkDue = true;
  } else if (level === 3 && sicherSince && daysBetween(sicherSince, now) >= CHECK_AFTER_DAYS) {
    checkDue = true;
  }
  return { level, correct: e.correct, window: window.length, hardCorrect: e.hardCorrect, days: e.days, sicherSince: level >= 3 ? sicherSince : null, lastPracticedAt, checkDue, stale };
}

/** Rough number of tasks still needed to reach "Prüfungsfest" — used for the readiness estimate. */
export function tasksToFinish(info: LevelInfo): number {
  if (info.stale) return 2;
  switch (info.level) {
    case 0:
      return 8;
    case 1:
      return 7;
    case 2:
      return 4;
    case 3:
      return 1;
    default:
      return 0;
  }
}
