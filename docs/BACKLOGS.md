# BACKLOG: MVP Tickets

## Epic A: Setup
- A1 Repo setup, pyproject, src layout
- A2 PySide6 App Shell (MainWindow, Router)
- A3 Basic styling and fonts

## Epic B: Persistence
- B1 SQLite repo layer
- B2 Migrations: users, topics, questions, attempts, mastery
- B3 Seed data support

## Epic C: Content Packs
- C1 Pack loader (manifest, topics, questions)
- C2 JSON schema validation
- C3 Import UI and error reporting

## Epic D: Question Rendering
- D1 MCQ renderer
- D2 CLOZE renderer
- D3 MATCH renderer
- D4 SHORT renderer + normalization

## Epic E: Training Engine
- E1 Session controller (start, next, submit)
- E2 Attempt logging
- E3 MasteryEngine (update rules)
- E4 SelectionEngine (priority scoring)
- E5 Repair Mode queue logic

## Epic F: UI Screens
- F1 Dashboard screen (ampel, focus topics)
- F2 Session screen (question + feedback)
- F3 Result screen (summary + recommendation)
- F4 Parent view (overview + daily goal)

## Epic G: Calculator
- G1 Calculator widget UI
- G2 Safe expression parser
- G3 Session integration (math only)

## Epic H: Tests
- H1 Unit tests MasteryEngine
- H2 Unit tests SelectionEngine
- H3 Unit tests Repair Mode
- H4 Smoke test Pack import
