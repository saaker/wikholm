"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "../I18nProvider";
import { ICON_REGISTRY } from "@/lib/icons";

interface LocationData {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  website?: string;
  type: "onsite" | "partner";
  alignerBrands?: ("clearcorrect" | "invisalign")[];
}

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-100 rounded-2xl bg-muted animate-pulse flex items-center justify-center">
      <p className="text-sm text-muted-dark">...</p>
    </div>
  ),
});

export default function Locations({
  locations,
}: {
  locations: LocationData[];
}) {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleMarkerClick = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const onsite = locations.filter((l) => (l.type || "onsite") === "onsite");
  const partner = locations.filter((l) => l.type === "partner");

  const renderCard = (location: LocationData) => (
    <button
      key={location.id}
      onClick={() => setActiveId(activeId === location.id ? null : location.id)}
      className={`w-full text-left p-5 rounded-xl border transition-all flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        activeId === location.id
          ? "border-primary bg-primary-light shadow-md ring-1 ring-primary/20"
          : "border-border shadow-sm hover:border-primary/30 hover:shadow-md bg-surface"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="text-base font-semibold text-foreground font-sans leading-snug">
          {location.name}
        </h3>
        <span
          className={`text-[0.7rem] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
            location.type === "onsite"
              ? "bg-primary-dark text-white dark:bg-primary-dark"
              : ""
          }`}
          style={
            location.type === "partner"
              ? {
                  backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)',
                  color: 'var(--badge-text-color, #694A1D)'
                }
              : undefined
          }
        >
          {t(location.type === "onsite" ? "clinicOnsite" : "clinicPartner")}
        </span>
      </div>
      <div className="space-y-1.5 text-sm text-muted-dark">
        <div className="flex items-start gap-2">
          <svg
            className="w-4 h-4 mt-0.5 shrink-0 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{location.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 shrink-0 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <a
            href={`tel:${location.phone.replace(/\s/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {location.phone}
          </a>
        </div>
        {location.website && (
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <a
              href={location.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-primary transition-colors truncate rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {location.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>
      {(location.alignerBrands ?? []).length > 0 && (
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
          {location.alignerBrands!.map((b, idx) => {
            const icon = ICON_REGISTRY[b];
            return (
              <span
                key={b}
                className="inline-flex items-center gap-1 text-sm text-muted-dark"
              >
                {idx > 0 && <span className="text-border mx-0.5">·</span>}
                {icon && (
                  <svg
                    className="w-3.5 h-3.5 text-primary"
                    fill={icon.filled ? "currentColor" : "none"}
                    stroke={icon.filled ? "none" : "currentColor"}
                    viewBox="0 0 24 24"
                  >
                    {icon.paths.map((d, i) => (
                      <path
                        key={i}
                        strokeLinecap={icon.filled ? undefined : "round"}
                        strokeLinejoin={icon.filled ? undefined : "round"}
                        strokeWidth={icon.filled ? undefined : 1.5}
                        fillOpacity={icon.opacity}
                        d={d}
                      />
                    ))}
                  </svg>
                )}
                {b === "invisalign" ? "Invisalign" : "ClearCorrect"}
              </span>
            );
          })}
        </div>
      )}
    </button>
  );

  return (
    <section id="locations" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("locationsLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("locationsTitle1")}{" "}
            <span className="text-primary">{t("locationsTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">
            {t("locationsIntro")}
          </p>
        </div>

        {/* On-site clinics */}
        {onsite.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-foreground font-sans mb-4">
              {t("clinicOnsiteHeading")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {onsite.map(renderCard)}
            </div>
          </>
        )}

        {/* Partner clinics */}
        {partner.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-foreground font-sans mb-4">
              {t("clinicPartnerHeading")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {partner.map(renderCard)}
            </div>
          </>
        )}

        {/* Full-width map */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-125">
          <LocationMap
            locations={locations}
            activeId={activeId}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </div>
    </section>
  );
}
