"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, NotesIcon, CheckIcon, SparkleIcon } from "@/lib/icons";
import { useLocale } from "@/lib/locale-context";
import { tr } from "@/lib/i18n";
import type { Day, DayProgress, LessonStep } from "@/lib/types";
import TeachBubble from "./steps/TeachBubble";
import DemoBubble from "./steps/DemoBubble";
import ExerciseBubble from "./steps/ExerciseBubble";
import QuizMCBubble from "./steps/QuizMCBubble";
import QuizTextBubble from "./steps/QuizTextBubble";
import RecallBubble from "./steps/RecallBubble";
import CheckpointBubble from "./steps/CheckpointBubble";
import FinalTest from "./FinalTest";

interface Props {
  day: Day;
  progress: DayProgress;
  pyReady: boolean;
  onProgressChange: (updater: (p: DayProgress) => DayProgress) => void;
  onOpenNotes: () => void;
  onBackToIntro: () => void;
}

function requiresInteraction(step: LessonStep): boolean {
  return (
    step.kind === "demo" ||
    step.kind === "exercise" ||
    step.kind === "quiz_mc" ||
    step.kind === "quiz_text" ||
    step.kind === "recall"
  );
}

function isEditableTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if ((el as HTMLElement).isContentEditable) return true;
  // CodeMirror 6 editor content div
  if (el.classList.contains("cm-content")) return true;
  if (el.closest(".cm-editor")) return true;
  return false;
}

export default function LessonFlow({
  day,
  progress,
  pyReady,
  onProgressChange,
  onOpenNotes,
  onBackToIntro,
}: Props) {
  const { locale, t } = useLocale();
  const [continueLock, setContinueLock] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const autoScrolledRef = useRef(false);

  const stepIdx = Math.min(progress.stepIdx, day.steps.length);
  const visibleSteps = useMemo(() => day.steps.slice(0, stepIdx + 1), [day.steps, stepIdx]);
  const currentStep = day.steps[stepIdx];
  const pastEndOfLesson = stepIdx >= day.steps.length;
  const currentComplete = currentStep ? Boolean(progress.completed[currentStep.id]) : true;

  useEffect(() => {
    if (!autoScrolledRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
      autoScrolledRef.current = true;
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [stepIdx, progress.completed]);

  const setComplete = useCallback(
    (id: string) => {
      onProgressChange((p) => ({ ...p, completed: { ...p.completed, [id]: true } }));
    },
    [onProgressChange],
  );

  const setAnswer = useCallback(
    (id: string, value: string | number) => {
      onProgressChange((p) => ({ ...p, userAnswers: { ...p.userAnswers, [id]: value } }));
    },
    [onProgressChange],
  );

  const setUserCode = useCallback(
    (id: string, code: string) => {
      onProgressChange((p) => ({ ...p, userCode: { ...p.userCode, [id]: code } }));
    },
    [onProgressChange],
  );

  const incrementAttempt = useCallback(
    (id: string) => {
      onProgressChange((p) => ({
        ...p,
        attempts: { ...p.attempts, [id]: (p.attempts[id] ?? 0) + 1 },
      }));
    },
    [onProgressChange],
  );

  const advance = useCallback(() => {
    if (continueLock) return;
    if (pastEndOfLesson) return;
    if (currentStep && requiresInteraction(currentStep) && !progress.completed[currentStep.id]) {
      return;
    }
    setContinueLock(true);
    setTimeout(() => setContinueLock(false), 250);
    if (currentStep && !progress.completed[currentStep.id] && !requiresInteraction(currentStep)) {
      setComplete(currentStep.id);
    }
    onProgressChange((p) => ({ ...p, stepIdx: Math.min(p.stepIdx + 1, day.steps.length) }));
  }, [
    continueLock,
    pastEndOfLesson,
    currentStep,
    progress.completed,
    setComplete,
    onProgressChange,
    day.steps.length,
  ]);

  // Enter-to-continue when not focused in an input/textarea/code editor
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Enter") return;
      if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditableTarget(document.activeElement)) return;
      e.preventDefault();
      advance();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  function renderStep(step: LessonStep) {
    switch (step.kind) {
      case "teach":
        return <TeachBubble step={step} />;
      case "demo":
        return (
          <DemoBubble
            step={step}
            pyReady={pyReady}
            isComplete={Boolean(progress.completed[step.id])}
            savedCode={progress.userCode[step.id]}
            onCodeChange={(code) => setUserCode(step.id, code)}
            onComplete={() => setComplete(step.id)}
          />
        );
      case "exercise":
        return (
          <ExerciseBubble
            step={step}
            pyReady={pyReady}
            isActive={step.id === currentStep?.id}
            isComplete={Boolean(progress.completed[step.id])}
            attempts={progress.attempts[step.id] ?? 0}
            savedCode={progress.userCode[step.id]}
            onCodeChange={(code) => setUserCode(step.id, code)}
            onIncrementAttempt={() => incrementAttempt(step.id)}
            onComplete={() => setComplete(step.id)}
          />
        );
      case "quiz_mc": {
        const saved = progress.userAnswers[step.id];
        return (
          <QuizMCBubble
            step={step}
            selected={typeof saved === "number" ? saved : undefined}
            isComplete={Boolean(progress.completed[step.id])}
            onSelect={(i) => setAnswer(step.id, i)}
            onComplete={() => setComplete(step.id)}
          />
        );
      }
      case "quiz_text": {
        const saved = progress.userAnswers[step.id];
        return (
          <QuizTextBubble
            step={step}
            savedAnswer={typeof saved === "string" ? saved : undefined}
            isComplete={Boolean(progress.completed[step.id])}
            onAnswer={(v) => setAnswer(step.id, v)}
            onComplete={() => setComplete(step.id)}
          />
        );
      }
      case "recall": {
        const saved = progress.userAnswers[step.id];
        return (
          <RecallBubble
            step={step}
            savedAnswer={typeof saved === "string" ? saved : undefined}
            isComplete={Boolean(progress.completed[step.id])}
            onAnswer={(v) => setAnswer(step.id, v)}
            onComplete={() => setComplete(step.id)}
          />
        );
      }
      case "checkpoint":
        return <CheckpointBubble step={step} />;
    }
  }

  const progressPct = Math.round((stepIdx / Math.max(day.steps.length, 1)) * 100);
  const readyForFinalTest = pastEndOfLesson;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-surface/90 backdrop-blur-sm border-b border-border z-20">
        <div className="max-w-[760px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={onBackToIntro}
              className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle hover:text-text transition-colors cursor-pointer"
            >
              {t("dayOverview", { n: day.id })}
            </button>
            <div className="text-[15px] font-semibold text-text truncate">{tr(day.title, locale)}</div>
          </div>
          <button
            type="button"
            onClick={onOpenNotes}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12.5px] font-medium text-text-muted hover:text-text hover:bg-surface-soft transition-colors cursor-pointer border border-border"
          >
            <NotesIcon /> {t("notes")}
          </button>
        </div>
        <div className="h-1 bg-border">
          <div
            className="h-full bg-gradient-to-r from-primary to-indigo-400 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* Conversation area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[760px] mx-auto px-6 md:px-10 py-8 flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {visibleSteps.map((step) => (
              <div key={step.id}>{renderStep(step)}</div>
            ))}
          </div>

          {readyForFinalTest && (
            <FinalTest
              day={day}
              progress={progress}
              pyReady={pyReady}
              onProgressChange={onProgressChange}
            />
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Continue bar */}
      {!pastEndOfLesson && (
        <div className="sticky bottom-0 bg-surface/95 backdrop-blur-sm border-t border-border">
          <div className="max-w-[760px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-3">
            <div className="text-[12.5px] text-text-subtle">
              {currentStep && requiresInteraction(currentStep)
                ? currentComplete
                  ? t("nicelyDoneContinue")
                  : t("answerAboveToContinue")
                : t("continueWhenReady")}
            </div>
            <button
              type="button"
              onClick={advance}
              disabled={
                continueLock ||
                (currentStep ? requiresInteraction(currentStep) && !currentComplete : false)
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-[14px] font-semibold hover:bg-primary-hover transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-soft"
              title={t("pressEnter")}
            >
              {t("continue")} <ArrowRight />
            </button>
          </div>
        </div>
      )}

      {pastEndOfLesson && !progress.testStarted && (
        <div className="sticky bottom-0 bg-surface/95 backdrop-blur-sm border-t border-border">
          <div className="max-w-[760px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[13px] text-primary-hover font-semibold">
              <SparkleIcon /> {t("lessonComplete", { n: day.id })}
            </div>
            <button
              type="button"
              onClick={() => onProgressChange((p) => ({ ...p, testStarted: true, testStepIdx: 0, testTotal: day.finalTest.length }))}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-[14px] font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-soft"
            >
              {t("startFinalTest")} <ArrowRight />
            </button>
          </div>
        </div>
      )}

      {pastEndOfLesson && progress.testPassed && (
        <div className="sticky bottom-0 bg-success-soft border-t border-success/30">
          <div className="max-w-[760px] mx-auto px-6 md:px-10 py-3 flex items-center justify-center gap-2 text-success text-[13.5px] font-semibold">
            <CheckIcon /> {t("dayCompleteGreat", { n: day.id })}
          </div>
        </div>
      )}
    </div>
  );
}
