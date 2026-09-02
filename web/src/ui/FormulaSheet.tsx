/** The official formula sheet, rendered from lesson L_MATH_FORMELBLATT — as a page or a slide-over inside a session. */

import { useApp } from "@/app/state";
import { renderFigureSpec } from "@/core/variants";
import { ExplanationBlocks } from "./Explanation";
import { MathText } from "./MathText";

export const FORMULA_LESSON_ID = "L_MATH_FORMELBLATT";

export function FormulaSheetContent() {
  const { content } = useApp();
  const lesson = content?.lessonById(FORMULA_LESSON_ID);
  if (!lesson) return <p className="text-ink-2">Formelblatt nicht gefunden.</p>;
  const sections = lesson.sections.map((s) => ({ ...s, figureSvg: s.figure ? renderFigureSpec(s.figure, {}) : undefined }));
  return (
    <div>
      {lesson.intro && <MathText text={lesson.intro} className="mb-4 text-ink-2" />}
      <ExplanationBlocks sections={sections} compact />
      {lesson.source && <p className="mt-3 text-xs text-ink-3">{lesson.source}</p>}
    </div>
  );
}

/** Slide-over used during sessions so the current question is not lost. */
export function FormulaSheetDrawer({ onClose }: { onClose(): void }) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/40" onClick={onClose} role="presentation">
      <aside className="h-full w-full max-w-lg overflow-y-auto bg-bg-2 p-5 shadow-2xl anim-pop" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Formelblatt">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">📐 Formelblatt</h2>
          <button onClick={onClose} className="rounded-xl px-3 py-1 text-ink-3 hover:bg-surface hover:text-ink" aria-label="Schließen">
            ✕
          </button>
        </div>
        <FormulaSheetContent />
      </aside>
    </div>
  );
}
