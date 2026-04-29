import { Field } from "../fields/Field/Field";
import { ADMIN_TRANSLATIONS } from "../shared/translations";
import { CheckboxField } from "../fields/CheckboxField/CheckboxField";

type AdvantageCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function AdvantageCardEditForm({
  item,
  index,
  locale,
  onUpdate,
}: AdvantageCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const t = ADMIN_TRANSLATIONS[locale];
  const localData = (item[locale] || {}) as Record<string, string>;
  const hidden = item.hidden as boolean | undefined;

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
      <CheckboxField
        label={t.hideCard}
        value={!!hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
