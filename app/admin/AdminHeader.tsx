"use client";

import Link from "next/link";
import { useTheme } from "../components/hooks/useTheme";

type Tab = "dentist" | "patient" | "images";

export function AdminHeader({
  tab,
  setTab,
  onLogout,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  onLogout: () => void;
}) {
  const { dark, toggle } = useTheme();

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-serif font-semibold">Adminpanel</h1>
          <p className="text-sm text-muted-dark">
            Hantera innehåll, kliniker och bilder
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link
            href="/"
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            &larr; Tillbaka till sidan
          </Link>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-xs text-muted-dark hover:text-primary transition-colors"
            aria-label={dark ? "Byt till ljust läge" : "Byt till mörkt läge"}
          >
            {dark ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
            {dark ? "Ljust läge" : "Mörkt läge"}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs text-red-800 hover:text-red-950 dark:text-red-500 dark:hover:text-red-400 font-medium transition-colors"
          >
            Logga ut
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 flex gap-1">
        {(["dentist", "patient", "images"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${tab === t ? "bg-muted text-foreground" : "text-muted-dark hover:text-foreground"}`}
          >
            {t === "dentist"
              ? "För tandläkare"
              : t === "patient"
                ? "För patienter"
                : "Bilder"}
          </button>
        ))}
      </div>
    </div>
  );
}
