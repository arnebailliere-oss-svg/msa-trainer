// Rewrites the explanations of the two oldest English question files to the standard:
// every item says in full sentences why the answer is right and why the tempting wrong one is not;
// the "Merke" blocks become short lists or tables.
const fs = require("fs");
const path = require("path");
const DIR = path.resolve(__dirname, "../../content_packs/berlin_msa/questions");
const NL = "\n";
const T = (head, ...rows) => [head, head.map(() => "---"), ...rows].map((r) => "| " + r.join(" | ") + " |").join(NL);
const LIST = (...items) => items.map((x) => "- " + x).join(NL);

function patch(file, changes) {
  const full = path.join(DIR, file);
  const all = JSON.parse(fs.readFileSync(full, "utf8"));
  for (const [id, fn] of Object.entries(changes)) {
    const q = all.find((x) => x.id === id);
    if (!q) throw new Error("question not found: " + id);
    fn(q);
  }
  fs.writeFileSync(full, JSON.stringify(all, null, 2) + NL);
  console.log(file, Object.keys(changes).length, "questions rewritten");
}
/** Set (or add) the `grund` field of every sentence record. */
const reasons = (q, list) => {
  const recs = q.variants.variables.s.from;
  if (recs.length !== list.length) throw new Error(`${q.id}: ${recs.length} records, ${list.length} reasons`);
  recs.forEach((r, i) => (r.grund = list[i]));
};

const SIGNAL_TABLE = T(
  ["Signalwörter", "Zeit"],
  ["usually, always, often, never, every day", "Simple Present"],
  ["now, at the moment, right now, Look!", "Present Progressive"],
  ["yesterday, ago, last week, in 1997", "Simple Past"],
  ["just, already, yet, ever, since, for, so far", "Present Perfect"],
  ["while, as", "Past Progressive"],
  ["before, after, by, until that day", "Past Perfect"],
);

patch("en_01_grammar.json", {
  EN_TENSE_SELECT_T1: (q) => {
    reasons(q, [
      "*Usually* bedeutet normalerweise. Es geht um eine Gewohnheit, und dafür steht das Simple Present. *Am watching* würde bedeuten, dass es gerade jetzt passiert.",
      "*Every day* zeigt eine Gewohnheit, also Simple Present. Bei she bekommt das Verb ein -s: *plays*. *Is playing* wäre nur richtig, wenn sie gerade in diesem Moment spielt.",
      "*Listen!* und *right now* zeigen, dass es in diesem Moment passiert. Dafür steht das Present Progressive: *are calling*. *Call* wäre eine Gewohnheit.",
      "*The other day* bedeutet neulich. Das ist eine abgeschlossene Zeitangabe, also Simple Past: *walked*. *Has walked* passt nicht, weil dasteht, wann es war.",
      "Erst das Frühstück, dann der Bahnhof: Zwei Handlungen nacheinander in der Vergangenheit stehen beide im Simple Past. *Went* im zweiten Teil zeigt dir die Zeit.",
      "*Since 2003* nennt den Anfang, und es dauert bis heute an. Dafür steht das Present Perfect: *has lived*. *Lives* ist die deutsche Denkweise (er wohnt seit …) und im Englischen falsch.",
      "*Just* bedeutet gerade eben und gehört zum Present Perfect. Nach *have* steht die 3. Form: *arrived*.",
      "*Yet* am Satzende bedeutet noch nicht und gehört zum Present Perfect. Vor der 3. Form *cleaned* fehlt der Helfer *have*. Nach *did* müsste die Grundform *clean* stehen.",
      "Sie hat früher angefangen und schaut immer noch. Wenn etwas andauert und die Dauer wichtig ist, steht das Present Perfect Progressive: *has been watching*.",
      "*By 10 pm* bedeutet bis 22 Uhr. Die Hausaufgaben waren vor diesem Zeitpunkt in der Vergangenheit schon fertig. Für das, was noch früher war, steht *had* und die 3. Form.",
      "Das Kochen lief schon, als das Telefon klingelte. Die lange Handlung im Hintergrund steht im Past Progressive: *was cooking*. Das Klingeln ist die kurze Handlung im Simple Past.",
      "*While* bedeutet während. Zwei Handlungen liefen gleichzeitig in der Vergangenheit, deshalb stehen beide im Past Progressive: *was working* und *was going*.",
      "*I think* zeigt eine Vermutung über die Zukunft. Für Vermutungen nimmt man *will* und die Grundform: *will arrive*.",
      "Die Person entscheidet sich in diesem Moment. Für einen spontanen Entschluss nimmt man *will*. *Am going to* wäre ein Plan, der schon vorher feststand.",
      "Die Hochzeit ist schon geplant. Für einen festen Plan nimmt man *going to*. *Will* wäre eine spontane Entscheidung oder eine Vermutung.",
      "Man sieht schon, was gleich passiert: Er rennt so, dass er stürzen wird. Wenn man etwas kommen sieht, nimmt man *going to*.",
      "Ein Fahrplan steht fest. Für Fahrpläne nimmt man das Simple Present, auch wenn es um morgen geht: *leave*.",
      "Alles ist gebucht, und es steht eine Zeitangabe dabei. Für feste Verabredungen in naher Zukunft kann man das Present Progressive nehmen: *am flying*.",
      "Das ist eine Tatsache, die immer gilt. Dafür steht das Simple Present. Bei *the sun*, also it, bekommt das Verb ein -s: *rises*.",
      "Erst ging sie joggen, dann ging sie ins Bett. Beides ist vorbei, und das Frühere bekommt *had* und die 3. Form: *had gone*.",
      "*For 2 hours* nennt die Dauer, und er wartet immer noch. Dafür steht das Present Perfect Progressive. Zu he gehört *has*: *has been waiting*.",
      "Es steht nicht da, wann es passiert ist. Wichtig ist die Folge jetzt: Ich komme nicht hinein. Dafür steht das Present Perfect: *have lost*.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", title: "Signalwörter verraten die Zeit", body: SIGNAL_TABLE },
    ];
  },
  EN_SIGNALWORD_MCQ_T1: (q) => {
    reasons(q, [
      "*Usually* bedeutet normalerweise. Das beschreibt eine Gewohnheit.",
      "*Every day* bedeutet jeden Tag. Es passiert also immer wieder.",
      "*Often* bedeutet oft. Es passiert immer wieder.",
      "*At the moment* bedeutet im Moment. Es passiert gerade jetzt.",
      "*Right now* bedeutet genau jetzt. Es passiert in diesem Augenblick.",
      "*Yesterday* bedeutet gestern. Dieser Tag ist vorbei.",
      "*Ago* bedeutet vor. Es blickt auf einen Zeitpunkt zurück, der vorbei ist.",
      "*Last week* bedeutet letzte Woche. Diese Woche ist vorbei.",
      "Das Jahr 1997 ist vorbei. Es steht also da, wann es war.",
      "*Just* bedeutet gerade eben. Es ist eben erst passiert und zählt jetzt noch.",
      "*Yet* bedeutet noch nicht oder schon. Es fragt nach dem Stand bis jetzt.",
      "*Since* nennt den Anfang. Es dauert von damals bis jetzt.",
      "*So far* bedeutet bis jetzt. Es zählt, was bis zu diesem Moment passiert ist.",
      "*Already* bedeutet schon. Etwas ist bis jetzt bereits erledigt.",
      "*By 10 pm* bedeutet bis 22 Uhr. Etwas war schon vor diesem Zeitpunkt in der Vergangenheit fertig.",
      "*Until that day* bedeutet bis zu jenem Tag. Es geht um die Zeit vor einem Punkt in der Vergangenheit.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}} Deshalb gehört **{{s_wort}}** zum **{{s_loesung}}**." + NL + NL + "Ein Beispiel: *{{s_bsp}}*" },
      { kind: "remember", title: "Signalwörter verraten die Zeit", body: SIGNAL_TABLE },
    ];
  },
  EN_IRREGULAR_T1: (q) => {
    q.explanation = [
      { kind: "answer", body: "Die drei Formen heißen **{{s_voll}}**. Auf Deutsch bedeutet das Verb: {{s_de}}." },
      { kind: "remember", body: LIST("Unregelmäßige Verben lernt man zu dritt, wie einen kleinen Reim.", "Die 2. Form steht allein: *I went.*", "Die 3. Form steht nach have, has oder had: *I have gone.*") },
    ];
  },
  EN_MODAL_MCQ_T1: (q) => {
    reasons(q, [
      "*Mustn't* ist die Kurzform von *must not* und bedeutet nicht dürfen. Das ist ein Verbot. *Needn't* würde nur bedeuten, dass es nicht nötig ist.",
      "*When I was five* ist vorbei. Die Vergangenheit von *can* heißt *could*. Man kann auch *was able to* sagen.",
      "Mit *May I …?* fragt man höflich um Erlaubnis. *Must* und *will* fragen nicht nach einer Erlaubnis.",
      "Ein Geburtstag ist ein guter Grund: Es ist eine Pflicht. Dafür steht *must*. Man kann auch *have to* sagen.",
      "Die Oma ist im Urlaub, ein Anruf ist also nicht nötig. Dafür steht *needn't*, genauso wie *don't have to*. *Mustn't* wäre ein Verbot.",
      "Ein Ratschlag steht mit *should*. Es ist schwächer als *must*: Man empfiehlt etwas, befiehlt es aber nicht.",
      "*Might* bedeutet: Es könnte vielleicht sein. Es ist schwächer als *may*. *Must* würde bedeuten, dass man ziemlich sicher ist.",
      "Mit *Shall I …?* bietet man seine Hilfe an. Auf Deutsch heißt das: Soll ich …?",
      "*Should* kann auch eine Vermutung ausdrücken: Er müsste jeden Moment da sein.",
      "*Must* kann auch bedeuten, dass man sich ziemlich sicher ist: Du bist bestimmt sauer.",
      "Mit *Would you please …?* bittet man höflich um etwas. Auf Deutsch heißt das: Würdest du bitte …?",
      "*Could* macht aus einem Angebot ein höfliches Angebot: Ich könnte sie für dich anrufen.",
      "*May not* bedeutet nicht dürfen. Es klingt höflicher und weniger streng als *mustn't*.",
      "*Have to* bedeutet dasselbe wie *must*. *Be allowed to* heißt dürfen, und *be able to* heißt können.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      {
        kind: "remember",
        title: "Die Modalverben",
        body: T(["Englisch", "Deutsch"], ["can / could", "können / konnte, könnte"], ["may / might", "dürfen, vielleicht / könnte vielleicht"], ["must", "müssen, oder: ganz bestimmt"], ["mustn't", "nicht dürfen (Verbot)"], ["needn't, don't have to", "nicht müssen (nicht nötig)"], ["should", "sollte (Rat oder Vermutung)"], ["Shall I …?", "Soll ich …? (Angebot)"], ["Would you …?", "Würdest du …? (höfliche Bitte)"]),
      },
    ];
  },
  EN_IF_CLAUSE_T1: (q) => {
    reasons(q, [
      "Im Teil mit if steht *go*, also Simple Present. Das ist Typ 1, und im anderen Teil steht *will*: *will be*.",
      "Niemand ist wirklich ein Superheld. Der Satz ist nur vorgestellt, also Typ 2. Im Teil mit if steht das Simple Past, und bei *be* sagt man *were* für alle Personen.",
      "Im Teil mit if steht *find*, also Simple Present. Das ist Typ 1, und im anderen Teil steht *will* und die Grundform.",
      "*Hadn't slowed* ist *had* und die 3. Form. Das ist Typ 3: Es ist vorbei und nicht mehr zu ändern. Im anderen Teil steht *would have* und die 3. Form.",
      "Im anderen Teil steht *would make*. Das ist Typ 2, und im Teil mit if steht dann das Simple Past: *sold*.",
      "Im Teil mit if steht nie *will*, auch wenn es um die Zukunft geht. Dort steht das Simple Present: *rains*.",
      "*Had woken up* ist *had* und die 3. Form, also Typ 3. Der Sprecher bedauert etwas, das vorbei ist. Im anderen Teil steht *would have* und die 3. Form.",
      "*If I were you* ist eine feste Wendung für einen Rat. Bei Typ 2 sagt man nach if *were*, auch bei I.",
      "Im Teil mit if steht *break*, also Simple Present. Das ist Typ 1: Es kann wirklich passieren. Im anderen Teil steht *will*.",
      "Im anderen Teil steht *would not have been*. Das ist Typ 3, und im Teil mit if steht dann *had* und die 3. Form: *had not met*.",
      "Im Teil mit if steht *had*, also Simple Past. Das ist Typ 2, eine nur vorgestellte Situation. Dazu gehört *would*.",
      "Im Teil mit if steht *don't do*, also Simple Present. Das ist Typ 1, und im anderen Teil steht *will be*.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", title: "Die drei Typen", body: T(["Typ", "Teil mit if", "Anderer Teil"], ["1: kann gut passieren", "Simple Present", "will + Grundform"], ["2: nur vorgestellt", "Simple Past", "would + Grundform"], ["3: vorbei", "had + 3. Form", "would have + 3. Form"]) + NL + NL + "Im Teil mit if steht nie *will* oder *would*." },
    ];
  },
  EN_IF_TYPE_MCQ_T1: (q) => {
    reasons(q, [
      "Im Teil mit if steht *rains*, also Simple Present. Im anderen Teil steht *won't*, die Kurzform von *will not*. Das ist Typ 1: Es kann gut passieren.",
      "Im Teil mit if steht *had*, also Simple Past, und im anderen Teil steht *would*. Das ist Typ 2: Der Sprecher hat keine Zeit und stellt es sich nur vor.",
      "Im Teil mit if steht *hadn't spent*, also *had* und die 3. Form. Das ist Typ 3: Es geht um die Vergangenheit, die sich nicht mehr ändern lässt.",
      "Im Teil mit if steht *are*, also Simple Present, und im anderen Teil steht *will buy*. Das ist Typ 1.",
      "*If I were you* ist die feste Wendung für einen Rat. Im anderen Teil steht *would*. Das ist Typ 2.",
      "Im Teil mit if steht *had woken*, also *had* und die 3. Form. Im anderen Teil steht *would not have missed*. Das ist Typ 3.",
      "Im Teil mit if steht *break*, also Simple Present, und im anderen Teil steht *will have*. Das ist Typ 1.",
      "Im Teil mit if steht *had*, also Simple Past, und im anderen Teil steht *would*. Das ist Typ 2: eine nur vorgestellte Situation.",
      "Im Teil mit if steht *had not met*, also *had* und die 3. Form. Im anderen Teil steht *would not have been*. Das ist Typ 3.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", body: LIST("Schau zuerst auf das Verb im Teil mit if.", "Steht dort das Simple Present, ist es Typ 1.", "Steht dort das Simple Past, ist es Typ 2.", "Steht dort *had* und die 3. Form, ist es Typ 3.") },
    ];
  },
  EN_QUESTION_NEG_MCQ_T1: (q) => {
    reasons(q, [
      "Eine Frage ohne Helfer geht im Englischen nicht. Du brauchst *do* am Anfang, danach die Person und das Verb in der Grundform. *Does* passt nur zu he, she, it.",
      "Bei she heißt der Helfer *doesn't*. Das -s steckt schon in *does*, deshalb steht *play* ohne -s.",
      "Für eine Frage in der Vergangenheit brauchst du *did*. Danach steht die Grundform *go*, weil *did* die Vergangenheit schon zeigt.",
      "Nach *didn't* steht die Grundform *see*. *Didn't saw* zeigt die Vergangenheit doppelt und ist falsch.",
      "*Can* ist ein Modalverb. Modalverben bilden Fragen ohne *do*, und danach steht die Grundform ohne *to*.",
      "Die Reihenfolge ist: Fragewort, Helfer, Person, Verb. Bei she heißt der Helfer *does*, und *live* steht ohne -s.",
      "*Ever* gehört zum Present Perfect. Die Frage beginnt mit *have*, und danach steht die 3. Form *been*.",
      "*Now* zeigt, dass es gerade passiert. Im Present Progressive rückt *is* an den Anfang, und das Verb behält sein -ing.",
      "*Be* braucht kein *do*. Die Vergangenheit von *are not* heißt *weren't*. *Wasn't* gehört zu I, he, she, it.",
      "Die Reihenfolge ist: Fragewort, *didn't*, Person, Verb in der Grundform. Nach *didn't* steht *call* und nicht *called*.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", body: LIST("Fragen und Nein-Sätze brauchen den Helfer do, does oder did.", "Nach dem Helfer steht das Verb in der Grundform.", "Mit be, have und den Modalverben brauchst du kein do: *Is he …? Can you …?*") },
    ];
  },
  EN_COMPARISON_T1: (q) => {
    reasons(q, [
      "*Fast* hat eine Silbe. Kurze Adjektive bekommen -er, und *than* zeigt den Vergleich zwischen zweien.",
      "*Good* ist unregelmäßig: good, better, best. Mit *the* davor brauchst du den Superlativ *best*.",
      "*Interesting* hat vier Silben. Lange Adjektive bekommen *more* davor. *Than* zeigt, dass zwei verglichen werden.",
      "*Tall* hat eine Silbe und bekommt -er. *More tall* ist falsch, weil kurze Adjektive kein *more* bekommen.",
      "*Bad* ist unregelmäßig: bad, worse, worst. Mit *the* davor brauchst du den Superlativ *worst*.",
      "*Heavy* hat zwei Silben und endet auf -y. Aus dem y wird ein i, und -er kommt dazu: *heavier*.",
      "*Expensive* hat drei Silben. Mit *the* davor brauchst du den Superlativ, und der heißt bei langen Adjektiven *the most*.",
      "*Big* ist ein kurzes Wort. Der letzte Buchstabe wird verdoppelt, und -er kommt dazu: *bigger*.",
      "Zwischen *as* und *as* steht das Adjektiv ohne Endung. Der Satz sagt, dass beide gleich alt sind.",
      "*Easy* hat zwei Silben und endet auf -y. Aus dem y wird ein i: *easier*.",
      "*Far* ist unregelmäßig: far, farther, farthest. *Than* zeigt den Vergleich zwischen zweien.",
      "*Hot* ist ein kurzes Wort. Der letzte Buchstabe wird verdoppelt: *hotter*.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", title: "Vergleichen", body: T(["Das Adjektiv", "Komparativ", "Superlativ"], ["kurz (*tall*)", "taller", "the tallest"], ["auf -y (*easy*)", "easier", "the easiest"], ["lang (*interesting*)", "more interesting", "the most interesting"], ["*good*", "better", "the best"], ["*bad*", "worse", "the worst"], ["*far*", "farther", "the farthest"]) },
    ];
  },
});

patch("en_03_writing_vocab.json", {
  EN_EMAIL_STRUCTURE_MATCH: (q) => {
    q.explanation = [{ kind: "what", title: "Die sechs Teile einer E-Mail", body: T(["Teil", "Beispiel"], ["Subject (Betreff)", "*An example for your project*"], ["Greeting (Anrede)", "*Dear Ms Smith,* oder *Hey Sarah,*"], ["Opening sentence (erster Satz)", "*I hope you're doing well!*"], ["Main part (Hauptteil)", "die Antworten, ein Absatz pro Frage"], ["Closing phrase (Schluss)", "*Best wishes,* oder *Kind regards,*"], ["Name", "dein Name in einer eigenen Zeile"]) }];
  },
  EN_FORMAL_INFORMAL_MCQ_T1: (q) => {
    const recs = q.variants.variables.s.from;
    // Chat language is taught as wrong everywhere; the two chat-language items become clear informal phrases.
    const wanna = recs.find((r) => r.phrase.startsWith("Wanna"));
    const gotta = recs.find((r) => r.phrase.startsWith("Gotta"));
    if (!wanna || !gotta) throw new Error("chat-language records not found");
    wanna.phrase = "Do you want to come over on Saturday?";
    gotta.phrase = "See you soon!";
    reasons(q, [
      "So beginnt eine E-Mail an eine Person, deren Namen man nicht kennt, zum Beispiel an eine Firma. Das ist formell.",
      "So begrüßt man Freunde. In einer E-Mail an einen Fremden wäre das zu locker.",
      "Der Satz ist vollständig, sachlich und ohne Kurzformen. So schreibt man in einer Bewerbung.",
      "Das ist eine direkte Einladung an einen Freund. In einer formellen E-Mail würde man *Would you like to …?* schreiben.",
      "Mit *Yours sincerely* endet eine formelle E-Mail, die mit *Dear Mr …* oder *Dear Ms …* begonnen hat.",
      "*Cheers* ist ein lockerer britischer Gruß unter Freunden.",
      "*I would be grateful if …* bedeutet: Ich wäre dankbar, wenn … Das ist eine sehr höfliche Bitte.",
      "So verabschiedet man sich von Freunden. Formell wäre *I look forward to hearing from you.*",
      "Dieser Satz steht in Bewerbungen. Er bedeutet: Im Anhang finden Sie meinen Lebenslauf.",
      "Das ist ein Ausruf unter Freunden. In einer formellen E-Mail hat er keinen Platz.",
      "So endet eine formelle E-Mail. Der Satz bedeutet: Ich freue mich auf Ihre Antwort. Nach *to* steht hier die Form mit -ing.",
      "Das ist freundlich und locker. Formell würde man *Thank you for your e-mail* schreiben.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", title: "Formell oder informell?", body: T(["", "Formell (an Fremde)", "Informell (an Freunde)"], ["Anrede", "*Dear Sir or Madam,*", "*Hi Emma,*"], ["Erster Satz", "*I am writing to …*", "*Thanks for your e-mail!*"], ["Bitte", "*I would be grateful if …*", "*Can you …?*"], ["Schluss", "*Yours sincerely,*", "*Best wishes,*"]) + NL + NL + "Chat-Sprache wie *u*, *thx* oder *wanna* ist in der Prüfung immer falsch, auch an Freunde." },
    ];
  },
  EN_EMAIL_PHRASE_MCQ_T1: (q) => {
    reasons(q, [
      "Formell schreibt man *Dear*, dann *Mr* oder *Ms* und den Nachnamen. Danach steht ein Komma und kein Ausrufezeichen.",
      "An eine Freundin schreibt man *Hi* oder *Hey* und den Vornamen. *Dear Sir or Madam* ist für Fremde.",
      "Nach einer Anrede mit Namen endet eine formelle E-Mail mit *Yours sincerely*. *Cheers* und *Love* sind für Freunde.",
      "An Freunde passen *Best wishes* oder *Take care*. *Yours faithfully* gehört in eine formelle E-Mail.",
      "Eine formelle E-Mail beginnt mit *I am writing to …* und nennt den Grund. Die anderen Sätze sind zu locker oder Chat-Sprache.",
      "An Freunde beginnt man freundlich und bezieht sich auf die letzte Nachricht. Die anderen Sätze klingen wie ein Brief an eine Behörde.",
      "Eine höfliche Bitte beginnt mit *Could you please …?* Die anderen Sätze sind Befehle oder Chat-Sprache.",
      "An einen Freund stellt man eine direkte, freundliche Frage. Die anderen Sätze klingen wie eine Einladung von einer Firma.",
      "Der Betreff nennt kurz und sachlich das Thema. Ein Betreff wie *question* sagt zu wenig, und Chat-Sprache ist falsch.",
      "Unter Freunden schreibt man *Hope to hear from you soon!* Die anderen Sätze gehören in eine geschäftliche E-Mail.",
    ]);
    q.explanation = [{ kind: "what", title: "Warum", body: "{{s_grund}}" }];
  },
  EN_ERRORFIX_MCQ_T1: (q) => {
    reasons(q, [
      "Das Alter sagt man im Englischen mit *am*. Dazu passt die Zahl allein oder die Zahl mit *years old*. *I have 15 years* ist Wort für Wort übertragen und falsch.",
      "*Interested* und *in* gehören fest zusammen, auch wenn es im Deutschen für heißt.",
      "*Since 2019* nennt den Anfang, und er wohnt immer noch dort. Dafür steht das Present Perfect: *has lived*. *Lives since* ist die deutsche Denkweise.",
      "Nach *look forward to* steht die Form mit -ing: *hearing*. Das *to* gehört hier fest zu *look forward*.",
      "Im Englischen hilft man jemandem *with* etwas. *By* und *at* sind aus dem Deutschen übertragen.",
      "Einen Fehler macht man mit *make*, und die Vergangenheit von *make* heißt *made*. *Did a mistake* ist falsch.",
      "Nach *tell* steht direkt die Person: *told me*. Nach *say* kann die Person nicht direkt stehen.",
      "*People* sind mehrere, deshalb heißt es *there are*. Das deutsche es gibt übersetzt man nicht mit *it has*.",
      "Fünf Jahre sind eine Dauer, deshalb *for*. Und weil es bis jetzt andauert, steht das Present Perfect Progressive.",
      "Wochentage bekommen *on*. *At* steht bei Uhrzeiten und *in* bei Monaten.",
      "*Meet* braucht im Englischen kein *us*. Und am Bahnhof heißt *at the station*.",
      "Im Englischen gibt es in einem Satz nur eine Verneinung. Nach *don't* steht deshalb *any* und nicht *no*.",
      "*Tall* ist kurz und bekommt -er. Das deutsche als heißt beim Vergleich *than*, nicht *as* und nicht *then*.",
      "Suchen heißt *look for*. *Look after* bedeutet sich kümmern um, und nach *search* müsste ebenfalls *for* stehen.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", title: "Typische Fehler aus dem Deutschen", body: T(["Falsch", "Richtig"], ["*I have 15 years.*", "*I am 15.*"], ["*since five years*", "*for five years*"], ["*at Monday*", "*on Monday*"], ["*I did a mistake.*", "*I made a mistake.*"], ["*She said me …*", "*She told me …*"], ["*interested for*", "*interested in*"], ["*look forward to hear*", "*look forward to hearing*"]) },
    ];
  },
  EN_WRITING_ASSESSMENT_MCQ_1: (q) => {
    q.explanation = [{ kind: "what", title: "Warum", body: T(["Dafür gibt es Punkte", "Das heißt für dich"], ["Inhalt", "Alle Fragen und Punkte der Aufgabe sind beantwortet."], ["Sprache", "Man versteht dich, und die Sätze sind richtig gebaut."], ["Länge", "Die verlangte Wortzahl ist erreicht."]) + NL + NL + "Grammatik allein reicht also nicht. Und die Handschrift wird nicht bewertet, solange man sie lesen kann." }];
  },
  EN_WRITING_MEDIATION_MCQ_1: (q) => {
    q.explanation = [{ kind: "what", title: "Warum", body: "Bei der Mediation gibst du den Inhalt weiter und nicht die einzelnen Wörter. Du sagst die verlangten Punkte in einfachen englischen Sätzen, meistens in einer E-Mail an einen Freund." + NL + NL + "Eine Übersetzung Wort für Wort ist nicht verlangt und führt zu Fehlern. Eine Zusammenfassung auf Deutsch hilft dem englischen Freund nicht." }];
  },
  EN_MEDIATION_MCQ_T1: (q) => {
    reasons(q, [
      "Autodidaktisch bedeutet, dass er es sich selbst beigebracht hat. Das sagst du einfach: *taught himself*. Die wörtliche Übertragung versteht niemand.",
      "Hervorstechen bedeutet auffallen. Dafür gibt es *stand out*. Das deutsche Bild Wort für Wort zu übertragen ergibt keinen Sinn.",
      "Überwältigend heißt *overwhelming*, und der Auftritt ist hier *the show*. Die anderen Sätze sind wörtlich übertragen oder unvollständig.",
      "Erwägen bedeutet über etwas nachdenken: *think about*. Das Abitur umschreibst du als *final exams*, weil es das Wort im Englischen nicht gibt.",
      "Den Modeolymp erklimmen ist ein Bild. Gemeint ist, in der Modewelt ganz nach oben zu kommen. Diesen Sinn gibst du weiter.",
      "Es mangelt ihm nicht bedeutet: Er hat genug davon. Vorsicht: *self-conscious* heißt befangen und ist das Gegenteil von selbstbewusst.",
      "Mit 14 heißt im Englischen *at the age of 14*. *With 14* ist Wort für Wort aus dem Deutschen übertragen.",
      "Gefragt sein bedeutet hier beliebt sein: *popular*. Mit fragen hat das nichts zu tun.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", body: LIST("Frag dich zuerst auf Deutsch: Was ist eigentlich gemeint?", "Sag diesen Sinn dann in einem kurzen, einfachen englischen Satz.", "Ein kurzer richtiger Satz ist besser als eine wörtliche Übertragung mit Fehlern.") },
    ];
  },
  EN_PICTURE_PHRASE_MCQ_T1: (q) => {
    reasons(q, [
      "Der Vordergrund ist das, was vorn im Bild ist. Es heißt *in the foreground*, mit *in*.",
      "Der Hintergrund ist das, was hinten im Bild ist. Es heißt *in the background*, mit *in*.",
      "Links und rechts stehen mit *on*: *on the left* und *on the right*.",
      "*The photo shows …* ist der übliche erste Satz einer Bildbeschreibung. *On the photo it gives* ist Wort für Wort aus dem Deutschen übertragen.",
      "Mit *It looks like …* sagst du, wie etwas auf dich wirkt. Zum Beispiel: *It looks like they are having fun.*",
      "Es heißt *in the middle of the picture*. Man kann auch *in the centre of* sagen.",
      "Für die eigene Vermutung nimmst du *I think* oder *I believe*. *I mean* bedeutet ich meine damit und passt hier nicht.",
      "Im Englischen ist etwas *in the picture*, nicht *on*. Und für man sieht sagt man *you can see*.",
    ]);
    q.explanation = [
      { kind: "what", title: "Warum", body: "{{s_grund}}" },
      { kind: "remember", title: "Ein Foto beschreiben", body: LIST("Zuerst der Überblick: *The photo shows …*", "Dann, wo etwas ist: *in the foreground, in the background, on the left*", "Zum Schluss dein Gedanke: *It looks like …* oder *I think …*") },
    ];
  },
  EN_VOCAB_CLOZE_T1: (q) => {
    reasons(q, [
      "*To apply for a job* bedeutet sich um eine Stelle bewerben. *Employ* heißt jemanden einstellen.",
      "*Internship* bedeutet Praktikum. Ein *interview* ist ein Gespräch, und *income* ist das Einkommen.",
      "*CV* bedeutet Lebenslauf. Den hängt man an eine Bewerbung an.",
      "*Accommodation* bedeutet Unterkunft, also ein Hotel, ein Hostel oder eine Ferienwohnung. *Application* ist eine Bewerbung.",
      "Ein *return ticket* ist eine Fahrkarte für die Hin- und Rückfahrt. Eine einfache Fahrt heißt *single ticket*.",
      "*Screen time* ist die Zeit, die man vor einem Bildschirm verbringt.",
      "*Password* bedeutet Passwort. Ein *passport* ist ein Reisepass.",
      "*Environment* bedeutet Umwelt. *Government* ist die Regierung.",
      "*Pollution* bedeutet Verschmutzung. *Population* ist die Bevölkerung, und *solution* ist die Lösung.",
      "*In my opinion* bedeutet meiner Meinung nach. *Option* ist eine Möglichkeit.",
      "*To go sightseeing* bedeutet Sehenswürdigkeiten besichtigen. Die anderen beiden Wörter gibt es nicht.",
      "*Flat* bedeutet Wohnung. Ein *flight* ist ein Flug.",
      "*Species* bedeutet Arten, hier Tierarten. *Spices* sind Gewürze.",
      "*Addicted to* bedeutet süchtig nach. *Attached* heißt angehängt.",
      "*To share* bedeutet teilen. *Shave* heißt rasieren, und *shape* ist eine Form.",
      "Der *employer* ist der Arbeitgeber. Der *employee* ist der Arbeitnehmer, also der, der dort arbeitet.",
    ]);
    q.explanation = [{ kind: "what", title: "Warum", body: "{{s_grund}}" }];
  },
});
