
import React from "react";
import Section from "@/components/UI/Section";

const PortfolioCTA: React.FC = () => {
  return (
    <Section className="bg-secondary/50 py-20 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-4">
          Interested in working together?
        </h2>
        <p className="text-muted-foreground mb-8">
          Let's collaborate on your next project and create something amazing together.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-md text-sm font-medium"
        >
          Get in Touch
        </a>
      </div>
    </Section>
  );
};

export default PortfolioCTA;
