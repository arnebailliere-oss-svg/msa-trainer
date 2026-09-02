import { Link } from "react-router-dom";
import { FormulaSheetContent } from "@/ui/FormulaSheet";
import { PageTitle } from "@/ui/primitives";

export function FormulaView() {
  return (
    <div className="subject-MATH mx-auto max-w-3xl px-4 pb-16">
      <div className="mt-4 text-sm text-ink-3">
        <Link to="/home" className="hover:text-ink">
          ← Übersicht
        </Link>
      </div>
      <PageTitle eyebrow="Mathe" title="📐 Formelblatt" />
      <FormulaSheetContent />
    </div>
  );
}
