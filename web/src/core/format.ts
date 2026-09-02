/** Number formatting for German-speaking students. */

import { gcd } from "./normalizers";

/** 1234.5 → "1234,5"; 3 → "3"; 0.1+0.2 → "0,3". Trims float noise, max `maxDecimals`. */
export function formatNumber(value: number, maxDecimals = 4): string {
  if (!Number.isFinite(value)) return String(value);
  const rounded = Number(value.toFixed(maxDecimals));
  let s = rounded.toString();
  if (s.includes("e")) s = rounded.toFixed(maxDecimals).replace(/\.?0+$/, "");
  return s.replace("-", "−").replace(".", ",");
}

/** Fixed decimals, German comma: formatFixed(2.5, 2) → "2,50". */
export function formatFixed(value: number, decimals: number): string {
  return value.toFixed(decimals).replace("-", "−").replace(".", ",");
}

/** Decimal → reduced fraction string, e.g. 0.75 → "3/4". Exact only up to 1/10000. */
export function formatFraction(value: number): string {
  if (Number.isInteger(value)) return String(value);
  const sign = value < 0 ? "−" : "";
  const abs = Math.abs(value);
  for (let den = 2; den <= 10000; den++) {
    const num = abs * den;
    if (Math.abs(num - Math.round(num)) < 1e-9) {
      const n = Math.round(num);
      const g = gcd(n, den);
      return `${sign}${n / g}/${den / g}`;
    }
  }
  return formatNumber(value);
}

/** Decimal → reduced LaTeX fraction, e.g. 0.75 → "\frac{3}{4}". */
export function formatFractionTex(value: number): string {
  const s = formatFraction(value);
  const m = s.match(/^(−?)(\d+)\/(\d+)$/);
  if (!m) return s;
  return `${m[1] === "−" ? "-" : ""}\\frac{${m[2]}}{${m[3]}}`;
}

/** Currency: 12.5 → "12,50 €" */
export function formatEuro(value: number): string {
  return `${formatFixed(value, 2)} €`;
}
