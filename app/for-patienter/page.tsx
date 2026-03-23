import Header from "../components/Header";
import Hero from "../components/Hero";
import Aligners from "../components/Aligners";
import MythsTruths from "../components/MythsTruths";
import Process from "../components/Process";
import Locations from "../components/Locations";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { getLocations } from "@/lib/locations";

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
          ctaHref="#locations"
          secondaryKey="patientHeroSecondary"
          secondaryHref="#aligners"
        />
        <Aligners />
        <MythsTruths />
        <Process />
        <Locations locations={locations} />
        <FAQ />
      </main>
      <Footer variant="patient" />
    </>
  );
}
