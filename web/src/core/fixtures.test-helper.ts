/** Shared test fixture: a tiny content pack with a topic tree and a few questions. */

import { buildContentIndex } from "./contentIndex";
import type { ContentPack, Question, Topic } from "./types";

const t = (id: string, parentId: string | null, name = id): Topic => ({ id, subject: "MATH", code: id, name, parentId });

export const TOPICS: Topic[] = [
  t("MATH", null, "Mathematik"),
  t("MATH_NUM", "MATH", "Zahlen"),
  t("MATH_NUM_PCT", "MATH_NUM", "Prozent"),
  t("MATH_NUM_FRAC", "MATH_NUM", "Brüche"),
  t("MATH_ALG", "MATH", "Algebra"),
  t("MATH_ALG_LIN", "MATH_ALG", "Lineare Gleichungen"),
];

export const mcq = (id: string, topicId: string, difficulty: number, correct = "30"): Question => ({
  id,
  subject: "MATH",
  topicId,
  difficulty,
  qtype: "MCQ",
  prompt: `${id}?`,
  payload: { choices: [correct, "20", "40", "50"], shuffle: true },
  solution: { correct_choice: correct },
  explanation: "🎯 WAS IST DAS?\nProzent.\n\n✅ Antwort: 30",
  tags: ["test"],
});

export const templated: Question = {
  id: "PCT_T",
  subject: "MATH",
  topicId: "MATH_NUM_PCT",
  difficulty: 2,
  qtype: "SHORT",
  prompt: "Wie viel sind {{p}} % von {{g}}?",
  payload: { answer_type: "number", tolerance: 0.01 },
  solution: { kind: "computed", expr: "p / 100 * g", round: 2 },
  explanation: [
    { kind: "formula", body: "$W = \\frac{p}{100} \\cdot G$" },
    { kind: "steps", body: "{{p}} : 100 = {{= p/100}}\n{{= p/100}} · {{g}} = **{{= p/100*g}}**" },
    { kind: "answer", body: "W = {{= p/100*g}}" },
  ],
  tags: ["test"],
  variants: {
    enabled: true,
    variables: {
      p: { type: "int", min: 5, max: 50, step: 5 },
      g: { type: "int", min: 20, max: 400, step: 10 },
    },
    constraints: ["isint(p / 100 * g)"],
  },
};

export const QUESTIONS: Question[] = [
  mcq("PCT_1", "MATH_NUM_PCT", 1),
  mcq("PCT_2", "MATH_NUM_PCT", 2),
  mcq("PCT_3", "MATH_NUM_PCT", 3),
  templated,
  mcq("FRAC_2", "MATH_NUM_FRAC", 2),
  mcq("FRAC_3", "MATH_NUM_FRAC", 3),
  mcq("LIN_2", "MATH_ALG_LIN", 2),
];

export const PACK: ContentPack = { packId: "test", version: "0", title: "Test", topics: TOPICS, questions: QUESTIONS, lessons: [] };
export const INDEX = buildContentIndex(PACK);
