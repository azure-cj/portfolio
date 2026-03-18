import Hero      from "@/components/Hero";
import Services   from "@/components/Services";
import Skills     from "@/components/Skills";
import Contact    from "@/components/Contact";
import CTA        from "@/components/CTA";
import Footer     from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="section-divider" />
      <Services />

      <div className="section-divider" />
      <Skills />

      <div className="section-divider" />
      <Contact />

      <div className="section-divider" />
      <CTA />

      <div className="section-divider" />
      <Footer />
    </>
  );
}
