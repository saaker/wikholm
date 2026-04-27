import { Field } from "../fields/Field/Field";
import { ImagePickerField } from "../fields/ImagePickerField/ImagePickerField";
import { HideCheckbox } from "../fields/HideCheckbox/HideCheckbox";
import { inputCls } from "../shared/adminTypes";
import { NEWS_COLORS } from "@/lib/sectionsDefaults";
import { asNewsItem } from "../shared/cardHelpers";

type NewsCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function NewsCardEditForm({
  item,
  index,
  locale,
  onUpdate,
}: NewsCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const localData = (item[locale] || {}) as Record<string, string>;
  const ns = asNewsItem(item);

  return (
    <>
      <HideCheckbox
        checked={!!ns.hidden}
        onChange={(checked) => update("hidden", checked)}
      />
      <Field
        label="Tagg"
        value={localData.tag || ""}
        onChange={(v) => update(`${locale}.tag`, v)}
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Tagg färg
        </label>
        <select
          value={ns.color}
          onChange={(e) => update("color", e.target.value)}
          className={inputCls}
        >
          {NEWS_COLORS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <Field
        label="Datum"
        value={localData.date || ""}
        onChange={(v) => update(`${locale}.date`, v)}
      />
      <Field
        label="Titel"
        value={localData.title || ""}
        onChange={(v) => update(`${locale}.title`, v)}
      />
      <Field
        label="Beskrivning"
        value={localData.desc || ""}
        onChange={(v) => update(`${locale}.desc`, v)}
        multiline
      />
      <ImagePickerField
        label="Bild (visas i modal)"
        value={ns.image || ""}
        onChange={(v) => update("image", v)}
        defaultFolder="news"
      />
      <Field
        label="Fulltext (visas i modal)"
        value={localData.body || ""}
        onChange={(v) => update(`${locale}.body`, v)}
        multiline
        large
      />
    </>
  );
}
