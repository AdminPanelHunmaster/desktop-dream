export type Locale = "en" | "ru" | "uk" | "de" | "pl" | "cs" | "hu";

export const locales = [
  { id: "en", number: 1, name: "English", tag: "en-GB" },
  { id: "ru", number: 2, name: "Русский", tag: "ru-RU" },
  { id: "uk", number: 3, name: "Українська", tag: "uk-UA" },
  { id: "de", number: 4, name: "Deutsch", tag: "de-DE" },
  { id: "pl", number: 5, name: "Polski", tag: "pl-PL" },
  { id: "cs", number: 6, name: "Čeština", tag: "cs-CZ" },
  { id: "hu", number: 7, name: "Magyar", tag: "hu-HU" },
] as const satisfies ReadonlyArray<{
  id: Locale;
  number: number;
  name: string;
  tag: string;
}>;
