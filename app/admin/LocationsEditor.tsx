"use client";

import type { Location } from "./shared/adminTypes";
import { emptyLocation } from "./shared/adminTypes";
import { LocationPreview } from "./LocationsEditor/LocationPreview";
import { LocationEditForm } from "./LocationsEditor/LocationEditForm";
import { LocationCardControls } from "./LocationsEditor/LocationCardControls";
import { ADMIN_TRANSLATIONS } from "./shared/translations";
import { useState, useEffect, useRef } from "react";

export function LocationsEditor({
  locations,
  editing,
  form,
  setForm,
  onSave,
  onDelete,
  onSaveOrder,
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
  onSaveOrder: (locations: Location[]) => Promise<void>;
  onEdit: (loc: Location) => void;
  onCancel: () => void;
  onGeocode: () => void;
  loading: boolean;
  geocoding: boolean;
  readOnly: boolean;
  locale: "sv" | "en";
  setLocale: (l: "sv" | "en") => void;
}) {
  const [deleteConfirming, setDeleteConfirming] = useState<string | null>(null);
  const [localLocations, setLocalLocations] = useState<Location[]>(locations);
  const [originalLocations, setOriginalLocations] = useState<Location[]>(() =>
    JSON.parse(JSON.stringify(locations))
  );
  const [movedLocationIds, setMovedLocationIds] = useState<Set<string>>(
    new Set()
  );
  const prevLocationsRef = useRef<Location[]>(locations);

  useEffect(() => {
    if (prevLocationsRef.current !== locations) {
      prevLocationsRef.current = locations;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalLocations(locations);
      setOriginalLocations(JSON.parse(JSON.stringify(locations)));
      setMovedLocationIds(new Set());
    }
  }, [locations]);

  const t = ADMIN_TRANSLATIONS[locale];

  const hasBeenMoved = (currentIndex: number): boolean => {
    const currentId = localLocations[currentIndex].id;
    if (!movedLocationIds.has(currentId)) return false;

    const originalIndex = originalLocations.findIndex(loc => loc.id === currentId);
    return originalIndex !== -1 && originalIndex !== currentIndex;
  };

  const handleLocationMove = (from: number, to: number) => {
    const fromType = localLocations[from].type;
    const toType = localLocations[to].type;

    if (fromType !== toType) {
      return;
    }

    const newLocations = [...localLocations];
    const [moved] = newLocations.splice(from, 1);
    newLocations.splice(to, 0, moved);

    const movedId = localLocations[from].id;
    setMovedLocationIds(prev => new Set(prev).add(movedId));

    setLocalLocations(newLocations);

    if (editing?.id === moved.id) {
      onEdit({ ...moved });
    }
  };

  const handleDeleteClick = (id: string) => {
    if (deleteConfirming === id) {
      onDelete(id);
      setDeleteConfirming(null);
    } else {
      setDeleteConfirming(id);
      setTimeout(() => setDeleteConfirming(null), 3000);
    }
  };

  const handleEditToggle = async (loc: Location, index: number) => {
    const locationHasMoved = hasBeenMoved(index);
    const isEditing = editing?.id === loc.id;

    if (isEditing || locationHasMoved) {
      if (locationHasMoved) {
        const reorderedLocations = localLocations.map((l, idx) => ({
          ...l,
          order: idx,
        }));
        await onSaveOrder(reorderedLocations);
      }

      if (isEditing) {
        const formEvent = {
          preventDefault: () => {},
        } as React.FormEvent;
        await onSave(formEvent);
      }
    } else {
      onEdit(loc);
    }
  };

  const handleAddNew = () => {
    const nextOrder = localLocations.length > 0 ? Math.max(...localLocations.map(l => l.order)) + 1 : 0;
    const newForm = {
      ...emptyLocation,
      order: nextOrder,
    };
    setForm(newForm);
    onEdit({ id: "new", ...newForm } as Location);
  };

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-sans">{t.location_clinics}</h2>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          {(["sv", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${locale === l ? "bg-surface text-foreground shadow-sm" : "text-muted-dark"}`}
            >
              {l === "sv" ? t.swedish : t.english}
            </button>
          ))}
        </div>
      </div>

      <fieldset disabled={readOnly} className={readOnly ? "opacity-60" : ""}>
        <div className="space-y-4">
          {localLocations.map((loc, i) => {
            const isEditing = editing?.id === loc.id;
            const prevLocation = i > 0 ? localLocations[i - 1] : null;
            const nextLocation = i < localLocations.length - 1 ? localLocations[i + 1] : null;
            const showTypeDivider = prevLocation && prevLocation.type !== loc.type;

            const canMoveUp = i === 0 ? false : prevLocation?.type === loc.type;
            const canMoveDown = i === localLocations.length - 1 ? false : nextLocation?.type === loc.type;

            return (
              <div key={loc.id}>
                {showTypeDivider && (
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-dark">
                      {loc.type === "partner" ? t.location_partner : t.location_onsite}
                    </span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                )}

                <div
                  className={`rounded-2xl border ${isEditing ? "border-primary shadow-md" : "border-border"} overflow-hidden`}
                >
                <div className="flex items-start gap-3 p-4 bg-muted/30">
                  <LocationPreview
                    name={isEditing ? form.name : loc.name}
                    address={isEditing ? form.address : loc.address}
                    phone={isEditing ? form.phone : loc.phone}
                    hours={isEditing ? form.hours : loc.hours}
                    website={isEditing ? form.website || "" : loc.website || ""}
                    type={isEditing ? form.type : loc.type}
                    alignerBrands={isEditing ? form.alignerBrands ?? [] : loc.alignerBrands ?? []}
                    hidden={isEditing ? form.hidden ?? false : loc.hidden ?? false}
                    locale={locale}
                  />

                  <LocationCardControls
                    index={i}
                    total={localLocations.length}
                    canMoveUp={canMoveUp}
                    canMoveDown={canMoveDown}
                    isEditing={isEditing}
                    hasMoved={hasBeenMoved(i)}
                    onMove={handleLocationMove}
                    onEditToggle={() => handleEditToggle(loc, i)}
                    onDelete={() => handleDeleteClick(loc.id)}
                    deleteConfirming={deleteConfirming === loc.id}
                    locale={locale}
                  />
                </div>

                {isEditing && (
                  <div className="p-4 border-t border-border space-y-3">
                    <form onSubmit={onSave}>
                      <LocationEditForm
                        form={form}
                        onChange={setForm}
                        onGeocode={onGeocode}
                        geocoding={geocoding}
                        locale={locale}
                        showTypeToggle={false}
                      />
                    </form>
                  </div>
                )}
                </div>
              </div>
            );
          })}

          {!editing ? (
            <button
              onClick={handleAddNew}
              disabled={readOnly}
              className="w-full py-3 rounded-xl border-2 border-dashed border-primary/30 text-primary font-medium hover:bg-primary-light transition-colors text-sm disabled:opacity-50"
            >
              {t.location_addNew}
            </button>
          ) : !localLocations.find(l => l.id === editing.id) && (
            <div className="rounded-2xl border border-primary shadow-md overflow-hidden">
              <div className="flex items-start gap-3 p-4 bg-muted/30">
                <LocationPreview
                  name={form.name}
                  address={form.address}
                  phone={form.phone}
                  hours={form.hours}
                  website={form.website || ""}
                  type={form.type}
                  alignerBrands={form.alignerBrands ?? []}
                  hidden={form.hidden ?? false}
                  locale={locale}
                />

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-white hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors"
                    title={t.cancel}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-border space-y-3">
                <form onSubmit={onSave}>
                  <LocationEditForm
                    form={form}
                    onChange={setForm}
                    onGeocode={onGeocode}
                    geocoding={geocoding}
                    locale={locale}
                    showTypeToggle={true}
                  />
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-sm disabled:opacity-50"
                    >
                      {loading ? t.saving : t.save}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
}
