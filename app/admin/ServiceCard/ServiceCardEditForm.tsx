import { Field } from "../fields/Field/Field";
import { IconPicker } from "../fields/IconPicker/IconPicker";
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
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!svc.hidden}
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
