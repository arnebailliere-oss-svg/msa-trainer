import { describe, expect, it } from "vitest";
import { answerProblem, countWords, evaluate } from "./evaluators";
import type { RenderedQuestion } from "./types";

describe("WRITE", () => {
  const blog = (partial: Partial<RenderedQuestion> = {}): RenderedQuestion => ({
    baseQuestionId: "W",
    variantId: "W::v",
    subject: "EN",
    topicId: "EN_WRITE_EMAIL",
    difficulty: 3,
    qtype: "WRITE",
    prompt: "Write back.",
    payload: {
      form: "blog",
      min_words: 15,
      max_words: 60,
      content_points: [
        { label: "parents", keywords: ["parents", "my mum"] },
        { label: "age limit", keywords: ["age limit", "18"] },
      ],
      required: ["greeting", "closing", "paragraphs:2"],
    },
    solution: { model: "Hi!\n\nMy parents are fine with tattoos. I think the age limit of 18 makes sense.\n\nBest,\nSam" },
    explanation: [],
    vars: {},
    ...partial,
  });

  it("counts words without header lines", () => {
    expect(countWords("Subject: hello\n\nOne two three.")).toBe(3);
    expect(countWords("  ")).toBe(0);
  });

  it("passes a text that hits the content points and the form", () => {
    const text = "Hey Inky,\n\nMy parents are quite relaxed about tattoos, my mum even has one. About the age limit, I think 18 makes sense.\n\nBest wishes,\nLea";
    const ev = evaluate(blog(), text);
    expect(ev.isCorrect).toBe(true);
    expect(ev.score).toBe(1);
    expect(ev.checks?.filter((c) => c.weight > 0).every((c) => c.ok)).toBe(true);
  });

  it("fails when a content point is missing and reports which", () => {
    const text = "Hey Inky,\n\nMy parents are quite relaxed about tattoos, my mum even has one and she loves it a lot.\n\nBest wishes,\nLea";
    const ev = evaluate(blog(), text);
    const missing = ev.checks?.find((c) => c.id === "cp:age limit");
    expect(missing?.ok).toBe(false);
    expect(ev.score).toBeLessThan(1);
  });

  it("never passes below the minimum word count", () => {
    const ev = evaluate(blog(), "Hi! My parents and the age limit 18. Best, Sam");
    expect(ev.checks?.find((c) => c.id === "words")?.ok).toBe(false);
    expect(ev.isCorrect).toBe(false);
  });

  it("flags Germanisms as unscored hints", () => {
    const text = "Hey Inky,\n\nI have 16 years and my parents like tattoos since two years, so the age limit of 18 is fine for me.\n\nBest,\nSam";
    const ev = evaluate(blog(), text);
    const hints = ev.checks?.filter((c) => c.weight === 0) ?? [];
    expect(hints.length).toBe(2);
    expect(ev.isCorrect).toBe(true); // hints do not cost points
  });

  it("accepts its own Musterlösung", () => {
    const q = blog();
    expect(evaluate(q, (q.solution as { model: string }).model).isCorrect).toBe(true);
  });

  it("checks the German Erörterung rules", () => {
    const q = blog({
      subject: "DE",
      payload: { form: "eroerterung", min_words: 10, required: ["both_sides", "belege", "transitions", "opinion_last", "standard_language"] },
      solution: { model: "" },
    });
    const good = "Ein Vorteil ist die Zeit, zum Beispiel morgens. Außerdem zeigt eine Studie Nutzen. Jedoch gibt es Nachteile. Darüber hinaus kostet es Geld. Insgesamt bin ich der Meinung, dass es sich lohnt.";
    const ev = evaluate(q, good);
    expect(ev.isCorrect).toBe(true);
    const early = "Ich finde es gut. Ein Vorteil ist die Zeit, zum Beispiel morgens. Außerdem zeigt eine Studie Nutzen. Jedoch gibt es Nachteile, das ist krass. Darüber hinaus kostet es Geld.";
    const ev2 = evaluate(q, early);
    expect(ev2.checks?.find((c) => c.id === "opinion_last")?.ok).toBe(false);
    expect(ev2.checks?.find((c) => c.id === "standard_language")?.ok).toBe(false);
  });

  it("scores a Schreibplan per filled field", () => {
    const q = blog({
      subject: "DE",
      payload: { form: "schreibplan", fields: [{ id: "a", label: "A" }, { id: "b", label: "B" }, { id: "c", label: "C" }, { id: "d", label: "D" }] },
      solution: { model_fields: { a: "eins zwei drei", b: "eins zwei drei", c: "eins zwei drei", d: "eins zwei drei" } },
    });
    const ev = evaluate(q, { a: "Anlass ist klar", b: "Frage steht fest", c: "These lautet so", d: "" });
    expect(ev.score).toBe(0.75);
    expect(ev.isCorrect).toBe(true);
    expect(evaluate(q, { a: "kurz" }).isCorrect).toBe(false);
  });
});

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
    expect(evaluate(q, "12,5 cm").isCorrect).toBe(true); // the unit typed after the number does not make it wrong
  });
  it("without tolerance, accepts answers that round to the stored precision", () => {
    const q = rq({ payload: { answer_type: "number" }, solution: { value: 58.3 } });
    expect(evaluate(q, "58,33").isCorrect).toBe(true);
    expect(evaluate(q, "58,3").isCorrect).toBe(true);
    expect(evaluate(q, "58,25").isCorrect).toBe(true);
    expect(evaluate(q, "58,2").isCorrect).toBe(false);
    const int = rq({ payload: { answer_type: "number" }, solution: { value: 5 } });
    expect(evaluate(int, "5,4").isCorrect).toBe(false);
    expect(evaluate(int, "5").isCorrect).toBe(true);
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
  it("exact form: 16/40 required, 2/5 rejected with hint", () => {
    const q = rq({ payload: { answer_type: "fraction", exact: true }, solution: { value: "16/40" } });
    expect(evaluate(q, "16/40").isCorrect).toBe(true);
    const r = evaluate(q, "2/5");
    expect(r.isCorrect).toBe(false);
    expect(r.hint).toMatch(/Schreibweise/);
    expect(r.correctAnswerText).toBe("16/40");
  });
  it("without require_reduced 6/8 is fine", () => {
    expect(evaluate(rq({ payload: { answer_type: "fraction" }, solution: { value: "3/4" } }), "6/8").isCorrect).toBe(true);
  });
});

describe("SHORT term / text", () => {
  it("term accepts any algebraically equivalent form", () => {
    const q = rq({ payload: { answer_type: "term" }, solution: { value: "3x+6" } });
    expect(evaluate(q, "3 x + 6").isCorrect).toBe(true);
    expect(evaluate(q, "3·x+6").isCorrect).toBe(true);
    expect(evaluate(q, "6+3x").isCorrect).toBe(true);
    expect(evaluate(q, "3(x+2)").isCorrect).toBe(true);
    expect(evaluate(q, "3x+5").isCorrect).toBe(false);
    expect(evaluate(q, "3x").isCorrect).toBe(false);
    expect(evaluate(q, "").isCorrect).toBe(false);
  });
  it("term handles powers, products of variables and factorised forms", () => {
    expect(evaluate(rq({ payload: { answer_type: "term" }, solution: { value: "x^2+6x+9" } }), "(x+3)²").isCorrect).toBe(true);
    expect(evaluate(rq({ payload: { answer_type: "term" }, solution: { value: "x^2-9" } }), "(x+3)(x-3)").isCorrect).toBe(true);
    expect(evaluate(rq({ payload: { answer_type: "term" }, solution: { value: "3a/5b" } }), "3a/(5b)").isCorrect).toBe(false);
    expect(evaluate(rq({ payload: { answer_type: "term" }, solution: { value: "2xy" } }), "2yx").isCorrect).toBe(true);
  });
  it("term with require_simplified rejects unsimplified equivalents", () => {
    const q = rq({ payload: { answer_type: "term", require_simplified: true }, solution: { value: "5x" } });
    expect(evaluate(q, "5x").isCorrect).toBe(true);
    const r = evaluate(q, "3x+2x");
    expect(r.isCorrect).toBe(false);
    expect(r.hint).toMatch(/zusammengefasst/);
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
  it("a chosen entry must be exactly the right one", () => {
    expect(evaluate(q, { "1": "goes" }).isCorrect).toBe(true);
    expect(evaluate(q, { "1": "Goes" }).isCorrect).toBe(false);
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

describe("answers as learners type them", () => {
  const short = (payload: Record<string, unknown>, value: unknown) => ({ qtype: "SHORT", payload, solution: { value } }) as unknown as Parameters<typeof evaluate>[0];
  it.each([
    ["12", true],
    ["12 cm", true],
    ["12cm", true],
    ["x = 12", true],
    ["= 12", true],
    ["≈ 12", true],
    ["ca. 12 cm", true],
    ["12,0", true],
    ["12 cm²", true],
    ["12 cm^2", true],
    ["12 km/h", true],
    ["12 €", true],
    ["12 Euro", true],
    ["12 Stück", true],
    ["24/2", true],
    ["13 cm", false],
    ["120", false],
  ])("number 12: %s", (typed, ok) => {
    expect(evaluate(short({ answer_type: "number", unit: "cm" }, 12), typed).isCorrect).toBe(ok);
  });
  it("reads decimals, negative numbers and thousands with a unit", () => {
    expect(evaluate(short({ answer_type: "number", unit: "€" }, 1234.5), "1.234,50 €").isCorrect).toBe(true);
    expect(evaluate(short({ answer_type: "number" }, -0.5), "x = −0,5").isCorrect).toBe(true);
    expect(evaluate(short({ answer_type: "number", unit: "%" }, 25), "25 %").isCorrect).toBe(true);
    expect(evaluate(short({ answer_type: "number" }, 0.5), "1/2").isCorrect).toBe(true);
  });
  it("reads a fraction with a unit or an equals sign", () => {
    expect(evaluate(short({ answer_type: "fraction" }, "3/4"), "= 3/4").isCorrect).toBe(true);
    expect(evaluate(short({ answer_type: "fraction" }, "3/4"), "3/4 m").isCorrect).toBe(true);
  });
  it("sends unreadable input back instead of counting it as wrong", () => {
    const q = short({ answer_type: "number" }, 12);
    expect(answerProblem(q, "zwölf")).toMatch(/nicht als Zahl lesen/);
    expect(answerProblem(q, "12 und 13")).toMatch(/nicht als Zahl lesen/);
    expect(answerProblem(q, "12 cm")).toBeNull();
    expect(answerProblem(short({ answer_type: "fraction" }, "3/4"), "drei Viertel")).toMatch(/nicht als Bruch lesen/);
    expect(answerProblem(short({ answer_type: "term" }, "2x+6"), "irgendwas")).toBeNull();
  });
  it("a chosen gap must match exactly, a typed gap may differ in capitals and apostrophes", () => {
    const cloze = (blank: Record<string, unknown>, answer: string) => ({ qtype: "CLOZE", payload: { text_with_blanks: "___", blanks: [{ id: 1, ...blank }] }, solution: { answers: { 1: answer } } }) as unknown as Parameters<typeof evaluate>[0];
    const pick = cloze({ choices: ["Laufen", "laufen"] }, "Laufen");
    expect(evaluate(pick, { 1: "Laufen" }).isCorrect).toBe(true);
    expect(evaluate(pick, { 1: "laufen" }).isCorrect).toBe(false);
    const typed = cloze({}, "didn't go");
    expect(evaluate(typed, { 1: "Didn’t  go" }).isCorrect).toBe(true);
    expect(evaluate(typed, { 1: "did go" }).isCorrect).toBe(false);
  });
});
