/**
 * Repair mode — docs/ALGORITHM.md §4.
 * After a wrong answer: 2 same-topic questions (difficulty ≤ current), then 1 transfer
 * question from the parent's subtree (siblings), difficulty ≥ current. Correct transfer exits;
 * wrong transfer restarts one difficulty lower.
 */

import { REPAIR_SAME_TOPIC_COUNT } from "./constants";
import type { ContentIndex } from "./contentIndex";
import type { Rng } from "./rng";
import type { Question, RepairQueue } from "./types";

export function activateRepair(index: ContentIndex, topicId: string, currentDifficulty: number): RepairQueue {
  const topic = index.topicById(topicId);
  const transferTopicId = topic?.parentId ?? topicId;
  return {
    topicId,
    currentDifficulty,
    sameTopicRemaining: REPAIR_SAME_TOPIC_COUNT,
    transferPending: true,
    transferTopicId,
  };
}

export function isTransferQuestion(queue: RepairQueue): boolean {
  return queue.sameTopicRemaining === 0 && queue.transferPending;
}

export function onRepairAnswer(queue: RepairQueue, isCorrect: boolean, wasTransfer: boolean): { queue: RepairQueue; exit: boolean } {
  if (wasTransfer) {
    if (isCorrect) return { queue, exit: true };
    return {
      queue: { ...queue, currentDifficulty: Math.max(1, queue.currentDifficulty - 1), sameTopicRemaining: REPAIR_SAME_TOPIC_COUNT, transferPending: true },
      exit: false,
    };
  }
  return { queue: { ...queue, sameTopicRemaining: queue.sameTopicRemaining - 1 }, exit: false };
}

function pick(pool: Question[], rng: Rng, avoid: ReadonlySet<string>): Question | undefined {
  if (pool.length === 0) return undefined;
  const fresh = pool.filter((q) => !avoid.has(q.id));
  return rng.choice(fresh.length ? fresh : pool);
}

/** Next repair question, or undefined when the topic has no questions at all. */
export function nextRepairQuestion(index: ContentIndex, queue: RepairQueue, rng: Rng, avoid: ReadonlySet<string> = new Set()): Question | undefined {
  if (queue.sameTopicRemaining > 0) {
    const easy = index.questionsByDifficulty(queue.topicId, 1, queue.currentDifficulty);
    return pick(easy.length ? easy : index.questionsOf(queue.topicId), rng, avoid);
  }
  if (queue.transferPending) {
    const maxDiff = Math.min(5, queue.currentDifficulty + 1);
    const notSameTopic = (q: Question) => q.topicId !== queue.topicId;
    // 1) siblings/parent subtree at difficulty ≥ current
    let pool = index.questionsByDifficulty(queue.transferTopicId, queue.currentDifficulty, maxDiff, true).filter(notSameTopic);
    // 2) siblings/parent subtree, any difficulty
    if (pool.length === 0) pool = index.questionsInSubtree(queue.transferTopicId).filter(notSameTopic);
    // 3) same topic, difficulty ≥ current
    if (pool.length === 0) pool = index.questionsByDifficulty(queue.topicId, queue.currentDifficulty, maxDiff);
    // 4) anything in the topic
    if (pool.length === 0) pool = index.questionsOf(queue.topicId);
    return pick(pool, rng, avoid);
  }
  return undefined;
}
