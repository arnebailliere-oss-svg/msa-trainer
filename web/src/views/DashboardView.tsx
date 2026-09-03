import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/app/state";
import { ampelFor } from "@/core/mastery";
import type { AmpelState, Subject, Topic } from "@/core/types";
import { Ampel, AMPEL_LABEL, Button, Chip, Ring, SUBJECT_EMOJI, SUBJECT_LABEL } from "@/ui/primitives";

const SUBJECTS: Subject[] = ["MATH", "DE", "EN"];
const SUBJECT_KEY = "msa:subject";

function streakDays(dates: string[]): number {
  const days = new Set(dates.map((d) => d.slice(0, 10)));
  let streak = 0;
  const d = new Date();
  for (;;) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!days.has(key)) {
      if (streak === 0) {
        d.setDate(d.getDate() - 1);
        const y = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        if (!days.has(y)) return 0;
        continue;
      }
      return streak;
    }
    streak++;
    d.setDate(d.getDate() - 1);
  }
}

export function DashboardView() {
  const { content, profile, store, progressVersion } = useApp();
  const nav = useNavigate();
  const [subject, setSubject] = useState<Subject>(() => {
    try {
      return (localStorage.getItem(SUBJECT_KEY) as Subject) || "MATH";
    } catch {
      return "MATH";
    }
  });
  const pick = (s: Subject) => {
    setSubject(s);
    try {
      localStorage.setItem(SUBJECT_KEY, s);
    } catch {
      /* ignore */
    }
  };

  const data = useMemo(() => {
    if (!content || !store || !profile) return null;
    void progressVersion;
    const leaves = content.practicableTopics(subject);
    const groups = new Map<string, { parent: Topic | undefined; topics: { topic: Topic; ampel: AmpelState; mastery: number; count: number; hasLesson: boolean }[] }>();
    for (const t of leaves) {
      const parentId = t.parentId ?? "";
      const g = groups.get(parentId) ?? { parent: content.topicById(parentId), topics: [] };
      const m = store.getMastery(profile.id, t.id);
      g.topics.push({ topic: t, ampel: ampelFor(m), mastery: m?.masteryScore ?? 0, count: content.questionsOf(t.id).length, hasLesson: !!content.lessonFor(t.id) });
      groups.set(parentId, g);
    }
    const all = [...groups.values()].flatMap((g) => g.topics);
    const green = all.filter((t) => t.ampel === "GREEN").length;
    const attempts = store.attempts(profile.id, undefined, 2000);
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = attempts.filter((a) => a.createdAt.slice(0, 10) === today).length;
    const errorTopics = all.filter((t) => t.ampel === "RED" && (store.getMastery(profile.id, t.topic.id)?.attempts ?? 0) > 0).length;
    return { groups: [...groups.values()], all, green, streak: streakDays(attempts.map((a) => a.createdAt)), todayCount, errorTopics };
  }, [content, store, profile, subject, progressVersion]);

  if (!content || !profile || !data) return null;
  const pct = data.all.length ? data.green / data.all.length : 0;

  return (
    <div className={`subject-${subject} mx-auto max-w-5xl px-4 pb-16`}>
      {/* Hero */}
      <div className="glass mt-4 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7 anim-pop">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-3xl bg-surface-2 text-4xl">{profile.emoji}</span>
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">Hey {profile.name}! 👋</h1>
            <div className="mt-1 flex flex-wrap gap-2 text-sm">
              <Chip tone="brand">🔥 {data.streak} Tage in Folge</Chip>
              <Chip>Heute: {data.todayCount} Aufgaben</Chip>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Ring value={pct} size={72} color="var(--green)">
            {Math.round(pct * 100)}%
          </Ring>
          <div className="text-sm text-ink-2">
            <div className="font-semibold text-ink">
              {data.green} von {data.all.length} Themen sicher
            </div>
            in {SUBJECT_LABEL[subject]}
          </div>
        </div>
      </div>

      {/* Subject tabs */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {SUBJECTS.map((s) => (
          <button key={s} onClick={() => pick(s)} className={`subject-${s} flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 font-semibold transition-all ${subject === s ? "accent-gradient text-white shadow-lg" : "bg-surface text-ink-2 hover:bg-surface-2"}`} aria-pressed={subject === s}>
            <span>{SUBJECT_EMOJI[s]}</span>
            {SUBJECT_LABEL[s]}
          </button>
        ))}
      </div>

      {/* Modes */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <ModeCard title="Schnelltraining" desc="10 Aufgaben, passend zu deinen Schwächen" emoji="⚡" onClick={() => nav(`/session/QUICK/${subject}`)} primary />
        <ModeCard title="Fehler-Training" desc={data.errorTopics ? `${data.errorTopics} Themen mit Fehlern üben` : "Noch keine Fehler — super!"} emoji="🩹" onClick={() => nav(`/session/ERRORS/${subject}`)} />
        <ModeCard title="Prüfungs-Modus" desc="Schwere Aufgaben wie im MSA, ohne Hilfe" emoji="🏁" onClick={() => nav(`/session/MSA/${subject}`)} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Link to="/eule" className="flex items-center gap-3 rounded-2xl border border-yellow/40 bg-yellow-soft px-4 py-2 font-semibold hover:border-yellow">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-yellow to-brand-2 text-xl shadow-md" aria-hidden>
            🦉
          </span>
          <span>
            Frag Ferdinand
            <span className="block text-xs font-normal text-ink-2">Grundlagen von Anfang an, Tafel für Tafel</span>
          </span>
        </Link>
        {subject === "MATH" && (
          <Link to="/formeln" className="inline-flex items-center gap-2 rounded-2xl bg-surface px-4 py-2 text-sm font-semibold text-ink-2 hover:bg-surface-2 hover:text-ink">
            📐 Formelblatt ansehen
          </Link>
        )}
      </div>

      {/* Topics */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-bold">Deine Themen</h2>
        <div className="flex gap-3 text-xs text-ink-3">
          {(["RED", "YELLOW", "GREEN"] as AmpelState[]).map((a) => (
            <span key={a} className="flex items-center gap-1">
              <Ampel state={a} size={9} /> {AMPEL_LABEL[a]}
            </span>
          ))}
        </div>
      </div>
      {data.groups.map((g) => (
        <section key={g.parent?.id ?? "root"} className="mt-5">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-ink-3">{g.parent?.name ?? "Weitere"}</h3>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {g.topics.map(({ topic, ampel, mastery, count, hasLesson }) => (
              <div key={topic.id} className="glass flex items-center gap-3 p-3.5 transition-colors hover:bg-surface-2">
                <Ampel state={ampel} />
                <Link to={`/topic/${topic.id}`} className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{topic.name}</div>
                  <div className="text-xs text-ink-3">
                    {Math.round(mastery * 100)} % · {count} Aufgaben{hasLesson ? " · 📘 Lektion" : ""}
                  </div>
                </Link>
                <Button size="sm" variant="accent" onClick={() => nav(`/session/TOPIC/${subject}/${topic.id}`)}>
                  Üben
                </Button>
              </div>
            ))}
          </div>
        </section>
      ))}
      {data.all.length === 0 && <p className="mt-6 text-ink-2">Für dieses Fach gibt es noch keine Aufgaben.</p>}
    </div>
  );
}

function ModeCard({ title, desc, emoji, onClick, primary }: { title: string; desc: string; emoji: string; onClick(): void; primary?: boolean }) {
  return (
    <button onClick={onClick} className={`group text-left rounded-3xl p-5 transition-all hover:-translate-y-0.5 ${primary ? "accent-gradient text-white shadow-[0_16px_40px_-16px_var(--accent,var(--brand))]" : "glass hover:bg-surface-2"}`}>
      <div className="mb-2 text-3xl">{emoji}</div>
      <div className="text-lg font-bold">{title}</div>
      <div className={`text-sm ${primary ? "text-white/85" : "text-ink-2"}`}>{desc}</div>
    </button>
  );
}
