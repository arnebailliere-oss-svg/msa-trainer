/** Pocket calculator drawer for math sessions — uses the safe evaluator, no eval(). */

import { useState } from "react";
import { CalcError, calculate } from "@/core/calculator";
import { formatNumber } from "@/core/format";

const KEYS: (string | { k: string; ins: string })[][] = [
  ["(", ")", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ",", "^", "="],
];
const FN = [
  { k: "√", ins: "sqrt(" },
  { k: "sin", ins: "sin(" },
  { k: "cos", ins: "cos(" },
  { k: "tan", ins: "tan(" },
  { k: "π", ins: "π" },
  { k: "x²", ins: "^2" },
];

export function Calculator({ onClose }: { onClose?: () => void }) {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    if (!expr.trim()) return;
    try {
      const v = calculate(expr);
      setResult(formatNumber(v, 6));
      setError(null);
    } catch (e) {
      setError(e instanceof CalcError ? e.message : "Fehler");
      setResult(null);
    }
  };
  const press = (k: string) => {
    if (k === "=") return run();
    setError(null);
    setExpr((s) => s + k);
  };

  return (
    <div className="card-solid p-4 w-full sm:w-80" role="dialog" aria-label="Taschenrechner">
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
        }}
        onKeyDown={(e) => e.key === "Enter" && run()}
        placeholder="z. B. 12,5 · 4 + sin(30)"
        className="w-full rounded-xl border-2 border-line bg-surface px-3 py-2 text-lg outline-none focus:border-brand-2"
        aria-label="Ausdruck"
      />
      <div className="mt-2 h-9 text-right text-2xl font-bold">
        {result !== null && <span className="gradient-text">= {result}</span>}
        {error && <span className="text-base font-medium text-red">{error}</span>}
      </div>
      <div className="mt-2 grid grid-cols-6 gap-1.5">
        {FN.map((f) => (
          <button key={f.k} onClick={() => press(f.ins)} className="rounded-lg bg-surface py-1.5 text-sm font-semibold hover:bg-surface-2">
            {f.k}
          </button>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-4 gap-1.5">
        {KEYS.flat().map((key) => {
          const k = typeof key === "string" ? key : key.k;
          const ins = typeof key === "string" ? key : key.ins;
          const op = "÷×−+=^%()".includes(k);
          return (
            <button
              key={k}
              onClick={() => press(ins)}
              className={`rounded-xl py-2.5 text-lg font-semibold transition-colors ${k === "=" ? "bg-linear-to-r from-brand to-brand-2 text-white" : op ? "bg-surface-2 hover:bg-line" : "bg-surface hover:bg-surface-2"}`}
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
        <button onClick={() => setExpr((s) => s.slice(0, -1))} className="col-span-2 rounded-xl bg-surface py-2 text-sm font-semibold text-ink-2 hover:bg-surface-2">
          ⌫
        </button>
      </div>
    </div>
  );
}
