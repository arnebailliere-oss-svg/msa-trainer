# CONTENT SCALE PLAN
Berlin MSA Klasse 9
Ziel: von Starterset auf 500 bis 800 Aufgaben, ohne Qualitaetsverlust

## Zielumfang pro Pack (empfohlen)
- Mathe: 250 bis 320 Aufgaben
- Deutsch: 180 bis 250 Aufgaben
- Englisch: 180 bis 250 Aufgaben
Gesamt: 610 bis 820 Aufgaben

## Prinzip: Wenige Base Questions, viele Varianten
- Mathe skaliert stark ueber Variablen (computed solution).
- Deutsch und Englisch skalieren ueber item banks, choice sets, minimalen Textwechsel.
- Jedes Topic braucht mindestens 12 bis 25 Aufgaben (oder Base Questions mit Varianten), damit adaptive Engine sinnvoll arbeitet.

## Content-Qualitaetsregeln
Q1: Jede Aufgabe hat eine kurze Erklaerung (2 bis 6 Zeilen).
Q2: Jede MCQ hat genau 1 eindeutig korrekte Antwort.
Q3: Distraktoren muessen "typische Fehler" abbilden (z.B. Vorzeichen, Zeiten, Kommaregel, do/does).
Q4: Difficulty 1..5 muss konsistent sein:
    - 1: reine Basisregel
    - 2: Standardaufgabe ohne Fallen
    - 3: Standard mit einer typischen Falle oder Transfer
    - 4: komplexere Schritte, kombinierte Fertigkeiten
    - 5: MSA-Block schwer, mehr Kontext, mehrere Schritte
Q5: Pro Topic mindestens 3 Fehlertypen abdecken.

## Mathe Ausbauplan (Beispiel pro Topic)
### MATH_NUM_PCT_BASIC (Ziel: 35 bis 45 Aufgaben)
Base Question Cluster A: "W aus p und G"
- template: "Berechne W: p={{p}}%, G={{g}}"
- variables: p in {5..40 step 5}, g in {40..300 step 10}
- solution kind: computed_number expr: "p/100*g" round: 2
- distractors (MCQ): typische Rechenfehler:
  - W = (p*G)/100 verwechselt mit (G/p)*100
  - Prozentwert mit Grundwert vertauscht
  - p als 0,{{p}} statt {{p}}/100

Base Question Cluster B: "p aus W und G"
- template: "Berechne p: W={{w}}, G={{g}}"
- variables: g aus {50..300 step 10}, p aus {5..40 step 5}, w wird computed: p/100*g
- solution: computed_number expr: "w/g*100" round: 0 oder 1

Base Question Cluster C: "G aus W und p"
- template: "Berechne G: W={{w}}, p={{p}}%"
- variables: p in {5..40 step 5}, g in {50..300 step 10}, w computed
- solution: computed_number expr: "w/(p/100)" round: 2

Zielmix:
- 40% SHORT, 60% MCQ
- mind. 10 Aufgaben als Sachkontext (Rabatt, Preis, Schuelerticket)

### MATH_ALG_EQU_LINEAR (Ziel: 25 bis 35)
Cluster A: ax+b=c
- variables: a {2..6}, b { -10..10 }, x { -5..10 }, c computed
- prompt: "Loese: {{a}}x + {{b}} = {{c}}"
- solution computed_number expr: "(c-b)/a" round: 0

Cluster B: a(x+b)=c
- variables: a {2..5}, b { -6..6 }, x { -5..10 }, c computed
- prompt: "Loese: {{a}}(x + {{b}}) = {{c}}"

### MATH_GEO_AREA_BASIC (Ziel: 25 bis 35)
- Rechteck: A, U
- Dreieck: A = g*h/2
- Parallelogramm: A = g*h
- variables in cm, runde integer Ergebnisse bevorzugen

### MATH_FUNC_LINEAR_FORM / GRAPH / TABLE (Ziel: 40 bis 60 insgesamt)
- m und b ablesen
- Funktionswerte
- Tabelle aus Term
- Term aus zwei Punkten (Difficulty 4)
- Graph qualitativ (steigend/fallend, Schnittpunkt)

### MATH_DATA_STATS / PROB (Ziel: 25 bis 40)
- Mittelwert, Median (kleine Datenmengen)
- Diagrammfragen als Text (ohne Bilder im MVP)
- Wahrscheinlichkeit mit einfachen Ereignissen

## Deutsch Ausbauplan
Deutsch skaliert ueber:
- Item banks (viele kurze Saetze)
- Minimalpaare (richtig/falsch)
- Cloze fuer Kommas und Gross/Klein

### DE_PUNCT_COMMA_MAIN_SUB (Ziel: 25 bis 35)
Format: CLOZE
Template:
"Setze das Komma: {{hs}} {{blank}} {{ns}}."
Item bank Beispiele:
- hs: "Ich denke", ns: "dass es morgen regnet"
- hs: "Sie sagt", ns: "dass sie spaeter kommt"
- hs: "Wir hoffen", ns: "dass du Zeit hast"
Choices: [",", "", ";"]
Correct: ","
Erklaerung: "dass-Nebensatz wird durch Komma abgetrennt."

### DE_ORTHO_CASE (Ziel: 25 bis 35)
Format: MCQ
Item bank:
- im Allgemeinen
- zum Ersten
- am Besten
- im Wesentlichen
Distraktoren:
- falsch klein
- falsch gross im Satzanfang
- falsche Zusammenschreibung

### DE_GRAM_TENSES (Ziel: 20 bis 30)
MCQ:
"Welche Zeitform ist: '...'"
Item bank Sätze pro Zeitform
Distraktoren muessen plausibel sein (Praeteritum vs Perfekt).

### DE_READ_CORE / ARGUMENT / EVIDENCE (Ziel: 40 bis 60 insgesamt)
MVP ohne lange Texte:
- kurze Mini-Texte 2 bis 4 Saetze in prompt
- Frage: Kernaussage, Intention, Argument, Textbeleg
Wichtig:
- Korrekte Antwort muss direkt aus Text ableitbar sein
- Erklaerung verweist auf Satzstelle ("Im zweiten Satz steht ...").

## Englisch Ausbauplan
Skalierung ueber:
- Grammar item banks
- Error correction
- Reading mini texts
- Vocabulary matching

### EN_USE_TENSES (Ziel: 35 bis 45)
MCQ Muster:
- choose correct sentence
- fill in the gap
Item bank:
- he/she/it -s
- time signals (yesterday, already, since, for)
Distraktoren:
- missing -s
- wrong auxiliary
- wrong tense

### EN_USE_QUEST_NEG (Ziel: 25 bis 35)
- do/does, did
- word order
- negatives: don't/doesn't/didn't
Distraktoren: typische deutsche Wortstellung

### EN_USE_MODALS (Ziel: 20 bis 30)
- must vs should
- can vs must
- mustn't
Kontextsaetze kurz

### EN_VOCAB Sets (Ziel: 40 bis 60 insgesamt)
MATCH:
left = words, right = meanings
Pro Set 10 bis 15 Wörter, aber in 3er Gruppen abfragen, damit es schnell bleibt.
Beispiele:
- school: timetable, homework, subject, break, grade
- travel: luggage, platform, reservation, delay
- opinions: agree, disagree, argue, opinion, reason

### EN_READ_CORE / EMAILS (Ziel: 30 bis 45)
- Mini texts 2 bis 5 Saetze
- Aussage pruefen, detail question, inference very light
- E-mail format mit subject line

## Produktionsprozess (wie ihr schnell skaliert)
Schritt 1: Pro Topic ein Content Sheet bauen
- Spalten: base_question_id, qtype, template, variables, solution kind/expr, distractor rules, explanation template

Schritt 2: Generator fuer Mathe
- Aus einer Base Question werden 30 bis 80 Varianten materialisiert, aber nur ein Teil pro Tag gezeigt.
- Achtung: Keine Explosion in DB. Optional nur "on the fly"
