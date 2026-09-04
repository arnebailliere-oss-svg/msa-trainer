import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/app/state";
import type { SessionStats, Subject, TrainingMode } from "@/core/types";
import { MathText } from "@/ui/MathText";
import { Button, Chip, Ring } from "@/ui/primitives";

interface ResultState {
  stats: SessionStats;
  subject: Subject;
  mode: TrainingMode;
  topicId?: string;
}

export function ResultView() {
  const { state } = useLocation() as { state: ResultState | null };
  const { content } = useApp();
  const nav = useNavigate();
  useEffect(() => {
    if (!state) nav("/home", { replace: true });
  }, [state, nav]);
  const pieces = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ left: `${(i * 37) % 100}%`, delay: `${(i % 10) * 0.12}s`, dur: `${2 + (i % 5) * 0.4}s`, color: ["var(--brand)", "var(--brand-2)", "var(--green)", "var(--yellow)", "var(--de)"][i % 5] })), []);
  if (!state || !content) return null;
  const { stats, subject, mode, topicId } = state;
  const pct = stats.totalQuestions ? stats.correctCount / stats.totalQuestions : 0;
  const minutes = Math.round(stats.totalTimeMs / 60000);
  const name = (id: string) => content.topicById(id)?.name ?? id;
  const again = () => nav(`/session/${mode}/${subject}${topicId ? `/${topicId}` : ""}`);
  const headline = pct >= 0.9 ? "Stark! 🏆" : pct >= 0.7 ? "Gut gemacht! 💪" : pct >= 0.5 ? "Weiter so! 🚀" : "Dranbleiben! 🌱";
  const items = stats.items ?? [];
  const avgSec = items.length ? Math.round(stats.totalTimeMs / items.length / 1000) : 0;

  return (
    <div className="mx-auto max-w-xl px-4 py-10 text-center">
      {pct >= 0.8 &&
        pieces.map((p, i) => <span key={i} className="confetti" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur, background: p.color }} />)}
      <div className="anim-pop">
        <Ring value={pct} size={140} stroke={12} color={pct >= 0.7 ? "var(--green)" : pct >= 0.5 ? "var(--yellow)" : "var(--red)"}>
          <span className="text-3xl font-extrabold">{Math.round(pct * 100)}%</span>
        </Ring>
        <h1 className="mt-5 text-3xl font-extrabold">{headline}</h1>
        <p className="mt-1 text-ink-2">
          {stats.correctCount} von {stats.totalQuestions} richtig · {minutes < 1 ? "unter 1 Minute" : `${minutes} Min.`}
          {mode === "MSA" && items.length > 0 && ` · Ø ${avgSec} s pro Aufgabe`}
        </p>
        {mode === "MSA" && <p className="mt-2 text-sm text-ink-3">Prüfungs-Check mit Originalaufgaben aus den letzten MSA-Prüfungen. Schau dir unten jede Aufgabe an, die nicht geklappt hat.</p>}
      </div>

      {(stats.strengthenedTopics.length > 0 || stats.weakTopics.length > 0) && (
        <div className="glass mt-8 p-5 text-left anim-pop">
          {stats.strengthenedTopics.length > 0 && (
            <div className="mb-3">
              <div className="mb-1 text-sm font-bold text-green">🟢 Sicher</div>
              <div className="flex flex-wrap gap-2">
                {stats.strengthenedTopics.map((t) => (
                  <Chip key={t} tone="green">
                    {name(t)}
                  </Chip>
                ))}
              </div>
            </div>
          )}
          {stats.weakTopics.length > 0 && (
            <div>
              <div className="mb-1 text-sm font-bold text-red">🔴 Noch üben</div>
              <div className="flex flex-wrap gap-2">
                {stats.weakTopics.map((t) => (
                  <Chip key={t} tone="red">
                    {name(t)}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {items.length > 0 && (
        <div className="glass mt-6 p-5 text-left anim-pop">
          <div className="mb-2 text-sm font-bold text-ink-2">Deine Aufgaben</div>
          <ol className="divide-y divide-line">
            {items.map((it, i) => (
              <li key={i} className="flex items-start gap-3 py-2.5">
                <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${it.isCorrect ? "bg-green text-[#062b1c]" : "bg-red text-white"}`} aria-label={it.isCorrect ? "richtig" : "falsch"}>
                  {it.isCorrect ? "✓" : "✗"}
                </span>
                <div className="min-w-0 flex-1">
                  <MathText text={it.prompt} className="line-clamp-2 text-sm" />
                  <div className="mt-0.5 text-xs text-ink-3">
                    {name(it.topicId)} · {Math.round(it.responseTimeMs / 1000)} s{it.inRepair ? " · Reparatur" : ""}
                    {it.source ? ` · ${it.source}` : ""}
                  </div>
                  {!it.isCorrect && <MathText text={`Richtig: **${it.correctAnswerText.replace(/\n/g, ", ")}**`} className="mt-0.5 text-xs text-ink-2" />}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-8 grid gap-2 sm:grid-cols-2">
        <Button size="lg" onClick={again}>
          Nochmal 🔁
        </Button>
        <Button size="lg" variant="ghost" onClick={() => nav("/home")}>
          Zur Übersicht
        </Button>
      </div>
    </div>
  );
}
