/**
 * Deterministic variant generation — docs/VARIANTS_AND_SEEDING.md.
 *
 * seed = SHA-256(user|subject|topic|question|date|mode|counter)[0..8]
 * variables sampled with a local RNG from that seed, derived values and
 * constraints applied, then every template string is rendered.
 */

import { sha256 } from "./sha256";
import { rngFromBytes, rngFromSeed, type Rng } from "./rng";
import { evaluateExpr, roundHalfUp } from "./expr";
import { formatEuro, formatFixed, formatFraction, formatFractionTex, formatNumber } from "./format";
import type {
  ClozePayload,
  ContentSection,
  Explanation,
  MatchPayload,
  McqPayload,
  Payload,
  Question,
  RenderedQuestion,
  ShortPayload,
  Solution,
  Subject,
  TrainingMode,
  VariantSpec,
} from "./types";

export type VarValues = Record<string, number | string>;

export function seedBytes(
  userId: string,
  subject: Subject,
  topicId: string,
  questionId: string,
  mode: TrainingMode,
  dateKey: string,
  counter: number,
): Uint8Array {
  const canonical = [userId, subject, topicId, questionId, dateKey, mode, String(counter)].join("|");
  return sha256(canonical).slice(0, 8);
}

export function makeVariantId(questionId: string, dateKey: string, mode: TrainingMode, counter: number): string {
  return `${questionId}::${dateKey}::${mode}::${counter}`;
}

/** Local calendar date as YYYY-MM-DD (the student's timezone). */
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Sample all variables of a spec (sorted by name for determinism), honoring derived + constraints. */
export function sampleVariables(spec: VariantSpec, rng: Rng, maxTries = 2000): VarValues {
  const names = Object.keys(spec.variables).sort();
  for (let attempt = 0; attempt < maxTries; attempt++) {
    const vars: VarValues = {};
    for (const name of names) {
      const def = spec.variables[name]!;
      if (def.type === "int") {
        const step = def.step ?? 1;
        const n = Math.floor((def.max - def.min) / step) + 1;
        vars[name] = def.min + rng.int(n) * step;
      } else if (def.type === "float") {
        const n = Math.round((def.max - def.min) / def.step) + 1;
        vars[name] = roundHalfUp(def.min + rng.int(n) * def.step, 6);
      } else {
        vars[name] = rng.choice(def.values);
      }
    }
    let ok = true;
    try {
      for (const [key, expr] of Object.entries(spec.derived ?? {})) {
        vars[key] = roundHalfUp(evaluateExpr(expr, vars), 9);
      }
      for (const constraint of spec.constraints ?? []) {
        if (!evaluateExpr(constraint, vars)) {
          ok = false;
          break;
        }
      }
    } catch {
      ok = false;
    }
    if (ok) return vars;
  }
  throw new Error("sampleVariables: constraints could not be satisfied");
}

/**
 * Placeholders: {{x}}, {{= expr}}, {{= expr | filter}}, {{= expr | fixed:2}}.
 * Filters: num (default), fixed:n, frac, fractex, euro, raw, sign, abs, int.
 */
// Body may not contain braces so `\frac{{{a}}}{{{b}}}` (TeX brace + placeholder) still works.
const PLACEHOLDER = /\{\{\s*=?\s*([^{}|]+?)\s*(?:\|\s*([a-z]+)(?::([^}\s]+))?\s*)?\}\}/g;

export function renderTemplate(text: string, vars: VarValues): string {
  if (!text.includes("{{")) return text;
  return text.replace(PLACEHOLDER, (_m, body: string, filter?: string, arg?: string) => {
    const key = body.trim();
    const isIdent = /^[A-Za-z_][A-Za-z0-9_]*$/.test(key);
    const value: number | string = isIdent && key in vars ? vars[key]! : evaluateExpr(key, vars);
    return applyFilter(value, filter, arg);
  });
}

function applyFilter(value: number | string, filter?: string, arg?: string): string {
  if (typeof value === "string") return value;
  switch (filter) {
    case undefined:
    case "num":
      return formatNumber(value);
    case "fixed":
      return formatFixed(value, Number(arg ?? 2));
    case "frac":
      return formatFraction(value);
    case "fractex":
      return formatFractionTex(value);
    case "euro":
      return formatEuro(value);
    case "raw":
      return String(value);
    case "sign":
      return `${value < 0 ? "−" : "+"} ${formatNumber(Math.abs(value))}`;
    case "abs":
      return formatNumber(Math.abs(value));
    case "int":
      return formatNumber(roundHalfUp(value, 0));
    default:
      throw new Error(`renderTemplate: unknown filter "${filter}"`);
  }
}

/** True when a string still contains an unrendered placeholder. */
export function hasPlaceholder(text: string): boolean {
  return /\{\{/.test(text);
}

// --- legacy emoji-sectioned explanations → structured sections -------------

const MARKERS: [RegExp, ContentSection["kind"]][] = [
  [/^\u{1F3AF}/u, "what"], // target
  [/^\u{1F4D6}/u, "terms"], // book
  [/^\u{1F4D0}/u, "formula"], // triangle ruler
  [/^✏️?/u, "steps"], // pencil
  [/^⚠️?/u, "mistake"], // warning
  [/^\u{1F4A1}/u, "remember"], // bulb
  [/^✅/u, "answer"], // check
];
const ANY_EMOJI = /^(?:[\u{1F300}-\u{1FAFF}]|[☀-➿])️?/u;

export function parseExplanation(explanation: Explanation): ContentSection[] {
  if (Array.isArray(explanation)) return explanation;
  const lines = explanation.replace(/\r\n/g, "\n").split("\n");
  const sections: ContentSection[] = [];
  let current: ContentSection | null = null;
  const flush = () => {
    if (current) {
      current.body = current.body.trim();
      sections.push(current);
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    let kind: ContentSection["kind"] | null = null;
    for (const [re, k] of MARKERS) {
      if (re.test(line)) {
        kind = k;
        break;
      }
    }
    if (!kind && ANY_EMOJI.test(line)) kind = "text";
    if (kind) {
      flush();
      const rest = line.replace(ANY_EMOJI, "").trim();
      const colon = rest.indexOf(":");
      let title = rest;
      let first = "";
      if (colon >= 0) {
        title = rest.slice(0, colon).trim();
        first = rest.slice(colon + 1).trim();
      }
      title = title.replace(/[:?]+$/, "").trim();
      if (title === title.toUpperCase() && title.length > 3) {
        title = title.charAt(0) + title.slice(1).toLowerCase();
      }
      current = { kind, title: title || undefined, body: first };
    } else if (current) {
      current.body += (current.body ? "\n" : "") + line;
    } else if (line.trim()) {
      current = { kind: "text", body: line };
    }
  }
  flush();
  return sections.length ? sections : [{ kind: "text", body: explanation }];
}

// --- rendering --------------------------------------------------------------

function renderPayload(payload: Payload, vars: VarValues): Payload {
  if ("choices" in payload) {
    const p = payload as McqPayload;
    return { ...p, choices: p.choices.map((c) => renderTemplate(c, vars)) };
  }
  if ("text_with_blanks" in payload) {
    const p = payload as ClozePayload;
    return {
      ...p,
      text_with_blanks: renderTemplate(p.text_with_blanks, vars),
      blanks: p.blanks.map((b) => ({ ...b, choices: b.choices?.map((c) => renderTemplate(c, vars)) })),
    };
  }
  if ("left" in payload) {
    const p = payload as MatchPayload;
    return { ...p, left: p.left.map((c) => renderTemplate(c, vars)), right: p.right.map((c) => renderTemplate(c, vars)) };
  }
  const p = payload as ShortPayload;
  return { ...p, unit: p.unit ? renderTemplate(p.unit, vars) : p.unit };
}

function renderSolution(solution: Solution, vars: VarValues, payload: Payload): { solution: Solution; payload: Payload } {
  if ("kind" in solution && solution.kind === "computed") {
    // Always strip float noise (0.35 * 20 = 7.000000000000001) so answers compare cleanly.
    const value = roundHalfUp(evaluateExpr(solution.expr, vars), solution.round ?? 10);
    const short = payload as ShortPayload;
    const tolerance = solution.tolerance ?? short.tolerance ?? 0;
    return { solution: { value }, payload: { ...short, tolerance } };
  }
  if ("correct_choice" in solution) return { solution: { correct_choice: renderTemplate(solution.correct_choice, vars) }, payload };
  if ("value" in solution) {
    const v = solution.value;
    return { solution: { value: typeof v === "string" ? renderTemplate(v, vars) : v }, payload };
  }
  if ("answers" in solution) {
    const answers: Record<string, string> = {};
    for (const [k, v] of Object.entries(solution.answers)) answers[k] = renderTemplate(v, vars);
    return { solution: { answers }, payload };
  }
  if ("pairs" in solution) {
    return { solution: { pairs: solution.pairs.map(([l, r]) => [renderTemplate(l, vars), renderTemplate(r, vars)]) }, payload };
  }
  return { solution, payload };
}

export function renderQuestion(question: Question, vars: VarValues, variantId: string): RenderedQuestion {
  const payload = renderPayload(question.payload, vars);
  const { solution, payload: payload2 } = renderSolution(question.solution, vars, payload);
  const explanation = parseExplanation(question.explanation).map((s) => ({
    ...s,
    title: s.title ? renderTemplate(s.title, vars) : s.title,
    body: renderTemplate(s.body, vars),
  }));
  return {
    baseQuestionId: question.id,
    variantId,
    subject: question.subject,
    topicId: question.topicId,
    difficulty: question.difficulty,
    qtype: question.qtype,
    prompt: renderTemplate(question.prompt, vars),
    payload: payload2,
    solution,
    explanation,
    vars,
    source: question.source,
    figure: question.figure ? renderTemplate(question.figure, vars) : undefined,
  };
}

export interface VariantContext {
  userId: string;
  mode: TrainingMode;
  dateKey: string;
  counter: number;
}

/** Render a question for a user — deterministic for identical context. */
export function renderVariant(question: Question, ctx: VariantContext): RenderedQuestion {
  const variantId = makeVariantId(question.id, ctx.dateKey, ctx.mode, ctx.counter);
  if (!question.variants?.enabled) return renderQuestion(question, {}, variantId);
  const rng = rngFromBytes(
    seedBytes(ctx.userId, question.subject, question.topicId, question.id, ctx.mode, ctx.dateKey, ctx.counter),
  );
  const vars = sampleVariables(question.variants, rng);
  return renderQuestion(question, vars, variantId);
}

/** Render the i-th preview variant (content checks, authoring previews). */
export function renderPreview(question: Question, i: number): RenderedQuestion {
  const variantId = `${question.id}::preview::${i}`;
  if (!question.variants?.enabled) return renderQuestion(question, {}, variantId);
  const vars = sampleVariables(question.variants, rngFromSeed(0x9e37 + i, 0x79b9 * (i + 1)));
  return renderQuestion(question, vars, variantId);
}
