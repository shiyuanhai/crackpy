"use client";

import ChatBubble from "../ChatBubble";
import { useLocale } from "@/lib/locale-context";
import { tr } from "@/lib/i18n";
import type { TeachStep } from "@/lib/types";

interface Props {
  step: TeachStep;
}

export default function TeachBubble({ step }: Props) {
  const { locale } = useLocale();
  return (
    <ChatBubble from="teacher">
      <div
        className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-[14.5px] leading-relaxed prose-concept shadow-soft"
        dangerouslySetInnerHTML={{ __html: tr(step.text, locale) }}
      />
    </ChatBubble>
  );
}
