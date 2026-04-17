"use client";

import ChatBubble from "../ChatBubble";
import { SparkleIcon } from "@/lib/icons";
import { useLocale } from "@/lib/locale-context";
import { tr } from "@/lib/i18n";
import type { CheckpointStep } from "@/lib/types";

interface Props {
  step: CheckpointStep;
}

export default function CheckpointBubble({ step }: Props) {
  const { locale, t } = useLocale();
  return (
    <ChatBubble from="teacher">
      <div className="bg-gradient-to-br from-primary-soft to-indigo-50 border border-primary/20 rounded-2xl rounded-tl-sm shadow-soft overflow-hidden">
        <div className="px-4 py-3">
          <div className="flex items-center gap-1.5 text-primary-hover text-[11px] font-semibold uppercase tracking-widest mb-1.5">
            <SparkleIcon /> {t("checkpointLabel")} — {tr(step.title, locale)}
          </div>
          <div
            className="text-[14.5px] leading-relaxed prose-concept"
            dangerouslySetInnerHTML={{ __html: tr(step.body, locale) }}
          />
        </div>
      </div>
    </ChatBubble>
  );
}
