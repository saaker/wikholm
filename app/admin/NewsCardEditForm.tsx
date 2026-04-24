import { Field, ImagePickerField } from "./shared/adminComponents";
import { inputCls } from "./shared/adminTypes";
import { NEWS_COLORS } from "@/lib/sectionsDefaults";
import { asNewsItem } from "./shared/cardHelpers";

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
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!ns.hidden}
          onChange={(e) => update("hidden", e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary"
        />
        <span className="font-medium text-foreground">
          Dold (visas inte på sidan)
        </span>
      </label>
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
