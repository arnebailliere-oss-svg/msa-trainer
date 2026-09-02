# ACCEPTANCE_TESTS: Definition of Done

## A. Core Flow
1. App Start
- GIVEN App installiert
- WHEN App startet
- THEN Dashboard erscheint innerhalb 3 Sekunden

2. Session Start
- GIVEN Profil vorhanden
- WHEN Schüler startet Quick Training
- THEN erste Aufgabe erscheint ohne weitere Eingaben

3. Attempt Logging
- WHEN Schüler Antwort abgibt
- THEN Attempt wird in SQLite gespeichert (attempts Tabelle)
- AND mastery wird aktualisiert (mastery Tabelle)

## B. Repair Mode
4. Repair Mode Trigger
- GIVEN normale Session
- WHEN eine Antwort falsch ist
- THEN nächste 2 Aufgaben sind gleicher topic_id, difficulty <= aktuelle difficulty
- AND danach 1 Transferaufgabe aus parent Topic oder Oberkategorie

5. Repair Mode Exit
- WHEN Transferaufgabe korrekt
- THEN repair_mode endet und normale Auswahl läuft weiter

6. Repair Mode Persist
- WHEN Transferaufgabe falsch
- THEN repair_mode bleibt aktiv und difficulty der Folgeaufgaben sinkt um 1 (min 1)

## C. Ampel
7. Ampel Regeln
- GIVEN mastery_score < 0.45
- THEN Topic Anzeige Rot

- GIVEN 0.45 <= mastery_score <= 0.75
- THEN Topic Anzeige Gelb

- GIVEN mastery_score > 0.75 AND stability > 0.55
- THEN Topic Anzeige Grün

## D. Content Pack
8. Import und Validierung
- GIVEN JSON Pack Dateien
- WHEN Import ausgeführt wird
- THEN Schema Validierung muss erfolgreich sein
- AND Topics und Questions sind in DB verfügbar

## E. Rechner
9. Calculator Safety
- WHEN Nutzer Ausdruck eingibt
- THEN keine Verwendung von eval
- AND nur erlaubte Tokens: digits, + - * / ( ) . , %

10. Calculator Integration
- WHEN Mathe Session läuft
- THEN Rechner ist im Session Screen nutzbar ohne Screenwechsel
