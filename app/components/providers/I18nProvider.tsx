"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Locale, type TranslationKey } from "@/lib/i18n";
import basePath from "@/lib/basePath";

type Overrides = Record<string, Record<string, string>>;

interface I18nContextValue {
  locale: Locale;
  t: (key: TranslationKey) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  defaultLocale = "sv",
}: {
  children: ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [overrides, setOverrides] = useState<Overrides>({});

  // Restore saved locale after mount
  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "en" || saved === "sv") && saved !== locale) {
      setLocaleState(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load content overrides
  useEffect(() => {
    fetch(`${basePath}/api/content`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setOverrides(data);
      })
      .catch(() => {});
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      const override = overrides[locale]?.[key];
      if (override !== undefined) return override;
      return translations[locale][key];
    },
    [locale, overrides],
  );

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
