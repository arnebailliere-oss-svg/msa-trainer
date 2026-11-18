# MSA Trainer: implementation plan for Windows and Android

Status: plan, written 2026-11-18 in the morning.

> **Note, 2026-11-18 evening: what changed after this plan was written.**
> The plan below is kept as written. Where it differs from what was built, this note is right.
>
> - **Windows uses Electron, not Tauri.** Rust is not installed on the build PC and the owner chose Electron. The Windows app is about 360 MB unpacked (roughly 100 MB as an installer) instead of the 10 MB named below.
> - **Order:** the plan says Windows first. The owner then started with Android. Both shells now exist as test builds.
> - **Free part:** wider than proposed in section 2. Per subject the first three owl lessons and the first three topics with training are free, plus calculator, Formelblatt, help and progress.
> - **Built so far:** G1 (edition switch), G2 (locks), G3 (free part and unlock screen, with a test unlock instead of a purchase), G4 (icons, splash, DCS start screen, about page), A1 (four Android apps from one project), W1 (Windows shell).
> - **Not built:** purchase on either platform, signed release builds, installer, store listings.
> - **App IDs confirmed by the owner:** `net.dcsanalytics.msatrainer.komplett`, `.mathe`, `.deutsch`, `.englisch`.
>
> Current state, paths and build commands: `E:\Dev\MSA_TRAINER_NOTES.md`.

## 1. What we sell

Four products, on two platforms.

| Product | Content | Windows (own shop) | Android (Google Play) |
|---|---|---|---|
| MSA Trainer Mathe | 14 owl lessons, 12 Spickzettel, 440 questions, calculator, Formelblatt | licence key "Mathe" | own app |
| MSA Trainer Deutsch | 24 owl lessons, 6 Spickzettel, 293 questions, 5 reading texts, writing tasks | licence key "Deutsch" | own app |
| MSA Trainer Englisch | 17 owl lessons, 4 Spickzettel, 220 questions, reading texts, writing tasks | licence key "Englisch" | own app |
| MSA Trainer Komplett | all three | licence key "Komplett" | own app |

Decisions taken on 2026-11-18:

- **Android:** three subject apps plus one Komplett app. Four Play listings.
- **Trial:** free taste first, then pay. Applies to both platforms.
- **Windows:** one installer for everyone, unlocked by a licence key from the shop.
- **Order:** Windows first, then Android.
- **Always:** runs offline, scores stay on the device, no cloud, no account.

This replaces the decision of 2026-11-15 ("one Android app, one single unlock").

## 2. One codebase, five builds

The web app stays the only source. Every product is the same code built with a different edition setting.

| Build | Edition | Shell | Unlock |
|---|---|---|---|
| Windows | all subjects inside, locked | Tauri 2 (uses the WebView2 that Windows already has) | licence key |
| Android Mathe | Mathe only | Capacitor | one in-app purchase |
| Android Deutsch | Deutsch only | Capacitor | one in-app purchase |
| Android Englisch | Englisch only | Capacitor | one in-app purchase |
| Android Komplett | all three | Capacitor | one in-app purchase |

Why these shells:

- **Tauri** gives an installer of roughly 10 MB instead of roughly 100 MB with Electron. It renders with WebView2, which is the same browser engine our browser tests already run on. The existing Inno Setup and signing line in `E:\ChessMind_Transition\09_installers` can wrap and sign it.
- **Capacitor** packs the built web app into a normal Android app. Content ships inside the app, so it works offline from the first start.

The website version stays as it is and becomes the demo.

### What has to change in the app itself

1. **Edition switch.** A build setting decides which subjects exist. In a subject app the other two subjects do not appear anywhere: not on the dashboard, not in the owl index, not in the exam mode, not in the help pages. Content for the other subjects is not shipped in that app.
2. **Entitlement layer.** One place in the code answers "is this subject unlocked?". On Windows it reads the licence key, on Android the purchase. Every locked board, question set and exam asks this one place.
3. **Free taste.** Proposal, the same on both platforms:
   - the first owl lesson of each subject, complete
   - one practice set of 10 questions per subject
   - the calculator and the Formelblatt
   - everything else is visible with a lock, so the buyer sees what they get
4. **Buy screen.** Windows: "enter key" plus a link to the shop. Android: the Play purchase dialog. Text follows the naming rule (no "bot", "AI", "engine").
5. **Scores.** Already stored on the device (IndexedDB), with export and import of a backup file. To check on both shells: scores survive an app update, and the backup file can be saved to and loaded from a normal folder.
6. **No service worker in the shells.** The PWA cache is only for the website. Inside the apps the files are local anyway.
7. **No source references.** Already done in the content build; the store texts follow the same rule ("general MSA material").

## 3. Work packages

Sizes: S = up to a day of work, M = a few days, L = a week or more. These are estimates, not measurements.

### Phase 0: shared groundwork (before either platform)

| # | Package | Size | Done when |
|---|---|---|---|
| G1 | Edition switch in build and UI | M | Four edition builds exist; a browser test proves that a subject build shows and ships only its subject |
| G2 | Entitlement layer plus locks in the UI | M | With no entitlement only the free taste opens; with an entitlement everything opens; unit and browser tests cover both |
| G3 | Free taste and buy screen | M | You have clicked through it and said yes to the feel |
| G4 | App name, icon, colours, texts for four products | S | One set of icons and names, approved by you |

### Phase 1: Windows

| # | Package | Size | Done when |
|---|---|---|---|
| W1 | Tauri shell around the Komplett build | M | The app starts on a clean Windows 10 and Windows 11 machine without internet |
| W2 | Licence keys | L | A key bought in the shop unlocks the right subjects; a wrong key does not; see open decision D1 |
| W3 | Scores and backup on Windows | S | Scores survive update and reinstall; export and import work through a normal file dialog |
| W4 | Installer, signed | M | Signed Setup.exe built through the existing installer line; no SmartScreen block on a test machine |
| W5 | Shop products and delivery | M | Four products in the shop, each sends the download link and the right key by e-mail; a test purchase runs end to end |
| W6 | Updates | S | See open decision D3 |
| W7 | Release test on the release build | M | The full checklist passes on the signed installer, on a PC that never had the dev version |

### Phase 2: Android

| # | Package | Size | Done when |
|---|---|---|---|
| A1 | Capacitor shell, four app builds from one project | M | Four APKs install side by side on one phone and run offline |
| A2 | Play Billing, one unlock per app | L | Purchase, restore after reinstall, and refund all behave correctly with Play test accounts |
| A3 | Phone fit | M | Back button, keyboard over input fields, rotation, small screens; the existing phone browser tests pass inside the app |
| A4 | Store listings, four times | L | Icon, feature graphic, screenshots, short and long text in German for each app, audited against the approved wording |
| A5 | Play Console setup, four times | L | Data safety form (no data collected), content rating, target audience 13 and older, price; one stage at a time with you |
| A6 | Test tracks | M | Internal test, then closed test, then production; see risk R1 |
| A7 | Release test on the release build | M | Checklist passes on the Play-delivered build on a phone that never had a debug build |

### Phase 3: after launch

- Website points to both stores; the web version is labelled as the demo.
- One release routine: a content fix is made once and goes out as five builds.

## 4. What only you can do

- Approve the free taste and the buy screen (G3) and the names and icons (G4).
- Set the four prices on each platform.
- Create the four shop products and the four Play apps; I prepare every text and file and walk you through the console click by click.
- Recruit testers for the Play closed test if it is required (R1).
- Say "go" before anything is published.

## 5. Open decisions

I will ask these as multiple choice when the package starts. My recommendation is first in each.

**D1. How does the Windows key work?**
- One-time activation over the internet, offline for ever after. Uses the licence function of the shop system, no server of our own. (recommended)
- Fully offline key that the app checks by itself. Needs a small service of our own that creates the key after each purchase.

**D2. A customer owns one subject and wants Komplett.**
- Windows: an upgrade price in the shop. Android: no upgrade path between separate apps; the store text says so clearly. (recommended)
- No upgrade offer on either platform.

**D3. How do Windows customers get updates?**
- The app shows "new version available" with a download link when it happens to be online. (recommended)
- Automatic update inside the app.
- No update check; the shop e-mail announces new versions.

**D4. Scores when someone moves from a subject app to Komplett on Android.**
- Use the existing backup file: export in the old app, import in the new one, with a hint on the first start. (recommended)
- Do nothing.

**D5. Prices.** Four prices per platform. Play takes its commission, and VAT handling in the shop follows K-083.

## 6. Risks

- **R1. Play closed test.** Play accounts for individuals that are new must run a closed test with at least 12 testers for 14 days before an app may go to production. This probably applies to each of the four apps. I will check the current rule and your account type before A6 starts; if it applies, the four tests should run in parallel.
- **R2. Four Play listings.** Every release means four uploads and four reviews. Four near-identical apps from one account can be flagged as repetitive content. The three subject apps differ in content, which helps; the listings must make that visible.
- **R3. Scores do not move between Android apps.** Each app has its own storage. D4 covers it with the backup file.
- **R4. SmartScreen.** An unsigned or freshly signed installer triggers a warning. The existing signing line reduces this; reputation builds with downloads.
- **R5. Key sharing.** A Windows key can be passed on. D1 option one limits the number of activations per key.
- **R6. WebView differences.** Old Android phones have old WebViews. A minimum Android version will be set after measuring on real devices.
- **R7. Content rights.** The commercial PDFs and scans stay out of every build; the build already strips source notes.

## 7. Order of work

1. G1 to G4 (shared groundwork)
2. W1 to W7, ending with a signed installer and a working shop purchase
3. A1 to A7, ending with four apps in production
4. Phase 3

Each package starts with its open decisions as multiple choice and ends with evidence on the release build. Nothing is published without your go.
