// Spickzettel: Writing (replaces the old lesson page L_EN_WRITING).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/en_04_writing.json",
  {
    id: "L_EN_WRITING",
    subject: "EN",
    topicId: "EN_WRITE_EMAIL",
    alsoFor: ["EN_WRITE_GUIDED", "EN_WRITE_ERRORFIX", "EN_WRITE_MEDIATION", "EN_WRITE", "EN_VOCAB", "EN_VOCAB_SCHOOL", "EN_VOCAB_DAILYLIFE", "EN_VOCAB_TRAVEL", "EN_VOCAB_OPINIONS"],
    title: "Writing: E-Mail, Blog, Foto, Mediation",
    guided: ["P_EN_EMAIL", "P_EN_BLOG", "P_EN_PHOTO", "P_EN_MEDIATION", "P_EN_FEHLER"],
    intro: "Das hier ist dein Spickzettel für die Schreibaufgaben. Hier findest du die Bausteine und Wendungen zum Nachschlagen. Gelernt wird oben in den Lektionen mit Ferdinand, jede Aufgabenart in einer eigenen Lektion. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach den Anforderungen des MSA Englisch",
  },
  [
    card("what", "Worauf es Punkte gibt", [
      TH(["Dafür gibt es Punkte", "Das heißt für dich"], ["Inhalt", "Alle Fragen und Punkte der Aufgabe sind beantwortet."], ["Sprache", "Man versteht dich, und die Sätze sind richtig gebaut."], ["Länge", "Die verlangte Wortzahl ist erreicht."]),
      "Zähl vor dem Schreiben die Fragen in der Aufgabe und nach dem Schreiben deine Wörter.",
    ]),
    card("terms", "E-Mail: die sechs Teile", [
      TH(["Teil", "An Freunde (informell)", "An Fremde (formell)"], ["Betreff", "*Subject: Your visit*", "*Subject: Room in July*"], ["Anrede", "*Hi Emma,*", "*Dear Mr Brown,* / *Dear Sir or Madam,*"], ["Erster Satz", "*Thanks for your e-mail!*", "*I am writing to ask about …*"], ["Hauptteil", "ein Absatz pro Frage", "ein Absatz pro Frage"], ["Schluss", "*Best wishes,*", "*Yours sincerely,* / *Yours faithfully,*"], ["Name", "*Lena*", "*Lena Berger*"]),
      "Nach *Dear Mr Brown* endet die E-Mail mit *Yours sincerely*. Nach *Dear Sir or Madam* endet sie mit *Yours faithfully*.",
    ]),
    card("example", "Eine fertige E-Mail", [
      L("*Subject: Your visit in July*", "*Hi Emma,*"),
      "*Thanks for your e-mail! It's great that you want to come.*",
      "*We could go to the zoo and have a picnic in the park. In the evening there is an open-air cinema near my school.*",
      "*You can stay at my place. My brother is away in July, so his room is free.*",
      "*In July it is usually warm, but bring a rain jacket.*",
      L("*Write back soon!*", "*Best wishes,*", "*Lena*"),
    ]),
    card("terms", "Blog-Antwort: die vier Bausteine", [
      TH(["Baustein", "So fängst du an"], ["Meinung", "*In my opinion, …* / *I think …*"], ["Grund", "*… because …*"], ["Beispiel von dir", "*For example, I …*"], ["Schluss", "*What about you?*"], ["Zustimmen", "*I agree with you.* / *You are right.*"], ["Widersprechen", "*I see your point, but …*"], ["Zwei Seiten", "*On the one hand, … On the other hand, …*"]),
    ]),
    card("terms", "Wörter, die Sätze verbinden", [TH(["Englisch", "Deutsch", "Beispiel"], ["and", "und", "*I like football and tennis.*"], ["but", "aber", "*I like games, but I don't play every day.*"], ["because", "weil", "*I stayed at home because I was ill.*"], ["so", "deshalb", "*It was late, so I went home.*"], ["however", "jedoch", "*However, it can be expensive.*"], ["also", "auch", "*I also like music.*"])]),
    card("terms", "Ein Foto beschreiben", [
      "Geh in drei Schritten vor: zuerst der Überblick, dann wo etwas ist, zum Schluss dein Gedanke.",
      TH(["Deutsch", "Englisch"], ["Das Foto zeigt …", "*The photo shows …*"], ["Auf dem Bild sieht man …", "*In the picture you can see …*"], ["im Vordergrund / im Hintergrund", "*in the foreground / in the background*"], ["links / rechts / in der Mitte", "*on the left / on the right / in the middle*"], ["neben / hinter / vor", "*next to / behind / in front of*"], ["Es gibt …", "*There is … / There are …*"], ["Es sieht aus wie …", "*It looks like …*"]),
      "Es heißt *in the picture*. Was auf dem Foto passiert, steht im Present Progressive: *She is riding her bike.*",
    ]),
    card("steps", "Mediation", ["(1) Lies zuerst die Aufgabe und zähl die Punkte, die dein Freund wissen will.", "(2) Markiere im deutschen Text nur die Stellen zu diesen Punkten.", "(3) Sag jeden Punkt in einem kurzen, einfachen englischen Satz.", "Du gibst den Sinn weiter und übersetzt nicht Wort für Wort. Fehlt dir ein Wort, umschreibst du es: Für Tierarzt schreibst du *a doctor for animals*. Der Einleitungssatz heißt: *The article is about …*"]),
    card("mistake", "Typische Fehler aus dem Deutschen", [
      TH(
        ["Falsch", "Richtig"],
        ["*I have 15 years.*", "*I am 15.*"],
        ["*at Monday*", "*on Monday*"],
        ["*on July*", "*in July*"],
        ["*in six o'clock*", "*at six o'clock*"],
        ["*interested for*", "*interested in*"],
        ["*good in maths*", "*good at maths*"],
        ["*since two years*", "*for two years*"],
        ["*I become a present.*", "*I get a present.*"],
        ["*I did a mistake.*", "*I made a mistake.*"],
        ["*She said me …*", "*She told me …*"],
        ["*I am agree.*", "*I agree.*"],
        ["*on the picture*", "*in the picture*"],
      ),
    ]),
    card("terms", "Wortschatz nach Themen", [
      "**Schule und Beruf**",
      TH(["Englisch", "Deutsch"], ["to apply for", "sich bewerben um"], ["internship", "Praktikum"], ["CV", "Lebenslauf"], ["job interview", "Vorstellungsgespräch"], ["skills", "Fähigkeiten"]),
      "**Reisen und Wohnen**",
      TH(["Englisch", "Deutsch"], ["accommodation", "Unterkunft"], ["journey / trip", "Reise / Ausflug"], ["sightseeing", "Besichtigungen"], ["to book", "buchen"], ["neighbourhood", "Wohngegend"]),
      "**Medien und Technik**",
      TH(["Englisch", "Deutsch"], ["device", "Gerät"], ["screen time", "Zeit am Bildschirm"], ["to download / to share", "herunterladen / teilen"], ["addicted to", "süchtig nach"]),
      "**Natur und Umwelt**",
      TH(["Englisch", "Deutsch"], ["environment", "Umwelt"], ["pollution", "Verschmutzung"], ["to protect", "schützen"], ["climate", "Klima"]),
    ]),
    card("remember", "Merke", L("- Zähl zuerst die Fragen in der Aufgabe und beantworte jede in einem eigenen Absatz.", "- Jede Meinung braucht einen Grund mit because.", "- Bei der Mediation gibst du den Sinn weiter und nicht die einzelnen Wörter.", "- Zähl am Ende deine Wörter und lies den Text einmal auf typische Fehler durch.")),
  ],
);
