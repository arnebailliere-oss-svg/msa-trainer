import { describe, expect, it } from "vitest";
import { evaluate } from "./evaluators";
import type { RenderedQuestion } from "./types";

const rq = (partial: Partial<RenderedQuestion>): RenderedQuestion => ({
  baseQuestionId: "Q",
  variantId: "Q::v",
  subject: "MATH",
  topicId: "T",
  difficulty: 2,
  qtype: "SHORT",
  prompt: "?",
  payload: { answer_type: "number" },
  solution: { value: 0 },
  explanation: [],
  vars: {},
  ...partial,
});

describe("MCQ", () => {
  const q = rq({ qtype: "MCQ", payload: { choices: ["20", "30", "40", "50"] }, solution: { correct_choice: "30" } });
  it("matches the exact choice", () => {
    expect(evaluate(q, "30").isCorrect).toBe(true);
    expect(evaluate(q, " 30 ").isCorrect).toBe(true);
    expect(evaluate(q, "40").isCorrect).toBe(false);
    expect(evaluate(q, null).isCorrect).toBe(false);
  });
});

describe("SHORT number", () => {
  const q = rq({ payload: { answer_type: "number", tolerance: 0.01, unit: "cm" }, solution: { value: 12.5 } });
  it("accepts German and English decimals within tolerance", () => {
    expect(evaluate(q, "12,5").isCorrect).toBe(true);
    expect(evaluate(q, "12.5").isCorrect).toBe(true);
    expect(evaluate(q, "12,505").isCorrect).toBe(true);
    expect(evaluate(q, "12,6").isCorrect).toBe(false);
    expect(evaluate(q, "12,5 cm").isCorrect).toBe(false); // unit typed in: hint, not accepted
  });
  it("gives a hint for non-numbers and shows the unit", () => {
    const r = evaluate(q, "zwölf");
    expect(r.isCorrect).toBe(false);
    expect(r.hint).toMatch(/Zahl/);
    expect(r.correctAnswerText).toBe("12,5 cm");
  });
});

describe("SHORT fraction", () => {
  const q = rq({ payload: { answer_type: "fraction", require_reduced: true }, solution: { value: "3/4" } });
  it("accepts equivalent reduced fractions and decimals", () => {
    expect(evaluate(q, "3/4").isCorrect).toBe(true);
    expect(evaluate(q, " 3 / 4 ").isCorrect).toBe(true);
    expect(evaluate(q, "0,75").isCorrect).toBe(false); // 75/100 not reduced
    expect(evaluate(q, "1/2").isCorrect).toBe(false);
  });
  it("rejects unreduced with a hint", () => {
    const r = evaluate(q, "6/8");
    expect(r.isCorrect).toBe(false);
    expect(r.hint).toMatch(/gekürzt/);
  });
  it("without require_reduced 6/8 is fine", () => {
    expect(evaluate(rq({ payload: { answer_type: "fraction" }, solution: { value: "3/4" } }), "6/8").isCorrect).toBe(true);
  });
});

describe("SHORT term / text", () => {
  it("term ignores spacing and · vs *", () => {
    const q = rq({ payload: { answer_type: "term" }, solution: { value: "3x+6" } });
    expect(evaluate(q, "3 x + 6").isCorrect).toBe(true);
    expect(evaluate(q, "3·x+6").isCorrect).toBe(true);
    expect(evaluate(q, "6+3x").isCorrect).toBe(false);
  });
  it("text uses normalizations", () => {
    const q = rq({ payload: { answer_type: "text", normalization: ["trim", "lowercase"] }, solution: { value: "Nomen" } });
    expect(evaluate(q, " nomen ").isCorrect).toBe(true);
    expect(evaluate(q, "Verb").isCorrect).toBe(false);
  });
});

describe("CLOZE", () => {
  const q = rq({
    qtype: "CLOZE",
    payload: { text_with_blanks: "She ___ to school.", blanks: [{ id: 1, choices: ["goes", "go"] }] },
    solution: { answers: { "1": "goes" } },
  });
  it("compares each blank case-insensitively", () => {
    expect(evaluate(q, { "1": "goes" }).isCorrect).toBe(true);
    expect(evaluate(q, { "1": "Goes" }).isCorrect).toBe(true);
    expect(evaluate(q, { "1": "go" }).isCorrect).toBe(false);
    expect(evaluate(q, {}).isCorrect).toBe(false);
  });
});

describe("MATCH", () => {
  const q = rq({
    qtype: "MATCH",
    payload: { left: ["a", "b"], right: ["1", "2"] },
    solution: { pairs: [["a", "1"], ["b", "2"]] },
  });
  it("requires the full pair set", () => {
    expect(evaluate(q, [["b", "2"], ["a", "1"]]).isCorrect).toBe(true);
    expect(evaluate(q, [["a", "1"]]).isCorrect).toBe(false);
    expect(evaluate(q, [["a", "2"], ["b", "1"]]).isCorrect).toBe(false);
    expect(evaluate(q, "nope").isCorrect).toBe(false);
  });
});
