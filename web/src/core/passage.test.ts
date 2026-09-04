import { describe, expect, it } from "vitest";
import { buildContentIndex } from "./contentIndex";
import { InMemoryProgressStore } from "./progress";
import { rngFromSeed } from "./rng";
import { SessionController } from "./session";
import type { ContentPack, Question } from "./types";

const mcq = (id: string, passage?: string): Question => ({
  id,
  subject: "EN",
  topicId: "EN_R",
  difficulty: 2,
  qtype: "MCQ",
  prompt: id,
  payload: { choices: ["a", "b", "c"] },
  solution: { correct_choice: "a" },
  explanation: [{ kind: "text", body: "x" }],
  tags: [],
  passage,
});

const pack: ContentPack = {
  packId: "t",
  version: "1",
  title: "t",
  topics: [
    { id: "EN", subject: "EN", code: "EN", name: "Englisch", parentId: null },
    { id: "EN_R", subject: "EN", code: "EN_R", name: "Reading", parentId: "EN" },
  ],
  questions: [mcq("Q1"), mcq("P1", "X_T"), mcq("P2", "X_T"), mcq("P3", "X_T"), mcq("Q2")],
  lessons: [],
  passages: [{ id: "X_T", subject: "EN", title: "Text", body: "(1) …" }],
};

describe("passages keep their questions together", () => {
  it("after a passage question the session continues with its unanswered siblings", () => {
    for (let seed = 1; seed <= 8; seed++) {
      const session = new SessionController({ userId: "u", subject: "EN", mode: "TOPIC", topicId: "EN_R", questionCount: 5, index: buildContentIndex(pack), store: new InMemoryProgressStore(), rng: rngFromSeed(seed, seed) });
      const order: string[] = [];
      let q = session.start();
      while (q) {
        order.push(q.baseQuestionId);
        session.submit("a");
        q = session.next();
      }
      const first = order.findIndex((id) => id.startsWith("P"));
      expect(first).toBeGreaterThanOrEqual(0);
      expect([...order.slice(first, first + 3)].sort()).toEqual(["P1", "P2", "P3"]);
    }
  });
});
