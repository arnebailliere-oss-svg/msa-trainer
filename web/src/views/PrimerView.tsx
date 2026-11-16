/**
 * Eulen-Lektion ("Frag Ferdinand"): Ferdinand the owl in front of a chalkboard.
 * One idea per board, written in chalk. Click → the board is wiped → the next idea appears.
 * At the end: the words, then a mini quiz on the board. Assumes nothing.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useApp } from "@/app/state";
import { renderFigureSpec } from "@/core/variants";
import { MathText } from "@/ui/MathText";
import { OWL_NAME, OwlAvatar } from "@/ui/Owl";
import { Button } from "@/ui/primitives";

/** "pause" is the board between two chapters: a place to stop; `step` is the first board of the next chapter. */
type Phase = "intro" | "steps" | "pause" | "vocab" | "quiz" | "done";
const PASS_RATIO = 0.8;
const WIPE_MS = 280;

/** Stable shuffle: the same lesson visit always shows the same order, a new visit a new one. */
function shuffled<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let x = (seed | 0) || 1;
  for (let i = out.length - 1; i > 0; i--) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    const j = Math.abs(x) % (i + 1);
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}
const hash = (s: string) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);

interface Pos {
  phase: Phase;
  step: number;
  qi: number;
}

export function PrimerView() {
  const { id = "" } = useParams();
  const { content, profile, store, notifyProgress } = useApp();
  const nav = useNavigate();
  const { state } = useLocation() as { state: { from?: string } | null };
  const primer = content?.primerById(id);

  const [pos, setPos] = useState<Pos>({ phase: "intro", step: 0, qi: 0 });
  /** The lesson `pos` belongs to; guards against saving a position into a lesson the address just switched to. */
  const [posId, setPosId] = useState(id);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wiping, setWiping] = useState(false);
  /** "Jetzt du" boards: which gaps are solved, which wrong choices were tried, and what Ferdinand answers. */
  const [solved, setSolved] = useState<Record<number, boolean>>({});
  const [tried, setTried] = useState<Record<number, string[]>>({});
  const [taskSay, setTaskSay] = useState<string | null>(null);
  const wipeTimer = useRef<number | null>(null);
  /** Changes on every visit, so answer choices are not always in the same place. */
  const visit = useRef(Math.floor(Math.random() * 1e9));

  /** Chapters: a board with `chapter` starts one. Lessons without chapters are one chapter. */
  const chapters = useMemo(() => {
    const out: { title: string; start: number; end: number }[] = [];
    (primer?.steps ?? []).forEach((s, i) => {
      if (s.chapter || i === 0) out.push({ title: s.chapter ?? "", start: i, end: i });
      out[out.length - 1]!.end = i;
    });
    return out;
  }, [primer]);
  const hasChapters = chapters.length > 1;
  const chapterOf = (step: number) => Math.max(0, chapters.findIndex((c) => step >= c.start && step <= c.end));
  /** Where the student stopped last time (0 = start). */
  const savedStep = profile && store && primer ? Math.min(store.primerPos(profile.id, primer.id), primer.steps.length - 1) : 0;

  useEffect(() => {
    if (!profile || !store || !primer || posId !== primer.id) return;
    if (pos.phase === "steps" || pos.phase === "pause") store.setPrimerPos(profile.id, primer.id, pos.step);
  }, [pos, posId, profile, store, primer]);

  useEffect(() => {
    setPos({ phase: "intro", step: 0, qi: 0 });
    setPosId(id);
    setPicked(null);
    setScore(0);
    setWiping(false);
    window.scrollTo({ top: 0 });
  }, [id]);
  useEffect(() => () => {
    if (wipeTimer.current) window.clearTimeout(wipeTimer.current);
  }, []);
  // A fresh board starts with empty gaps.
  useEffect(() => {
    setSolved({});
    setTried({});
    setTaskSay(null);
  }, [id, pos.phase, pos.step]);

  const quiz = primer?.quiz ?? [];
  const passed = quiz.length > 0 && score >= Math.ceil(quiz.length * PASS_RATIO);
  const alreadyDone = !!(profile && store && primer && store.primerDone(profile.id, primer.id));

  useEffect(() => {
    if (pos.phase === "done" && passed && profile && store && primer) {
      store.setPrimerPos(profile.id, primer.id, 0);
      if (!store.primerDone(profile.id, primer.id)) {
        store.markPrimerDone(profile.id, primer.id);
        notifyProgress();
      }
    }
  }, [pos.phase, passed, profile, store, primer, notifyProgress]);

  /** Wipe the board, then show the next content. */
  const go = useCallback((next: Pos, resetPick = true) => {
    if (wiping) return;
    setWiping(true);
    wipeTimer.current = window.setTimeout(() => {
      setPos(next);
      if (resetPick) setPicked(null);
      setWiping(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, WIPE_MS);
  }, [wiping]);

  const back = useCallback(() => nav(state?.from ?? "/eule"), [nav, state]);
  const restart = useCallback(() => {
    setScore(0);
    go({ phase: "steps", step: 0, qi: 0 });
  }, [go]);

  const advance = useCallback(() => {
    if (!primer) return;
    const { phase, step, qi } = pos;
    if (phase === "intro") go({ phase: "steps", step: savedStep, qi: 0 });
    else if (phase === "pause") go({ phase: "steps", step, qi: 0 });
    else if (phase === "steps") {
      if (step + 1 < primer.steps.length) go({ phase: primer.steps[step + 1]!.chapter ? "pause" : "steps", step: step + 1, qi: 0 });
      else go({ phase: primer.vocab.length ? "vocab" : "quiz", step, qi: 0 });
    } else if (phase === "vocab") go({ phase: "quiz", step, qi: 0 });
    else if (phase === "quiz" && picked !== null) {
      if (qi + 1 < quiz.length) go({ phase: "quiz", step, qi: qi + 1 });
      else go({ phase: "done", step, qi });
    }
  }, [primer, pos, picked, quiz.length, go, savedStep]);

  const backStep = useCallback(() => {
    if ((pos.phase === "steps" || pos.phase === "pause") && pos.step > 0) go({ ...pos, phase: "steps", step: pos.step - 1 });
  }, [pos, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (pos.phase === "done" || (pos.phase === "quiz" && picked === null)) return;
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowRight") {
        if (pos.phase === "steps") advance();
      } else if (e.key === "ArrowLeft") backStep();
      else if (pos.phase === "quiz" && picked === null && /^[1-5]$/.test(e.key)) {
        const c = quizChoices[Number(e.key) - 1];
        if (c !== undefined) pick(c);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advance, backStep, pos, picked, quiz]);

  const current = quiz[pos.qi];
  const quizChoices = useMemo(() => (current ? shuffled(current.choices, visit.current + hash(`${id}q${pos.qi}`)) : []), [current, id, pos.qi]);
  const pick = (c: string) => {
    if (picked !== null || !current) return;
    setPicked(c);
    if (c === current.correct) setScore((s) => s + 1);
  };

  const tasks = useMemo(
    () => (pos.phase === "steps" ? (primer?.steps[pos.step]?.tasks ?? []) : []).map((t, ti) => ({ ...t, choices: shuffled(t.choices, visit.current + hash(`${id}s${pos.step}t${ti}`)) })),
    [primer, pos.phase, pos.step, id],
  );
  const pickTask = (ti: number, choice: string) => {
    const t = tasks[ti];
    if (!t || solved[ti]) return;
    if (choice === t.correct) {
      const allDone = tasks.every((_, k) => k === ti || solved[k]);
      setSolved((s) => ({ ...s, [ti]: true }));
      setTaskSay("**Genau!** " + (t.why ?? "") + (allDone ? " Damit hast du alle Lücken gefüllt. Klick auf Weiter, wenn du so weit bist." : ""));
    } else {
      setTried((w) => ({ ...w, [ti]: [...(w[ti] ?? []), choice] }));
      setTaskSay("**Noch nicht ganz.** Das ist nicht schlimm. " + (t.hint ?? "Schau dir den Satz noch einmal in Ruhe an und probier eine andere Antwort."));
    }
  };

  const stepFigure = useMemo(() => {
    const s = primer?.steps[pos.step];
    if (!s?.figure || pos.phase !== "steps") return undefined;
    try {
      return renderFigureSpec(s.figure, {});
    } catch {
      return undefined;
    }
  }, [primer, pos]);

  if (!content) return null;
  if (!primer) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-xl font-semibold">Diese Eulen-Lektion gibt es nicht.</p>
        <Button className="mt-6" onClick={() => nav("/eule")}>
          Alle Eulen-Lektionen
        </Button>
      </div>
    );
  }

  const total = primer.steps.length;
  const stepData = primer.steps[pos.step];
  const boardKey = `${pos.phase}-${pos.step}-${pos.qi}`;

  // What Ferdinand says under the board.
  let says: string;
  const chapterIdx = chapterOf(pos.step);
  if (pos.phase === "intro") says = savedStep > 0 ? `Schön, dass du wieder da bist. Ich habe mir gemerkt, wo du warst${hasChapters ? `: in Kapitel ${chapterOf(savedStep) + 1}` : ""}. Wir machen genau dort weiter.` : primer.hook;
  else if (pos.phase === "pause")
    says = `Kapitel ${chapterIdx} ist geschafft. Das hast du gut gemacht. Wenn du magst, mach jetzt eine Pause. Ich merke mir, wo du bist. Und wenn du weitermachen möchtest, kommt als Nächstes: **${chapters[chapterIdx]?.title ?? ""}**.`;
  else if (pos.phase === "steps") says = taskSay ?? stepData?.say ?? "Lies die Tafel in Ruhe. Dann klick auf Weiter.";
  else if (pos.phase === "vocab") says = "Das sind die Wörter, die du jetzt kennst. Lies sie einmal laut, dann sitzen sie.";
  else if (pos.phase === "quiz") says = picked === null ? "Kein Stress. Hier gibt es keine Noten. Tipp einfach auf die Antwort, die du für richtig hältst." : picked === current?.correct ? `**Genau!** ${current?.explain ?? ""}` : `**Nicht ganz.** ${current?.explain ?? ""}`;
  else says = passed ? (primer.outro ?? "Du kennst jetzt die Wörter und Zeichen. Damit macht die Lektion viel mehr Sinn, und die Aufgaben auch.") : "Das ist völlig normal. Wir gehen die Tafeln einfach noch einmal durch. Beim zweiten Mal klickt es meistens.";

  const nextLabel =
    pos.phase === "intro" ? (savedStep > 0 ? "Weitermachen →" : "Los geht's →") : pos.phase === "pause" ? "Weiter →" : pos.phase === "steps" ? (pos.step + 1 === total ? (primer.vocab.length ? "Zu den Wörtern →" : "Zum Quiz →") : "Weiter →") : pos.phase === "vocab" ? "Zum Quiz →" : pos.qi + 1 === quiz.length ? "Auswertung →" : "Nächste Frage →";

  // How far through the lesson: every board, the word list and every quiz question count as one unit.
  const units = total + (primer.vocab.length ? 1 : 0) + quiz.length;
  const doneUnits =
    pos.phase === "intro" ? 0 : pos.phase === "pause" ? pos.step : pos.phase === "steps" ? pos.step + 1 : pos.phase === "vocab" ? total + 1 : pos.phase === "quiz" ? total + (primer.vocab.length ? 1 : 0) + pos.qi + 1 : units;
  const stage = pos.phase === "intro" ? "Start" : pos.phase === "pause" ? "Pause" : pos.phase === "steps" ? "Tafeln" : pos.phase === "vocab" ? "Wörter" : pos.phase === "quiz" ? "Quiz" : "Fertig";

  /** Back / next buttons. Shown in Ferdinand's column on wide screens and as a bottom bar on phones. */
  const controls = (
    <>
      {(pos.phase === "steps" || pos.phase === "pause") && (
        <Button variant="ghost" size="lg" onClick={backStep} disabled={pos.step === 0} aria-label="Eine Tafel zurück">
          ←
        </Button>
      )}
      {pos.phase === "pause" && (
        <Button variant="ghost" size="lg" onClick={back}>
          Pause
        </Button>
      )}
      {pos.phase === "intro" && savedStep > 0 && (
        <Button variant="ghost" size="lg" onClick={() => go({ phase: "steps", step: 0, qi: 0 })}>
          Von vorn
        </Button>
      )}
      {pos.phase === "done" ? (
        <>
          <Button variant="accent" size="lg" full onClick={back}>
            {state?.from ? "Zurück zur Lektion →" : "Fertig"}
          </Button>
          <Button variant="ghost" size="lg" onClick={restart}>
            Nochmal
          </Button>
        </>
      ) : (
        <Button variant="accent" size="lg" full onClick={advance} disabled={wiping || (pos.phase === "quiz" && picked === null)}>
          {nextLabel} <span className="hidden text-xs font-normal opacity-70 lg:inline">(Enter)</span>
        </Button>
      )}
    </>
  );

  return (
    <div className={`subject-${primer.subject} mx-auto max-w-2xl px-4 pb-32 md:max-w-3xl md:px-8 lg:max-w-6xl lg:px-10 lg:pb-16`}>
      {/* Header: where am I, how far am I */}
      <div className="mt-4 flex items-center justify-between gap-4 text-sm text-ink-3 lg:mt-8">
        <button onClick={back} className="hover:text-ink">
          ← Zurück
        </button>
        <div className="hidden min-w-0 flex-1 truncate text-center font-semibold text-ink-2 md:block">{primer.title}</div>
        <Link to="/eule" className="hover:text-ink">
          Alle Eulen-Lektionen
        </Link>
      </div>
      <div className="mt-3 flex items-center gap-3" aria-hidden>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
          <div className="accent-gradient h-full rounded-full transition-[width] duration-300" style={{ width: `${Math.round((doneUnits / units) * 100)}%` }} />
        </div>
        <span className="w-14 text-right text-xs font-semibold uppercase tracking-wide text-ink-3">{stage}</span>
      </div>

      <div className="mt-6 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1.75fr)_minmax(19rem,1fr)] lg:items-stretch lg:gap-12">
      {/* The chalkboard */}
      <div className="chalkboard" aria-live="polite">
        <div key={boardKey} className={`chalk ${wiping ? "chalk-out" : "chalk-in"}`}>
          {pos.phase === "intro" && (
            <>
              <div className="chalk-small">{OWL_NAME} erklärt {alreadyDone && "· ✓ schon gemacht"}</div>
              <h1 className="chalk-title mt-1">{primer.title}</h1>
              <MathText text={primer.teaser} />
              {hasChapters && (
                <ol className="mt-4 grid gap-1">
                  {chapters.map((c, ci) => (
                    <li key={ci} data-chapter={ci}>
                      <span className="chalk-small mr-2">{savedStep > c.end ? "✓" : `${ci + 1}.`}</span>
                      {c.title}
                      {savedStep > 0 && ci === chapterOf(savedStep) && <span className="chalk-small ml-2">· hier warst du</span>}
                    </li>
                  ))}
                </ol>
              )}
              <p className="chalk-small mt-6">
                {hasChapters && `${chapters.length} Kapitel · `}
                {total} Tafeln · {primer.vocab.length} Wörter · {quiz.length} Fragen
              </p>
            </>
          )}

          {pos.phase === "pause" && (
            <>
              <div className="chalk-small">Kapitel {chapterIdx} von {chapters.length} geschafft</div>
              <h2 className="chalk-title mt-1">Zeit für eine Pause?</h2>
              <ol className="mt-2 grid gap-1">
                {chapters.map((c, ci) => (
                  <li key={ci} data-chapter={ci}>
                    <span className="chalk-small mr-2">{ci < chapterIdx ? "✓" : `${ci + 1}.`}</span>
                    {ci === chapterIdx ? <strong>{c.title}</strong> : c.title}
                    {ci === chapterIdx && <span className="chalk-small ml-2">· kommt jetzt</span>}
                  </li>
                ))}
              </ol>
            </>
          )}

          {pos.phase === "steps" && stepData && (
            <>
              <h2 className="chalk-title">{stepData.title}</h2>
              <MathText text={stepData.body} />
              {stepFigure && <div className="chalk-board-figure mt-3 flex justify-center" dangerouslySetInnerHTML={{ __html: stepFigure }} />}
              {tasks.length > 0 && (
                <ol className="mt-3 grid gap-4">
                  {tasks.map((t, ti) => {
                    const [before, after] = t.text.split("___");
                    const done = !!solved[ti];
                    return (
                      <li key={ti} data-task={ti}>
                        <div>
                          <span className="chalk-small mr-2">({ti + 1})</span>
                          <MathText inline text={before ?? ""} />
                          {done ? (
                            <strong>
                              <MathText inline text={t.correct} />
                            </strong>
                          ) : (
                            <span className="chalk-gap" aria-label="Lücke" />
                          )}
                          <MathText inline text={after ?? ""} />
                          {done && <span className="ml-2">✓</span>}
                        </div>
                        {!done && (
                          <div className="mt-1.5 flex flex-wrap gap-2">
                            {t.choices.map((c) => {
                              const wrong = (tried[ti] ?? []).includes(c);
                              return (
                                <button key={c} type="button" disabled={wrong} data-state={wrong ? "wrong" : undefined} onClick={() => pickTask(ti, c)} className="chalk-box chalk-chip">
                                  <MathText inline text={c} />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
              <div className="chalk-small mt-5 text-right">
                {hasChapters && `Kapitel ${chapterIdx + 1} von ${chapters.length} · `}
                Tafel {pos.step + 1} von {total}
              </div>
            </>
          )}

          {pos.phase === "vocab" && (
            <>
              <h2 className="chalk-title">Die Wörter</h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5">
                {primer.vocab.map((v, i) => (
                  <div key={i} className="contents">
                    <dt>
                      <strong>{v.term}</strong>
                    </dt>
                    <dd>
                      <MathText text={v.plain} />
                      {v.example && <MathText text={v.example} className="chalk-small" />}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {pos.phase === "quiz" && current && (
            <>
              <div className="chalk-small">
                Frage {pos.qi + 1} von {quiz.length} · {score} richtig
              </div>
              <MathText text={current.prompt} className="chalk-title mt-1" />
              <div className="mt-2 grid gap-2.5">
                {quizChoices.map((c, i) => {
                  const isCorrect = c === current.correct;
                  const stateAttr = picked === null ? undefined : isCorrect ? "right" : picked === c ? "wrong" : "dim";
                  return (
                    <button key={i} type="button" disabled={picked !== null} onClick={() => pick(c)} data-state={stateAttr} className="chalk-box flex items-center gap-3 px-4 py-2.5 text-left">
                      <span className="chalk-small w-6 shrink-0">{i + 1}.</span>
                      <MathText text={c} />
                      {stateAttr === "right" && <span className="ml-auto">✓</span>}
                      {stateAttr === "wrong" && <span className="ml-auto">✗</span>}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {pos.phase === "done" && (
            <div className="text-center">
              <div className="chalk-title inline-block">{passed ? "Geschafft!" : "Fast!"}</div>
              <div className="mt-2 text-6xl">{passed ? "✓" : "↻"}</div>
              <p className="mt-2">
                {score} von {quiz.length} richtig
              </p>
            </div>
          )}
        </div>
        <div className="chalk-tray" aria-hidden />
      </div>

      {/* Ferdinand next to the board (wide screens) or under it (phones) */}
      <aside className="mt-14 flex flex-col lg:mt-0 lg:py-3">
        <div className="flex items-start gap-4 lg:flex-col lg:gap-5">
          <OwlAvatar size={72} className="mt-1 lg:mt-0" />
          <div className="relative flex-1 rounded-2xl rounded-tl-sm border border-yellow/40 bg-yellow-soft px-5 py-4 text-[1.05rem] leading-relaxed anim-pop lg:w-full lg:flex-none lg:px-6 lg:py-5 lg:text-lg" key={`${boardKey}-${picked ?? ""}-${taskSay ?? ""}`}>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-3">{OWL_NAME}</div>
            <MathText text={says} />
          </div>
        </div>
        {/* Controls, wide screens: anchored at the foot of Ferdinand's column */}
        <div className="mt-auto hidden items-center gap-3 pt-10 lg:flex">{controls}</div>
      </aside>
      </div>

      {/* Controls, phones and small tablets: bottom bar within thumb reach */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg/85 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center gap-2 md:max-w-3xl md:px-5">{controls}</div>
      </div>
    </div>
  );
}
