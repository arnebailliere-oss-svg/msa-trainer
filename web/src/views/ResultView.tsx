import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/app/state";
import type { SessionStats, Subject, TrainingMode } from "@/core/types";
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
        </p>
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
