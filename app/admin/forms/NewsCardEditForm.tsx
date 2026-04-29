import { Field } from "../fields/Field/Field";
import { ADMIN_TRANSLATIONS } from "../shared/translations";
import { ImagePickerField } from "../fields/ImagePickerField/ImagePickerField";
import { CheckboxField } from "../fields/CheckboxField/CheckboxField";
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
  const t = ADMIN_TRANSLATIONS[locale];
  const localData = (item[locale] || {}) as Record<string, string>;
  const ns = asNewsItem(item);

  return (
    <>
      <Field
        label={t.tag}
        value={localData.tag || ""}
        onChange={(v) => update(`${locale}.tag`, v)}
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {t.news_tagColor}
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
        label={t.date}
        value={localData.date || ""}
        onChange={(v) => update(`${locale}.date`, v)}
      />
      <Field
        label={t.title}
        value={localData.title || ""}
        onChange={(v) => update(`${locale}.title`, v)}
      />
      <Field
        label={t.description}
        value={localData.desc || ""}
        onChange={(v) => update(`${locale}.desc`, v)}
        multiline
      />
      <ImagePickerField
        label={t.news_imageLabel}
        value={ns.image || ""}
        onChange={(v) => update("image", v)}
        defaultFolder="news"
        locale={locale}
      />
      <Field
        label={t.news_fulltext}
        value={localData.body || ""}
        onChange={(v) => update(`${locale}.body`, v)}
        multiline
        large
      />
      <CheckboxField
        label={t.hideCard}
        value={!!ns.hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
