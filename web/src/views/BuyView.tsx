/** The unlock screen: shown wherever a locked lesson, topic or training is opened. */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PURCHASE_AVAILABLE, lockAgain, purchase, useAccess } from "@/app/entitlement";
import { useApp } from "@/app/state";
import { freePrimerId, freeTopicId } from "@/core/access";
import { APP_NAME, EDITION_SUBJECTS, SINGLE_SUBJECT } from "@/core/edition";
import { Button, SUBJECT_EMOJI, SUBJECT_LABEL } from "@/ui/primitives";

const PRODUCT = SINGLE_SUBJECT ? APP_NAME : "MSA Trainer Komplett";

export function BuyView({ what }: { what?: string }) {
  const { content } = useApp();
  const access = useAccess();
  const nav = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  if (!content) return null;

  const owned = EDITION_SUBJECTS.every((s) => access.has(s));
  const primers = content.primers.filter((p) => EDITION_SUBJECTS.includes(p.subject)).length;
  const questions = EDITION_SUBJECTS.reduce((n, s) => n + content.questionsBySubject(s).length, 0);
  const topics = EDITION_SUBJECTS.reduce((n, s) => n + content.practicableTopics(s).length, 0);

  const buy = async () => {
    const ok = await purchase();
    setMessage(ok ? null : "Der Kauf ist in dieser Vorab-Version noch nicht möglich.");
    if (ok) nav("/home");
  };

  return (
    <div className="mx-auto max-w-xl px-4 pb-16" data-buy>
      <div className="mt-4 text-sm text-ink-3">
        <Link to="/home" className="hover:text-ink">
          ← Übersicht
        </Link>
      </div>
      <div className="glass mt-4 p-6 text-center anim-pop">
        <div className="text-5xl" aria-hidden>
          {owned ? "✅" : "🔒"}
        </div>
        <h1 className="mt-3 text-2xl font-extrabold">{owned ? `${PRODUCT} ist freigeschaltet` : `${PRODUCT} freischalten`}</h1>
        {!owned && <p className="mt-2 text-ink-2">{what ? `${what} gehört zur Vollversion.` : "Du nutzt gerade die Gratis-Version."}</p>}

        <ul className="mx-auto mt-5 grid max-w-sm gap-2 text-left">
          <li>🦉 {primers} Eulen-Lektionen, Tafel für Tafel von Anfang an</li>
          <li>✏️ {questions} Aufgaben zu {topics} Themen, mit Lösung Schritt für Schritt</li>
          <li>📅 Tagesplan, Schnelltraining und Fehler-Training</li>
          <li>🏁 Prüfungs-Modus wie im MSA</li>
          {!SINGLE_SUBJECT && <li>🎒 Alle Fächer: {EDITION_SUBJECTS.map((s) => SUBJECT_LABEL[s]).join(", ")}</li>}
        </ul>
        <p className="mt-4 text-sm text-ink-2">Einmal kaufen, für immer nutzen. Kein Abo, kein Konto. Läuft ohne Internet.</p>

        {!owned && (
          <Button variant="primary" size="lg" full className="mt-5" onClick={buy} data-buy-button>
            Jetzt freischalten
          </Button>
        )}
        {message && (
          <p className="mt-3 text-sm text-ink-2" role="status">
            {message}
          </p>
        )}
        {owned && PURCHASE_AVAILABLE && (
          <button className="mt-4 text-sm text-ink-3 underline" onClick={lockAgain}>
            Test: wieder sperren
          </button>
        )}
      </div>

      {!owned && (
        <div className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-ink-3">Gratis ausprobieren</h2>
          <div className="grid gap-2">
            {EDITION_SUBJECTS.filter((s) => !access.has(s)).map((s) => {
              const primer = content.primerById(freePrimerId(content, s) ?? "");
              const topic = content.topicById(freeTopicId(content, s) ?? "");
              return (
                <div key={s} className={`subject-${s} grid gap-2`}>
                  {primer && (
                    <Link to={`/eule/${primer.id}`} className="card-solid flex items-center gap-3 p-3.5">
                      <span className="text-2xl">🦉</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{primer.title}</span>
                        <span className="block text-xs text-ink-3">
                          {SUBJECT_EMOJI[s]} {SUBJECT_LABEL[s]} · erste Eulen-Lektion
                        </span>
                      </span>
                    </Link>
                  )}
                  {topic && (
                    <Link to={`/topic/${topic.id}`} className="card-solid flex items-center gap-3 p-3.5">
                      <span className="text-2xl">✏️</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{topic.name}</span>
                        <span className="block text-xs text-ink-3">
                          {SUBJECT_EMOJI[s]} {SUBJECT_LABEL[s]} · Thema zum Üben
                        </span>
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
