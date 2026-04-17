"use client";

import { useState } from "react";
import ChatBubble from "../ChatBubble";
import CodeEditor from "../CodeEditor";
import OutputPanel from "../OutputPanel";
import { PlayIcon } from "@/lib/icons";
import { runPython } from "@/lib/pyodide";
import type { DemoStep, PyResult } from "@/lib/types";

interface Props {
  step: DemoStep;
  pyReady: boolean;
}

export default function DemoBubble({ step, pyReady }: Props) {
  const [code, setCode] = useState(step.code);
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
    <ChatBubble from="teacher">
      <div className="bg-surface border border-border rounded-2xl rounded-tl-sm shadow-soft overflow-hidden">
        <div
          className="px-4 py-3 text-[14.5px] leading-relaxed prose-concept"
          dangerouslySetInnerHTML={{ __html: step.intro }}
        />
        <div className="bg-code">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
              Try it — edit and run
            </span>
            <button
              type="button"
              onClick={handleRun}
              disabled={!pyReady || loading}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-indigo-300 border border-indigo-300/30 hover:bg-indigo-300/10 hover:border-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
        {step.note && (
          <div className="px-4 py-3 text-[13.5px] text-text-muted border-t border-border bg-primary-soft/40">
            {step.note}
          </div>
        )}
      </div>
    </ChatBubble>
  );
}
