import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import News from "./components/News";
import Footer from "./components/Footer";

export default async function Home() {
  return (
    <>
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
