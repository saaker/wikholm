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

export const dynamic = "force-dynamic";

export default async function PatientPage() {
  const locations = await getLocations();

  return (
    <>
      <Header variant="patient" />
      <main className="flex-1">
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
