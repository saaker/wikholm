"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type SectionsData, DEFAULT_SECTIONS } from "@/lib/sectionsDefaults";
import basePath from "@/lib/basePath";

interface SectionsContextValue {
  sections: SectionsData;
}

const SectionsContext = createContext<SectionsContextValue>({
  sections: DEFAULT_SECTIONS,
});

export function SectionsProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<SectionsData>(DEFAULT_SECTIONS);

  useEffect(() => {
    fetch(`${basePath}/api/sections`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setSections(data);
      })
      .catch(() => {});
  }, []);

  return (
    <SectionsContext.Provider value={{ sections }}>
      {children}
    </SectionsContext.Provider>
  );
}

export function useSections() {
  return useContext(SectionsContext);
}
