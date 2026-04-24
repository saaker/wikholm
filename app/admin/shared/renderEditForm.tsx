import { ServiceCardEditForm } from "../ServiceCard/ServiceCardEditForm";
import { AlignerCardEditForm } from "../AlignerCard/AlignerCardEditForm";
import { AdvantageCardEditForm } from "../AdvantageCard/AdvantageCardEditForm";
import { ProcessCardEditForm } from "../ProcessCardEditForm";
import { DMCardEditForm } from "../DMCard/DMCardEditForm";
import { FAQCardEditForm } from "../FAQCardEditForm";
import { MythCardEditForm } from "../MythCardEditForm";
import { NewsCardEditForm } from "../NewsCardEditForm";
import { BeforeAfterCardEditForm } from "../BeforeAfterCard/BeforeAfterCardEditForm";

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
