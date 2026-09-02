# MSA Trainer Berlin

Web-App zur Vorbereitung auf den Mittleren Schulabschluss (MSA) in Berlin — Mathe, Deutsch, Englisch.
Prinzip: **Lernen → Üben (immer neue Zahlen) → Wiederholen** (Mastery-Score, Ampel, Reparatur-Modus nach Fehlern).

Läuft als statische PWA (offline-fähig) auf GitHub Pages. Fortschritt bleibt im Browser des Geräts — kein Konto, keine Cloud.

## Schnellstart (Entwicklung)

```bash
cd web
npm install
npm run content      # Inhalte validieren und nach public/content bauen
npm run dev          # http://127.0.0.1:5173/
```

Weitere Befehle (in `web/`):

| Befehl | Zweck |
|---|---|
| `npm test` | Unit-Tests der Kern-Engine (Vitest) |
| `npm run typecheck` | `tsc -b` |
| `npm run content -- --check` | Inhalte nur prüfen (Schema, Semantik, 60 Varianten pro Template, KaTeX, Figuren) |
| `npm run build` | Inhalte + Produktions-Build nach `dist/` |
| `npm run e2e:desktop` | Playwright-Smoke-Test (baut Screenshots nach `e2e/screenshots/`) |

Vorschau einzelner Aufgaben (mit Varianten): `http://127.0.0.1:5173/#/preview/<question-id>`

## Struktur

```
web/                         Vite + React + TypeScript + Tailwind + KaTeX
  src/core/                  Engine (kein React): mastery, selection, repair, variants, evaluators, figures, calculator
  src/app/                   Content-Loader, Persistenz (IndexedDB), App-State
  src/ui/                    Renderer (MCQ/SHORT/CLOZE/MATCH), MathText, Explanation, Widgets, Calculator
  src/views/                 Start, Dashboard, Topic/Lektion, Session, Result, Overview, Preview
  scripts/build-content.ts   Content-Pipeline + Validator
  e2e/                       Playwright
content_packs/berlin_msa/    Inhalte (v2): topics.json, questions/*.json, lessons/*.json
content_packs/schema.v2.json JSON-Schema der Inhalte
docs/KANBAN.md               Projekt-Board (Stand, Entscheidungen)
docs/ALGORITHM.md            Mastery / Auswahl / Reparatur-Modus
src/msa_trainer/             Legacy: alte PySide6-Desktop-App (wird nicht weiterentwickelt)
```

## Inhalte

- Quelle der Mathe-Lektionen und Drill-Templates: Prüfungshefte MSA Mathe Berlin 2027 (Training-Kapitel, Original-Prüfungen 2023–2025). Kommerzielle PDFs werden **nicht** eingecheckt oder ausgeliefert; jede Aufgabe trägt eine `source`-Angabe.
- Templates: `variants.variables` (int/float/choice), `derived` (Ausdrücke), `constraints`; Platzhalter `{{x}}`, `{{= ausdruck | filter}}` (Filter: `fixed:n`, `frac`, `fractex`, `euro`, `sign`, `abs`, `int`, `raw`).
- Figuren werden aus den Variablen als SVG erzeugt (`figure: { type: "rightTriangle", ... }`), Lektionen können `widget`-Abschnitte enthalten (`line-explorer`, `parabola-explorer`, `triangle-explorer`).

## Deployment (GitHub Pages)

1. Repository auf GitHub anlegen, `git remote add origin …`, `git push -u origin main`.
2. Im Repo: **Settings → Pages → Source: GitHub Actions**.
3. Jeder Push auf `main` baut (Tests → Content-Check → Build) und veröffentlicht unter `https://<user>.github.io/<repo>/`.
