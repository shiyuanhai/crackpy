"use client";

import ChatBubble from "../ChatBubble";
import { SparkleIcon } from "@/lib/icons";
import type { CheckpointStep } from "@/lib/types";

interface Props {
  step: CheckpointStep;
}

export default function CheckpointBubble({ step }: Props) {
  return (
    <ChatBubble from="teacher">
      <div className="bg-gradient-to-br from-primary-soft to-indigo-50 border border-primary/20 rounded-2xl rounded-tl-sm shadow-soft overflow-hidden">
        <div className="px-4 py-3">
          <div className="flex items-center gap-1.5 text-primary-hover text-[11px] font-semibold uppercase tracking-widest mb-1.5">
            <SparkleIcon /> Checkpoint — {step.title}
          </div>
          <div
            className="text-[14.5px] leading-relaxed prose-concept"
            dangerouslySetInnerHTML={{ __html: step.body }}
          />
        </div>
      </div>
    </ChatBubble>
  );
}
