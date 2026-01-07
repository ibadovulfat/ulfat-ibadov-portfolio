
import React from "react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";

const HeroSection: React.FC = () => {
  return (
    <Section fullHeight className="flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <ParallaxEffect speed={0.1} direction="up">
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-4">
            Portfolio
          </span>
          <h1 className="section-heading mb-6">
            Showcasing My Work & Certifications
          </h1>
          <p className="section-subheading max-w-2xl mx-auto">
            A collection of projects, certifications, and lab environments that demonstrate my cybersecurity and development expertise.
          </p>
        </ParallaxEffect>
      </div>
    </Section>
  );
};

export default HeroSection;
