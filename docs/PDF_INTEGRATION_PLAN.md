# PDF Integration Plan for MSA Trainer

## Overview

The `docs/MSA_Folien_als_PDF/` directory contains 44 official Berlin iMINT-Akademie PDFs covering 11 Math topics. This document outlines how to integrate this content into the MSA Trainer app.

## PDF Content Structure

### Topics Available (11 total)
| Topic | German Name | Files |
|-------|-------------|-------|
| Daten | Statistics/Data | 4 PDFs |
| Exponentielles Wachstum | Exponential Growth | 4 PDFs |
| Geometrie in der Ebene | Plane Geometry | 4 PDFs |
| Körperberechnungen | Volume Calculations | 4 PDFs |
| Lineare Funktionen | Linear Functions | 4 PDFs |
| Lineare Gleichungssysteme | Systems of Equations | 4 PDFs |
| Prozentrechnung | Percentages | 4 PDFs |
| Quadratische Funktionen | Quadratic Functions | 4 PDFs |
| Satz des Pythagoras | Pythagorean Theorem | 4 PDFs |
| Trigonometrie | Trigonometry | 4 PDFs |
| Wahrscheinlichkeit | Probability | 4 PDFs |

### File Types per Topic
- **Aufgaben (GR)** - Basic level exercises (Grundniveau)
- **Aufgaben (ER)** - Extended level exercises (Erweiterungsniveau)
- **Hilfen** - Help cards with explanations, formulas, examples
- **Lösungen** - Solutions/Answer keys

### Content Characteristics
- Card-based system (Vorwissen → Grundniveau → Selbsttest)
- Visual diagrams (grids, pie charts, tables, graphs)
- Real MSA exam references (e.g., [MSA 2014 Basisaufgaben])
- Difficulty indicators (ampel/traffic light colored indicators)
- Berlin-specific context (Hertha BSC, Berlin districts, etc.)
- CC BY-SA 4.0 licensed (can be freely used and adapted)

---

## Integration Strategies

### Strategy 1: PDF Viewer Component (Quick Win)
**Effort: Low | Value: High**

Create a PDF viewer widget that displays help cards directly in the app during training sessions.

```
src/msa_trainer/
├── ui/
│   └── widgets/
│       └── pdf_viewer.py      # QWebEngineView or QPdfView widget
│   └── views/
│       └── hilfen_browser.py  # Browse and select help cards
```

**Benefits:**
- Fast to implement
- Preserves original high-quality formatting
- No content extraction errors

**Implementation:**
```python
from PySide6.QtPdfWidgets import QPdfView
from PySide6.QtPdf import QPdfDocument

class HilfenViewer(QWidget):
    def __init__(self):
        self.pdf_doc = QPdfDocument()
        self.pdf_view = QPdfView()
        self.pdf_view.setDocument(self.pdf_doc)

    def load_hilfe(self, topic: str):
        path = f"docs/MSA_Folien_als_PDF/MSA_Station_-_{topic} - Hilfen.pdf"
        self.pdf_doc.load(path)
```

### Strategy 2: Content Extraction to JSON (Medium Effort)
**Effort: Medium | Value: Very High**

Extract questions from PDFs and convert to JSON question format for the app's question engine.

```python
# Extracted question example
{
    "id": "pdf_prozent_gr_k3_a2",
    "topic_id": "math_prozent_prozentwert",
    "type": "SHORT",
    "difficulty": 2,
    "source": "MSA 2016 N Basisaufgaben",
    "prompt": "Geben Sie 20 % von 300 € an.",
    "correct_answer": "60",
    "explanation": "🎯 Was ist gefragt?\nDen Prozentwert W berechnen...",
    "visual_ref": "prozentrechnung_hilfe_5"  # Reference to help card
}
```

**Benefits:**
- Questions work with mastery engine
- Can generate variants
- Full integration with repair mode

### Strategy 3: Image Extraction for Visual Questions
**Effort: Medium | Value: High**

Extract diagrams/images from PDFs for questions that require visual elements.

```
content_packs/berlin_msa_v1/
├── images/
│   ├── prozent_kreisdiagramm_01.png
│   ├── prozent_balkendiagramm_01.png
│   └── geometrie_dreieck_01.png
```

**Implementation:**
```python
# Question with image
{
    "id": "prozent_visual_01",
    "type": "MCQ",
    "prompt": "Gib den Anteil der grau gefärbten Fläche als Bruch und in Prozent an.",
    "image": "images/prozent_rechteck_01.png",
    "options": ["1/4 = 25%", "1/3 = 33%", "2/5 = 40%", "1/2 = 50%"],
    "correct_index": 0
}
```

### Strategy 4: Contextual Help System
**Effort: Low-Medium | Value: Very High**

Link Hilfen PDFs to topics so students can access help during training.

```python
# Topic to Hilfe mapping
HILFEN_MAP = {
    "math_prozent": "Prozentrechnung",
    "math_lin_funk": "Lineare_Funktionen und Gleichungen",
    "math_pythagoras": "Satz_des_Pythagoras",
    # ...
}
```

**UI Flow:**
1. Student answers question incorrectly
2. "Brauchst du Hilfe?" button appears
3. Opens relevant Hilfe PDF at the right page/card
4. Student reads explanation, returns to practice

---

## Recommended Implementation Order

### Phase 1: PDF Viewer Foundation
1. Add `PySide6-Addons` dependency (includes QtPdf)
2. Create `HilfenViewer` widget
3. Add "Hilfe" button to SessionView
4. Map topics to PDF files

### Phase 2: Contextual Help Integration
1. Link questions to specific Hilfe cards (by page number)
2. Show relevant help after incorrect answers
3. Track which Hilfen were accessed (for analytics)

### Phase 3: Content Extraction
1. Build PDF text extractor using `pypdf` or `pdfplumber`
2. Parse question structure (Aufgabe 1, Aufgabe 2, etc.)
3. Convert to JSON question format
4. Extract images using `pdf2image`

### Phase 4: Visual Questions
1. Extract diagrams from PDFs
2. Create IMAGE question type
3. Add image display to question renderers

---

## File Structure After Integration

```
src/msa_trainer/
├── content/
│   ├── pdf_loader.py          # Load and index PDFs
│   ├── pdf_extractor.py       # Extract text/images from PDFs
│   └── hilfen_mapper.py       # Map topics to help cards
├── ui/
│   ├── widgets/
│   │   └── pdf_viewer.py      # PDF display widget
│   └── views/
│       └── hilfen_browser.py  # Browse help cards
└── ...

content_packs/berlin_msa_v1/
├── manifest.json
├── topics.json
├── questions_math.json         # Includes extracted PDF questions
├── questions_german.json
├── questions_english.json
└── images/                     # Extracted PDF diagrams
    └── ...
```

---

## Technical Requirements

### Dependencies to Add
```toml
[project.dependencies]
PySide6 = ">=6.6.0"
PySide6-Addons = ">=6.6.0"  # For QtPdf
pypdf = ">=4.0.0"            # For text extraction
pdfplumber = ">=0.10.0"      # For structured extraction
pdf2image = ">=1.16.0"       # For image extraction
```

### Platform Notes
- `pdf2image` requires Poppler (Windows: needs manual install)
- QtPdf is cross-platform and bundled with PySide6-Addons
- Consider fallback to QWebEngineView for older Qt versions

---

## Content Mapping

### Prozentrechnung → Topics
| Hilfe Card | Topic ID | Description |
|------------|----------|-------------|
| Hilfe 1 | math_prozent_begriffe | G, W, p% erkennen |
| Hilfe 2 | math_prozent_umrechnen | Bruch ↔ Dezimal ↔ Prozent |
| Hilfe 3 | math_prozent_ablesen | Prozente in Diagrammen |
| Hilfe 4 | math_prozent_formel | Die richtige Formel finden |
| Hilfe 5 | math_prozent_prozentwert | W = G × p% |
| Hilfe 6 | math_prozent_prozentsatz | p% = W/G × 100 |
| Hilfe 7 | math_prozent_grundwert | G = W/p% × 100 |
| Hilfe 8 | math_prozent_um_auf | "um" vs "auf" reduziert |
| Hilfe 9 | math_prozent_veraenderung | Anstieg/Reduzierung |

---

## Next Steps

1. **Immediate**: Implement `HilfenViewer` widget
2. **Short-term**: Add "Hilfe" button to SessionView
3. **Medium-term**: Extract PDF questions to JSON
4. **Long-term**: Full image-based question support

---

## License

All PDF content is licensed under **CC BY-SA 4.0** by Senatsverwaltung für Bildung, Jugend und Familie Berlin / iMINT-Akademie. Attribution must be preserved when using extracted content.
