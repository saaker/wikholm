import type { Metadata } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Aligners from "../components/for-patients/Aligners";
import MythsTruths from "../components/for-patients/MythsTruths";
import Process from "../components/for-patients/Process";
import DentalMonitoring from "../components/for-patients/DentalMonitoring";
import BeforeAfter from "../components/for-patients/BeforeAfter";
import Locations from "../components/for-patients/Locations";
import FAQ from "../components/for-patients/FAQ";
import Footer from "../components/Footer";
import { getLocations } from "@/lib/locations";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: pageMetadata.patients.title,
  description: pageMetadata.patients.description,
  keywords: [...pageMetadata.patients.keywords],
  openGraph: {
    title: pageMetadata.patients.openGraph.title,
    description: pageMetadata.patients.openGraph.description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wikholm Ortodonti",
      },
    ],
  },
};

export default async function PatientPage() {
  const locations = await getLocations();

  return (
    <>
      <Header variant="patient" />
      <main id="main-content" className="flex-1">
        <Hero
          badgeKey="patientHeroBadge"
          title1Key="patientHeroTitle1"
          title2Key="patientHeroTitle2"
          subtitleKey="patientHeroSubtitle"
          ctaKey="patientHeroCta"
          ctaLinkKey="patientHeroCtaLink"
          secondaryKey="patientHeroSecondary"
          secondaryLinkKey="patientHeroSecondaryLink"
        />
        <Aligners />
        <MythsTruths />
        <Process />
        <DentalMonitoring />
        <BeforeAfter />
        <Locations locations={locations} />
        <FAQ />
      </main>
      <Footer variant="patient" />
    </>
  );
}
