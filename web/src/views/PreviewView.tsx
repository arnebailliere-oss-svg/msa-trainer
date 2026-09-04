import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "@/app/state";
import { evaluate } from "@/core/evaluators";
import { renderPreview } from "@/core/variants";
import { ExplanationBlocks } from "@/ui/Explanation";
import { MathText } from "@/ui/MathText";
import { Button, Chip, PageTitle } from "@/ui/primitives";
import { isAnswerReady, QuestionRenderer } from "@/ui/renderers";

/** Authoring/QA view: render any question by id, step through its variants, try answers. No progress is recorded. */
export function PreviewView() {
  const { id = "" } = useParams();
  const { content } = useApp();
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState<unknown>(null);
  const [result, setResult] = useState<ReturnType<typeof evaluate> | null>(null);
  const question = content?.questionById(id);
  const rendered = useMemo(() => (question ? renderPreview(question, i) : null), [question, i]);
  if (!content) return null;
  if (!question || !rendered) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xl font-semibold">Frage „{id}“ nicht gefunden.</p>
        <p className="mt-2 text-ink-2">Aufruf: <code>#/preview/&lt;question-id&gt;</code></p>
      </div>
    );
  }
  const topic = content.topicById(question.topicId);
  const go = (n: number) => {
    setI(n);
    setAnswer(null);
    setResult(null);
  };
  return (
    <div className={`subject-${question.subject} mx-auto max-w-3xl px-4 pb-24`}>
      <div className="mt-4 text-sm text-ink-3">
        <Link to="/home" className="hover:text-ink">← Übersicht</Link> · Vorschau (kein Fortschritt wird gespeichert)
      </div>
      <PageTitle eyebrow={topic?.name} title={<code className="text-2xl">{question.id}</code>} />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Chip>{question.qtype}</Chip>
        <Chip>Schwierigkeit {question.difficulty}</Chip>
        {question.variants?.enabled ? <Chip tone="brand">Variante #{i}</Chip> : <Chip>statisch</Chip>}
        {question.source && <span className="text-xs text-ink-3">{question.source}</span>}
        {question.variants?.enabled && (
          <span className="ml-auto flex gap-1">
            <Button size="sm" variant="ghost" onClick={() => go(Math.max(0, i - 1))}>←</Button>
            <Button size="sm" variant="ghost" onClick={() => go(i + 1)}>Nächste Variante →</Button>
          </span>
        )}
      </div>
      {Object.keys(rendered.vars).length > 0 && (
        <div className="mb-3 rounded-xl bg-surface px-3 py-2 font-mono text-xs text-ink-2">{JSON.stringify(rendered.vars)}</div>
      )}
      {rendered.passage && content.passageById(rendered.passage) && (
        <details open className="mb-3 rounded-2xl border border-line bg-surface px-4 py-3">
          <summary className="cursor-pointer select-none text-sm font-bold uppercase tracking-wide text-ink-2">📄 {content.passageById(rendered.passage)!.title}</summary>
          <MathText text={content.passageById(rendered.passage)!.body} className="mt-2 text-[1.02rem] leading-relaxed" />
        </details>
      )}
      <div className="card-solid p-5 sm:p-7">
        <MathText text={rendered.prompt} className="text-xl leading-relaxed sm:text-2xl" />
        {rendered.figure && <div className="mt-4 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: rendered.figure }} />}
        <div className="mt-6">
          <QuestionRenderer
            question={rendered}
            answer={answer}
            onChange={setAnswer}
            onSubmit={() => isAnswerReady(rendered, answer) && setResult(evaluate(rendered, answer))}
            locked={!!result}
            feedback={result ? { isCorrect: result.isCorrect, correctAnswer: result.correctAnswer } : null}
          />
        </div>
        <div className="mt-4 flex gap-2">
          {!result ? (
            <Button variant="accent" onClick={() => setResult(evaluate(rendered, answer))} disabled={!isAnswerReady(rendered, answer)}>Antwort prüfen</Button>
          ) : (
            <Button variant="ghost" onClick={() => go(i)}>Zurücksetzen</Button>
          )}
        </div>
        {result && (
          <div className={`mt-3 rounded-xl px-3 py-2 text-sm ${result.isCorrect ? "bg-green-soft" : "bg-red-soft"}`}>
            {result.isCorrect ? "Richtig" : `Falsch — richtig wäre: ${result.correctAnswerText}`}
            {result.hint && <div className="text-ink-2">{result.hint}</div>}
          </div>
        )}
      </div>
      <h2 className="mt-6 mb-2 text-sm font-bold uppercase tracking-wider text-ink-3">Erklärung</h2>
      <ExplanationBlocks sections={rendered.explanation} />
      <h2 className="mt-6 mb-2 text-sm font-bold uppercase tracking-wider text-ink-3">Lösung (intern)</h2>
      <pre className="overflow-x-auto rounded-xl bg-surface p-3 text-xs">{JSON.stringify(rendered.solution)}</pre>
    </div>
  );
}
