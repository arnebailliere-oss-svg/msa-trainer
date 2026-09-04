# ALGORITHM
Nachweis-Modell, Tagesplan, Prüfungsreife, Repair Mode  
MSA Trainer Berlin (Klasse 9/10) — Stand 2026-09-04

---

## 1. Begriffe und Zustände

### Topic
- Trainierbare Einheit (topic_id), Blatt im Themenbaum, mit `priority` 1–3 (3 = kommt in jeder MSA-Prüfung vor, 2 = üblich, 1 = selten; Standard 2)

### Attempt
- Ein beantworteter Aufgabenversuch; wird immer persistiert (vor dem Mastery-Update)
- Trägt `difficulty` und `mode` (ältere Versuche: Modus steckt in der variant_id)

### MasteryState (pro user_id + topic_id)
- Projektion der Stufe (§2) auf die gespeicherten Zahlen, damit Ampel, Auswahl und Ansichten stabil bleiben:
  - mastery_score = [0, 0.2, 0.6, 0.85, 1][stufe]
  - stability = 1 ab „Sicher“, 0.5 bei „Geübt“, sonst 0.2
  - last_practiced_at, attempts

### Repair Mode
- Temporärer Zustand pro topic_id, aktiviert nach falscher Antwort (§4)

---

## 2. Nachweis-Modell (Stufe eines Themas)

Die Stufe wird **nie aufaddiert**, sondern bei jeder Antwort aus den **letzten 6 Versuchen** des Themas neu berechnet (`core/levels.ts`).

| Stufe | Name | Bedingung |
|---|---|---|
| 0 | Neu | keine Versuche |
| 1 | Angefangen | Versuche, aber weniger als 4 der letzten 6 richtig |
| 2 | Geübt | 4 der letzten 6 richtig |
| 3 | Sicher | 5 der letzten 6 richtig, davon ≥ 2 auf Prüfungsniveau (difficulty ≥ 3), an ≥ 2 verschiedenen Tagen |
| 4 | Prüfungsfest | Sicher, plus eine richtige Prüfungsniveau-Antwort ≥ 3 Tage nach Erreichen von Sicher |

Regeln:
- `sicher_since` = Datum des Versuchs, mit dem die aktuelle Sicher-Serie begann; fällt die Bedingung, wird sie zurückgesetzt (Prüfungsfest ebenfalls).
- **Check fällig**: Sicher seit ≥ 3 Tagen ohne Prüfungsfest, oder **veraltet**: Sicher/Prüfungsfest, aber > 14 Tage nicht geübt → Anzeige als Geübt, ein Check (1–2 Aufgaben) stellt die Stufe wieder her.
- Kosten: Wer ein Thema kann, ist in 6–8 Aufgaben (auf 2 Tagen) bei Sicher. Fehler kosten nur den Repair-Loop.

### 2.1 Zielzeiten (Anzeige, nicht bewertet)

| Difficulty | Zielzeit |
|----------|---------|
| 1 | 20s |
| 2 | 35s |
| 3 | 55s |
| 4 | 75s |
| 5 | 90s |

---

## 3. Ampel und Prüfungsreife

### 3.1 Ampel (pro Thema)
- Rot: Stufe 0–1 · Gelb: Stufe 2 · Grün: Stufe 3–4  
  (über mastery_score: Rot < 0.45, Grün > 0.75 und stability > 0.55)

### 3.2 Prüfungsreife (pro Fach, `core/readiness.ts`)
```
prüfungsreife = Σ priority · score(stufe) / Σ priority
score: Stufe 3–4 = 1, Stufe 2 = 0.5, sonst 0
```
- **prüfungsreif**, wenn prüfungsreife ≥ 0.85 **und** alle Themen mit priority 3 auf Stufe ≥ 3 **und** ein Prüfungs-Modus-Lauf bestanden (an einem Tag ≥ 8 MSA-Aufgaben mit ≥ 60 % richtig)
- Restaufwand-Schätzung: Σ Aufgaben bis Prüfungsfest je Thema (Neu 8, Angefangen 7, Geübt 4, Sicher 1, veraltet 2), Tage = Restaufwand / Tagesziel
- Budget: ≈ 9 Aufgaben je Thema → ≈ 660 Aufgaben für alle drei Fächer, ≈ 8 Wochen bei 12 Aufgaben/Tag

---

## 4. Repair Mode

### 4.1 Aktivierung
- Bei falscher Antwort (nicht im Prüfungs-Modus): repair_mode(topic_id) = true, repair_queue neu erzeugen

### 4.2 Repair Queue
1. 2 Aufgaben: gleiches topic_id, difficulty ≤ aktuelle difficulty
2. 1 Transferaufgabe: topic_id = parent_id (sonst gleiches Thema), difficulty = aktuelle oder +1

### 4.3 Verhalten
- Solange repair_queue nicht leer: Aufgaben nur aus repair_queue, Selection Engine und Tagesplan ignorieren

### 4.4 Transferregel
- korrekt: repair_mode endet
- falsch: neue repair_queue, difficulty der 2 Aufgaben = max(1, aktuelle − 1)

---

## 5. Auswahl

### 5.1 Tagesplan (Modus PLAN, `core/plan.ts`)
Ziel: eine begrenzte Tagessitzung (Standard 12 Aufgaben, Rest des Tagesziels; ein erledigter Tag bekommt eine Extra-Runde gleicher Größe). Slots in dieser Reihenfolge:
1. **Checks**, die fällig sind (§2): 1 Aufgabe Prüfungsniveau je Thema, max. 3, wichtigste zuerst
2. **Reparaturen**: angefangene Themen unter Geübt mit Fehler in den letzten 6: 2 leichtere Aufgaben (1–2, 2–3) je Thema, max. 4 Slots
3. **Leiter**: nächste Themen unter Sicher in Lehrplan-Reihenfolge (topics.json), priority ≥ 2 vor priority 1; Geübt → 2 Aufgaben Prüfungsniveau (3–4), sonst 3 Aufgaben (1–2, 2–3, 2–3)
4. **Erhalt**: sind alle Themen sicher, die am längsten nicht geübten (Prüfungsniveau)
5. Winzige Pakete: Themen zyklisch auffüllen

Die Session nimmt die Slots der Reihe nach; Repair Mode geht vor. Reicht ein Slot-Thema keine passende Aufgabe, wird der Slot übersprungen; ist der Plan erschöpft, geht es wie im Schnelltraining weiter.

### 5.2 Schnelltraining / Fehler-Training (unverändert)
- Kennzahlen: weakness = 1 − mastery_score, error_rate der letzten 20 Versuche, recency (min(1, Tage/7), nie geübt = 1), stability_factor = 1 − stability
- `priority = 0.45·weakness + 0.25·error_rate + 0.20·recency + 0.10·stability_factor`
- Quick: 70 % Top-Prioritäten, 20 % Gelb, 10 % Grün · Errors: error_rate, dann weakness

### 5.3 Prüfungs-Modus
- Nur `exam`-Aufgaben 2022–2025, Basisaufgaben (hilfsmittelfrei) in den ersten 40 %, kein Repair Mode

---

## 6. Difficulty

| mastery_score (Stufe) | Difficulty |
|--------------|-----------|
| < 0.45 (Neu, Angefangen) | 1 .. 2 |
| 0.45 .. 0.75 (Geübt) | 2 .. 3 |
| > 0.75 (Sicher, Prüfungsfest) | 3 .. 4 |

Difficulty 5: nur Prüfungs-Modus. Tagesplan-Slots bringen ihre eigene Spanne mit (§5.1).

---

## 7. Varianten (deterministisch)

### 7.1 Seed Inputs
- user_id, subject, topic_id, base_question_id, date_key (YYYY-MM-DD), mode_key (PLAN | QUICK | TOPIC | ERRORS | MSA), counter

### 7.2 Canonical String
```
user_id|subject|topic_id|base_question_id|date_key|mode_key|counter
```

### 7.3 Seed
- SHA-256, erste 8 Bytes als uint64 (Big Endian), lokaler RNG pro Aufgabe

### 7.4 Counter
- Key (user_id, subject, topic_id, mode_key, date_key), inkrementiert pro Variant; Repair Mode nutzt weiter

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
  "topic_id": "...",
  "difficulty": 3,
  "mode": "PLAN",
  "rendered_vars": {},
  "user_answer": "...",
  "is_correct": true,
  "created_at": "ISO"
}
```

---

## 9. Implementationsregeln

- Keine globale random.seed Nutzung, keine eval
- Repair Mode überschreibt Selection Engine und Tagesplan
- Mastery Update nach Persistierung des Attempts; die Stufe ist jederzeit aus den Attempts rekonstruierbar

---

Ende von ALGORITHM.md
