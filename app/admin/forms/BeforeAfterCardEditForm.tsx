import { ImagePickerField } from "../fields/ImagePickerField/ImagePickerField";
import { asBeforeAfterItem } from "../shared/cardHelpers";

type BeforeAfterCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function BeforeAfterCardEditForm({
  item,
  index,
  onUpdate,
}: BeforeAfterCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const ba = asBeforeAfterItem(item);

  return (
    <>
      <ImagePickerField
        label="Före-bild"
        value={ba.before || ""}
        onChange={(v) => update("before", v)}
        defaultFolder="before-after"
      />
      <ImagePickerField
        label="Efter-bild"
        value={ba.after || ""}
        onChange={(v) => update("after", v)}
        defaultFolder="before-after"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!ba.hidden}
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
