/**
 * What is free and what needs the full version. One place decides; every screen asks here.
 *
 * Free taste, per subject:
 *   - the first Eulen-Lektion, complete
 *   - the first topic with tasks: its page, its Spickzettel and topic training, as often as wanted
 *   - calculator, Formelblatt, help and the progress page
 * Everything else is shown with a lock.
 */

import type { ContentIndex } from "./contentIndex";
import type { Subject, TrainingMode } from "./types";

/** Which subjects are unlocked on this device. */
export interface Access {
  has(subject: Subject): boolean;
}

export const fullAccess: Access = { has: () => true };
export const accessTo = (subjects: readonly Subject[]): Access => ({ has: (s) => subjects.includes(s) });

export const freePrimerId = (index: ContentIndex, subject: Subject): string | undefined => index.primers.find((p) => p.subject === subject)?.id;
export const freeTopicId = (index: ContentIndex, subject: Subject): string | undefined => index.practicableTopics(subject)[0]?.id;

export function primerOpen(access: Access, index: ContentIndex, primerId: string): boolean {
  const p = index.primerById(primerId);
  if (!p) return true; // an unknown lesson shows its own "not found" page
  return access.has(p.subject) || freePrimerId(index, p.subject) === p.id;
}

export function topicOpen(access: Access, index: ContentIndex, topicId: string): boolean {
  const t = index.topicById(topicId);
  if (!t) return true;
  return access.has(t.subject) || freeTopicId(index, t.subject) === t.id;
}

/** Topic training on the free topic is open; daily plan, quick, error and exam training need the full version. */
export function sessionOpen(access: Access, index: ContentIndex, subject: Subject, mode: TrainingMode, topicId?: string): boolean {
  if (access.has(subject)) return true;
  return mode === "TOPIC" && !!topicId && freeTopicId(index, subject) === topicId;
}
