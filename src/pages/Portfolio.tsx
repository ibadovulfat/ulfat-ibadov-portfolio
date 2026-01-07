
import React from "react";
import HeroSection from "@/components/Portfolio/HeroSection";
import PortfolioGrid from "@/components/Portfolio/PortfolioGrid";
import PortfolioCTA from "@/components/Portfolio/PortfolioCTA";
import { categories } from "@/components/Portfolio/data";

const Portfolio: React.FC = () => {
  return (
    <div className="max-w-[100vw] overflow-x-hidden">
      <HeroSection />
      <PortfolioGrid categories={categories} />
      <PortfolioCTA />
    </div>
  );
};

export default Portfolio;
