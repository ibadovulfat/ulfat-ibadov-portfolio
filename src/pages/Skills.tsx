
import React from "react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";
import { Link } from "react-router-dom";

const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: "Design",
      description: "My design skills focus on creating visually appealing and user-friendly interfaces that enhance user experience.",
      skills: [
        { name: "UI/UX Design", level: 95, details: "Creating intuitive user interfaces and comprehensive user experiences" },
        { name: "Visual Design", level: 90, details: "Crafting visually appealing layouts, typography, and color schemes" },
        { name: "Interaction Design", level: 85, details: "Designing engaging interactions and micro-animations" },
        { name: "Wireframing", level: 95, details: "Creating structural blueprints for digital products" },
        { name: "Prototyping", level: 90, details: "Building interactive prototypes to test and validate designs" },
        { name: "User Research", level: 80, details: "Conducting interviews, surveys, and usability tests" },
        { name: "Design Systems", level: 85, details: "Creating and maintaining scalable design systems" },
        { name: "Information Architecture", level: 80, details: "Organizing and structuring content for optimal user navigation" }
      ]
    },
    {
      category: "Development",
      description: "My development skills enable me to implement designs with clean, efficient code that ensures optimal performance.",
      skills: [
        { name: "HTML5", level: 95, details: "Writing semantic, accessible markup" },
        { name: "CSS3/SASS", level: 90, details: "Creating responsive layouts and animations" },
        { name: "JavaScript", level: 85, details: "Building interactive features and functionality" },
        { name: "React", level: 80, details: "Developing component-based user interfaces" },
        { name: "TypeScript", level: 75, details: "Implementing type-safe JavaScript applications" },
        { name: "Responsive Design", level: 95, details: "Ensuring optimal viewing across all devices" },
        { name: "Web Accessibility", level: 80, details: "Creating inclusive experiences for all users" },
        { name: "Performance Optimization", level: 75, details: "Improving load times and overall performance" }
      ]
    },
    {
      category: "Tools & Software",
      description: "I am proficient in a variety of industry-standard tools and software that support my design and development work.",
      skills: [
        { name: "Figma", level: 95, details: "Creating designs, prototypes, and design systems" },
        { name: "Adobe Creative Suite", level: 85, details: "Photoshop, Illustrator, XD, and After Effects" },
        { name: "Sketch", level: 80, details: "Designing user interfaces and digital products" },
        { name: "InVision", level: 85, details: "Creating interactive prototypes and presentations" },
        { name: "VS Code", level: 90, details: "Writing and editing code efficiently" },
        { name: "Git/GitHub", level: 75, details: "Version control and collaboration" },
        { name: "Notion", level: 80, details: "Project management and documentation" },
        { name: "Framer", level: 70, details: "Advanced prototyping and micro-interactions" }
      ]
    },
    {
      category: "Soft Skills",
      description: "Beyond technical abilities, I possess strong soft skills that enhance collaboration and project outcomes.",
      skills: [
        { name: "Communication", level: 90, details: "Clear and effective verbal and written communication" },
        { name: "Project Management", level: 85, details: "Planning, organizing, and executing projects efficiently" },
        { name: "Problem Solving", level: 90, details: "Identifying issues and developing creative solutions" },
        { name: "Teamwork", level: 95, details: "Collaborating effectively with cross-functional teams" },
        { name: "Adaptability", level: 85, details: "Quickly adjusting to new tools, technologies, and situations" },
        { name: "Time Management", level: 80, details: "Prioritizing tasks and meeting deadlines consistently" },
        { name: "Attention to Detail", level: 90, details: "Ensuring accuracy and quality in all deliverables" },
        { name: "Creativity", level: 85, details: "Generating innovative ideas and approaches" }
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section fullHeight className="flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <ParallaxEffect speed={0.1} direction="up">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-4">
              Skills
            </span>
            <h1 className="section-heading mb-6">
              My Expertise & Capabilities
            </h1>
            <p className="section-subheading max-w-2xl mx-auto">
              A comprehensive overview of my technical and professional skills across various domains.
            </p>
          </ParallaxEffect>
        </div>
      </Section>

      {/* Skills Sections */}
      {skillCategories.map((category, index) => (
        <Section 
          key={index} 
          className={index % 2 === 0 ? "py-24" : "py-24 bg-secondary/50"}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">{category.category}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              {category.skills.map((skill, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">{skill.details}</p>
                    </div>
                    <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* Additional Skills & Interests */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Additional Skills & Interests</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Beyond my core competencies, I'm passionate about various other areas that complement my professional skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "3D Modeling",
                description: "Creating three-dimensional digital models and environments for interactive experiences."
              },
              {
                title: "Motion Graphics",
                description: "Designing animated visual elements to enhance user engagement and storytelling."
              },
              {
                title: "Photography",
                description: "Capturing and editing images to support visual design and content creation."
              },
              {
                title: "Content Strategy",
                description: "Planning, developing, and managing content to achieve business objectives."
              },
              {
                title: "SEO",
                description: "Optimizing digital content to improve visibility in search engine results."
              },
              {
                title: "Digital Marketing",
                description: "Utilizing digital channels to promote products, services, and brands."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-background rounded-lg border border-border p-6 hover-lift"
              >
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Certifications & Continuous Learning */}
      <Section className="bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Certifications & Continuous Learning</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              I'm committed to ongoing professional development and staying current with industry trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "UX Design Certification",
                issuer: "Nielsen Norman Group",
                date: "2020",
                description: "Comprehensive program covering UX research methods, information architecture, and interaction design."
              },
              {
                title: "Front-End Web Developer Nanodegree",
                issuer: "Udacity",
                date: "2019",
                description: "Advanced program focusing on modern front-end development techniques and frameworks."
              },
              {
                title: "Interaction Design Foundation Certification",
                issuer: "Interaction Design Foundation",
                date: "2018",
                description: "In-depth study of interaction design principles and practices."
              },
              {
                title: "Professional Scrum Master I",
                issuer: "Scrum.org",
                date: "2018",
                description: "Certification in Scrum framework and agile project management methodologies."
              }
            ].map((cert, index) => (
              <div 
                key={index}
                className="flex gap-4 p-6 bg-background rounded-lg border border-border hover-lift"
              >
                <div className="mt-1 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v10M8 13l4-4 4 4M8 6h8M8 9h8M10 16h4M12 16v5" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{cert.title}</h3>
                  <div className="flex items-center text-sm mb-2">
                    <span>{cert.issuer}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{cert.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-semibold mb-4">
            Let's Put These Skills to Work
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm ready to apply my expertise to help you achieve your goals. Let's discuss how my skills can benefit your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent transition-all duration-300 rounded-md text-sm font-medium"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-md text-sm font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Skills;
