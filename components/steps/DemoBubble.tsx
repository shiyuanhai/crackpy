"use client";

import { useEffect, useMemo, useState } from "react";
import ChatBubble from "../ChatBubble";
import CodeEditor from "../CodeEditor";
import OutputPanel from "../OutputPanel";
import { PlayIcon, CheckIcon } from "@/lib/icons";
import { runPython } from "@/lib/pyodide";
import { useLocale } from "@/lib/locale-context";
import { tr } from "@/lib/i18n";
import type { DemoStep, PyResult } from "@/lib/types";

interface Props {
  step: DemoStep;
  pyReady: boolean;
  isComplete: boolean;
  savedCode?: string;
  onCodeChange: (code: string) => void;
  onComplete: () => void;
}

function normalize(s: string): string {
  // Strip trailing whitespace on each line + trailing newlines. Keeps structure.
  return s.replace(/[ \t]+$/gm, "").replace(/\n+$/g, "").trimStart();
}

export default function DemoBubble({
  step,
  pyReady,
  isComplete,
  savedCode,
  onCodeChange,
  onComplete,
}: Props) {
  const { locale, t } = useLocale();
  const target = step.code;
  const [code, setCode] = useState(savedCode ?? "");
  const [result, setResult] = useState<PyResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCode(savedCode ?? "");
  }, [step.id, savedCode]);

  const matches = useMemo(
    () => code.trim().length > 0 && normalize(code) === normalize(target),
    [code, target],
  );

  useEffect(() => {
    if (matches && !isComplete) onComplete();
  }, [matches, isComplete, onComplete]);

  function handleChange(v: string) {
    setCode(v);
    onCodeChange(v);
    if (result) setResult(null);
  }

  async function handleRun() {
    setLoading(true);
    setResult(null);
    const r = await runPython(code || target);
    setResult(r);
    setLoading(false);
  }

  function handleSkip() {
    if (!confirm(t("confirmSkip"))) return;
    setCode(target);
    onCodeChange(target);
    if (!isComplete) onComplete();
  }

  const targetLines = target.split("\n").length;
  const yourLines = code.split("\n").length;
  const progressChars = code.length;
  const targetChars = target.length;
  const rawPct = targetChars ? Math.round((progressChars / targetChars) * 100) : 0;
  // Cap at 99% unless the content actually matches — avoids misleading "100%" on typos.
  const pct = matches ? 100 : Math.min(99, rawPct);

  return (
    <ChatBubble from="teacher">
      <div className={`bg-surface border rounded-2xl rounded-tl-sm shadow-soft overflow-hidden ${isComplete ? "border-success/40" : "border-border"}`}>
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle">
              {t("typeItOut")}
            </div>
            {isComplete && (
              <div className="flex items-center gap-1 text-success text-[12px] font-semibold">
                <CheckIcon /> {t("matchesNice")}
              </div>
            )}
          </div>
          <div
            className="text-[14.5px] leading-relaxed prose-concept"
            dangerouslySetInnerHTML={{ __html: tr(step.intro, locale) }}
          />
          <div className="text-[12.5px] text-text-subtle mt-2 leading-relaxed">
            {t("typeTargetBelow")}
          </div>
        </div>

        {/* Target code (read-only display) */}
        <div className="bg-code">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
              {t("targetCode")}
            </span>
            <span className="text-[10.5px] text-slate-500 font-mono">
              {targetLines} {targetLines === 1 ? "line" : "lines"}
            </span>
          </div>
          <CodeEditor value={target} readOnly minHeight="auto" />
        </div>

        {/* User editor */}
        <div className="bg-code border-t border-white/10">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              {t("yourCode")}
              {matches ? (
                <span className="inline-flex items-center gap-1 text-emerald-400 tracking-normal normal-case text-[11px]">
                  <CheckIcon /> {t("matchesNice")}
                </span>
              ) : code.length > 0 ? (
                <span className="text-slate-500 tracking-normal normal-case text-[11px]">
                  {yourLines}/{targetLines} · {pct}%
                </span>
              ) : null}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSkip}
                className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer px-2 py-1"
              >
                {t("skipTyping")}
              </button>
              <button
                type="button"
                onClick={handleRun}
                disabled={!pyReady || loading || code.trim().length === 0}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-indigo-300 border border-indigo-300/30 hover:bg-indigo-300/10 hover:border-indigo-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <PlayIcon /> {t("run")}
              </button>
            </div>
          </div>

          <CodeEditor value={code} onChange={handleChange} minHeight="140px" />

          <OutputPanel
            visible={Boolean(result) || loading}
            stdout={result?.stdout}
            stderr={result?.stderr}
            loading={loading}
          />
        </div>

        {step.note && (
          <div
            className="px-4 py-3 text-[13.5px] text-text-muted border-t border-border bg-primary-soft/40"
            dangerouslySetInnerHTML={{ __html: tr(step.note, locale) }}
          />
        )}
      </div>
    </ChatBubble>
  );
}
