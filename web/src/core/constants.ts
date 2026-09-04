/** Algorithm constants — see docs/ALGORITHM.md. */

// --- Nachweis-Modell (topic levels from recent evidence) ---------------------
/** Attempts considered per topic. */
export const LEVEL_WINDOW = 6;
/** "Geübt": correct answers within the window. */
export const GEUEBT_MIN_CORRECT = 4;
/** "Sicher": correct answers within the window … */
export const SICHER_MIN_CORRECT = 5;
/** … of which at least this many at exam difficulty … */
export const SICHER_MIN_HARD = 2;
/** … spread over at least this many different days. */
export const SICHER_MIN_DAYS = 2;
/** Difficulty that counts as "exam level". */
export const EXAM_DIFFICULTY = 3;
/** "Prüfungsfest": a correct exam-level answer this many days after reaching "Sicher". */
export const CHECK_AFTER_DAYS = 3;
/** A "Sicher" topic idle for longer drops to "Geübt" and gets a check. */
export const STALE_DAYS = 14;
/** masteryScore per level (keeps the Ampel thresholds and the old views working). */
export const LEVEL_MASTERY = [0, 0.2, 0.6, 0.85, 1] as const;

// --- Tagesplan --------------------------------------------------------------------
export const PLAN_SIZE = 12;
export const PLAN_MAX_CHECKS = 3;
export const PLAN_MAX_REPAIR_SLOTS = 4;
/** Prüfungsreife: priority-weighted share of topics at "Sicher" or better. */
export const READY_PERCENT = 0.85;
/** A Prüfungs-Modus run counts as passed at this share of correct answers … */
export const EXAM_PASS_RATIO = 0.6;
/** … with at least this many tasks on that day. */
export const EXAM_MIN_TASKS = 8;

export const AMPEL_RED_THRESHOLD = 0.45;
export const AMPEL_YELLOW_THRESHOLD = 0.75;
export const AMPEL_GREEN_STABILITY = 0.55;

export const WEIGHT_WEAKNESS = 0.45;
export const WEIGHT_ERROR_RATE = 0.25;
export const WEIGHT_RECENCY = 0.2;
export const WEIGHT_STABILITY = 0.1;

export const QUICK_TOP_PRIORITY_RATIO = 0.7;
export const QUICK_YELLOW_RATIO = 0.2;
export const QUICK_GREEN_RATIO = 0.1;

export const TARGET_TIMES_MS: Record<number, number> = {
  1: 20_000,
  2: 35_000,
  3: 55_000,
  4: 75_000,
  5: 90_000,
};

/** [upper mastery bound, [minDifficulty, maxDifficulty]] */
export const DIFFICULTY_BY_MASTERY: [number, [number, number]][] = [
  [0.45, [1, 2]],
  [0.75, [2, 3]],
  [1.01, [3, 4]],
];

export const REPAIR_SAME_TOPIC_COUNT = 2;
export const REPAIR_TRANSFER_COUNT = 1;

export const DEFAULT_RECENCY_DAYS = 14;
export const RECENCY_NORMALIZATION_DAYS = 7;
export const ERROR_RATE_RECENT_ATTEMPTS = 20;
export const MAX_VARIANTS_PER_TOPIC_PER_DAY = 40;

/** How many recent base questions to avoid repeating in normal selection. */
export const AVOID_RECENT_QUESTIONS = 6;
