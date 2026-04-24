import { Field } from "../fields/Field/Field";
import { IconPicker } from "../fields/IconPicker/IconPicker";
import { asDMItem } from "../shared/cardHelpers";

type DMCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function DMCardEditForm({
  item,
  index,
  locale,
  onUpdate,
}: DMCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const localData = (item[locale] || {}) as Record<string, string>;
  const dm = asDMItem(item);

  return (
    <>
      <IconPicker value={dm.icon} onChange={(v) => update("icon", v)} />
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
