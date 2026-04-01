/* ═══════════════════════════════════════════════════
   Icon Registry — shared by components & admin
   ═══════════════════════════════════════════════════ */

export const ICON_REGISTRY: Record<
  string,
  {
    label: string;
    paths: string[];
    polyline?: string;
    filled?: boolean;
    opacity?: number;
  }
> = {
  "check-circle": {
    label: "Bock i cirkel",
    paths: ["M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"],
  },
  "clipboard-list": {
    label: "Urklipp med lista",
    paths: [
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    ],
  },
  building: {
    label: "Byggnad",
    paths: [
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    ],
  },
  lightbulb: {
    label: "Glödlampa",
    paths: [
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    ],
  },
  users: {
    label: "Grupp",
    paths: [
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    ],
  },
  chat: {
    label: "Bubbla",
    paths: [
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    ],
  },
  link: {
    label: "Länk",
    paths: [
      "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    ],
  },
  "trending-up": {
    label: "Trend uppåt",
    paths: ["M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"],
  },
  eye: {
    label: "Öga",
    paths: [
      "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    ],
  },
  refresh: {
    label: "Uppdatera",
    paths: [
      "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    ],
  },
  heart: {
    label: "Hjärta",
    paths: [
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    ],
  },
  "shield-check": {
    label: "Sköld",
    paths: [
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    ],
  },
  smiley: {
    label: "Smiley",
    paths: [
      "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    ],
  },
  "clipboard-check": {
    label: "Urklipp med bock",
    paths: [
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    ],
  },
  phone: {
    label: "Telefon",
    paths: [
      "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    ],
  },
  "alert-triangle": {
    label: "Varning",
    paths: [
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z",
    ],
  },
  clock: {
    label: "Klocka",
    paths: ["M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"],
  },
  check: {
    label: "Bock",
    paths: [],
    polyline: "20 6 9 17 4 12",
  },
  star: {
    label: "Stjärna",
    paths: [
      "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    ],
  },
  document: {
    label: "Dokument",
    paths: [
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    ],
  },
  calendar: {
    label: "Kalender",
    paths: [
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    ],
  },
  mail: {
    label: "E-post",
    paths: [
      "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    ],
  },
  sparkles: {
    label: "Gnistror",
    paths: [
      "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    ],
  },
  gift: {
    label: "Present",
    paths: [
      "M20 12v10H4V12M2 7h20v5H2V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
    ],
  },
  invisalign: {
    label: "Invisalign",
    filled: true,
    paths: [
      "M12 11 Q14.6 6.5 12 2 Q9.4 6.5 12 11Z",
      "M12.78 11.38 Q17.92 10.6 19.82 5.77 Q14.68 6.54 12.78 11.38Z",
      "M12.97 12.22 Q16.78 15.76 21.75 14.23 Q17.94 10.69 12.97 12.22Z",
      "M12.43 12.9 Q12.04 18.08 16.34 21.01 Q16.73 15.83 12.43 12.9Z",
      "M11.57 12.9 Q7.27 15.83 7.66 21.01 Q11.96 18.08 11.57 12.9Z",
      "M11.03 12.22 Q6.06 10.69 2.25 14.23 Q7.22 15.76 11.03 12.22Z",
      "M11.22 11.38 Q9.32 6.54 4.18 5.77 Q6.08 10.6 11.22 11.38Z",
    ],
  },
  clearcorrect: {
    label: "ClearCorrect",
    filled: true,
    paths: ["M12 2a10 10 0 0 1 0 20a10 10 0 0 1 0-20Z M5 11a7 7 0 0 0 14 0Z"],
    opacity: 0.75,
  },
};

export const ICON_NAMES = Object.keys(ICON_REGISTRY);

/** Render an icon by name at the given CSS class size */
export function Icon({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) {
  const entry = ICON_REGISTRY[name];
  if (!entry) return null;

  return (
    <svg
      className={className}
      fill={entry.filled ? "currentColor" : "none"}
      stroke={entry.filled ? "none" : "currentColor"}
      style={entry.opacity != null ? { opacity: entry.opacity } : undefined}
      viewBox="0 0 24 24"
    >
      {entry.paths.map((d, i) => (
        <path
          key={i}
          strokeLinecap={entry.filled ? undefined : "round"}
          strokeLinejoin={entry.filled ? undefined : "round"}
          strokeWidth={entry.filled ? undefined : 1.5}
          fillOpacity={entry.opacity}
          d={d}
        />
      ))}
      {entry.polyline && (
        <polyline
          points={entry.polyline}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      )}
    </svg>
  );
}
