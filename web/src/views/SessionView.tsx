import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApp } from "@/app/state";
import { formatNumber } from "@/core/format";
import { SessionController } from "@/core/session";
import type { AttemptResult, RenderedQuestion, Subject, TrainingMode } from "@/core/types";
import { Calculator } from "@/ui/Calculator";
import { ExplanationBlocks } from "@/ui/Explanation";
import { FormulaSheetDrawer } from "@/ui/FormulaSheet";
import { MathText } from "@/ui/MathText";
import { Button, Chip, ProgressBar, SUBJECT_LABEL } from "@/ui/primitives";
import { isAnswerReady, QuestionRenderer } from "@/ui/renderers";

const MODE_LABEL: Record<TrainingMode, string> = { QUICK: "Schnelltraining", TOPIC: "Thema üben", ERRORS: "Fehler-Training", MSA: "Prüfungs-Modus" };
const COUNT: Record<TrainingMode, number> = { QUICK: 10, TOPIC: 8, ERRORS: 10, MSA: 10 };
const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function SessionView() {
  const params = useParams();
  const mode = (params.mode as TrainingMode) ?? "QUICK";
  const subject = (params.subject as Subject) ?? "MATH";
  const topicId = params.topicId;
  const { content, profile, store, notifyProgress, flush } = useApp();
  const nav = useNavigate();

  const ctrl = useRef<SessionController | null>(null);
  const [question, setQuestion] = useState<RenderedQuestion | null>(null);
  const [answer, setAnswer] = useState<unknown>(null);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [showCalc, setShowCalc] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [empty, setEmpty] = useState(false);
  const startedAt = useRef(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!content || !profile || !store) return;
    const c = new SessionController({ userId: profile.id, subject, mode, topicId, questionCount: COUNT[mode], index: content, store });
    ctrl.current = c;
    startedAt.current = Date.now();
    setElapsed(0);
    const q = c.start();
    setQuestion(q);
    setAnswer(null);
    setResult(null);
    setEmpty(!q);
  }, [content, profile, store, subject, mode, topicId]);

  const finish = useCallback(async () => {
    const c = ctrl.current;
    if (!c) return;
    const stats = c.finish();
    await flush();
    nav("/result", { state: { stats, subject, mode, topicId }, replace: true });
  }, [flush, nav, subject, mode, topicId]);

  const submit = useCallback(() => {
    const c = ctrl.current;
    if (!c || !question || result || !isAnswerReady(question, answer)) return;
    const r = c.submit(answer);
    setResult(r);
    notifyProgress();
  }, [question, answer, result, notifyProgress]);

  const next = useCallback(() => {
    const c = ctrl.current;
    if (!c) return;
    const q = c.next();
    if (!q) {
      void finish();
      return;
    }
    setQuestion(q);
    setAnswer(null);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [finish]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (result) {
        e.preventDefault();
        next();
      } else if (question && question.qtype !== "SHORT" && isAnswerReady(question, answer)) {
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result, next, submit, question, answer]);

  // Exam mode: visible stopwatch, like the real Prüfung.
  useEffect(() => {
    if (mode !== "MSA") return;
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt.current) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, [mode]);

  const topic = useMemo(() => (question && content ? content.topicById(question.topicId) : undefined), [question, content]);
  const lesson = useMemo(() => (question && content ? content.lessonFor(question.topicId) : undefined), [question, content]);

  if (!content || !profile) return null;
  const c = ctrl.current;
  if (empty || !question || !c) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-xl font-semibold">Hier gibt es noch keine Aufgaben.</p>
        <Button className="mt-6" onClick={() => nav("/home")}>
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }
  const progress = c.progress;
  const repair = c.repairQueue;
  const ready = isAnswerReady(question, answer);
  // Teil 1 of the real exam (Basisaufgaben) is hilfsmittelfrei: no calculator.
  const noCalc = mode === "MSA" && (question.tags ?? []).includes("basisaufgabe");

  return (
    <div className={`subject-${subject} mx-auto max-w-3xl px-4 pb-32`}>
      {/* Header */}
      <div className="sticky top-0 z-10 -mx-4 bg-bg/80 px-4 pt-3 pb-2 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <button onClick={finish} className="text-sm text-ink-3 hover:text-ink">
            ✕ Beenden
          </button>
          <div className="text-sm font-semibold text-ink-2">
            {MODE_LABEL[mode]} · {SUBJECT_LABEL[subject]}
          </div>
          <div className="text-sm tabular-nums text-ink-3">
            {mode === "MSA" && (
              <span className="mr-3" aria-label="Verstrichene Zeit">
                ⏱ {fmtTime(elapsed)}
              </span>
            )}
            {progress.answered + (result ? 0 : 1)}/{progress.total}
          </div>
        </div>
        <ProgressBar value={progress.answered} max={progress.total} className="mt-2" tone="accent" />
      </div>

      {repair && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-yellow-soft px-4 py-3 text-sm anim-pop">
          <span className="text-xl">🩹</span>
          <div>
            <strong>Reparatur-Modus.</strong>{" "}
            {repair.sameTopicRemaining > 0 ? `Noch ${repair.sameTopicRemaining} leichtere Aufgabe${repair.sameTopicRemaining > 1 ? "n" : ""} zum Thema, dann eine Transferaufgabe.` : "Jetzt die Transferaufgabe — richtig gelöst, und du bist wieder raus."}
          </div>
        </div>
      )}

      {/* Question */}
      <div key={question.variantId} className="mt-4 anim-pop">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {topic && <Chip>{topic.name}</Chip>}
          <span className="flex items-center gap-0.5" title={`Schwierigkeit ${question.difficulty} von 5`} aria-label={`Schwierigkeit ${question.difficulty} von 5`}>
            {[1, 2, 3, 4, 5].map((d) => (
              <span key={d} className={`h-1.5 w-3 rounded-full ${d <= question.difficulty ? "accent-gradient" : "bg-surface-2"}`} />
            ))}
          </span>
          {question.source && <span className="text-xs text-ink-3">{question.source}</span>}
          {noCalc && <Chip tone="yellow">🚫🧮 ohne Taschenrechner</Chip>}
        </div>
        <div className="card-solid p-5 sm:p-7">
          <MathText text={question.prompt} className="text-xl leading-relaxed sm:text-2xl" />
          {question.figure && <div className="mt-4 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: question.figure }} />}
          <div className="mt-6">
            <QuestionRenderer question={question} answer={answer} onChange={setAnswer} onSubmit={submit} locked={!!result} feedback={result ? { isCorrect: result.isCorrect, correctAnswer: result.correctAnswer } : null} />
          </div>
        </div>
      </div>

      {/* Feedback */}
      {result && (
        <div className="mt-4 anim-pop">
          <div className={`flex items-start gap-3 rounded-2xl px-4 py-4 ${result.isCorrect ? "bg-green-soft" : "bg-red-soft"}`}>
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl ${result.isCorrect ? "bg-green text-[#062b1c] anim-pulse-ring" : "bg-red text-white"}`}>{result.isCorrect ? "✓" : "✗"}</span>
            <div className="flex-1">
              <div className="text-lg font-bold">{result.isCorrect ? "Richtig!" : "Leider nicht richtig."}</div>
              {!result.isCorrect && (
                <div className="text-ink-2">
                  Richtige Antwort: <strong className="text-ink whitespace-pre-line">{result.correctAnswerText}</strong>
                </div>
              )}
              {result.hint && <div className="mt-1 text-sm text-ink-2">💬 {result.hint}</div>}
              <div className="mt-1 text-sm text-ink-3">
                Können in „{topic?.name}“: {formatNumber(result.newMasteryScore * 100, 0)} %{" "}
                <span className={result.masteryDelta >= 0 ? "text-green" : "text-red"}>
                  ({result.masteryDelta >= 0 ? "+" : ""}
                  {formatNumber(result.masteryDelta * 100, 0)})
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ExplanationBlocks sections={result.explanation} />
          </div>
          {lesson && (
            <Link to={`/topic/${question.topicId}`} className="mt-3 inline-block text-sm font-semibold text-brand-2 hover:underline">
              📘 Lektion „{lesson.title}“ ansehen
            </Link>
          )}
        </div>
      )}

      {/* Action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg/85 p-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          {subject === "MATH" && (
            <>
              <Button variant="ghost" onClick={() => setShowCalc((v) => !v)} aria-pressed={showCalc} aria-label="Taschenrechner" disabled={noCalc} title={noCalc ? "Basisaufgabe: ohne Taschenrechner" : undefined}>
                🧮
              </Button>
              <Button variant="ghost" onClick={() => setShowFormulas(true)} aria-label="Formelblatt">
                📐
              </Button>
            </>
          )}
          {result ? (
            <Button variant="accent" size="lg" full onClick={next}>
              Weiter → <span className="text-xs font-normal opacity-70">(Enter)</span>
            </Button>
          ) : (
            <Button variant="accent" size="lg" full onClick={submit} disabled={!ready}>
              Antwort prüfen
            </Button>
          )}
        </div>
      </div>
      {showCalc && !noCalc && (
        <div className="fixed bottom-20 right-3 z-30 anim-pop">
          <Calculator onClose={() => setShowCalc(false)} />
        </div>
      )}
      {showFormulas && <FormulaSheetDrawer onClose={() => setShowFormulas(false)} />}
    </div>
  );
}
