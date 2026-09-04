/**
 * The one place where the app explains itself.
 *
 * Every section is written once here and shown twice: as a step of the welcome
 * tour a new profile sees on the dashboard (`WelcomeTour`), and as a chapter of
 * the permanent help page `#/hilfe` (`HelpView`). The little `demo` blocks are
 * non-interactive replicas of the real controls, so a student recognises the
 * button when they later see it for real.
 */

import type { ReactNode } from "react";
import type { Subject } from "@/core/types";
import { OwlAvatar, OWL_NAME } from "./Owl";
import { Ampel, AMPEL_LABEL, Ring, SUBJECT_EMOJI, SUBJECT_LABEL } from "./primitives";

export interface GuideSection {
  id: string;
  emoji: string;
  title: string;
  /** The core message. Shown in the tour and as the first paragraph on the help page. */
  lead: string;
  /** Extra detail — help page only. */
  more?: ReactNode;
  /** A replica of the real UI element this section talks about. */
  demo?: ReactNode;
  /** Part of the first-run tour. */
  tour?: boolean;
}

/* ---------- demo pieces ---------------------------------------------------- */

function Demo({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-line bg-surface p-3">
      {label && <div className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-ink-3">{label}</div>}
      <div aria-hidden>{children}</div>
    </div>
  );
}

function SubjectTabs() {
  const subjects: Subject[] = ["MATH", "DE", "EN"];
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((s, i) => (
        <span key={s} className={`subject-${s} flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold ${i === 0 ? "accent-gradient text-white shadow-lg" : "bg-surface-2 text-ink-2"}`}>
          <span>{SUBJECT_EMOJI[s]}</span>
          {SUBJECT_LABEL[s]}
        </span>
      ))}
    </div>
  );
}

function OwlButton() {
  return (
    <span className="inline-flex items-center gap-3 rounded-2xl border border-yellow/40 bg-yellow-soft px-4 py-2 font-semibold">
      <OwlAvatar size={40} />
      <span>
        Frag {OWL_NAME}
        <span className="block text-xs font-normal text-ink-2">Grundlagen von Anfang an, Tafel für Tafel</span>
      </span>
    </span>
  );
}

function Ladder() {
  const steps = [
    { emoji: "🦉", label: "Eulen-Lektion", sub: "von ganz vorn" },
    { emoji: "📘", label: "Lektion", sub: "Regeln + Beispiele" },
    { emoji: "✏️", label: "Aufgaben", sub: "selber rechnen" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={s.label} className="flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-2xl bg-surface-2 px-3 py-2">
            <span className="text-xl">{s.emoji}</span>
            <span className="text-sm">
              <span className="block font-semibold leading-tight">{s.label}</span>
              <span className="block text-xs text-ink-3">{s.sub}</span>
            </span>
          </span>
          {i < steps.length - 1 && <span className="text-ink-3">→</span>}
        </span>
      ))}
    </div>
  );
}

function ModeCards() {
  const modes = [
    { emoji: "⚡", title: "Schnelltraining", desc: "10 Aufgaben, die App sucht deine Schwächen" },
    { emoji: "🩹", title: "Fehler-Training", desc: "nur die Themen, die gerade rot sind" },
    { emoji: "🏁", title: "Prüfungs-Modus", desc: "Originalaufgaben mit Stoppuhr" },
  ];
  return (
    <div className="subject-MATH grid gap-2 sm:grid-cols-3">
      {modes.map((m, i) => (
        <span key={m.title} className={`rounded-2xl p-3 ${i === 0 ? "accent-gradient text-white" : "bg-surface-2"}`}>
          <span className="block text-2xl">{m.emoji}</span>
          <span className="block font-bold leading-tight">{m.title}</span>
          <span className={`block text-xs ${i === 0 ? "text-white/85" : "text-ink-2"}`}>{m.desc}</span>
        </span>
      ))}
    </div>
  );
}

function AmpelLegend() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Ring value={0.78} size={64} color="var(--green)">
        78%
      </Ring>
      <div className="grid gap-1.5 text-sm">
        <span className="flex items-center gap-2">
          <Ampel state="RED" /> {AMPEL_LABEL.RED} — Neu oder Angefangen
        </span>
        <span className="flex items-center gap-2">
          <Ampel state="YELLOW" /> {AMPEL_LABEL.YELLOW} — Geübt: 4 der letzten 6 richtig
        </span>
        <span className="flex items-center gap-2">
          <Ampel state="GREEN" /> {AMPEL_LABEL.GREEN} — 5 der letzten 6 richtig, 2 davon auf Prüfungsniveau, an 2 Tagen
        </span>
      </div>
    </div>
  );
}

function RepairBanner() {
  return (
    <span className="flex items-center gap-3 rounded-2xl bg-yellow-soft px-4 py-3 text-sm">
      <span className="text-xl">🩹</span>
      <span>
        <strong>Reparatur-Modus.</strong> Noch 2 leichtere Aufgaben zum Thema, dann eine Transferaufgabe.
      </span>
    </span>
  );
}

function ToolBar() {
  return (
    <div className="subject-MATH flex items-center gap-2 rounded-2xl border border-line bg-bg-2 p-2">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-xl">🧮</span>
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-xl">📐</span>
      <span className="accent-gradient flex-1 rounded-2xl px-4 py-3 text-center font-semibold text-white">Antwort prüfen</span>
    </div>
  );
}

function Key({ children }: { children: ReactNode }) {
  return <kbd className="rounded-lg border border-line bg-surface-2 px-2 py-0.5 font-sans text-sm font-semibold">{children}</kbd>;
}

function CalcTable() {
  const rows: [string, string][] = [
    ["Komma statt Punkt", "12,5*4"],
    ["Mal und Geteilt", "7*8  ·  144:12"],
    ["Wurzel", "sqrt(49)"],
    ["Potenz", "2^10"],
    ["Sinus, Kosinus, Tangens — in Grad", "sin(30)  ergibt  0,5"],
    ["Kreiszahl", "pi  oder  π"],
    ["Prozent heißt „geteilt durch 100“", "250*20%  ergibt  50"],
  ];
  return (
    <dl className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-[1fr_auto]">
      {rows.map(([what, how]) => (
        <div key={what} className="contents">
          <dt className="text-sm text-ink-2">{what}</dt>
          <dd className="mb-2 font-mono text-sm sm:mb-0">{how}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- the guide ------------------------------------------------------ */

export const GUIDE: GuideSection[] = [
  {
    id: "willkommen",
    emoji: "👋",
    title: "Willkommen im MSA Trainer",
    lead: "Hier übst du für den Mittleren Schulabschluss in Berlin — Mathe, Deutsch und Englisch. Du bekommst eine Aufgabe, tippst deine Antwort ein und siehst sofort, ob es stimmt, mit der Lösung Schritt für Schritt.",
    more: (
      <>
        <p>
          Das Besondere: Die App merkt sich für jedes Thema, wie sicher du bist, und gibt dir beim nächsten Mal mehr von dem, was noch wackelt. Du musst dir also nicht selbst überlegen, was du üben solltest — drück auf Schnelltraining und leg los.
        </p>
        <p className="mt-2">
          Kein Konto, keine Anmeldung, keine Cloud. Alles bleibt auf diesem Gerät. Und du kannst dir jederzeit hier alles noch einmal durchlesen: das <strong>❓</strong> oben rechts führt immer hierher zurück.
        </p>
      </>
    ),
    tour: true,
  },
  {
    id: "faecher",
    emoji: "🎒",
    title: "Fach wechseln: Mathe, Deutsch, Englisch",
    lead: "Auf der Startseite stehen direkt unter deinem Namen drei Knöpfe. Tipp auf „📖 Deutsch“ oder „🇬🇧 Englisch“ — und alles darunter wechselt mit: die Themenliste, die Aufgaben und die Trainings-Knöpfe.",
    demo: (
      <Demo label="So sieht es auf der Startseite aus">
        <SubjectTabs />
      </Demo>
    ),
    more: (
      <>
        <p>
          Jedes Fach hat seine eigene Farbe: Mathe blau, Deutsch pink, Englisch grün. Woran du gerade arbeitest, siehst du also auf einen Blick. Die App merkt sich dein zuletzt gewähltes Fach — beim nächsten Öffnen bist du direkt wieder da.
        </p>
        <p className="mt-2">
          Mathe ist am weitesten ausgebaut (Lektionen, Formelblatt, Original-Prüfungen). Deutsch und Englisch wachsen Schritt für Schritt nach.
        </p>
      </>
    ),
    tour: true,
  },
  {
    id: "ferdinand",
    emoji: "🦉",
    title: `Frag ${OWL_NAME} — wenn du gar nichts verstehst`,
    lead: `${OWL_NAME} ist die Eule. Er erklärt ein Thema von ganz vorn an der Kreidetafel: eine Idee pro Tafel, in normaler Sprache, ohne dass du vorher irgendetwas können musst. Am Ende kommen die wichtigen Wörter und ein kurzes Quiz.`,
    demo: (
      <Demo label="Der gelbe Knopf auf der Startseite">
        <OwlButton />
      </Demo>
    ),
    more: (
      <>
        <p>
          Du kommst auf zwei Wegen zu ihm: über den gelben Knopf auf der Startseite (dort stehen alle Eulen-Lektionen der Reihe nach, von ganz einfach nach schwerer) — oder über das kleine Eulen-Abzeichen, das mitten in einer Lektion an den schwierigen Stellen auftaucht: „Zu schwer? Frag {OWL_NAME}“.
        </p>
        <p className="mt-2">
          Klick auf <em>Weiter</em>, und die Tafel wird gewischt. Mit den Pfeiltasten <Key>←</Key> <Key>→</Key> gehst du vor und zurück, im Quiz wählst du mit <Key>1</Key>–<Key>5</Key>. Ab 80 % richtig gilt die Lektion als geschafft und bekommt ein ✓ — angucken darfst du sie trotzdem so oft du willst. Im Quiz gibt es keine Noten und nichts geht kaputt.
        </p>
      </>
    ),
    tour: true,
  },
  {
    id: "lernen",
    emoji: "🪜",
    title: "Drei Stufen: Eule → Lektion → Aufgaben",
    lead: "Bei jedem Thema kannst du dort einsteigen, wo du gerade stehst. Verstehst du nichts, fängst du bei der Eule an. Kennst du die Idee schon, liest du die Lektion. Willst du nur üben, gehst du direkt auf „Üben“.",
    demo: (
      <Demo>
        <Ladder />
      </Demo>
    ),
    more: (
      <>
        <p>
          In der Themenliste auf der Startseite steht bei jedem Thema, wie viele Aufgaben es gibt und ob es eine <strong>📘 Lektion</strong> dazu gibt. Ein Klick auf den Namen öffnet die Lektion mit Regeln, Beispielen, Zeichnungen und teilweise kleinen Reglern zum Ausprobieren. Der Knopf <strong>Üben</strong> daneben startet sofort die Aufgaben.
        </p>
        <p className="mt-2">
          Und selbst wenn du direkt loslegst, wirst du nicht allein gelassen: Nach jeder Aufgabe steht die vollständige Erklärung da, und darunter der Link zur passenden Lektion.
        </p>
        <p className="mt-2">
          <strong>Schreibaufgaben</strong> (E-Mail, Blog-Antwort, Mediation, Schreibplan, Erörterung) prüft die App nach den Regeln der echten Prüfung: Wortzahl, alle Fragen beantwortet, Anrede und Schluss, Pro und Kontra, Belege. Das ist die Inhaltshälfte der Punkte. Rechtschreibung und Grammatik kann sie nicht bewerten — dafür bekommst du die Musterlösung zum Vergleich und Hinweise auf typische Fehler.
        </p>
      </>
    ),
  },
  {
    id: "modi",
    emoji: "⚡",
    title: "Die vier Arten zu üben",
    lead: "Ganz oben stehen drei Trainings-Knöpfe, dazu kommt das Üben eines einzelnen Themas. Für jeden Tag ist etwas dabei: schnell zwischendurch, gezielt gegen Fehler oder einmal ernst wie in der Prüfung.",
    demo: (
      <Demo>
        <ModeCards />
      </Demo>
    ),
    more: (
      <ul className="mt-1 grid gap-2">
        <li>
          <strong>⚡ Schnelltraining</strong> — 10 Aufgaben quer durch das Fach. Die App sucht sie selbst aus: was du schlecht kannst, was du oft falsch hattest und was du lange nicht geübt hast, kommt zuerst. Der normale Weg, wenn du einfach loslegen willst.
        </li>
        <li>
          <strong>🩹 Fehler-Training</strong> — 10 Aufgaben nur aus den Themen, die gerade auf Rot stehen. Der Knopf sagt dir, um wie viele Themen es geht.
        </li>
        <li>
          <strong>🏁 Prüfungs-Modus</strong> — 10 echte Aufgaben aus den MSA-Prüfungen 2023 bis 2025, mit Stoppuhr oben in der Ecke. Wie in der richtigen Prüfung sind die ersten Aufgaben <em>Basisaufgaben</em>: hilfsmittelfrei, der Taschenrechner ist gesperrt. Danach kommen die Sachaufgaben, dann darfst du ihn wieder benutzen. Am Ende siehst du jede Aufgabe einzeln mit Zeit und richtiger Lösung.
        </li>
        <li>
          <strong>✏️ Thema üben</strong> — 8 Aufgaben zu genau einem Thema. Über den Knopf <em>Üben</em> in der Themenliste oder <em>Jetzt üben</em> unten auf der Themenseite.
        </li>
      </ul>
    ),
    tour: true,
  },
  {
    id: "ampel",
    emoji: "🚦",
    title: "Ampel, Stufen und Prüfungsreife",
    lead: "Neben jedem Thema steht ein Punkt: rot, gelb oder grün, und eine Stufe: Neu, Angefangen, Geübt, Sicher oder Prüfungsfest. Die Stufe zählt nur, was du zuletzt gezeigt hast — deine letzten 6 Antworten im Thema — nicht, wie viele Aufgaben du insgesamt gemacht hast.",
    demo: (
      <Demo>
        <AmpelLegend />
      </Demo>
    ),
    more: (
      <>
        <p>
          <strong>Sicher</strong> wirst du, wenn 5 deiner letzten 6 Antworten richtig sind, mindestens 2 davon auf Prüfungsniveau, und das an zwei verschiedenen Tagen. Wer ein Thema kann, schafft das in 6 bis 8 Aufgaben. <strong>Prüfungsfest</strong> wird es, wenn du ein paar Tage später noch einmal eine schwere Aufgabe richtig löst. Lässt du ein sicheres Thema zwei Wochen liegen, fragt der Tagesplan mit einer kurzen Kontrollaufgabe nach.
        </p>
        <p className="mt-2">
          Der Ring oben auf der Startseite ist deine <strong>Prüfungsreife</strong>: der Anteil der Themen, die sicher sind — wichtige Prüfungsthemen (⭐) zählen mehr. Ab 85 %, wenn alle ⭐-Themen sicher sind und du einen Prüfungs-Modus bestanden hast, bist du <strong>prüfungsreif</strong>. Daneben steht, wie viele Aufgaben und Tage ungefähr noch fehlen. Der Weg dorthin ist die Karte <strong>📅 Heute</strong>: 12 Aufgaben pro Tag, von der App zusammengestellt — fällige Kontrollen, deine Fehler, dann die nächsten Themen.
        </p>
      </>
    ),
    tour: true,
  },
  {
    id: "werkzeuge",
    emoji: "🧮",
    title: "Taschenrechner und Formelblatt",
    lead: "In jeder Mathe-Aufgabe sitzen unten links zwei Knöpfe: 🧮 öffnet den Taschenrechner, 📐 zieht das Formelblatt von der Seite herein. Beide kannst du offen lassen — die Aufgabe bleibt stehen.",
    demo: (
      <Demo label="Die Leiste am unteren Bildschirmrand">
        <ToolBar />
      </Demo>
    ),
    more: (
      <>
        <p>
          <strong>🧮 Der Taschenrechner</strong> rechnet Punkt vor Strich und versteht Klammern. Du kannst die Tasten antippen oder direkt ins Feld tippen:
        </p>
        <CalcTable />
        <p className="mt-3">
          Nur bei den Basisaufgaben im Prüfungs-Modus ist er gesperrt — dann steht über der Aufgabe „🚫🧮 ohne Taschenrechner“, genau wie im echten Teil 1.
        </p>
        <p className="mt-3">
          <strong>📐 Das Formelblatt</strong> ist dasselbe, das du in der Prüfung auf den Tisch bekommst: Flächen, Körper, Prozent, Pythagoras, Winkelfunktionen, mit Skizze zu jeder Formel. Gewöhn dich früh daran, dort nachzuschlagen, statt Formeln auswendig zu lernen. Außerhalb einer Aufgabe erreichst du es über <strong>📐 Formelblatt ansehen</strong> auf der Startseite.
        </p>
      </>
    ),
    tour: true,
  },
  {
    id: "reparatur",
    emoji: "🩹",
    title: "Der Reparatur-Modus",
    lead: "Wenn du eine Aufgabe falsch hast, springt die App nicht einfach weiter. Sie gibt dir erst zwei leichtere Aufgaben zum selben Thema und danach eine Transferaufgabe aus einem verwandten Thema.",
    demo: (
      <Demo label="Dieser Streifen erscheint dann über der Aufgabe">
        <RepairBanner />
      </Demo>
    ),
    more: (
      <p>
        Löst du die Transferaufgabe richtig, bist du wieder draußen und es geht normal weiter. Klappt sie nicht, fängt die Reparatur eine Stufe leichter noch einmal an. Das ist keine Strafe — es ist der schnellste Weg, eine Lücke wirklich zuzumachen, statt sie mitzuschleppen.
      </p>
    ),
  },
  {
    id: "tastatur",
    emoji: "⌨️",
    title: "Schneller mit der Tastatur",
    lead: "Am Laptop musst du nicht klicken.",
    more: (
      <ul className="mt-1 grid gap-1.5">
        <li>
          <Key>Enter</Key> — Antwort prüfen, und danach zur nächsten Aufgabe.
        </li>
        <li>
          <Key>←</Key> <Key>→</Key> — in den Eulen-Lektionen eine Tafel zurück oder vor.
        </li>
        <li>
          <Key>1</Key>–<Key>5</Key> — im Eulen-Quiz die Antwort wählen.
        </li>
        <li>
          <Key>🌗</Key> oben rechts — zwischen hell, dunkel und „wie das Gerät“ wechseln.
        </li>
      </ul>
    ),
  },
  {
    id: "fortschritt",
    emoji: "💾",
    title: "Dein Fortschritt gehört dir",
    lead: "Alles, was du übst, wird nur in diesem Browser gespeichert. Kein Konto, keine Cloud, niemand sieht deine Ergebnisse. Der Nachteil: Wenn du den Browser-Speicher löschst, ist auch der Fortschritt weg.",
    demo: undefined,
    more: (
      <>
        <p>
          Unter <strong>Fortschritt</strong> (oben rechts) siehst du jede Zahl im Detail und kannst dir eine <strong>Sicherung</strong> als Datei herunterladen — die lädst du auf einem anderen Gerät oder nach einem Neustart einfach wieder hoch.
        </p>
        <p className="mt-2">
          Mehrere Leute an einem Gerät? Über deinen Namen oben rechts kommst du zurück zur Profil-Auswahl und legst weitere Profile an. Jedes hat seinen eigenen Fortschritt.
        </p>
      </>
    ),
    tour: true,
  },
  {
    id: "offline",
    emoji: "📲",
    title: "Aufs Handy legen und offline üben",
    lead: "Der MSA Trainer ist eine Web-App: keine Installation aus einem Store nötig, aber du kannst ihn trotzdem wie eine App aufs Handy legen.",
    more: (
      <>
        <p>
          <strong>iPhone (Safari):</strong> Teilen-Symbol → „Zum Home-Bildschirm“. <strong>Android (Chrome):</strong> Menü ⋮ → „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.
        </p>
        <p className="mt-2">Danach startet er im Vollbild, und die Aufgaben sind auch ohne Internet da — im Bus, im Zug, im Funkloch.</p>
      </>
    ),
  },
];

export const TOUR_STEPS = GUIDE.filter((s) => s.tour);
