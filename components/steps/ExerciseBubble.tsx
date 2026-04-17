"use client";

import { useEffect, useState } from "react";
import ChatBubble from "../ChatBubble";
import CodeEditor from "../CodeEditor";
import OutputPanel from "../OutputPanel";
import { PlayIcon, LightbulbIcon, RestartIcon, CheckIcon } from "@/lib/icons";
import { runPython } from "@/lib/pyodide";
import { runExerciseTests } from "@/lib/test-runner";
import type { ExerciseStep, PyResult, TestResult } from "@/lib/types";

interface Props {
  step: ExerciseStep;
  pyReady: boolean;
  isActive: boolean;
  isComplete: boolean;
  attempts: number;
  savedCode?: string;
  onCodeChange: (code: string) => void;
  onIncrementAttempt: () => void;
  onComplete: () => void;
}

export default function ExerciseBubble({
  step,
  pyReady,
  isActive,
  isComplete,
  attempts,
  savedCode,
  onCodeChange,
  onIncrementAttempt,
  onComplete,
}: Props) {
  const [code, setCode] = useState(savedCode ?? step.starter);
  const [result, setResult] = useState<PyResult | null>(null);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [allPassed, setAllPassed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setCode(savedCode ?? step.starter);
  }, [step.id, savedCode, step.starter]);

  function handleChange(v: string) {
    setCode(v);
    onCodeChange(v);
  }

  async function handleRun() {
    setLoading(true);
    setResult(null);
    setTestResults(null);
    setAllPassed(false);
    const r = await runPython(code);
    setResult(r);

    if (!step.skipAutoTest && r.ok && step.tests && step.tests.length > 0) {
      const { results, allPassed: passed } = await runExerciseTests(step, code);
      setTestResults(results);
      setAllPassed(passed);
      onIncrementAttempt();
      if (passed && !isComplete) {
        onComplete();
      }
    } else if (step.skipAutoTest && r.ok) {
      onIncrementAttempt();
      if (!isComplete) onComplete();
    } else if (!r.ok) {
      onIncrementAttempt();
    }
    setLoading(false);
  }

  function handleReset() {
    setCode(step.starter);
    onCodeChange(step.starter);
    setResult(null);
    setTestResults(null);
    setAllPassed(false);
  }

  function handleRevealSolution() {
    if (!confirm("Reveal solution? Try at least a few times first — struggle is where you learn.")) return;
    setCode(step.solution);
    onCodeChange(step.solution);
    setShowSolution(true);
  }

  const canRevealSolution = attempts >= 2 || showSolution;
  const hintUnlocked = attempts >= 1 || showHint;

  return (
    <ChatBubble from="teacher">
      <div className={`bg-surface border rounded-2xl rounded-tl-sm shadow-soft overflow-hidden ${isComplete ? "border-success/40" : "border-border"}`}>
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle">
              Your turn — write code
            </div>
            {isComplete && (
              <div className="flex items-center gap-1 text-success text-[12px] font-semibold">
                <CheckIcon /> Solved
              </div>
            )}
          </div>
          <div
            className="text-[14.5px] leading-relaxed prose-concept"
            dangerouslySetInnerHTML={{ __html: step.prompt }}
          />
        </div>

        <div className="bg-code">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
              {step.fnName ? `def ${step.fnName}(...)` : "editor"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors cursor-pointer"
                title="Reset to starter code"
              >
                <RestartIcon />
              </button>
              <button
                type="button"
                onClick={() => setShowHint((s) => !s)}
                disabled={!hintUnlocked && !isActive}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-amber-300 border border-amber-300/30 hover:bg-amber-300/10 transition-colors cursor-pointer disabled:opacity-40"
                title={hintUnlocked ? "Show hint" : "Try once first — hint unlocks after"}
              >
                <LightbulbIcon /> Hint
              </button>
              <button
                type="button"
                onClick={handleRun}
                disabled={!pyReady || loading}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-indigo-300 border border-indigo-300/30 hover:bg-indigo-300/10 hover:border-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <PlayIcon /> Run
              </button>
            </div>
          </div>

          {showHint && hintUnlocked && (
            <div className="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-amber-200 text-[12.5px] leading-relaxed">
              <span className="font-semibold">Hint:</span> {step.hint}
            </div>
          )}

          <CodeEditor value={code} onChange={handleChange} minHeight="160px" />

          <OutputPanel
            visible={Boolean(result) || loading}
            stdout={result?.stdout}
            stderr={result?.stderr}
            loading={loading}
            testResults={testResults}
            allPassed={allPassed}
          />

          <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between text-[11.5px] text-slate-500">
            <span>
              {attempts === 0
                ? "Give it a shot — it's okay to be wrong."
                : `Attempts: ${attempts}`}
            </span>
            <button
              type="button"
              onClick={handleRevealSolution}
              disabled={!canRevealSolution}
              className="text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title={
                canRevealSolution
                  ? "Reveal solution"
                  : "Try at least twice before peeking at the solution"
              }
            >
              {showSolution ? "Solution shown" : "Reveal solution"}
            </button>
          </div>
        </div>
      </div>
    </ChatBubble>
  );
}
