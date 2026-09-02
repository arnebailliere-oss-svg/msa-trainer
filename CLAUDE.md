# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment

This project runs on Windows but the shell uses bash (Git Bash/WSL). Use Unix commands:
- `ls`, `mv`, `cp`, `rm`, `cat` all work
- Use forward slashes `/` for paths (e.g., `c:/Dev2/MSATRAINER/`)
- Backslashes also work but forward slashes are preferred in bash

## Project Overview

MSA Trainer Berlin - Offline desktop application for German MSA (Mittlerer Schulabschluss) exam preparation for 9th-grade students in Berlin. Focuses on mastery learning with adaptive question selection and error-driven repair mode.

**Tech Stack:** Python 3.11+, PySide6 (Qt), SQLite, JSON content packs

## Build & Run Commands

```bash
# Setup
python -m venv .venv
.venv/Scripts/activate  # Windows
pip install -e ".[dev]"

# Run application
python -m msa_trainer

# Run tests
pytest tests/

# Run specific test file
pytest tests/unit/test_mastery_engine.py -v
```

## Project Structure

```
src/msa_trainer/
├── core/                    # Business logic (no Qt dependency)
│   ├── models.py            # Data classes: User, Topic, Question, etc.
│   ├── enums.py             # Subject, QuestionType, TrainingMode, AmpelState
│   ├── constants.py         # Scoring deltas, thresholds, weights
│   ├── mastery_engine.py    # Mastery score updates
│   ├── selection_engine.py  # Topic prioritization
│   ├── repair_mode.py       # Repair queue management
│   ├── session_controller.py
│   ├── variant_generator.py # SHA-256 seeding
│   ├── normalizers.py       # Answer normalization
│   └── evaluators/          # MCQ, CLOZE, MATCH, SHORT evaluators
├── persistence/
│   ├── database.py          # SQLite connection with WAL mode
│   ├── migrations.py        # Schema creation
│   └── repositories/        # User, Topic, Question, Attempt, Mastery repos
├── content/
│   ├── pack_loader.py       # Load content packs
│   ├── schema_validator.py  # JSON Schema validation
│   └── importer.py          # Import to SQLite
├── calculator/              # Safe math calculator (NO eval!)
│   ├── tokenizer.py         # Lexical analysis
│   ├── parser.py            # Recursive descent parser
│   └── evaluator.py         # AST evaluation
├── ui/
│   ├── router.py            # View navigation
│   ├── styles.py            # QSS stylesheets
│   ├── widgets/             # AmpelIndicator, CalculatorWidget
│   ├── renderers/           # MCQ, CLOZE, MATCH, SHORT renderers
│   └── views/               # Start, Dashboard, Session, Result views
└── utils/
```

## Architecture

### Core Components

- **MasteryEngine** - Updates mastery_score (0-1) and stability per user+topic
  - Correct: +0.03 mastery, +0.02 stability
  - Incorrect: -0.06 mastery, -0.04 stability
  - Speed bonus: +0.01 if under target time

- **SelectionEngine** - Prioritizes questions using weighted formula:
  ```
  priority = 0.45×weakness + 0.25×error_rate + 0.20×recency + 0.10×stability_factor
  ```

- **Repair Mode** - Triggered on wrong answer, creates 3-question queue:
  1. Two same-topic questions (difficulty ≤ current)
  2. One transfer question (parent topic, difficulty ≥ current)
  - Exits only when transfer question answered correctly

- **Content Pack Loader** - Validates and imports JSON content packs

### Ampel (Traffic Light) System

- Red: mastery_score < 0.45
- Yellow: 0.45 - 0.75
- Green: mastery_score > 0.75 AND stability > 0.55

### Question Types

- **MCQ** - Multiple choice with 4 options
- **CLOZE** - Fill-in-blank with choices
- **MATCH** - Matching pairs
- **SHORT** - Numeric/text with answer normalization

### Variant Generation

Deterministic seeding using SHA-256:
```
SHA-256(user_id|subject|topic_id|question_id|date_key|mode_key|counter)
```
First 8 bytes as uint64 seed for local RNG per question.

## Content Pack Structure

```
/content_packs/berlin_msa_v1/
├── pack_manifest.json      # Pack metadata
├── topics.json             # 51 topics (MATH, DE, EN)
├── questions_math.json     # Math questions
├── questions_german.json   # German questions
└── questions_english.json  # English questions
```

Schema validation: [docs/JSON_SCHEMA.json](docs/JSON_SCHEMA.json)

## Key Documentation

- [docs/ALGORITHM.md](docs/ALGORITHM.md) - Mastery, Repair Mode, Selection Engine logic
- [docs/BACKLOGS.md](docs/BACKLOGS.md) - MVP epics A-H with tickets
- [docs/UI_FLOWS.md](docs/UI_FLOWS.md) - Screen navigation and layouts
- [docs/VARIANTS_AND_SEEDING.md](docs/VARIANTS_AND_SEEDING.md) - Deterministic variant generation
- [docs/ACCEPTANCE_TESTS.md](docs/ACCEPTANCE_TESTS.md) - Definition of Done criteria

## Implementation Rules

- No `eval()` - use safe expression parser for calculator
- No global `random.seed()` - use local RNG per question
- Repair Mode overrides Selection Engine
- Mastery updates only after attempt persistence
- All content in German (student-facing), code/docs can be English or German
