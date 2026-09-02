import { describe, expect, it } from "vitest";
import { isReduced, normalizeNumber, normalizeTerm, parseFraction, reduceFraction } from "./normalizers";
import { formatFraction, formatFractionTex, formatNumber } from "./format";

describe("normalizeNumber", () => {
  it.each([
    ["3,5", 3.5],
    ["3.5", 3.5],
    [" 42 ", 42],
    ["-0,25", -0.25],
    ["−7", -7],
    ["1.234,5", 1234.5],
    ["1 200", 1200],
    ["12 €", 12],
    ["45%", 45],
    ["30°", 30],
  ])("parses %s → %d", (input, expected) => {
    expect(normalizeNumber(input)).toBe(expected);
  });
  it("rejects non-numbers", () => {
    expect(normalizeNumber("abc")).toBeNull();
    expect(normalizeNumber("")).toBeNull();
    expect(normalizeNumber("3/4")).toBeNull();
    expect(normalizeNumber("1,2,3")).toBeNull();
  });
});

describe("fractions", () => {
  it("parses and reduces", () => {
    expect(parseFraction("6/8")).toEqual({ num: 6, den: 8 });
    expect(reduceFraction({ num: 6, den: 8 })).toEqual({ num: 3, den: 4 });
    expect(reduceFraction({ num: 3, den: -4 })).toEqual({ num: -3, den: 4 });
    expect(parseFraction("1 1/2")).toEqual({ num: 3, den: 2 });
    expect(parseFraction("0,75")).toEqual({ num: 75, den: 100 });
    expect(parseFraction("2")).toEqual({ num: 2, den: 1 });
    expect(parseFraction("1/0")).toBeNull();
    expect(parseFraction("x/2")).toBeNull();
    expect(isReduced({ num: 3, den: 4 })).toBe(true);
    expect(isReduced({ num: 6, den: 8 })).toBe(false);
  });
});

describe("normalizeTerm", () => {
  it("canonicalises spacing and operator variants", () => {
    expect(normalizeTerm("3 x + 6")).toBe("3x+6");
    expect(normalizeTerm("3·x+6")).toBe("3x+6");
    expect(normalizeTerm("3*x + 6")).toBe("3x+6");
    expect(normalizeTerm("x² − 4")).toBe("x^2-4");
  });
});

describe("format", () => {
  it("formats German numbers", () => {
    expect(formatNumber(3.5)).toBe("3,5");
    expect(formatNumber(3)).toBe("3");
    expect(formatNumber(0.1 + 0.2)).toBe("0,3");
    expect(formatNumber(-2.25)).toBe("−2,25");
    expect(formatNumber(1 / 3)).toBe("0,3333");
  });
  it("formats fractions", () => {
    expect(formatFraction(0.75)).toBe("3/4");
    expect(formatFraction(2)).toBe("2");
    expect(formatFraction(-1.5)).toBe("−3/2");
    expect(formatFractionTex(0.75)).toBe("\\frac{3}{4}");
  });
});
