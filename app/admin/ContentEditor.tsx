"use client";

import {
  dentistContentSections,
  patientContentSections,
  dentistLinkOptions,
  patientLinkOptions,
} from "./adminTypes";
import { Field, ImagePickerField, CheckboxField } from "./adminComponents";
import { SectionPreview } from "./SectionPreview";

export function ContentEditor({
  sectionId,
  locale,
  setLocale,
  draft,
  onChange,
  onSave,
  onReset,
  saving,
  readOnly,
}: {
  sectionId: string;
  locale: "sv" | "en";
  setLocale: (l: "sv" | "en") => void;
  draft: Record<string, string | boolean>;
  onChange: (key: string, value: string | boolean) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  readOnly: boolean;
}) {
  const allSections = [...dentistContentSections, ...patientContentSections];
  const sec = allSections.find((s) => s.id === sectionId);
  if (!sec) return null;

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-sans">{sec.title}</h2>
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
      <fieldset disabled={readOnly} className={readOnly ? "opacity-60" : ""}>
        <div className="space-y-4">
          {sec.fields.map((f) =>
            f.checkbox ? (
              <CheckboxField
                key={f.key}
                label={f.label}
                value={(draft[f.key] as boolean) ?? false}
                onChange={(v) => onChange(f.key, v)}
              />
            ) : f.link ? (
              <LinkField
                key={f.key}
                label={f.label}
                value={(draft[f.key] as string) ?? ""}
                onChange={(v) => onChange(f.key, v)}
                variant={f.link}
              />
            ) : f.image ? (
              <ImagePickerField
                key={f.key}
                label={f.label}
                value={(draft[f.key] as string) ?? ""}
                onChange={(v) => onChange(f.key, v)}
                defaultFolder={f.defaultFolder}
              />
            ) : (
              <Field
                key={f.key}
                label={f.label}
                value={(draft[f.key] as string) ?? ""}
                onChange={(v) => onChange(f.key, v)}
                multiline={f.multiline}
                large={f.large}
              />
            ),
          )}
        </div>
        <div className="flex gap-3 pt-6">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-sm disabled:opacity-50"
          >
            {saving ? "Sparar..." : "Spara ändringar"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            Återställ till standard
          </button>
        </div>
      </fieldset>

      {/* Live preview */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs font-medium text-muted-dark mb-3 uppercase tracking-wider">
          Förhandsgranskning
        </p>
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <SectionPreview
            sectionId={sectionId}
            draft={draft}
            fields={sec.fields}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}

function LinkField({
  label,
  value,
  onChange,
  variant,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  variant: "dentist" | "patient";
}) {
  const options =
    variant === "dentist" ? dentistLinkOptions : patientLinkOptions;

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
      >
        <option value="">— Välj sektion —</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label} ({o.value})
          </option>
        ))}
      </select>
    </div>
  );
}
