/** Small UI primitives shared by all views. */

import type { AmpelState, Subject } from "@/core/types";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const SUBJECT_LABEL: Record<Subject, string> = { MATH: "Mathe", DE: "Deutsch", EN: "Englisch" };
export const SUBJECT_EMOJI: Record<Subject, string> = { MATH: "📐", DE: "📖", EN: "🇬🇧" };
export const AMPEL_LABEL: Record<AmpelState, string> = { RED: "Noch üben", YELLOW: "Fast sicher", GREEN: "Sicher" };

type Variant = "primary" | "accent" | "ghost" | "danger" | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  full?: boolean;
}

export function Button({ variant = "primary", size = "md", full, className = "", children, ...rest }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none select-none";
  const sizes = { sm: "px-3.5 py-2 text-sm", md: "px-5 py-3 text-base", lg: "px-7 py-4 text-lg" }[size];
  const variants: Record<Variant, string> = {
    primary: "text-white bg-linear-to-r from-brand to-brand-2 shadow-[0_8px_24px_-8px_var(--brand)] hover:brightness-110",
    accent: "text-white accent-gradient shadow-[0_8px_24px_-10px_var(--accent,var(--brand))] hover:brightness-110",
    ghost: "text-ink bg-surface hover:bg-surface-2",
    danger: "text-white bg-red hover:brightness-110",
    success: "text-[#062b1c] bg-green hover:brightness-110",
  };
  return (
    <button className={`${base} ${sizes} ${variants[variant]} ${full ? "w-full" : ""} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Card({ children, className = "", solid = false }: { children: ReactNode; className?: string; solid?: boolean }) {
  return <div className={`${solid ? "card-solid" : "glass"} p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function Chip({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: "neutral" | "red" | "yellow" | "green" | "brand"; className?: string }) {
  const tones = {
    neutral: "bg-surface-2 text-ink-2",
    red: "bg-red-soft text-red",
    yellow: "bg-yellow-soft text-yellow",
    green: "bg-green-soft text-green",
    brand: "bg-[color-mix(in_oklab,var(--brand)_18%,transparent)] text-brand-2",
  }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${tones} ${className}`}>{children}</span>;
}

export function Ampel({ state, size = 12 }: { state: AmpelState; size?: number }) {
  const color = { RED: "var(--red)", YELLOW: "var(--yellow)", GREEN: "var(--green)" }[state];
  return (
    <span
      aria-label={AMPEL_LABEL[state]}
      title={AMPEL_LABEL[state]}
      className="inline-block rounded-full shrink-0"
      style={{ width: size, height: size, background: color, boxShadow: `0 0 ${size}px ${color}66` }}
    />
  );
}

export function ProgressBar({ value, max, className = "", tone }: { value: number; max: number; className?: string; tone?: "brand" | "accent" }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className={`h-2.5 w-full rounded-full bg-surface-2 overflow-hidden ${className}`} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <div className={`h-full rounded-full transition-[width] duration-500 ${tone === "accent" ? "accent-gradient" : "bg-linear-to-r from-brand to-brand-2"}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Circular mastery ring 0..1 */
export function Ring({ value, size = 56, stroke = 6, color = "var(--brand-2)", children }: { value: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface-2)" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0, Math.min(1, value)))} className="transition-[stroke-dashoffset] duration-700" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-sm font-semibold">{children}</div>
    </div>
  );
}

export function PageTitle({ eyebrow, title, right }: { eyebrow?: string; title: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        {eyebrow && <div className="text-sm font-semibold uppercase tracking-wider text-ink-3 mb-1">{eyebrow}</div>}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">{title}</h1>
      </div>
      {right}
    </div>
  );
}

export function Spinner({ label = "Lädt…" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-ink-2 py-10 justify-center" role="status">
      <span className="h-5 w-5 rounded-full border-2 border-brand-2 border-t-transparent animate-spin" />
      {label}
    </div>
  );
}
