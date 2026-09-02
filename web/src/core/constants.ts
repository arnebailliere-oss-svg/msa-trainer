/** Algorithm constants — see docs/ALGORITHM.md. Mirror of legacy `core/constants.py`. */

export const CORRECT_MASTERY_DELTA = 0.03;
export const CORRECT_STABILITY_DELTA = 0.02;
export const SPEED_BONUS = 0.01;
export const INCORRECT_MASTERY_DELTA = -0.06;
export const INCORRECT_STABILITY_DELTA = -0.04;

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
