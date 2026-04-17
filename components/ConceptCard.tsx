"use client";

import { useState } from "react";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import { PlayIcon } from "@/lib/icons";
import { runPython } from "@/lib/pyodide";
import type { Concept, PyResult } from "@/lib/types";

interface ConceptCardProps {
  concept: Concept;
  pyReady: boolean;
}

export default function ConceptCard({ concept, pyReady }: ConceptCardProps) {
  const [code, setCode] = useState(concept.code ?? "");
  const [result, setResult] = useState<PyResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    setLoading(true);
    setResult(null);
    const r = await runPython(code);
    setResult(r);
    setLoading(false);
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-6 mb-4">
      <h3 className="text-lg font-bold mb-3 tracking-tight">{concept.title}</h3>
      <div
        className="prose-concept text-[14.5px] leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: concept.content }}
      />
      {concept.code && (
        <div className="mt-4 bg-code rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
              Example
            </span>
            <button
              onClick={handleRun}
              disabled={!pyReady || loading}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-indigo-300 border border-indigo-300/30 hover:bg-indigo-300/10 hover:border-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlayIcon /> Run
            </button>
          </div>
          <CodeEditor value={code} onChange={setCode} minHeight="auto" />
          <OutputPanel
            visible={Boolean(result) || loading}
            stdout={result?.stdout}
            stderr={result?.stderr}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
