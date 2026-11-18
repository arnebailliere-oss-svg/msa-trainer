/**
 * What this device has unlocked. The website is fully open. Inside the Windows and Android apps the
 * full version is locked until it is bought; the result of the purchase is kept on the device.
 *
 * The shop connection (Google Play purchase, Windows licence key) is plugged in here later. Until then a
 * test build (VITE_TEST_UNLOCK=1) can unlock itself, so that the locked and the unlocked app can both be tried.
 */

import { useSyncExternalStore } from "react";
import { accessTo, fullAccess, type Access } from "@/core/access";
import { EDITION_SUBJECTS, IN_APP_SHELL } from "@/core/edition";
import type { Subject } from "@/core/types";

const KEY = "msa:entitlement";
const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? {};
/** True when this build can complete a purchase. For now only the test builds can. */
export const PURCHASE_AVAILABLE = env.VITE_TEST_UNLOCK === "1";

function read(): Subject[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]") as unknown;
    return Array.isArray(raw) ? (raw.filter((s) => EDITION_SUBJECTS.includes(s as Subject)) as Subject[]) : [];
  } catch {
    return [];
  }
}

let access: Access = IN_APP_SHELL ? accessTo(read()) : fullAccess;
const listeners = new Set<() => void>();

function set(subjects: Subject[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(subjects));
  } catch {
    /* storage blocked: the unlock then lasts until the app is closed */
  }
  access = accessTo(subjects);
  listeners.forEach((l) => l());
}

export function useAccess(): Access {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => access,
  );
}

/** Buys the full version of this product. Resolves to false when no purchase is possible in this build. */
export async function purchase(): Promise<boolean> {
  if (!PURCHASE_AVAILABLE) return false;
  set([...EDITION_SUBJECTS]);
  return true;
}

/** Test builds only: back to the free taste. */
export function lockAgain() {
  if (PURCHASE_AVAILABLE) set([]);
}
