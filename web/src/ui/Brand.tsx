/** The maker's mark: the DCS logo on a light tile (it is dark blue), and the start screen of the apps. */

import { COMPANY } from "@/core/company";
import { APP_NAME } from "@/core/edition";

const base = (import.meta as { env?: Record<string, string | undefined> }).env?.BASE_URL ?? "/";

export function DcsLogo({ width = 120 }: { width?: number }) {
  return (
    <span className="inline-block rounded-2xl bg-white px-4 py-3 shadow-lg" style={{ width }}>
      <img src={`${base}brand/dcs-mark.png`} alt={COMPANY.short} className="block h-auto w-full" />
    </span>
  );
}

/** Shown while the app starts: the product first, then where it comes from. */
export function BrandSplash() {
  return (
    <div className="grid min-h-[100dvh] place-items-center px-6" role="status" aria-label={`${APP_NAME} startet`} data-splash>
      <div className="flex flex-col items-center text-center anim-pop">
        <div className="grid h-24 w-24 place-items-center rounded-[28px] bg-linear-to-br from-brand to-brand-2 text-5xl shadow-[0_20px_60px_-20px_var(--brand)]">🎓</div>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
          MSA <span className="gradient-text">Trainer</span>
        </h1>
        <p className="mt-1 text-ink-2">Für den Mittleren Schulabschluss</p>
        <span className="mt-8 h-5 w-5 rounded-full border-2 border-brand-2 border-t-transparent animate-spin" />
        <div className="mt-12 text-xs uppercase tracking-widest text-ink-3">Ein Produkt von</div>
        <div className="mt-3">
          <DcsLogo width={132} />
        </div>
        <div className="mt-3 text-sm text-ink-2">
          {COMPANY.short} · {COMPANY.place}
        </div>
      </div>
    </div>
  );
}
