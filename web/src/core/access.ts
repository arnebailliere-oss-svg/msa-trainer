/**
 * What is free and what needs the full version. One place decides; every screen asks here.
 *
 * Free taste, per subject:
 *   - the first three Eulen-Lektionen, complete
 *   - the first three topics with tasks: their pages, their Spickzettel and topic training, as often as wanted
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

/** How much of each subject is free. Enough to spend real time in the product before buying. */
export const FREE_PRIMERS = 3;
export const FREE_TOPICS = 3;

export const freePrimerIds = (index: ContentIndex, subject: Subject): string[] =>
  index.primers
    .filter((p) => p.subject === subject)
    .slice(0, FREE_PRIMERS)
    .map((p) => p.id);
export const freeTopicIds = (index: ContentIndex, subject: Subject): string[] =>
  index
    .practicableTopics(subject)
    .slice(0, FREE_TOPICS)
    .map((t) => t.id);

export function primerOpen(access: Access, index: ContentIndex, primerId: string): boolean {
  const p = index.primerById(primerId);
  if (!p) return true; // an unknown lesson shows its own "not found" page
  return access.has(p.subject) || freePrimerIds(index, p.subject).includes(p.id);
}

export function topicOpen(access: Access, index: ContentIndex, topicId: string): boolean {
  const t = index.topicById(topicId);
  if (!t) return true;
  return access.has(t.subject) || freeTopicIds(index, t.subject).includes(t.id);
}

/** Topic training on a free topic is open; daily plan, quick, error and exam training need the full version. */
export function sessionOpen(access: Access, index: ContentIndex, subject: Subject, mode: TrainingMode, topicId?: string): boolean {
  if (access.has(subject)) return true;
  return mode === "TOPIC" && !!topicId && freeTopicIds(index, subject).includes(topicId);
}
