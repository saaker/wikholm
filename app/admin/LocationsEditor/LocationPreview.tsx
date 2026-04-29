import { ICON_REGISTRY } from "@/lib/icons";
import { ADMIN_TRANSLATIONS } from "../shared/translations";

type LocationPreviewProps = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  website: string;
  type: "onsite" | "partner";
  alignerBrands: ("clearcorrect" | "invisalign")[];
  hidden: boolean;
  locale: "sv" | "en";
};

export function LocationPreview({
  name,
  address,
  phone,
  hours,
  website,
  type,
  alignerBrands,
  hidden,
  locale,
}: LocationPreviewProps) {
  const t = ADMIN_TRANSLATIONS[locale];

  return (
    <div className={`flex-1 min-w-0 ${hidden ? "opacity-50" : ""}`}>
      <div className="space-y-1.5">
        {hidden && (
          <span className="inline-block mb-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-muted text-muted-dark">
            {t.hidden}
          </span>
        )}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground font-sans leading-snug">
            {name || t.location_preview_newClinic}
          </h3>
          <span
            className={`text-[0.7rem] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
              type === "onsite"
                ? "bg-primary-dark text-white dark:bg-primary-dark"
                : "service-badge-text"
            }`}
            style={
              type === "partner"
                ? {
                    backgroundColor:
                      "color-mix(in oklab, var(--color-primary) 20%, transparent)",
                  }
                : undefined
            }
          >
            {type === "onsite" ? t.location_onsite : t.location_partner}
          </span>
        </div>
        <div className="space-y-1.5 text-sm text-muted-dark">
          {address && (
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
              <span>{address}</span>
            </div>
          )}
          {phone && (
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
              <span>{phone}</span>
            </div>
          )}
          {hours && (
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{hours}</span>
            </div>
          )}
          {website && (
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
              <span className="truncate">
                {website.replace(/^https?:\/\//, "")}
              </span>
            </div>
          )}
        </div>
        {alignerBrands.length > 0 && (
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
            {alignerBrands.map((b, idx) => {
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
      </div>
    </div>
  );
}
