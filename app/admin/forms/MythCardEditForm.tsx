import { Field } from "../fields/Field/Field";
import { ADMIN_TRANSLATIONS } from "../shared/translations";
import { CheckboxField } from "../fields/CheckboxField/CheckboxField";
import { asMythItem } from "../shared/cardHelpers";

type MythCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function MythCardEditForm({
  item,
  index,
  locale,
  onUpdate,
}: MythCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const t = ADMIN_TRANSLATIONS[locale];
  const localData = (item[locale] || {}) as Record<string, string>;
  const myth = asMythItem(item);

  return (
    <>
      <Field
        label={t.myth_label}
        value={localData.myth || ""}
        onChange={(v) => update(`${locale}.myth`, v)}
      />
      <Field
        label={t.truth_label}
        value={localData.truth || ""}
        onChange={(v) => update(`${locale}.truth`, v)}
        multiline
      />
      <CheckboxField
        label={t.hideCard}
        value={!!myth.hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
