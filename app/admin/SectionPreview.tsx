"use client";

import type { SectionField } from "./adminTypes";
import basePath from "@/lib/basePath";

export function SectionPreview({
  sectionId,
  draft,
  fields,
}: {
  sectionId: string;
  draft: Record<string, string>;
  fields: SectionField[];
}) {
  const v = (key: string) => draft[key] ?? "";
  const byLabel = (pattern: string) => {
    const f = fields.find((fl) =>
      fl.label.toLowerCase().includes(pattern.toLowerCase()),
    );
    return f ? (draft[f.key] ?? "") : "";
  };

  /* Hero */
  if (sectionId === "hero" || sectionId === "patientHero") {
    const pfx = sectionId === "hero" ? "hero" : "patientHero";
    return (
      <div className="bg-linear-to-br from-surface via-primary-light to-surface rounded-xl p-8 text-center">
        {v(`${pfx}Badge`) && (
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide text-primary-dark bg-surface border border-primary/30 rounded-full">
            {v(`${pfx}Badge`)}
          </span>
        )}
        <h3 className="text-3xl font-serif font-semibold mb-3">
          {v(`${pfx}Title1`)}{" "}
          <span className="text-primary">{v(`${pfx}Title2`)}</span>
        </h3>
        <p className="text-muted-dark text-sm mb-4 max-w-md mx-auto">
          {v(`${pfx}Subtitle`)}
        </p>
        <div className="flex justify-center gap-3">
          <span className="px-4 py-2 rounded-full bg-primary text-white text-xs font-medium">
            {v(`${pfx}Cta`)}
          </span>
          <span className="px-4 py-2 rounded-full border border-border text-xs font-medium text-foreground">
            {v(`${pfx}Secondary`)}
          </span>
        </div>
      </div>
    );
  }

  /* About */
  if (sectionId === "about") {
    const bioText = v("aboutBio");
    const paragraphs = bioText.split("\n").filter((p: string) => p.trim());
    return (
      <div className="grid grid-cols-[auto_1fr] gap-4 py-6 px-4">
        {/* Photo thumbnail */}
        <div className="w-28 h-36 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
          {v("aboutImage") ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={`${basePath}${v("aboutImage")}`}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-dark text-xs">
              Ingen bild
            </div>
          )}
        </div>

        <div className="min-w-0">
          <span className="text-primary/70 text-xs font-medium uppercase tracking-wider">
            {v("aboutLabel")}
          </span>
          <h3 className="text-2xl font-serif font-semibold mt-1 mb-3">
            {v("aboutTitle1")}{" "}
            <span className="text-primary">{v("aboutTitle2")}</span>
          </h3>
          <div className="space-y-1.5 text-sm text-muted-dark leading-relaxed">
            {paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="flex gap-6 mt-4 pt-3 border-t border-border">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <span className="text-lg font-serif font-semibold text-primary">
                  {v(`bragValue${n}`)}
                </span>
                <span className="block text-xs text-muted-dark">
                  {v(`bragTitle${n}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* Brand & Footer */
  if (sectionId === "brand") {
    return (
      <div className="bg-footer-bg rounded-xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand column */}
            <div>
              <h3 className="text-xl font-serif font-semibold text-white mb-3">
                {v("brandName")}
              </h3>
              <p className="text-white/80 text-[0.9375rem] leading-relaxed">
                {v("footerDesc")}
              </p>
            </div>

            {/* Quick links column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-white/70">
                Snabblänkar
              </h4>
              <ul className="space-y-1.5 text-[0.9375rem] text-white/80">
                <li>Om mig</li>
                <li>Tjänster</li>
                <li>För patienter</li>
                <li>Kontakt</li>
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-white/70">
                Kontakt
              </h4>
              <ul className="space-y-1.5 text-[0.9375rem] text-white/80">
                <li className="inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  @wikholmort
                </li>
                {v("linkedinPersonal") && (
                  <li className="inline-flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {v("linkedinPersonal")}
                  </li>
                )}
                {v("linkedinCompany") && (
                  <li className="inline-flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {v("linkedinCompany")}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} {v("footerCopyright")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* Before & After */
  if (sectionId === "beforeAfter") {
    return (
      <div className="text-center py-6 px-4">
        <span className="text-primary/70 text-xs font-medium uppercase tracking-wider">
          {v("beforeAfterLabel")}
        </span>
        <h3 className="text-2xl font-serif font-semibold mt-2">
          {v("beforeAfterTitle1")}{" "}
          <span className="text-primary">{v("beforeAfterTitle2")}</span>
        </h3>
        {v("beforeAfterIntro") && (
          <p className="text-muted-dark text-sm mt-2 max-w-md mx-auto">
            {v("beforeAfterIntro")}
          </p>
        )}
        {v("beforeAfterDisclaimer") && (
          <p className="text-muted-dark/60 text-xs mt-3 italic">
            {v("beforeAfterDisclaimer")}
          </p>
        )}
      </div>
    );
  }

  /* Generic section header (*-header) */
  if (sectionId.endsWith("-header")) {
    const label = byLabel("etikett") || byLabel("badge");
    const title1 = byLabel("titel rad 1");
    const title2 = byLabel("titel rad 2");
    const intro = byLabel("intro") || byLabel("undertext");
    return (
      <div className="text-center py-6 px-4">
        {label && (
          <span className="text-primary/70 text-xs font-medium uppercase tracking-wider">
            {label}
          </span>
        )}
        <h3 className="text-2xl font-serif font-semibold mt-2">
          {title1} <span className="text-primary">{title2}</span>
        </h3>
        {intro && (
          <p className="text-muted-dark text-sm mt-2 max-w-md mx-auto">
            {intro}
          </p>
        )}
      </div>
    );
  }

  return null;
}
