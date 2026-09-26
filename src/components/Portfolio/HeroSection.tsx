import React from "react";
import PageHero from "@/components/UI/PageHero";

const HeroSection: React.FC = () => {
  return (
    <PageHero
      eyebrow="Portfolio"
      title={<>Showcasing My <span className="text-red-500">Work</span> & Certifications</>}
      subtitle="A collection of projects, certifications, and lab environments that demonstrate my cybersecurity and development expertise."
    />
  );
};

export default HeroSection;
