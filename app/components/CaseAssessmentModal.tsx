"use client";

import { useI18n } from "./I18nProvider";
import { useEffect } from "react";

interface CaseAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseAssessmentModal({
  isOpen,
  onClose,
}: CaseAssessmentModalProps) {
  const { locale } = useI18n();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = {
    sv: {
      title: "Kostnadsfri Case Assessment",
      subtitle: "Få professionell bedömning av ditt fall",
      intro:
        "För att ge dig bästa möjliga bedömning behöver jag fyra specifika bilder av tänderna. Följ instruktionerna nedan:",
      photoTypes: [
        {
          icon: "👈",
          title: "Vänster sida",
          desc: "Tänder i bett från vänster sida (bettsida)",
        },
        {
          icon: "👉",
          title: "Höger sida",
          desc: "Tänder i bett från höger sida (bettsida)",
        },
        {
          icon: "😁",
          title: "Framifrån",
          desc: "Tänder i bett framifrån (synligt leende)",
        },
        {
          icon: "🦷",
          title: "Slutet bett",
          desc: "Läppar stängda, tänder i bett (profilvy)",
        },
      ],
      emailTitle: "Exempel på e-post",
      emailSubject: "Ämne: Kostnadsfri Case Assessment",
      emailBody: `Hej André,

Jag skulle vilja få en kostnadsfri bedömning av ett fall.

Bifogat finner du fyra bilder:
1. Vänster sida (bettsida)
2. Höger sida (bettsida)
3. Framifrån (synligt leende)
4. Slutet bett (profilvy)

[Valfritt: Beskriv eventuella specifika frågor eller bekymmer här]

Med vänliga hälsningar,
[Ditt namn]
[Din klinik]`,
      sendEmail: "Öppna e-postklient",
      close: "Stäng",
      tips: "Tips: Ta tydliga bilder i god belysning för bästa bedömning.",
    },
    en: {
      title: "Free Case Assessment",
      subtitle: "Get professional evaluation of your case",
      intro:
        "To provide you with the best possible assessment, I need four specific photos of the teeth. Follow the instructions below:",
      photoTypes: [
        {
          icon: "👈",
          title: "Left side",
          desc: "Teeth in occlusion from left side (bite view)",
        },
        {
          icon: "👉",
          title: "Right side",
          desc: "Teeth in occlusion from right side (bite view)",
        },
        {
          icon: "😁",
          title: "Front view",
          desc: "Teeth in occlusion from front (visible smile)",
        },
        {
          icon: "🦷",
          title: "Closed bite",
          desc: "Lips closed, teeth in occlusion (profile view)",
        },
      ],
      emailTitle: "Email template example",
      emailSubject: "Subject: Free Case Assessment",
      emailBody: `Hi André,

I would like to request a free case assessment.

Attached you will find four photos:
1. Left side (bite view)
2. Right side (bite view)
3. Front view (visible smile)
4. Closed bite (profile view)

[Optional: Describe any specific questions or concerns here]

Best regards,
[Your name]
[Your clinic]`,
      sendEmail: "Open email client",
      close: "Close",
      tips: "Tip: Take clear photos in good lighting for the best assessment.",
    },
  };

  const t = content[locale];

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      locale === "sv" ? "Kostnadsfri Case Assessment" : "Free Case Assessment"
    );
    const body = encodeURIComponent(t.emailBody);
    window.location.href = `mailto:Andre.Wikholm@WikholmOrt.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label={t.close}
        >
          <svg
            className="w-6 h-6 text-muted-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-2">
              {t.title}
            </h2>
            <p className="text-muted-dark">{t.subtitle}</p>
          </div>

          {/* Introduction */}
          <p className="text-foreground mb-6 leading-relaxed">{t.intro}</p>

          {/* Photo requirements */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {t.photoTypes.map((type, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl bg-muted border border-border/50"
              >
                <div className="text-4xl">{type.icon}</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {i + 1}. {type.title}
                  </h3>
                  <p className="text-sm text-muted-dark">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-primary shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-foreground">{t.tips}</p>
            </div>
          </div>

          {/* Email template */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {t.emailTitle}
            </h3>
            <div className="bg-muted rounded-xl p-4 border border-border/50">
              <p className="text-sm font-medium text-primary mb-2">
                {t.emailSubject}
              </p>
              <pre className="text-sm text-muted-dark whitespace-pre-wrap font-sans">
                {t.emailBody}
              </pre>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSendEmail}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-contrast font-semibold hover:bg-primary-dark transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t.sendEmail}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-border bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
