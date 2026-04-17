"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { COURSE } from "@/lib/course";
import { initPyodide } from "@/lib/pyodide";
import { clearState, loadState, saveState } from "@/lib/storage";
import { emptyDayProgress } from "@/lib/types";
import type { AppState, DayProgress } from "@/lib/types";
import Sidebar from "./Sidebar";
import DayIntro from "./DayIntro";
import LessonFlow from "./LessonFlow";
import NotesPanel from "./NotesPanel";
import LoadingOverlay from "./LoadingOverlay";
import { useLocale } from "@/lib/locale-context";
import { tr } from "@/lib/i18n";

const DEFAULT_STATE: AppState = { currentDay: 1, progress: {} };

type View = "intro" | "lesson";

export default function App() {
  const { locale, t } = useLocale();
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [pyReady, setPyReady] = useState(false);
  const [pyError, setPyError] = useState<string | null>(null);
  const [view, setView] = useState<View>("intro");
  const [notesOpen, setNotesOpen] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
  }, [state, hydrated]);

  useEffect(() => {
    let cancelled = false;
    initPyodide()
      .then(() => {
        if (!cancelled) setPyReady(true);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          setPyError(t("pythonConnError"));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const currentDay = useMemo(
    () => COURSE.find((d) => d.id === state.currentDay) ?? COURSE[0],
    [state.currentDay],
  );

  const currentProgress = useMemo<DayProgress>(
    () => state.progress[currentDay.id] ?? emptyDayProgress(),
    [state.progress, currentDay.id],
  );

  const updateDayProgress = useCallback(
    (dayId: number, updater: (p: DayProgress) => DayProgress) => {
      setState((s) => {
        const existing = s.progress[dayId] ?? emptyDayProgress();
        const next = updater(existing);
        return { ...s, progress: { ...s.progress, [dayId]: next } };
      });
    },
    [],
  );

  const handleSelectDay = useCallback((id: number) => {
    setState((s) => ({ ...s, currentDay: id }));
    setView("intro");
    setNotesOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleStartFresh = useCallback(() => {
    updateDayProgress(currentDay.id, () => ({
      ...emptyDayProgress(),
      started: true,
      notes: currentProgress.notes,
    }));
    setView("lesson");
  }, [currentDay.id, currentProgress.notes, updateDayProgress]);

  const handleResume = useCallback(() => {
    updateDayProgress(currentDay.id, (p) => ({ ...p, started: true }));
    setView("lesson");
  }, [currentDay.id, updateDayProgress]);

  const handleReset = useCallback(() => {
    if (!confirm(t("confirmReset"))) return;
    clearState();
    setState(DEFAULT_STATE);
    setView("intro");
  }, [t]);

  const handleNotesChange = useCallback(
    (notes: string) => {
      updateDayProgress(currentDay.id, (p) => ({ ...p, notes }));
    },
    [currentDay.id, updateDayProgress],
  );

  return (
    <>
      <div className="grid md:grid-cols-[280px_1fr] min-h-screen">
        <Sidebar
          course={COURSE}
          currentDay={state.currentDay}
          state={state}
          onSelect={handleSelectDay}
          onReset={handleReset}
        />
        <main className="bg-bg min-w-0">
          {view === "intro" ? (
            <DayIntro
              day={currentDay}
              progress={currentProgress}
              onStart={handleStartFresh}
              onResume={handleResume}
            />
          ) : (
            <LessonFlow
              day={currentDay}
              progress={currentProgress}
              pyReady={pyReady}
              onProgressChange={(updater) => updateDayProgress(currentDay.id, updater)}
              onOpenNotes={() => setNotesOpen(true)}
              onBackToIntro={() => setView("intro")}
            />
          )}
        </main>
      </div>

      <NotesPanel
        open={notesOpen}
        notes={currentProgress.notes}
        dayTitle={`${t("dayOf", { n: currentDay.id })} — ${tr(currentDay.title, locale)}`}
        onChange={handleNotesChange}
        onClose={() => setNotesOpen(false)}
      />

      <LoadingOverlay
        visible={!pyReady && !pyError}
        title={t("loadingPython")}
        subtitle={t("pyodideSize")}
      />
      <LoadingOverlay visible={Boolean(pyError)} title={t("failedLoadPython")} subtitle={pyError ?? ""} />
    </>
  );
}
