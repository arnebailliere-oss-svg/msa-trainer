/** "Über diese App": who makes it, how to reach them, and what the app does with data. */

import { Link } from "react-router-dom";
import { useApp } from "@/app/state";
import { APP_VERSION, COMPANY } from "@/core/company";
import { APP_NAME } from "@/core/edition";
import { DcsLogo } from "@/ui/Brand";
import { PageTitle } from "@/ui/primitives";

export function AboutView() {
  const { profile } = useApp();
  const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent(APP_NAME)}`;
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16" data-about>
      <div className="mt-4 text-sm text-ink-3">
        <Link to={profile ? "/home" : "/"} className="hover:text-ink">
          ← Zurück
        </Link>
      </div>
      <PageTitle title="Über diese App" eyebrow={APP_VERSION ? `${APP_NAME} · Version ${APP_VERSION}` : APP_NAME} />

      <section className="glass p-5">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <DcsLogo width={120} />
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-3">Ein Produkt von</div>
            <div className="text-xl font-bold">{COMPANY.short}</div>
            <div className="text-ink-2">{COMPANY.place}</div>
          </div>
        </div>
        <p className="mt-4 text-ink-2">
          Der MSA Trainer hilft Schülerinnen und Schülern, sich Schritt für Schritt auf den Mittleren Schulabschluss vorzubereiten. Er wird in {COMPANY.place.split(" ")[0]} entwickelt.
        </p>
      </section>

      <section className="glass mt-4 p-5">
        <h2 className="text-lg font-bold">Fragen oder ein Fehler in einer Aufgabe?</h2>
        <p className="mt-1 text-ink-2">Schreiben Sie uns. Es antwortet ein Mensch, auf Deutsch, in der Regel innerhalb von 48 Stunden.</p>
        <dl className="mt-3 grid gap-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-3">E-Mail</dt>
            <dd>
              <a href={mail} className="font-semibold underline">
                {COMPANY.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-3">Telefon</dt>
            <dd>{COMPANY.phone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-ink-3">Im Internet</dt>
            <dd>
              <a href={COMPANY.website} target="_blank" rel="noreferrer" className="font-semibold underline">
                {COMPANY.websiteLabel}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="glass mt-4 p-5">
        <h2 className="text-lg font-bold">Ihre Daten</h2>
        <p className="mt-1 text-ink-2">
          Diese App braucht kein Konto und keine Anmeldung. Namen, Antworten und Fortschritt werden nur auf diesem Gerät gespeichert. Die App sendet keine Daten an uns oder an andere.
        </p>
      </section>

      <section className="glass mt-4 p-5">
        <h2 className="text-lg font-bold">Impressum</h2>
        <address className="mt-2 not-italic text-ink-2">
          {COMPANY.name}
          <br />
          {COMPANY.division}
          <br />
          {COMPANY.address}
          <br />
          Tel: {COMPANY.phone}
          <br />
          {COMPANY.email}
          <br />
          {COMPANY.registration}
          <br />
          {COMPANY.owner}
        </address>
      </section>
    </div>
  );
}
