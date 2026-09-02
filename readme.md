# MSA Trainer Berlin (Klasse 9)

Offline Desktop-App (Python + PySide6 + SQLite) zur MSA-Vorbereitung in Berlin für Mathe, Deutsch und Englisch.
Fokus: Mastery Learning, Fehler-Loop (Repair Mode), adaptive Aufgabenauswahl, kurze Einheiten.

## Features (MVP)
- Mehrere Profile (Kinder)
- Training: Quick (adaptiv), Thema, Fehlerliste, optional MSA-Block
- Aufgabentypen: MCQ, CLOZE, MATCH, SHORT
- Sofortfeedback mit kurzer Erklärung
- Repair Mode nach Fehlern: 2 Aufgaben gleiches Thema, dann 1 Transferaufgabe
- Mathe Rechner Widget (sicher, ohne eval)
- Lokale Speicherung (SQLite), offline first
- Content Packs als JSON (Import und Validierung)

## Repository Layout
- /src/msa_trainer: App-Code
- /content_packs/berlin_msa_v1: Inhalte (topics, questions, manifest)
- /docs: Projektdokumente
- /tests: Unit Tests

## Quick Start (dev)
1. Python 3.11+ installieren
2. venv erstellen und dependencies installieren
3. App starten: python -m msa_trainer.main

## Content Pack
- /content_packs/berlin_msa_v1/pack_manifest.json
- /content_packs/berlin_msa_v1/topics.json
- /content_packs/berlin_msa_v1/questions_math.json
- /content_packs/berlin_msa_v1/questions_german.json
- /content_packs/berlin_msa_v1/questions_english.json
