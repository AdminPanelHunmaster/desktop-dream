import { createContext } from "react";
import type { Locale } from "./locale";

export type LocaleContextValue = {
  locale: Locale;
  localeTag: string;
  setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);
