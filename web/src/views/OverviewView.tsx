import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { exportAll, importAll } from "@/app/db";
import { useApp } from "@/app/state";
import { ampelFor } from "@/core/mastery";
import type { Subject } from "@/core/types";
import { Ampel, Button, PageTitle, SUBJECT_LABEL } from "@/ui/primitives";

/** Parent / self overview: every topic with numbers, plus backup export/import. */
export function OverviewView() {
  const { content, profile, store, progressVersion, selectProfile } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  if (!content || !profile || !store) return null;
  void progressVersion;
  const attempts = store.attempts(profile.id, undefined, 100000);
  const total = attempts.length;
  const correct = attempts.filter((a) => a.isCorrect).length;

  const download = async () => {
    const json = await exportAll();
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `msa-trainer-sicherung-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const upload = async (file: File) => {
    try {
      const n = await importAll(await file.text());
      setMsg(`${n} Profil(e) importiert. Bitte Profil neu auswählen.`);
      await selectProfile(null);
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <div className="mt-4 text-sm text-ink-3">
        <Link to="/home" className="hover:text-ink">
          ← Übersicht
        </Link>
      </div>
      <PageTitle eyebrow={profile.name} title="Fortschritt im Detail" />
      <div className="mb-6 flex flex-wrap gap-3 text-sm">
        <div className="glass px-4 py-3">
          <div className="text-ink-3">Aufgaben gesamt</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="glass px-4 py-3">
          <div className="text-ink-3">Richtig</div>
          <div className="text-2xl font-bold">{total ? Math.round((correct / total) * 100) : 0} %</div>
        </div>
      </div>

      {(["MATH", "DE", "EN"] as Subject[]).map((s) => {
        const rows = content.practicableTopics(s).map((t) => ({ t, m: store.getMastery(profile.id, t.id) }));
        return (
          <section key={s} className="mb-8">
            <h2 className="mb-2 text-lg font-bold">{SUBJECT_LABEL[s]}</h2>
            <div className="glass overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wider text-ink-3">
                  <tr>
                    <th className="px-4 py-2">Thema</th>
                    <th className="px-2 py-2">Ampel</th>
                    <th className="px-2 py-2 text-right">Können</th>
                    <th className="px-2 py-2 text-right">Stabilität</th>
                    <th className="px-2 py-2 text-right">Versuche</th>
                    <th className="px-4 py-2 text-right">Zuletzt</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ t, m }) => (
                    <tr key={t.id} className="border-t border-line">
                      <td className="px-4 py-2 font-medium">
                        <Link to={`/topic/${t.id}`} className="hover:underline">
                          {t.name}
                        </Link>
                      </td>
                      <td className="px-2 py-2">
                        <Ampel state={ampelFor(m)} size={10} />
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">{Math.round((m?.masteryScore ?? 0) * 100)} %</td>
                      <td className="px-2 py-2 text-right tabular-nums">{Math.round((m?.stability ?? 0) * 100)} %</td>
                      <td className="px-2 py-2 text-right tabular-nums">{m?.attempts ?? 0}</td>
                      <td className="px-4 py-2 text-right text-ink-3">{m?.lastPracticedAt ? new Date(m.lastPracticedAt).toLocaleDateString("de-DE") : "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <section className="glass p-5">
        <h2 className="mb-1 text-lg font-bold">Sicherung</h2>
        <p className="mb-3 text-sm text-ink-2">Der Fortschritt liegt nur auf diesem Gerät. Exportiere ihn als Datei, um ihn zu sichern oder auf ein anderes Gerät zu übertragen.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={download}>
            ⬇︎ Exportieren
          </Button>
          <Button variant="ghost" onClick={() => fileRef.current?.click()}>
            ⬆︎ Importieren
          </Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </div>
        {msg && <p className="mt-3 text-sm text-brand-2">{msg}</p>}
      </section>
    </div>
  );
}
