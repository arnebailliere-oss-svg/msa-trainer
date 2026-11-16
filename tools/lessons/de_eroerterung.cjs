// Guided lesson: the Erörterung, from the plan to the finished text.
const { P, L, k, b, ch, v, q, primer } = require("./lib.cjs");

primer(
  "primers/de_05_eroerterung.json",
  {
    id: "P_DE_EROERTERUNG",
    subject: "DE",
    title: "Die Erörterung: vom Plan zum Text",
    teaser: "Wie du eine Frage von zwei Seiten betrachtest und am Ende deine Meinung sagst. Zuerst der Schreibplan, der in der Prüfung eigene Punkte bringt, dann der Text: Einleitung, Hauptteil und Schluss, mit einem Beispiel, wie aus einer Zeile im Plan ein ganzer Absatz wird.",
    hook: "Der längste Text, den du in der Deutschprüfung schreibst, hat einen Namen, der viele einschüchtert. Dabei ist er nichts anderes als ein geordnetes Nachdenken auf Papier. Du schaust dir eine Frage von zwei Seiten an und entscheidest am Ende, was du selbst denkst. Wenn du den Bauplan kennst, musst du nur noch die Fächer füllen.",
    outro: "Du kennst jetzt den ganzen Weg. Zuerst füllst du den Schreibplan aus: Einleitung, zwei Seiten mit je drei Argumenten, Schluss. Dann machst du aus jeder Zeile einen Absatz mit Behauptung, Begründung und Beispiel. Deine eigene Meinung sagst du erst im Schluss. Und du schreibst in Standardsprache und in der Gegenwart.",
    requires: ["P_DE_LESEN", "P_DE_ARGUMENT", "P_DE_ZEITFORMEN", "P_DE_REGISTER"],
  },
  [
    ch(
      "Was von dir verlangt wird",
      b(
        "Eine Frage, zwei Seiten",
        ["*Sind soziale Medien gut für uns?*", L("Einiges spricht dafür.", "Einiges spricht dagegen."), "Ein Text, der beide Seiten abwägt, heißt **Erörterung**."],
        "Bei einer Erörterung bekommst du eine Frage, auf die es keine einfache Antwort gibt. Du sollst zeigen, was dafür spricht und was dagegen. Erst ganz am Ende sagst du, wie du selbst die Sache siehst. Du arbeitest wie ein Richter, der beide Seiten anhört, bevor er urteilt.",
      ),
      b(
        "Zwei Aufgaben, zweimal Punkte",
        ["(1) Der **Schreibplan**: eine Tabelle mit Stichpunkten.", "(2) Der **Text**: die ausgeschriebene Erörterung.", "Beides wird bewertet."],
        "In der Prüfung bekommst du zuerst eine leere Tabelle. In sie trägst du in Stichpunkten ein, was du schreiben willst. Das ist der Schreibplan, und er bringt fast so viele Punkte wie der Text selbst. Lass ihn deshalb nie aus, auch wenn du lieber gleich losschreiben würdest.",
      ),
      b(
        "Die drei Teile des Textes",
        [L("**Einleitung**: Worum geht es?", "**Hauptteil**: Was spricht dafür, was dagegen?", "**Schluss**: Was denke ich?")],
        "Jede Erörterung hat diese drei Teile. Die Einleitung führt zum Thema hin. Der Hauptteil ist der längste Teil und enthält alle Argumente beider Seiten. Im Schluss sagst du deine eigene Meinung. Wenn diese drei Teile klar erkennbar sind, ist schon viel gewonnen.",
        { tasks: [k("In welchem Teil sagst du deine eigene Meinung? ___", "im Schluss", ["in der Einleitung"], "Zuerst zeigst du beide Seiten. Erst danach urteilst du.", "Wann spricht ein Richter sein Urteil: am Anfang oder am Ende?")] },
      ),
      b(
        "Jetzt du: die drei Teile",
        "Tipp bei jedem Satz auf den Teil, in den er gehört.",
        "Überleg bei jedem Satz, welche Aufgabe er hat. Führt er zum Thema hin, nennt er ein Argument, oder ist er ein Urteil?",
        {
          tasks: [
            k("Jeder Zweite schaut schon vor dem Frühstück auf sein Handy. Der Satz gehört ___.", "in die Einleitung", ["in den Schluss"], "Der Satz weckt Interesse und führt zum Thema hin.", "Ist das ein Urteil, oder führt der Satz zum Thema hin?"),
            k("Ich bin der Ansicht, dass die Nachteile überwiegen. Der Satz gehört ___.", "in den Schluss", ["in die Einleitung"], "Hier urteilt der Schreiber und sagt seine eigene Meinung.", "Wessen Meinung steht in dem Satz?"),
          ],
        },
      ),
    ),
    ch(
      "Der Schreibplan",
      b(
        "Die Felder der Tabelle",
        [L("Einleitung", "**These** mit drei Argumenten", "**Gegenthese** mit drei Argumenten", "Schluss")],
        "So sieht der Schreibplan aus. Die These ist der eine Standpunkt, zum Beispiel: Soziale Medien sind eine Bereicherung. Die Gegenthese ist der entgegengesetzte Standpunkt. Zu jedem der beiden trägst du drei Argumente ein. Dazu kommen ein Feld für die Einleitung und eins für den Schluss.",
      ),
      b(
        "Stichpunkte reichen",
        ["*Vereinsamung: lieber online als treffen; Studie zu Vielnutzern*", "Im Plan schreibst du **keine ganzen Sätze**."],
        "Im Schreibplan sparst du Zeit. Du notierst nur die Gedanken, nicht die fertigen Sätze. Ein Wort für die Behauptung, ein paar Wörter für den Grund und ein Hinweis auf dein Beispiel. Ausformuliert wird erst im Text.",
      ),
      b(
        "Ein Argument hat drei Teile",
        [L("**Behauptung**: Soziale Medien machen einsam.", "**Begründung**: Viele schreiben lieber, als sich zu treffen.", "**Beispiel**: Vielnutzer treffen seltener Freunde.")],
        "Das kennst du aus der Lektion über Argumente. Eine Behauptung allein überzeugt niemanden. Sie braucht einen Grund, und der Grund braucht einen Fall, an dem man ihn sieht. Achte schon im Plan darauf, dass jedes Argument alle drei Teile hat.",
        { tasks: [k("Im Plan steht nur: Soziale Medien sind schlecht. Es fehlen ___.", "Begründung und Beispiel", ["Einleitung und Schluss"], "Der Satz ist nur eine Behauptung. Ein Argument braucht noch zwei Teile.", "Aus welchen drei Teilen besteht ein Argument? Welcher steht schon da?")] },
      ),
      b(
        "Gleich viele auf beiden Seiten",
        ["Drei Argumente dafür.", "Drei Argumente dagegen.", "Der Text soll **ausgewogen** sein."],
        "Eine Erörterung soll beide Seiten ernst nehmen. Wenn du fünf Argumente für eine Seite hast und nur eins für die andere, wirkt der Text einseitig. Such deshalb so lange, bis beide Seiten gleich stark besetzt sind. Auch für die Seite, die du selbst nicht vertrittst.",
      ),
      b(
        "Das stärkste Argument kommt zuletzt",
        ["Ordne die Argumente jeder Seite: vom schwächsten zum **stärksten**.", "Was zuletzt kommt, bleibt im Kopf."],
        "Menschen erinnern sich am besten an das, was sie zuletzt gelesen haben. Deshalb steht dein stärkstes Argument am Ende. Die Seite, für die du dich im Schluss entscheidest, behandelst du im Hauptteil als zweite. So führt der Text ganz natürlich zu deinem Urteil.",
        { tasks: [k("Dein stärkstes Argument steht in der Reihe ___.", "an letzter Stelle", ["an erster Stelle"], "Was der Leser zuletzt liest, bleibt ihm am besten im Kopf.", "Woran erinnert man sich nach dem Lesen am besten?")] },
      ),
      b(
        "Jetzt du: den Plan füllen",
        "Die Frage lautet: Sollte die Schule später beginnen? Tipp auf die richtige Lösung.",
        "Hier siehst du Stichpunkte für einen Schreibplan. Überleg bei jedem, in welches Feld der Tabelle er gehört.",
        {
          tasks: [
            k("Jugendliche morgens müde, lernen schlechter. Der Stichpunkt gehört ___.", "zu den Argumenten dafür", ["in den Schluss"], "Müdigkeit am Morgen spricht für einen späteren Beginn.", "Spricht dieser Gedanke für oder gegen den späteren Beginn?"),
            k("Unterricht bis in den späten Nachmittag. Der Stichpunkt gehört ___.", "zu den Argumenten dagegen", ["zu den Argumenten dafür"], "Ein später Schulschluss ist ein Nachteil.", "Ist ein später Schulschluss ein Vorteil oder ein Nachteil?"),
            k("Meine Meinung: später Beginn, aber nur eine halbe Stunde. Der Stichpunkt gehört ___.", "in den Schluss", ["in die Einleitung"], "Die eigene Meinung steht erst am Ende.", "In welchem Teil steht dein eigenes Urteil?"),
          ],
        },
      ),
    ),
    ch(
      "Vom Plan zum Text",
      b(
        "Die Einleitung",
        ["*Jeder Zweite schaut schon vor dem Frühstück auf sein Handy. Doch tut uns das gut?*", "Erst ein Aufhänger, dann die **Frage**.", "Deine Meinung verrätst du hier noch nicht."],
        "Die Einleitung ist kurz, zwei bis vier Sätze reichen. Sie beginnt mit etwas, das neugierig macht: einer Zahl, einer Beobachtung oder einer kleinen Szene. Danach nennst du die Frage, um die es geht. Was du selbst denkst, bleibt noch dein Geheimnis.",
      ),
      b(
        "Aus einer Zeile wird ein Absatz",
        ["Im Plan: *Vereinsamung: lieber online als treffen; Vielnutzer*", "Im Text: *Soziale Medien können einsam machen. Viele schreiben lieber Nachrichten, als sich zu verabreden. So treffen Jugendliche, die sehr viel online sind, ihre Freunde seltener.*"],
        "Schau genau, was hier passiert ist. Aus dem ersten Stichwort wurde der Satz mit der Behauptung. Aus dem zweiten wurde die Begründung. Aus dem dritten wurde das Beispiel. Drei Stichpunkte, drei Sätze, ein Absatz. So verfährst du mit jeder Zeile deines Plans.",
      ),
      b(
        "Ein Argument, ein Absatz",
        ["Jedes Argument bekommt einen **eigenen Absatz**.", "Zwischen den Absätzen lässt du eine Zeile frei oder rückst ein."],
        "Absätze machen deinen Text übersichtlich. Der Leser sieht sofort, wo ein Gedanke aufhört und der nächste anfängt. Bei drei Argumenten auf jeder Seite hat dein Hauptteil also sechs Absätze. Dazu kommen einer für die Einleitung und einer für den Schluss.",
        { tasks: [k("Im Plan stehen drei Argumente dafür und drei dagegen. Der Hauptteil hat ___ Absätze.", "sechs", ["zwei"], "Jedes Argument bekommt einen eigenen Absatz.", "Wie viele Argumente sind es zusammen?")] },
      ),
      b(
        "Wörter, die verbinden",
        [L("Ein weiteres Argument: *Außerdem …, Hinzu kommt …*", "Die Gegenseite: *Allerdings …, Andererseits …*", "Das stärkste Argument: *Vor allem …, Am wichtigsten ist …*")],
        "Ohne Verbindungen stehen deine Absätze wie einzelne Klötze nebeneinander. Mit einem kleinen Wort am Anfang zeigst du, wie der neue Gedanke zum vorigen passt. Besonders wichtig ist die Stelle, an der du von der einen Seite zur anderen wechselst. Dort gehört ein deutliches Signal hin.",
        { tasks: [k("Du wechselst von den Vorteilen zu den Nachteilen. Der Absatz beginnt mit ___.", "Allerdings", ["Außerdem"], "Das Wort kündigt an, dass jetzt die andere Seite kommt.", "Welches der beiden Wörter kündigt einen Einwand an?")] },
      ),
      b(
        "Der Schluss",
        ["(1) Deine **Meinung**: *Meiner Ansicht nach überwiegen …*", "(2) Der wichtigste Grund dafür.", "(3) Ein Vorschlag oder ein Ausblick."],
        "Jetzt darfst du endlich ich sagen. Du nennst deine Entscheidung und sagst, welches Argument dich am meisten überzeugt hat. Diese Zusammenfassung mit Urteil nennt man **Fazit**. Zum Abschluss kannst du einen Vorschlag machen, was man tun sollte.",
      ),
      b(
        "Im Schluss kommt nichts Neues",
        ["Der Schluss **wiederholt** das stärkste Argument.", "Er bringt **kein neues** Argument."],
        "Das ist ein häufiger Fehler. Beim Schreiben des Schlusses fällt einem plötzlich noch ein guter Gedanke ein, und man schreibt ihn dazu. Im Schluss wird aber nur noch geurteilt. Ein neues Argument gehört in den Hauptteil. Wenn dir eins einfällt, trag es dort nach.",
        { tasks: [k("Beim Schluss fällt dir ein neues Argument ein. Es gehört ___.", "in den Hauptteil", ["in den Schluss"], "Im Schluss wird nur noch geurteilt und zusammengefasst.", "In welchem Teil stehen alle Argumente?")] },
      ),
      b(
        "Jetzt du: Was passt wohin?",
        "Tipp bei jedem Satz auf die richtige Lösung.",
        "Frag dich bei jedem Satz, ob er ein Thema eröffnet, ein Argument verbindet oder ein Urteil spricht.",
        {
          tasks: [
            k("Hinzu kommt, dass man online leicht neue Leute kennenlernt. Der Satz steht ___.", "im Hauptteil", ["im Schluss"], "Hinzu kommt leitet ein weiteres Argument ein.", "Was kündigen die Wörter hinzu kommt an?"),
            k("Welcher Satz passt in eine Einleitung? ___", "Fast jeder Jugendliche hat heute ein Smartphone.", ["Deshalb bin ich dagegen."], "Der Satz führt zum Thema hin und verrät noch keine Meinung.", "Welcher der beiden Sätze verrät noch keine eigene Meinung?"),
            k("Welcher Satz passt in einen Schluss? ___", "Insgesamt überzeugen mich die Vorteile mehr.", ["Ein weiterer Nachteil ist die Ablenkung."], "Der Satz fällt ein Urteil. Der andere bringt ein neues Argument.", "Welcher der beiden Sätze bringt ein neues Argument und gehört deshalb nicht in den Schluss?"),
          ],
        },
      ),
    ),
    ch(
      "Sprache und Kontrolle",
      b(
        "So schreibst du",
        ["(1) Im **Präsens**: *Soziale Medien verbinden Menschen.*", "(2) In **Standardsprache**, ohne Füllwörter.", "(3) **Sachlich**, bis zum Schluss ohne ich."],
        "Eine Erörterung steht in der Gegenwart, denn sie spricht über etwas, das jetzt gilt. Du schreibst sachlich und in ganzen Sätzen. Wörter wie voll, halt und irgendwie haben hier keinen Platz. Das Wort ich benutzt du erst im Schluss.",
      ),
      b(
        "Die Kontrolle am Ende",
        ["(1) Sind Einleitung, Hauptteil und Schluss erkennbar?", "(2) Hat jedes Argument Behauptung, Begründung und Beispiel?", "(3) Steht die eigene Meinung nur im Schluss?", "(4) Stimmen Kommas und Großschreibung?"],
        "Plane für diese Kontrolle fünf Minuten ein. Lies deinen Text einmal nur auf den Aufbau durch und einmal nur auf die Sprache. Die meisten Punkte gehen nicht durch fehlende Ideen verloren. Sie gehen durch fehlende Begründungen und durch Fehler verloren, die man beim Durchlesen gefunden hätte.",
        { tasks: [k("Soziale Medien sind halt voll praktisch. Was stört an diesem Satz in einer Erörterung? ___", "die Umgangssprache", ["die Länge"], "Halt und voll gehören nicht in einen sachlichen Text.", "Welche Wörter in dem Satz würdest du in einer Zeitung nicht finden?")] },
      ),
      b(
        "Jetzt du: Fehler im Aufbau finden",
        "Tipp bei jeder Aufgabe auf die richtige Lösung.",
        "Denk an das, was du über die drei Teile, die Argumente und die Sprache gelernt hast.",
        {
          tasks: [
            k("Eine Erörterung beginnt mit: Ich finde soziale Medien schlecht. Der Fehler ist: ___", "Die Meinung steht schon in der Einleitung.", ["Der Satz ist zu kurz."], "Die eigene Meinung gehört erst in den Schluss.", "In welchem Teil darf die eigene Meinung stehen?"),
            k("Ein Text nennt fünf Vorteile und keinen Nachteil. Der Fehler ist: ___", "Er ist nicht ausgewogen.", ["Er ist zu lang."], "Eine Erörterung soll beide Seiten zeigen.", "Wie viele Seiten einer Frage soll eine Erörterung zeigen?"),
          ],
        },
      ),
      b(
        "Das nimmst du mit",
        ["(1) Erst der **Schreibplan**, dann der Text.", "(2) Jedes Argument: Behauptung, Begründung, Beispiel, ein Absatz.", "(3) Das stärkste Argument zuletzt.", "(4) Die eigene Meinung erst im Schluss."],
        "Das sind die vier Regeln, die deine Erörterung tragen. Wenn du in der Prüfung nervös wirst, halt dich an den Plan. Er führt dich Schritt für Schritt durch den Text. Gleich kommen noch die Wörter zum Nachlesen und ein kleines Quiz.",
        { tasks: [k("Womit beginnst du in der Prüfung? ___", "mit dem Schreibplan", ["mit dem ersten Satz des Textes"], "Der Plan ordnet deine Gedanken und bringt eigene Punkte.", "Was bringt eigene Punkte und spart dir später Zeit?")] },
      ),
    ),
  ],
  [
    v("Erörterung", "Ein Text, der eine Frage von zwei Seiten betrachtet und am Ende urteilt."),
    v("Schreibplan", "Eine Tabelle mit Stichpunkten: Einleitung, These mit Argumenten, Gegenthese mit Argumenten, Schluss."),
    v("Gegenthese", "Der Standpunkt, der der These widerspricht."),
    v("Behauptung, Begründung, Beispiel", "Die drei Teile eines Arguments."),
    v("Fazit", "Die Zusammenfassung mit Urteil im Schluss."),
    v("ausgewogen", "Beide Seiten haben gleich viele Argumente."),
    v("Außerdem, Allerdings, Vor allem", "Wörter, die Absätze verbinden: ein weiteres Argument, die Gegenseite, das stärkste Argument."),
  ],
  [
    q("Aus welchen drei Teilen besteht eine Erörterung?", "Einleitung, Hauptteil, Schluss", ["These, Zitat, Quelle", "Frage, Antwort, Beispiel", "Plan, Text, Korrektur"], "Die Einleitung führt zum Thema, der Hauptteil nennt die Argumente beider Seiten, und der Schluss urteilt."),
    q("Wo steht deine eigene Meinung?", "im Schluss", ["in der Einleitung", "in jedem Absatz", "im Schreibplan ganz oben"], "Zuerst zeigst du sachlich beide Seiten. Erst am Ende sagst du, wie du selbst urteilst."),
    q("Welche drei Teile hat ein Argument?", "Behauptung, Begründung, Beispiel", ["Einleitung, Hauptteil, Schluss", "Frage, Meinung, Ausblick", "These, Gegenthese, Fazit"], "Die Behauptung sagt, was gilt. Die Begründung sagt, warum. Das Beispiel zeigt es an einem Fall."),
    q("Welches Argument steht am Ende einer Seite?", "das stärkste", ["das schwächste", "das kürzeste", "das erste, das dir einfällt"], "Was der Leser zuletzt liest, bleibt ihm am besten im Kopf."),
    q("Was gehört in die Einleitung?", "ein Aufhänger und die Frage", ["deine Meinung", "das stärkste Argument", "das Fazit"], "Die Einleitung macht neugierig und nennt das Thema. Die Meinung bleibt bis zum Schluss offen."),
    q("In welcher Zeitform schreibst du eine Erörterung?", "im Präsens", ["im Präteritum", "im Plusquamperfekt", "im Futur"], "Eine Erörterung spricht über etwas, das jetzt gilt. Deshalb steht sie in der Gegenwart."),
    q("Mit welchem Wort leitest du zur Gegenseite über?", "Allerdings", ["Außerdem", "Zum Beispiel", "Hinzu kommt"], "Allerdings kündigt einen Einwand an. Außerdem und hinzu kommt reihen ein weiteres Argument derselben Seite an."),
    q("Was darf im Schluss nicht stehen?", "ein neues Argument", ["deine Meinung", "ein Vorschlag", "das wichtigste Argument noch einmal"], "Im Schluss wird nur geurteilt und zusammengefasst. Neue Argumente gehören in den Hauptteil."),
  ],
);
