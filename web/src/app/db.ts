/**
 * Browser persistence (IndexedDB via idb-keyval). Everything is per device:
 * profiles + one progress snapshot per profile. Falls back to memory when storage is blocked.
 */

import { del, get, keys, set } from "idb-keyval";
import { InMemoryProgressStore, type ProgressSnapshot } from "@/core/progress";
import type { Profile } from "@/core/types";

const PROFILES_KEY = "msa:profiles";
const progressKey = (profileId: string) => `msa:progress:${profileId}`;

async function safeGet<T>(key: string): Promise<T | undefined> {
  try {
    return await get<T>(key);
  } catch {
    return undefined;
  }
}
async function safeSet(key: string, value: unknown): Promise<void> {
  try {
    await set(key, value);
  } catch {
    /* storage blocked (private mode etc.) — keep running in memory */
  }
}

export async function loadProfiles(): Promise<Profile[]> {
  return (await safeGet<Profile[]>(PROFILES_KEY)) ?? [];
}

export async function saveProfiles(profiles: Profile[]): Promise<void> {
  await safeSet(PROFILES_KEY, profiles);
}

export async function loadProgress(profileId: string): Promise<ProgressSnapshot> {
  return (await safeGet<ProgressSnapshot>(progressKey(profileId))) ?? { mastery: [], attempts: [], counters: {}, primers: {} };
}

export async function deleteProfileData(profileId: string): Promise<void> {
  try {
    await del(progressKey(profileId));
  } catch {
    /* ignore */
  }
}

/** A progress store that writes its snapshot back to IndexedDB (debounced). */
export function createPersistentStore(profileId: string, initial: ProgressSnapshot): { store: InMemoryProgressStore; flush: () => Promise<void> } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pending: Promise<void> = Promise.resolve();
  const write = () => {
    pending = safeSet(progressKey(profileId), store.snapshot());
    return pending;
  };
  const store = new InMemoryProgressStore(initial, () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      void write();
    }, 250);
  });
  return {
    store,
    flush: async () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
        await write();
      }
      await pending;
    },
  };
}

/** Full export (all profiles + progress) as a JSON string, for backup / device transfer. */
export async function exportAll(): Promise<string> {
  const profiles = await loadProfiles();
  const progress: Record<string, ProgressSnapshot> = {};
  for (const p of profiles) progress[p.id] = await loadProgress(p.id);
  return JSON.stringify({ format: "msa-trainer-export", version: 1, exportedAt: new Date().toISOString(), profiles, progress }, null, 2);
}

export async function importAll(json: string): Promise<number> {
  const data = JSON.parse(json) as { format?: string; profiles?: Profile[]; progress?: Record<string, ProgressSnapshot> };
  if (data.format !== "msa-trainer-export" || !Array.isArray(data.profiles)) throw new Error("Keine gültige MSA-Trainer-Sicherung.");
  const existing = await loadProfiles();
  const merged = [...existing];
  for (const p of data.profiles) if (!merged.some((e) => e.id === p.id)) merged.push(p);
  await saveProfiles(merged);
  for (const [id, snap] of Object.entries(data.progress ?? {})) await safeSet(progressKey(id), snap);
  return data.profiles.length;
}

export async function storageKeys(): Promise<string[]> {
  try {
    return (await keys()).map(String);
  } catch {
    return [];
  }
}
