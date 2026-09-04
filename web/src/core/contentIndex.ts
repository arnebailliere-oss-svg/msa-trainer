/** In-memory index over a content pack: topic tree, questions, lessons. */

import type { ContentPack, Lesson, Passage, Primer, Question, Subject, Topic } from "./types";

export interface ContentIndex {
  pack: ContentPack;
  topics: Topic[];
  topicById(id: string): Topic | undefined;
  topicsBySubject(subject: Subject): Topic[];
  /** Topics that have at least one question (directly). */
  practicableTopics(subject: Subject): Topic[];
  childrenOf(topicId: string): Topic[];
  /** All descendant topic ids including the topic itself. */
  subtreeIds(topicId: string): string[];
  /** Questions directly attached to the topic. */
  questionsOf(topicId: string): Question[];
  /** Questions of the topic and all descendants. */
  questionsInSubtree(topicId: string): Question[];
  questionsByDifficulty(topicId: string, min: number, max: number, subtree?: boolean): Question[];
  questionsBySubject(subject: Subject): Question[];
  questionById(id: string): Question | undefined;
  lessonsOf(topicId: string): Lesson[];
  lessonById(id: string): Lesson | undefined;
  /** Nearest lesson walking up the topic tree. */
  lessonFor(topicId: string): Lesson | undefined;
  /** Eulen-Lektionen ("Frag Ferdinand"). */
  primers: Primer[];
  primerById(id: string): Primer | undefined;
  passageById(id: string): Passage | undefined;
}

export function buildContentIndex(pack: ContentPack): ContentIndex {
  const topicMap = new Map(pack.topics.map((t) => [t.id, t]));
  const children = new Map<string, Topic[]>();
  for (const t of pack.topics) {
    if (t.parentId) {
      const list = children.get(t.parentId) ?? [];
      list.push(t);
      children.set(t.parentId, list);
    }
  }
  const byTopic = new Map<string, Question[]>();
  for (const q of pack.questions) {
    const list = byTopic.get(q.topicId) ?? [];
    list.push(q);
    byTopic.set(q.topicId, list);
  }
  const questionMap = new Map(pack.questions.map((q) => [q.id, q]));
  const lessonsByTopic = new Map<string, Lesson[]>();
  for (const l of pack.lessons) {
    for (const tid of [l.topicId, ...(l.alsoFor ?? [])]) {
      const list = lessonsByTopic.get(tid) ?? [];
      list.push(l);
      lessonsByTopic.set(tid, list);
    }
  }
  const lessonMap = new Map(pack.lessons.map((l) => [l.id, l]));
  const primers = pack.primers ?? [];
  const primerMap = new Map(primers.map((p) => [p.id, p]));
  const passageMap = new Map((pack.passages ?? []).map((p) => [p.id, p]));

  const subtreeIds = (topicId: string): string[] => {
    const out: string[] = [];
    const stack = [topicId];
    while (stack.length) {
      const id = stack.pop()!;
      out.push(id);
      for (const c of children.get(id) ?? []) stack.push(c.id);
    }
    return out;
  };
  const questionsInSubtree = (topicId: string): Question[] => subtreeIds(topicId).flatMap((id) => byTopic.get(id) ?? []);

  return {
    pack,
    topics: pack.topics,
    topicById: (id) => topicMap.get(id),
    topicsBySubject: (subject) => pack.topics.filter((t) => t.subject === subject),
    practicableTopics: (subject) => pack.topics.filter((t) => t.subject === subject && (byTopic.get(t.id)?.length ?? 0) > 0),
    childrenOf: (id) => children.get(id) ?? [],
    subtreeIds,
    questionsOf: (id) => byTopic.get(id) ?? [],
    questionsInSubtree,
    questionsByDifficulty: (id, min, max, subtree = false) =>
      (subtree ? questionsInSubtree(id) : byTopic.get(id) ?? []).filter((q) => q.difficulty >= min && q.difficulty <= max),
    questionsBySubject: (subject) => pack.questions.filter((q) => q.subject === subject),
    questionById: (id) => questionMap.get(id),
    lessonsOf: (id) => lessonsByTopic.get(id) ?? [],
    lessonById: (id) => lessonMap.get(id),
    lessonFor: (topicId) => {
      let id: string | null | undefined = topicId;
      while (id) {
        const l = lessonsByTopic.get(id)?.[0];
        if (l) return l;
        id = topicMap.get(id)?.parentId;
      }
      return undefined;
    },
    primers,
    primerById: (id) => primerMap.get(id),
    passageById: (id) => passageMap.get(id),
  };
}
