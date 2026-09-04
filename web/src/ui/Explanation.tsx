/** Structured explanation / lesson sections rendered as styled blocks. */

import type { ContentSection, FigureSpec } from "@/core/types";
import { renderFigureSpec } from "@/core/variants";
import { MathText } from "./MathText";

/** Render a static figure spec (lessons); never throws in the UI. */
function safeFigure(spec: FigureSpec | undefined): string | undefined {
  if (!spec) return undefined;
  try {
    return renderFigureSpec(spec, {});
  } catch {
    return undefined;
  }
}
import { AskOwl } from "./Owl";
import { LessonWidget } from "./widgets";

const META: Record<ContentSection["kind"], { icon: string; title: string; tone: string; pre: boolean }> = {
  widget: { icon: "🎛️", title: "Probier es aus", tone: "border-brand-2", pre: false },
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
        const figureSvg = s.figureSvg ?? safeFigure(s.figure);
        return (
          <section key={i} className={`overflow-x-auto rounded-2xl border-l-4 bg-surface px-4 py-3 ${m.tone} anim-pop`} style={{ animationDelay: `${Math.min(i, 6) * 40}ms` }}>
            {(title || m.icon) && (
              <h3 className="mb-1 flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-2">
                {m.icon && <span aria-hidden>{m.icon}</span>}
                {title}
                {s.primer && (
                  <span className="ml-auto">
                    <AskOwl primerId={s.primer} />
                  </span>
                )}
              </h3>
            )}
            {s.kind === "widget" ? <LessonWidget id={s.body.trim()} /> : <MathText text={s.body} pre={m.pre} className="text-[1.02rem] leading-relaxed" />}
            {figureSvg && <div className="mt-3 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: figureSvg }} />}
            {s.figures && s.figures.length > 0 && (
              <div className={`mt-3 grid gap-3 ${s.figures.length === 1 ? "" : s.figures.length === 2 || s.figures.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {s.figures.map((g, j) => {
                  const svg = safeFigure(g.figure);
                  if (!svg) return null;
                  return (
                    <figure key={j} className="rounded-2xl bg-surface-2/60 p-2 text-center">
                      <div className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
                      {g.caption && <MathText text={g.caption} className="mt-1 text-sm text-ink-2" />}
                    </figure>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
