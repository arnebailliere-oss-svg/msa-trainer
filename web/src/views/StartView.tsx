import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/app/state";
import { Button, Card } from "@/ui/primitives";

const EMOJIS = ["🦊", "🐼", "🦄", "🐯", "🐸", "🦖", "🐙", "🦁", "🐨", "🚀", "⚡", "🎯", "🎧", "🛹", "🍕", "🌈"];

export function StartView() {
  const { profiles, selectProfile, createProfile, deleteProfile } = useApp();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJIS[0]!);
  const [creating, setCreating] = useState(profiles.length === 0);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const submit = async () => {
    if (!name.trim()) return;
    await createProfile(name, emoji);
    nav("/home");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <div className="mb-10 text-center anim-pop">
        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-3xl bg-linear-to-br from-brand to-brand-2 text-4xl shadow-[0_20px_60px_-20px_var(--brand)]">🎓</div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          MSA <span className="gradient-text">Trainer</span>
        </h1>
        <p className="mt-2 text-ink-2">Mathe, Deutsch, Englisch — bis es sitzt.</p>
      </div>

      {profiles.length > 0 && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {profiles.map((p) => (
            <div key={p.id} className="glass flex items-center gap-4 p-4 anim-pop">
              <button
                onClick={async () => {
                  await selectProfile(p.id);
                  nav("/home");
                }}
                className="flex flex-1 items-center gap-4 text-left"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 text-3xl">{p.emoji}</span>
                <span>
                  <span className="block text-xl font-bold">{p.name}</span>
                  <span className="text-sm text-ink-3">Weiter lernen →</span>
                </span>
              </button>
              {confirmDelete === p.id ? (
                <div className="flex gap-1">
                  <Button size="sm" variant="danger" onClick={() => deleteProfile(p.id)}>
                    Löschen
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(null)}>
                    Nein
                  </Button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(p.id)} className="text-ink-3 hover:text-red text-sm" aria-label={`Profil ${p.name} löschen`}>
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {creating ? (
        <Card solid className="anim-pop">
          <h2 className="mb-4 text-xl font-bold">Neues Profil</h2>
          <label className="mb-2 block text-sm font-semibold text-ink-2">Dein Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="z. B. Lea"
            maxLength={24}
            autoFocus
            className="mb-4 w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-lg outline-none focus:border-brand-2"
          />
          <label className="mb-2 block text-sm font-semibold text-ink-2">Dein Avatar</label>
          <div className="mb-5 flex flex-wrap gap-2">
            {EMOJIS.map((e) => (
              <button key={e} onClick={() => setEmoji(e)} className={`grid h-12 w-12 place-items-center rounded-xl text-2xl transition-transform ${emoji === e ? "bg-linear-to-br from-brand to-brand-2 scale-110" : "bg-surface hover:bg-surface-2"}`} aria-label={e} aria-pressed={emoji === e}>
                {e}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="lg" onClick={submit} disabled={!name.trim()}>
              Los geht's
            </Button>
            {profiles.length > 0 && (
              <Button size="lg" variant="ghost" onClick={() => setCreating(false)}>
                Abbrechen
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <Button variant="ghost" full size="lg" onClick={() => setCreating(true)}>
          ＋ Neues Profil anlegen
        </Button>
      )}
      <p className="mt-8 text-center text-xs text-ink-3">Alles bleibt auf diesem Gerät gespeichert. Kein Konto, keine Cloud.</p>
    </div>
  );
}
