/**
 * Session controller — orchestrates selection, variants, evaluation, mastery and repair mode.
 * Rules: repair mode overrides selection; attempt is persisted before mastery is updated.
 */

import { AVOID_RECENT_QUESTIONS } from "./constants";
import type { ContentIndex } from "./contentIndex";
import { evaluate } from "./evaluators";
import { ampelFor, computeAmpel, newMasteryState, updateMastery } from "./mastery";
import type { ProgressStore } from "./progress";
import { randomRng, type Rng } from "./rng";
import { activateRepair, isTransferQuestion, nextRepairQuestion, onRepairAnswer } from "./repair";
import { selectDifficulty, selectTopics } from "./selection";
import type { Attempt, AttemptResult, Question, RenderedQuestion, RepairQueue, SessionStats, Subject, TrainingMode } from "./types";
import { renderVariant, todayKey } from "./variants";

export type SessionState = "IDLE" | "QUESTION" | "FEEDBACK" | "COMPLETED";

export interface SessionConfig {
  userId: string;
  subject: Subject;
  mode: TrainingMode;
  /** Fixed topic for TOPIC mode (subtree allowed). */
  topicId?: string;
  questionCount: number;
  index: ContentIndex;
  store: ProgressStore;
  rng?: Rng;
  now?: () => Date;
  /** Exam mode: no repair loop, difficulty floor. */
  minDifficulty?: number;
}

export class SessionController {
  private readonly rng: Rng;
  private readonly now: () => Date;
  private state: SessionState = "IDLE";
  private current: RenderedQuestion | null = null;
  private questionStart = 0;
  private repair: RepairQueue | null = null;
  private answered = 0;
  private correct = 0;
  private totalTimeMs = 0;
  private topicsPracticed = new Set<string>();
  private asked: string[] = [];
  private lastResult: AttemptResult | null = null;

  constructor(private readonly cfg: SessionConfig) {
    this.rng = cfg.rng ?? randomRng();
    this.now = cfg.now ?? (() => new Date());
  }

  get sessionState(): SessionState {
    return this.state;
  }
  get currentQuestion(): RenderedQuestion | null {
    return this.current;
  }
  get progress(): { answered: number; total: number } {
    return { answered: this.answered, total: this.cfg.questionCount };
  }
  get inRepairMode(): boolean {
    return this.repair !== null;
  }
  get repairQueue(): RepairQueue | null {
    return this.repair;
  }
  get result(): AttemptResult | null {
    return this.lastResult;
  }

  start(): RenderedQuestion | null {
    this.state = "QUESTION";
    return this.selectNext();
  }

  submit(userAnswer: unknown): AttemptResult | null {
    if (this.state !== "QUESTION" || !this.current) return null;
    const q = this.current;
    const now = this.now();
    const responseTimeMs = Math.max(0, now.getTime() - this.questionStart);
    const evaluation = evaluate(q, userAnswer);

    // Persist attempt first, then mastery (ALGORITHM.md §9).
    const attempt: Attempt = {
      id: `${now.getTime().toString(36)}-${Math.floor(this.rng.next() * 1e9).toString(36)}`,
      userId: this.cfg.userId,
      questionId: q.baseQuestionId,
      variantId: q.variantId,
      topicId: q.topicId,
      subject: q.subject,
      isCorrect: evaluation.isCorrect,
      responseTimeMs,
      userAnswer: evaluation.normalizedAnswer,
      vars: q.vars,
      createdAt: now.toISOString(),
    };
    this.cfg.store.addAttempt(attempt);

    const before = this.cfg.store.getMastery(this.cfg.userId, q.topicId) ?? newMasteryState(this.cfg.userId, q.topicId);
    const after = updateMastery(before, evaluation.isCorrect, q.difficulty, responseTimeMs, now);
    this.cfg.store.upsertMastery(after);

    this.answered += 1;
    this.totalTimeMs += responseTimeMs;
    this.topicsPracticed.add(q.topicId);
    if (evaluation.isCorrect) this.correct += 1;

    if (this.cfg.mode !== "MSA") {
      if (this.repair) {
        const wasTransfer = isTransferQuestion(this.repair);
        const { queue, exit } = onRepairAnswer(this.repair, evaluation.isCorrect, wasTransfer);
        this.repair = exit ? null : queue;
      } else if (!evaluation.isCorrect) {
        this.repair = activateRepair(this.cfg.index, q.topicId, q.difficulty);
      }
    }

    this.state = "FEEDBACK";
    this.lastResult = {
      isCorrect: evaluation.isCorrect,
      correctAnswer: evaluation.correctAnswer,
      correctAnswerText: evaluation.correctAnswerText,
      explanation: q.explanation,
      masteryDelta: after.masteryScore - before.masteryScore,
      newMasteryScore: after.masteryScore,
      ampel: computeAmpel(after.masteryScore, after.stability),
      hint: evaluation.hint,
      inRepairMode: this.repair !== null,
    };
    return this.lastResult;
  }

  next(): RenderedQuestion | null {
    if (this.state !== "FEEDBACK") return this.current;
    if (this.answered >= this.cfg.questionCount && !this.repair) {
      this.state = "COMPLETED";
      this.current = null;
      return null;
    }
    // Hard cap so a repair loop cannot run forever.
    if (this.answered >= this.cfg.questionCount * 2) {
      this.state = "COMPLETED";
      this.current = null;
      return null;
    }
    this.state = "QUESTION";
    return this.selectNext();
  }

  finish(): SessionStats {
    this.state = "COMPLETED";
    return this.stats();
  }

  stats(): SessionStats {
    const strengthened: string[] = [];
    const weak: string[] = [];
    for (const topicId of this.topicsPracticed) {
      const ampel = ampelFor(this.cfg.store.getMastery(this.cfg.userId, topicId));
      if (ampel === "GREEN") strengthened.push(topicId);
      else if (ampel === "RED") weak.push(topicId);
    }
    return {
      totalQuestions: this.answered,
      correctCount: this.correct,
      incorrectCount: this.answered - this.correct,
      totalTimeMs: this.totalTimeMs,
      topicsPracticed: [...this.topicsPracticed],
      strengthenedTopics: strengthened,
      weakTopics: weak,
    };
  }

  // --- selection ------------------------------------------------------------

  private selectNext(): RenderedQuestion | null {
    const avoid = new Set(this.asked.slice(-AVOID_RECENT_QUESTIONS));
    let question: Question | undefined;
    if (this.repair) question = nextRepairQuestion(this.cfg.index, this.repair, this.rng, avoid);
    if (!question) question = this.selectNormal(avoid);
    if (!question) {
      this.state = "COMPLETED";
      this.current = null;
      return null;
    }
    const dateKey = todayKey(this.now());
    const counter = this.cfg.store.nextCounter(this.cfg.userId, question.subject, question.topicId, this.cfg.mode, dateKey);
    const rendered = renderVariant(question, { userId: this.cfg.userId, mode: this.cfg.mode, dateKey, counter });
    this.asked.push(question.id);
    this.current = rendered;
    this.questionStart = this.now().getTime();
    return rendered;
  }

  private selectNormal(avoid: ReadonlySet<string>): Question | undefined {
    const { index, store, userId, subject, mode } = this.cfg;
    let pool: Question[] = [];
    let topicId: string | undefined;

    if (mode === "TOPIC" && this.cfg.topicId) {
      topicId = this.cfg.topicId;
      const mastery = store.getMastery(userId, topicId);
      const [min, max] = selectDifficulty(mastery?.masteryScore ?? 0);
      pool = index.questionsByDifficulty(topicId, min, max, true);
      if (pool.length === 0) pool = index.questionsInSubtree(topicId);
    } else if (mode === "MSA") {
      const floor = this.cfg.minDifficulty ?? 3;
      pool = index.questionsBySubject(subject).filter((q) => q.difficulty >= floor);
      if (pool.length === 0) pool = index.questionsBySubject(subject);
    } else {
      const topics = selectTopics(index, store, userId, subject, mode, 5, this.rng, this.now());
      if (topics.length === 0) return undefined;
      topicId = this.rng.choice(topics);
      const mastery = store.getMastery(userId, topicId);
      const [min, max] = selectDifficulty(mastery?.masteryScore ?? 0);
      pool = index.questionsByDifficulty(topicId, min, max);
      if (pool.length === 0) pool = index.questionsOf(topicId);
    }
    if (pool.length === 0) return undefined;
    const fresh = pool.filter((q) => !avoid.has(q.id));
    return this.rng.choice(fresh.length ? fresh : pool);
  }
}
