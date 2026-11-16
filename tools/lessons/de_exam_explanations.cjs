// Rewrites the explanations of the German exam question files (2023, 2024) to the standard:
// full sentences, the reason for the right answer and, where useful, why a tempting wrong one fails.
const fs = require("fs");
const path = require("path");
const DIR = path.resolve(__dirname, "../../content_packs/berlin_msa/questions");
const NL = "\n";
const T = (head, ...rows) => [head, head.map(() => "---"), ...rows].map((r) => "| " + r.join(" | ") + " |").join(NL);
const P = (...p) => p.join(NL + NL);

function apply(file, texts, extra = {}) {
  const full = path.join(DIR, file);
  const all = JSON.parse(fs.readFileSync(full, "utf8"));
  const missing = all.filter((q) => !(q.id in texts)).map((q) => q.id);
  if (missing.length) throw new Error(file + " has no new text for: " + missing.join(", "));
  for (const q of all) {
    const kind = Array.isArray(q.explanation) ? q.explanation[0].kind : "answer";
    q.explanation = [{ kind: kind === "terms" ? "terms" : "answer", title: "Warum", body: texts[q.id] }];
    if (extra[q.id]) extra[q.id](q);
    if (JSON.stringify(q.explanation).includes("→")) throw new Error(q.id + ": arrow left");
  }
  fs.writeFileSync(full, JSON.stringify(all, null, 2) + NL);
  console.log(file, all.length, "explanations rewritten");
}

apply(
  "de_exam_2023.json",
  {
    DE_MSA2023_151: "Die Hand für etwas ins Feuer legen ist eine Redewendung. Sie bedeutet, für etwas zu garantieren. In der richtigen Antwort kommt das Bild nicht mehr vor. Die anderen Antworten nehmen das Feuer und die Hand wörtlich.",
    DE_MSA2023_152: T(["Fremdwort", "Deutsch", "Merkhilfe"], ["Konsum", "Verbrauch", "Wer konsumiert, verbraucht etwas."], ["Resonanz", "Rückmeldung", "wörtlich: Widerhall"], ["Minimalismus", "Beschränkung auf das Wesentliche", "minimal bedeutet so wenig wie möglich"], ["Projekt", "Vorhaben", "etwas, das man plant"], ["Flexibilität", "Beweglichkeit", "flexibel bedeutet biegsam"]),
    DE_MSA2023_153: P("Im ersten Satz stehen zwei vollständige Hauptsätze nebeneinander. Das ist eine Satzreihe.", "Im zweiten Satz steht vorn ein Nebensatz, dessen Verb will am Ende steht. Hauptsatz und Nebensatz zusammen sind ein Satzgefüge.", "Im dritten Satz werden drei gleichartige Tätigkeiten genannt: baute, drehte und schrieb. Das ist eine Aufzählung."),
    DE_MSA2023_154: "Die Anführungszeichen fallen weg, und aus ich wird er. Das Verb steht im Konjunktiv I: er stehe. Der Begleitsatz bleibt im Präsens. Die Antwort mit steht benutzt die normale Form und zeigt deshalb nicht, dass nur berichtet wird.",
    DE_MSA2023_155: "Das Wort eigentlich schränkt die Aussage ein. Ohne Einschränkung wird genau dieses Wort gestrichen, und der Rest bleibt gleich. Die Antworten mit manchmal und meistens verändern die Aussage, statt die Einschränkung zu entfernen.",
    DE_MSA2023_156A: "Einen kühlen Kopf bewahren bedeutet, ruhig und klar zu denken. Das Wort kühl ist hier nicht als Temperatur gemeint. Deshalb passt kalt nicht.",
    DE_MSA2023_156B: "Bei der Witterung, also beim Wetter, ist kühl wörtlich gemeint. Das passende Wort ist kalt. Dasselbe Wort hat hier eine andere Bedeutung als im Ausdruck kühler Kopf.",
    DE_MSA2023_251: "Streng riechen bedeutet, unangenehm und stark zu riechen. Mit einer strengen Person hat das Wort hier nichts zu tun.",
    DE_MSA2023_252A: "Leckersten ist ein Adjektiv. Ein Adjektiv beschreibt das Nomen, vor dem es steht. Hier sind es die Teige: die leckersten Teige.",
    DE_MSA2023_252B: "Das Wort die leitet einen Relativsatz ein. Ein Relativpronomen bezieht sich auf das Nomen direkt davor. Hier ist es die Kiste: die Kiste, die die Fotos enthielt.",
    DE_MSA2023_253: "Wenn etwas keine Rolle spielt, ist es unwichtig und hat keinen Einfluss. Die Redewendung kommt aus dem Theater, meint aber heute etwas ganz anderes.",
    DE_MSA2023_254: P("Im ersten Satz taucht jemand in einen Duft ein. Das geht nicht wirklich. Es ist ein Bild ohne das Wort wie, also eine Metapher.", "Im zweiten Satz beginnen drei Wörter hintereinander mit demselben Laut: warme Wiener Würstchen. Das ist eine Alliteration."),
    DE_MSA2023_255: P("Im ersten Satz beginnt die Gruppe mit zu mit dem einleitenden Wort um. Das ist eine Infinitivgruppe mit Einleitewort.", "Im zweiten Satz ist ein Relativsatz eingeschoben, dessen Verb wollte am Ende steht. Hauptsatz und Nebensatz bilden zusammen ein Satzgefüge."),
    DE_MSA2023_256: "Highlight kommt aus dem Englischen und bedeutet Höhepunkt. Faible kommt aus dem Französischen und bedeutet Vorliebe, also eine besondere Schwäche für etwas.",
    DE_MSA2023_401A: "Bei ä oder e hilft ein verwandtes Wort. Geräumig kommt von Raum. Aus au wird äu, deshalb schreibt man ä. Diese Strategie heißt ableiten.",
    DE_MSA2023_401B: "Am Wortende hört man nicht, ob dort g oder ch steht. Wenn du das Wort verlängerst, hörst du es: eine geräumige Wohnung. Deshalb schreibt man g.",
    DE_MSA2023_402: P("Das erste Wort leitet einen Nebensatz ein. Weder dieses noch welches passt an seine Stelle. Es ist die Konjunktion mit zwei s: dass.", "Das zweite Wort kannst du durch dies ersetzen: Dies steht schon fest. Es ist ein Pronomen mit einem s: das."),
    DE_MSA2023_403: "Beide Male wird zusammengeschrieben. Im ersten Satz bedeutet zusammenfahren, dass die Autos zusammenstoßen. Im zweiten Satz bedeutet es, vor Schreck zu zucken. In beiden Fällen liegt die Betonung nur auf zusammen. Getrennt schreibt man nur, wenn gemeinsam fahren gemeint ist.",
    DE_MSA2023_404: P("Drittpeinlichste beschreibt die Bettwäsche. Es ist ein Adjektiv und bleibt klein.", "Den Kürzeren ziehen: Vor dem Wort steht der Artikel den. Das Adjektiv ist zum Nomen geworden und wird großgeschrieben.", "Sonntags mit s am Ende bedeutet an jedem Sonntag. Es ist ein Adverb und bleibt klein."),
    DE_MSA2023_501: "Nach mit steht der Dativ. Deshalb heißt es mit einer Höhe und nicht mit eine Höhe.",
    DE_MSA2023_502: "Ein langes i schreibt man meistens ie. Aufstieg kommt von steigen, und dort hörst du das lange i deutlich.",
    DE_MSA2023_503: "Nach einer Steigerungsform wie mehr steht als. Das Wort wie steht nur, wenn zwei Dinge gleich sind: so viel wie.",
    DE_MSA2023_504: "Mega ist Umgangssprache und passt nicht in einen sachlichen Text. In Standardsprache heißt es sehr gefährlich oder äußerst gefährlich.",
    DE_MSA2023_505: "Bei ä oder e hilft ein verwandtes Wort. Hauptsächlich kommt von Sache. Aus a wird ä.",
    DE_MSA2023_506: "Das Wort ist aus Meeres und Spiegel zusammengesetzt. Das erste s gehört zu Meeres, das zweite zu Spiegel. Deshalb stehen zwei s hintereinander.",
    DE_MSA2023_507: "Teil ist hier ein Nomen: ein Teil des Gebirges. Nomen werden großgeschrieben.",
    DE_MSA2023_508: "Die Gruppe mit zu beginnt mit dem einleitenden Wort um. Sie steht am Satzanfang und endet mit besteigen. Danach steht das Komma.",
    DE_MSA2023_510: "Stärke ist ein weibliches Nomen: die Stärke. Das Adjektiv davor bekommt deshalb die Endung e: mentale Stärke, genauso wie körperliche Stärke.",
  },
  {
    // "eines Sonntags" is written with a capital S; only "sonntags" is an adverb. The item is corrected so that it teaches the rule it names.
    DE_MSA2023_404: (q) => {
      const old = q.payload.left.find((x) => x.includes("SONNTAGS"));
      const neu = "SONNTAGS kam Paula oft zu Besuch.";
      q.payload.left = q.payload.left.map((x) => (x === old ? neu : x));
      q.solution.pairs = q.solution.pairs.map(([l, r]) => [l === old ? neu : l, r]);
      q.source = (q.source ? q.source + "; " : "") + "dritter Satz angepasst";
    },
  },
);

apply("de_exam_2024.json", {
  DE_MSA2024_151: "Müssen und brauchen drücken beide aus, dass etwas nötig ist. Reden und Regeln sagen nur, was nötig ist, aber nicht, dass es nötig ist.",
  DE_MSA2024_152: "Schlurfen bedeutet, schwerfällig zu gehen, ohne die Füße richtig zu heben. Schreiten klingt würdevoll, spazieren gemütlich und sausen schnell. Keines davon trifft die müde, schleppende Art.",
  DE_MSA2024_153: "Etwas toppen bedeutet, besser zu sein als alles andere. Dasselbe bedeutet übertreffen. Auch überbieten oder schlagen wären richtig. Stoppen klingt nur ähnlich.",
  DE_MSA2024_154: T(["Fremdwort", "Deutsch", "Merkhilfe"], ["Rebellion", "Aufstand", "Ein Rebell lehnt sich auf."], ["Chat", "Unterhaltung", "englisch für plaudern"], ["Prinzip", "Grundsatz", "eine Regel, nach der man handelt"], ["Kooperation", "Zusammenarbeit", "Wer kooperiert, arbeitet zusammen."], ["Epilog", "Nachwort", "der Schluss eines Buches"]),
  DE_MSA2024_155: P("Im ersten Satz erklärt die Gruppe mit zu das Nomen Recht. Das ist eine Infinitivgruppe, die von einem Nomen abhängt.", "Im zweiten Satz werden drei gleichartige Wörter genannt. Das ist eine Aufzählung.", "Im dritten Satz folgt ein Relativsatz, dessen Verb sprechen am Ende steht. Das ist ein Satzgefüge.", "Im vierten Satz stehen zwei Hauptsätze nebeneinander. Das ist eine Satzreihe."),
  DE_MSA2024_156: "Verschlingen ist hier ein Sprachbild. So wie man Essen gierig hinunterschlingt, hat sie den Roman sehr schnell und mit großem Interesse gelesen.",
  DE_MSA2024_157: "Der Handelnde steht hinter von: die Tochter. Sie wird zum Subjekt, und die Regeln werden zum Objekt. Die Zeitform bleibt Präsens: befolgt. Die Antwort mit hat befolgt wechselt die Zeit und ist deshalb falsch.",
  DE_MSA2024_158A: "Umgehen im Sinn von vermeiden ist ein Verb, das sich nicht trennt. Die Betonung liegt auf gehen. Im Präsens heißt es deshalb: Sie umgehen die Ermahnungen.",
  DE_MSA2024_158B: "Mit etwas umgehen bedeutet, etwas zu behandeln. Bei diesem Verb liegt die Betonung auf um, und es trennt sich. Im Präsens wandert um ans Satzende: Sie gehen vorsichtig damit um.",
  DE_MSA2024_159: "In einer Ellipse fehlt ein Teil des Satzes. Hier fehlen das Subjekt und das Verb. Vollständig heißt der Satz: Das sind alles nur Ausreden.",
  DE_MSA2024_160: "Das Verb finden braucht eine Ergänzung. Der Leser muss erfahren, was jemand findet, zum Beispiel einen Schlüssel oder eine Meinung. Subjekt und Prädikat sind vorhanden, deshalb sind die anderen Antworten falsch.",
  DE_MSA2024_251: "Scheinen drückt eine Vermutung aus. Als Tatsache steht das Verb in der normalen Form, ohne ein Wort der Unsicherheit: Sie sind Filmfreaks. In den anderen Antworten steckt mit könnten, vielleicht und wären weiterhin eine Unsicherheit.",
  DE_MSA2024_252: P("Im ersten Satz zeigt während, dass beides zur selben Zeit geschieht. Das ist Gleichzeitigkeit.", "Im zweiten Satz zeigt nachdem, dass das Aufstehen zuerst war. Es steht im Plusquamperfekt, das Ausstrecken der Hand im Präteritum. Das ist Vorzeitigkeit."),
  DE_MSA2024_253: "Wenn die Zeit stillsteht, vergeht sie gar nicht. Das Gegenteil ist, dass sie sehr schnell vergeht: wie im Fluge. Die anderen Redewendungen sagen nichts darüber, wie schnell die Zeit vergeht.",
  DE_MSA2024_254: "Verstohlen bedeutet heimlich, also so, dass niemand es bemerkt. Das Wort ist mit stehlen verwandt.",
  DE_MSA2024_255: "Die Frage hat kein Fragewort, deshalb leitet ob sie ein. Aus du wird ich, weil die gefragte Person berichtet. Aus bist wird im Konjunktiv I sei. Anführungszeichen und Fragezeichen fallen weg.",
  DE_MSA2024_256: "Die Wörter so und wie stellen zwei Dinge nebeneinander. Das ist ein Vergleich. Bei einer Metapher würde das Wort wie fehlen.",
  DE_MSA2024_257: "Für Ungleichheit wird das Adjektiv gesteigert, und danach steht als: größer als ich. Auch nicht so groß wie ich wäre richtig. Größer wie ich ist falsch, weil nach einer Steigerung nie wie steht.",
  DE_MSA2024_401A: "Bei ä oder e hilft ein verwandtes Wort. Schädlich kommt von Schaden. Aus a wird ä. Diese Strategie heißt ableiten.",
  DE_MSA2024_401B: "Das Wort endet auf lich. Diese Endung zeigt ein Adjektiv an, und Adjektive schreibt man klein.",
  DE_MSA2024_402: P("Das erste Wort leitet einen Nebensatz ein. Weder dieses noch welches passt an seine Stelle. Es ist die Konjunktion mit zwei s: dass.", "Das zweite Wort kannst du durch dies ersetzen: Dies habe ich nicht gewollt. Es ist ein Pronomen mit einem s: das."),
  DE_MSA2024_403: P("Im ersten Satz ist gemeint, dass man etwas nicht erkennen kann. Das sind zwei Wörter: zu sehen. Zusammen geschrieben würde es zuschauen bedeuten.", "Im zweiten Satz ist gemeint, ohne Blatt zu reden. Das sind zwei Wörter: frei sprechen. Zusammen geschrieben würde es bedeuten, jemanden für unschuldig zu erklären."),
  DE_MSA2024_404: P("Am ältesten ist die höchste Stufe mit am. Sie bleibt klein.", "Zum ersten Mal: Mal ist hier ein Nomen, das Mal. Es wird großgeschrieben.", "Tausend ist ein Zahlwort. Zahlwörter wie tausend und hundert schreibt man klein."),
  DE_MSA2024_501: "Die Vorsilbe heißt ent, wie in entfernen und entdecken. Mit Ende hat das Wort nichts zu tun, deshalb schreibt man t.",
  DE_MSA2024_502: "Nach einer Mengenangabe wie Millionen steht der Genitiv. Auf die Frage wessen antwortet: solcher Netze.",
  DE_MSA2024_503: "Fische, Robben und Schildkröten sind eine Aufzählung. Zwischen Fische und Robben fehlt das Komma. Das Komma vor aber ist richtig, weil aber einen Gegensatz anzeigt.",
  DE_MSA2024_504: "Obwohl zeigt einen Gegensatz an. Gemeint ist hier aber ein Grund: Die Wale sterben, weil sie nicht an die Oberfläche kommen. Dafür steht da oder weil.",
  DE_MSA2024_505: "Das Wort früher zeigt, dass der ganze Satz von der Vergangenheit spricht. Deshalb muss auch das zweite Verb in der Vergangenheit stehen: waren.",
  DE_MSA2024_506: "Im Hauptsatz steht das Verb an zweiter Stelle. Nach dem ersten Satzglied muss also bestehen folgen: Die Fischernetze bestehen heute aus Kunststoff.",
  DE_MSA2024_507: "Zwischen Mikroplastik und beeinträchtigt steht ein erklärender Zusatz. So ein eingeschobener Zusatz bekommt vorn und hinten ein Komma. Das zweite Komma fehlt nach Millimeter.",
  DE_MSA2024_508: "Sich abrackern ist Umgangssprache. In einem sachlichen Text heißt es: Sie bemühen sich sehr oder sie strengen sich an.",
  DE_MSA2024_509: "Gar nicht schreibt man immer in zwei Wörtern.",
  DE_MSA2024_510: "Der Satz hat zwei Subjekte, die mit und verbunden sind: die Ausbildung und die Rücknahmesysteme. Dann steht das Verb in der Mehrzahl: könnten.",
});
