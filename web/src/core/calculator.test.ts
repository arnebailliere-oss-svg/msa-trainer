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
    ["5, + 1", 6],
    // signs from the keypad and from school books
    ["220÷10", 22],
    ["12,5 · 4 + sin(30)", 50.5],
    ["√(16)", 4],
    ["√16 + 9", 13],
    ["5²", 25],
    ["2³", 8],
    ["2π", 2 * Math.PI],
    ["π·3²", 9 * Math.PI],
    // a minus in front counts after the power, as on a school calculator
    ["-3^2", -9],
    ["−3²", -9],
    ["(-3)^2", 9],
    ["2^-1", 0.5],
    ["2 * -3", -6],
    ["10 - -3", 13],
    // multiplication without a sign
    ["2(3+4)", 14],
    ["(2)(3)", 6],
    ["3sin(30)", 1.5],
    ["2 sqrt(9)", 6],
    ["2π²", 2 * Math.PI ** 2],
    // a missing bracket at the end is closed
    ["sqrt(16", 4],
    ["2*(3+4", 14],
    ["sin(30", 0.5],
    // percent
    ["19%", 0.19],
    ["250 * 19%", 47.5],
    ["80 / 20%", 400],
    // typical MSA lines
    ["(3 + 5) * 2 - 4 : 2", 14],
    ["1/3 + 1/6", 0.5],
    ["sqrt(3^2 + 4^2)", 5],
    ["4/3 * pi * 3^3", 36 * Math.PI],
    ["1,5 * 10^3", 1500],
    ["1200 * 1,03^5", 1200 * 1.03 ** 5],
    ["SIN(30)", 0.5],
    ["7 / 8", 0.875],
    ["0,1 * 3", 0.3],
    ["1 - 0,9", 0.1],
  ])("%s = %d", (expr, expected) => {
    expect(calculate(expr)).toBeCloseTo(expected, 9);
  });
  it("trigonometry works in degrees", () => {
    expect(calculate("sin(30)")).toBeCloseTo(0.5);
    expect(calculate("cos(60)")).toBeCloseTo(0.5);
    expect(calculate("tan(45)")).toBeCloseTo(1);
    expect(calculate("asin(0.5)")).toBeCloseTo(30);
    expect(calculate("2 * pi")).toBeCloseTo(2 * Math.PI);
    expect(calculate("acos(0.5)")).toBeCloseTo(60);
    expect(calculate("atan(1)")).toBeCloseTo(45);
    expect(calculate("5 / sin(30)")).toBeCloseTo(10);
  });
  it("gives exact zeros and no giant numbers at the special angles", () => {
    expect(calculate("sin(180)")).toBe(0);
    expect(calculate("cos(90)")).toBe(0);
    expect(calculate("tan(180)")).toBe(0);
    expect(calculate("sin(90)")).toBe(1);
    expect(calculate("tan(45)")).toBe(1);
    expect(calculate("tan(60)")).toBeCloseTo(Math.sqrt(3));
    expect(() => calculate("tan(90)")).toThrow(/tan/);
    expect(() => calculate("tan(270)")).toThrow(/tan/);
    expect(() => calculate("1 / sin(180)")).toThrow(/Null/);
  });
  it("raises German errors", () => {
    expect(() => calculate("5 / 0")).toThrow(/Division durch Null/);
    expect(() => calculate("2 + x")).toThrow(CalcError);
    expect(() => calculate("")).toThrow(/Leerer/);
    expect(() => calculate("2 $ 3")).toThrow(/Ungültiges Zeichen/);
    expect(() => calculate("sqrt(-4)")).toThrow(/negativen Zahl/);
    expect(() => calculate("5 +")).toThrow(/noch nicht fertig/);
    expect(() => calculate("5 × ÷ 2")).toThrow(CalcError);
    expect(() => calculate("3 4")).toThrow(/Rechenzeichen/);
    expect(() => calculate("3,5,2")).toThrow(/Rechenzeichen/);
    expect(() => calculate("(2 + 3) 4")).toThrow(/Rechenzeichen/);
    expect(() => calculate("2 + 3)")).toThrow(/Unerwartetes Zeichen/);
    expect(() => calculate("()")).toThrow(CalcError);
    expect(() => calculate(",")).toThrow(/Ungültige Zahl/);
    expect(() => calculate("log(0)")).toThrow(CalcError);
    expect(() => calculate("asin(2)")).toThrow(CalcError);
    expect(() => calculate("(-8)^0,5")).toThrow(/Potenz/);
    expect(() => calculate("10^400")).toThrow(/Potenz/);
    expect(() => calculate("5!")).toThrow(/Ungültiges Zeichen/);
  });
  it("never allows characters that could reach any dynamic evaluation", () => {
    for (const c of "[]{}$;=`'\"\\") expect(ALLOWED_CHARS.has(c)).toBe(false);
  });
});
