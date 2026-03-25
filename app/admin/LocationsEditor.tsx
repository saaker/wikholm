"use client";

import type { Location } from "./adminTypes";
import { inputCls } from "./adminTypes";

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
          <h2 className="text-lg font-semibold mb-4 font-sans">
            {editing ? "Redigera klinik" : "Lägg till ny klinik"}
          </h2>
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
            <div className="flex items-center gap-4 text-xs text-muted-dark bg-muted rounded-xl px-4 py-2.5">
              <span>
                Lat: <strong>{form.lat.toFixed(4)}</strong>
              </span>
              <span>
                Lng: <strong>{form.lng.toFixed(4)}</strong>
              </span>
              <span className="ml-auto opacity-60">Auto-fylls från adress</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Beskrivning
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className={`${inputCls} resize-none`}
              />
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
            className={`bg-surface rounded-2xl shadow-sm border p-5 ${editing?.id === loc.id ? "border-primary" : "border-border"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground font-sans">
                  {loc.name}
                </h3>
                <p className="text-sm text-muted-dark mt-0.5">{loc.address}</p>
                <p className="text-xs text-muted-dark mt-1">
                  {loc.phone} &middot; {loc.hours}
                </p>
              </div>
              {!readOnly && (
                <div className="flex gap-2 shrink-0">
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
          </div>
        ))}
      </div>
    </div>
  );
}
