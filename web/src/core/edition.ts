/**
 * Which product this build is. One codebase makes the website (all subjects) and the apps:
 * MSA Trainer Mathe, Deutsch, Englisch and Komplett. Set at build time with VITE_EDITION.
 */

import type { Subject } from "./types";

export type Edition = "all" | "math" | "de" | "en";

const SUBJECTS_OF: Record<Edition, Subject[]> = { all: ["MATH", "DE", "EN"], math: ["MATH"], de: ["DE"], en: ["EN"] };
const NAME_OF: Record<Edition, string> = { all: "MSA Trainer", math: "MSA Trainer Mathe", de: "MSA Trainer Deutsch", en: "MSA Trainer Englisch" };

export function editionOf(raw: string | undefined): Edition {
  return raw && raw in SUBJECTS_OF ? (raw as Edition) : "all";
}

const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? {};

export const EDITION: Edition = editionOf(env.VITE_EDITION);
/** The subjects this product contains, in display order. */
export const EDITION_SUBJECTS: readonly Subject[] = SUBJECTS_OF[EDITION];
export const SINGLE_SUBJECT = EDITION_SUBJECTS.length === 1;
export const APP_NAME = NAME_OF[EDITION];
/** True inside the Windows and Android apps: files are local, so there is no service worker. */
export const IN_APP_SHELL = env.VITE_SHELL === "app";

export const subjectsOf = (e: Edition): readonly Subject[] => SUBJECTS_OF[e];
