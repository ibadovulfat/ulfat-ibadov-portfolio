
import React from "react";
import HeroSection from "@/components/Portfolio/HeroSection";
import PortfolioGrid from "@/components/Portfolio/PortfolioGrid";
import PortfolioCTA from "@/components/Portfolio/PortfolioCTA";
import { categories } from "@/components/Portfolio/data";
import Seo from "@/components/SEO/Seo";

const Portfolio: React.FC = () => {
  return (
    <div className="max-w-[100vw] overflow-x-hidden">
      <Seo
        title="Portfolio | Ulfat Ibadov - Offensive Security Projects & Certifications"
        description="Selected penetration testing projects, security research (ShadowLab), CPENT practice-range reports, and EC-Council certifications by Ulfat Ibadov."
        path="/portfolio"
        keywords="penetration testing portfolio, red team projects, CPENT, CEH, offensive security certifications, ShadowLab"
      />
      <HeroSection />
      <PortfolioGrid categories={categories} />
      <PortfolioCTA />
    </div>
  );
};

export default Portfolio;
