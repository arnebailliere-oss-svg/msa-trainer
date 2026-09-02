# ALGORITHM
Auswahl, Mastery, Repair Mode  
MSA Trainer Berlin (Klasse 9)

---

## 1. Begriffe und Zustände

### Topic
- Trainierbare Einheit (topic_id)

### Attempt
- Ein beantworteter Aufgabenversuch
- Wird immer persistiert

### MasteryState (pro user_id + topic_id)
- mastery_score: float 0.0 .. 1.0
- stability: float 0.0 .. 1.0
- last_practiced_at: timestamp (ISO)
- streak_days: int

### Repair Mode
- Temporärer Zustand pro topic_id
- Aktiviert nach falscher Antwort

---

## 2. Mastery Update (MVP Regeln)

### 2.1 Basisregeln

**Wenn Antwort korrekt:**
- mastery_score += 0.03
- stability += 0.02
- Speed-Bonus:
  - wenn response_time_ms < Zielzeit:
    - mastery_score += 0.01

**Wenn Antwort falsch:**
- mastery_score -= 0.06
- stability -= 0.04

### 2.2 Zielzeiten

| Difficulty | Zielzeit |
|----------|---------|
| 1 | 20s |
| 2 | 35s |
| 3 | 55s |
| 4 | 75s |
| 5 | 90s |

### 2.3 Clamping
- mastery_score = clamp(0.0, 1.0)
- stability = clamp(0.0, 1.0)

---

## 3. Ampel (Dashboard)

- Rot: mastery_score < 0.45
- Gelb: 0.45 .. 0.75
- Grün: mastery_score > 0.75 und stability > 0.55

---

## 4. Repair Mode

### 4.1 Aktivierung
- Bei falscher Antwort:
  - repair_mode(topic_id) = true
  - repair_queue neu erzeugen

### 4.2 Repair Queue
Reihenfolge:

1. 2 Aufgaben:
   - gleicher topic_id
   - difficulty <= aktuelle difficulty

2. 1 Transferaufgabe:
   - topic_id = parent_id
   - falls kein parent_id: gleicher topic_id
   - difficulty = aktuelle oder +1

### 4.3 Verhalten
- Solange repair_queue nicht leer:
  - Aufgaben nur aus repair_queue
  - Selection Engine ignorieren

### 4.4 Transferregel
- korrekt:
  - repair_mode endet
- falsch:
  - repair_mode bleibt
  - neue repair_queue
  - difficulty der 2 Aufgaben = max(1, aktuelle difficulty - 1)

---

## 5. Selection Engine (Normalbetrieb)

### 5.1 Ziel
- Schwächen priorisieren
- Spaced Repetition
- Gelbe Topics stabilisieren
- Gruene Topics erhalten

### 5.2 Kennzahlen pro Topic

- weakness = 1 - mastery_score
- error_rate = Fehlerquote der letzten 20 Attempts (0.0 .. 1.0)
- recency_days = Tage seit last_practiced_at
  - falls nie geuebt: recency_days = 14
- recency_factor = min(1.0, recency_days / 7.0)
- stability_factor = 1 - stability

### 5.3 Prioritaetsformel

```
topic_priority =
  0.45 * weakness +
  0.25 * error_rate +
  0.20 * recency_factor +
  0.10 * stability_factor
```

- Wertebereich: 0.0 .. 1.0
- Hoeher = hoeher priorisiert

### 5.4 Auswahlregeln

**Quick Training**
- 70% Top-Prioritaeten
- 20% Gelb
- 10% Gruen

**Topic Training**
- fixe topic_id
- difficulty nach mastery_score

**Error List**
- Sortierung:
  1. error_rate
  2. weakness

---

## 6. Difficulty Auswahl

| mastery_score | Difficulty |
|--------------|-----------|
| < 0.45 | 1 .. 2 |
| 0.45 .. 0.75 | 2 .. 3 |
| > 0.75 | 3 .. 4 |

Difficulty 5:
- nur MSA-Block oder sehr stabil

---

## 7. Varianten (deterministisch)

### 7.1 Seed Inputs
- user_id
- subject
- topic_id
- base_question_id
- date_key (YYYY-MM-DD, Europe/Berlin)
- mode_key (QUICK | TOPIC | ERRORS | MSA)
- counter

### 7.2 Canonical String

```
user_id|subject|topic_id|base_question_id|date_key|mode_key|counter
```

### 7.3 Seed
- SHA-256
- erste 8 Bytes als uint64 (Big Endian)
- local RNG pro Aufgabe

### 7.4 Counter
Key:
(user_id, subject, topic_id, mode_key, date_key)

- inkrementiert pro Variant
- Repair Mode nutzt weiter

### 7.5 Variant ID

```
base_question_id::date_key::mode_key::counter
```

---

## 8. Attempt Speicherung

```json
{
  "variant_id": "...",
  "base_question_id": "...",
  "rendered_vars": {},
  "user_answer": "...",
  "normalized_answer": "...",
  "is_correct": true
}
```

---

## 9. Implementationsregeln

- Keine globale random.seed Nutzung
- Keine eval
- Repair Mode ueberschreibt Selection Engine
- Mastery Update nach Persistierung

---

Ende von ALGORITHM.md
