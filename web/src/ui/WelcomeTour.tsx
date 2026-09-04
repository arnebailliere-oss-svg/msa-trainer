/**
 * The welcome tour a new profile sees once on the dashboard: the same sections
 * as the help page, one card at a time, narrated by Ferdinand.
 *
 * "Seen" is stored per profile in localStorage — it is a UI nicety, not progress,
 * so it deliberately stays out of the IndexedDB snapshot and the backup file.
 * The help page can start it again by navigating to /home with state `{ tour: true }`.
 */

import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/app/state";
import { TOUR_STEPS } from "./guide";
import { OwlAvatar, OWL_NAME } from "./Owl";
import { Button } from "./primitives";

const seenKey = (profileId: string) => `msa:guide:${profileId}`;

export function hasSeenTour(profileId: string): boolean {
  try {
    return !!localStorage.getItem(seenKey(profileId));
  } catch {
    return true; // storage blocked — never nag
  }
}

function markSeen(profileId: string): void {
  try {
    localStorage.setItem(seenKey(profileId), new Date().toISOString());
  } catch {
    /* ignore */
  }
}

export function WelcomeTour() {
  const { profile } = useApp();
  const nav = useNavigate();
  const location = useLocation();
  const requested = !!(location.state as { tour?: boolean } | null)?.tour;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!profile) return;
    if (requested) {
      setStep(0);
      setOpen(true);
      nav(location.pathname, { replace: true, state: null });
    } else if (!hasSeenTour(profile.id)) {
      setStep(0);
      setOpen(true);
    }
    // location.pathname / nav are stable enough here; re-running on them would reopen the tour.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, requested]);

  const close = useCallback(() => {
    if (profile) markSeen(profile.id);
    setOpen(false);
  }, [profile]);

  const next = useCallback(() => {
    setStep((s) => {
      if (s + 1 >= TOUR_STEPS.length) {
        close();
        return s;
      }
      return s + 1;
    });
  }, [close]);

  // Freeze the page behind the modal — otherwise the dashboard keeps scrolling under it,
  // which on phones shifts the dialog out from under your finger.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0 });
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setStep((s) => Math.max(0, s - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next]);

  if (!open) return null;
  const current = TOUR_STEPS[step];
  if (!current) return null;
  const last = step + 1 === TOUR_STEPS.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      {/* min-h-full + flex, not place-items-center: a card taller than the phone must stay fully scrollable. */}
      <div className="flex min-h-full items-center justify-center p-3">
        <div className="card-solid w-full max-w-lg p-5 anim-pop sm:p-6">
          <div className="flex items-start gap-3">
            <OwlAvatar size={48} />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold uppercase tracking-wide text-ink-3">
                {OWL_NAME} zeigt dir alles · {step + 1} von {TOUR_STEPS.length}
              </div>
              <h2 id="tour-title" className="mt-0.5 text-xl font-extrabold leading-tight sm:text-2xl">
                {current.emoji} {current.title}
              </h2>
            </div>
            <button onClick={close} className="shrink-0 rounded-xl px-2 py-1 text-ink-3 hover:bg-surface hover:text-ink" aria-label="Tour schließen">
              ✕
            </button>
          </div>

          <p className="mt-3 leading-relaxed text-ink-2">{current.lead}</p>
          {current.demo}

          {last && (
            <p className="mt-4 rounded-2xl bg-surface px-4 py-3 text-sm text-ink-2">
              Das war's. Alles noch einmal in Ruhe — und einiges mehr — findest du jederzeit unter <strong className="text-ink">❓ Hilfe</strong> oben rechts.
            </p>
          )}

          <div className="mt-5 flex items-center gap-3">
            <div className="flex min-w-0 flex-1 gap-1.5" aria-hidden>
              {TOUR_STEPS.map((s, i) => (
                <span key={s.id} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-brand-2" : i < step ? "w-1.5 bg-brand" : "w-1.5 bg-surface-2"}`} />
              ))}
            </div>
            {step > 0 && (
              <Button className="shrink-0" variant="ghost" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))}>
                ←
              </Button>
            )}
            <Button className="shrink-0" variant="accent" onClick={next} autoFocus>
              {last ? "Los geht's! 🚀" : "Weiter →"}
            </Button>
          </div>
          {!last && (
            <button onClick={close} className="mt-3 w-full text-center text-sm text-ink-3 hover:text-ink">
              Überspringen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
