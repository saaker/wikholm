import { Field } from "../fields/Field/Field";
import { IconPicker } from "../fields/IconPicker/IconPicker";
import { HideCheckbox } from "../fields/HideCheckbox/HideCheckbox";
import { asServiceItem } from "../shared/cardHelpers";

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

  const hasOtherHighlight = Boolean(
    allItems?.some(
      (otherItem, idx) => idx !== index && asServiceItem(otherItem).highlight
    )
  );

  return (
    <>
      <IconPicker value={svc.icon} onChange={(v) => update("icon", v)} />
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
      <Field
        label="Tagg"
        value={localData.tag || ""}
        onChange={(v) => update(`${locale}.tag`, v)}
      />
      <Field
        label="Pris"
        value={localData.price || ""}
        onChange={(v) => update(`${locale}.price`, v)}
      />
      <Field
        label="Klick-text (för case assessment)"
        value={localData.clickPrompt || ""}
        onChange={(v) => update(`${locale}.clickPrompt`, v)}
        placeholder={locale === "sv" ? "Se hur du skickar ditt fall" : "See how to submit your case"}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={svc.highlight}
          onChange={(e) => update("highlight", e.target.checked)}
          className="rounded"
          disabled={hasOtherHighlight && !svc.highlight}
        />
        <span className={hasOtherHighlight && !svc.highlight ? "line-through" : ""}>
          Markera som highlight
        </span>
        {hasOtherHighlight && !svc.highlight && (
          <span className="text-xs text-muted-dark">
            (En annan tjänst är redan markerad som highlight)
          </span>
        )}
      </label>
      <HideCheckbox
        checked={!!svc.hidden}
        onChange={(checked) => update("hidden", checked)}
      />
    </>
  );
}
