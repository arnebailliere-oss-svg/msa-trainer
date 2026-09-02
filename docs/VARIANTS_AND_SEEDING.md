# VARIANTS AND SEEDING
MSA Trainer Berlin (Klasse 9)

## Ziel
Aufgaben sollen variieren, ohne "zufaellig unkontrollierbar" zu werden. Ein Schueler bekommt pro Tag und Topic eine stabile, nachvollziehbare Aufgabenabfolge, damit Wiederholung funktioniert und Fortschritt messbar ist.

## Grundprinzip
- Jede Frage kann optional "variants" enthalten.
- Wenn variants.enabled = true, wird aus einem Template und Variablenbereichen ein konkreter Aufgaben-Seed erzeugt.
- Der Seed ist deterministisch: gleiche Inputs ergeben gleiche Varianten.
- Pro Tag wird eine begrenzte Anzahl Varianten pro Topic erzeugt, damit Wiederholung moeglich bleibt.

## Begriffe
- Base Question: Frage-JSON mit template und variables
- Variant Instance: konkret gerenderte Frage mit festen Werten
- Seed: 64-bit unsigned integer, aus stabilen Eingaben abgeleitet
- Variant Key: eindeutige Kennung fuer eine generierte Variante, speicherbar im Attempt

## Anforderungen
R1: Varianten muessen reproduzierbar sein (gleicher user, gleicher Tag, gleicher topic, gleicher counter).
R2: Varianten muessen pro Topic pro Tag begrenzt sein (z.B. max 40).
R3: Varianten muessen in Repair Mode gezielt aehnlich sein (counter nicht springen, difficulty nicht steigen).
R4: Jede generierte Variante muss eine eindeutige variant_id erhalten.

## Seed Eingaben (Canonical Inputs)
Die folgenden Felder werden zu einem String normalisiert und gehasht:
- user_id
- subject
- topic_id
- base_question_id
- date_key (YYYY-MM-DD im lokalen Zeitzonen-Kontext Europa/Berlin)
- mode_key (QUICK, TOPIC, ERRORS, MSA)
- counter (0..N), pro Topic pro Tag hochzaehlend

Canonical String Format (keine Leerzeichen):
user_id|subject|topic_id|base_question_id|date_key|mode_key|counter

Beispiel:
9f0a...|MATH|MATH_NUM_PCT_BASIC|MATH_NUM_PCT_BASIC_001|2026-01-19|QUICK|7

## Hash und 64-bit Seed
Verwendet SHA-256 und nehmt die ersten 8 Bytes als unsigned 64-bit integer (Big Endian).

Pseudo:
digest = sha256(canonical_string_utf8)
seed_u64 = uint64_from_bytes(digest[0:8], big_endian)

Hinweis:
- Keine Python random.seed global verwenden.
- Nutzt einen lokalen RNG pro Aufgabe (z.B. random.Random(seed_u64)).

## Variant ID
variant_id muss stabil sein und darf nicht kollidieren. Vorschlag:
variant_id = base_question_id + "::" + date_key + "::" + mode_key + "::" + str(counter)

Beispiel:
MATH_NUM_PCT_BASIC_001::2026-01-19::QUICK::7

Diese variant_id wird:
- in attempts.answer_json gespeichert
- optional in questions payload gespeichert, wenn ihr die Frage "materialisiert"

## Variable Sampling Rules
Variables in question.variants.variables definieren den Sampling Space.

Unterstuetzte Typen (MVP):
- int: min, max, step
- choice: values (Liste)

Sampling Regeln:
- int: Wertepool = range(min, max, step) inkl. max wenn passend
- choice: Wertepool = values
- Fuer jede Variable wird ein Index ueber RNG gezogen:
  idx = rng.randrange(len(pool))
  value = pool[idx]

Wichtig:
- Die Reihenfolge der Variablen muss stabil sein. Nutzt eine sortierte Liste nach Variablenname.
- Sonst werden Seeds unterschiedlich wirken, je nach JSON Reihenfolge.

## Rendering Rules fuer Templates
- Template Strings nutzen {{varname}}.
- Vor dem Rendern: Werte in String konvertieren.
- Mathe: Zahlen ohne Tausendertrennzeichen. Dezimalpunkt nach deutschem Kontext optional erst in Anzeigeformatierung, nicht in Berechnung.

Beispiel:
template: "Wie viel sind {{p}}% von {{g}}?"
vars: p=20, g=150
rendered: "Wie viel sind 20% von 150?"

## Solution Consistency
Wenn eine Aufgabe Varianten nutzt, muss die Loesung berechenbar oder mit-variieren.
Zwei Modi:

A) Computed Solution (empfohlen)
- solution kann "formula" enthalten
- App berechnet correct_value aus den gesampelten Variablen

B) Enumerated Solution
- Variablenkombinationen sind begrenzt, Loesung steht als template oder map

MVP Empfehlung:
- Mathe: computed solution (Formeln)
- Deutsch/Englisch: choice-basierte Varianten oder ohne computed

## Erweiterung: Formula Spec (optional aber empfehlenswert)
Im JSON:
"solution": {
  "kind": "computed_number",
  "expr": "p/100 * g",
  "round": 2
}

Regeln:
- expr ist eine sichere Mini-Sprache (keine eval).
- Unterstuetzt + - * / ( ) und Variablennamen.
- Ergebnis wird gerundet, wenn round gesetzt ist.

## Counter Management pro Topic pro Day
- Pro user_id, subject, topic_id, date_key, mode_key wird ein counter gespeichert.
- Beim Generieren einer neuen Variant Instance wird counter um 1 erhoeht.
- Repair Mode darf counter nicht ueberspringen. Er nutzt die naechsten counter Werte, damit Varianten aehnlich bleiben.

## Repair Mode Seeding
Wenn Repair Mode aktiv ist:
- gleiche Inputs, nur counter laeuft weiter
- difficulty cap: <= aktuelle difficulty
- optional: Variablenbereiche enger ziehen (z.B. kleinere Zahlen), aber deterministisch:
  - use "variants.repair_overrides" (optional) mit min/max Anpassungen

## Speicherung im Attempt
attempt.answer_json minimal:
{
  "variant_id": "...",
  "base_question_id": "...",
  "rendered_vars": { "p": 20, "g": 150 },
  "user_answer": "...",
  "normalized_answer": "...",
  "is_correct": true
}

## Akzeptanzkriterien
A1: Gleiche canonical inputs erzeugen identische rendered_vars.
A2: Variant ID ist eindeutig und wiederholbar.
A3: Repair Mode erzeugt in 3 Folgeaufgaben Varianten aus gleichem base_question_id oder gleichen topic_id, ohne Sprung in Schwierigkeit.
A4: Pro Topic pro Tag koennen max_variants_per_topic_day begrenzt werden (z.B. 40). Danach werden vorhandene Varianten recycelt oder base questions ohne variants gezogen.
