/** Pocket calculator drawer for math sessions — uses the safe evaluator, no eval(). */

import { useState } from "react";
import { CalcError, calculate } from "@/core/calculator";
import { formatNumber } from "@/core/format";

const KEYS: string[][] = [
  ["(", ")", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ",", "^", "="],
];
const FN = [
  { k: "√", ins: "√(", label: "Wurzel" },
  { k: "sin", ins: "sin(", label: "Sinus" },
  { k: "cos", ins: "cos(", label: "Kosinus" },
  { k: "tan", ins: "tan(", label: "Tangens" },
  { k: "π", ins: "π", label: "Pi" },
  { k: "x²", ins: "²", label: "hoch 2" },
];
const LABELS: Record<string, string> = { "÷": "geteilt", "×": "mal", "−": "minus", "+": "plus", "=": "ist gleich", ",": "Komma", "^": "hoch", "%": "Prozent" };
/** Keys that go on calculating with the last result; every other key starts a new calculation. */
const CONTINUES = ["÷", "×", "−", "+", "^", "²", "%"];

/** Result as a learner reads it: German comma, and very large or very small numbers as "1,5 · 10^12". */
export function showResult(v: number): string {
  const abs = Math.abs(v);
  if (v !== 0 && (abs >= 1e12 || abs < 1e-6)) {
    const [mantissa, exponent] = v.toExponential(6).split("e");
    return `${formatNumber(Number(mantissa), 6)} · 10^${String(Number(exponent)).replace("-", "−")}`;
  }
  return formatNumber(v, 6);
}

export function Calculator({ onClose }: { onClose?: () => void }) {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    if (!expr.trim()) return;
    try {
      setResult(showResult(calculate(expr)));
      setError(null);
    } catch (e) {
      setError(e instanceof CalcError ? e.message : "Fehler");
      setResult(null);
    }
  };
  const press = (k: string) => {
    if (k === "=") return run();
    setError(null);
    if (result !== null) {
      // After "=": a sign goes on with the result, anything else starts fresh.
      // Negative and very large results get brackets, so that "−5" then "²" means (−5)².
      const wrap = result.includes("·") || result.startsWith("−");
      setExpr(CONTINUES.includes(k) ? (wrap ? `(${result})` : result) + k : k);
      setResult(null);
    } else setExpr((s) => s + k);
  };
  const back = () => {
    setResult(null);
    setError(null);
    setExpr((s) => s.replace(/((sin|cos|tan|√)\(|.)$/u, ""));
  };

  return (
    <div
      className="card-solid p-4 w-full sm:w-80"
      role="dialog"
      aria-label="Taschenrechner"
      // Enter belongs to the calculator here; it must not check the answer or move on behind it.
      onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-ink-2">Taschenrechner</span>
        {onClose && (
          <button onClick={onClose} className="text-ink-3 hover:text-ink text-xl leading-none" aria-label="Schließen">
            ×
          </button>
        )}
      </div>
      <input
        value={expr}
        onChange={(e) => {
          setExpr(e.target.value);
          setError(null);
          setResult(null);
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          run();
        }}
        placeholder="z. B. 12,5 · 4 + sin(30)"
        className="w-full rounded-xl border-2 border-line bg-surface px-3 py-2 text-lg outline-none focus:border-brand-2"
        aria-label="Ausdruck"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      <div className="mt-2 min-h-9 text-right text-2xl font-bold" aria-live="polite">
        {result !== null && <span className="gradient-text">= {result}</span>}
        {error && <span className="text-base font-medium text-red">{error}</span>}
      </div>
      <div className="mt-2 grid grid-cols-6 gap-1.5">
        {FN.map((f) => (
          <button key={f.k} onClick={() => press(f.ins)} aria-label={f.label} className="rounded-lg bg-surface py-1.5 text-sm font-semibold hover:bg-surface-2">
            {f.k}
          </button>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-4 gap-1.5">
        {KEYS.flat().map((k) => {
          const op = "÷×−+=^%()".includes(k);
          return (
            <button
              key={k}
              onClick={() => press(k)}
              aria-label={LABELS[k]}
              className={`rounded-xl py-2 text-lg font-semibold transition-colors sm:py-2.5 ${k === "=" ? "bg-linear-to-r from-brand to-brand-2 text-white" : op ? "bg-surface-2 hover:bg-line" : "bg-surface hover:bg-surface-2"}`}
            >
              {k}
            </button>
          );
        })}
        <button
          onClick={() => {
            setExpr("");
            setResult(null);
            setError(null);
          }}
          className="col-span-2 rounded-xl bg-surface py-2 text-sm font-semibold text-ink-2 hover:bg-surface-2"
        >
          Löschen
        </button>
        <button onClick={back} aria-label="Letztes Zeichen löschen" className="col-span-2 rounded-xl bg-surface py-2 text-sm font-semibold text-ink-2 hover:bg-surface-2">
          ⌫
        </button>
      </div>
    </div>
  );
}
