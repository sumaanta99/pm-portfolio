import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { DeferredHomeSections } from "@/components/DeferredHomeSections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DeferredHomeSections />
      </main>
      <Footer />
    </>
  );
}
