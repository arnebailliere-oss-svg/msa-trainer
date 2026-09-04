import { describe, expect, it } from "vitest";
import { buildContentIndex } from "./contentIndex";
import { INDEX, PACK } from "./fixtures.test-helper";
import { buildDailyPlan } from "./plan";
import { InMemoryProgressStore } from "./progress";
import type { Attempt } from "./types";

const NOW = new Date("2026-09-10T12:00:00Z");
const at = (topicId: string, i: number, isCorrect: boolean, daysAgo: number, difficulty = 3, questionId = "PCT_3"): Attempt => ({
  id: `${topicId}-${i}`,
  userId: "u",
  questionId,
  variantId: "v",
  topicId,
  subject: "MATH",
  isCorrect,
  responseTimeMs: 1000,
  userAnswer: "",
  vars: {},
  createdAt: new Date(NOW.getTime() - daysAgo * 86_400_000 + i * 60_000).toISOString(),
  difficulty,
});
/** Five correct exam-level answers on two days → Sicher since `sinceDaysAgo`. */
const sicher = (topicId: string, sinceDaysAgo: number): Attempt[] => [at(topicId, 1, true, sinceDaysAgo + 1), at(topicId, 2, true, sinceDaysAgo + 1), at(topicId, 3, true, sinceDaysAgo + 1), at(topicId, 4, true, sinceDaysAgo), at(topicId, 5, true, sinceDaysAgo)];

describe("buildDailyPlan", () => {
  it("a new student climbs the ladder in curriculum order, three tasks per topic", () => {
    const plan = buildDailyPlan(INDEX, new InMemoryProgressStore(), "u", "MATH", 6, NOW);
    expect(plan.map((s) => s.topicId)).toEqual(["MATH_NUM_PCT", "MATH_NUM_PCT", "MATH_NUM_PCT", "MATH_NUM_FRAC", "MATH_NUM_FRAC", "MATH_NUM_FRAC"]);
    expect(plan.every((s) => s.reason === "ladder")).toBe(true);
    expect(plan[0]).toMatchObject({ minDifficulty: 1, maxDifficulty: 2 });
    expect(plan[1]).toMatchObject({ minDifficulty: 2, maxDifficulty: 3 });
  });
  it("always fills the requested size, cycling through a tiny pack", () => {
    expect(buildDailyPlan(INDEX, new InMemoryProgressStore(), "u", "MATH", 12, NOW)).toHaveLength(12);
  });
  it("a Geübt topic gets two exam-level tasks so it can become Sicher", () => {
    const store = new InMemoryProgressStore({ attempts: [at("MATH_NUM_PCT", 1, true, 0), at("MATH_NUM_PCT", 2, true, 0), at("MATH_NUM_PCT", 3, true, 0), at("MATH_NUM_PCT", 4, true, 0)] });
    const plan = buildDailyPlan(INDEX, store, "u", "MATH", 4, NOW);
    expect(plan.slice(0, 2)).toEqual([
      { topicId: "MATH_NUM_PCT", reason: "ladder", minDifficulty: 3, maxDifficulty: 4 },
      { topicId: "MATH_NUM_PCT", reason: "ladder", minDifficulty: 3, maxDifficulty: 4 },
    ]);
  });
  it("due checks come first, repairs second, then the ladder", () => {
    const store = new InMemoryProgressStore({
      attempts: [
        ...sicher("MATH_NUM_PCT", 4), // Sicher for 4 days → check due
        at("MATH_NUM_FRAC", 1, false, 0), // started with an error → repair
        at("MATH_NUM_FRAC", 2, true, 0),
      ],
    });
    const plan = buildDailyPlan(INDEX, store, "u", "MATH", 6, NOW);
    expect(plan.map((s) => `${s.reason}:${s.topicId}`)).toEqual([
      "check:MATH_NUM_PCT",
      "repair:MATH_NUM_FRAC",
      "repair:MATH_NUM_FRAC",
      "ladder:MATH_ALG_LIN",
      "ladder:MATH_ALG_LIN",
      "ladder:MATH_ALG_LIN",
    ]);
    expect(plan[0]).toMatchObject({ minDifficulty: 3, maxDifficulty: 4 });
  });
  it("rare topics (priority 1) wait until the exam-relevant ones are Sicher", () => {
    const pack = { ...PACK, topics: PACK.topics.map((t) => (t.id === "MATH_NUM_PCT" ? { ...t, priority: 1 as const } : t)) };
    const plan = buildDailyPlan(buildContentIndex(pack), new InMemoryProgressStore(), "u", "MATH", 9, NOW);
    expect(plan.map((s) => s.topicId)).toEqual(["MATH_NUM_FRAC", "MATH_NUM_FRAC", "MATH_NUM_FRAC", "MATH_ALG_LIN", "MATH_ALG_LIN", "MATH_ALG_LIN", "MATH_NUM_PCT", "MATH_NUM_PCT", "MATH_NUM_PCT"]);
  });
  it("when everything is Sicher the plan keeps the least recently practiced topics warm", () => {
    const store = new InMemoryProgressStore({ attempts: [...sicher("MATH_NUM_PCT", 1), ...sicher("MATH_NUM_FRAC", 2), ...sicher("MATH_ALG_LIN", 0)] });
    const plan = buildDailyPlan(INDEX, store, "u", "MATH", 3, NOW);
    expect(plan.map((s) => `${s.reason}:${s.topicId}`)).toEqual(["keep:MATH_NUM_FRAC", "keep:MATH_NUM_PCT", "keep:MATH_ALG_LIN"]);
  });
});
