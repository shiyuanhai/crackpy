export type Locale = "en" | "zh";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALES: Locale[] = ["en", "zh"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  zh: "中",
};

export type LocalizedText = string | { en: string; zh?: string };

export function tr(text: LocalizedText | undefined | null, locale: Locale): string {
  if (text === undefined || text === null) return "";
  if (typeof text === "string") return text;
  if (locale === "zh" && text.zh) return text.zh;
  return text.en;
}
