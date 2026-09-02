# MSA Trainer Content Development Plan

## Current Status

| Subject | Topics | Questions | Target | Gap |
|---------|--------|-----------|--------|-----|
| MATH | 22 sub-topics | 9 | 150+ | ~140 |
| DE | 15 sub-topics | 6 | 100+ | ~95 |
| EN | 14 sub-topics | 6 | 100+ | ~95 |
| **Total** | **51 sub-topics** | **21** | **350+** | **~330** |

## Didactic Principles (WICHTIG!)

### 1. Explanation Structure

Every explanation MUST follow this pattern:

```
🎯 WAS IST DAS? / WHAT IS THIS?
[Simple 1-sentence definition]

📖 DIE BEGRIFFE / THE TERMS
• Begriff 1 = Erklaerung (einfach!)
• Begriff 2 = Erklaerung

📐 DIE FORMEL / THE RULE
[Formula or rule with arrows showing what means what]

✏️ RECHNUNG / SOLUTION
Schritt 1: ...
Schritt 2: ...
Schritt 3: ...

⚠️ TYPISCHER FEHLER / COMMON MISTAKE
[What students often get wrong and why]

💡 MERKE / REMEMBER
[Memory hook or analogy]

✅ Antwort / Answer: [answer]
```

### 2. Analogies for Abstract Concepts

**Math - Variables:**
- x = Kiste (box with unknown content)
- 3x = 3 Kisten
- 3x + 6 = 3 Kisten + 6 Aepfel

**Math - Percentages:**
- 100% = the whole pizza
- 50% = half the pizza
- 25% = quarter of the pizza

**Math - Equations:**
- Equation = Waage (scale that must balance)
- Left side = right side ALWAYS
- What you do on one side, do on the other

**German - Comma:**
- Hauptsatz = kann allein stehen (independent clause)
- Nebensatz = braucht Hilfe (dependent clause)
- Komma = Grenze zwischen den beiden

**English - Tenses:**
- Present Simple = every day routine (Gewohnheit)
- Present Continuous = right now (gerade jetzt)
- Past Simple = yesterday, finished (gestern, fertig)

### 3. Difficulty Levels

| Level | Description | Example |
|-------|-------------|---------|
| 1 | Pure recognition | "What is 50% as a fraction?" |
| 2 | Single-step calculation | "20% of 100 = ?" |
| 3 | Multi-step, context | "Price was 80€, now 92€. Increase in %?" |
| 4 | Complex word problems | Real MSA exam difficulty |

---

## Phase 1: High Priority Math (SEHR HOCH)

### MATH_NUM_PCT (Prozentrechnung) - Target: 15 questions

**Existing:** 3 questions

**To Create:**
- [ ] MATH_NUM_PCT_BASIC_003: Find percentage (p) - "30 is what % of 150?"
- [ ] MATH_NUM_PCT_BASIC_004: Find base (G) - "40 is 25% of what?"
- [ ] MATH_NUM_PCT_BASIC_005: Word problem - "25% discount on 80€"
- [ ] MATH_NUM_PCT_CHANGE_002: Decrease calculation
- [ ] MATH_NUM_PCT_CHANGE_003: Price increase word problem
- [ ] MATH_NUM_PCT_CHANGE_004: Compare two changes
- [ ] MATH_NUM_PCT_CHANGE_005: Multi-step change problem

### MATH_ALG_EQU_LINEAR (Lineare Gleichungen) - Target: 15 questions

**Existing:** 1 question

**To Create:**
- [ ] Basic: x + 5 = 12
- [ ] Basic: 2x = 14
- [ ] Medium: 3x - 7 = 8
- [ ] Medium: 2(x + 3) = 16
- [ ] Complex: 4x + 5 = 2x + 13
- [ ] Word problem: Age problems
- [ ] Word problem: Money problems
- [ ] Word problem: Distance problems

---

## Phase 2: High Priority German (SEHR HOCH)

### DE_ORTHO (Rechtschreibung) - Target: 20 questions

**To Create:**
- [ ] Gross/Klein: Nominalisierung ("das Lesen", "beim Essen")
- [ ] Gross/Klein: Nach Doppelpunkt
- [ ] ss/ß: Nach kurzem Vokal (Fluss, muss)
- [ ] ss/ß: Nach langem Vokal (Fuß, groß)
- [ ] Doppelkonsonanten (kommen, Sommer)
- [ ] ie vs i (Liebe vs gibt)

### DE_PUNCT (Zeichensetzung) - Target: 20 questions

**To Create:**
- [ ] Komma vor "weil"
- [ ] Komma vor "obwohl"
- [ ] Komma vor "wenn"
- [ ] Komma vor "damit"
- [ ] Aufzaehlung mit "und"
- [ ] Direkte Rede: Position der Anfuehrungszeichen
- [ ] Infinitivgruppen: "um zu", "ohne zu"

### DE_READ_CORE (Leseverstehen) - Target: 15 questions

**Needs short text passages with questions about:**
- [ ] Hauptaussage finden
- [ ] Argumente erkennen
- [ ] Textbelege markieren
- [ ] Absicht des Autors

---

## Phase 3: High Priority English (SEHR HOCH)

### EN_USE_TENSES - Target: 20 questions

**To Create:**
- [ ] Present Simple: positive, negative, question
- [ ] Present Continuous: positive, negative, question
- [ ] Past Simple: regular verbs
- [ ] Past Simple: irregular verbs (went, saw, had)
- [ ] Signal words: "every day" vs "right now" vs "yesterday"
- [ ] Mixed: Choose correct tense based on context

### EN_USE_QUEST_NEG - Target: 15 questions

**To Create:**
- [ ] Do/Does questions
- [ ] Did questions
- [ ] Don't/Doesn't negations
- [ ] Didn't negations
- [ ] Word order in questions
- [ ] Short answers (Yes, I do / No, she doesn't)

---

## Phase 4: Medium Priority Topics

### Math
- MATH_NUM_FRAC (Brueche): 10 questions
- MATH_NUM_INTEREST (Zinsen): 8 questions
- MATH_ALG_TERMS (Terme): 10 questions
- MATH_FUNC_LINEAR (Funktionen): 12 questions
- MATH_GEO_AREA (Flaechen): 10 questions
- MATH_GEO_VOLUME (Volumen): 8 questions
- MATH_GEO_PYTH (Pythagoras): 10 questions
- MATH_DATA (Statistik): 10 questions

### German
- DE_GRAM (Grammatik): 15 questions
- DE_WRITE (Schreiben): 10 questions

### English
- EN_USE_MODALS: 10 questions
- EN_VOCAB: 15 questions (vocabulary matching)
- EN_READ: 10 questions
- EN_WRITE: 10 questions

---

## Question Types per Topic

| Topic Type | Best Question Types |
|------------|---------------------|
| Calculation | SHORT (number input) |
| Recognition | MCQ (4 choices) |
| Vocabulary | MATCH (pairs) |
| Grammar | MCQ or CLOZE |
| Reading | MCQ with text passage |
| Spelling | MCQ (which is correct?) |

---

## Implementation Order

### Week 1: Core Math
1. Complete MATH_NUM_PCT (Prozent) - 12 more questions
2. Complete MATH_ALG_EQU_LINEAR (Gleichungen) - 14 more questions

### Week 2: Core German
1. Complete DE_ORTHO (Rechtschreibung) - 20 questions
2. Complete DE_PUNCT (Zeichensetzung) - 18 questions

### Week 3: Core English
1. Complete EN_USE_TENSES - 19 more questions
2. Complete EN_USE_QUEST_NEG - 14 more questions

### Week 4: Supporting Topics
1. Math: Fractions, Functions, Geometry
2. German: Grammar, Reading
3. English: Modals, Vocabulary, Reading

---

## Quality Checklist for Each Question

- [ ] Uses didactic explanation structure (emoji sections)
- [ ] Includes analogy for abstract concepts
- [ ] Shows step-by-step solution
- [ ] Lists common mistakes
- [ ] Has memory hook (💡 MERKE)
- [ ] Correct German/English spelling
- [ ] Matches difficulty level (1-4)
- [ ] Has appropriate tags

---

## File Organization

```
content_packs/berlin_msa_v1/
├── pack_manifest.json
├── topics.json (51 topics - COMPLETE)
├── questions_math.json (target: 150+)
├── questions_german.json (target: 100+)
└── questions_english.json (target: 100+)
```

---

## Next Immediate Action

Start with **MATH_NUM_PCT** (Prozentrechnung) because:
1. SEHR HOCH priority in curriculum
2. Concrete formulas are easier to explain
3. Good foundation for other math topics
4. Already has 3 questions as template

Create 12 new questions covering:
- Finding W (Prozentwert) - 4 questions
- Finding G (Grundwert) - 4 questions
- Finding p (Prozentsatz) - 4 questions
- Prozentuale Veraenderung - 4 questions
