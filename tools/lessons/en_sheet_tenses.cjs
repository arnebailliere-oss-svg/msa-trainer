// Rebuilds L_EN_TENSES as a Spickzettel (look-up sheet) to the comprehensibility standard.
const fs = require("fs");
const file = "C:/Dev2/MSATRAINER/content_packs/berlin_msa/lessons/en_01_tenses.json";
const NL = "\n";
const P = (...paras) => paras.join(NL + NL);
const T = (...rows) => rows.map((r) => "| " + r.join(" | ") + " |").join(NL);
const tense = (name, wann, bau, beispiel, signal) => [
  ["**" + name + "**", ""],
  ["Wann?", wann],
  ["Bau", bau],
  ["Beispiel", "*" + beispiel + "*"],
  ["Signalwörter", signal],
];
const verbs = (list) => T(["Grundform", "2. Form", "3. Form", "Deutsch"], ["---", "---", "---", "---"], ...list.map((v) => v.split("|").map((x) => x.trim())));

const lesson = {
  id: "L_EN_TENSES",
  subject: "EN",
  topicId: "EN_USE_TENSES",
  alsoFor: ["EN_USE"],
  title: "Tenses: die englischen Zeiten",
  sheet: true,
  guided: ["P_EN_VERBFORMEN", "P_EN_ZEITFORMEN", "P_EN_ZEIT_VORBEI", "P_EN_ZEIT_WEITER"],
  intro: "Das hier ist dein Spickzettel. Hier lernst du nichts Neues, hier schaust du nach, wenn du dir bei einer Zeit nicht sicher bist. Gelernt wird oben in den Lektionen mit Ferdinand. Tipp auf eine Karte, um sie zu öffnen.",
  source: "Eigene Darstellung; Auswahl der Zeiten und Verben nach den Anforderungen des MSA Englisch",
  sections: [
    {
      kind: "what",
      title: "So findest du die richtige Zeit",
      primer: "P_EN_ZEITFORMEN",
      body: P(
        "Geh in drei Schritten vor.",
        "(1) Such im Satz ein **Signalwort**. Das ist ein Wort wie *yesterday* oder *now*, das verrät, wann etwas passiert.",
        "(2) Überleg, wann es passiert: früher, jetzt oder später.",
        "(3) Frag dich: Läuft es gerade, oder ist es fertig? Was gerade läuft, bekommt eine Form mit *-ing*.",
        "In den Karten darunter findest du jede Zeit mit Bau, Beispiel und Signalwörtern.",
      ),
    },
    {
      kind: "terms",
      title: "Gegenwart: was jetzt oder immer gilt",
      body: T(
        ...tense("Simple Present", "Etwas passiert immer, oft oder nie. Auch Fakten und Fahrpläne.", "Grundform. Bei he, she, it kommt ein **-s** dazu.", "She plays tennis every Monday.", "always, usually, often, sometimes, never, every day"),
        ...tense("Present Progressive", "Etwas passiert genau jetzt. Auch feste Pläne mit Zeitangabe.", "am, is oder are + Verb mit **-ing**", "Look! They are playing tennis.", "now, at the moment, right now, Look!, this week"),
      ),
    },
    {
      kind: "terms",
      title: "Vergangenheit: was vorbei ist",
      body: T(
        ...tense("Simple Past", "Etwas ist vorbei und abgeschlossen. Oft steht dabei, wann es war.", "Verb mit **-ed** oder die 2. Form", "I went to London last week.", "yesterday, last week, a month ago, in 1997, then"),
        ...tense("Past Progressive", "Etwas lief gerade, als etwas anderes passierte.", "was oder were + Verb mit **-ing**", "She was cooking when I came home.", "while, when, as"),
        ...tense("Past Perfect", "Etwas war schon vorher passiert, vor einem anderen Moment in der Vergangenheit.", "**had** + 3. Form", "When I arrived, he had already left.", "before, after, already, by then"),
      ),
    },
    {
      kind: "terms",
      title: "Present Perfect: früher passiert, heute noch wichtig",
      body: P(
        T(
          ...tense("Present Perfect", "Etwas ist früher passiert, und die Folge zählt jetzt. Oder es hat früher angefangen und dauert noch an.", "have oder has + **3. Form**", "I have lost my key. I can't get in.", "just, already, yet, ever, never, since, for, so far"),
          ...tense("Present Perfect Progressive", "Etwas dauert schon eine Weile an, und die Dauer ist wichtig.", "have oder has + **been** + Verb mit **-ing**", "She has been waiting for two hours.", "for, since, all day"),
        ),
        "So unterscheidest du es vom Simple Past: Steht eine abgeschlossene Zeitangabe wie *yesterday* im Satz, nimmst du das Simple Past. Es heißt also *I lost my key yesterday.*",
      ),
    },
    {
      kind: "terms",
      title: "Zukunft: was noch kommt",
      body: T(
        ...tense("will-future", "Vorhersagen, Versprechen und Dinge, die du dir gerade erst überlegst.", "**will** + Grundform", "I think it will rain tomorrow.", "tomorrow, next week, I think, I promise"),
        ...tense("going to-future", "Feste Pläne. Auch dann, wenn man schon sieht, was gleich passiert.", "am, is oder are + **going to** + Grundform", "Look at those clouds. It is going to rain.", "tonight, next summer, Look!"),
      ),
    },
    {
      kind: "formula",
      title: "since oder for?",
      body: P(
        "**since** nennt den Zeitpunkt, an dem etwas angefangen hat: *since 2003, since Monday, since I was five*.",
        "**for** nennt die Dauer, also wie lange etwas schon geht: *for two hours, for three years, for a long time*.",
        "Beide Wörter stehen beim Present Perfect: *He has lived here since 2003. He has been waiting for two hours.*",
      ),
    },
    {
      kind: "mistake",
      title: "Fünf typische Fehler",
      body: T(
        ["Falsch", "Richtig", "Warum?"],
        ["---", "---", "---"],
        ["*she play*", "*she plays*", "Bei he, she, it bekommt das Verb ein -s."],
        ["*I have seen him yesterday.*", "*I saw him yesterday.*", "*yesterday* ist abgeschlossen. Dann steht das Simple Past."],
        ["*since two hours*", "*for two hours*", "Zwei Stunden sind eine Dauer. Dazu gehört *for*."],
        ["*Did you went?*", "*Did you go?*", "Nach *did* steht das Verb in der Grundform."],
        ["*If it will rain, …*", "*If it rains, …*", "Im Satzteil mit *if* steht kein *will*."],
      ),
    },
    {
      kind: "terms",
      title: "Unregelmäßige Verben: die wichtigsten",
      body: P(
        "Diese Verben bilden ihre 2. und 3. Form nicht mit *-ed*. Sie sind hier nach Mustern sortiert, weil man sich Gruppen leichter merkt als eine lange Liste.",
        "**Alle drei Formen sind gleich**",
        verbs(["cost | cost | cost | kosten", "cut | cut | cut | schneiden", "hit | hit | hit | schlagen, treffen", "let | let | let | lassen", "put | put | put | legen, stellen", "read | read | read | lesen (2. und 3. Form spricht man wie *red*)"]),
        "**2. und 3. Form sind gleich und enden auf -ought oder -aught**",
        verbs(["bring | brought | brought | bringen", "buy | bought | bought | kaufen", "think | thought | thought | denken", "catch | caught | caught | fangen", "teach | taught | taught | unterrichten"]),
        "**2. und 3. Form sind gleich**",
        verbs([
          "build | built | built | bauen",
          "feel | felt | felt | fühlen",
          "find | found | found | finden",
          "get | got | got | bekommen",
          "have | had | had | haben",
          "hear | heard | heard | hören",
          "keep | kept | kept | behalten",
          "leave | left | left | weggehen, verlassen",
          "lose | lost | lost | verlieren",
          "make | made | made | machen",
          "mean | meant | meant | bedeuten, meinen",
          "meet | met | met | treffen",
        ]),
        verbs([
          "pay | paid | paid | bezahlen",
          "say | said | said | sagen",
          "sell | sold | sold | verkaufen",
          "send | sent | sent | schicken",
          "sit | sat | sat | sitzen",
          "sleep | slept | slept | schlafen",
          "spend | spent | spent | ausgeben, verbringen",
          "stand | stood | stood | stehen",
          "tell | told | told | erzählen, sagen",
          "win | won | won | gewinnen",
        ]),
        "**Grundform und 3. Form sind gleich**",
        verbs(["become | became | become | werden", "come | came | come | kommen", "run | ran | run | rennen"]),
        "**Alle drei Formen sind verschieden**",
        verbs([
          "be | was / were | been | sein",
          "begin | began | begun | anfangen",
          "break | broke | broken | zerbrechen",
          "choose | chose | chosen | wählen",
          "do | did | done | tun, machen",
          "drive | drove | driven | fahren",
          "eat | ate | eaten | essen",
          "fall | fell | fallen | fallen",
          "forget | forgot | forgotten | vergessen",
          "give | gave | given | geben",
          "go | went | gone | gehen",
          "know | knew | known | wissen, kennen",
        ]),
        verbs([
          "ride | rode | ridden | reiten, Rad fahren",
          "see | saw | seen | sehen",
          "show | showed | shown | zeigen",
          "speak | spoke | spoken | sprechen",
          "take | took | taken | nehmen",
          "wake up | woke up | woken up | aufwachen",
          "wear | wore | worn | tragen (Kleidung)",
          "write | wrote | written | schreiben",
        ]),
      ),
    },
    {
      kind: "remember",
      title: "Merke",
      body: [
        "- Such immer zuerst das Signalwort im Satz. Es verrät dir die Zeit.",
        "- Bei he, she und it bekommt das Verb im Simple Present ein -s.",
        "- Nach have und has steht immer die 3. Form.",
        "- Das Wort since nennt den Zeitpunkt, das Wort for nennt die Dauer.",
        "- Nach did steht das Verb wieder in der Grundform.",
      ].join(NL),
    },
  ],
};
fs.writeFileSync(file, JSON.stringify([lesson], null, 2) + NL);
console.log("written", lesson.sections.length, "sections");
