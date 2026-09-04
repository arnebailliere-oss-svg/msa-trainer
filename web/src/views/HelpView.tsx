/** `#/hilfe` — the permanent welcome and how-to page. Reachable with or without a profile. */

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/app/state";
import { GUIDE } from "@/ui/guide";
import { OWL_NAME, OwlAvatar, OwlBubble } from "@/ui/Owl";
import { Button, PageTitle } from "@/ui/primitives";

export function HelpView() {
  const { profile } = useApp();
  const nav = useNavigate();
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const jump = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      <div className="mt-4 text-sm text-ink-3">
        <Link to={profile ? "/home" : "/"} className="hover:text-ink">
          ← {profile ? "Übersicht" : "Startseite"}
        </Link>
      </div>
      <PageTitle eyebrow="Hilfe" title="So funktioniert der MSA Trainer" right={<OwlAvatar size={56} />} />

      <OwlBubble className="mb-6">
        Hallo, ich bin {OWL_NAME}. Auf dieser Seite steht alles, was du über die App wissen musst: wo du das Fach wechselst, was meine Eulen-Lektionen sind, wie die Trainings funktionieren und wo Taschenrechner und Formelblatt stecken. Lies, was dich interessiert — der Rest läuft von selbst.
      </OwlBubble>

      <nav aria-label="Inhalt" className="mb-8 flex flex-wrap gap-2">
        {GUIDE.map((s) => (
          <button key={s.id} onClick={() => jump(s.id)} className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
            {s.emoji} {s.title}
          </button>
        ))}
      </nav>

      {GUIDE.map((s) => (
        <section
          key={s.id}
          ref={(el) => {
            refs.current[s.id] = el;
          }}
          className="mb-8 scroll-mt-4"
        >
          <h2 className="text-2xl font-extrabold tracking-tight">
            <span className="mr-2">{s.emoji}</span>
            {s.title}
          </h2>
          <p className="mt-2 leading-relaxed">{s.lead}</p>
          {s.demo}
          {s.more && <div className="mt-3 leading-relaxed text-ink-2 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:pl-5">{s.more}</div>}
        </section>
      ))}

      <div className="glass mt-10 flex flex-wrap items-center gap-3 p-5">
        <OwlAvatar size={44} />
        <p className="min-w-0 flex-1 text-ink-2">{profile ? "Noch Fragen? Klick dich einfach durch die kurze Tour — die zeigt dir die wichtigsten Knöpfe direkt auf der Startseite." : "Leg dir ein Profil an, dann kann es losgehen. Deine Ergebnisse bleiben auf diesem Gerät."}</p>
        {profile ? (
          <Button variant="accent" onClick={() => nav("/home", { state: { tour: true } })}>
            Tour noch einmal ansehen
          </Button>
        ) : (
          <Button variant="accent" onClick={() => nav("/")}>
            Profil anlegen →
          </Button>
        )}
      </div>
    </div>
  );
}
