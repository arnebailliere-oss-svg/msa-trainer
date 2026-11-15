/**
 * Progress store — synchronous in-memory state (mastery, attempts, variant counters)
 * with change notifications so a persistence adapter can write through.
 */

import { ERROR_RATE_RECENT_ATTEMPTS } from "./constants";
import type { Attempt, MasteryState, Subject, TrainingMode } from "./types";

export interface ProgressSnapshot {
  mastery: MasteryState[];
  attempts: Attempt[];
  counters: Record<string, number>;
  /** Completed Eulen-Lektionen: "userId|primerId" → ISO date. */
  primers?: Record<string, string>;
  /** Where a student stopped inside an Eulen-Lektion: "userId|primerId" → board index. */
  primerPos?: Record<string, number>;
}

export interface ProgressStore {
  getMastery(userId: string, topicId: string): MasteryState | undefined;
  allMastery(userId: string): MasteryState[];
  upsertMastery(state: MasteryState): void;
  addAttempt(attempt: Attempt): void;
  /** Newest first. */
  attempts(userId: string, topicId?: string, limit?: number): Attempt[];
  errorRate(userId: string, topicId: string, recent?: number): number;
  nextCounter(userId: string, subject: Subject, topicId: string, mode: TrainingMode, dateKey: string): number;
  primerDone(userId: string, primerId: string): boolean;
  primersDone(userId: string): string[];
  markPrimerDone(userId: string, primerId: string): void;
  /** Board index the student last saw (0 = not started). */
  primerPos(userId: string, primerId: string): number;
  setPrimerPos(userId: string, primerId: string, step: number): void;
  snapshot(): ProgressSnapshot;
}

export function counterKey(userId: string, subject: Subject, topicId: string, mode: TrainingMode, dateKey: string): string {
  return [userId, subject, topicId, mode, dateKey].join("|");
}

export class InMemoryProgressStore implements ProgressStore {
  private mastery = new Map<string, MasteryState>();
  private attemptList: Attempt[] = [];
  private counters = new Map<string, number>();
  private primers = new Map<string, string>();
  private primerPosMap = new Map<string, number>();

  constructor(
    initial?: Partial<ProgressSnapshot>,
    private onChange: (kind: "mastery" | "attempt" | "counter" | "primer", payload: unknown) => void = () => {},
  ) {
    for (const m of initial?.mastery ?? []) this.mastery.set(`${m.userId}|${m.topicId}`, m);
    this.attemptList = [...(initial?.attempts ?? [])].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    for (const [k, v] of Object.entries(initial?.counters ?? {})) this.counters.set(k, v);
    for (const [k, v] of Object.entries(initial?.primers ?? {})) this.primers.set(k, v);
    for (const [k, v] of Object.entries(initial?.primerPos ?? {})) this.primerPosMap.set(k, v);
  }

  primerDone(userId: string, primerId: string): boolean {
    return this.primers.has(`${userId}|${primerId}`);
  }

  primersDone(userId: string): string[] {
    return [...this.primers.keys()].filter((k) => k.startsWith(`${userId}|`)).map((k) => k.slice(userId.length + 1));
  }

  markPrimerDone(userId: string, primerId: string): void {
    const key = `${userId}|${primerId}`;
    this.primers.set(key, new Date().toISOString());
    this.onChange("primer", { key });
  }

  primerPos(userId: string, primerId: string): number {
    return this.primerPosMap.get(`${userId}|${primerId}`) ?? 0;
  }

  setPrimerPos(userId: string, primerId: string, step: number): void {
    const key = `${userId}|${primerId}`;
    if ((this.primerPosMap.get(key) ?? 0) === step) return;
    if (step <= 0) this.primerPosMap.delete(key);
    else this.primerPosMap.set(key, step);
    this.onChange("primer", { key, step });
  }

  getMastery(userId: string, topicId: string): MasteryState | undefined {
    return this.mastery.get(`${userId}|${topicId}`);
  }

  allMastery(userId: string): MasteryState[] {
    return [...this.mastery.values()].filter((m) => m.userId === userId);
  }

  upsertMastery(state: MasteryState): void {
    this.mastery.set(`${state.userId}|${state.topicId}`, state);
    this.onChange("mastery", state);
  }

  addAttempt(attempt: Attempt): void {
    this.attemptList.push(attempt);
    this.onChange("attempt", attempt);
  }

  attempts(userId: string, topicId?: string, limit = 50): Attempt[] {
    const out: Attempt[] = [];
    for (let i = this.attemptList.length - 1; i >= 0 && out.length < limit; i--) {
      const a = this.attemptList[i]!;
      if (a.userId === userId && (!topicId || a.topicId === topicId)) out.push(a);
    }
    return out;
  }

  errorRate(userId: string, topicId: string, recent = ERROR_RATE_RECENT_ATTEMPTS): number {
    const list = this.attempts(userId, topicId, recent);
    if (list.length === 0) return 0;
    return list.filter((a) => !a.isCorrect).length / list.length;
  }

  nextCounter(userId: string, subject: Subject, topicId: string, mode: TrainingMode, dateKey: string): number {
    const key = counterKey(userId, subject, topicId, mode, dateKey);
    const value = this.counters.get(key) ?? 0;
    this.counters.set(key, value + 1);
    this.onChange("counter", { key, value: value + 1 });
    return value;
  }

  snapshot(): ProgressSnapshot {
    return {
      mastery: [...this.mastery.values()],
      attempts: [...this.attemptList],
      counters: Object.fromEntries(this.counters),
      primers: Object.fromEntries(this.primers),
      primerPos: Object.fromEntries(this.primerPosMap),
    };
  }
}
