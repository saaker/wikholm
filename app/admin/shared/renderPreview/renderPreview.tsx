import { ServiceCard } from "../../../components/for-dentists/ServiceCard/ServiceCard";
import { AlignerCard } from "../../../components/for-patients/AlignerCard/AlignerCard";
import { AdvantageCard } from "../../../components/for-dentists/AdvantageCard/AdvantageCard";
import { ProcessCard } from "../../../components/for-patients/ProcessCard/ProcessCard";
import { DMCard } from "../../../components/for-patients/DMCard/DMCard";
import { BeforeAfterCard } from "../../../components/for-patients/BeforeAfterCard/BeforeAfterCard";
import { FAQCard } from "../../../components/for-patients/FAQ/FAQCard";
import { MythCard } from "../../../components/for-patients/MythsTruths/MythCard";
import { NewsCard } from "../../../components/for-dentists/News/NewsCard";
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
  onCaseAssessmentClick?: () => void,
) {
  switch (key) {
    case "services": {
      const isCaseAssessment = (item as unknown as ServiceItem).id === "case";
      return (
        <ServiceCard
          item={item as unknown as ServiceItem}
          locale={locale}
          preview
          onClick={isCaseAssessment ? onCaseAssessmentClick : undefined}
          showClickPrompt={isCaseAssessment}
        />
      );
    }
    case "aligners":
      return (
        <AlignerCard item={item as unknown as AlignerItem} locale={locale} />
      );
    case "advantages":
      return (
        <div className="py-3">
          <AdvantageCard
            item={item as unknown as AdvantageItem}
            locale={locale}
            preview
          />
        </div>
      );
    case "process": {
      const number = String(i + 1).padStart(2, "0");
      return (
        <div className="py-3">
          <ProcessCard
            step={item as unknown as ProcessItem}
            locale={locale}
            number={number}
          />
        </div>
      );
    }
    case "dm":
      return (
        <div className="py-3">
          <DMCard item={item as unknown as DMItem} locale={locale} preview />
        </div>
      );
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
        <BeforeAfterCard
          item={item as unknown as BeforeAfterItem}
          beforeLabel={locale === "sv" ? "FÖRE" : "BEFORE"}
          afterLabel={locale === "sv" ? "EFTER" : "AFTER"}
          noImageText={locale === "sv" ? "Ingen bild" : "No image"}
          preview
        />
      );
    default:
      return null;
  }
}
