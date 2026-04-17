"use client";

import { useEffect, useState } from "react";
import { NotesIcon, CloseIcon } from "@/lib/icons";

interface Props {
  open: boolean;
  notes: string;
  dayTitle: string;
  onChange: (notes: string) => void;
  onClose: () => void;
}

export default function NotesPanel({ open, notes, dayTitle, onChange, onClose }: Props) {
  const [local, setLocal] = useState(notes);

  useEffect(() => {
    setLocal(notes);
  }, [notes]);

  function handleChange(val: string) {
    setLocal(val);
    onChange(val);
  }

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-30"
        onClick={onClose}
        aria-hidden
      />
      <aside className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-surface border-l border-border z-40 flex flex-col animate-slide-down shadow-[0_0_40px_rgba(0,0,0,0.15)]">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-text-subtle">
              <NotesIcon /> Your notes
            </div>
            <div className="text-[14px] font-semibold text-text mt-0.5">{dayTitle}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-surface-soft text-text-muted flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close notes"
          >
            <CloseIcon />
          </button>
        </div>
        <textarea
          value={local}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Jot down what clicked, what confused you, questions to revisit, code patterns to remember..."
          className="flex-1 w-full px-5 py-4 text-[14.5px] leading-relaxed bg-surface focus:outline-none resize-none font-mono"
        />
        <div className="px-5 py-3 border-t border-border text-[11.5px] text-text-subtle">
          Saved automatically as you type.
        </div>
      </aside>
    </>
  );
}
