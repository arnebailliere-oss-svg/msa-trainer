# SRS: System Requirements Specification

## 1. Plattform
- Python 3.11+
- Desktop Windows (primär), später optional macOS
- Offline first, keine Netzwerkzugriffe

## 2. UI
- PySide6 (Qt)
- Views:
  - DashboardView
  - SessionView
  - ResultView
  - ParentView
  - SettingsView

## 3. Datenhaltung
- SQLite lokal
- Tabellen: users, topics, questions, attempts, mastery

## 4. Performance
- App Start: < 3 Sekunden auf Standard Laptop
- Auswertung Antwort: < 150 ms (ohne DB Overhead)
- UI Navigation flüssig

## 5. Datenschutz
- Alle Daten lokal
- Keine Telemetrie, keine externen APIs

## 6. Kompatibilität
- Inhalte über JSON Content Packs
- Import mit Validierung gegen JSON Schema

## 7. Logging
- Local debug log (dev)
- Keine personenbezogenen Daten im Log, außer user_id intern
