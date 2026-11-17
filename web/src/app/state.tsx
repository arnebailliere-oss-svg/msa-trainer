/**
 * App-wide state: content index, profiles, active profile + its progress store.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { ContentIndex } from "@/core/contentIndex";
import type { InMemoryProgressStore } from "@/core/progress";
import type { Profile } from "@/core/types";
import { loadContent } from "./content";
import { createPersistentStore, deleteProfileData, importAll, loadProfiles, loadProgress, saveProfiles } from "./db";

const ACTIVE_KEY = "msa:activeProfile";

interface AppState {
  content: ContentIndex | null;
  contentError: string | null;
  profiles: Profile[];
  profile: Profile | null;
  store: InMemoryProgressStore | null;
  /** Bumps whenever progress changes so views re-render. */
  progressVersion: number;
  createProfile(name: string, emoji: string): Promise<Profile>;
  selectProfile(id: string | null): Promise<void>;
  deleteProfile(id: string): Promise<void>;
  /** Read a backup file. Returns the number of profiles in it; throws with a German sentence if it is not a backup. */
  importBackup(json: string): Promise<number>;
  flush(): Promise<void>;
  notifyProgress(): void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentIndex | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [store, setStore] = useState<InMemoryProgressStore | null>(null);
  const [progressVersion, setProgressVersion] = useState(0);
  const flushRef = useRef<() => Promise<void>>(() => Promise.resolve());

  useEffect(() => {
    loadContent()
      .then(setContent)
      .catch((e: Error) => setContentError(e.message));
  }, []);

  const activate = useCallback(async (p: Profile | null) => {
    await flushRef.current();
    if (!p) {
      setProfile(null);
      setStore(null);
      flushRef.current = () => Promise.resolve();
      try {
        localStorage.removeItem(ACTIVE_KEY);
      } catch {
        /* ignore */
      }
      return;
    }
    const snapshot = await loadProgress(p.id);
    const { store: s, flush } = createPersistentStore(p.id, snapshot);
    flushRef.current = flush;
    setProfile(p);
    setStore(s);
    setProgressVersion((v) => v + 1);
    try {
      localStorage.setItem(ACTIVE_KEY, p.id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    (async () => {
      const list = await loadProfiles();
      setProfiles(list);
      let last: string | null = null;
      try {
        last = localStorage.getItem(ACTIVE_KEY);
      } catch {
        /* ignore */
      }
      const p = list.find((x) => x.id === last);
      if (p) await activate(p);
    })();
  }, [activate]);

  useEffect(() => {
    const onHide = () => void flushRef.current();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
    };
  }, []);

  const value = useMemo<AppState>(
    () => ({
      content,
      contentError,
      profiles,
      profile,
      store,
      progressVersion,
      async createProfile(name, emoji) {
        const p: Profile = { id: `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`, name: name.trim(), emoji, createdAt: new Date().toISOString() };
        const next = [...profiles, p];
        setProfiles(next);
        await saveProfiles(next);
        await activate(p);
        return p;
      },
      async selectProfile(id) {
        await activate(id ? (profiles.find((p) => p.id === id) ?? null) : null);
      },
      async deleteProfile(id) {
        const next = profiles.filter((p) => p.id !== id);
        setProfiles(next);
        await saveProfiles(next);
        await deleteProfileData(id);
        if (profile?.id === id) await activate(null);
      },
      async importBackup(json) {
        const current = profile?.id ?? null;
        await flushRef.current(); // first save what is in memory …
        const n = await importAll(json); // (throws before writing anything if the file is not a backup)
        flushRef.current = () => Promise.resolve(); // … and after the import never write the old state over it
        const all = await loadProfiles();
        setProfiles(all);
        await activate(all.find((p) => p.id === current) ?? null); // reloads the progress that is now stored
        return n;
      },
      flush: () => flushRef.current(),
      notifyProgress: () => setProgressVersion((v) => v + 1),
    }),
    [content, contentError, profiles, profile, store, progressVersion, activate],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp outside AppProvider");
  return ctx;
}
