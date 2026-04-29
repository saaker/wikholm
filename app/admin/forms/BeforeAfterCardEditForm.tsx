import { ImagePickerField } from "../fields/ImagePickerField/ImagePickerField";
import { CheckboxField } from "../fields/CheckboxField/CheckboxField";
import { asBeforeAfterItem } from "../shared/cardHelpers";
import { ADMIN_TRANSLATIONS } from "../shared/translations";

type BeforeAfterCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function BeforeAfterCardEditForm({
  item,
  index,
  locale,
  onUpdate,
}: BeforeAfterCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const ba = asBeforeAfterItem(item);
  const t = ADMIN_TRANSLATIONS[locale];

  return (
    <>
      <ImagePickerField
        label={t.beforeAfter_beforeImage}
        value={ba.before || ""}
        onChange={(v) => update("before", v)}
        defaultFolder="before-after"
        locale={locale}
      />
      <ImagePickerField
        label={t.beforeAfter_afterImage}
        value={ba.after || ""}
        onChange={(v) => update("after", v)}
        defaultFolder="before-after"
        locale={locale}
      />
      <CheckboxField
        label={t.hideCard}
        value={!!ba.hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
