import { Field } from "./fields/Field/Field";
import { asMythItem } from "./shared/cardHelpers";

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
  const localData = (item[locale] || {}) as Record<string, string>;
  const myth = asMythItem(item);

  return (
    <>
      <Field
        label="Myt"
        value={localData.myth || ""}
        onChange={(v) => update(`${locale}.myth`, v)}
      />
      <Field
        label="Sanning"
        value={localData.truth || ""}
        onChange={(v) => update(`${locale}.truth`, v)}
        multiline
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!myth.hidden}
          onChange={(e) => update("hidden", e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary"
        />
        <span className="font-medium text-foreground">
          Dold (visas inte på sidan)
        </span>
      </label>
    </>
  );
}
