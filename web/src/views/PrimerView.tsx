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

type Phase = "intro" | "steps" | "vocab" | "quiz" | "done";
const PASS_RATIO = 0.8;
const WIPE_MS = 280;

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
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wiping, setWiping] = useState(false);
  const wipeTimer = useRef<number | null>(null);

  useEffect(() => {
    setPos({ phase: "intro", step: 0, qi: 0 });
    setPicked(null);
    setScore(0);
    setWiping(false);
    window.scrollTo({ top: 0 });
  }, [id]);
  useEffect(() => () => {
    if (wipeTimer.current) window.clearTimeout(wipeTimer.current);
  }, []);

  const quiz = primer?.quiz ?? [];
  const passed = quiz.length > 0 && score >= Math.ceil(quiz.length * PASS_RATIO);
  const alreadyDone = !!(profile && store && primer && store.primerDone(profile.id, primer.id));

  useEffect(() => {
    if (pos.phase === "done" && passed && profile && store && primer && !store.primerDone(profile.id, primer.id)) {
      store.markPrimerDone(profile.id, primer.id);
      notifyProgress();
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
    if (phase === "intro") go({ phase: "steps", step: 0, qi: 0 });
    else if (phase === "steps") {
      if (step + 1 < primer.steps.length) go({ phase: "steps", step: step + 1, qi: 0 });
      else go({ phase: primer.vocab.length ? "vocab" : "quiz", step, qi: 0 });
    } else if (phase === "vocab") go({ phase: "quiz", step, qi: 0 });
    else if (phase === "quiz" && picked !== null) {
      if (qi + 1 < quiz.length) go({ phase: "quiz", step, qi: qi + 1 });
      else go({ phase: "done", step, qi });
    }
  }, [primer, pos, picked, quiz.length, go]);

  const backStep = useCallback(() => {
    if (pos.phase === "steps" && pos.step > 0) go({ ...pos, step: pos.step - 1 });
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
        const c = quiz[pos.qi]?.choices[Number(e.key) - 1];
        if (c !== undefined) pick(c);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advance, backStep, pos, picked, quiz]);

  const current = quiz[pos.qi];
  const pick = (c: string) => {
    if (picked !== null || !current) return;
    setPicked(c);
    if (c === current.correct) setScore((s) => s + 1);
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
  if (pos.phase === "intro") says = primer.hook;
  else if (pos.phase === "steps") says = stepData?.say ?? "Lies die Tafel in Ruhe. Dann klick auf Weiter.";
  else if (pos.phase === "vocab") says = "Das sind die Wörter, die du jetzt kennst. Lies sie einmal laut, dann sitzen sie.";
  else if (pos.phase === "quiz") says = picked === null ? "Kein Stress. Hier gibt es keine Noten. Tipp einfach auf die Antwort, die du für richtig hältst." : picked === current?.correct ? `**Genau!** ${current?.explain ?? ""}` : `**Nicht ganz.** ${current?.explain ?? ""}`;
  else says = passed ? (primer.outro ?? "Du kennst jetzt die Wörter und Zeichen. Damit macht die Lektion viel mehr Sinn, und die Aufgaben auch.") : "Das ist völlig normal. Wir gehen die Tafeln einfach noch einmal durch. Beim zweiten Mal klickt es meistens.";

  const nextLabel =
    pos.phase === "intro" ? "Los geht's →" : pos.phase === "steps" ? (pos.step + 1 === total ? (primer.vocab.length ? "Zu den Wörtern →" : "Zum Quiz →") : "Weiter →") : pos.phase === "vocab" ? "Zum Quiz →" : pos.qi + 1 === quiz.length ? "Auswertung →" : "Nächste Frage →";

  return (
    <div className={`subject-${primer.subject} mx-auto max-w-2xl px-4 pb-32`}>
      <div className="mt-4 flex items-center justify-between text-sm text-ink-3">
        <button onClick={back} className="hover:text-ink">
          ← Zurück
        </button>
        <Link to="/eule" className="hover:text-ink">
          Alle Eulen-Lektionen
        </Link>
      </div>

      {/* The chalkboard */}
      <div className="chalkboard mt-5" aria-live="polite">
        <div key={boardKey} className={`chalk ${wiping ? "chalk-out" : "chalk-in"}`}>
          {pos.phase === "intro" && (
            <>
              <div className="chalk-small">{OWL_NAME} erklärt {alreadyDone && "· ✓ schon gemacht"}</div>
              <h1 className="chalk-title mt-1">{primer.title}</h1>
              <MathText text={primer.teaser} />
              <p className="chalk-small mt-6">
                {total} Tafeln · {primer.vocab.length} Wörter · {quiz.length} Fragen
              </p>
            </>
          )}

          {pos.phase === "steps" && stepData && (
            <>
              <h2 className="chalk-title">{stepData.title}</h2>
              <MathText text={stepData.body} />
              {stepFigure && <div className="chalk-board-figure mt-3 flex justify-center" dangerouslySetInnerHTML={{ __html: stepFigure }} />}
              <div className="chalk-small mt-5 text-right">
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
                {current.choices.map((c, i) => {
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

      {/* Ferdinand in front of the board */}
      <div className="mt-4 flex items-start gap-3">
        <OwlAvatar size={64} className="mt-1" />
        <div className="relative flex-1 rounded-2xl rounded-tl-sm border border-yellow/40 bg-yellow-soft px-4 py-3 leading-relaxed anim-pop" key={`${boardKey}-${picked ?? ""}`}>
          <div className="text-xs font-bold uppercase tracking-wide text-ink-3">{OWL_NAME}</div>
          <MathText text={says} />
        </div>
      </div>

      {/* Controls */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg/85 p-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          {pos.phase === "steps" && (
            <Button variant="ghost" onClick={backStep} disabled={pos.step === 0}>
              ←
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
              {nextLabel} <span className="text-xs font-normal opacity-70">(Enter)</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
