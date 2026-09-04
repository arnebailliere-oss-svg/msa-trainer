/** Question renderers: MCQ, SHORT, CLOZE, MATCH, WRITE. Controlled by SessionView. */

import { useEffect, useMemo, useRef, useState } from "react";
import { countWords } from "@/core/evaluators";
import type { ClozePayload, MatchPayload, McqPayload, RenderedQuestion, ShortPayload, WritePayload } from "@/core/types";
import { rngFromBytes } from "@/core/rng";
import { sha256 } from "@/core/sha256";
import { MathText } from "./MathText";

export interface RendererProps {
  question: RenderedQuestion;
  answer: unknown;
  onChange(answer: unknown): void;
  onSubmit(): void;
  locked: boolean;
  /** After submit: the evaluation outcome for highlighting. */
  feedback?: { isCorrect: boolean; correctAnswer: unknown } | null;
}

export function QuestionRenderer(props: RendererProps) {
  switch (props.question.qtype) {
    case "MCQ":
      return <McqRenderer {...props} />;
    case "SHORT":
      return <ShortRenderer {...props} />;
    case "CLOZE":
      return <ClozeRenderer {...props} />;
    case "MATCH":
      return <MatchRenderer {...props} />;
    case "WRITE":
      return <WriteRenderer {...props} />;
  }
}

/** True when the renderer has a submittable answer. */
export function isAnswerReady(q: RenderedQuestion, answer: unknown): boolean {
  switch (q.qtype) {
    case "MCQ":
      return typeof answer === "string" && answer.length > 0;
    case "SHORT":
      return typeof answer === "string" && answer.trim().length > 0;
    case "CLOZE": {
      const p = q.payload as ClozePayload;
      const a = (answer ?? {}) as Record<string, string>;
      return p.blanks.every((b) => (a[String(b.id)] ?? "").trim().length > 0);
    }
    case "MATCH": {
      const p = q.payload as MatchPayload;
      return Array.isArray(answer) && answer.length === p.left.length;
    }
    case "WRITE": {
      const p = q.payload as WritePayload;
      if (p.form === "schreibplan") {
        const a = (answer ?? {}) as Record<string, string>;
        return (p.fields ?? []).some((f) => (a[f.id] ?? "").trim().length > 0);
      }
      return typeof answer === "string" && countWords(answer) >= 3;
    }
  }
}

// --- WRITE ------------------------------------------------------------------------

function WriteRenderer({ question, answer, onChange, locked, feedback }: RendererProps) {
  const payload = question.payload as WritePayload;
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (payload.form !== "schreibplan") ref.current?.focus();
  }, [question.variantId, payload.form]);
  let border = "border-line focus-within:border-brand-2";
  if (feedback) border = feedback.isCorrect ? "border-green" : "border-yellow";

  if (payload.form === "schreibplan") {
    const a = (answer ?? {}) as Record<string, string>;
    const filled = (payload.fields ?? []).filter((f) => (a[f.id] ?? "").trim().length > 0).length;
    return (
      <div>
        <div className="mb-2 text-sm text-ink-3">
          Schreibplan: {filled} von {payload.fields?.length ?? 0} Feldern · Stichpunkte reichen, keine ganzen Sätze.
        </div>
        <div className="grid gap-2">
          {(payload.fields ?? []).map((f) => {
            const section = f.id.startsWith("e_") ? "Einleitung" : f.id.startsWith("s_") ? "Schluss" : null;
            const first = section && (payload.fields ?? []).find((x) => x.id.startsWith(f.id.slice(0, 2)))?.id === f.id;
            return (
              <div key={f.id}>
                {first && <div className="mt-2 mb-1 text-xs font-bold uppercase tracking-wider text-ink-3">{section}</div>}
                {f.id === "these" && <div className="mt-2 mb-1 text-xs font-bold uppercase tracking-wider text-ink-3">Hauptteil</div>}
                <label className={`block rounded-2xl border-2 bg-surface px-3 py-2 transition-colors ${border}`}>
                  <span className="block text-xs font-semibold text-ink-2">{f.label}</span>
                  <textarea
                    value={a[f.id] ?? ""}
                    onChange={(e) => onChange({ ...a, [f.id]: e.target.value })}
                    disabled={locked}
                    rows={1}
                    placeholder={f.hint ?? "…"}
                    aria-label={f.label}
                    className="mt-0.5 w-full resize-y bg-transparent text-base outline-none placeholder:text-ink-3"
                  />
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const text = typeof answer === "string" ? answer : "";
  const words = countWords(text);
  const min = payload.min_words ?? 0;
  const max = payload.max_words;
  const inRange = words >= min && (max === undefined || words <= max);
  const target = max !== undefined ? `${min}–${max}` : `mindestens ${min}`;
  const placeholder = { email: "Dear …,\n\n…\n\nBest wishes,\n…", blog: "Hi …,\n\n…", photo: "…", mediation: "Hi …,\n\nI read an article about …", eroerterung: "Einleitung …\n\nHauptteil (Pro) …\n\nHauptteil (Kontra) …\n\nSchluss …", schreibplan: "" }[payload.form];
  return (
    <div>
      <div className={`rounded-2xl border-2 bg-surface transition-colors ${border}`}>
        <textarea
          ref={ref}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          disabled={locked}
          rows={payload.form === "eroerterung" ? 16 : payload.form === "photo" ? 5 : 10}
          placeholder={placeholder}
          aria-label="Dein Text"
          spellCheck={false}
          autoCapitalize="sentences"
          className="w-full resize-y rounded-2xl bg-transparent px-4 py-3 text-base leading-relaxed outline-none placeholder:text-ink-3"
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className={`tabular-nums font-semibold ${words === 0 ? "text-ink-3" : inRange ? "text-green" : "text-yellow"}`} aria-live="polite">
          {words} {words === 1 ? "Wort" : "Wörter"}
          <span className="font-normal text-ink-3"> · Ziel: {target}</span>
        </span>
        {!feedback && <span className="text-ink-3">Absätze mit Leerzeile trennen. Sprache prüfst du nachher selbst.</span>}
      </div>
    </div>
  );
}

// --- MCQ ------------------------------------------------------------------------

function McqRenderer({ question, answer, onChange, locked, feedback }: RendererProps) {
  const payload = question.payload as McqPayload;
  const choices = useMemo(() => {
    const list = [...payload.choices];
    if (payload.shuffle === false) return list;
    return rngFromBytes(sha256(question.variantId).slice(0, 8)).shuffle(list);
  }, [payload, question.variantId]);

  useEffect(() => {
    if (locked) return;
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1;
      if (i >= 0 && i < choices.length && !(e.target instanceof HTMLInputElement)) onChange(choices[i]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choices, locked, onChange]);

  return (
    <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
      {choices.map((c, i) => {
        const selected = answer === c;
        const isCorrect = feedback && c === feedback.correctAnswer;
        const isWrongPick = feedback && selected && !feedback.isCorrect;
        let cls = "bg-surface hover:bg-surface-2 border-transparent";
        if (selected && !feedback) cls = "border-brand-2 bg-[color-mix(in_oklab,var(--brand)_18%,transparent)]";
        if (isCorrect) cls = "border-green bg-green-soft";
        if (isWrongPick) cls = "border-red bg-red-soft anim-shake";
        return (
          <button
            key={c}
            role="radio"
            aria-checked={selected}
            disabled={locked}
            onClick={() => onChange(c)}
            className={`text-left rounded-2xl border-2 px-4 py-3.5 transition-all duration-150 flex items-start gap-3 disabled:cursor-default ${cls}`}
          >
            <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-bold ${selected || isCorrect ? "bg-ink text-bg" : "bg-surface-2 text-ink-2"}`}>{i + 1}</span>
            <span className="text-lg leading-snug">
              <MathText text={c} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

// --- SHORT ------------------------------------------------------------------------

function ShortRenderer({ question, answer, onChange, onSubmit, locked, feedback }: RendererProps) {
  const payload = question.payload as ShortPayload;
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [question.variantId]);
  const numeric = payload.answer_type === "number";
  const placeholder = { number: "Zahl, z. B. 3,5", fraction: "Bruch, z. B. 3/4", term: "Term, z. B. 3x+6", text: "Antwort" }[payload.answer_type ?? "text"];
  let border = "border-line focus:border-brand-2";
  if (feedback) border = feedback.isCorrect ? "border-green bg-green-soft" : "border-red bg-red-soft";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className={`flex items-center rounded-2xl border-2 bg-surface px-4 transition-colors ${border} ${feedback && !feedback.isCorrect ? "anim-shake" : ""}`}>
        <input
          ref={ref}
          value={typeof answer === "string" ? answer : ""}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          disabled={locked}
          inputMode={numeric ? "decimal" : payload.answer_type === "fraction" ? "numeric" : "text"}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={placeholder}
          aria-label="Antwort"
          className="w-56 max-w-[70vw] bg-transparent py-3.5 text-2xl font-semibold outline-none placeholder:text-ink-3 placeholder:text-base placeholder:font-normal"
        />
        {payload.unit && <span className="ml-2 text-lg text-ink-2">{payload.unit}</span>}
      </div>
      {!feedback && <span className="text-sm text-ink-3">Enter = abschicken</span>}
    </div>
  );
}

// --- CLOZE ------------------------------------------------------------------------

function ClozeRenderer({ question, answer, onChange, locked, feedback }: RendererProps) {
  const payload = question.payload as ClozePayload;
  const value = (answer ?? {}) as Record<string, string>;
  const parts = payload.text_with_blanks.split(/___+/);
  const correct = (feedback?.correctAnswer ?? {}) as Record<string, string>;
  return (
    <div className="text-xl leading-loose">
      {parts.map((part, i) => {
        const blank = payload.blanks[i];
        const key = blank ? String(blank.id) : "";
        const got = value[key] ?? "";
        let cls = "border-line";
        if (feedback && blank) cls = got.trim().toLowerCase() === (correct[key] ?? "").trim().toLowerCase() ? "border-green bg-green-soft" : "border-red bg-red-soft";
        return (
          <span key={i}>
            <MathText text={part} inline />
            {blank &&
              (blank.choices ? (
                <select
                  value={got}
                  disabled={locked}
                  onChange={(e) => onChange({ ...value, [key]: e.target.value })}
                  className={`mx-1 rounded-xl border-2 bg-surface px-3 py-1.5 text-lg font-semibold ${cls}`}
                  aria-label={`Lücke ${i + 1}`}
                >
                  <option value="">…</option>
                  {blank.choices.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={got}
                  disabled={locked}
                  onChange={(e) => onChange({ ...value, [key]: e.target.value })}
                  className={`mx-1 w-36 rounded-xl border-2 bg-surface px-3 py-1.5 text-lg font-semibold outline-none focus:border-brand-2 ${cls}`}
                  aria-label={`Lücke ${i + 1}`}
                  autoComplete="off"
                />
              ))}
          </span>
        );
      })}
      {feedback && !feedback.isCorrect && (
        <div className="mt-3 text-base text-ink-2">
          Richtig: <strong className="text-ink">{payload.blanks.map((b) => correct[String(b.id)]).join(", ")}</strong>
        </div>
      )}
    </div>
  );
}

// --- MATCH ------------------------------------------------------------------------

function MatchRenderer({ question, answer, onChange, locked, feedback }: RendererProps) {
  const payload = question.payload as MatchPayload;
  const pairs = (Array.isArray(answer) ? answer : []) as [string, string][];
  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const right = useMemo(() => rngFromBytes(sha256(question.variantId + "|r").slice(0, 8)).shuffle([...payload.right]), [payload.right, question.variantId]);
  const correctPairs = (feedback?.correctAnswer ?? []) as [string, string][];
  const isPairCorrect = (l: string, r: string) => correctPairs.some(([cl, cr]) => cl === l && cr === r);
  const partnerOf = (l: string) => pairs.find((p) => p[0] === l)?.[1];
  const leftOf = (r: string) => pairs.find((p) => p[1] === r)?.[0];

  const pickRight = (r: string) => {
    if (locked) return;
    if (!pickedLeft) return;
    const next = pairs.filter((p) => p[0] !== pickedLeft && p[1] !== r);
    next.push([pickedLeft, r]);
    onChange(next);
    setPickedLeft(null);
  };
  const colorFor = (l: string, r: string | undefined) => {
    if (!r) return "";
    if (feedback) return isPairCorrect(l, r) ? "border-green bg-green-soft" : "border-red bg-red-soft";
    const idx = payload.left.indexOf(l) % 4;
    return ["border-brand-2", "border-de", "border-en", "border-yellow"][idx]!;
  };

  return (
    <div>
      <p className="mb-3 text-sm text-ink-3">Tippe links einen Begriff an, dann rechts die passende Bedeutung.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-2">
          {payload.left.map((l) => {
            const partner = partnerOf(l);
            return (
              <button
                key={l}
                disabled={locked}
                onClick={() => setPickedLeft(pickedLeft === l ? null : l)}
                className={`rounded-2xl border-2 px-3 py-3 text-left font-semibold transition-all ${pickedLeft === l ? "border-ink bg-surface-2 scale-[1.02]" : partner ? colorFor(l, partner) : "border-transparent bg-surface hover:bg-surface-2"}`}
              >
                <MathText text={l} />
                {partner && <div className="mt-1 text-xs font-normal text-ink-2">→ {partner}</div>}
              </button>
            );
          })}
        </div>
        <div className="grid gap-2">
          {right.map((r) => {
            const l = leftOf(r);
            return (
              <button
                key={r}
                disabled={locked || !pickedLeft}
                onClick={() => pickRight(r)}
                className={`rounded-2xl border-2 px-3 py-3 text-left transition-all disabled:opacity-100 ${l ? colorFor(l, r) : pickedLeft ? "border-dashed border-ink-3 bg-surface hover:bg-surface-2" : "border-transparent bg-surface"}`}
              >
                <MathText text={r} />
              </button>
            );
          })}
        </div>
      </div>
      {!locked && pairs.length > 0 && (
        <button onClick={() => onChange([])} className="mt-3 text-sm text-ink-3 underline">
          Zurücksetzen
        </button>
      )}
    </div>
  );
}
