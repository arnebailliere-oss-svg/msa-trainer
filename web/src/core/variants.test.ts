import { describe, expect, it } from "vitest";
import { rngFromSeed } from "./rng";
import { templated } from "./fixtures.test-helper";
import { hasPlaceholder, makeVariantId, parseExplanation, renderPreview, renderTemplate, renderVariant, sampleVariables, seedBytes } from "./variants";

describe("seed + variant id", () => {
  it("canonical string is stable and 8 bytes long", () => {
    const a = seedBytes("u1", "MATH", "T", "Q", "QUICK", "2026-09-02", 7);
    const b = seedBytes("u1", "MATH", "T", "Q", "QUICK", "2026-09-02", 7);
    const c = seedBytes("u1", "MATH", "T", "Q", "QUICK", "2026-09-02", 8);
    expect(a).toHaveLength(8);
    expect([...a]).toEqual([...b]);
    expect([...a]).not.toEqual([...c]);
    expect(makeVariantId("Q", "2026-09-02", "QUICK", 7)).toBe("Q::2026-09-02::QUICK::7");
  });
});

describe("sampleVariables", () => {
  it("respects ranges, steps and constraints", () => {
    for (let i = 0; i < 50; i++) {
      const vars = sampleVariables(templated.variants!, rngFromSeed(i, 99));
      const p = vars.p as number;
      const g = vars.g as number;
      expect(p % 5).toBe(0);
      expect(p).toBeGreaterThanOrEqual(5);
      expect(p).toBeLessThanOrEqual(50);
      expect(g % 10).toBe(0);
      const w = (p / 100) * g;
      expect(Math.abs(w - Math.round(w))).toBeLessThan(1e-9);
    }
  });
  it("supports derived values and choice variables", () => {
    const vars = sampleVariables(
      { enabled: true, variables: { a: { type: "int", min: 2, max: 4 }, name: { type: "choice", values: ["Lea", "Ben"] } }, derived: { b: "a * 10" } },
      rngFromSeed(3, 3),
    );
    expect(vars.b).toBe((vars.a as number) * 10);
    expect(["Lea", "Ben"]).toContain(vars.name);
  });
  it("throws when constraints are impossible", () => {
    expect(() => sampleVariables({ enabled: true, variables: { a: { type: "int", min: 1, max: 3 } }, constraints: ["a > 10"] }, rngFromSeed(1, 1), 50)).toThrow();
  });
});

describe("renderTemplate", () => {
  const vars = { p: 20, g: 150, name: "Lea", x: -3, half: 0.5 };
  it("renders variables, expressions and filters", () => {
    expect(renderTemplate("{{p}} % von {{g}}", vars)).toBe("20 % von 150");
    expect(renderTemplate("{{name}} hat {{= p/100*g}}", vars)).toBe("Lea hat 30");
    expect(renderTemplate("{{= g/7 | fixed:2}}", vars)).toBe("21,43");
    expect(renderTemplate("{{= 3/4 | frac}}", vars)).toBe("3/4");
    expect(renderTemplate("{{= half | fractex}}", vars)).toBe("\\frac{1}{2}");
    expect(renderTemplate("{{= g/10 | euro}}", vars)).toBe("15,00 €");
    expect(renderTemplate("3x {{= x | sign}}", vars)).toBe("3x − 3");
    expect(renderTemplate("3x {{= p | sign}}", vars)).toBe("3x + 20");
    expect(renderTemplate("{{= x | abs}}", vars)).toBe("3");
    expect(renderTemplate("{{= 2.5 | int}}", vars)).toBe("3");
    expect(renderTemplate("{{= 1/3 | raw}}", vars)).toBe("0.3333333333333333");
    expect(renderTemplate("no placeholders", vars)).toBe("no placeholders");
  });
  it("fails loudly on unknown variables or filters", () => {
    expect(() => renderTemplate("{{unknown}}", vars)).toThrow();
    expect(() => renderTemplate("{{= p | nope}}", vars)).toThrow();
    expect(hasPlaceholder("left {{over}}")).toBe(true);
  });
});

describe("parseExplanation", () => {
  it("converts legacy emoji sections", () => {
    const s = parseExplanation("🎯 WAS IST DAS?\nProzentrechnung.\n\n📐 DIE FORMEL:\nW = p × G\n↓   ↓   ↓\n\n✏️ RECHNUNG:\n1. 20 ÷ 100 = 0,2\n2. 0,2 × 150 = 30\n\n⚠️ TYPISCHER FEHLER:\nKomma.\n\n💡 MERKE: Prozent = von Hundert\n\n✅ Antwort: 30");
    expect(s.map((x) => x.kind)).toEqual(["what", "formula", "steps", "mistake", "remember", "answer"]);
    expect(s[0]).toEqual({ kind: "what", title: "Was ist das", body: "Prozentrechnung." });
    expect(s[1]!.body).toBe("W = p × G\n↓   ↓   ↓");
    expect(s[4]).toEqual({ kind: "remember", title: "Merke", body: "Prozent = von Hundert" });
    expect(s[5]).toEqual({ kind: "answer", title: "Antwort", body: "30" });
  });
  it("keeps structured explanations and wraps plain text", () => {
    expect(parseExplanation([{ kind: "text", body: "x" }])).toEqual([{ kind: "text", body: "x" }]);
    expect(parseExplanation("just text")).toEqual([{ kind: "text", body: "just text" }]);
  });
});

describe("renderVariant", () => {
  const ctx = { userId: "u1", mode: "QUICK" as const, dateKey: "2026-09-02", counter: 3 };
  it("is deterministic and renders prompt, solution and explanation consistently", () => {
    const a = renderVariant(templated, ctx);
    const b = renderVariant(templated, ctx);
    expect(a).toEqual(b);
    expect(a.variantId).toBe("PCT_T::2026-09-02::QUICK::3");
    const p = a.vars.p as number;
    const g = a.vars.g as number;
    expect(a.prompt).toBe(`Wie viel sind ${p} % von ${g}?`);
    expect(a.solution).toEqual({ value: (p / 100) * g });
    expect((a.payload as { tolerance: number }).tolerance).toBe(0.01);
    expect(a.explanation[2]!.body).toContain(String((p / 100) * g));
    expect(a.explanation.some((s) => hasPlaceholder(s.body))).toBe(false);
  });
  it("differs across counters and users", () => {
    const a = renderVariant(templated, ctx);
    const c = renderVariant(templated, { ...ctx, counter: 4 });
    const d = renderVariant(templated, { ...ctx, userId: "u2" });
    expect([a.prompt, c.prompt, d.prompt].filter((x) => x === a.prompt).length).toBeLessThan(3);
  });
  it("renders non-templated questions unchanged, with parsed explanation", () => {
    const q = { ...templated, id: "PLAIN", variants: undefined, prompt: "Wie viel sind 20 % von 150?", solution: { value: 30 }, explanation: "🎯 Was?\nText" };
    const r = renderVariant(q, ctx);
    expect(r.prompt).toBe("Wie viel sind 20 % von 150?");
    expect(r.explanation[0]!.kind).toBe("what");
    expect(r.vars).toEqual({});
  });
  it("renderPreview yields distinct previews", () => {
    const prompts = new Set(Array.from({ length: 10 }, (_, i) => renderPreview(templated, i).prompt));
    expect(prompts.size).toBeGreaterThan(3);
  });
});
