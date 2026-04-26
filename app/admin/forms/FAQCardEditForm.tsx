import { Field } from "../fields/Field/Field";
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
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!faq.hidden}
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
