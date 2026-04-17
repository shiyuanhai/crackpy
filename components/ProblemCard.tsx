"use client";

import { useState } from "react";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import { CheckIcon, LightbulbIcon, PlayIcon } from "@/lib/icons";
import { runPython } from "@/lib/pyodide";
import { runTests } from "@/lib/test-runner";
import type { Problem, PyResult, TestResult } from "@/lib/types";

interface ProblemCardProps {
  problem: Problem;
  solved: boolean;
  savedCode?: string;
  pyReady: boolean;
  onCodeChange: (code: string) => void;
  onSolved: () => void;
}

const difficultyClass: Record<Problem["difficulty"], string> = {
  Easy: "bg-success-soft text-emerald-800",
  Medium: "bg-warning-soft text-amber-900",
  Hard: "bg-danger-soft text-red-900",
};

export default function ProblemCard({
  problem,
  solved,
  savedCode,
  pyReady,
  onCodeChange,
  onSolved,
}: ProblemCardProps) {
  const [code, setCode] = useState(savedCode ?? problem.starter);
  const [result, setResult] = useState<PyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [allPassed, setAllPassed] = useState(false);

  function updateCode(next: string) {
    setCode(next);
    onCodeChange(next);
  }

  async function handleRun() {
    setLoading(true);
    setResult(null);
    setTestResults(null);
    const r = await runPython(code);
    setResult(r);

    if (r.ok && !problem.skipAutoTest && problem.tests && problem.tests.length > 0) {
      const { results, allPassed: passed } = await runTests(problem, code);
      setTestResults(results);
      setAllPassed(passed);
      if (passed) onSolved();
    }
    setLoading(false);
  }

  function handleSolution() {
    if (!confirm("Show the solution? Try to solve it first — struggle is how you learn.")) return;
    updateCode(problem.solution);
  }

  function handleReset() {
    if (!confirm("Reset your code? Your current work will be lost.")) return;
    updateCode(problem.starter);
  }

  return (
    <div className="bg-white border border-border rounded-2xl mb-5 overflow-hidden">
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2.5 mb-2 flex-wrap">
          <h3 className="text-[17px] font-bold tracking-tight flex-1 min-w-0">{problem.title}</h3>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wide ${difficultyClass[problem.difficulty]}`}
          >
            {problem.difficulty}
          </span>
          {solved && (
            <span className="text-[11px] font-semibold text-success inline-flex items-center gap-1">
              <CheckIcon /> Solved
            </span>
          )}
        </div>
        <p
          className="text-[14px] text-text-muted leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: problem.description }}
        />
      </div>

      <div className="bg-code">
        <CodeEditor value={code} onChange={updateCode} />
      </div>

      <div className="flex gap-2 px-4 py-3 bg-slate-800 border-t border-white/5 items-center flex-wrap">
        <button
          onClick={handleRun}
          disabled={!pyReady || loading}
          className="px-3.5 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="inline-block w-3 h-3 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon /> Run Code
            </>
          )}
        </button>
        <button
          onClick={() => setShowHint((v) => !v)}
          className="px-3.5 py-1.5 rounded-md text-slate-300 border border-slate-400/20 hover:bg-white/5 hover:border-slate-400/40 text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <LightbulbIcon /> Hint
        </button>
        <button
          onClick={handleSolution}
          className="px-3.5 py-1.5 rounded-md text-slate-300 border border-slate-400/20 hover:bg-white/5 hover:border-slate-400/40 text-[13px] font-medium transition-colors"
        >
          Show Solution
        </button>
        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 rounded-md text-slate-300 border border-slate-400/20 hover:bg-white/5 hover:border-slate-400/40 text-[13px] font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      {showHint && (
        <div className="px-5 py-3 bg-amber-500/[0.08] text-amber-200 border-t border-amber-500/20 text-[13px]">
          <strong className="text-amber-100">Hint:</strong> {problem.hint}
        </div>
      )}

      <OutputPanel
        visible={Boolean(result) || loading}
        stdout={result?.stdout}
        stderr={result?.stderr}
        loading={loading}
        testResults={testResults}
        allPassed={allPassed}
      />
    </div>
  );
}
