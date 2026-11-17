import { describe, expect, it } from "vitest";
import { calculate } from "@/core/calculator";
import { showResult } from "./Calculator";

describe("showResult", () => {
  it.each([
    [22, "22"],
    [0.5, "0,5"],
    [-3, "−3"],
    [1 / 3, "0,333333"],
    [2 / 3, "0,666667"],
    [0, "0"],
    [123456789, "123456789"],
    [999999999999, "999999999999"],
    [1e12, "1 · 10^12"],
    [2 ** 70, "1,180592 · 10^21"],
    [1e-7, "1 · 10^−7"],
    [-2.5e-9, "−2,5 · 10^−9"],
    [0.000001, "0,000001"],
  ])("%d is shown as %s", (v, text) => {
    expect(showResult(v)).toBe(text);
  });
  it("every shown result can be typed back in", () => {
    for (const v of [22, 0.5, -3, 1e12, 2 ** 70, 1e-7, -2.5e-9]) {
      expect(calculate(showResult(v))).toBeCloseTo(v, -Math.floor(Math.log10(Math.abs(v))) + 5);
    }
  });
});
