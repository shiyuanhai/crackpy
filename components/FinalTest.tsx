"use client";

import { useMemo, useState } from "react";
import type { Day, DayProgress, LessonStep } from "@/lib/types";
import TeachBubble from "./steps/TeachBubble";
import DemoBubble from "./steps/DemoBubble";
import ExerciseBubble from "./steps/ExerciseBubble";
import QuizMCBubble from "./steps/QuizMCBubble";
import QuizTextBubble from "./steps/QuizTextBubble";
import RecallBubble from "./steps/RecallBubble";
import CheckpointBubble from "./steps/CheckpointBubble";
import ChatBubble from "./ChatBubble";
import { CheckIcon, RestartIcon, SparkleIcon } from "@/lib/icons";

interface Props {
  day: Day;
  progress: DayProgress;
  pyReady: boolean;
  onProgressChange: (updater: (p: DayProgress) => DayProgress) => void;
}

const PASS_THRESHOLD = 0.7;

function scorable(step: LessonStep): boolean {
  return step.kind === "exercise" || step.kind === "quiz_mc" || step.kind === "quiz_text";
}

export default function FinalTest({ day, progress, pyReady, onProgressChange }: Props) {
  const tests = day.finalTest;
  const total = tests.length;

  const scorableCount = useMemo(() => tests.filter(scorable).length, [tests]);

  if (!progress.testStarted) return null;

  const testStepIdx = Math.min(progress.testStepIdx, total);
  const visible = tests.slice(0, testStepIdx + 1);
  const current = tests[testStepIdx];
  const past = testStepIdx >= total;

  function setComplete(id: string) {
    onProgressChange((p) => ({ ...p, completed: { ...p.completed, [id]: true } }));
  }
  function setAnswer(id: string, value: string | number) {
    onProgressChange((p) => ({ ...p, userAnswers: { ...p.userAnswers, [id]: value } }));
  }
  function setUserCode(id: string, code: string) {
    onProgressChange((p) => ({ ...p, userCode: { ...p.userCode, [id]: code } }));
  }
  function incrementAttempt(id: string) {
    onProgressChange((p) => ({
      ...p,
      attempts: { ...p.attempts, [id]: (p.attempts[id] ?? 0) + 1 },
    }));
  }

  function advance() {
    if (!current) return;
    if (current.kind !== "exercise" && current.kind !== "quiz_mc" && current.kind !== "quiz_text" && current.kind !== "recall") {
      if (!progress.completed[current.id]) setComplete(current.id);
    }
    onProgressChange((p) => ({ ...p, testStepIdx: Math.min(p.testStepIdx + 1, total) }));
  }

  function finish() {
    const correct = tests.filter((t) => scorable(t) && progress.completed[t.id]).length;
    const passed = scorableCount > 0 && correct / scorableCount >= PASS_THRESHOLD;
    onProgressChange((p) => ({
      ...p,
      testScore: correct,
      testTotal: scorableCount,
      testPassed: passed,
      completedAt: passed ? new Date().toISOString() : p.completedAt,
    }));
  }

  function retake() {
    const toReset: Record<string, boolean> = { ...progress.completed };
    const attempts = { ...progress.attempts };
    const userAnswers = { ...progress.userAnswers };
    const userCode = { ...progress.userCode };
    for (const t of tests) {
      delete toReset[t.id];
      delete attempts[t.id];
      delete userAnswers[t.id];
      delete userCode[t.id];
    }
    onProgressChange((p) => ({
      ...p,
      completed: toReset,
      attempts,
      userAnswers,
      userCode,
      testStepIdx: 0,
      testScore: null,
      testPassed: false,
      testStarted: true,
    }));
  }

  function currentRequiresInteraction(): boolean {
    if (!current) return false;
    return (
      current.kind === "exercise" ||
      current.kind === "quiz_mc" ||
      current.kind === "quiz_text" ||
      current.kind === "recall"
    );
  }

  function renderStep(step: LessonStep) {
    switch (step.kind) {
      case "teach":
        return <TeachBubble step={step} />;
      case "demo":
        return <DemoBubble step={step} pyReady={pyReady} />;
      case "exercise":
        return (
          <ExerciseBubble
            step={step}
            pyReady={pyReady}
            isActive={step.id === current?.id}
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

  const currentComplete = current ? Boolean(progress.completed[current.id]) : true;

  return (
    <div className="flex flex-col gap-5">
      <ChatBubble from="teacher">
        <div className="bg-gradient-to-br from-primary to-indigo-500 text-white rounded-2xl rounded-tl-sm shadow-soft px-4 py-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest opacity-90 mb-1">
            <SparkleIcon /> Final test — Day {day.id}
          </div>
          <div className="text-[14.5px] leading-relaxed">
            Answer {scorableCount} questions. You need {Math.ceil(scorableCount * PASS_THRESHOLD)} correct to pass.
          </div>
        </div>
      </ChatBubble>

      {visible.map((step) => (
        <div key={step.id}>{renderStep(step)}</div>
      ))}

      {!past && (
        <div className="flex items-center justify-between bg-surface-soft border border-border rounded-xl px-4 py-3">
          <div className="text-[12.5px] text-text-muted">
            Question {testStepIdx + 1} of {total}{" "}
            {current && currentRequiresInteraction() && !currentComplete && "— answer above to continue"}
          </div>
          <button
            type="button"
            onClick={advance}
            disabled={currentRequiresInteraction() && !currentComplete}
            className="px-4 py-2 rounded-md text-[13px] font-semibold bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {past && progress.testScore === null && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={finish}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-[14px] font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-soft"
          >
            See my score
          </button>
        </div>
      )}

      {past && progress.testScore !== null && (
        <div
          className={`rounded-2xl p-6 border ${
            progress.testPassed
              ? "bg-success-soft border-success/30"
              : "bg-warning-soft border-warning/30"
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest mb-1">
            {progress.testPassed ? (
              <span className="text-success flex items-center gap-1.5">
                <CheckIcon /> Passed
              </span>
            ) : (
              <span className="text-warning">Not yet — try once more</span>
            )}
          </div>
          <div className="text-[22px] font-bold tracking-tight">
            {progress.testScore} / {progress.testTotal}
          </div>
          <p className="text-[14px] text-text-muted mt-2 leading-relaxed">
            {progress.testPassed
              ? "Day complete. The concepts should feel natural now — if any felt shaky, review your notes tomorrow before starting the next day."
              : `You need ${Math.ceil(progress.testTotal * PASS_THRESHOLD)} correct to pass. Missing a few? That means there's something to review — the test is doing its job.`}
          </p>
          <div className="mt-4 flex gap-2.5">
            <button
              type="button"
              onClick={retake}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-semibold bg-surface border border-border hover:bg-surface-soft transition-colors cursor-pointer"
            >
              <RestartIcon /> Retake test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
