/** Interactive lesson explorers — sliders driving generated SVG figures. */

import { useState, type JSX } from "react";
import { coordinateSystem, rightTriangle } from "@/core/figures";
import { formatNumber } from "@/core/format";
import { MathText } from "./MathText";

function Slider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange(v: number): void }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-14 font-semibold">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-[var(--brand-2)]" aria-label={label} />
      <span className="w-14 text-right tabular-nums font-semibold">{formatNumber(value)}</span>
    </label>
  );
}

function Svg({ html }: { html: string }) {
  return <div className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function LineExplorer() {
  const [m, setM] = useState(1);
  const [n, setN] = useState(2);
  const x0 = m !== 0 ? -n / m : NaN;
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="grid gap-2">
        <MathText text={`$y = ${formatNumber(m)}x ${n >= 0 ? "+" : "−"} ${formatNumber(Math.abs(n))}$`} className="text-lg font-semibold" />
        <Slider label="m" value={m} min={-4} max={4} step={0.5} onChange={setM} />
        <Slider label="n" value={n} min={-5} max={5} step={1} onChange={setN} />
        <MathText
          className="text-sm text-ink-2"
          text={`Schnitt mit der y-Achse bei $(0 \\,|\\, ${formatNumber(n)})$. ${Number.isFinite(x0) ? `Nullstelle bei $x = ${formatNumber(x0, 2)}$.` : "Keine Nullstelle (waagerechte Gerade)."} Ein Schritt nach rechts = ${formatNumber(Math.abs(m))} nach ${m >= 0 ? "oben" : "unten"}.`}
        />
      </div>
      <Svg html={coordinateSystem({ type: "coordinateSystem", xmin: -6, xmax: 6, ymin: -6, ymax: 6, width: 260, height: 260, lines: [{ m, n, label: "f" }], points: [{ x: 0, y: n, label: "n" }] })} />
    </div>
  );
}

export function ParabolaExplorer() {
  const [a, setA] = useState(1);
  const [d, setD] = useState(0);
  const [e, setE] = useState(0);
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="grid gap-2">
        <MathText text={`$f(x) = ${formatNumber(a)} \\cdot (x ${d >= 0 ? "−" : "+"} ${formatNumber(Math.abs(d))})^2 ${e >= 0 ? "+" : "−"} ${formatNumber(Math.abs(e))}$`} className="text-lg font-semibold" />
        <Slider label="a" value={a} min={-3} max={3} step={0.25} onChange={setA} />
        <Slider label="d" value={d} min={-5} max={5} step={1} onChange={setD} />
        <Slider label="e" value={e} min={-5} max={5} step={1} onChange={setE} />
        <MathText
          className="text-sm text-ink-2"
          text={`Scheitelpunkt $S(${formatNumber(d)} \\,|\\, ${formatNumber(e)})$. ${a === 0 ? "a = 0: keine Parabel mehr." : `${a > 0 ? "Nach oben" : "Nach unten"} geöffnet, ${Math.abs(a) > 1 ? "gestreckt" : Math.abs(a) < 1 ? "gestaucht" : "Normalparabel"}.`}`}
        />
      </div>
      <Svg html={coordinateSystem({ type: "coordinateSystem", xmin: -6, xmax: 6, ymin: -6, ymax: 6, width: 260, height: 260, parabolas: [{ a, d, e, label: "f" }], points: [{ x: d, y: e, label: "S" }] })} />
    </div>
  );
}

export function TriangleExplorer() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(3);
  const c = Math.sqrt(a * a + b * b);
  const alpha = (Math.atan2(a, b) * 180) / Math.PI;
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="grid gap-2">
        <Slider label="a" value={a} min={1} max={10} step={0.5} onChange={setA} />
        <Slider label="b" value={b} min={1} max={10} step={0.5} onChange={setB} />
        <MathText text={`$c = \\sqrt{${formatNumber(a)}^2 + ${formatNumber(b)}^2} = \\sqrt{${formatNumber(a * a + b * b)}} \\approx ${formatNumber(c, 2)}$`} className="text-base" />
        <MathText text={`$\\tan\\alpha = \\frac{a}{b} = \\frac{${formatNumber(a)}}{${formatNumber(b)}} \\Rightarrow \\alpha \\approx ${formatNumber(alpha, 1)}°$`} className="text-base" />
      </div>
      <Svg html={rightTriangle({ type: "rightTriangle", a, b, labels: { a: `a = ${formatNumber(a)}`, b: `b = ${formatNumber(b)}`, c: `c ≈ ${formatNumber(c, 2)}`, alpha: "α", beta: "β" } })} />
    </div>
  );
}

const WIDGETS: Record<string, () => JSX.Element> = {
  "line-explorer": LineExplorer,
  "parabola-explorer": ParabolaExplorer,
  "triangle-explorer": TriangleExplorer,
};

export function LessonWidget({ id }: { id: string }) {
  const W = WIDGETS[id];
  if (!W) return <p className="text-sm text-red">Unbekanntes Widget „{id}“</p>;
  return <W />;
}

export const WIDGET_IDS = Object.keys(WIDGETS);
