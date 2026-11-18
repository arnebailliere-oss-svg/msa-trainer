import { describe, expect, it } from "vitest";
import { accessTo, freePrimerId, freeTopicId, fullAccess, primerOpen, sessionOpen, topicOpen } from "./access";
import { buildContentIndex } from "./contentIndex";
import type { ContentPack, Primer, Question, Topic } from "./types";

const topic = (id: string, subject: "MATH" | "DE"): Topic => ({ id, subject, code: id, name: id, parentId: null }) as Topic;
const question = (id: string, topicId: string, subject: "MATH" | "DE"): Question => ({ id, topicId, subject, difficulty: 1 }) as unknown as Question;
const primer = (id: string, subject: "MATH" | "DE"): Primer => ({ id, subject, title: id, steps: [], vocab: [], quiz: [] }) as unknown as Primer;

const index = buildContentIndex({
  packId: "t",
  version: "1",
  title: "t",
  topics: [topic("M_EMPTY", "MATH"), topic("M_A", "MATH"), topic("M_B", "MATH"), topic("D_A", "DE")],
  questions: [question("q1", "M_A", "MATH"), question("q2", "M_B", "MATH"), question("q3", "D_A", "DE")],
  lessons: [],
  primers: [primer("P_M1", "MATH"), primer("P_M2", "MATH"), primer("P_D1", "DE")],
  passages: [],
} as ContentPack);

describe("free taste and locks", () => {
  const none = accessTo([]);

  it("the first lesson and the first topic with tasks of each subject are free", () => {
    expect(freePrimerId(index, "MATH")).toBe("P_M1");
    expect(freePrimerId(index, "DE")).toBe("P_D1");
    expect(freeTopicId(index, "MATH")).toBe("M_A"); // M_EMPTY has no tasks
  });

  it("without a purchase only the free lesson opens", () => {
    expect(primerOpen(none, index, "P_M1")).toBe(true);
    expect(primerOpen(none, index, "P_M2")).toBe(false);
    expect(primerOpen(none, index, "P_D1")).toBe(true);
  });

  it("without a purchase only the free topic opens, and only topic training on it", () => {
    expect(topicOpen(none, index, "M_A")).toBe(true);
    expect(topicOpen(none, index, "M_B")).toBe(false);
    expect(sessionOpen(none, index, "MATH", "TOPIC", "M_A")).toBe(true);
    expect(sessionOpen(none, index, "MATH", "TOPIC", "M_B")).toBe(false);
    for (const mode of ["QUICK", "PLAN", "ERRORS", "MSA"] as const) expect(sessionOpen(none, index, "MATH", mode)).toBe(false);
    expect(sessionOpen(none, index, "MATH", "MSA", "M_A")).toBe(false);
  });

  it("a purchase opens its subject and nothing else", () => {
    const maths = accessTo(["MATH"]);
    expect(primerOpen(maths, index, "P_M2")).toBe(true);
    expect(topicOpen(maths, index, "M_B")).toBe(true);
    expect(sessionOpen(maths, index, "MATH", "MSA")).toBe(true);
    expect(sessionOpen(maths, index, "DE", "QUICK")).toBe(false);
    expect(primerOpen(maths, index, "P_D1")).toBe(true); // still the free one
  });

  it("the website is fully open", () => {
    expect(primerOpen(fullAccess, index, "P_M2")).toBe(true);
    expect(sessionOpen(fullAccess, index, "DE", "MSA")).toBe(true);
  });
});
