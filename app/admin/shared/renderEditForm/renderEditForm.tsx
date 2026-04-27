import { ServiceCardEditForm } from "../../forms/ServiceCardEditForm";
import { AlignerCardEditForm } from "../../forms/AlignerCardEditForm";
import { AdvantageCardEditForm } from "../../forms/AdvantageCardEditForm";
import { ProcessCardEditForm } from "../../forms/ProcessCardEditForm";
import { DMCardEditForm } from "../../forms/DMCardEditForm";
import { FAQCardEditForm } from "../../forms/FAQCardEditForm";
import { MythCardEditForm } from "../../forms/MythCardEditForm";
import { NewsCardEditForm } from "../../forms/NewsCardEditForm";
import { BeforeAfterCardEditForm } from "../../forms/BeforeAfterCardEditForm";

type RenderEditFormProps = {
  sectionKey: string;
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
  allItems: Array<Record<string, unknown>>;
};

export function renderEditForm({
  sectionKey,
  item,
  index,
  locale,
  onUpdate,
  allItems,
}: RenderEditFormProps) {
  switch (sectionKey) {
    case "services":
      return (
        <ServiceCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
          allItems={allItems}
        />
      );
    case "aligners":
      return (
        <AlignerCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
        />
      );
    case "advantages":
      return (
        <AdvantageCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
        />
      );
    case "process":
      return (
        <ProcessCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
        />
      );
    case "dm":
      return (
        <DMCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
        />
      );
    case "faq":
      return (
        <FAQCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
        />
      );
    case "myths":
      return (
        <MythCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
        />
      );
    case "news":
      return (
        <NewsCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
        />
      );
    case "beforeAfter":
      return (
        <BeforeAfterCardEditForm
          item={item}
          index={index}
          locale={locale}
          onUpdate={onUpdate}
        />
      );
    default:
      return null;
  }
}
