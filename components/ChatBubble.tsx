"use client";

import type { ReactNode } from "react";
import { PyLogo } from "@/lib/icons";

interface ChatBubbleProps {
  from: "teacher" | "you";
  children: ReactNode;
  compact?: boolean;
}

export default function ChatBubble({ from, children, compact }: ChatBubbleProps) {
  if (from === "you") {
    return (
      <div className="flex gap-3 justify-end animate-slide-down">
        <div
          className={`max-w-[85%] bg-primary text-white rounded-2xl rounded-tr-sm px-4 ${
            compact ? "py-2" : "py-3"
          } text-[14.5px] leading-relaxed shadow-soft`}
        >
          {children}
        </div>
        <div className="w-8 h-8 rounded-full bg-surface-soft border border-border flex items-center justify-center text-[12px] font-semibold text-text-muted shrink-0">
          You
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3 animate-slide-down">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-indigo-400 flex items-center justify-center text-white shrink-0 shadow-soft">
        <PyLogo />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
