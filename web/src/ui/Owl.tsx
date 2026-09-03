/**
 * "Frag Ferdinand" — the owl mentor. Badges that link into a primer (Eulen-Lektion):
 * a plain-language pre-lesson with vocabulary and a mini quiz, attached to dense lesson sections.
 */

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/app/state";
import { Button } from "./primitives";

export const OWL_NAME = "Ferdinand";

export function OwlAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full bg-linear-to-br from-yellow to-brand-2 shadow-md ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.56) }}
    >
      🦉
    </span>
  );
}

/** Speech bubble next to the owl. */
export function OwlBubble({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl rounded-tl-sm border border-yellow/40 bg-yellow-soft px-4 py-3 text-[1.02rem] leading-relaxed ${className}`}>
      {children}
    </div>
  );
}

export function AskOwl({ primerId, variant = "inline" }: { primerId: string; variant?: "inline" | "card" }) {
  const { content, profile, store } = useApp();
  const { pathname } = useLocation();
  const nav = useNavigate();
  const primer = content?.primerById(primerId);
  if (!primer) return null;
  const done = !!(profile && store?.primerDone(profile.id, primerId));
  const to = `/eule/${primerId}`;
  const state = { from: pathname };

  if (variant === "card") {
    return (
      <div className="mb-5 flex items-start gap-3 rounded-3xl border border-yellow/40 bg-yellow-soft p-4 sm:gap-4 sm:p-5 anim-pop">
        <OwlAvatar size={56} />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold uppercase tracking-wide text-ink-3">Frag {OWL_NAME} · Grundlagen zuerst</div>
          <div className="mt-0.5 text-lg font-bold">{primer.title}</div>
          <p className="mt-1 text-ink-2">{primer.teaser}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button variant="accent" onClick={() => nav(to, { state })}>
              {done ? "Nochmal anschauen" : `Erklär's mir, ${OWL_NAME} →`}
            </Button>
            {done ? <span className="text-sm font-semibold text-green">✓ Schon gemacht</span> : <span className="text-sm text-ink-3">{primer.steps.length} kurze Schritte · Mini-Quiz</span>}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link
      to={to}
      state={state}
      title={primer.teaser}
      className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-yellow/50 bg-yellow-soft px-2.5 py-1 text-xs font-semibold normal-case tracking-normal text-ink hover:border-yellow"
    >
      <OwlAvatar size={20} />
      <span className="truncate">
        Zu schwer? Frag {OWL_NAME}: {primer.title}
      </span>
      {done && <span className="text-green">✓</span>}
    </Link>
  );
}
