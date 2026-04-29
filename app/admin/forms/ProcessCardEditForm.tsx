import { Field } from "../fields/Field/Field";
import { ADMIN_TRANSLATIONS } from "../shared/translations";

type ProcessCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function ProcessCardEditForm({
  item,
  index,
  locale,
  onUpdate,
}: ProcessCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const t = ADMIN_TRANSLATIONS[locale];
  const localData = (item[locale] || {}) as Record<string, string>;

  return (
    <>
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
    </>
  );
}
