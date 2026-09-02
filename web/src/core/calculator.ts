/**
 * Safe calculator (tokenizer → recursive-descent parser → AST evaluator). No eval().
 * Supports + - * / ^ ( ) %, German decimal comma, functions (sin cos tan asin acos atan
 * sqrt log ln abs) and constants (pi, e). Trigonometry uses DEGREES, as in MSA exams.
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
  const expr = expression.toLowerCase().replace(/π/g, "pi").replace(/×/g, "*").replace(/:/g, "/").replace(/−/g, "-");
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
      if (value.startsWith(".")) value = "0" + value;
      if (value === "0." || value === ".") throw new CalcError("Ungültige Zahl", start);
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
 * term    → power (('*'|'/') power)*
 * power   → factor ('^' power)?
 * factor  → ('-'|'+')? primary ('%')?
 * primary → NUMBER | CONSTANT | FUNCTION '(' expr ')' | '(' expr ')'
 */
export function parse(tokens: Token[]): AstNode {
  let p = 0;
  const cur = () => tokens[p] ?? { type: "EOF", value: "", position: -1 };
  const is = (...types: TokenType[]) => types.includes(cur().type);
  const advance = () => tokens[p++]!;

  function expr(): AstNode {
    let left = term();
    while (is("PLUS", "MINUS")) {
      const op = advance().type === "PLUS" ? "+" : "-";
      left = { kind: "bin", op, left, right: term() };
    }
    return left;
  }
  function term(): AstNode {
    let left = power();
    while (is("STAR", "SLASH")) {
      const op = advance().type === "STAR" ? "*" : "/";
      left = { kind: "bin", op, left, right: power() };
    }
    return left;
  }
  function power(): AstNode {
    const base = factor();
    if (is("CARET")) {
      advance();
      return { kind: "bin", op: "^", left: base, right: power() };
    }
    return base;
  }
  function factor(): AstNode {
    if (is("MINUS")) {
      advance();
      return { kind: "neg", operand: factor() };
    }
    if (is("PLUS")) {
      advance();
      return factor();
    }
    let node = primary();
    if (is("PERCENT")) {
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
      if (!is("LPAREN")) throw new CalcError(`Erwarte "(" nach ${t.value}`, cur().position);
      advance();
      const arg = expr();
      if (!is("RPAREN")) throw new CalcError('Erwarte ")"', cur().position);
      advance();
      return { kind: "fn", name: t.value, arg };
    }
    if (t.type === "LPAREN") {
      advance();
      const inner = expr();
      if (!is("RPAREN")) throw new CalcError('Erwarte ")"', cur().position);
      advance();
      return inner;
    }
    if (t.type === "EOF") throw new CalcError("Ausdruck unvollständig", t.position);
    throw new CalcError(`Unerwartetes Zeichen: "${t.value}"`, t.position);
  }

  if (cur().type === "EOF") throw new CalcError("Leerer Ausdruck", 0);
  const result = expr();
  if (cur().type !== "EOF") throw new CalcError(`Unerwartetes Zeichen: "${cur().value}"`, cur().position);
  return result;
}

const deg = Math.PI / 180;
const FN: Record<string, (x: number) => number> = {
  sin: (x) => Math.sin(x * deg),
  cos: (x) => Math.cos(x * deg),
  tan: (x) => Math.tan(x * deg),
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
      if (!Number.isFinite(v)) throw new CalcError(`Mathematischer Fehler in ${node.name}`);
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
          if (r === 0) throw new CalcError("Division durch Null");
          return l / r;
        case "^": {
          const v = Math.pow(l, r);
          if (!Number.isFinite(v)) throw new CalcError("Potenzfehler");
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
