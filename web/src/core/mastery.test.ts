import { describe, expect, it } from "vitest";
import { CORRECT_MASTERY_DELTA, CORRECT_STABILITY_DELTA, INCORRECT_MASTERY_DELTA, INCORRECT_STABILITY_DELTA, SPEED_BONUS, TARGET_TIMES_MS } from "./constants";
import { computeAmpel, updateMastery } from "./mastery";
import type { MasteryState } from "./types";

const base = (): MasteryState => ({ userId: "u", topicId: "t", masteryScore: 0.5, stability: 0.5, lastPracticedAt: null, attempts: 0 });

describe("updateMastery", () => {
  it("correct answer adds +0.03 / +0.02", () => {
    const s = updateMastery(base(), true, 2, 40_000);
    expect(s.masteryScore).toBeCloseTo(0.5 + CORRECT_MASTERY_DELTA);
    expect(s.stability).toBeCloseTo(0.5 + CORRECT_STABILITY_DELTA);
    expect(s.attempts).toBe(1);
    expect(s.lastPracticedAt).not.toBeNull();
  });
  it("fast correct answer gets the speed bonus", () => {
    const s = updateMastery(base(), true, 2, TARGET_TIMES_MS[2]! - 5000);
    expect(s.masteryScore).toBeCloseTo(0.5 + CORRECT_MASTERY_DELTA + SPEED_BONUS);
  });
  it("incorrect answer subtracts 0.06 / 0.04", () => {
    const s = updateMastery(base(), false, 2, 40_000);
    expect(s.masteryScore).toBeCloseTo(0.5 + INCORRECT_MASTERY_DELTA);
    expect(s.stability).toBeCloseTo(0.5 + INCORRECT_STABILITY_DELTA);
  });
  it("clamps to [0, 1]", () => {
    expect(updateMastery({ ...base(), masteryScore: 0.99, stability: 0.99 }, true, 1, 1000).masteryScore).toBe(1);
    expect(updateMastery({ ...base(), masteryScore: 0.99, stability: 0.99 }, true, 1, 1000).stability).toBe(1);
    expect(updateMastery({ ...base(), masteryScore: 0.02, stability: 0.02 }, false, 1, 1000).masteryScore).toBe(0);
    expect(updateMastery({ ...base(), masteryScore: 0.02, stability: 0.02 }, false, 1, 1000).stability).toBe(0);
  });
});

describe("computeAmpel", () => {
  it.each([
    [0.3, 0.5, "RED"],
    [0.44, 0.9, "RED"],
    [0.6, 0.5, "YELLOW"],
    [0.8, 0.5, "YELLOW"],
    [0.8, 0.6, "GREEN"],
    [0.76, 0.56, "GREEN"],
    [0.75, 0.9, "YELLOW"],
  ])("mastery %f / stability %f → %s", (m, s, expected) => {
    expect(computeAmpel(m, s)).toBe(expected);
  });
});
