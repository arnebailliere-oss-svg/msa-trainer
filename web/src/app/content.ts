/** Loads the compiled content pack from /content/*.json (built by scripts/build-content.ts). */

import { buildContentIndex, type ContentIndex } from "@/core/contentIndex";
import type { ContentPack, Lesson, Passage, Primer, Question, Subject, Topic } from "@/core/types";

interface Manifest {
  packId: string;
  version: string;
  title: string;
  builtAt: string;
  subjects: Record<Subject, { questions: number; lessons: number; file: string }>;
}

let cached: Promise<ContentIndex> | null = null;

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${import.meta.env.BASE_URL}content/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Inhalte konnten nicht geladen werden (${res.status}): ${url}`);
  return (await res.json()) as T;
}

export function loadContent(): Promise<ContentIndex> {
  if (!cached) {
    cached = (async () => {
      const manifest = await fetchJson<Manifest>("manifest.json");
      const topics = await fetchJson<Topic[]>("topics.json");
      const questions: Question[] = [];
      const lessons: Lesson[] = [];
      const primers: Primer[] = [];
      const passages: Passage[] = [];
      const parts = await Promise.all(
        (Object.keys(manifest.subjects) as Subject[]).map((s) => fetchJson<{ questions: Question[]; lessons: Lesson[]; primers?: Primer[]; passages?: Passage[] }>(manifest.subjects[s].file)),
      );
      for (const p of parts) {
        questions.push(...p.questions);
        lessons.push(...p.lessons);
        primers.push(...(p.primers ?? []));
        passages.push(...(p.passages ?? []));
      }
      const pack: ContentPack = { packId: manifest.packId, version: manifest.version, title: manifest.title, topics, questions, lessons, primers, passages };
      return buildContentIndex(pack);
    })();
    cached.catch(() => {
      cached = null;
    });
  }
  return cached;
}
