import { Field } from "../fields/Field/Field";
import { HideCheckbox } from "../fields/HideCheckbox/HideCheckbox";
import { asFAQItem } from "../shared/cardHelpers";

type FAQCardEditFormProps = {
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
};

export function FAQCardEditForm({
  item,
  index,
  locale,
  onUpdate,
}: FAQCardEditFormProps) {
  const update = (path: string, value: string | boolean) => onUpdate(index, path, value);
  const localData = (item[locale] || {}) as Record<string, string>;
  const faq = asFAQItem(item);

  return (
    <>
      <Field
        label="Fråga"
        value={localData.question || ""}
        onChange={(v) => update(`${locale}.question`, v)}
      />
      <Field
        label="Svar"
        value={localData.answer || ""}
        onChange={(v) => update(`${locale}.answer`, v)}
        multiline
      />
      <HideCheckbox
        checked={!!faq.hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
