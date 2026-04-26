import { Field } from "../fields/Field/Field";
import { IconPicker } from "../fields/IconPicker/IconPicker";
import { CheckboxField } from "../fields/CheckboxField/CheckboxField";
import { asAlignerItem } from "../shared/cardHelpers";

type AlignerCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function AlignerCardEditForm({
  item,
  index,
  locale,
  onUpdate,
}: AlignerCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const localData = (item[locale] || {}) as Record<string, string>;
  const al = asAlignerItem(item);

  return (
    <>
      <IconPicker value={al.icon} onChange={(v) => update("icon", v)} />
      <CheckboxField
        label="Dölj kort"
        value={al.hidden ?? false}
        onChange={(v) => update("hidden", v)}
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
    </>
  );
}
