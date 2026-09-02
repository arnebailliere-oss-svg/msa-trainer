import { describe, expect, it } from "vitest";
import { evaluateExpr, ExprError, roundHalfUp } from "./expr";

describe("evaluateExpr", () => {
  it("arithmetic with precedence", () => {
    expect(evaluateExpr("2 + 3 * 4")).toBe(14);
    expect(evaluateExpr("(2 + 3) * 4")).toBe(20);
    expect(evaluateExpr("2 ^ 3 ^ 2")).toBe(512);
    expect(evaluateExpr("-2 ^ 2")).toBe(-4);
    expect(evaluateExpr("10 / 4")).toBe(2.5);
  });
  it("variables (numbers and numeric strings)", () => {
    expect(evaluateExpr("p / 100 * g", { p: 20, g: 150 })).toBe(30);
    expect(evaluateExpr("a * 2", { a: "3,5" })).toBe(7);
    expect(() => evaluateExpr("x + 1", { y: 1 })).toThrow(ExprError);
    expect(() => evaluateExpr("name + 1", { name: "Lea" })).toThrow(ExprError);
  });
  it("functions", () => {
    expect(evaluateExpr("sqrt(16)")).toBe(4);
    expect(evaluateExpr("round(2.675, 2)")).toBe(2.68);
    expect(evaluateExpr("round(-2.5)")).toBe(-3);
    expect(evaluateExpr("mod(7, 3)")).toBe(1);
    expect(evaluateExpr("mod(-1, 3)")).toBe(2);
    expect(evaluateExpr("gcd(12, 18)")).toBe(6);
    expect(evaluateExpr("lcm(4, 6)")).toBe(12);
    expect(evaluateExpr("max(1, 5, 3)")).toBe(5);
    expect(evaluateExpr("sin(30)")).toBeCloseTo(0.5);
    expect(evaluateExpr("atan(1)")).toBeCloseTo(45);
    expect(evaluateExpr("if(3 > 2, 10, 20)")).toBe(10);
    expect(evaluateExpr("isint(6/3)")).toBe(1);
    expect(evaluateExpr("isint(7/3)")).toBe(0);
    expect(evaluateExpr("pi")).toBeCloseTo(Math.PI);
  });
  it("comparisons and logic", () => {
    expect(evaluateExpr("a != b && a > 0", { a: 3, b: 4 })).toBe(1);
    expect(evaluateExpr("a == b || a < 0", { a: 3, b: 4 })).toBe(0);
    expect(evaluateExpr("0.1 + 0.2 == 0.3")).toBe(1);
    expect(evaluateExpr("!(1 == 1)")).toBe(0);
  });
  it("errors", () => {
    expect(() => evaluateExpr("1 / 0")).toThrow(ExprError);
    expect(() => evaluateExpr("sqrt(-1)")).toThrow(ExprError);
    expect(() => evaluateExpr("2 +")).toThrow(ExprError);
    expect(() => evaluateExpr("foo(1)")).toThrow(ExprError);
    expect(() => evaluateExpr("1 $ 2")).toThrow(ExprError);
    expect(() => evaluateExpr("(1 + 2")).toThrow(ExprError);
  });
});

describe("roundHalfUp", () => {
  it("rounds half away from zero and survives float noise", () => {
    expect(roundHalfUp(2.5)).toBe(3);
    expect(roundHalfUp(-2.5)).toBe(-3);
    expect(roundHalfUp(1.005, 2)).toBe(1.01);
    expect(roundHalfUp(0.1 + 0.2, 1)).toBe(0.3);
  });
});
