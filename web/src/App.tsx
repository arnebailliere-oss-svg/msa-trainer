import { useEffect, useState, type ReactNode } from "react";
import { HashRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./app/state";
import { Spinner } from "./ui/primitives";
import { DashboardView } from "./views/DashboardView";
import { OverviewView } from "./views/OverviewView";
import { PreviewView } from "./views/PreviewView";
import { FormulaView } from "./views/FormulaView";
import { HelpView } from "./views/HelpView";
import { PrimerIndexView } from "./views/PrimerIndexView";
import { PrimerView } from "./views/PrimerView";
import { ResultView } from "./views/ResultView";
import { SessionView } from "./views/SessionView";
import { StartView } from "./views/StartView";
import { TopicView } from "./views/TopicView";

type Theme = "system" | "dark" | "light";
const THEME_KEY = "msa:theme";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as Theme) || "system";
    } catch {
      return "system";
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") delete root.dataset.theme;
    else root.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "system" ? "dark" : t === "dark" ? "light" : "system"))];
}

function Header() {
  const { profile } = useApp();
  const [theme, cycle] = useTheme();
  const { pathname } = useLocation();
  const inSession = pathname.startsWith("/session");
  if (inSession) return null;
  return (
    // flex-wrap: five items must never force the mobile layout viewport wider than the screen.
    <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-y-1 px-4 pt-4">
      <Link to={profile ? "/home" : "/"} className="flex min-w-0 items-center gap-2 font-extrabold tracking-tight">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-brand to-brand-2 text-lg">🎓</span>
        <span>
          MSA <span className="gradient-text">Trainer</span>
        </span>
      </Link>
      <nav className="flex items-center gap-1 text-sm">
        {profile && (
          <>
            <Link to="/overview" className="rounded-xl px-3 py-2 text-ink-2 hover:bg-surface hover:text-ink">
              Fortschritt
            </Link>
            <Link to="/" className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-surface" title="Profil wechseln">
              <span className="text-lg">{profile.emoji}</span>
              <span className="hidden font-semibold sm:inline">{profile.name}</span>
            </Link>
          </>
        )}
        <Link to="/hilfe" className="rounded-xl px-2 py-2 text-ink-2 hover:bg-surface hover:text-ink sm:px-3" title="Hilfe: So funktioniert der MSA Trainer" aria-label="Hilfe">
          <span aria-hidden>❓</span>
          <span className="ml-1 hidden font-semibold sm:inline">Hilfe</span>
        </Link>
        <button onClick={cycle} className="rounded-xl px-3 py-2 text-ink-2 hover:bg-surface" title={`Design: ${theme}`} aria-label="Design wechseln">
          {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🌗"}
        </button>
      </nav>
    </header>
  );
}

function RequireProfile({ children }: { children: ReactNode }) {
  const { profile } = useApp();
  if (!profile) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function Shell() {
  const { content, contentError } = useApp();
  if (contentError)
    return (
      <div className="mx-auto max-w-lg p-8 text-center">
        <p className="text-xl font-bold">Inhalte konnten nicht geladen werden.</p>
        <p className="mt-2 text-ink-2">{contentError}</p>
      </div>
    );
  if (!content) return <Spinner label="Aufgaben werden geladen…" />;
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<StartView />} />
          <Route
            path="/home"
            element={
              <RequireProfile>
                <DashboardView />
              </RequireProfile>
            }
          />
          <Route
            path="/topic/:id"
            element={
              <RequireProfile>
                <TopicView />
              </RequireProfile>
            }
          />
          <Route
            path="/session/:mode/:subject/:topicId?"
            element={
              <RequireProfile>
                <SessionView />
              </RequireProfile>
            }
          />
          <Route
            path="/result"
            element={
              <RequireProfile>
                <ResultView />
              </RequireProfile>
            }
          />
          <Route
            path="/overview"
            element={
              <RequireProfile>
                <OverviewView />
              </RequireProfile>
            }
          />
          <Route
            path="/eule"
            element={
              <RequireProfile>
                <PrimerIndexView />
              </RequireProfile>
            }
          />
          <Route
            path="/eule/:id"
            element={
              <RequireProfile>
                <PrimerView />
              </RequireProfile>
            }
          />
          <Route path="/preview/:id" element={<PreviewView />} />
          <Route path="/formeln" element={<FormulaView />} />
          <Route path="/hilfe" element={<HelpView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </AppProvider>
  );
}
