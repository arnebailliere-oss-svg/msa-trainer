/**
 * Mastery state — a projection of the Nachweis-Modell level (levels.ts) onto the stored numbers,
 * so the Ampel, selection and every view keep working. See docs/ALGORITHM.md §2–3.
 */

import { AMPEL_GREEN_STABILITY, AMPEL_RED_THRESHOLD, AMPEL_YELLOW_THRESHOLD, LEVEL_MASTERY } from "./constants";
import type { LevelInfo } from "./levels";
import type { AmpelState, Level, MasteryState } from "./types";

export function newMasteryState(userId: string, topicId: string): MasteryState {
  return { userId, topicId, masteryScore: 0, stability: 0, lastPracticedAt: null, attempts: 0 };
}

/** masteryScore by level; stability 1 from "Sicher" on, 0.5 for "Geübt", 0.2 below. */
export function masteryFromLevel(state: MasteryState, info: LevelInfo, now: Date, attempts: number): MasteryState {
  return {
    ...state,
    masteryScore: LEVEL_MASTERY[info.level],
    stability: info.level >= 3 ? 1 : info.level === 2 ? 0.5 : 0.2,
    lastPracticedAt: info.lastPracticedAt ?? now.toISOString(),
    attempts,
  };
}

/** Inverse of masteryFromLevel for views that only hold the stored state. */
export function levelFromMastery(state: MasteryState | undefined): Level {
  if (!state) return 0;
  const m = state.masteryScore;
  if (m >= LEVEL_MASTERY[4]) return 4;
  if (m >= LEVEL_MASTERY[3]) return 3;
  if (m >= LEVEL_MASTERY[2]) return 2;
  return state.attempts > 0 ? 1 : 0;
}

export function computeAmpel(masteryScore: number, stability: number): AmpelState {
  if (masteryScore < AMPEL_RED_THRESHOLD) return "RED";
  if (masteryScore > AMPEL_YELLOW_THRESHOLD && stability > AMPEL_GREEN_STABILITY) return "GREEN";
  return "YELLOW";
}

export function ampelFor(state: MasteryState | undefined): AmpelState {
  if (!state) return "RED";
  return computeAmpel(state.masteryScore, state.stability);
}

export function ampelForLevel(level: Level): AmpelState {
  return level >= 3 ? "GREEN" : level === 2 ? "YELLOW" : "RED";
}
