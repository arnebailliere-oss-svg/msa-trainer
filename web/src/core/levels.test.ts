import { describe, expect, it } from "vitest";
import { STALE_DAYS } from "./constants";
import { tasksToFinish, topicLevel } from "./levels";
import type { Attempt } from "./types";

/** Attempt on day `day` (1-based, September 2026), minute `i` — difficulty defaults to exam level. */
const at = (i: number, isCorrect: boolean, day = 1, difficulty = 3): Attempt => ({
  id: `a${day}-${i}`,
  userId: "u",
  questionId: `q${i}`,
  variantId: "v",
  topicId: "T",
  subject: "MATH",
  isCorrect,
  responseTimeMs: 1000,
  userAnswer: "",
  vars: {},
  createdAt: `2026-09-${String(day).padStart(2, "0")}T10:${String(i).padStart(2, "0")}:00Z`,
  difficulty,
});
const NOW = new Date("2026-09-02T18:00:00Z");
const diff = () => 3;

describe("topicLevel", () => {
  it("0 Neu without attempts", () => {
    expect(topicLevel([], diff, NOW).level).toBe(0);
  });
  it("1 Angefangen with fewer than 4 correct in the window", () => {
    expect(topicLevel([at(1, true), at(2, true), at(3, true)], diff, NOW).level).toBe(1);
    expect(topicLevel([at(1, true), at(2, false), at(3, true), at(4, false), at(5, true), at(6, false)], diff, NOW).level).toBe(1);
  });
  it("2 Geübt with 4 of the last 6 correct, even on one day", () => {
    expect(topicLevel([at(1, true), at(2, true), at(3, true), at(4, true)], diff, NOW).level).toBe(2);
    expect(topicLevel([at(1, false), at(2, true), at(3, true), at(4, true), at(5, false), at(6, true)], diff, NOW).level).toBe(2);
  });
  it("stays Geübt on one day even with 6 hard correct answers (Sicher needs two days)", () => {
    const info = topicLevel([1, 2, 3, 4, 5, 6].map((i) => at(i, true, 1)), diff, NOW);
    expect(info.level).toBe(2);
    expect(info.days).toBe(1);
  });
  it("stays Geübt without 2 correct answers at exam difficulty", () => {
    const easy = [at(1, true, 1, 1), at(2, true, 1, 2), at(3, true, 1, 2), at(4, true, 2, 1), at(5, true, 2, 2), at(6, true, 2, 3)];
    expect(topicLevel(easy, diff, NOW).level).toBe(2);
  });
  it("3 Sicher: 5 of 6 correct, 2 at exam level, on 2 days", () => {
    const info = topicLevel([at(1, true, 1), at(2, true, 1), at(3, false, 1), at(4, true, 1), at(5, true, 2), at(6, true, 2)], diff, NOW);
    expect(info.level).toBe(3);
    expect(info.sicherSince).toBe(at(6, true, 2).createdAt);
    expect(info.checkDue).toBe(false);
  });
  it("uses the question difficulty when the attempt does not carry it", () => {
    const list = [at(1, true, 1), at(2, true, 1), at(3, true, 1), at(4, true, 2), at(5, true, 2)].map((a) => ({ ...a, difficulty: undefined }));
    expect(topicLevel(list, () => 1, NOW).level).toBe(2);
    expect(topicLevel(list, () => 3, NOW).level).toBe(3);
  });
  it("only the last 6 attempts count: an old streak of errors is forgotten", () => {
    const old = [at(1, false, 1), at(2, false, 1), at(3, false, 1), at(4, false, 1)];
    const recent = [at(5, true, 1), at(6, true, 1), at(7, true, 2), at(8, true, 2), at(9, true, 2), at(10, true, 2)];
    expect(topicLevel([...old, ...recent], diff, NOW).level).toBe(3);
  });
  it("a check is due 3 days after reaching Sicher, and a correct exam-level answer makes it Prüfungsfest", () => {
    const sicher = [at(1, true, 1), at(2, true, 1), at(3, true, 1), at(4, true, 2), at(5, true, 2)];
    const day5 = new Date("2026-09-05T18:00:00Z");
    expect(topicLevel(sicher, diff, day5).checkDue).toBe(true);
    // a hard correct answer two days later is too early for the check
    expect(topicLevel([...sicher, at(6, true, 3)], diff, day5).level).toBe(3);
    // three days later → Prüfungsfest, no check due any more
    const fest = topicLevel([...sicher, at(6, true, 5)], diff, day5);
    expect(fest.level).toBe(4);
    expect(fest.checkDue).toBe(false);
  });
  it("Prüfungsfest falls back when the recent answers are no longer Sicher", () => {
    const fest = [at(1, true, 1), at(2, true, 1), at(3, true, 1), at(4, true, 2), at(5, true, 2), at(6, true, 5)];
    const wobbly = [...fest, at(7, false, 6), at(8, false, 6)];
    expect(topicLevel(wobbly, diff, new Date("2026-09-06T18:00:00Z")).level).toBe(2);
  });
  it("a Sicher topic idle for more than 14 days shows as Geübt and asks for a check", () => {
    const sicher = [at(1, true, 1), at(2, true, 1), at(3, true, 1), at(4, true, 2), at(5, true, 2)];
    const later = new Date(new Date("2026-09-02T10:05:00Z").getTime() + (STALE_DAYS + 1) * 86_400_000);
    const info = topicLevel(sicher, diff, later);
    expect(info.level).toBe(2);
    expect(info.stale).toBe(true);
    expect(info.checkDue).toBe(true);
  });
});

describe("tasksToFinish", () => {
  it("shrinks with the level and is small for stale topics", () => {
    const base = topicLevel([], diff, NOW);
    expect(tasksToFinish(base)).toBe(8);
    expect(tasksToFinish({ ...base, level: 2 })).toBe(4);
    expect(tasksToFinish({ ...base, level: 3 })).toBe(1);
    expect(tasksToFinish({ ...base, level: 4 })).toBe(0);
    expect(tasksToFinish({ ...base, level: 2, stale: true })).toBe(2);
  });
});
