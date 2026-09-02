/** Structured explanation / lesson sections rendered as styled blocks. */

import type { ContentSection } from "@/core/types";
import { MathText } from "./MathText";

const META: Record<ContentSection["kind"], { icon: string; title: string; tone: string; pre: boolean }> = {
  what: { icon: "🎯", title: "Was ist das?", tone: "border-brand-2", pre: false },
  terms: { icon: "📖", title: "Die Begriffe", tone: "border-ink-3", pre: false },
  formula: { icon: "📐", title: "Die Formel", tone: "border-brand", pre: true },
  steps: { icon: "✏️", title: "Rechnung", tone: "border-brand", pre: true },
  mistake: { icon: "⚠️", title: "Typischer Fehler", tone: "border-yellow", pre: false },
  remember: { icon: "💡", title: "Merke", tone: "border-green", pre: false },
  answer: { icon: "✅", title: "Antwort", tone: "border-green", pre: false },
  example: { icon: "🧩", title: "Beispiel", tone: "border-brand-2", pre: true },
  text: { icon: "", title: "", tone: "border-line", pre: false },
};

export function ExplanationBlocks({ sections, compact = false }: { sections: ContentSection[]; compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "" : "sm:gap-4"}`}>
      {sections.map((s, i) => {
        const m = META[s.kind];
        const title = s.title ?? m.title;
        return (
          <section key={i} className={`rounded-2xl border-l-4 bg-surface px-4 py-3 ${m.tone} anim-pop`} style={{ animationDelay: `${Math.min(i, 6) * 40}ms` }}>
            {(title || m.icon) && (
              <h3 className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-2">
                {m.icon && <span aria-hidden>{m.icon}</span>}
                {title}
              </h3>
            )}
            <MathText text={s.body} pre={m.pre} className="text-[1.02rem] leading-relaxed" />
          </section>
        );
      })}
    </div>
  );
}
