import { describe, expect, it } from "vitest";
import { rngFromSeed } from "./rng";
import type { VariantSpec } from "./types";
import { renderTemplate, sampleVariables } from "./variants";

const spec: VariantSpec = {
  enabled: true,
  variables: {
    s: {
      type: "pick",
      from: [
        { satz: "Ich weiß, ___ du kommst.", loesung: "dass" },
        { satz: "Das Auto, ___ ich sah, war rot.", loesung: "das" },
        { satz: "Er hofft, ___ es klappt.", loesung: "dass" },
      ],
    },
    t: { type: "pick", from: [{ w: "a" }, { w: "b" }, { w: "c" }] },
  },
  constraints: ["s != t"],
};

describe("pick variables (sentence banks)", () => {
  it("exposes record fields as name_field and the index as name", () => {
    const vars = sampleVariables(spec, rngFromSeed(1, 2));
    expect([0, 1, 2]).toContain(vars.s);
    const text = renderTemplate("{{s_satz}} → {{s_loesung}}", vars);
    expect(text).toMatch(/___ .* → (das|dass)$/);
    expect(text).not.toContain("{{");
  });
  it("honours constraints between picks and covers every record", () => {
    const seen = new Set<number>();
    for (let i = 0; i < 60; i++) {
      const vars = sampleVariables(spec, rngFromSeed(i, 7));
      expect(vars.s).not.toBe(vars.t);
      seen.add(vars.s as number);
    }
    expect(seen.size).toBe(3);
  });
});
