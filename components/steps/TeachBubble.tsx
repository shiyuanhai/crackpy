"use client";

import ChatBubble from "../ChatBubble";
import type { TeachStep } from "@/lib/types";

interface Props {
  step: TeachStep;
}

export default function TeachBubble({ step }: Props) {
  return (
    <ChatBubble from="teacher">
      <div
        className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-[14.5px] leading-relaxed prose-concept shadow-soft"
        dangerouslySetInnerHTML={{ __html: step.text }}
      />
    </ChatBubble>
  );
}
