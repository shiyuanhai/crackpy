"use client";

import { useLocale } from "@/lib/locale-context";
import type { TestResult } from "@/lib/types";

interface OutputPanelProps {
  visible: boolean;
  stdout?: string;
  stderr?: string;
  loading?: boolean;
  testResults?: TestResult[] | null;
  allPassed?: boolean;
}

export default function OutputPanel({
  visible,
  stdout,
  stderr,
  loading,
  testResults,
  allPassed,
}: OutputPanelProps) {
  const { locale } = useLocale();
  if (!visible) return null;

  const hasOutput = Boolean(stdout || stderr);
  const cleanStdout = stdout ? stdout.replace(/::TESTRESULT::.*$/gm, "").trim() : "";

  const outputLabel = locale === "zh" ? "输出" : "Output";
  const runningLabel = locale === "zh" ? "运行中..." : "Running...";
  const noOutputLabel = locale === "zh" ? "(无输出)" : "(no output)";
  const allPassedLabel = (n: number) =>
    locale === "zh" ? `✓ ${n} 个测试全部通过!` : `✓ All ${n} tests passed!`;
  const passFracLabel = (pass: number, total: number) =>
    locale === "zh" ? `${pass} / ${total} 个测试通过` : `${pass} of ${total} tests passed`;
  const expectedLabel = locale === "zh" ? "期望" : "expected";

  return (
    <div className="bg-[#0B1121] text-slate-200 px-5 py-4 text-[13px] leading-relaxed border-t border-white/5 max-h-72 overflow-y-auto whitespace-pre-wrap break-words font-mono">
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">
        {outputLabel}
      </div>

      {loading && <div className="text-slate-400">{runningLabel}</div>}

      {!loading && cleanStdout && <div>{cleanStdout}</div>}

      {!loading && stderr && <div className="text-red-300">{stderr}</div>}

      {!loading && !hasOutput && <div className="text-slate-500">{noOutputLabel}</div>}

      {!loading && testResults && testResults.length > 0 && (
        <div
          className={`mt-3 px-3 py-2.5 rounded-md border text-[12.5px] ${
            allPassed
              ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
              : "bg-red-500/10 border-red-500/25 text-red-300"
          }`}
        >
          <div className="font-semibold mb-1 text-[13px]">
            {allPassed
              ? allPassedLabel(testResults.length)
              : passFracLabel(testResults.filter((r) => r.pass).length, testResults.length)}
          </div>
          {testResults.map((r, i) => (
            <div key={i} className="font-mono text-[12px] py-0.5">
              {r.pass ? "✓" : "✗"} {r.call} → {JSON.stringify(r.actual)}
              {!r.pass && (
                <span>
                  {" "}
                  ({expectedLabel} {JSON.stringify(r.expected)})
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
