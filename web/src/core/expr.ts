/**
 * Safe arithmetic/boolean expression evaluator for computed solutions,
 * derived variables, template placeholders and constraints. No eval().
 *
 * Grammar:
 *   or   := and ('||' and)*          and := cmp ('&&' cmp)*
 *   cmp  := add (op add)?  op in == != <= >= < >
 *   add  := mul (('+'|'-') mul)*     mul := unary (('*'|'/') unary)*
 *   unary:= ('-'|'!') unary | pow    pow := primary ('^' unary)?
 *   primary := NUMBER | IDENT | IDENT '(' args ')' | '(' or ')'
 * Trig works in DEGREES (MSA convention). Booleans are 1/0.
 */

export class ExprError extends Error {}

export type Vars = Record<string, number | string | boolean>;

const deg = Math.PI / 180;

/** Round half away from zero, tolerant to float noise (2.675 → 2.68). */
export function roundHalfUp(x: number, decimals = 0): number {
  const f = 10 ** decimals;
  const y = Math.abs(x) * f;
  const r = Math.round(y + 1e-9);
  return (Math.sign(x) || 1) * (r / f);
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

type Fn = (...a: number[]) => number;

const FUNCS: Record<string, Fn> = {
  abs: (x = 0) => Math.abs(x),
  sqrt: (x = 0) => {
    if (x < 0) throw new ExprError("sqrt of negative");
    return Math.sqrt(x);
  },
  round: (x = 0, n = 0) => roundHalfUp(x, n),
  floor: (x = 0) => Math.floor(x),
  ceil: (x = 0) => Math.ceil(x),
  min: (...a) => Math.min(...a),
  max: (...a) => Math.max(...a),
  mod: (a = 0, b = 0) => {
    if (b === 0) throw new ExprError("mod by zero");
    return ((a % b) + b) % b;
  },
  pow: (a = 0, b = 0) => Math.pow(a, b),
  gcd: (a = 0, b = 0) => gcd(a, b),
  lcm: (a = 0, b = 0) => Math.abs(a * b) / (gcd(a, b) || 1),
  sin: (x = 0) => Math.sin(x * deg),
  cos: (x = 0) => Math.cos(x * deg),
  tan: (x = 0) => Math.tan(x * deg),
  asin: (x = 0) => Math.asin(x) / deg,
  acos: (x = 0) => Math.acos(x) / deg,
  atan: (x = 0) => Math.atan(x) / deg,
  exp: (x = 0) => Math.exp(x),
  ln: (x = 0) => Math.log(x),
  log: (x = 0) => Math.log10(x),
  if: (c = 0, a = 0, b = 0) => (c ? a : b),
  sign: (x = 0) => Math.sign(x),
  isint: (x = 0) => (Number.isInteger(roundHalfUp(x, 9)) ? 1 : 0),
};

const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

type Tok = { t: "num"; v: number } | { t: "id"; v: string } | { t: "op"; v: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i]!;
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j]!)) j++;
      const v = Number(src.slice(i, j));
      if (!Number.isFinite(v)) throw new ExprError(`bad number at ${i}`);
      out.push({ t: "num", v });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j]!)) j++;
      out.push({ t: "id", v: src.slice(i, j) });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (["==", "!=", "<=", ">=", "&&", "||"].includes(two)) {
      out.push({ t: "op", v: two });
      i += 2;
      continue;
    }
    if ("+-*/^(),<>!".includes(c)) {
      out.push({ t: "op", v: c });
      i++;
      continue;
    }
    throw new ExprError(`unexpected character "${c}" at ${i}`);
  }
  return out;
}

export function evaluateExpr(src: string, vars: Vars = {}): number {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => {
    const t = peek();
    return t?.t === "op" && t.v === v;
  };
  const eat = (v: string) => {
    if (!isOp(v)) throw new ExprError(`expected "${v}"`);
    p++;
  };

  const num = (v: number | string | boolean, name: string): number => {
    if (typeof v === "number") return v;
    if (typeof v === "boolean") return v ? 1 : 0;
    const n = Number(String(v).replace(",", "."));
    if (!Number.isFinite(n)) throw new ExprError(`variable "${name}" is not numeric`);
    return n;
  };

  function or(): number {
    let l = and();
    while (isOp("||")) {
      p++;
      const r = and();
      l = l || r ? 1 : 0;
    }
    return l;
  }
  function and(): number {
    let l = cmp();
    while (isOp("&&")) {
      p++;
      const r = cmp();
      l = l && r ? 1 : 0;
    }
    return l;
  }
  function cmp(): number {
    const l = add();
    for (const op of ["==", "!=", "<=", ">=", "<", ">"]) {
      if (isOp(op)) {
        p++;
        const r = add();
        const eq = Math.abs(l - r) < 1e-9;
        switch (op) {
          case "==":
            return eq ? 1 : 0;
          case "!=":
            return eq ? 0 : 1;
          case "<=":
            return l <= r + 1e-9 ? 1 : 0;
          case ">=":
            return l >= r - 1e-9 ? 1 : 0;
          case "<":
            return l < r - 1e-9 ? 1 : 0;
          default:
            return l > r + 1e-9 ? 1 : 0;
        }
      }
    }
    return l;
  }
  function add(): number {
    let l = mul();
    for (;;) {
      if (isOp("+")) {
        p++;
        l += mul();
      } else if (isOp("-")) {
        p++;
        l -= mul();
      } else return l;
    }
  }
  function mul(): number {
    let l = unary();
    for (;;) {
      if (isOp("*")) {
        p++;
        l *= unary();
      } else if (isOp("/")) {
        p++;
        const r = unary();
        if (r === 0) throw new ExprError("division by zero");
        l /= r;
      } else return l;
    }
  }
  function unary(): number {
    if (isOp("-")) {
      p++;
      return -unary();
    }
    if (isOp("!")) {
      p++;
      return unary() ? 0 : 1;
    }
    if (isOp("+")) {
      p++;
      return unary();
    }
    return pow();
  }
  function pow(): number {
    const b = primary();
    if (isOp("^")) {
      p++;
      const e = unary();
      return Math.pow(b, e);
    }
    return b;
  }
  function primary(): number {
    const t = peek();
    if (!t) throw new ExprError("unexpected end of expression");
    if (t.t === "num") {
      p++;
      return t.v;
    }
    if (t.t === "id") {
      p++;
      if (isOp("(")) {
        p++;
        const args: number[] = [];
        if (!isOp(")")) {
          args.push(or());
          while (isOp(",")) {
            p++;
            args.push(or());
          }
        }
        eat(")");
        const fn = FUNCS[t.v];
        if (!fn) throw new ExprError(`unknown function "${t.v}"`);
        return fn(...args);
      }
      if (t.v in vars) return num(vars[t.v]!, t.v);
      if (t.v in CONSTS) return CONSTS[t.v]!;
      throw new ExprError(`unknown variable "${t.v}"`);
    }
    if (t.t === "op" && t.v === "(") {
      p++;
      const v = or();
      eat(")");
      return v;
    }
    throw new ExprError(`unexpected token "${t.v}"`);
  }

  const result = or();
  if (p !== toks.length) throw new ExprError("unexpected trailing input");
  if (!Number.isFinite(result)) throw new ExprError("result is not finite");
  return result;
}
