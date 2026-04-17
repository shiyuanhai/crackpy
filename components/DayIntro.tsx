"use client";

import { ClockIcon, TargetIcon, SparkleIcon, ArrowRight } from "@/lib/icons";
import type { Day, DayProgress } from "@/lib/types";

interface Props {
  day: Day;
  progress: DayProgress;
  onStart: () => void;
  onResume: () => void;
}

export default function DayIntro({ day, progress, onStart, onResume }: Props) {
  const hasProgress = progress.started && (progress.stepIdx > 0 || Object.keys(progress.completed).length > 0);
  const totalSteps = day.steps.length;
  const doneSteps = day.steps.filter((s) => progress.completed[s.id]).length;
  const pct = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;

  return (
    <div className="max-w-[760px] mx-auto px-6 md:px-10 py-10">
      <div className="text-[12px] font-semibold uppercase tracking-widest text-primary mb-2">
        Day {day.id} of 14
      </div>
      <h1 className="text-[32px] font-bold tracking-tight leading-tight text-text">
        {day.title}
      </h1>
      <p className="text-[17px] text-text-muted mt-2 leading-relaxed">{day.subtitle}</p>

      <div className="flex flex-wrap gap-2.5 mt-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-[12.5px] text-text-muted">
          <ClockIcon /> {day.estimatedTime}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-[12.5px] text-text-muted">
          <TargetIcon /> {day.steps.length} steps
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-[12.5px] text-text-muted">
          <SparkleIcon /> Final test at the end
        </span>
      </div>

      <div className="mt-8 bg-surface border border-border rounded-2xl p-6 shadow-soft">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle mb-3">
          What you&apos;ll learn today
        </h2>
        <ul className="flex flex-col gap-2 m-0 p-0 list-none">
          {day.goals.map((g, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-primary-soft text-primary-hover flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: g }} />
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-5 border-t border-border">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle mb-1.5">
            By end of today
          </div>
          <p className="text-[14.5px] leading-relaxed text-text m-0">{day.youWillBuild}</p>
        </div>
      </div>

      {hasProgress && (
        <div className="mt-5 bg-primary-soft/50 border border-primary/20 rounded-xl p-4">
          <div className="flex justify-between items-center text-[12.5px] text-primary-hover mb-1.5 font-semibold">
            <span>Your progress</span>
            <span>{doneSteps}/{totalSteps} steps ({pct}%)</span>
          </div>
          <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {hasProgress ? (
          <>
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-[15px] font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-soft"
            >
              Resume day {day.id} <ArrowRight />
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Restart Day ${day.id} from the beginning? Your notes and code will stay.`)) {
                  onStart();
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-text-muted text-[15px] font-semibold hover:bg-surface-soft transition-colors cursor-pointer"
            >
              Start over
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-[15px] font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-soft"
          >
            Start today&apos;s lesson <ArrowRight />
          </button>
        )}
      </div>

      <p className="text-[12.5px] text-text-subtle mt-6 leading-relaxed">
        Tip — this is an active lesson. The teacher will ask you to type code, answer questions,
        and explain concepts in your own words. That struggle is what makes it stick. You can pause
        anytime and resume later — your progress is saved in your browser.
      </p>
    </div>
  );
}
