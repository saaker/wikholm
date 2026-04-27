"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "./providers/I18nProvider";
import { useTheme } from "./hooks/useTheme";
import basePath from "@/lib/basePath";

import logo from "../../public/images/logos/logo.jpg";

export default function Header({
  variant = "b2b",
}: {
  variant?: "b2b" | "patient";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();
  const { dark, toggle } = useTheme();

  const b2bNav = [
    { label: t("navAbout"), href: "#about" },
    { label: t("navServices"), href: "#services" },
    { label: t("navNews"), href: "#news" },
    { label: t("navContact"), href: "#contact" },
    { label: t("navPatients"), href: `${basePath}/for-patienter` },
  ];

  const patientNav = [
    { label: t("navAligners"), href: "#aligners" },
    { label: t("navProcess"), href: "#process" },
    { label: t("navLocations"), href: "#locations" },
    { label: t("navFaq"), href: "#faq" },
    { label: t("navContact"), href: "#contact" },
    { label: t("navDentists"), href: `${basePath}/` },
  ];

  const navItems = variant === "patient" ? patientNav : b2bNav;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
      {/* Skip to main content link - for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-primary-dark focus-visible:text-white focus-visible:rounded-md focus-visible:font-medium focus-visible:shadow-lg"
      >
        {locale === "sv" ? "Hoppa till huvudinnehåll" : "Skip to main content"}
      </a>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo + title (inline on desktop, logo-only on mobile) */}
        <a
          href={`${basePath}/`}
          onClick={(e) => {
            const path = window.location.pathname;
            const isHome =
              path === "/" ||
              path.replace(/\/+$/, "") === "" ||
              path.endsWith("/wikholm") ||
              path === "/wikholm/";
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5 z-10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Image
            src={logo}
            alt="Wikholm Ortodonti"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="hidden lg:inline text-2xl font-serif font-semibold text-foreground tracking-tight">
            {t("brandName")}
          </span>
        </a>

        {/* Centered title — mobile/tablet only */}
        <a
          href={`${basePath}/`}
          onClick={(e) => {
            const path = window.location.pathname;
            const isHome =
              path === "/" ||
              path.replace(/\/+$/, "") === "" ||
              path.endsWith("/wikholm") ||
              path === "/wikholm/";
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="lg:hidden absolute left-1/2 -translate-x-1/2 text-xl font-serif font-semibold text-foreground tracking-tight whitespace-nowrap z-10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {t("brandName")}
        </a>

        <div className="flex items-center gap-6 z-10">
          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-dark hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language switcher — desktop only */}
          <button
            onClick={() => setLocale(locale === "sv" ? "en" : "sv")}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold text-muted-dark hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={
              locale === "sv" ? "Switch to English" : "Byt till svenska"
            }
          >
            {locale === "sv" ? "EN" : "SV"}
          </button>

          {/* Dark mode toggle — desktop only */}
          <button
            onClick={toggle}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full text-muted-dark hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            suppressHydrationWarning
          >
            {dark ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                suppressHydrationWarning
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  suppressHydrationWarning
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                suppressHydrationWarning
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  suppressHydrationWarning
                />
              </svg>
            )}
          </button>

          {/* Hamburger menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-muted-dark hover:text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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

      {/* Mobile/tablet nav */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-border bg-surface px-6 py-5 flex flex-col gap-5 items-end text-right">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-muted-dark hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-border flex flex-col gap-4 items-end w-full">
            <button
              onClick={() => {
                setLocale(locale === "sv" ? "en" : "sv");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-base font-medium text-muted-dark hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="text-lg leading-none">
                {locale === "sv" ? "🇬🇧" : "🇸🇪"}
              </span>
              {locale === "sv" ? "English" : "Svenska"}
            </button>
            <button
              onClick={() => {
                toggle();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-base font-medium text-muted-dark hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="text-base leading-none">
                {dark ? "☀️" : "🌙"}
              </span>
              {dark
                ? locale === "sv"
                  ? "Ljust läge"
                  : "Light mode"
                : locale === "sv"
                  ? "Mörkt läge"
                  : "Dark mode"}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
