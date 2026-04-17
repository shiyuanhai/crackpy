"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { COURSE } from "@/lib/course";
import { initPyodide } from "@/lib/pyodide";
import { clearState, loadState, saveState } from "@/lib/storage";
import type { AppState } from "@/lib/types";
import Sidebar from "./Sidebar";
import DayView from "./DayView";
import LoadingOverlay from "./LoadingOverlay";

const DEFAULT_STATE: AppState = { currentDay: 1, progress: {}, savedCode: {} };

export default function App() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [pyReady, setPyReady] = useState(false);
  const [pyError, setPyError] = useState<string | null>(null);

  // Load state from localStorage after mount (SSR-safe)
  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  // Persist state whenever it changes (but not during initial hydration)
  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
  }, [state, hydrated]);

  // Initialize Pyodide
  useEffect(() => {
    let cancelled = false;
    initPyodide()
      .then(() => {
        if (!cancelled) setPyReady(true);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          setPyError("Failed to load Python runtime. Check your connection and refresh.");
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

  const currentProgress = useMemo(
    () => state.progress[currentDay.id] ?? { solved: [] },
    [state.progress, currentDay.id],
  );

  const handleSelectDay = useCallback((id: number) => {
    setState((s) => ({ ...s, currentDay: id }));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleCodeChange = useCallback((problemId: string, code: string) => {
    setState((s) => ({ ...s, savedCode: { ...s.savedCode, [problemId]: code } }));
  }, []);

  const handleSolved = useCallback((problemId: string) => {
    setState((s) => {
      const day = COURSE.find((d) => d.problems.some((p) => p.id === problemId));
      if (!day) return s;
      const existing = s.progress[day.id] ?? { solved: [] };
      if (existing.solved.includes(problemId)) return s;
      return {
        ...s,
        progress: {
          ...s.progress,
          [day.id]: { solved: [...existing.solved, problemId] },
        },
      };
    });
  }, []);

  const handleReset = useCallback(() => {
    if (!confirm("Reset ALL progress, saved code, and completed days? This cannot be undone.")) return;
    clearState();
    setState(DEFAULT_STATE);
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-[300px_1fr] min-h-screen">
        <Sidebar
          course={COURSE}
          currentDay={state.currentDay}
          state={state}
          onSelect={handleSelectDay}
          onReset={handleReset}
        />
        <DayView
          day={currentDay}
          progress={currentProgress}
          savedCode={state.savedCode}
          pyReady={pyReady}
          onCodeChange={handleCodeChange}
          onSolved={handleSolved}
        />
      </div>

      <LoadingOverlay
        visible={!pyReady && !pyError}
        title="Loading Python runtime..."
        subtitle="Downloading Pyodide (~6MB). First load only."
      />
      <LoadingOverlay visible={Boolean(pyError)} title="Failed to load Python" subtitle={pyError ?? ""} />
    </>
  );
}
