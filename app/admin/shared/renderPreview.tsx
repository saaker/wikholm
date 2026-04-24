import { ServiceCardPreview } from "../ServiceCard/ServiceCardPreview";
import { AlignerCardPreview } from "../AlignerCard/AlignerCardPreview";
import { AdvantageCardPreview } from "../AdvantageCard/AdvantageCardPreview";
import { ProcessCardPreview } from "../ProcessCard/ProcessCardPreview";
import { DMCardPreview } from "../DMCard/DMCardPreview";
import { BeforeAfterCardPreview } from "../BeforeAfterCard/BeforeAfterCardPreview";
import { FAQCard } from "../../components/for-patients/FAQ/FAQCard";
import { MythCard } from "../../components/for-patients/MythsTruths/MythCard";
import { NewsCard } from "../../components/for-dentists/News/NewsCard";
import type {
  ServiceItem,
  AlignerItem,
  AdvantageItem,
  ProcessItem,
  DMItem,
  FAQItem,
  MythItem,
  NewsItem,
  BeforeAfterItem,
} from "@/lib/sectionsDefaults";

export function renderPreview(
  key: string,
  item: Record<string, unknown>,
  i: number,
  locale: "sv" | "en",
) {
  switch (key) {
    case "services":
      return (
        <ServiceCardPreview
          item={item as unknown as ServiceItem}
          locale={locale}
        />
      );
    case "aligners":
      return (
        <AlignerCardPreview
          item={item as unknown as AlignerItem}
          locale={locale}
        />
      );
    case "advantages":
      return (
        <AdvantageCardPreview
          item={item as unknown as AdvantageItem}
          locale={locale}
        />
      );
    case "process":
      return (
        <ProcessCardPreview
          item={item as unknown as ProcessItem}
          index={i}
          locale={locale}
        />
      );
    case "dm":
      return <DMCardPreview item={item as unknown as DMItem} locale={locale} />;
    case "faq":
      return (
        <FAQCard
          item={item as unknown as FAQItem}
          locale={locale}
          isOpen={true}
        />
      );
    case "myths": {
      return (
        <MythCard
          item={item as unknown as MythItem}
          locale={locale}
          isOpen={true}
          mythLabel={locale === "sv" ? "MYT" : "MYTH"}
          truthLabel={locale === "sv" ? "SANNING" : "TRUTH"}
        />
      );
    }
    case "news":
      return (
        <NewsCard article={item as unknown as NewsItem} locale={locale} />
      );
    case "beforeAfter":
      return (
        <BeforeAfterCardPreview item={item as unknown as BeforeAfterItem} />
      );
    default:
      return null;
  }
}
