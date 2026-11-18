/**
 * The word card of an Eulen-Lektion: every word and sign the lesson uses, with a plain explanation,
 * reachable from every board. The words that stand on the current board come first.
 */

import { useEffect } from "react";
import type { PrimerVocab } from "@/core/types";
import { mentions, wordsIn } from "@/core/words";
import { MathText } from "./MathText";

export { mentions, wordsIn };

function Entries({ words }: { words: PrimerVocab[] }) {
  return (
    <dl className="grid gap-3">
      {words.map((v) => (
        <div key={v.term} className="rounded-xl bg-surface px-4 py-3">
          <dt className="text-lg font-bold">
            <MathText text={v.term} inline />
          </dt>
          <dd className="mt-0.5 text-ink-2">
            <MathText text={v.plain} />
            {v.example && <MathText text={`Beispiel: ${v.example}`} className="mt-1 text-sm text-ink-3" />}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function WordCard({ here, all, onClose }: { here: PrimerVocab[]; all: PrimerVocab[]; onClose(): void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const rest = all.filter((v) => !here.some((h) => h.term === v.term));
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 sm:items-center" onClick={onClose} role="presentation">
      <div className="card-solid max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-b-none p-5 sm:rounded-3xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Wörter und Zeichen" data-owl-words>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">📖 Wörter und Zeichen</h2>
          <button onClick={onClose} className="rounded-xl px-3 py-1 text-ink-3 hover:bg-surface hover:text-ink" aria-label="Schließen">
            ✕
          </button>
        </div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-3">Auf dieser Tafel</h3>
        {here.length > 0 ? <Entries words={here} /> : <p className="text-ink-2">Auf dieser Tafel steht kein Wort aus der Liste.</p>}
        {rest.length > 0 && (
          <>
            <h3 className="mb-2 mt-5 text-sm font-bold uppercase tracking-wide text-ink-3">Alle Wörter dieser Lektion</h3>
            <Entries words={rest} />
          </>
        )}
      </div>
    </div>
  );
}
