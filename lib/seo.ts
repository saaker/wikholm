import type { Metadata } from "next";

const SITE_URL = "https://wikholmort.com";
const SITE_NAME = "Wikholm Ortodonti";

export const defaultMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wikholm Ortodonti — Specialist i Ortodonti & Aligners",
    template: "%s | Wikholm Ortodonti",
  },
  description:
    "Specialist inom ortodonti med fokus på alignerbehandling (Invisalign, ClearCorrect). Kostnadsfri case assessment, TPS och Clinical Advisor. Kliniker i Stockholm.",
  keywords: [
    "ortodonti",
    "aligners",
    "invisalign",
    "clearcorrect",
    "tandreglering",
    "genomskinliga skenor",
    "tandställning",
    "ortodontist stockholm",
    "specialist ortodonti",
    "tps",
    "treatment planning",
    "case assessment",
    "dental monitoring",
    "andré wikholm",
  ],
  authors: [{ name: "André Wikholm" }],
  creator: "Wikholm Ortodonti AB",
  publisher: "Wikholm Ortodonti AB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Wikholm Ortodonti — Specialist i Ortodonti & Aligners",
    description:
      "Specialist inom ortodonti med fokus på alignerbehandling. Kostnadsfri case assessment och TPS för tandläkare.",
    images: [
      {
        url: "/images/og-image.jpg", // We'll create this
        width: 1200,
        height: 630,
        alt: "Wikholm Ortodonti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wikholm Ortodonti — Specialist i Ortodonti & Aligners",
    description:
      "Specialist inom ortodonti med fokus på alignerbehandling. Kostnadsfri case assessment och TPS för tandläkare.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add when you get these from Google Search Console
    // google: 'your-google-verification-code',
  },
} satisfies Metadata;

// Page-specific metadata
export const pageMetadata = {
  home: {
    title: "Hem",
    description:
      "Specialist inom ortodonti med fokus på alignerbehandling. Erbjuder kostnadsfri case assessment, TPS och Clinical Advisor via ClearCorrect och Invisalign.",
    openGraph: {
      title: "Wikholm Ortodonti — Specialist i Ortodonti & Aligners",
      description:
        "Specialist inom ortodonti med fokus på alignerbehandling. Kostnadsfri case assessment och TPS för tandläkare.",
    },
  },
  patients: {
    title: "För Patienter — Alignerbehandling",
    description:
      "Information om alignerbehandling (genomskinliga skenor) — vad det är, hur det fungerar, kostnad och var du kan boka tid. Invisalign och ClearCorrect i Stockholm.",
    keywords: [
      "aligners",
      "genomskinliga skenor",
      "invisalign",
      "clearcorrect",
      "tandreglering",
      "boka tid ortodonti stockholm",
      "räta tänder",
      "tandställning vuxen",
      "dental monitoring",
    ],
    openGraph: {
      title: "Alignerbehandling — Information för Patienter",
      description:
        "Lär dig mer om alignerbehandling med genomskinliga skenor. Boka tid på våra kliniker i Stockholm.",
    },
  },
} as const;

// Structured data (JSON-LD) for rich snippets
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Wikholm Ortodonti AB",
  description:
    "Specialist inom ortodonti med fokus på alignerbehandling (Invisalign, ClearCorrect)",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  email: "Andre.Wikholm@WikholmOrt.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SE",
    addressRegion: "Stockholm",
  },
  sameAs: [
    "https://www.instagram.com/wikholmort/",
    "https://www.linkedin.com/in/andr%C3%A9-w-879b9b80/",
    "https://www.linkedin.com/company/wikholm-ortodonti-ab/",
  ],
  founder: {
    "@type": "Person",
    name: "André Wikholm",
    jobTitle: "Specialist i Ortodonti",
  },
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Sweden",
  },
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": SITE_URL,
  name: "Wikholm Ortodonti",
  provider: {
    "@type": "Dentist",
    name: "André Wikholm",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ortodontiska tjänster",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Kostnadsfri Case Assessment",
          description:
            "Professionell bedömning av ortodontiska fall med rekommendationer",
        },
        price: "0",
        priceCurrency: "SEK",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Treatment Planning Service (TPS)",
          description: "Fullständig ortodontisk behandlingsplanering",
        },
        price: "2500",
        priceCurrency: "SEK",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Alignerbehandling",
          description: "Genomskinliga skenor (Invisalign, ClearCorrect)",
        },
      },
    ],
  },
});

export const getFAQSchema = (faqItems: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});
