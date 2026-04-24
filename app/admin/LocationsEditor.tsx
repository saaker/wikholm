"use client";

import type { Location } from "./shared/adminTypes";
import { inputCls } from "./shared/adminTypes";
import { ICON_REGISTRY } from "@/lib/icons";

export function LocationsEditor({
  locations,
  editing,
  form,
  setForm,
  onSave,
  onDelete,
  onEdit,
  onCancel,
  onGeocode,
  loading,
  geocoding,
  readOnly,
  locale,
  setLocale,
}: {
  locations: Location[];
  editing: Location | null;
  form: Omit<Location, "id"> & { id?: string };
  setForm: (f: Omit<Location, "id"> & { id?: string }) => void;
  onSave: (e: React.FormEvent) => void;
  onDelete: (id: string) => void;
  onEdit: (loc: Location) => void;
  onCancel: () => void;
  onGeocode: () => void;
  loading: boolean;
  geocoding: boolean;
  readOnly: boolean;
  locale: "sv" | "en";
  setLocale: (l: "sv" | "en") => void;
}) {
  const translations = {
    sv: {
      editTitle: "Redigera klinik",
      addTitle: "Lägg till ny klinik",
      onsite: "På plats",
      partner: "Partnerklinik",
      name: "Namn",
      address: "Adress",
      addressPlaceholder: "Gatuadress, Stad",
      geocode: "Hämta koordinater",
      geocoding: "Hämtar...",
      phone: "Telefon",
      phonePlaceholder: "ex. 010-123 45 67",
      hours: "Öppettider",
      hoursPlaceholder: "ex. Mån-Fre 08:00-17:00",
      website: "Webbplats",
      websitePlaceholder: "https://exempel.se",
      delete: "Ta bort",
      cancel: "Avbryt",
      save: "Spara",
      saving: "Sparar...",
      clinics: "Kliniker",
      edit: "Redigera",
    },
    en: {
      editTitle: "Edit clinic",
      addTitle: "Add new clinic",
      onsite: "On-site",
      partner: "Partner clinic",
      name: "Name",
      address: "Address",
      addressPlaceholder: "Street address, City",
      geocode: "Get coordinates",
      geocoding: "Fetching...",
      phone: "Phone",
      phonePlaceholder: "e.g. 010-123 45 67",
      hours: "Hours",
      hoursPlaceholder: "e.g. Mon-Fri 08:00-17:00",
      website: "Website",
      websitePlaceholder: "https://example.com",
      delete: "Delete",
      cancel: "Cancel",
      save: "Save",
      saving: "Saving...",
      clinics: "Clinics",
      edit: "Edit",
    },
  };

  const t = translations[locale];
  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
      {/* Header with language toggle */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-sans">{t.clinics}</h2>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          {(["sv", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${locale === l ? "bg-surface text-foreground shadow-sm" : "text-muted-dark"}`}
            >
              {l === "sv" ? "Svenska" : "English"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <fieldset disabled={readOnly} className={readOnly ? "opacity-60" : ""}>
          <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold font-sans">
                {editing ? t.editTitle : t.addTitle}
              </h3>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  type: form.type === "onsite" ? "partner" : "onsite",
                })
              }
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-[0.7rem] font-medium uppercase tracking-wide shrink-0 cursor-pointer transition-colors ${
                form.type === "onsite"
                  ? "bg-primary-dark text-white dark:bg-primary-dark"
                  : "service-badge-text"
              }`}
              style={
                form.type === "partner"
                  ? {
                      backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)',
                    }
                  : undefined
              }
            >
              {form.type === "onsite" ? t.onsite : t.partner}
              <svg
                className="w-3 h-3 ml-1.5 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={onSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t.name}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t.address}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder={t.addressPlaceholder}
                  className={`flex-1 ${inputCls}`}
                  required
                />
                <button
                  type="button"
                  onClick={onGeocode}
                  disabled={geocoding || !form.address.trim()}
                  className="px-3 py-2.5 rounded-xl bg-primary-light text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50 shrink-0"
                >
                  {geocoding ? t.geocoding : `📍 ${t.geocode}`}
                </button>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-dark bg-muted rounded-xl px-4 py-2.5 mt-2">
                <span>
                  Lat: <strong>{form.lat.toFixed(4)}</strong>
                </span>
                <span>
                  Lng: <strong>{form.lng.toFixed(4)}</strong>
                </span>
                <span className="ml-auto opacity-60">
                  Auto-fylls från adress
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={t.phonePlaceholder}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t.hours}
                </label>
                <input
                  type="text"
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: e.target.value })}
                  placeholder={t.hoursPlaceholder}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t.website}
              </label>
              <input
                type="url"
                value={form.website || ""}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder={t.websitePlaceholder}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Skenor (aligners)
              </label>
              <div className="flex gap-4">
                {(["clearcorrect", "invisalign"] as const).map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(form.alignerBrands ?? []).includes(brand)}
                      onChange={(e) => {
                        const cur = form.alignerBrands ?? [];
                        setForm({
                          ...form,
                          alignerBrands: e.target.checked
                            ? [...cur, brand]
                            : cur.filter((b) => b !== brand),
                        });
                      }}
                      className="appearance-none w-4 h-4 rounded border border-border bg-surface checked:bg-primary checked:border-primary focus:ring-primary relative
                        after:content-[''] after:absolute after:left-[4.5px] after:top-[1.5px] after:w-1.25 after:h-2.25 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                    />
                    {brand === "invisalign" ? "Invisalign" : "ClearCorrect"}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-sm disabled:opacity-50"
              >
                {loading ? t.saving : t.save}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  {t.cancel}
                </button>
              )}
            </div>
          </form>
        </div>
      </fieldset>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold font-sans">
          Befintliga kliniker ({locations.length})
        </h2>
        {locations.length === 0 && (
          <p className="text-sm text-muted-dark">
            Inga kliniker tillagda ännu.
          </p>
        )}
        {locations.map((loc) => (
          <div
            key={loc.id}
            className={`bg-surface rounded-xl border p-5 transition-all ${editing?.id === loc.id ? "border-primary shadow-md ring-1 ring-primary/20" : "border-border shadow-sm"}`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-base font-semibold text-foreground font-sans leading-snug">
                {loc.name}
              </h3>
              <div className="flex gap-1.5 shrink-0">
                <span
                  className={`text-[0.7rem] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    loc.type === "onsite"
                      ? "bg-primary-dark text-white dark:bg-primary-dark"
                      : "service-badge-text"
                  }`}
                  style={
                    loc.type === "partner"
                      ? {
                          backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)',
                        }
                      : undefined
                  }
                >
                  {loc.type === "onsite" ? t.onsite : t.partner}
                </span>
              </div>
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
                <span>{loc.address}</span>
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
                <span>{loc.phone}</span>
              </div>
              {loc.website && (
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
                    {loc.website.replace(/^https?:\/\//, "")}
                  </span>
                </div>
              )}
            </div>
            {(loc.alignerBrands ?? []).length > 0 && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                {loc.alignerBrands!.map((b, idx) => {
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
            {!readOnly && (
              <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-border/50">
                <button
                  onClick={() => onEdit(loc)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-light text-primary hover:bg-primary/20 transition-colors"
                >
                  {t.edit}
                </button>
                <button
                  onClick={() => onDelete(loc.id)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-800 text-white hover:bg-red-900 transition-colors disabled:opacity-50"
                >
                  {t.delete}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
