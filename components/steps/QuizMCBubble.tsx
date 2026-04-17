"use client";

import { useState } from "react";
import ChatBubble from "../ChatBubble";
import { CheckIcon } from "@/lib/icons";
import { useLocale } from "@/lib/locale-context";
import { tr } from "@/lib/i18n";
import type { QuizMCStep } from "@/lib/types";

interface Props {
  step: QuizMCStep;
  selected?: number;
  isComplete: boolean;
  onSelect: (idx: number) => void;
  onComplete: () => void;
}

export default function QuizMCBubble({ step, selected, isComplete, onSelect, onComplete }: Props) {
  const { locale, t } = useLocale();
  const [localPick, setLocalPick] = useState<number | undefined>(selected);
  const [submitted, setSubmitted] = useState<boolean>(selected !== undefined);

  const picked = submitted ? selected ?? localPick : localPick;
  const correct = picked === step.answer;

  function choose(i: number) {
    if (submitted) return;
    setLocalPick(i);
  }

  function submit() {
    if (localPick === undefined) return;
    onSelect(localPick);
    setSubmitted(true);
    if (localPick === step.answer && !isComplete) {
      onComplete();
    }
  }

  return (
    <ChatBubble from="teacher">
      <div className="bg-surface border border-border rounded-2xl rounded-tl-sm shadow-soft overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle mb-1.5">
            {t("quickCheck")}
          </div>
          <div
            className="text-[14.5px] leading-relaxed prose-concept"
            dangerouslySetInnerHTML={{ __html: tr(step.question, locale) }}
          />
        </div>
        <div className="p-3 flex flex-col gap-2">
          {step.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = i === step.answer;
            let cls = "border-border hover:bg-surface-soft";
            if (submitted) {
              if (isCorrect) cls = "border-success bg-success-soft text-success";
              else if (isPicked) cls = "border-danger bg-danger-soft text-danger";
              else cls = "border-border opacity-60";
            } else if (isPicked) {
              cls = "border-primary bg-primary-soft text-primary-hover";
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={submitted}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-[14px] text-left transition-colors cursor-pointer disabled:cursor-default ${cls}`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px] font-semibold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1" dangerouslySetInnerHTML={{ __html: tr(opt, locale) }} />
                {submitted && isCorrect && <CheckIcon />}
              </button>
            );
          })}
        </div>
        {!submitted && (
          <div className="px-4 py-3 border-t border-border flex justify-end">
            <button
              type="button"
              onClick={submit}
              disabled={localPick === undefined}
              className="px-4 py-1.5 rounded-md text-[13px] font-semibold bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {t("submit")}
            </button>
          </div>
        )}
        {submitted && (
          <div
            className={`px-4 py-3 border-t border-border text-[13.5px] leading-relaxed ${correct ? "bg-success-soft/50 text-text" : "bg-danger-soft/50 text-text"}`}
          >
            <span className="font-semibold mr-1">{correct ? t("niceCorrect") : t("notQuite")}</span>
            <span dangerouslySetInnerHTML={{ __html: tr(step.explanation, locale) }} />
          </div>
        )}
      </div>
    </ChatBubble>
  );
}
