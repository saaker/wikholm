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
      <div className="bg-[#2c2c2c] rounded-xl p-6 text-white">
        <h3 className="text-xl font-serif font-semibold mb-1">
          {v("brandName")}
        </h3>
        <p className="text-white/60 text-xs mb-3">{v("brandTagline")}</p>
        <p className="text-white/80 text-sm leading-relaxed">
          {v("footerDesc")}
        </p>
        <div className="flex gap-6 mt-3 text-xs text-white/50">
          <span>{v("footerQuickLinks")}</span>
          <span>{v("footerContact")}</span>
        </div>
        <p className="text-white/40 text-xs mt-3">{v("footerCopyright")}</p>
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
        <div className="flex justify-center gap-4 mt-4">
          <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">
            {v("beforeAfterBefore")}
          </span>
          <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">
            {v("beforeAfterAfter")}
          </span>
        </div>
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
