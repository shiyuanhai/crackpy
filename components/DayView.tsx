"use client";

import ConceptCard from "./ConceptCard";
import ProblemCard from "./ProblemCard";
import { ClockIcon, SparkleIcon, TargetIcon } from "@/lib/icons";
import type { Day, DayProgress } from "@/lib/types";

interface DayViewProps {
  day: Day;
  progress: DayProgress;
  savedCode: Record<string, string>;
  pyReady: boolean;
  onCodeChange: (problemId: string, code: string) => void;
  onSolved: (problemId: string) => void;
}

export default function DayView({
  day,
  progress,
  savedCode,
  pyReady,
  onCodeChange,
  onSolved,
}: DayViewProps) {
  const dayComplete = day.problems.every((p) => progress.solved.includes(p.id));
  const nextDay = Math.min(day.id + 1, 14);

  return (
    <main className="px-6 md:px-12 py-8 md:py-10 max-w-[1100px] mx-auto w-full pb-16">
      {dayComplete && (
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl mb-6 text-[14px] font-medium text-primary-hover animate-slide-down border border-indigo-200 bg-gradient-to-br from-indigo-50 to-emerald-50">
          <span className="text-success shrink-0">
            <SparkleIcon />
          </span>
          <div>
            Day {day.id} complete! Great work. Continue to Day {nextDay}.
          </div>
        </div>
      )}

      <header className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary bg-primary-soft px-2.5 py-1 rounded-full mb-4 tracking-wide">
          Day {day.id} of 14
        </div>
        <h1 className="text-[32px] font-bold tracking-tight leading-[1.2] mb-1.5">{day.title}</h1>
        <p className="text-base text-text-muted">{day.subtitle}</p>
        <div className="flex gap-5 mt-4 text-[13px] text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon /> {day.estimatedTime}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <TargetIcon /> {day.problems.length} problem{day.problems.length === 1 ? "" : "s"}
          </span>
        </div>
      </header>

      <section className="mt-8">
        <div className="text-[12px] font-bold text-text-subtle uppercase tracking-widest mb-3.5">
          Learning Objectives
        </div>
        <ul className="bg-white border border-border rounded-xl px-5 py-4 list-none m-0">
          {day.objectives.map((obj, i) => (
            <li key={i} className="py-1.5 pl-7 relative text-[14px]">
              <span className="absolute left-0 top-[10px] w-4 h-4 bg-primary-soft rounded flex items-center justify-center">
                <svg width={10} height={10} viewBox="0 0 20 20" fill="#6366F1">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {obj}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <div className="text-[12px] font-bold text-text-subtle uppercase tracking-widest mb-3.5">
          Concepts
        </div>
        {day.concepts.map((c, i) => (
          <ConceptCard key={i} concept={c} pyReady={pyReady} />
        ))}
      </section>

      <section className="mt-8">
        <div className="text-[12px] font-bold text-text-subtle uppercase tracking-widest mb-3.5">
          Practice Problems
        </div>
        {day.problems.map((p) => (
          <ProblemCard
            key={p.id}
            problem={p}
            solved={progress.solved.includes(p.id)}
            savedCode={savedCode[p.id]}
            pyReady={pyReady}
            onCodeChange={(code) => onCodeChange(p.id, code)}
            onSolved={() => onSolved(p.id)}
          />
        ))}
      </section>
    </main>
  );
}
