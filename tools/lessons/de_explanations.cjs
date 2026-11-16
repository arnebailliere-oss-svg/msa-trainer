// Rewrites the explanations of the four oldest German question files (de_01–de_04) to the standard:
// full sentences instead of arrows and plus signs, and "Merke" blocks as tables or short lists.
const fs = require("fs");
const path = require("path");
const DIR = path.resolve(__dirname, "../../content_packs/berlin_msa/questions");
const NL = "\n";
const T = (head, ...rows) => [head, head.map(() => "---"), ...rows].map((r) => "| " + r.join(" | ") + " |").join(NL);
const LIST = (...items) => items.map((x) => "- " + x).join(NL);
const P = (...p) => p.join(NL + NL);

function patch(file, changes) {
  const full = path.join(DIR, file);
  const all = JSON.parse(fs.readFileSync(full, "utf8"));
  for (const [id, fn] of Object.entries(changes)) {
    const q = all.find((x) => x.id === id);
    if (!q) throw new Error("question not found: " + id);
    fn(q);
    const left = JSON.stringify([q.explanation, q.variants?.variables]).match(/→/g);
    if (left) throw new Error(`${id}: ${left.length} arrows left`);
  }
  fs.writeFileSync(full, JSON.stringify(all, null, 2) + NL);
  console.log(file, Object.keys(changes).length, "questions rewritten");
}
const recs = (q) => q.variants.variables.s.from;
const setField = (q, field, list) => {
  const r = recs(q);
  if (r.length !== list.length) throw new Error(`${q.id}: ${r.length} records, ${list.length} texts`);
  r.forEach((x, i) => (x[field] = list[i]));
};
const mapField = (q, field, fn) => recs(q).forEach((x, i) => (x[field] = fn(x[field], x, i)));
/** "a + b" → "a und b"; "*x* → *y*" → "*x* wird zu *y*". */
const plain = (s) =>
  s
    .replace(/ \+ /g, " und ")
    .replace(/(\*[^*]+\*|„[^“]+“|\b[\wäöüß-]+) → (\*\*[^*]+\*\*|\*[^*]+\*)/g, "$1 wird zu $2")
    .replace(/Suffix (-\w+)/g, "Die Endung $1");

const KOMMA_REGELN = T(
  ["Regel", "Wann?", "Beispiel"],
  ["Aufzählung", "gleichartige Teile, kein Komma vor und", "*Affen, Elefanten und Zebras*"],
  ["Satzreihe", "zwei Hauptsätze", "*Tim malt, Lea liest.*"],
  ["Satzgefüge", "Hauptsatz und Nebensatz", "*Ich bleibe, weil ich krank bin.*"],
  ["Einschub", "Nebensatz oder Zusatz in der Mitte: zwei Kommas", "*Das Haus, das alt war, wurde verkauft.*"],
  ["Infinitivgruppe", "Gruppe mit zu und einem Signal", "*Er spart, um ein Rad zu kaufen.*"],
  ["Entgegenstellung", "vor aber, sondern, doch", "*nicht dumm, sondern faul*"],
);
const SIGNALE = T(["Signal", "Wörter", "Beispiel"], ["einleitendes Wort", "um, ohne, statt, anstatt, als", "*Sie ging, ohne sich zu verabschieden.*"], ["ein Nomen davor", "Wunsch, Plan, Idee, Traum", "*Ihr Plan, im Ausland zu studieren, ist mutig.*"], ["ein hinweisendes Wort", "es, das, daran, darauf", "*Er liebt es, früh aufzustehen.*"]);

patch("de_01_kommas.json", {
  DE_KOMMA_SETZEN_T1: (q) => {
    setField(q, "regel", [
      "Mit weil beginnt ein Nebensatz. Zwischen Hauptsatz und Nebensatz steht immer ein Komma.",
      "Affen, Elefanten und Zebras sind eine Aufzählung. Zwischen ihren Teilen steht ein Komma.",
      "Hier stehen zwei Hauptsätze nebeneinander, ohne und. Dazwischen steht ein Komma.",
      "Brot und Butter sind eine Aufzählung mit und. Vor und steht kein Komma.",
      "Die Gruppe mit zu beginnt mit dem einleitenden Wort um. Davor steht ein Komma.",
      "Der Relativsatz steht mitten im Hauptsatz. Er bekommt vorn und hinten ein Komma.",
      "Mit ob beginnt ein Nebensatz. Zwischen Hauptsatz und Nebensatz steht immer ein Komma.",
      "Bellt und knurrt sind zwei Verben, die mit und verbunden sind. Vor und steht kein Komma.",
      "Die Gruppe mit zu erklärt das Nomen Wunsch. Deshalb steht ein Komma.",
      "Das Wort es weist auf die Gruppe mit zu voraus. Deshalb steht ein Komma.",
      "Das ist ein einfacher Hauptsatz mit nur einem Verb. Es gibt keinen Grund für ein Komma.",
      "Der Zusatz erklärt, wer Herr Schmidt ist. So ein eingeschobener Zusatz bekommt vorn und hinten ein Komma.",
      "Der Nebensatz mit während steht vorn. Nach seinem Verb jubelt steht das Komma.",
      "Mit dass beginnt ein Nebensatz. Zwischen Hauptsatz und Nebensatz steht immer ein Komma.",
      "Sondern zeigt einen Gegensatz an. Davor steht immer ein Komma.",
      "Aber zeigt einen Gegensatz an. Davor steht immer ein Komma.",
      "Hunger und Durst sind eine Aufzählung mit und. Vor und steht kein Komma.",
      "Der Nebensatz mit wenn steht vorn. Nach seinem Verb regnet steht das Komma.",
      "Die Gruppe mit zu beginnt mit dem einleitenden Wort ohne. Davor steht ein Komma.",
      "Peter, Anna und Tom sind eine Aufzählung. Zwischen ihren Teilen steht ein Komma.",
      "Zwei Hauptsätze sind mit oder verbunden. Dann ist kein Komma nötig.",
      "Der Nebensatz mit obwohl steht vorn. Nach seinem Verb war steht das Komma.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_regel}}" },
      { kind: "answer", body: "Richtig heißt der Satz: *{{s_korrekt}}*" },
      { kind: "remember", title: "Die Kommaregeln", body: KOMMA_REGELN },
    ];
  },
  DE_KOMMA_REGEL_MCQ_T1: (q) => {
    mapField(q, "hinweis", plain);
    q.explanation = [
      { kind: "what", title: "Woran du es erkennst", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Die Kommaregeln", body: KOMMA_REGELN },
    ];
  },
  DE_KOMMA_INFINITIV_MCQ_T1: (q) => {
    mapField(q, "hinweis", plain);
    q.explanation = [
      { kind: "what", title: "Das Signal", body: "{{s_hinweis}} Das ist eines der drei Signale, bei denen vor einer Gruppe mit zu ein Komma stehen muss." },
      { kind: "remember", title: "Die drei Signale", body: SIGNALE },
    ];
  },
  DE_SATZART_MCQ_T1: (q) => {
    mapField(q, "hinweis", (s) => plain(s).replace(/^zu und Verb/, "Die Gruppe besteht aus zu und einem Verb"));
    q.explanation = [
      { kind: "what", title: "Woran du es erkennst", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Die Teile eines Satzes", body: T(["Teil", "Daran erkennst du ihn"], ["Hauptsatz", "Er kann allein stehen. Das Verb steht an zweiter Stelle."], ["Nebensatz", "Er beginnt mit weil, dass, ob, wenn, obwohl oder mit einem Relativpronomen. Das Verb steht am Ende."], ["Infinitivgruppe", "zu und ein Verb, ohne eigenes Subjekt"]) },
    ];
  },
  DE_DIREKTE_REDE_MCQ_T1: (q) => {
    mapField(q, "regel", plain);
    q.explanation = [
      { kind: "what", title: "Die Regel", body: "{{s_regel}}" },
      { kind: "remember", title: "Zeichen bei der wörtlichen Rede", body: T(["Der Begleitsatz steht", "Zeichen", "Beispiel"], ["vorn", "Doppelpunkt", "*Sie sagte: „Ich komme morgen.“*"], ["hinten", "Komma nach dem Anführungszeichen, der Punkt fällt weg", "*„Ich komme morgen“, sagte sie.*"], ["hinten, nach Frage oder Ausruf", "das Zeichen bleibt, das Komma kommt dazu", "*„Kommst du?“, fragte sie.*"]) },
    ];
  },
});

patch("de_02_rechtschreibung.json", {
  DE_DAS_DASS_T1: (q) => {
    mapField(q, "probe", (s, r) => {
      const first = s.split(" → ")[0].replace(/ ergibt keinen Sinn$/, "").replace(/ passt$/, "");
      return r.loesung === "dass" ? `Die Probe: ${first} klingt falsch. Weder dieses noch welches passt in die Lücke. Also schreibst du **dass**.` : `Die Probe: ${first} klingt richtig. Welches passt in die Lücke. Also schreibst du **das**.`;
    });
    q.explanation = [
      { kind: "steps", title: "Die Ersatzprobe", body: "{{s_probe}}" },
      { kind: "remember", body: T(["Die Probe", "Du schreibst", "Wortart"], ["dieses oder welches passt", "das", "Artikel, Pronomen oder Relativpronomen"], ["keins von beiden passt", "dass", "Konjunktion, davor steht ein Komma"]) },
    ];
  },
  DE_DAS_DASS_BEGRUENDUNG_MCQ_T1: (q) => {
    mapField(q, "hinweis", plain);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_hinweis}}" },
      { kind: "remember", body: LIST("In der Prüfung wird oft eine Begründung verlangt.", "Du nennst die Wortart: Artikel, Pronomen, Relativpronomen oder Konjunktion.", "Und du zeigst die Ersatzprobe mit dieses oder welches.") },
    ];
  },
  DE_GROSS_KLEIN_T1: (q) => {
    mapField(q, "grund", (s) => plain(s).replace(/^Hier ist „lesen“ ein Verb: klein\.$/, "Hier ist lesen ein Verb, denn es sagt, was jemand tun möchte. Verben schreibt man klein.").replace(/^Verb nach „wollen“: klein\.$/, "Nach wollen steht ein Verb. Verben schreibt man klein."));
    q.explanation = [
      { kind: "what", title: "Die Regel", body: "{{s_grund}}" },
      {
        kind: "remember",
        title: "Groß oder klein",
        body: T(["", "Regel", "Beispiel"], ["**Groß**", "Nomen mit einem Begleiter davor", "*die Freude, viel Spaß*"], ["**Groß**", "Verb oder Adjektiv mit Artikel, auch nach beim, zum, ins, etwas, nichts, alles", "*das Lesen, beim Essen, alles Gute*"], ["**Groß**", "die höfliche Anrede", "*Können Sie mir helfen?*"], ["**Klein**", "Verben und Adjektive ohne Artikel davor", "*Wir wollen essen.*"], ["**Klein**", "die höchste Stufe mit am", "*am schnellsten*"], ["**Klein**", "Zeitangaben auf -s und heute, morgen, gestern", "*montags, bis morgen*"]),
      },
    ];
  },
  DE_SUFFIX_MCQ_T1: (q) => {
    q.prompt = "Welche Endung entscheidet bei **{{s_wort}}** über groß oder klein? (Das Fachwort für so eine Endung heißt Suffix.)";
    mapField(q, "grund", (s) => (s.startsWith("Nomen (") ? "Bei mehreren Endungen entscheidet die letzte. Sie zeigt ein Nomen an, also schreibst du groß." : s.startsWith("Nomen") ? "Diese Endung zeigt ein Nomen an, also schreibst du groß." : "Diese Endung zeigt ein Adjektiv an, also schreibst du klein."));
    q.explanation = [
      { kind: "what", title: "Warum", body: "Das Wort **{{s_wort}}** endet auf **{{s_a}}**. {{s_grund}}" },
      { kind: "remember", title: "Endungen, die die Wortart verraten", body: T(["Wortart", "Endungen", "Schreibung"], ["Nomen", "-ung, -heit, -keit, -schaft, -nis, -tum, -ling, -chen", "groß"], ["Adjektiv", "-ig, -lich, -isch, -bar, -sam, -haft, -los", "klein"]) },
    ];
  },
  DE_GETRENNT_ZUSAMMEN_T1: (q) => {
    const m = {
      "Verb + Verb: getrennt.": "Zwei Verben hintereinander schreibt man getrennt.",
      "Nomen + Verb: getrennt.": "Ein Nomen und ein Verb bleiben zwei Wörter.",
      "Adjektiv + Verb: getrennt.": "Ein Adjektiv und ein Verb schreibt man meistens getrennt.",
      "Präposition + Verb: zusammen.": "Ein kurzes Wort wie auf, an, ab oder hin wächst mit dem Verb zu einem Wort zusammen.",
      "Nomen + Nomen: zusammen.": "Zwei Nomen, die zusammen ein neues Ding benennen, schreibt man zusammen.",
      "Nominalisierung (beim …): zusammen und groß.": "In beim steckt ein Artikel. Die ganze Verbindung wird zum Nomen: zusammen und groß.",
      "Nominalisierung mit Artikel „das“: zusammen und groß.": "Der Artikel das macht die ganze Verbindung zum Nomen: zusammen und groß.",
      "Adverb + Verb, Betonung auf „zurück“: zusammen.": "Die Betonung liegt nur auf zurück. Hörst du nur eine Betonung, ist es ein Wort.",
    };
    mapField(q, "grund", (s) => m[s] ?? plain(s));
    q.explanation = [
      { kind: "what", title: "Die Regel", body: "{{s_grund}}" },
      { kind: "remember", title: "Getrennt oder zusammen", body: T(["Was zusammenkommt", "Schreibung", "Beispiel"], ["Nomen und Nomen", "zusammen", "*Autobahn*"], ["kurzes Wort und Verb", "zusammen", "*aufstehen, hingehen*"], ["Nomen und Verb", "getrennt", "*Klavier spielen*"], ["Verb und Verb", "getrennt", "*schwimmen gehen*"], ["Adjektiv und Verb", "meistens getrennt", "*laut singen*"], ["Verbindung mit Artikel", "zusammen und groß", "*beim Essengehen*"]) },
    ];
  },
  DE_STRATEGIE_MCQ_T1: (q) => {
    mapField(q, "probe", (s) => {
      const parts = s.replace(/\.$/, "").split(" → ");
      const last = parts.pop();
      const mid = parts.map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(". ");
      return `${mid}. Richtig ist also ${last}.`;
    });
    q.explanation = [
      { kind: "steps", title: "So geht die Probe", body: "{{s_probe}}" },
      { kind: "remember", title: "Die vier Strategien", body: T(["Strategie", "Sie hilft bei", "Beispiel"], ["verlängern", "d oder t, b oder p, g oder k am Wortende", "*Hund*, denn es heißt *Hunde*"], ["ableiten", "ä oder e, äu oder eu", "*Häuser*, denn es kommt von *Haus*"], ["in Silben sprechen", "doppelten Konsonanten", "*Bet-ten, Was-ser*"], ["das h prüfen", "h vor l, m, n, r und zwischen zwei Vokalen", "*Zahl, ste-hen*"]) },
    ];
  },
  DE_SS_SZ_T1: (q) => {
    const r = recs(q);
    const fass = r.find((x) => x.korrekt === "Fass");
    if (!fass) throw new Error("Fass record not found");
    fass.wort = "Fa___";
    mapField(q, "grund", (s) => {
      const letter = (s.match(/\(([^)]+)\)/) || [])[1];
      if (s.startsWith("Kurzer")) return `Das ${letter} davor ist kurz. Nach einem kurzen Vokal steht ss.`;
      if (s.startsWith("Doppellaut")) return `Davor steht ${letter}. Nach zwei Vokalen hintereinander steht ß.`;
      return `Das ${letter} davor ist lang. Nach einem langen Vokal steht ß.`;
    });
    q.explanation = [
      { kind: "what", title: "Die Regel", body: "Sprich das Wort laut. {{s_grund}} Richtig ist also **{{s_korrekt}}**." },
      { kind: "remember", body: T(["Der Vokal davor ist", "Du schreibst", "Beispiele"], ["kurz", "ss", "*Klasse, Kuss, wissen*"], ["lang", "ß", "*Straße, Fuß, grüßen*"], ["ei, au, eu", "ß", "*heiß, draußen*"]) },
    ];
  },
});

patch("de_03_grammatik.json", {
  DE_MODUS_MCQ_T1: (q) => {
    mapField(q, "hinweis", plain);
    q.explanation = [
      { kind: "what", title: "Woran du es erkennst", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Die vier Aussageweisen", body: T(["Modus", "Bedeutung", "Erkennungszeichen"], ["Indikativ", "So ist es.", "die normale Form: *er geht*"], ["Imperativ", "Tu das!", "das Verb steht vorn: *Geh!*"], ["Konjunktiv I", "Jemand hat es gesagt.", "*er sei, er habe, er gehe*"], ["Konjunktiv II", "nur vorgestellt, Wunsch, höfliche Bitte", "*wäre, hätte, würde, könnte*"]) },
    ];
  },
  DE_AKTIV_PASSIV_MCQ_T1: (q) => {
    mapField(q, "hinweis", (s) => plain(s).replace(/ → /g, ", also "));
    q.explanation = [
      { kind: "steps", title: "So gehst du vor", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Aktiv und Passiv", body: P(T(["", "Wer steht im Mittelpunkt?", "Beispiel"], ["Aktiv", "der, der etwas tut", "*Der Hund jagt die Katze.*"], ["Passiv", "das, womit etwas geschieht", "*Die Katze wird vom Hund gejagt.*"]), "Beim Umformen wird das Objekt zum Subjekt, und das Verb wird zu werden und Partizip II. Die Zeitform bleibt dieselbe. Fehlt der Handelnde, nimmst du jemand oder man.") },
    ];
  },
  DE_INDIREKTE_REDE_MCQ_T1: (q) => {
    setField(q, "hinweis", [
      "Aus ich wird er. Das Verb steht im Konjunktiv I: er gehe.",
      "Aus ich wird sie. Aus hat wird im Konjunktiv I **habe**.",
      "Die Frage hat kein Fragewort, also leitet **ob** sie ein. Aus du wird ich, weil die angesprochene Person berichtet.",
      "Aus wir wird sie. Der Konjunktiv I von müssen klingt hier wie die normale Form, deshalb nimmt man den Konjunktiv II: **müssten**.",
      "Aus mein wird ihr. Aus ist wird im Konjunktiv I **sei**.",
      "Die Rede steht in der Vergangenheit. In der indirekten Rede wird daraus **sei gewesen**.",
      "Aus ich wird sie. Das Verb steht im Konjunktiv I: sie komme.",
      "Das Fragewort **wo** leitet den Satz ein. Aus ist wird **sei**, und das Verb rückt ans Ende.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_hinweis}}" },
      { kind: "steps", title: "Die Schritte", body: P("(1) Anführungszeichen und Doppelpunkt entfernen.", "(2) Die Person anpassen: Aus ich wird er oder sie, aus mein wird sein oder ihr.", "(3) Das Verb in den Konjunktiv I setzen: gehe, habe, sei, komme.", "(4) Fragen mit ob oder mit dem Fragewort einleiten.") },
    ];
  },
  DE_PARTIZIP_T1: (q) => {
    q.payload.text_with_blanks = "„{{s_wort}}“: Das ist ein ___";
    mapField(q, "hinweis", plain);
    q.explanation = [
      { kind: "what", title: "Woran du es erkennst", body: "{{s_hinweis}}" },
      { kind: "remember", body: T(["", "So wird es gebildet", "Bedeutung", "Beispiel"], ["Partizip I", "Infinitiv und d", "Es geschieht gerade.", "*lachend, schlafend*"], ["Partizip II", "meistens ge und -t oder -en", "Es ist fertig.", "*gebacken, gelesen*"]) },
    ];
  },
  DE_WORTART_MCQ_T1: (q) => {
    mapField(q, "hinweis", (s) => plain(s).replace("(Tom lacht → Er lacht)", "(aus Tom lacht wird Er lacht)"));
    q.explanation = [
      { kind: "what", title: "Die Probe", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Wortarten und ihre Proben", body: T(["Wortart", "Daran erkennst du sie"], ["Nomen", "der, die oder das passt davor; großgeschrieben"], ["Verb", "verändert sich mit der Person: ich gehe, du gehst"], ["Adjektiv", "sagt, wie etwas ist, und lässt sich steigern"], ["Pronomen", "steht für ein Nomen oder begleitet es: er, mein, dieser"], ["Präposition", "kurzes Wort vor einem Nomen: in, auf, mit, nach"]) },
    ];
  },
  DE_SATZGLIED_MCQ_T1: (q) => {
    mapField(q, "hinweis", plain);
    q.explanation = [
      { kind: "what", title: "Die Frage", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Satzglieder und ihre Fragen", body: T(["Satzglied", "Frage"], ["Subjekt", "Wer oder was?"], ["Prädikat", "Was geschieht? Es ist das Verb, manchmal in zwei Teilen."], ["Objekt", "Wen oder was? Wem?"], ["adverbiale Bestimmung", "Wo? Wann? Wie? Warum?"]) },
    ];
  },
  DE_ZEITFORM_MCQ_T1: (q) => {
    mapField(q, "hinweis", plain);
    q.explanation = [
      { kind: "what", title: "Woran du es erkennst", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Die Zeitformen", body: T(["Zeitform", "So ist sie gebaut", "Beispiel"], ["Präsens", "ein Verbteil", "*ich gehe*"], ["Präteritum", "ein Verbteil", "*ich ging*"], ["Perfekt", "habe oder bin und Partizip II", "*ich bin gegangen*"], ["Plusquamperfekt", "hatte oder war und Partizip II", "*ich war gegangen*"], ["Futur I", "werde und Infinitiv", "*ich werde gehen*"]) },
    ];
  },
});

const STILMITTEL = T(
  ["Stilmittel", "Daran erkennst du es"],
  ["Alliteration", "gleicher Anfangslaut"],
  ["Anapher", "dasselbe Wort am Satzanfang"],
  ["Parallelismus", "gleicher Satzbau"],
  ["Vergleich", "ein Bild mit dem Wort wie"],
  ["Metapher", "ein Bild ohne wie"],
  ["Personifikation", "Ein Ding handelt wie ein Mensch."],
  ["Hyperbel", "starke Übertreibung"],
  ["Euphemismus", "Beschönigung"],
  ["rhetorische Frage", "eine Frage, auf die keine Antwort erwartet wird"],
  ["Klimax", "Steigerung in Stufen"],
);

patch("de_04_stil.json", {
  DE_STILMITTEL_MCQ_T1: (q) => {
    mapField(q, "hinweis", plain);
    q.explanation = [
      { kind: "what", title: "{{s_a}}", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Häufige Stilmittel", body: STILMITTEL },
    ];
  },
  DE_STILMITTEL_MATCH_1: (q) => {
    q.explanation = [{ kind: "terms", body: T(["Stilmittel", "Daran erkennst du es", "Beispiel"], ["Alliteration", "gleicher Anfangslaut", "*frisch und fröhlich*"], ["Metapher", "ein Bild ohne wie", "*ein Löwe im Kampf*"], ["Personifikation", "Ein Ding handelt wie ein Mensch.", "*Die Sonne lacht.*"], ["Vergleich", "ein Bild mit wie", "*stark wie ein Bär*"]) }];
  },
  DE_STILMITTEL_MATCH_2: (q) => {
    q.explanation = [{ kind: "terms", body: T(["Stilmittel", "Daran erkennst du es", "Beispiel"], ["Anapher", "dasselbe Wort am Satzanfang", "*Wer war das? Wer hat das getan?*"], ["Hyperbel", "starke Übertreibung", "*Ich warte schon eine Ewigkeit.*"], ["rhetorische Frage", "keine Antwort erwartet", "*Wollen wir das wirklich wagen?*"], ["Euphemismus", "Beschönigung", "*Seniorenresidenz statt Altersheim*"]) }];
  },
  DE_REGISTER_MCQ_T1: (q) => {
    mapField(q, "hinweis", (s) => {
      const t = plain(s);
      return /[.?!]$/.test(t) ? t : t + ".";
    });
    q.explanation = [
      { kind: "what", title: "Was sich ändert", body: "{{s_hinweis}} Der Inhalt des Satzes bleibt dabei derselbe." },
      { kind: "remember", title: "In Standardsprache umformen", body: LIST("Füllwörter wie halt, also und ähm streichst du.", "Lockere Wörter wie voll, krass und Bock ersetzt du durch sachliche.", "Verkürzte Formen wie hab und Pulli schreibst du aus.") },
    ];
  },
  DE_FEHLERART_MCQ_T1: (q) => {
    mapField(q, "hinweis", (s) => plain(s).replace("schaf-fen → ff", "schaf-fen, also ff"));
    q.explanation = [
      { kind: "what", title: "Der Fehler", body: "{{s_hinweis}}" },
      { kind: "remember", title: "Die vier Fehlerarten", body: T(["Zeichen", "Fehlerart", "Die Frage dazu"], ["R", "Rechtschreibung", "Ist ein Wort falsch geschrieben?"], ["Z", "Zeichensetzung", "Fehlt ein Satzzeichen, oder ist eins zu viel?"], ["G", "Grammatik", "Hat ein Wort die falsche Form?"], ["A", "Ausdruck", "Passt ein Wort nicht in einen sachlichen Text?"]) },
    ];
  },
});

// --- second pass: hand-written reasons where the automatic conversion read awkwardly -------------
patch("de_01_kommas.json", {
  DE_SATZART_MCQ_T1: (q) => {
    mapField(q, "hinweis", (s) => s.replace(", kein eigenes Subjekt.", ". Sie hat kein eigenes Subjekt.").replace(" mit einleitendem Wort ohne.", ". Sie beginnt mit dem einleitenden Wort ohne.").replace(", hängt vom Nomen „Wunsch“ ab.", ". Sie erklärt das Nomen Wunsch."));
  },
});
patch("de_02_rechtschreibung.json", {
  DE_STRATEGIE_MCQ_T1: (q) => {
    const fix = {
      "fühlen: mit oder ohne h?": "Das ü ist lang, und danach folgt ein l. Vor l, m, n und r steht nach einem langen Vokal oft ein h. Richtig ist also **fühlen**.",
      "stehen: mit oder ohne h?": "In Silben gesprochen hörst du es: ste-hen. Das h trennt die beiden Vokale. Richtig ist also **stehen**.",
      "Zahl: mit oder ohne h?": "Das a ist lang, und danach folgt ein l. Vor l, m, n und r steht nach einem langen Vokal oft ein h. Richtig ist also **Zahl**.",
      "Bahn: mit oder ohne h?": "Das a ist lang, und danach folgt ein n. Vor l, m, n und r steht nach einem langen Vokal oft ein h. Richtig ist also **Bahn**.",
    };
    let n = 0;
    for (const r of recs(q)) if (fix[r.frage]) { r.probe = fix[r.frage]; n++; }
    if (n !== 4) throw new Error("h records: " + n);
  },
});
patch("de_03_grammatik.json", {
  DE_AKTIV_PASSIV_MCQ_T1: (q) => {
    setField(q, "hinweis", [
      "Das Objekt die Katze wird zum Subjekt. Das Verb wird zu **wird gejagt**, und der Handelnde kommt mit *vom Hund* dazu.",
      "Der Handelnde wird im Passivsatz nicht genannt, also steht *jemand*. Die Vergangenheit bleibt erhalten: **rief**.",
      "Das Objekt die Klasse rückt nach vorn. Das Verb wird zu **wird gelobt**, und der Handelnde kommt mit *von der Lehrerin* dazu.",
      "Der Handelnde steht hinter von: Tim. Er wird zum Subjekt, und das Verb bleibt in der Vergangenheit: **öffnete**.",
      "Das Objekt das Essen wird zum Subjekt. Das Verb wird zu **wird zubereitet**.",
      "Der Handelnde steht hinter von: die Schüler. Sie werden zum Subjekt, und die Gegenwart bleibt erhalten: **machen**.",
      "Das Objekt das Fahrrad wird zum Subjekt. Das Verb wird zu **wird repariert**.",
      "Der Handelnde wird nicht genannt, also steht *jemand*. Die Vergangenheit bleibt erhalten: **schrieb**.",
      "Das Objekt die Straße wird zum Subjekt. Das Verb wird zu **wird gesperrt**.",
      "Der Handelnde steht hinter von: die Klasse. Sie wird zum Subjekt, und die Gegenwart bleibt erhalten: **singt**.",
    ]);
  },
});
patch("de_04_stil.json", {
  DE_REGISTER_MCQ_T1: (q) => {
    setField(q, "hinweis", [
      "Ausgeleiert ist ein lockeres Wort für oft getragen. Pulli ist die Kurzform von Pullover.",
      "Voll ist Umgangssprache für sehr. Sachlich heißt es sehr wichtig oder von großer Bedeutung.",
      "Das Füllwort halt fällt weg. Für zu viel steht übermäßig, und für kaputt machen steht schädigen.",
      "Machste ist eine verkürzte Form von machst du. Eine höfliche Bitte in Standardsprache beginnt mit Könntest du bitte.",
      "Hab wird zu habe ausgeschrieben. Für Bock steht das sachliche Wort Lust.",
      "Echt und krass sind Umgangssprache. Sachlich heißt es sehr beeindruckend.",
      "Die Füllwörter ähm und also fallen weg. Denk wird zu denke ausgeschrieben, und für passt schon steht ist in Ordnung.",
      "Typ ist ein lockeres Wort für Mann. Voll abgezockt bedeutet in Standardsprache betrogen.",
    ]);
  },
  DE_FEHLERART_MCQ_T1: (q) => {
    setField(q, "hinweis", [
      "Es muss dass heißen, denn weder dieses noch welches passt. Die Verwechslung von das und dass zählt zur Rechtschreibung.",
      "Vor dem Nebensatz mit ob fehlt das Komma. Alle Wörter sind richtig geschrieben.",
      "Es muss einen Film heißen. Auf die Frage Wen oder was antwortet der Akkusativ, also ist der Fall falsch.",
      "Voll ist Umgangssprache. In einem sachlichen Text heißt es sehr interessant.",
      "Die Form des Verbs ist falsch gebildet. Richtig heißt es gefangen.",
      "In der Aufzählung fehlt das Komma zwischen Äpfel und Birnen.",
      "Richtig heißt es wahrscheinlich, mit h, denn das Wort kommt von wahr.",
      "Halt und irgendwie sind Füllwörter. Sie gehören nicht in einen sachlichen Text.",
      "Es muss der Film heißen. Auf die Frage Wer oder was gefällt mir antwortet der Nominativ.",
      "Die wörtliche Rede braucht Anführungszeichen: Er sagte: „Ich komme morgen.“",
      "Richtig heißt es sehr, mit einem h nach dem e.",
      "Mega ist Umgangssprache. Sachlich heißt es großartig oder beeindruckend.",
      "Nach wegen steht in der Standardsprache der Genitiv: wegen des Regens.",
      "Vor und steht kein Komma, wenn nur zwei Verben verbunden werden. Hier ist ein Komma zu viel.",
      "Richtig heißt es geschafft, mit ff. In Silben gesprochen hörst du es: schaf-fen.",
      "Abgefeiert ist Umgangssprache. Sachlich heißt es: haben begeistert gefeiert.",
    ]);
  },
});
