import { describe, expect, it } from "vitest";
import { REPAIR_SAME_TOPIC_COUNT } from "./constants";
import { INDEX } from "./fixtures.test-helper";
import { activateRepair, isTransferQuestion, nextRepairQuestion, onRepairAnswer } from "./repair";
import { rngFromSeed } from "./rng";

describe("activateRepair", () => {
  it("creates a queue with the parent as transfer topic", () => {
    const q = activateRepair(INDEX, "MATH_NUM_PCT", 3);
    expect(q).toEqual({ topicId: "MATH_NUM_PCT", currentDifficulty: 3, sameTopicRemaining: REPAIR_SAME_TOPIC_COUNT, transferPending: true, transferTopicId: "MATH_NUM" });
    expect(isTransferQuestion(q)).toBe(false);
  });
  it("falls back to the same topic when there is no parent", () => {
    expect(activateRepair(INDEX, "MATH", 2).transferTopicId).toBe("MATH");
  });
});

describe("onRepairAnswer", () => {
  const base = { topicId: "MATH_NUM_PCT", currentDifficulty: 3, sameTopicRemaining: 0, transferPending: true, transferTopicId: "MATH_NUM" };
  it("correct transfer exits", () => {
    expect(onRepairAnswer(base, true, true).exit).toBe(true);
  });
  it("wrong transfer restarts one level easier, never below 1", () => {
    const r = onRepairAnswer(base, false, true);
    expect(r.exit).toBe(false);
    expect(r.queue.currentDifficulty).toBe(2);
    expect(r.queue.sameTopicRemaining).toBe(REPAIR_SAME_TOPIC_COUNT);
    expect(onRepairAnswer({ ...base, currentDifficulty: 1 }, false, true).queue.currentDifficulty).toBe(1);
  });
  it("same-topic answers count down regardless of correctness", () => {
    const r = onRepairAnswer({ ...base, sameTopicRemaining: 2 }, false, false);
    expect(r.queue.sameTopicRemaining).toBe(1);
    expect(r.exit).toBe(false);
  });
});

describe("nextRepairQuestion", () => {
  const rng = rngFromSeed(5, 5);
  it("serves same-topic questions at or below the current difficulty", () => {
    const queue = activateRepair(INDEX, "MATH_NUM_PCT", 2);
    for (let i = 0; i < 20; i++) {
      const q = nextRepairQuestion(INDEX, queue, rng)!;
      expect(q.topicId).toBe("MATH_NUM_PCT");
      expect(q.difficulty).toBeLessThanOrEqual(2);
    }
  });
  it("serves a sibling-topic transfer question at difficulty ≥ current", () => {
    const queue = { ...activateRepair(INDEX, "MATH_NUM_PCT", 2), sameTopicRemaining: 0 };
    for (let i = 0; i < 20; i++) {
      const q = nextRepairQuestion(INDEX, queue, rng)!;
      expect(q.topicId).toBe("MATH_NUM_FRAC");
      expect(q.difficulty).toBeGreaterThanOrEqual(2);
    }
  });
  it("falls back to the same topic when no sibling has questions", () => {
    const queue = { ...activateRepair(INDEX, "MATH_ALG_LIN", 2), sameTopicRemaining: 0 };
    expect(nextRepairQuestion(INDEX, queue, rng)!.id).toBe("LIN_2");
  });
  it("prefers questions not in the avoid set", () => {
    const queue = activateRepair(INDEX, "MATH_NUM_PCT", 2);
    const q = nextRepairQuestion(INDEX, queue, rng, new Set(["PCT_1", "PCT_T"]))!;
    expect(q.id).toBe("PCT_2");
  });
});
