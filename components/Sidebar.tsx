"use client";

import { CheckIcon, PyLogo } from "@/lib/icons";
import type { Day, AppState } from "@/lib/types";

interface SidebarProps {
  course: Day[];
  currentDay: number;
  state: AppState;
  onSelect: (id: number) => void;
  onReset: () => void;
}

export default function Sidebar({ course, currentDay, state, onSelect, onReset }: SidebarProps) {
  const total = course.length;
  const done = course.filter((d) => state.progress[d.id]?.testPassed).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <aside className="bg-white border-r border-border p-6 md:p-5 md:sticky md:top-0 md:h-screen md:overflow-y-auto flex flex-col">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo-400 flex items-center justify-center text-white shrink-0">
          <PyLogo />
        </div>
        <div className="text-[17px] font-bold tracking-tight">CrackPy</div>
      </div>
      <div className="text-[12px] text-text-subtle ml-[42px] -mt-1">14-day interview prep</div>

      <div className="bg-surface-soft border border-border rounded-lg p-3.5 my-6">
        <div className="flex justify-between items-center text-[12px] text-text-muted mb-2 uppercase tracking-wider font-semibold">
          <span>Days complete</span>
          <span>
            {done}/{total}
          </span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-indigo-400 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="text-[11px] font-semibold text-text-subtle uppercase tracking-widest mx-2 mb-2">
        14-day plan
      </div>
      <ul className="flex flex-col gap-0.5 flex-1 list-none p-0 m-0">
        {course.map((day) => {
          const active = day.id === currentDay;
          const p = state.progress[day.id];
          const complete = Boolean(p?.testPassed);
          const inProgress = !complete && Boolean(p?.started);
          return (
            <li key={day.id}>
              <button
                type="button"
                onClick={() => onSelect(day.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all text-[14px] font-medium text-left ${
                  active
                    ? "bg-primary-soft text-primary-hover font-semibold"
                    : "text-text-muted hover:bg-surface-soft hover:text-text"
                }`}
              >
                <span
                  className={`w-[26px] h-[26px] rounded-md flex items-center justify-center text-[12px] font-semibold shrink-0 transition-colors ${
                    complete
                      ? "bg-success text-white"
                      : active
                        ? "bg-primary text-white"
                        : inProgress
                          ? "bg-primary-soft text-primary-hover border border-primary/30"
                          : "bg-surface-soft text-text-muted"
                  }`}
                >
                  {complete ? <CheckIcon /> : day.id}
                </span>
                <span className="flex-1 truncate">{day.title}</span>
                {inProgress && !active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-label="In progress" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="pt-4 mt-4 border-t border-border text-[12px] text-text-subtle flex justify-between items-center">
        <span>Runs in your browser</span>
        <button
          type="button"
          onClick={onReset}
          className="px-2 py-1 rounded text-text-muted hover:bg-surface-soft hover:text-danger transition-colors text-[12px] font-medium cursor-pointer"
          title="Reset all progress"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
