import Hero     from "@/components/Hero";
import Services from "@/components/Services";
import Skills   from "@/components/Skills";
import CTA      from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="section-divider" />
      <Services />

      <div className="section-divider" />
      <Skills />

      <div className="section-divider" />
      <CTA />
    </>
  );
}
