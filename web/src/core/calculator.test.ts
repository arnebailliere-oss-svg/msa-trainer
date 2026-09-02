import { describe, expect, it } from "vitest";
import { ALLOWED_CHARS, CalcError, calculate } from "./calculator";

describe("calculate", () => {
  it.each([
    ["2 + 3", 5],
    ["10 - 4", 6],
    ["3 * 4", 12],
    ["20 / 4", 5],
    ["2 + 3 * 4", 14],
    ["(2 + 3) * 4", 20],
    ["((2 + 3) * 2) + 1", 11],
    ["-5 + 3", -2],
    ["50%", 0.5],
    ["200 * 20%", 40],
    ["3,5 + 1,5", 5],
    ["(100 - 20) * 0.15 + 5", 17],
    ["2^10", 1024],
    ["2^3^2", 512],
    ["sqrt(144)", 12],
    ["0,1 + 0,2", 0.3],
    ["12 : 4", 3],
    ["3 × 4", 12],
    ["−5 + 2", -3],
    [",5 + 1", 1.5],
  ])("%s = %d", (expr, expected) => {
    expect(calculate(expr)).toBeCloseTo(expected, 9);
  });
  it("trigonometry works in degrees", () => {
    expect(calculate("sin(30)")).toBeCloseTo(0.5);
    expect(calculate("cos(60)")).toBeCloseTo(0.5);
    expect(calculate("tan(45)")).toBeCloseTo(1);
    expect(calculate("asin(0.5)")).toBeCloseTo(30);
    expect(calculate("2 * pi")).toBeCloseTo(2 * Math.PI);
  });
  it("raises German errors", () => {
    expect(() => calculate("5 / 0")).toThrow(/Division durch Null/);
    expect(() => calculate("2 + x")).toThrow(CalcError);
    expect(() => calculate("(2 + 3")).toThrow(CalcError);
    expect(() => calculate("")).toThrow(/Leerer/);
    expect(() => calculate("2 $ 3")).toThrow(/Ungültiges Zeichen/);
    expect(() => calculate("sqrt(-4)")).toThrow(CalcError);
  });
  it("never allows characters that could reach any dynamic evaluation", () => {
    for (const c of "[]{}$;=`'\"\\") expect(ALLOWED_CHARS.has(c)).toBe(false);
  });
});
