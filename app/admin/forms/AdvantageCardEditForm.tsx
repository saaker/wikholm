import { Field } from "../fields/Field/Field";
import { HideCheckbox } from "../fields/HideCheckbox/HideCheckbox";

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
  const localData = (item[locale] || {}) as Record<string, string>;
  const hidden = item.hidden as boolean | undefined;

  return (
    <>
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
      <HideCheckbox
        checked={!!hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
