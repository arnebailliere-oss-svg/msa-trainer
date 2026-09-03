/** Ferdinands Leiter: all Eulen-Lektionen in order, from zero upwards. */
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/app/state";
import type { Subject } from "@/core/types";
import { OWL_NAME, OwlAvatar, OwlBubble } from "@/ui/Owl";
import { Button, PageTitle, SUBJECT_LABEL } from "@/ui/primitives";

export function PrimerIndexView() {
  const { content, profile, store } = useApp();
  const nav = useNavigate();
  if (!content || !profile || !store) return null;
  const subjects: Subject[] = ["MATH", "DE", "EN"];
  const done = new Set(store.primersDone(profile.id));
  const all = content.primers;
  const next = all.find((p) => !done.has(p.id));

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      <div className="mt-4 text-sm text-ink-3">
        <Link to="/home" className="hover:text-ink">
          ← Übersicht
        </Link>
      </div>
      <PageTitle title={`Frag ${OWL_NAME}`} eyebrow="Grundlagen von Anfang an" right={<OwlAvatar size={56} />} />
      <OwlBubble className="mb-4">
        Hier fängt alles ganz vorn an: die Zeichen, die Wörter, die Ideen hinter jedem Thema. Eine Tafel nach der anderen, in normaler Sprache. Niemand muss hier schon etwas können.
        {done.size > 0 && ` Du hast schon ${done.size} von ${all.length} Stufen geschafft.`}
      </OwlBubble>
      {next && (
        <div className="mb-8">
          <Button variant="accent" size="lg" onClick={() => nav(`/eule/${next.id}`, { state: { from: "/eule" } })}>
            {done.size > 0 ? "Weitermachen" : "Ganz vorn anfangen"}: {next.title} →
          </Button>
        </div>
      )}
      {subjects.map((s) => {
        const list = all.filter((p) => p.subject === s);
        if (list.length === 0) return null;
        return (
          <section key={s} className={`subject-${s} mb-8`}>
            <h2 className="mb-3 text-lg font-bold">{SUBJECT_LABEL[s]}</h2>
            <ol className="grid gap-3">
              {list.map((p, i) => {
                const isDone = done.has(p.id);
                return (
                  <li key={p.id} className="anim-pop" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                    <Link to={`/eule/${p.id}`} state={{ from: "/eule" }} className={`card-solid flex items-center gap-4 p-4 transition hover:-translate-y-0.5 ${isDone ? "opacity-80" : ""}`}>
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-extrabold ${isDone ? "bg-green text-[#062b1c]" : "accent-gradient text-white"}`}>{isDone ? "✓" : i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold leading-snug">{p.title}</div>
                        <div className="mt-0.5 text-sm text-ink-2">{p.teaser}</div>
                        <div className="mt-1 text-xs text-ink-3">
                          {p.steps.length} Tafeln · {p.quiz.length} Fragen
                          {isDone && <span className="font-semibold text-green"> · geschafft</span>}
                        </div>
                      </div>
                      <OwlAvatar size={32} />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
