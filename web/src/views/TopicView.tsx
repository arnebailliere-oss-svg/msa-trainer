import { Link, useNavigate, useParams } from "react-router-dom";
import { useApp } from "@/app/state";
import { LEVEL_LABEL } from "@/core/levels";
import { ampelFor, levelFromMastery } from "@/core/mastery";
import { ExplanationBlocks } from "@/ui/Explanation";
import { MathText } from "@/ui/MathText";
import { AskOwl, OWL_NAME, OwlAvatar } from "@/ui/Owl";
import { Ampel, Button, Chip, PageTitle, Ring } from "@/ui/primitives";

/** Topic page: lesson (if any) + practice entry point. */
export function TopicView() {
  const { id = "" } = useParams();
  const { content, profile, store } = useApp();
  const nav = useNavigate();
  if (!content || !profile || !store) return null;
  const topic = content.topicById(id);
  if (!topic) return <p className="p-6">Thema nicht gefunden.</p>;
  const lesson = content.lessonFor(topic.id);
  const mastery = store.getMastery(profile.id, topic.id);
  const ampel = ampelFor(mastery);
  const level = levelFromMastery(mastery);
  const questions = content.questionsInSubtree(topic.id).length;
  const parent = topic.parentId ? content.topicById(topic.parentId) : undefined;

  return (
    <div className={`subject-${topic.subject} mx-auto max-w-3xl px-4 pb-28`}>
      <div className="mt-4 text-sm text-ink-3">
        <Link to="/home" className="hover:text-ink">
          ← Übersicht
        </Link>
        {parent && <span> / {parent.name}</span>}
      </div>
      <PageTitle
        title={topic.name}
        right={
          <Ring value={level / 4} size={64} color={`var(--${ampel.toLowerCase()})`}>
            <span className="text-sm font-bold">{level}/4</span>
          </Ring>
        }
      />
      <div className="mb-6 flex flex-wrap gap-2">
        <Chip tone={ampel === "RED" ? "red" : ampel === "YELLOW" ? "yellow" : "green"}>
          <Ampel state={ampel} size={8} /> {LEVEL_LABEL[level]}
        </Chip>
        {topic.priority === 3 && <Chip tone="brand">⭐ wichtig für die Prüfung</Chip>}
        <Chip>{questions} Aufgaben</Chip>
        {mastery && <Chip>{mastery.attempts} mal geübt</Chip>}
      </div>

      {lesson?.sheet ? (
        <>
          {/* Learning happens in the guided lessons; the page below is only for looking things up. */}
          <section className="mb-8 anim-pop">
            <h2 className="mb-1 text-2xl font-bold">Lernen mit {OWL_NAME}</h2>
            <p className="mb-4 text-ink-2">Schritt für Schritt, mit Übungen auf den Tafeln. Fang oben an und lass dir Zeit.</p>
            <ol className="grid gap-3">
              {(lesson.guided ?? []).map((pid, i) => {
                const p = content.primerById(pid);
                if (!p) return null;
                const done = store.primerDone(profile.id, pid);
                const at = store.primerPos(profile.id, pid);
                const chapters = p.steps.filter((s, si) => s.chapter || si === 0).length;
                return (
                  <li key={pid}>
                    <Link to={`/eule/${pid}`} state={{ from: `/topic/${topic.id}` }} data-guided={pid} className="card-solid flex items-center gap-4 p-4 transition hover:-translate-y-0.5">
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-extrabold ${done ? "bg-green text-[#062b1c]" : "accent-gradient text-white"}`}>{done ? "✓" : i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-lg font-bold leading-snug">{p.title}</div>
                        <div className="mt-0.5 text-sm text-ink-2">{p.teaser}</div>
                        <div className="mt-1 text-xs text-ink-3">
                          {chapters > 1 ? `${chapters} Kapitel · ` : ""}
                          {p.steps.length} Tafeln
                          {done ? <span className="font-semibold text-green"> · geschafft</span> : at > 0 ? <span className="font-semibold text-ink-2"> · angefangen, du kannst weitermachen</span> : null}
                        </div>
                      </div>
                      <OwlAvatar size={40} />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
          <article className="anim-pop">
            <div className="text-xs font-bold uppercase tracking-wide text-ink-3">Spickzettel zum Nachschlagen</div>
            <h2 className="mb-1 text-2xl font-bold">{lesson.title}</h2>
            {lesson.intro && <MathText text={lesson.intro} className="mb-4 text-ink-2" />}
            <ExplanationBlocks sections={lesson.sections} collapsible />
            {lesson.source && <p className="mt-3 text-xs text-ink-3">Quelle: {lesson.source}</p>}
          </article>
        </>
      ) : lesson ? (
        <article className="anim-pop">
          <h2 className="mb-1 text-2xl font-bold">📘 {lesson.title}</h2>
          {lesson.intro && <MathText text={lesson.intro} className="mb-4 text-ink-2" />}
          {lesson.primer && <AskOwl primerId={lesson.primer} variant="card" />}
          <ExplanationBlocks sections={lesson.sections} />
          {lesson.source && <p className="mt-3 text-xs text-ink-3">Quelle: {lesson.source}</p>}
        </article>
      ) : (
        <div className="glass p-5 text-ink-2">Für dieses Thema gibt es noch keine Lektion — die Erklärungen bekommst du nach jeder Aufgabe.</div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg/80 p-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl gap-2">
          <Button variant="accent" size="lg" full onClick={() => nav(`/session/TOPIC/${topic.subject}/${topic.id}`)} disabled={questions === 0}>
            Jetzt üben →
          </Button>
        </div>
      </div>
    </div>
  );
}
