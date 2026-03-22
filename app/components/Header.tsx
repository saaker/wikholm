"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useI18n } from "./I18nProvider";
import type { Locale } from "@/lib/i18n";
import { useTheme } from "./useTheme";
import logo from "../../public/logo.jpg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();
  const { dark, toggle } = useTheme();

  const navItems = [
    { label: t("navAbout"), href: "#about" },
    { label: t("navInvisalign"), href: "#invisalign" },
    { label: t("navProcess"), href: "#process" },
    { label: t("navLocations"), href: "#locations" },
    { label: t("navNews"), href: "#news" },
    { label: t("navFaq"), href: "#faq" },
    { label: t("navContact"), href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={logo}
            alt="Wikholm Ortodonti"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-xl font-serif font-semibold text-foreground tracking-tight">
            {t("brandName")}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-dark hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language switcher — desktop only */}
          <button
            onClick={() => setLocale(locale === "sv" ? "en" : "sv")}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold text-muted-dark hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label={
              locale === "sv" ? "Switch to English" : "Byt till svenska"
            }
          >
            {locale === "sv" ? "EN" : "SV"}
          </button>

          {/* Dark mode toggle — desktop only */}
          <button
            onClick={toggle}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full text-muted-dark hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-muted-dark hover:text-foreground"
            aria-label={t("openMenu")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-surface px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-dark hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-border flex flex-col gap-3">
            <button
              onClick={() => {
                toggle();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-medium text-muted-dark hover:text-primary transition-colors"
            >
              <span className="text-base leading-none">{dark ? "☀️" : "🌙"}</span>
              {dark
                ? locale === "sv" ? "Ljust läge" : "Light mode"
                : locale === "sv" ? "Mörkt läge" : "Dark mode"}
            </button>
            <button
              onClick={() => {
                setLocale(locale === "sv" ? "en" : "sv");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-medium text-muted-dark hover:text-primary transition-colors"
            >
              <span className="text-base leading-none">
                {locale === "sv" ? "🇬🇧" : "🇸🇪"}
              </span>
              {locale === "sv" ? "Switch to English" : "Byt till svenska"}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
