/** Answer normalization — mirror of legacy `core/normalizers.py`, plus term/fraction helpers. */

export type Normalizer = (value: string) => string;

export const NORMALIZERS: Record<string, Normalizer> = {
  trim: (v) => v.trim(),
  lowercase: (v) => v.toLowerCase(),
  comma_to_dot: (v) => v.replace(/,/g, "."),
  remove_spaces: (v) => v.replace(/\s+/g, ""),
  collapse_spaces: (v) => v.replace(/\s+/g, " "),
};

export function applyNormalizations(value: string, normalizations: string[]): string {
  let result = value;
  for (const name of normalizations) {
    const fn = NORMALIZERS[name];
    if (fn) result = fn(result);
  }
  return result;
}

/** Parse a German- or English-formatted number. Returns null when not a number. */
export function normalizeNumber(value: string): number | null {
  let s = value.trim().replace(/\s+/g, "");
  if (s === "") return null;
  s = s.replace(/[€%°]$/u, "").replace(/[−–]/g, "-");
  // "1.234,5" (German thousands + decimal comma) → "1234.5"
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, "").replace(",", ".");
  else s = s.replace(",", ".");
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function numbersEqual(a: number, b: number, tolerance = 0): boolean {
  return Math.abs(a - b) <= tolerance + 1e-9;
}

/** Canonical form for algebraic terms: "3 x + 6" / "3·x+6" / "3x + 6" → "3x+6". */
export function normalizeTerm(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[·×]/g, "*")
    .replace(/[−–]/g, "-")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/:/g, "/")
    .replace(/,/g, ".")
    .replace(/(\d)\*([a-z])/g, "$1$2"); // 3*x → 3x
}

export interface Fraction {
  num: number;
  den: number;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function reduceFraction(f: Fraction): Fraction {
  if (f.den === 0) return f;
  const g = gcd(f.num, f.den) || 1;
  const sign = f.den < 0 ? -1 : 1;
  return { num: (sign * f.num) / g, den: (sign * f.den) / g };
}

/** Parse "3/4", "-3/4", "1 1/2" (mixed), "0,75" or "2". Returns null on failure. */
export function parseFraction(value: string): Fraction | null {
  const s = value.trim().replace(/[−–]/g, "-").replace(/\s*\/\s*/g, "/");
  const mixed = s.match(/^(-?)(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) {
    const sign = mixed[1] === "-" ? -1 : 1;
    const whole = Number(mixed[2]);
    const num = Number(mixed[3]);
    const den = Number(mixed[4]);
    if (den === 0) return null;
    return { num: sign * (whole * den + num), den };
  }
  const simple = s.match(/^(-?\d+)\/(-?\d+)$/);
  if (simple) {
    const num = Number(simple[1]);
    const den = Number(simple[2]);
    if (den === 0) return null;
    return { num, den };
  }
  const n = normalizeNumber(s);
  if (n === null) return null;
  // decimal → fraction with up to 6 decimals
  const decimals = (s.split(/[.,]/)[1] ?? "").length;
  const den = 10 ** Math.min(decimals, 6);
  return { num: Math.round(n * den), den };
}

export function fractionValue(f: Fraction): number {
  return f.num / f.den;
}

export function isReduced(f: Fraction): boolean {
  return f.num === 0 || gcd(f.num, f.den) === 1;
}
