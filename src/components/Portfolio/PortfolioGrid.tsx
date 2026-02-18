
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Section from "@/components/UI/Section";
import ProjectCard from "./ProjectCard";
import { ProjectType } from "./types";
import { projectsData } from "./data";

interface PortfolioGridProps {
  categories: string[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <Section className="py-12 md:py-20">
      <Tabs defaultValue="All" className="w-full">
        <div className="flex justify-center mb-6 md:mb-10 overflow-x-auto pb-2">
          <TabsList className="bg-muted/30 p-1 rounded-full flex-nowrap">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="rounded-full px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                setSelectedProject={setSelectedProject} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Section>
  );
};

export default PortfolioGrid;
