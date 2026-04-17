"use client";

import { useState } from "react";
import ChatBubble from "../ChatBubble";
import type { RecallStep } from "@/lib/types";

interface Props {
  step: RecallStep;
  savedAnswer?: string;
  isComplete: boolean;
  onAnswer: (value: string) => void;
  onComplete: () => void;
}

export default function RecallBubble({ step, savedAnswer, isComplete, onAnswer, onComplete }: Props) {
  const [value, setValue] = useState(savedAnswer ?? "");
  const [revealed, setRevealed] = useState(Boolean(savedAnswer));

  function reveal() {
    onAnswer(value);
    setRevealed(true);
    if (!isComplete) onComplete();
  }

  return (
    <ChatBubble from="teacher">
      <div className="bg-surface border border-border rounded-2xl rounded-tl-sm shadow-soft overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle mb-1.5">
            Recall — explain in your own words
          </div>
          <div
            className="text-[14.5px] leading-relaxed prose-concept"
            dangerouslySetInnerHTML={{ __html: step.prompt }}
          />
        </div>
        <div className="p-3">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={revealed}
            placeholder="Type your answer — no wrong answers here. This step builds memory."
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-[14px] focus:outline-none focus:border-primary resize-y disabled:bg-surface-soft"
          />
        </div>
        <div className="px-4 py-3 border-t border-border flex justify-end gap-2">
          {!revealed && (
            <button
              type="button"
              onClick={reveal}
              className="px-4 py-1.5 rounded-md text-[13px] font-semibold bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Reveal guideline
            </button>
          )}
        </div>
        {revealed && (
          <div className="px-4 py-3 border-t border-border bg-primary-soft/40 text-[13.5px] leading-relaxed">
            <span className="font-semibold mr-1">One way to say it:</span>
            <span dangerouslySetInnerHTML={{ __html: step.guideline }} />
          </div>
        )}
      </div>
    </ChatBubble>
  );
}
