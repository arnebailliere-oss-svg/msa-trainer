// Spickzettel: questions, modal verbs, if-sentences, comparison (replaces the old page L_EN_GRAMMAR).
const { P, L, T, TH, sheet, card } = require("./lib.cjs");

sheet(
  "lessons/en_02_grammar.json",
  {
    id: "L_EN_GRAMMAR",
    subject: "EN",
    topicId: "EN_USE_MODALS",
    alsoFor: ["EN_USE_IF", "EN_USE_QUEST_NEG", "EN_USE_COMPARISON"],
    title: "Grammatik: Fragen, Modalverben, if-Sätze, Vergleichen",
    guided: ["P_EN_FRAGEN", "P_EN_MODALS", "P_EN_IF", "P_EN_COMPARISON"],
    intro: "Das hier ist dein Spickzettel zu vier Grammatikthemen. Hier schaust du nach, wenn du ein Muster vergessen hast. Gelernt wird oben in den Lektionen mit Ferdinand, jedes Thema in einer eigenen Lektion. Tipp auf eine Karte, um sie zu öffnen.",
    source: "Eigene Darstellung nach den Anforderungen des MSA Englisch",
  },
  [
    card("terms", "Fragewörter", [
      TH(["Englisch", "Deutsch", "Die Antwort ist"], ["who", "wer", "ein Mensch"], ["what", "was", "eine Sache"], ["where", "wo", "ein Ort"], ["when", "wann", "eine Zeit"], ["why", "warum", "ein Grund (because …)"], ["how", "wie", "eine Art und Weise"], ["how many", "wie viele", "eine Zahl (zählbar)"], ["how much", "wie viel", "eine Menge (nicht zählbar)"]),
      "Vorsicht: *who* bedeutet wer, und *where* bedeutet wo.",
    ]),
    card("steps", "So baust du eine Frage", [
      "Die Reihenfolge ist immer gleich: Fragewort, Helfer, Person, Verb.",
      TH(["Wann?", "Beispiel"], ["jetzt, I / you / we / they", "*Where **do** you live?*"], ["jetzt, he / she / it", "*Where **does** she live?*"], ["Vergangenheit", "*Where **did** you live?*"], ["mit be", "*Where **is** the station?*"], ["mit einem anderen Helfer", "*What **can** we do?*"], ["Frage nach dem, der etwas tut", "*Who **broke** the window?*"]),
      "Nach do, does und did steht das Verb in der Grundform.",
    ]),
    card("terms", "Modalverben", [
      TH(["Englisch", "Deutsch", "Beispiel"], ["can", "können", "*She can swim.*"], ["must", "müssen", "*I must go.*"], ["should", "sollte (ein Rat)", "*You should see a doctor.*"], ["may", "dürfen, oder: vielleicht", "*May I go?*"], ["could", "könnte, konnte", "*Could you help me?*"], ["must not", "nicht dürfen (verboten)", "*You must not park here.*"], ["don't have to", "nicht müssen (nicht nötig)", "*You don't have to come.*"]),
      "Für alle Modalverben gilt: Sie bekommen kein -s, danach steht die Grundform ohne to, und Fragen bildet man ohne do.",
    ]),
    card("terms", "Modalverben: gestern und morgen", [
      TH(["Heute", "Gestern", "Morgen"], ["can", "could / was able to", "will be able to"], ["must / have to", "had to", "will have to"], ["may", "was allowed to", "will be allowed to"]),
      "Die Ersatzformen brauchst du, weil es Formen wie *will can* oder *musted* nicht gibt.",
    ]),
    card("formula", "if-Sätze", [
      TH(["Typ", "Wann?", "Teil mit if", "Anderer Teil"], ["1", "Es kann gut passieren.", "Simple Present", "will + Grundform"], ["2", "Es ist nur vorgestellt.", "Simple Past", "would + Grundform"], ["3", "Es ist vorbei.", "had + 3. Form", "would have + 3. Form"]),
      L("Typ 1: *If it rains, I will stay at home.*", "Typ 2: *If I had more time, I would learn Spanish.*", "Typ 3: *If I had studied, I would have passed.*"),
      "Im Teil mit if steht nie *will* oder *would*. Steht if am Satzanfang, trennt ein Komma die beiden Teile.",
    ]),
    card("terms", "Vergleichen", [
      TH(["Das Adjektiv hat", "Komparativ", "Superlativ"], ["1 Silbe (*tall*)", "taller", "the tallest"], ["2 Silben mit y (*happy*)", "happier", "the happiest"], ["2 und mehr Silben (*expensive*)", "more expensive", "the most expensive"], ["*good*", "better", "the best"], ["*bad*", "worse", "the worst"], ["*much, many*", "more", "the most"]),
      L("*Ben is taller **than** Tom.* Das Wort than bedeutet als.", "*Tom is **as tall as** Ben.* Das bedeutet: so groß wie."),
    ]),
    card("mistake", "Typische Fehler", [
      TH(
        ["Falsch", "Richtig", "Warum?"],
        ["*Where you live?*", "*Where do you live?*", "Der Helfer fehlt."],
        ["*What does she likes?*", "*What does she like?*", "Das -s steht schon bei does."],
        ["*She cans swim.*", "*She can swim.*", "Modalverben bekommen kein -s."],
        ["*If it will rain, …*", "*If it rains, …*", "Kein will im Teil mit if."],
        ["*more taller*", "*taller*", "Endung oder more, nie beides."],
        ["*taller then me*", "*taller than me*", "than heißt als, then heißt dann."],
      ),
    ]),
    card("remember", "Merke", L("- Eine Frage baust du aus Fragewort, Helfer, Person und Verb.", "- Das Wort must not bedeutet nicht dürfen, und don't have to bedeutet nicht müssen.", "- Im Teil mit if steht weder will noch would.", "- Kurze Adjektive bekommen -er und -est, lange bekommen more und most.")),
  ],
);
