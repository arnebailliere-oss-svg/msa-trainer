import { describe, expect, it } from "vitest";
import { INDEX } from "./fixtures.test-helper";
import { InMemoryProgressStore } from "./progress";
import { rngFromSeed } from "./rng";
import { SessionController } from "./session";
import type { RenderedQuestion } from "./types";

const correctAnswer = (q: RenderedQuestion): unknown => {
  const s = q.solution;
  if ("correct_choice" in s) return s.correct_choice;
  if ("value" in s) return String(s.value);
  return null;
};

function makeSession(opts: Partial<ConstructorParameters<typeof SessionController>[0]> = {}) {
  const events: string[] = [];
  const store = new InMemoryProgressStore({}, (kind) => events.push(kind));
  let t = new Date("2026-09-02T10:00:00Z").getTime();
  const now = () => new Date((t += 5000));
  const session = new SessionController({ userId: "u", subject: "MATH", mode: "QUICK", questionCount: 4, index: INDEX, store, rng: rngFromSeed(42, 42), now, ...opts });
  return { session, store, events };
}

describe("SessionController", () => {
  it("runs a full session and completes", () => {
    const { session, store } = makeSession();
    let q = session.start();
    expect(q).not.toBeNull();
    expect(session.sessionState).toBe("QUESTION");
    let n = 0;
    while (q && n < 20) {
      const r = session.submit(correctAnswer(q))!;
      expect(r.isCorrect).toBe(true);
      expect(session.sessionState).toBe("FEEDBACK");
      q = session.next();
      n++;
    }
    expect(session.sessionState).toBe("COMPLETED");
    const stats = session.stats();
    expect(stats.totalQuestions).toBe(4);
    expect(stats.correctCount).toBe(4);
    expect(store.attempts("u")).toHaveLength(4);
    expect(store.allMastery("u").length).toBeGreaterThan(0);
  });

  it("persists the attempt before updating mastery", () => {
    const { session, events } = makeSession();
    const q = session.start()!;
    session.submit(correctAnswer(q));
    const firstAttempt = events.indexOf("attempt");
    const firstMastery = events.indexOf("mastery");
    expect(firstAttempt).toBeGreaterThanOrEqual(0);
    expect(firstAttempt).toBeLessThan(firstMastery);
  });

  it("wrong answer starts repair: 2 same-topic, then a transfer, correct transfer exits", () => {
    const { session } = makeSession({ questionCount: 10 });
    const q0 = session.start()!;
    const r0 = session.submit("definitely wrong")!;
    expect(r0.isCorrect).toBe(false);
    expect(r0.inRepairMode).toBe(true);
    expect(r0.masteryDelta).toBeLessThanOrEqual(0); // fresh topic clamps at 0
    expect(r0.newMasteryScore).toBe(0);
    expect(r0.ampel).toBe("RED");
    expect(session.repairQueue?.topicId).toBe(q0.topicId);

    const q1 = session.next()!;
    expect(q1.topicId).toBe(q0.topicId);
    expect(q1.difficulty).toBeLessThanOrEqual(q0.difficulty);
    session.submit(correctAnswer(q1));
    const q2 = session.next()!;
    expect(q2.topicId).toBe(q0.topicId);
    session.submit(correctAnswer(q2));
    expect(session.repairQueue?.sameTopicRemaining).toBe(0);

    const transfer = session.next()!;
    expect(transfer.topicId).not.toBe(q0.topicId);
    const rt = session.submit(correctAnswer(transfer))!;
    expect(rt.inRepairMode).toBe(false);
    expect(session.inRepairMode).toBe(false);
  });

  it("wrong transfer keeps repair mode and lowers difficulty", () => {
    const { session } = makeSession({ questionCount: 10 });
    const q0 = session.start()!;
    session.submit("wrong");
    session.submit(correctAnswer(session.next()!));
    session.submit(correctAnswer(session.next()!));
    session.next();
    const r = session.submit("wrong")!;
    expect(r.inRepairMode).toBe(true);
    expect(session.repairQueue?.currentDifficulty).toBe(Math.max(1, q0.difficulty - 1));
    expect(session.repairQueue?.sameTopicRemaining).toBe(2);
  });

  it("does not exceed the hard cap even with endless repair", () => {
    const { session } = makeSession({ questionCount: 3 });
    let q = session.start();
    let n = 0;
    while (q && n < 50) {
      session.submit("wrong");
      q = session.next();
      n++;
    }
    expect(session.sessionState).toBe("COMPLETED");
    expect(session.stats().totalQuestions).toBeLessThanOrEqual(6);
  });

  it("TOPIC mode stays inside the topic subtree", () => {
    const { session } = makeSession({ mode: "TOPIC", topicId: "MATH_NUM", questionCount: 6 });
    let q = session.start();
    while (q) {
      expect(["MATH_NUM_PCT", "MATH_NUM_FRAC"]).toContain(q.topicId);
      session.submit(correctAnswer(q));
      q = session.next();
    }
  });

  it("MSA mode never enters repair", () => {
    const { session } = makeSession({ mode: "MSA", questionCount: 3, minDifficulty: 1 });
    const q = session.start()!;
    const r = session.submit("wrong")!;
    expect(r.inRepairMode).toBe(false);
    expect(q).toBeTruthy();
  });

  it("variant counters advance per topic and day", () => {
    const { session, store } = makeSession({ mode: "TOPIC", topicId: "MATH_NUM_PCT", questionCount: 3 });
    let q = session.start();
    while (q) {
      session.submit(correctAnswer(q));
      q = session.next();
    }
    const counters = store.snapshot().counters;
    expect(Object.values(counters).reduce((a, b) => a + b, 0)).toBe(3);
  });

  it("avoids repeating the same base question while fresh ones exist", () => {
    // Difficulty band [1,2] leaves PCT_1, PCT_2 and PCT_T → 3 distinct questions available.
    const { session } = makeSession({ mode: "TOPIC", topicId: "MATH_NUM_PCT", questionCount: 3 });
    const ids: string[] = [];
    let q = session.start();
    while (q) {
      ids.push(q.baseQuestionId);
      session.submit(correctAnswer(q));
      q = session.next();
    }
    expect(new Set(ids).size).toBe(3);
  });
});
