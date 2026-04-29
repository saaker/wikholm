import { inputCls } from "../shared/adminTypes";
import { CheckboxField } from "../fields/CheckboxField/CheckboxField";
import { AlignerBrandsField } from "./AlignerBrandsField";
import { ADMIN_TRANSLATIONS } from "../shared/translations";

type LocationFormData = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  website?: string;
  type: "onsite" | "partner";
  alignerBrands: ("clearcorrect" | "invisalign")[];
  order: number;
  hidden?: boolean;
  id?: string;
};

type LocationEditFormProps = {
  form: LocationFormData;
  onChange: (form: LocationFormData) => void;
  onGeocode: () => void;
  geocoding: boolean;
  locale: "sv" | "en";
  showTypeToggle?: boolean;
};

export function LocationEditForm({
  form,
  onChange,
  onGeocode,
  geocoding,
  locale,
  showTypeToggle = true,
}: LocationEditFormProps) {
  const t = ADMIN_TRANSLATIONS[locale];

  return (
    <div className="space-y-4">
      {showTypeToggle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold font-sans">
            {t.location_form_addNewHeading}
          </h3>
          <button
            type="button"
            onClick={() =>
              onChange({
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
                    backgroundColor:
                      "color-mix(in oklab, var(--color-primary) 20%, transparent)",
                  }
                : undefined
            }
          >
            {form.type === "onsite" ? t.location_onsite : t.location_partner}
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
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {t.location_name}
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          className={inputCls}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {t.location_address}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.address}
            onChange={(e) => onChange({ ...form, address: e.target.value })}
            placeholder={t.location_form_addressPlaceholder}
            className={`flex-1 ${inputCls}`}
            required
          />
          <button
            type="button"
            onClick={onGeocode}
            disabled={geocoding || !form.address.trim()}
            className="px-3 py-2.5 rounded-xl bg-primary-light text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50 shrink-0"
          >
            {geocoding ? t.location_geocoding : `📍 ${t.location_geocode}`}
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-dark bg-muted rounded-xl px-4 py-2.5 mt-2">
          <span>
            Lat: <strong>{form.lat.toFixed(4)}</strong>
          </span>
          <span>
            Lng: <strong>{form.lng.toFixed(4)}</strong>
          </span>
          <span className="ml-auto opacity-60">{t.location_form_coordsAutoFill}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t.location_phone}
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange({ ...form, phone: e.target.value })}
            placeholder={t.location_form_phonePlaceholder}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t.location_hours}
          </label>
          <input
            type="text"
            value={form.hours}
            onChange={(e) => onChange({ ...form, hours: e.target.value })}
            placeholder={t.location_form_hoursPlaceholder}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {t.location_website}
        </label>
        <input
          type="url"
          value={form.website || ""}
          onChange={(e) => onChange({ ...form, website: e.target.value })}
          placeholder={t.location_form_websitePlaceholder}
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t.location_aligners}
        </label>
        <AlignerBrandsField
          brands={form.alignerBrands ?? []}
          onChange={(brands) => onChange({ ...form, alignerBrands: brands })}
          locale={locale}
        />
      </div>

      <CheckboxField
        label={t.hideCard}
        value={!!form.hidden}
        onChange={(checked) => onChange({ ...form, hidden: checked })}
      />
    </div>
  );
}
