"use client";

import { useState } from "react";
import ChatBubble from "../ChatBubble";
import type { QuizTextStep } from "@/lib/types";

interface Props {
  step: QuizTextStep;
  savedAnswer?: string;
  isComplete: boolean;
  onAnswer: (value: string) => void;
  onComplete: () => void;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function QuizTextBubble({ step, savedAnswer, isComplete, onAnswer, onComplete }: Props) {
  const [value, setValue] = useState(savedAnswer ?? "");
  const [submitted, setSubmitted] = useState(Boolean(savedAnswer));

  const accepted = step.accept.map(normalize);
  const ok = submitted && accepted.includes(normalize(value));

  function submit() {
    if (!value.trim()) return;
    onAnswer(value);
    setSubmitted(true);
    if (accepted.includes(normalize(value)) && !isComplete) onComplete();
  }

  return (
    <ChatBubble from="teacher">
      <div className="bg-surface border border-border rounded-2xl rounded-tl-sm shadow-soft overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle mb-1.5">
            Type your answer
          </div>
          <div
            className="text-[14.5px] leading-relaxed prose-concept"
            dangerouslySetInnerHTML={{ __html: step.question }}
          />
        </div>
        <div className="p-3 flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !submitted) submit();
            }}
            disabled={submitted}
            placeholder="Your answer..."
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-surface text-[14px] focus:outline-none focus:border-primary disabled:bg-surface-soft"
          />
          {!submitted && (
            <button
              type="button"
              onClick={submit}
              disabled={!value.trim()}
              className="px-4 py-2 rounded-md text-[13px] font-semibold bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
        {submitted && (
          <div
            className={`px-4 py-3 border-t border-border text-[13.5px] leading-relaxed ${ok ? "bg-success-soft/50" : "bg-warning-soft/50"}`}
          >
            <span className="font-semibold mr-1">
              {ok ? "Correct —" : `Expected something like "${step.accept[0]}" —`}
            </span>
            <span dangerouslySetInnerHTML={{ __html: step.explanation }} />
            {!ok && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setValue("");
                  }}
                  className="text-primary hover:text-primary-hover text-[13px] font-semibold cursor-pointer"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </ChatBubble>
  );
}
