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

export default async function Home() {
  const serviceSchema = getServiceSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main id="main-content" className="flex-1">
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
