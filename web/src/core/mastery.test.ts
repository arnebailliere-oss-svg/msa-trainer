import { describe, expect, it } from "vitest";
import { LEVEL_MASTERY } from "./constants";
import { EMPTY_LEVEL } from "./levels";
import { ampelForLevel, computeAmpel, levelFromMastery, masteryFromLevel, newMasteryState } from "./mastery";
import type { Level } from "./types";

const NOW = new Date("2026-09-02T12:00:00Z");

describe("masteryFromLevel", () => {
  it.each([0, 1, 2, 3, 4] as Level[])("level %i projects onto masteryScore and stability so the Ampel matches", (level) => {
    const attempts = level === 0 ? 0 : 5;
    const s = masteryFromLevel(newMasteryState("u", "t"), { ...EMPTY_LEVEL, level, lastPracticedAt: NOW.toISOString() }, NOW, attempts);
    expect(s.masteryScore).toBe(LEVEL_MASTERY[level]);
    expect(s.attempts).toBe(attempts);
    expect(s.lastPracticedAt).toBe(NOW.toISOString());
    expect(computeAmpel(s.masteryScore, s.stability)).toBe(ampelForLevel(level));
    expect(levelFromMastery(s)).toBe(level);
  });
  it("a fresh topic with one attempt reads back as Angefangen", () => {
    expect(levelFromMastery(undefined)).toBe(0);
    expect(levelFromMastery({ ...newMasteryState("u", "t"), attempts: 1, masteryScore: LEVEL_MASTERY[1] })).toBe(1);
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
