import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LocaleContext } from "./locale-context";
import { locales, type Locale } from "./locale";

const localeIds = new Set<Locale>(locales.map((locale) => locale.id));
const storageKey = "desktop-dream-locale";

function isLocale(value: string | null): value is Locale {
  return Boolean(value && localeIds.has(value as Locale));
}

function browserLocale(): Locale {
  const language = navigator.language.toLowerCase();
  if (language.startsWith("ru")) return "ru";
  if (language.startsWith("uk")) return "uk";
  if (language.startsWith("de")) return "de";
  if (language.startsWith("pl")) return "pl";
  if (language.startsWith("cs")) return "cs";
  if (language.startsWith("hu")) return "hu";
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    window.localStorage.setItem(storageKey, nextLocale);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    setLocale(isLocale(stored) ? stored : browserLocale());
  }, [setLocale]);

  const value = useMemo(
    () => ({
      locale,
      localeTag: locales.find((entry) => entry.id === locale)?.tag ?? "en-GB",
      setLocale,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
