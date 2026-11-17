/**
 * Safe calculator (tokenizer → recursive-descent parser → AST evaluator). No eval().
 * Supports + - * / ^ ( ) %, German decimal comma, functions (sin cos tan asin acos atan
 * sqrt log ln abs) and constants (pi, e). Trigonometry uses DEGREES, as in MSA exams.
 * Behaves like a school calculator: -3^2 is -9, 2π and 2(3+4) multiply, a missing ")" at the
 * end is closed, and the signs ÷ × · − √ ² ³ are understood.
 */

export class CalcError extends Error {
  constructor(message: string, public position = -1) {
    super(message);
  }
}

type TokenType = "NUMBER" | "PLUS" | "MINUS" | "STAR" | "SLASH" | "LPAREN" | "RPAREN" | "PERCENT" | "CARET" | "FUNCTION" | "CONSTANT" | "EOF";
interface Token {
  type: TokenType;
  value: string;
  position: number;
}

export const FUNCTIONS = ["sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "log", "ln", "abs"] as const;
const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };
export const ALLOWED_CHARS = new Set("0123456789.,+-*/()%^ abcdefghijklmnopqrstuvwxyzπ×:−");

export function tokenize(expression: string): Token[] {
  const expr = expression
    .toLowerCase()
    .replace(/π/g, "pi")
    .replace(/√/g, "sqrt")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/[×·]/g, "*")
    .replace(/[:÷]/g, "/")
    .replace(/[−–]/g, "-");
  for (let i = 0; i < expr.length; i++) {
    if (!ALLOWED_CHARS.has(expr[i]!)) throw new CalcError(`Ungültiges Zeichen: "${expr[i]}"`, i);
  }
  const tokens: Token[] = [];
  let pos = 0;
  const single: Record<string, TokenType> = { "+": "PLUS", "-": "MINUS", "*": "STAR", "/": "SLASH", "(": "LPAREN", ")": "RPAREN", "%": "PERCENT", "^": "CARET" };
  while (pos < expr.length) {
    const c = expr[pos]!;
    if (c === " ") {
      pos++;
      continue;
    }
    if (/[0-9.,]/.test(c)) {
      const start = pos;
      let hasDot = false;
      while (pos < expr.length) {
        const d = expr[pos]!;
        if (/[0-9]/.test(d)) pos++;
        else if ((d === "." || d === ",") && !hasDot) {
          hasDot = true;
          pos++;
        } else break;
      }
      let value = expr.slice(start, pos).replace(",", ".");
      if (value === ".") throw new CalcError("Ungültige Zahl", start);
      if (value.startsWith(".")) value = "0" + value;
      tokens.push({ type: "NUMBER", value, position: start });
      continue;
    }
    if (/[a-z]/.test(c)) {
      const start = pos;
      while (pos < expr.length && /[a-z]/.test(expr[pos]!)) pos++;
      const name = expr.slice(start, pos);
      if ((FUNCTIONS as readonly string[]).includes(name)) tokens.push({ type: "FUNCTION", value: name, position: start });
      else if (name in CONSTANTS) tokens.push({ type: "CONSTANT", value: name, position: start });
      else throw new CalcError(`Unbekannte Funktion: "${name}"`, start);
      continue;
    }
    const t = single[c];
    if (!t) throw new CalcError(`Unerwartetes Zeichen: "${c}"`, pos);
    tokens.push({ type: t, value: c, position: pos });
    pos++;
  }
  tokens.push({ type: "EOF", value: "", position: pos });
  return tokens;
}

export type AstNode =
  | { kind: "num"; value: number }
  | { kind: "const"; name: string }
  | { kind: "bin"; op: "+" | "-" | "*" | "/" | "^"; left: AstNode; right: AstNode }
  | { kind: "neg"; operand: AstNode }
  | { kind: "pct"; operand: AstNode }
  | { kind: "fn"; name: string; arg: AstNode };

/**
 * expr    → term (('+'|'-') term)*
 * term    → unary (('*'|'/') unary | implicit)*      implicit: "2π", "2(3+4)", "3 sin(30)"
 * unary   → ('-'|'+') unary | power                  so -3^2 is -(3^2), as on a school calculator
 * power   → postfix ('^' unary)?
 * postfix → primary ('%')*
 * primary → NUMBER | CONSTANT | FUNCTION '(' expr ')' | FUNCTION postfix | '(' expr ')'
 * A ")" that is missing at the very end is closed silently.
 */
export function parse(tokens: Token[]): AstNode {
  let p = 0;
  const cur = () => tokens[p] ?? { type: "EOF", value: "", position: -1 };
  const is = (...types: TokenType[]) => types.includes(cur().type);
  const advance = () => tokens[p++]!;
  const close = () => {
    if (is("RPAREN")) advance();
    else if (!is("EOF")) throw new CalcError('Hier fehlt eine Klammer ")"', cur().position);
  };

  function expr(): AstNode {
    let left = term();
    while (is("PLUS", "MINUS")) {
      const op = advance().type === "PLUS" ? "+" : "-";
      left = { kind: "bin", op, left, right: term() };
    }
    return left;
  }
  function term(): AstNode {
    let left = unary();
    for (;;) {
      if (is("STAR", "SLASH")) {
        const op = advance().type === "STAR" ? "*" : "/";
        left = { kind: "bin", op, left, right: unary() };
      } else if (is("CONSTANT", "FUNCTION", "LPAREN")) {
        left = { kind: "bin", op: "*", left, right: power() };
      } else if (is("NUMBER")) {
        throw new CalcError("Zwischen zwei Zahlen fehlt ein Rechenzeichen", cur().position);
      } else return left;
    }
  }
  function unary(): AstNode {
    if (is("MINUS")) {
      advance();
      return { kind: "neg", operand: unary() };
    }
    if (is("PLUS")) {
      advance();
      return unary();
    }
    return power();
  }
  function power(): AstNode {
    const base = postfix();
    if (is("CARET")) {
      advance();
      return { kind: "bin", op: "^", left: base, right: unary() };
    }
    return base;
  }
  function postfix(): AstNode {
    let node = primary();
    while (is("PERCENT")) {
      advance();
      node = { kind: "pct", operand: node };
    }
    return node;
  }
  function primary(): AstNode {
    const t = cur();
    if (t.type === "NUMBER") {
      advance();
      return { kind: "num", value: Number(t.value) };
    }
    if (t.type === "CONSTANT") {
      advance();
      return { kind: "const", name: t.value };
    }
    if (t.type === "FUNCTION") {
      advance();
      if (!is("LPAREN")) return { kind: "fn", name: t.value, arg: postfix() }; // "√16", "sin 30"
      advance();
      const arg = expr();
      close();
      return { kind: "fn", name: t.value, arg };
    }
    if (t.type === "LPAREN") {
      advance();
      const inner = expr();
      close();
      return inner;
    }
    if (t.type === "EOF") throw new CalcError("Die Rechnung ist noch nicht fertig", t.position);
    throw new CalcError(`Unerwartetes Zeichen: "${t.value.replace(".", ",")}"`, t.position);
  }

  if (cur().type === "EOF") throw new CalcError("Leerer Ausdruck", 0);
  const result = expr();
  if (cur().type !== "EOF") throw new CalcError(`Unerwartetes Zeichen: "${cur().value.replace(".", ",")}"`, cur().position);
  return result;
}

const deg = Math.PI / 180;
/** sin(180) and cos(90) are exactly 0, not 1.2e-16; so 1 / sin(180) is an error, not a huge number. */
const clean = (v: number) => (Math.abs(v) < 1e-14 ? 0 : v);
const FN: Record<string, (x: number) => number> = {
  sin: (x) => clean(Math.sin(x * deg)),
  cos: (x) => clean(Math.cos(x * deg)),
  tan: (x) => (clean(Math.cos(x * deg)) === 0 ? NaN : clean(Math.sin(x * deg)) / Math.cos(x * deg)),
  asin: (x) => Math.asin(x) / deg,
  acos: (x) => Math.acos(x) / deg,
  atan: (x) => Math.atan(x) / deg,
  sqrt: Math.sqrt,
  log: Math.log10,
  ln: Math.log,
  abs: Math.abs,
};

export function evaluateAst(node: AstNode): number {
  switch (node.kind) {
    case "num":
      return node.value;
    case "const":
      return CONSTANTS[node.name]!;
    case "neg":
      return -evaluateAst(node.operand);
    case "pct":
      return evaluateAst(node.operand) / 100;
    case "fn": {
      const v = FN[node.name]!(evaluateAst(node.arg));
      if (!Number.isFinite(v)) throw new CalcError(node.name === "sqrt" ? "Aus einer negativen Zahl gibt es keine Wurzel" : `Das geht nicht mit ${node.name}`);
      return v;
    }
    case "bin": {
      const l = evaluateAst(node.left);
      const r = evaluateAst(node.right);
      switch (node.op) {
        case "+":
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          if (r === 0) throw new CalcError("Division durch Null geht nicht");
          return l / r;
        case "^": {
          const v = Math.pow(l, r);
          if (!Number.isFinite(v)) throw new CalcError("Diese Potenz lässt sich nicht berechnen");
          return v;
        }
      }
    }
  }
}

/** Main entry point. Throws CalcError with a German message. */
export function calculate(expression: string): number {
  const value = evaluateAst(parse(tokenize(expression)));
  // Trim float noise (0.1+0.2) without hiding real precision.
  return Number(value.toPrecision(12));
}
