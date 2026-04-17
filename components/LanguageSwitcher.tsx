"use client";

import { useLocale } from "@/lib/locale-context";
import { LOCALES, LOCALE_SHORT } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center p-0.5 rounded-md bg-surface-soft border border-border"
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            className={`px-2 py-0.5 rounded text-[12px] font-semibold cursor-pointer transition-colors ${
              active
                ? "bg-primary text-white"
                : "text-text-muted hover:text-text"
            }`}
            aria-pressed={active}
          >
            {LOCALE_SHORT[l]}
          </button>
        );
      })}
    </div>
  );
}
