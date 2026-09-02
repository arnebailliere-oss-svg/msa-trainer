/**
 * Core domain types — mirror of the legacy Python `core/models.py` + `enums.py`,
 * extended for schema v2 (structured explanations, templates, lessons).
 */

export type Subject = "MATH" | "DE" | "EN";
export type QuestionType = "MCQ" | "CLOZE" | "MATCH" | "SHORT";
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
  | { type: "choice"; values: (string | number)[] };

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
    | "text";
  title?: string;
  /** Rich text: paragraphs, "- " bullets, **bold**, $inline$ and $$display$$ math, {{templates}}. */
  body: string;
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

export type Payload = McqPayload | ShortPayload | ClozePayload | MatchPayload;

/** Solutions — either literal or computed from template variables. */
export type Solution =
  | { correct_choice: string } // MCQ (legacy shape, kept)
  | { value: number | string } // SHORT literal
  | { kind: "computed"; expr: string; round?: number; tolerance?: number } // SHORT computed
  | { answers: Record<string, string> } // CLOZE
  | { pairs: [string, string][] }; // MATCH

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
  /** Inline SVG (data) for diagrams — no page scans. */
  figure?: string;
}

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
}

export interface SessionStats {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  totalTimeMs: number;
  topicsPracticed: string[];
  strengthenedTopics: string[];
  weakTopics: string[];
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
}
