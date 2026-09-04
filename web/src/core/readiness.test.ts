import { describe, expect, it } from "vitest";
import { buildContentIndex } from "./contentIndex";
import { INDEX, PACK } from "./fixtures.test-helper";
import { InMemoryProgressStore } from "./progress";
import { examPassed, modeOfAttempt, readiness } from "./readiness";
import type { Attempt } from "./types";

const NOW = new Date("2026-09-10T12:00:00Z");
const at = (topicId: string, i: number, isCorrect: boolean, daysAgo: number, extra: Partial<Attempt> = {}): Attempt => ({
  id: `${topicId}-${i}-${daysAgo}`,
  userId: "u",
  questionId: "PCT_3",
  variantId: `PCT_3::2026-09-10::QUICK::${i}`,
  topicId,
  subject: "MATH",
  isCorrect,
  responseTimeMs: 1000,
  userAnswer: "",
  vars: {},
  createdAt: new Date(NOW.getTime() - daysAgo * 86_400_000 + i * 60_000).toISOString(),
  difficulty: 3,
  ...extra,
});
const sicher = (topicId: string): Attempt[] => [at(topicId, 1, true, 1), at(topicId, 2, true, 1), at(topicId, 3, true, 1), at(topicId, 4, true, 0), at(topicId, 5, true, 0)];

describe("readiness", () => {
  it("is 0 for a new student with an estimate of the remaining work", () => {
    const r = readiness(INDEX, new InMemoryProgressStore(), "u", "MATH", NOW, 12);
    expect(r.percent).toBe(0);
    expect(r.ready).toBe(false);
    expect(r.remainingTasks).toBe(3 * 8);
    expect(r.remainingDays).toBe(2);
    expect(r.doneToday).toBe(0);
  });
  it("weights topics by priority: Sicher counts fully, Geübt half", () => {
    const pack = { ...PACK, topics: PACK.topics.map((t) => (t.id === "MATH_NUM_PCT" ? { ...t, priority: 3 as const } : t.id === "MATH_ALG_LIN" ? { ...t, priority: 1 as const } : t)) };
    const store = new InMemoryProgressStore({
      attempts: [...sicher("MATH_NUM_PCT"), at("MATH_NUM_FRAC", 1, true, 0), at("MATH_NUM_FRAC", 2, true, 0), at("MATH_NUM_FRAC", 3, true, 0), at("MATH_NUM_FRAC", 4, true, 0)],
    });
    const r = readiness(buildContentIndex(pack), store, "u", "MATH", NOW);
    // PCT (3) Sicher = 3, FRAC (2) Geübt = 1, LIN (1) Neu = 0 → 4 of 6
    expect(r.percent).toBeCloseTo(4 / 6);
    expect(r.missing).toHaveLength(0);
  });
  it("is ready only with ≥ 85 %, every priority-3 topic Sicher and a passed exam run", () => {
    const pack = { ...PACK, topics: PACK.topics.map((t) => (t.id === "MATH_NUM_PCT" ? { ...t, priority: 3 as const } : t)) };
    const index = buildContentIndex(pack);
    const allSicher = [...sicher("MATH_NUM_PCT"), ...sicher("MATH_NUM_FRAC"), ...sicher("MATH_ALG_LIN")];
    const without = readiness(index, new InMemoryProgressStore({ attempts: allSicher }), "u", "MATH", NOW);
    expect(without.percent).toBe(1);
    expect(without.examPassed).toBe(false);
    expect(without.ready).toBe(false);
    const examRun = Array.from({ length: 10 }, (_, i) => at("MATH_NUM_PCT", 20 + i, i < 7, 3, { mode: "MSA" }));
    const withExam = readiness(index, new InMemoryProgressStore({ attempts: [...allSicher, ...examRun] }), "u", "MATH", NOW);
    expect(withExam.examPassed).toBe(true);
    expect(withExam.ready).toBe(true);
  });
  it("reads the mode of older attempts from the variant id and counts today's Tagesplan tasks", () => {
    expect(modeOfAttempt(at("T", 1, true, 0, { variantId: "Q::2026-09-10::MSA::3" }))).toBe("MSA");
    expect(modeOfAttempt(at("T", 1, true, 0, { mode: "PLAN" }))).toBe("PLAN");
    const store = new InMemoryProgressStore({ attempts: [at("MATH_NUM_PCT", 1, true, 0, { mode: "PLAN" }), at("MATH_NUM_PCT", 2, false, 0, { mode: "PLAN" }), at("MATH_NUM_PCT", 3, true, 1, { mode: "PLAN" })] });
    expect(readiness(INDEX, store, "u", "MATH", NOW).doneToday).toBe(2);
    const failedRun = Array.from({ length: 10 }, (_, i) => at("MATH_NUM_PCT", 30 + i, i < 5, 2, { variantId: `Q::2026-09-08::MSA::${i}` }));
    expect(examPassed(new InMemoryProgressStore({ attempts: failedRun }), "u", "MATH")).toBe(false);
  });
});
