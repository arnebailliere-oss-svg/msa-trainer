/** Mastery engine — see docs/ALGORITHM.md §2–3. */

import {
  AMPEL_GREEN_STABILITY,
  AMPEL_RED_THRESHOLD,
  AMPEL_YELLOW_THRESHOLD,
  CORRECT_MASTERY_DELTA,
  CORRECT_STABILITY_DELTA,
  INCORRECT_MASTERY_DELTA,
  INCORRECT_STABILITY_DELTA,
  SPEED_BONUS,
  TARGET_TIMES_MS,
} from "./constants";
import type { AmpelState, MasteryState } from "./types";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function newMasteryState(userId: string, topicId: string): MasteryState {
  return { userId, topicId, masteryScore: 0, stability: 0, lastPracticedAt: null, attempts: 0 };
}

export function updateMastery(
  state: MasteryState,
  isCorrect: boolean,
  difficulty: number,
  responseTimeMs: number,
  now: Date = new Date(),
): MasteryState {
  let mastery = state.masteryScore;
  let stability = state.stability;
  if (isCorrect) {
    mastery += CORRECT_MASTERY_DELTA;
    stability += CORRECT_STABILITY_DELTA;
    const target = TARGET_TIMES_MS[difficulty] ?? TARGET_TIMES_MS[3]!;
    if (responseTimeMs < target) mastery += SPEED_BONUS;
  } else {
    mastery += INCORRECT_MASTERY_DELTA;
    stability += INCORRECT_STABILITY_DELTA;
  }
  return {
    ...state,
    masteryScore: clamp01(mastery),
    stability: clamp01(stability),
    lastPracticedAt: now.toISOString(),
    attempts: state.attempts + 1,
  };
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

export function masteryDelta(isCorrect: boolean, speedBonus = false): number {
  if (!isCorrect) return INCORRECT_MASTERY_DELTA;
  return CORRECT_MASTERY_DELTA + (speedBonus ? SPEED_BONUS : 0);
}
