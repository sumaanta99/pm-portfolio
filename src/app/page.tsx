import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { CaseStudies } from "@/components/CaseStudies";
import { Blog } from "@/components/Blog";
import { Skills } from "@/components/Skills";
import { OnShelf } from "@/components/OnShelf";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <CaseStudies />
        <Skills />
        <Blog />
        <OnShelf />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
