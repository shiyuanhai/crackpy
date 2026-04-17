"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "./i18n";
import { translate, type StringKey, type TVars } from "./strings";

const LOCALE_KEY = "crackpy_locale";

interface LocaleCtxValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: StringKey, vars?: TVars) => string;
}

const LocaleContext = createContext<LocaleCtxValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LOCALE_KEY);
    if (stored === "en" || stored === "zh") setLocaleState(stored);
    else {
      // first load — try browser language
      const nav = window.navigator.language?.toLowerCase() ?? "";
      if (nav.startsWith("zh")) setLocaleState("zh");
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(LOCALE_KEY, l);
      } catch {
        /* ignore quota / privacy mode */
      }
    }
  }, []);

  const t = useCallback(
    (key: StringKey, vars?: TVars) => translate(locale, key, vars),
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleCtxValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
