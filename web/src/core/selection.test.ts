import { describe, expect, it } from "vitest";
import { INDEX } from "./fixtures.test-helper";
import { InMemoryProgressStore } from "./progress";
import { rngFromSeed } from "./rng";
import { computePriority, recencyFactor, scoreTopics, selectDifficulty, selectTopics } from "./selection";
import type { Attempt } from "./types";

const NOW = new Date("2026-09-02T12:00:00Z");
const attempt = (topicId: string, isCorrect: boolean, i: number): Attempt => ({
  id: `a${i}`,
  userId: "u",
  questionId: "q",
  variantId: "v",
  topicId,
  subject: "MATH",
  isCorrect,
  responseTimeMs: 1000,
  userAnswer: "",
  vars: {},
  createdAt: new Date(NOW.getTime() - (100 - i) * 1000).toISOString(),
});

describe("computePriority", () => {
  it("unpracticed topics get priority 1", () => {
    expect(computePriority(new InMemoryProgressStore(), "u", "MATH_NUM_PCT", NOW)).toBe(1);
  });
  it("applies the weighted formula", () => {
    const store = new InMemoryProgressStore({
      mastery: [{ userId: "u", topicId: "T", masteryScore: 0.6, stability: 0.4, lastPracticedAt: new Date(NOW.getTime() - 3.5 * 86_400_000).toISOString(), attempts: 4 }],
      attempts: [attempt("T", false, 1), attempt("T", true, 2), attempt("T", true, 3), attempt("T", true, 4)],
    });
    // weakness .4*.45 + error .25*.25 + recency .5*.2 + stability .6*.1
    expect(computePriority(store, "u", "T", NOW)).toBeCloseTo(0.18 + 0.0625 + 0.1 + 0.06, 6);
  });
  it("recency saturates at 7 days and defaults to 14 days when never practiced", () => {
    expect(recencyFactor(null, NOW)).toBe(1);
    expect(recencyFactor(new Date(NOW.getTime() - 30 * 86_400_000).toISOString(), NOW)).toBe(1);
    expect(recencyFactor(NOW.toISOString(), NOW)).toBe(0);
  });
});

describe("selectDifficulty", () => {
  it.each([
    [0, [1, 2]],
    [0.44, [1, 2]],
    [0.45, [2, 3]],
    [0.74, [2, 3]],
    [0.75, [3, 4]],
    [1, [3, 4]],
  ])("mastery %f → %j", (m, range) => {
    expect(selectDifficulty(m)).toEqual(range);
  });
});

describe("selectTopics", () => {
  it("only offers practicable (leaf with questions) topics", () => {
    const ids = scoreTopics(INDEX, new InMemoryProgressStore(), "u", "MATH", NOW).map((s) => s.topic.id).sort();
    expect(ids).toEqual(["MATH_ALG_LIN", "MATH_NUM_FRAC", "MATH_NUM_PCT"]);
  });
  it("ranks weakest topics first in QUICK mode", () => {
    const store = new InMemoryProgressStore({
      mastery: [
        { userId: "u", topicId: "MATH_NUM_PCT", masteryScore: 0.9, stability: 0.9, lastPracticedAt: NOW.toISOString(), attempts: 10 },
        { userId: "u", topicId: "MATH_NUM_FRAC", masteryScore: 0.2, stability: 0.1, lastPracticedAt: NOW.toISOString(), attempts: 3 },
        { userId: "u", topicId: "MATH_ALG_LIN", masteryScore: 0.5, stability: 0.5, lastPracticedAt: NOW.toISOString(), attempts: 3 },
      ],
    });
    const topics = selectTopics(INDEX, store, "u", "MATH", "QUICK", 3, rngFromSeed(1, 1), NOW);
    expect(topics[0]).toBe("MATH_NUM_FRAC");
    expect(topics).toHaveLength(3);
    expect(new Set(topics).size).toBe(3);
  });
  it("ERRORS mode sorts by error rate then weakness", () => {
    const store = new InMemoryProgressStore({
      attempts: [attempt("MATH_NUM_PCT", false, 1), attempt("MATH_NUM_PCT", false, 2), attempt("MATH_NUM_FRAC", true, 3), attempt("MATH_NUM_FRAC", false, 4)],
    });
    expect(selectTopics(INDEX, store, "u", "MATH", "ERRORS", 2, rngFromSeed(1, 1), NOW)).toEqual(["MATH_NUM_PCT", "MATH_NUM_FRAC"]);
  });
  it("returns [] for a subject without questions", () => {
    expect(selectTopics(INDEX, new InMemoryProgressStore(), "u", "DE", "QUICK", 3, rngFromSeed(1, 1), NOW)).toEqual([]);
  });
});
