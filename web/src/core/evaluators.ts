/** Answer evaluation for all question types — mirror of legacy `core/evaluators/`, extended. */

import type { ClozePayload, MatchPayload, RenderedQuestion, ShortPayload, Solution, WriteCheck, WritePayload } from "./types";
import {
  applyNormalizations,
  cleanAnswer,
  fractionValue,
  isReduced,
  normalizeNumber,
  normalizeTerm,
  numbersEqual,
  parseFraction,
  readAnswerNumber,
  reduceFraction,
  termsEquivalent,
} from "./normalizers";
import { evaluateExpr, roundHalfUp } from "./expr";
import { formatNumber } from "./format";

export interface Evaluation {
  isCorrect: boolean;
  correctAnswer: unknown;
  /** Human-readable correct answer for feedback. */
  correctAnswerText: string;
  normalizedAnswer: string;
  hint?: string;
  /** WRITE: every rule check behind the verdict. */
  checks?: WriteCheck[];
  /** WRITE: weighted share of scored checks passed. */
  score?: number;
}

export function evaluate(question: RenderedQuestion, userAnswer: unknown): Evaluation {
  switch (question.qtype) {
    case "MCQ":
      return evaluateMcq(question, userAnswer);
    case "SHORT":
      return evaluateShort(question, userAnswer);
    case "CLOZE":
      return evaluateCloze(question, userAnswer);
    case "MATCH":
      return evaluateMatch(question, userAnswer);
    case "WRITE":
      return evaluateWrite(question, userAnswer);
  }
}

function solutionChoice(solution: Solution): string {
  return "correct_choice" in solution ? String(solution.correct_choice) : "";
}

export function evaluateMcq(question: RenderedQuestion, userAnswer: unknown): Evaluation {
  const correct = solutionChoice(question.solution);
  const normalized = userAnswer == null ? "" : String(userAnswer).trim();
  return {
    isCorrect: normalized === correct.trim(),
    correctAnswer: correct,
    correctAnswerText: correct,
    normalizedAnswer: normalized,
  };
}

function fractionText(f: { num: number; den: number }): string {
  return f.den === 1 ? String(f.num) : `${f.num}/${f.den}`;
}

export function evaluateShort(question: RenderedQuestion, userAnswer: unknown): Evaluation {
  const payload = question.payload as ShortPayload;
  const answerType = payload.answer_type ?? "text";
  const normalizations = payload.normalization ?? ["trim"];
  const tolerance = payload.tolerance ?? 0;
  const correct = "value" in question.solution ? question.solution.value : "";
  const userStr = userAnswer == null ? "" : String(userAnswer);
  const unit = payload.unit ? ` ${payload.unit}` : "";

  if (answerType === "number") {
    const correctNum = typeof correct === "number" ? correct : (normalizeNumber(String(correct)) ?? NaN);
    const userNum = readAnswerNumber(userStr);
    const text = formatNumber(correctNum) + unit;
    if (userNum === null) {
      return {
        isCorrect: false,
        correctAnswer: correctNum,
        correctAnswerText: text,
        normalizedAnswer: userStr.trim(),
        hint: "Bitte eine Zahl eingeben (z. B. 3,5).",
      };
    }
    // Without an explicit tolerance, accept any answer that rounds to the stored value at its own
    // precision (stored 58,3 → 58,33 is fine; stored 5 → 5,4 is not).
    const decimals = payload.tolerance === undefined ? (String(correctNum).split(".")[1] ?? "").length : 0;
    const isCorrect = numbersEqual(userNum, correctNum, tolerance) || (decimals > 0 && numbersEqual(roundHalfUp(userNum, decimals), correctNum));
    return {
      isCorrect,
      correctAnswer: correctNum,
      correctAnswerText: text,
      normalizedAnswer: String(userNum),
    };
  }

  if (answerType === "fraction") {
    const correctFrac = parseFraction(String(correct));
    const userFrac = parseFraction(cleanAnswer(userStr));
    const correctText = correctFrac ? fractionText(reduceFraction(correctFrac)) : String(correct);
    if (!correctFrac) {
      return { isCorrect: false, correctAnswer: correct, correctAnswerText: correctText, normalizedAnswer: userStr };
    }
    if (!userFrac) {
      return {
        isCorrect: false,
        correctAnswer: correctText,
        correctAnswerText: correctText,
        normalizedAnswer: userStr.trim(),
        hint: "Schreibe den Bruch als Zähler/Nenner, z. B. 3/4.",
      };
    }
    const same = numbersEqual(fractionValue(userFrac), fractionValue(correctFrac), 1e-9);
    const exactText = fractionText(correctFrac);
    if (payload.exact) {
      const exactMatch = userFrac.num === correctFrac.num && userFrac.den === correctFrac.den;
      return {
        isCorrect: exactMatch,
        correctAnswer: exactText,
        correctAnswerText: exactText,
        normalizedAnswer: fractionText(userFrac),
        hint: same && !exactMatch ? "Der Wert stimmt, aber hier ist genau diese Schreibweise gefragt." : undefined,
      };
    }
    if (same && payload.require_reduced && !isReduced(userFrac)) {
      return {
        isCorrect: false,
        correctAnswer: correctText,
        correctAnswerText: correctText,
        normalizedAnswer: fractionText(userFrac),
        hint: "Der Wert stimmt, aber der Bruch ist noch nicht vollständig gekürzt.",
      };
    }
    return { isCorrect: same, correctAnswer: correctText, correctAnswerText: correctText, normalizedAnswer: fractionText(userFrac) };
  }

  if (answerType === "term") {
    const a = normalizeTerm(userStr);
    const b = normalizeTerm(String(correct));
    if (!a) return { isCorrect: false, correctAnswer: correct, correctAnswerText: String(correct), normalizedAnswer: a };
    const eq = termsEquivalent(userStr, String(correct), evaluateExpr);
    const isCorrect = eq === null ? a === b : eq;
    if (isCorrect && payload.require_simplified && a.length > b.length) {
      return {
        isCorrect: false,
        correctAnswer: correct,
        correctAnswerText: String(correct),
        normalizedAnswer: a,
        hint: "Der Term stimmt, ist aber noch nicht vollständig zusammengefasst.",
      };
    }
    return { isCorrect, correctAnswer: correct, correctAnswerText: String(correct), normalizedAnswer: a };
  }

  // text
  const normalized = applyNormalizations(userStr, normalizations);
  const correctNormalized = applyNormalizations(String(correct), normalizations);
  return {
    isCorrect: normalized === correctNormalized,
    correctAnswer: correct,
    correctAnswerText: String(correct),
    normalizedAnswer: normalized,
  };
}

/**
 * Why an answer cannot be checked at all. Such an answer is sent back to the learner with this sentence
 * and is not counted as wrong. Null when the answer can be checked.
 */
export function answerProblem(question: RenderedQuestion, userAnswer: unknown): string | null {
  if (question.qtype !== "SHORT") return null;
  const payload = question.payload as ShortPayload;
  const s = userAnswer == null ? "" : String(userAnswer);
  if (payload.answer_type === "number" && readAnswerNumber(s) === null) return "Das kann ich nicht als Zahl lesen. Schreib nur die Zahl, zum Beispiel 3,5.";
  if (payload.answer_type === "fraction" && parseFraction(cleanAnswer(s)) === null) return "Das kann ich nicht als Bruch lesen. Schreib ihn so: 3/4.";
  return null;
}

/**
 * One gap: a chosen entry must be exactly the right one (in "Laufen / laufen" the capital letter is the
 * point). A typed entry may differ in capitals, apostrophe style and extra spaces.
 */
export function clozeMatches(chosen: boolean, got: string, expected: string): boolean {
  if (chosen) return got.trim() === expected.trim();
  const flat = (x: string) => x.trim().toLowerCase().replace(/[’‘´`]/g, "'").replace(/\s+/g, " ");
  return flat(got) === flat(expected);
}

/** CLOZE: userAnswer is a map blankId → chosen/typed string. */
export function evaluateCloze(question: RenderedQuestion, userAnswer: unknown): Evaluation {
  const answers = "answers" in question.solution ? question.solution.answers : {};
  const payload = question.payload as ClozePayload;
  const user = (userAnswer && typeof userAnswer === "object" ? userAnswer : {}) as Record<string, string>;
  let all = true;
  const parts: string[] = [];
  for (const blank of payload.blanks) {
    const key = String(blank.id);
    const expected = (answers[key] ?? "").trim();
    const got = (user[key] ?? "").trim();
    parts.push(expected);
    if (!clozeMatches(!!blank.choices?.length, got, expected)) all = false;
  }
  return {
    isCorrect: all,
    correctAnswer: answers,
    correctAnswerText: parts.join(", "),
    normalizedAnswer: JSON.stringify(user),
  };
}

/** MATCH: userAnswer is a list of [left, right] pairs. */
export function evaluateMatch(question: RenderedQuestion, userAnswer: unknown): Evaluation {
  const pairs = "pairs" in question.solution ? question.solution.pairs : [];
  const payload = question.payload as MatchPayload;
  const text = pairs.map(([l, r]) => `${l} → ${r}`).join("\n");
  if (!Array.isArray(userAnswer)) {
    return { isCorrect: false, correctAnswer: pairs, correctAnswerText: text, normalizedAnswer: String(userAnswer) };
  }
  const key = (p: unknown) => (Array.isArray(p) ? `${p[0]}\u0000${p[1]}` : "");
  const userSet = new Set(userAnswer.map(key));
  const correctSet = new Set(pairs.map(key));
  const isCorrect =
    userSet.size === correctSet.size &&
    [...correctSet].every((k) => userSet.has(k)) &&
    userSet.size === payload.left.length;
  return { isCorrect, correctAnswer: pairs, correctAnswerText: text, normalizedAnswer: [...userSet].sort().join("|") };
}

// --- WRITE ------------------------------------------------------------------------
//
// The official scoring of the MSA writing tasks is half checklist: EN gives Inhalt/Sprache 50:50
// and the Inhalt half is "all questions answered, ≥ n aspects, word count"; the DE Schreibplan is
// 1 P per filled cell; the Erörterung rubric starts with Gliederung and Schreibfunktion. Those
// parts are checked here by rules. Sprache (grammar, spelling, style) is deliberately not scored:
// language hints are shown with weight 0 and the student compares with the Musterlösung.

/** A writing attempt passes when this share of the scored checks is met. */
export const WRITE_PASS_RATIO = 0.7;

export function countWords(text: string): number {
  return text
    .replace(/^\s*(to|from|subject|an|von|betreff)\s*:.*$/gim, "")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

const paragraphs = (text: string) => text.split(/\n+/).map((l) => l.trim()).filter((l) => l.length > 0);
const has = (text: string, re: RegExp) => re.test(text);
const count = (text: string, re: RegExp) => (text.match(re) ?? []).length;

const EN_INFORMAL_OPEN = /^\s*(hi|hey|hello|dear [a-z]+,?\s*$)/im;
const EN_FORMAL_OPEN = /^\s*dear (sir|madam|mr|mrs|ms|dr)\b/im;
const EN_FORMAL_CLOSE = /\b(yours (sincerely|faithfully)|kind regards|best regards|sincerely)\b/i;
const EN_INFORMAL_CLOSE = /\b(love|cheers|see you( soon)?|take care|bye|xoxo|hugs)\b/i;

/** Word-for-word German that costs Sprache points. Shown as hints, never scored. */
const GERMANISMS: [RegExp, string][] = [
  [/\bI (have|had) \w+ years\b/i, "„I have 15 years“ → *I am 15 (years old)*"],
  [/\bsince (\d+|two|three|four|five|six|seven|eight|nine|ten|many|a few|several) (years?|months?|weeks?|days?|hours?)\b/i, "„since five years“ → *for five years*"],
  [/\bat (monday|tuesday|wednesday|thursday|friday|saturday|sunday|the weekend)\b/i, "„at Monday“ → *on Monday*"],
  [/\bmake (a |some |many )?(photo|picture|foto)s?\b/i, "„make a photo“ → *take a photo*"],
  [/\binterested (for|about|on)\b/i, "„interested for“ → *interested in*"],
  [/\bdo (a|an|no|some) mistakes?\b/i, "„do a mistake“ → *make a mistake*"],
  [/\blook(ing)? forward to (meet|see|hear|read|get)\b/i, "„look forward to hear“ → *looking forward to hearing*"],
  [/\b(my|the|a) handy\b/i, "„Handy“ → *mobile phone / cell phone*"],
  [/\bbecome (a|an|the|my) (present|gift|letter|mail|e-mail|answer|message)\b/i, "„become a present“ → *get a present*"],
  [/\bin the internet\b/i, "„in the internet“ → *on the internet*"],
  [/\bactual\b(?! (ly|size|price))/i, "„actual“ heißt *tatsächlich* — *aktuell* = *current*"],
  [/\bwho\b[^.?!]*\b(is|are) (it|this|that) about\b/i, "Fragen: *What is it about?*"],
];

const DE_UMGANGSSPRACHE = /\b(krass|mega|voll (gut|cool|nervig|schlecht|geil)|geil|halt so|echt jetzt|irgendwie|kacke|scheiße|bock|die dinger|nervt|checken|chillen|cool)\b/i;
const DE_PRO = /\b(vorteil|dafür spricht|einerseits|ein argument für|befürwort|positiv|zum einen)\b/i;
const DE_CONTRA = /\b(nachteil|dagegen spricht|andererseits|jedoch|allerdings|gegenargument|einwand|gegenthese|negativ|zum anderen|kritisch)\b/i;
const DE_TRANSITIONS = /\b(außerdem|zudem|darüber hinaus|ein weiteres|weiterhin|jedoch|allerdings|andererseits|insgesamt|zu guter letzt|schließlich|zum einen|zum anderen|hingegen|zusammenfassend|abschließend|des weiteren)\b/gi;
const DE_BELEG = /\b(zum beispiel|z\. ?b\.|beispielsweise|studien?\b|laut\b|zeig(t|en)\b|statistik|umfrage|prozent|so\b.{0,40}\b(etwa|beispielsweise))|\d+ ?%/gi;
const DE_OPINION = /\b(meiner meinung nach|ich finde|(ich bin|bin ich) der (meinung|ansicht)|ich denke|ich empfehle|persönlich (finde|denke|meine|bin ich)|für mich (überwieg|ist|sind)|meines erachtens|ich halte|halte ich)\b/i;

/** Rule checks for one requirement id. Returns null for unknown ids so content errors surface. */
function requirementCheck(id: string, text: string, register?: "formal" | "informal"): WriteCheck | null {
  const [name, arg] = id.split(":");
  switch (name) {
    case "greeting":
      return { id, label: "Anrede (Dear …, Hi …)", ok: has(text, /^\s*(dear|hi|hey|hello|liebe[rs]?|hallo|sehr geehrte)\b/im), weight: 1 };
    case "closing":
      return {
        id,
        label: "Schlussformel (Best wishes, See you …)",
        ok: EN_FORMAL_CLOSE.test(text) || EN_INFORMAL_CLOSE.test(text) || has(text, /\b(best wishes|all the best|regards|hope to hear from you|write back soon|talk soon|speak soon|hope this helps|thanks for|thank you for|viele grüße|liebe grüße|mit freundlichen grüßen)\b/i) || has(text, /^\s*(best|yours|greetings|bye|thanks|cheers),?\s*$/im),
        weight: 1,
      };
    case "subject":
      return { id, label: "Betreffzeile (Subject: …)", ok: has(text, /^\s*(subject|betreff)\s*:/im), weight: 1 };
    case "sentences":
      return { id, label: "Ganze Sätze (mindestens drei)", ok: count(text, /[.!?](\s|$)/g) >= 3, weight: 1 };
    case "paragraphs": {
      const n = Number(arg ?? 3);
      const got = paragraphs(text).length;
      return { id, label: `Mindestens ${n} Absätze`, ok: got >= n, weight: 1, detail: got < n ? `${got} gefunden — Absätze mit Leerzeile trennen.` : undefined };
    }
    case "both_sides":
      return { id, label: "Beide Seiten: Pro und Kontra", ok: DE_PRO.test(text) && DE_CONTRA.test(text), weight: 2, detail: !DE_CONTRA.test(text) ? "Die Gegenseite fehlt (jedoch, andererseits, Nachteil …)." : !DE_PRO.test(text) ? "Die Pro-Seite fehlt (Vorteil, dafür spricht …)." : undefined };
    case "transitions":
      return { id, label: "Überleitungen (außerdem, jedoch, insgesamt …)", ok: count(text, DE_TRANSITIONS) >= 2, weight: 1 };
    case "belege":
      return { id, label: "Belege oder Beispiele (zum Beispiel, Studien zeigen …)", ok: count(text, DE_BELEG) >= 2, weight: 2 };
    case "opinion_last": {
      const m = DE_OPINION.exec(text);
      const late = !!m && m.index >= text.length * 0.6;
      return { id, label: "Eigene Meinung erst im Schluss", ok: late, weight: 1, detail: !m ? "Keine Meinung erkennbar (meiner Meinung nach, ich finde …)." : !late ? "Die Meinung steht zu früh — erst darstellen, dann werten." : undefined };
    }
    case "standard_language": {
      const m = DE_UMGANGSSPRACHE.exec(text);
      return { id, label: "Standardsprache, keine Umgangssprache", ok: !m, weight: 1, detail: m ? `„${m[0]}“ ist Umgangssprache.` : undefined };
    }
    case "register": {
      if (!register) return null;
      const bad = register === "formal" ? EN_INFORMAL_OPEN.test(text) || EN_INFORMAL_CLOSE.test(text) : EN_FORMAL_OPEN.test(text) || EN_FORMAL_CLOSE.test(text);
      return { id, label: register === "formal" ? "Formeller Ton (Dear Mr …, Yours sincerely)" : "Lockerer Ton (Hi …, See you)", ok: !bad, weight: 1, detail: bad ? "Anrede oder Schluss passen nicht zum Adressaten." : undefined };
    }
    default:
      return null;
  }
}

function keywordHit(text: string, keyword: string): boolean {
  const k = keyword.trim().toLowerCase();
  if (!k) return false;
  return text.toLowerCase().includes(k);
}

export function evaluateWrite(question: RenderedQuestion, userAnswer: unknown): Evaluation {
  const p = question.payload as WritePayload;
  const sol = question.solution as { model?: string; model_fields?: Record<string, string> };

  if (p.form === "schreibplan") {
    const fields = p.fields ?? [];
    const user = (userAnswer && typeof userAnswer === "object" ? userAnswer : {}) as Record<string, string>;
    // A cell counts when it holds a real Stichpunkt ("Hohes Unfallrisiko", "Datenschutz"), not "ja" or "…".
    const checks: WriteCheck[] = fields.map((f) => {
      const v = (user[f.id] ?? "").trim();
      const ok = v.replace(/[^\p{L}\p{N}]/gu, "").length >= 6;
      return { id: f.id, label: f.label, ok, weight: 1, detail: v && !ok ? "Zu knapp — ein echter Stichpunkt." : undefined };
    });
    const passed = checks.filter((c) => c.ok).length;
    const score = fields.length ? passed / fields.length : 0;
    const model = sol.model_fields ?? {};
    const modelText = fields.map((f) => `${f.label}: ${model[f.id] ?? "–"}`).join("\n");
    return {
      isCorrect: score >= WRITE_PASS_RATIO,
      correctAnswer: model,
      correctAnswerText: modelText,
      normalizedAnswer: JSON.stringify(user),
      hint: `${passed} von ${fields.length} Feldern ausgefüllt — in der Prüfung gibt es 1 Punkt pro Feld.`,
      checks,
      score,
    };
  }

  const text = typeof userAnswer === "string" ? userAnswer : "";
  const checks: WriteCheck[] = [];
  const words = countWords(text);
  const min = p.min_words ?? 0;
  const max = p.max_words;
  const lengthOk = words >= min && (max === undefined || words <= max);
  const range = max !== undefined ? `${min}–${max}` : `mindestens ${min}`;
  checks.push({ id: "words", label: `Wortzahl (${range} Wörter)`, ok: lengthOk, weight: 1, detail: `${words} Wörter` });

  for (const cp of p.content_points ?? []) {
    checks.push({ id: `cp:${cp.label}`, label: cp.label, ok: cp.keywords.some((k) => keywordHit(text, k)), weight: 2 });
  }
  for (const id of p.required ?? []) {
    const c = requirementCheck(id, text, p.register);
    if (c) checks.push(c);
  }
  if (p.register) {
    const c = requirementCheck("register", text, p.register);
    if (c) checks.push(c);
  }
  if (question.subject === "EN") {
    for (const [re, msg] of GERMANISMS) if (re.test(text)) checks.push({ id: `lang:${msg}`, label: msg, ok: false, weight: 0 });
  } else if (question.subject === "DE" && !(p.required ?? []).includes("standard_language")) {
    const m = DE_UMGANGSSPRACHE.exec(text);
    if (m) checks.push({ id: "lang:umgangssprache", label: `„${m[0]}“ ist Umgangssprache — Standardsprache verwenden.`, ok: false, weight: 0 });
  }

  const scored = checks.filter((c) => c.weight > 0);
  const total = scored.reduce((s, c) => s + c.weight, 0);
  const got = scored.filter((c) => c.ok).reduce((s, c) => s + c.weight, 0);
  const score = total ? got / total : 0;
  const isCorrect = lengthOk && score >= WRITE_PASS_RATIO;
  const model = sol.model ?? "";
  return {
    isCorrect,
    correctAnswer: model,
    correctAnswerText: model,
    normalizedAnswer: text.trim(),
    hint: `Inhalt und Aufbau: ${scored.filter((c) => c.ok).length} von ${scored.length} Punkten erfüllt. Sprache prüfst du selbst mit der Musterlösung.`,
    checks,
    score,
  };
}
