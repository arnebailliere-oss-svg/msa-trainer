/**
 * Core domain types — mirror of the legacy Python `core/models.py` + `enums.py`,
 * extended for schema v2 (structured explanations, templates, lessons).
 */

export type Subject = "MATH" | "DE" | "EN";
export type QuestionType = "MCQ" | "CLOZE" | "MATCH" | "SHORT" | "WRITE";
export type TrainingMode = "QUICK" | "TOPIC" | "ERRORS" | "MSA";
export type AmpelState = "RED" | "YELLOW" | "GREEN";

export const SUBJECTS: readonly Subject[] = ["MATH", "DE", "EN"];

export interface Topic {
  id: string;
  subject: Subject;
  code: string;
  name: string;
  parentId: string | null;
}

/** A variable in a question template. */
export type VariableSpec =
  | { type: "int"; min: number; max: number; step?: number }
  | { type: "float"; min: number; max: number; step: number }
  | { type: "choice"; values: (string | number)[] }
  /**
   * Pick one record from a bank (language drills): the record's fields become `<name>_<field>`
   * and `<name>` holds the record index (usable in constraints, e.g. `s != t`).
   */
  | { type: "pick"; from: Record<string, string | number>[] };

/** Template spec attached to a question (`variants` in JSON). */
export interface VariantSpec {
  enabled: boolean;
  variables: Record<string, VariableSpec>;
  /** Expressions evaluated in order after sampling; result stored under the key. */
  derived?: Record<string, string>;
  /** Boolean expressions that must all be truthy; otherwise resample. */
  constraints?: string[];
}

/** One block of a structured explanation or lesson. */
export interface ContentSection {
  kind:
    | "what" // Was ist das?
    | "terms" // Begriffe
    | "formula" // Formel / Regel
    | "steps" // Rechnung
    | "mistake" // Typischer Fehler
    | "remember" // Merke
    | "answer" // Antwort
    | "example" // Beispiel (lessons)
    | "widget" // interactive explorer (lessons); body = widget id
    | "text";
  title?: string;
  /** Rich text: paragraphs, "- " bullets, **bold**, $inline$ and $$display$$ math, {{templates}}. */
  body: string;
  /** Optional generated figure shown under the body (specs may contain templates). */
  figure?: FigureSpec;
  /** Rendered SVG of `figure` (filled in when a question/lesson is rendered). */
  figureSvg?: string;
  /** Gallery of small labelled figures (lessons): one drawing per shape/formula mentioned in the body. */
  figures?: { caption?: string; figure: FigureSpec }[];
  /** Eulen-Lektion ("Frag Ferdinand") that explains this section's basics from scratch. */
  primer?: string;
}

/** One chalkboard of an Eulen-Lektion: one idea, a few chalk lines, optionally a figure. */
export interface PrimerStep {
  title: string;
  body: string;
  figure?: FigureSpec;
  /** What Ferdinand says while this board is shown. */
  say?: string;
}

export interface PrimerVocab {
  term: string;
  plain: string;
  example?: string;
}

export interface PrimerQuizItem {
  prompt: string;
  choices: string[];
  correct: string;
  explain: string;
}

/**
 * Eulen-Lektion ("Frag Ferdinand"): a pre-lesson that assumes nothing. Ferdinand the owl
 * explains words, symbols and ideas board by board, then checks with a mini quiz.
 */
export interface Primer {
  id: string;
  subject: Subject;
  title: string;
  /** One line for badges and the index. */
  teaser: string;
  /** Ferdinand's opening line. */
  hook: string;
  /** Ferdinand's closing line after a passed quiz. */
  outro?: string;
  steps: PrimerStep[];
  vocab: PrimerVocab[];
  quiz: PrimerQuizItem[];
  source?: string;
}

export type Explanation = string | ContentSection[];

/** MCQ payload. `choices` may contain template placeholders. */
export interface McqPayload {
  choices: string[];
  shuffle?: boolean;
}

export type ShortAnswerType = "number" | "text" | "fraction" | "term";

export interface ShortPayload {
  answer_type: ShortAnswerType;
  normalization?: string[];
  tolerance?: number;
  /** For fractions: reject unreduced input like 6/8 for 3/4. */
  require_reduced?: boolean;
  /** For fractions: numerator and denominator must match exactly (e.g. "erweitere" tasks). */
  exact?: boolean;
  /** For terms: an equivalent but longer term (not fully simplified) is rejected with a hint. */
  require_simplified?: boolean;
  /** Unit label shown after the input, e.g. "cm²". */
  unit?: string;
}

export interface ClozeBlank {
  id: number | string;
  choices?: string[];
}

export interface ClozePayload {
  text_with_blanks: string;
  blanks: ClozeBlank[];
}

export interface MatchPayload {
  left: string[];
  right: string[];
}

/** One content point of a writing task: earned when any keyword occurs in the text. */
export interface WriteContentPoint {
  label: string;
  /** Case-insensitive alternatives; one hit is enough (`"Impf"`, `"vaccin"`). */
  keywords: string[];
}

/** One cell of a Schreibplan (Gliederungsraster). */
export interface WriteField {
  id: string;
  label: string;
  hint?: string;
}

/**
 * Rule-checkable requirements of a text form. Ids: greeting, closing, subject, sentences,
 * `paragraphs:N`, both_sides, transitions, belege, opinion_last, standard_language.
 */
export type WriteRequirement = string;

/**
 * WRITE payload — a free text (e-mail, blog reply, photo answer, mediation, Erörterung) or a
 * Schreibplan grid. Inhalt and Aufbau are checked by rules (content points, required elements,
 * word count); Sprache is *not* graded — the student compares with the Musterlösung.
 */
export interface WritePayload {
  form: "email" | "blog" | "photo" | "mediation" | "eroerterung" | "schreibplan";
  min_words?: number;
  max_words?: number;
  content_points?: WriteContentPoint[];
  required?: WriteRequirement[];
  /** Expected register of an e-mail; mismatched greetings/closings are flagged. */
  register?: "formal" | "informal";
  /** Schreibplan cells (form "schreibplan"); the answer is a map id → text. */
  fields?: WriteField[];
}

export type Payload = McqPayload | ShortPayload | ClozePayload | MatchPayload | WritePayload;

/** Solutions — either literal or computed from template variables. */
export type Solution =
  | { correct_choice: string } // MCQ (legacy shape, kept)
  | { value: number | string } // SHORT literal
  | { kind: "computed"; expr: string; round?: number; tolerance?: number } // SHORT computed
  | { answers: Record<string, string> } // CLOZE
  | { pairs: [string, string][] } // MATCH
  | { model: string } // WRITE text: the Musterlösung
  | { model_fields: Record<string, string> }; // WRITE schreibplan: one entry per field

/** One rule check of a writing task. `weight` 0 = language hint, shown but not scored. */
export interface WriteCheck {
  id: string;
  label: string;
  ok: boolean;
  weight: number;
  detail?: string;
}

export interface Question {
  id: string;
  subject: Subject;
  topicId: string;
  difficulty: number; // 1..5
  qtype: QuestionType;
  prompt: string;
  payload: Payload;
  solution: Solution;
  explanation: Explanation;
  tags: string[];
  variants?: VariantSpec;
  /** Attribution, e.g. "MSA 2023 Aufgabe 2" or "iMINT Prozentrechnung Karte 5" */
  source?: string;
  /** Figure: inline SVG string, or a generated-figure spec (see core/figures.ts) whose values may be templates. */
  figure?: string | FigureSpec;
  /** Shared reading text (exam article, sign collection); rendered once above the question, see `Passage`. */
  passage?: string;
}

/** A shared text several questions refer to, like the article of an exam reading task. */
export interface Passage {
  id: string;
  subject: Subject;
  title: string;
  /** Rich text (MathText markup); numbered paragraphs help students cite. */
  body: string;
  source?: string;
}

export type FigureSpec = { type: string } & Record<string, unknown>;

/** A concrete, fully rendered question instance. */
export interface RenderedQuestion {
  baseQuestionId: string;
  variantId: string;
  subject: Subject;
  topicId: string;
  difficulty: number;
  qtype: QuestionType;
  prompt: string;
  payload: Payload;
  solution: Solution;
  explanation: ContentSection[];
  vars: Record<string, number | string>;
  source?: string;
  figure?: string;
  tags?: string[];
  passage?: string;
}

export interface Lesson {
  id: string;
  subject: Subject;
  topicId: string;
  /** Additional topics this lesson also serves as the primary lesson for. */
  alsoFor?: string[];
  title: string;
  /** Short motivating intro (why this matters for the MSA). */
  intro?: string;
  sections: ContentSection[];
  source?: string;
  /** Eulen-Lektion recommended before this lesson ("Grundlagen zuerst"). */
  primer?: string;
}

export interface Profile {
  id: string;
  name: string;
  emoji: string;
  createdAt: string; // ISO
}

export interface MasteryState {
  userId: string;
  topicId: string;
  masteryScore: number; // 0..1
  stability: number; // 0..1
  lastPracticedAt: string | null; // ISO
  attempts: number;
}

export interface Attempt {
  id: string;
  userId: string;
  questionId: string;
  variantId: string;
  topicId: string;
  subject: Subject;
  isCorrect: boolean;
  responseTimeMs: number;
  userAnswer: string;
  vars: Record<string, number | string>;
  createdAt: string; // ISO
}

export interface AttemptResult {
  isCorrect: boolean;
  correctAnswer: unknown;
  correctAnswerText: string;
  explanation: ContentSection[];
  masteryDelta: number;
  newMasteryScore: number;
  ampel: AmpelState;
  /** Optional evaluator hint, e.g. "Der Bruch ist noch nicht gekürzt." */
  hint?: string;
  inRepairMode: boolean;
  /** WRITE only: the rule checks (Inhalt, Aufbau, Sprache-Hinweise) behind the verdict. */
  checks?: WriteCheck[];
  /** WRITE only: share of scored checks passed, 0..1. */
  score?: number;
}

/** One answered question, for the per-task summary at the end of a session. */
export interface SessionItem {
  questionId: string;
  topicId: string;
  prompt: string;
  difficulty: number;
  isCorrect: boolean;
  responseTimeMs: number;
  userAnswer: string;
  correctAnswerText: string;
  source?: string;
  inRepair: boolean;
}

export interface SessionStats {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  totalTimeMs: number;
  topicsPracticed: string[];
  strengthenedTopics: string[];
  weakTopics: string[];
  items: SessionItem[];
}

export interface RepairQueue {
  topicId: string;
  currentDifficulty: number;
  sameTopicRemaining: number;
  transferPending: boolean;
  transferTopicId: string;
}

export interface ContentPack {
  packId: string;
  version: string;
  title: string;
  topics: Topic[];
  questions: Question[];
  lessons: Lesson[];
  primers?: Primer[];
  passages?: Passage[];
}
