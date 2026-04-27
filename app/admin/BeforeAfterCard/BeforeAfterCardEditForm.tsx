import { ImagePickerField } from "../fields/ImagePickerField/ImagePickerField";
import { HideCheckbox } from "../fields/HideCheckbox/HideCheckbox";
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
      <HideCheckbox
        checked={!!ba.hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
