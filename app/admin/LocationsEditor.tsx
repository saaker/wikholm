"use client";

import type { Location } from "./adminTypes";
import { inputCls } from "./adminTypes";
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
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <fieldset disabled={readOnly} className={readOnly ? "opacity-60" : ""}>
        <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-sans">
              {editing ? "Redigera klinik" : "Lägg till ny klinik"}
            </h2>
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
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-dark"
              }`}
            >
              {form.type === "onsite" ? "På plats" : "Partnerklinik"}
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
                Namn
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
                Adress
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="Gatuadress, Stad"
                  className={`flex-1 ${inputCls}`}
                  required
                />
                <button
                  type="button"
                  onClick={onGeocode}
                  disabled={geocoding || !form.address.trim()}
                  className="px-3 py-2.5 rounded-xl bg-primary-light text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50 shrink-0"
                >
                  {geocoding ? "Söker..." : "📍 Hämta koord."}
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
                  Telefon
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Öppettider
                </label>
                <input
                  type="text"
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Hemsida
              </label>
              <input
                type="url"
                value={form.website || ""}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://example.com"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Skenor (aligners)
              </label>
              <div className="flex gap-4">
                {(["invisalign", "clearcorrect"] as const).map((brand) => (
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
                        after:content-[''] after:absolute after:left-[4.5px] after:top-[1.5px] after:w-[5px] after:h-[9px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
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
                className="flex-1 py-2.5 rounded-xl bg-primary text-white dark:text-black font-medium hover:bg-primary-dark transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Sparar..." : editing ? "Uppdatera" : "Lägg till"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Avbryt
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
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-dark"
                  }`}
                >
                  {loc.type === "onsite" ? "På plats" : "Partnerklinik"}
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
                  Redigera
                </button>
                <button
                  onClick={() => onDelete(loc.id)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-800 text-white hover:bg-red-900 transition-colors disabled:opacity-50"
                >
                  Ta bort
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
