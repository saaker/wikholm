import { Field } from "../fields/Field/Field";
import { IconPicker } from "../fields/IconPicker/IconPicker";
import { CheckboxField } from "../fields/CheckboxField/CheckboxField";
import { asServiceItem } from "../shared/cardHelpers";
import { ADMIN_TRANSLATIONS } from "../shared/translations";

type ServiceCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
  allItems: Array<Record<string, unknown>>;
};

export function ServiceCardEditForm({
  item,
  index,
  locale,
  onUpdate,
  allItems,
}: ServiceCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const localData = (item[locale] || {}) as Record<string, string>;
  const svc = asServiceItem(item);
  const t = ADMIN_TRANSLATIONS[locale];

  const hasOtherHighlight = Boolean(
    allItems?.some(
      (otherItem, idx) => idx !== index && asServiceItem(otherItem).highlight
    )
  );

  return (
    <>
      <IconPicker value={svc.icon} onChange={(v) => update("icon", v)} />
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
      <Field
        label={t.tag}
        value={localData.tag || ""}
        onChange={(v) => update(`${locale}.tag`, v)}
      />
      <Field
        label={t.price}
        value={localData.price || ""}
        onChange={(v) => update(`${locale}.price`, v)}
      />
      <Field
        label={t.service_clickPrompt}
        value={localData.clickPrompt || ""}
        onChange={(v) => update(`${locale}.clickPrompt`, v)}
        placeholder={t.service_clickPromptPlaceholder}
      />
      <CheckboxField
        label={t.service_highlightLabel}
        value={svc.highlight}
        onChange={(checked) => update("highlight", checked)}
        disabled={hasOtherHighlight && !svc.highlight}
        helperText={hasOtherHighlight && !svc.highlight ? t.service_highlightHelper : undefined}
      />
      <CheckboxField
        label={t.service_disableModal}
        value={!!svc.modalDisabled}
        onChange={(checked) => update("modalDisabled", checked)}
      />
      <CheckboxField
        label={t.hideCard}
        value={!!svc.hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
