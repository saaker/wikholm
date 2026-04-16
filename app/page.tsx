import type { Metadata } from "next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/for-dentists/About";
import Services from "./components/for-dentists/Services";
import Advantages from "./components/for-dentists/Advantages";
import News from "./components/for-dentists/News";
import Footer from "./components/Footer";
import { pageMetadata, getServiceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  openGraph: {
    title: pageMetadata.home.openGraph.title,
    description: pageMetadata.home.openGraph.description,
  },
};

export default async function Home() {
  const serviceSchema = getServiceSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Advantages />
        <News />
      </main>
      <Footer />
    </>
  );
}
