"use client";

import { ClockIcon, TargetIcon, SparkleIcon, ArrowRight } from "@/lib/icons";
import { useLocale } from "@/lib/locale-context";
import { tr } from "@/lib/i18n";
import type { Day, DayProgress } from "@/lib/types";

interface Props {
  day: Day;
  progress: DayProgress;
  onStart: () => void;
  onResume: () => void;
}

export default function DayIntro({ day, progress, onStart, onResume }: Props) {
  const { locale, t } = useLocale();
  const hasProgress =
    progress.started && (progress.stepIdx > 0 || Object.keys(progress.completed).length > 0);
  const totalSteps = day.steps.length;
  const doneSteps = day.steps.filter((s) => progress.completed[s.id]).length;
  const pct = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;

  return (
    <div className="max-w-[760px] mx-auto px-6 md:px-10 py-10">
      <div className="text-[12px] font-semibold uppercase tracking-widest text-primary mb-2">
        {t("dayOf", { n: day.id })}
      </div>
      <h1 className="text-[32px] font-bold tracking-tight leading-tight text-text">
        {tr(day.title, locale)}
      </h1>
      <p className="text-[17px] text-text-muted mt-2 leading-relaxed">{tr(day.subtitle, locale)}</p>

      <div className="flex flex-wrap gap-2.5 mt-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-[12.5px] text-text-muted">
          <ClockIcon /> {tr(day.estimatedTime, locale)}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-[12.5px] text-text-muted">
          <TargetIcon /> {t("stepsCount", { n: day.steps.length })}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-[12.5px] text-text-muted">
          <SparkleIcon /> {t("finalTestAtEnd")}
        </span>
      </div>

      <div className="mt-8 bg-surface border border-border rounded-2xl p-6 shadow-soft">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle mb-3">
          {t("whatYoullLearn")}
        </h2>
        <ul className="flex flex-col gap-2 m-0 p-0 list-none">
          {day.goals.map((g, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-primary-soft text-primary-hover flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: tr(g, locale) }} />
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-5 border-t border-border">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-text-subtle mb-1.5">
            {t("byEndOfToday")}
          </div>
          <p className="text-[14.5px] leading-relaxed text-text m-0">{tr(day.youWillBuild, locale)}</p>
        </div>
      </div>

      {hasProgress && (
        <div className="mt-5 bg-primary-soft/50 border border-primary/20 rounded-xl p-4">
          <div className="flex justify-between items-center text-[12.5px] text-primary-hover mb-1.5 font-semibold">
            <span>{t("yourProgress")}</span>
            <span>{t("stepsFrac", { done: doneSteps, total: totalSteps, pct })}</span>
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
              {t("resumeDay", { n: day.id })} <ArrowRight />
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm(t("confirmRestart", { n: day.id }))) {
                  onStart();
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-text-muted text-[15px] font-semibold hover:bg-surface-soft transition-colors cursor-pointer"
            >
              {t("startOver")}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-[15px] font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-soft"
          >
            {t("startLesson")} <ArrowRight />
          </button>
        )}
      </div>

      <p className="text-[12.5px] text-text-subtle mt-6 leading-relaxed">{t("activeLessonTip")}</p>
    </div>
  );
}
