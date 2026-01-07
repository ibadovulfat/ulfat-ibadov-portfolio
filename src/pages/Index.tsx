
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, ExternalLink } from "lucide-react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";
import ScrollIndicator from "@/components/UI/ScrollIndicator";
import HackingAnimation from "@/components/UI/HackingAnimation";
import PenetrationTestingScene from "@/components/UI/PenetrationTestingScene";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";

const featuredProjects = [
  {
    id: 1,
    title: "W|AHS Certification",
    category: "Certificates",
    description: "EC-Council Web Application Hacking and Security certification with a 75% score.",
    tags: ["Web App Security", "OWASP Top 10", "Penetration Testing"],
    image: "/upload/wahs.jpg",
    url: "https://aspen.eccouncil.org/VerifyBadge?&type=certification&a=ed2dGj4Z1ySm68ptiidDS5Rw9ELHIbQnb35B90anBck="
  },
  {
    id: 2,
    title: "ShadowLab Defender Web Simulator",
    category: "Labs",
    description: "AI-driven behavioral telemetry lab for Microsoft Defender and EDR detection research.",
    tags: ["EDR", "Behavioral Detection", "Telemetry", "Offensive Security", "Machine Learning"],
    image: "/upload/proje.jpeg",
    url: "https://github.com/ibadovulfat/shadowlab-detection-lab"
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "Sites",
    description: "Fully responsive and user-friendly personal portfolio website with modern design and optimized performance.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    image: "/upload/site.png",
    url: "https://github.com/ibadovulfat/portfolio-react"
  },
];

const Index: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [openDialog, setOpenDialog] = React.useState<number | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const splitTextIntoChars = () => {
      const headingElement = document.querySelector('.hero-heading') as HTMLElement;
      if (!headingElement) return;
      
      const text = headingElement.innerText;
      const chars = text.split('');
      
      headingElement.innerHTML = chars
        .map(char => char === ' ' 
          ? ' ' 
          : `<span class="char">${char}</span>`)
        .join('');
      
      // Animate the characters with a delay
      const charElements = document.querySelectorAll('.char');
      charElements.forEach((char, index) => {
        setTimeout(() => {
          char.classList.add('animate');
        }, 50 * index);
      });
    };
    
    splitTextIntoChars();
    
    // Add parallax mouse movement effect to hero section
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate the movement percentage (-1 to 1)
      const moveX = (x - windowWidth / 2) / (windowWidth / 2);
      const moveY = (y - windowHeight / 2) / (windowHeight / 2);
      
      // Apply movement to different layers with different intensities
      const layers = heroRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const intensity = (index + 1) * 10;
        const htmlLayer = layer as HTMLElement;
        htmlLayer.style.transform = `translate(${moveX * intensity}px, ${moveY * intensity}px)`;
      });
    };
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  return (
    <>
      <Helmet>
        <title>Ulfat Ibadov | Penetration Testing & Offensive Security Expert</title>
        <meta name="description" content="Professional portfolio of Ulfat Ibadov - specializing in penetration testing, vulnerability assessment, and offensive security solutions to help organizations strengthen their security posture." />
        <meta name="keywords" content="penetration testing, ethical hacking, offensive security, cybersecurity, vulnerability assessment, security consultant, red teaming, exploit development" />
        <meta property="og:title" content="Ulfat Ibadov | Penetration Testing & Offensive Security Expert" />
        <meta property="og:description" content="Professional portfolio showcasing penetration testing expertise, vulnerability assessment services, and offensive security solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://about.surf" />
        <meta property="og:image" content="/lovable-uploads/profile-photo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ulfat Ibadov | Penetration Testing Expert" />
        <meta name="twitter:description" content="Professional portfolio showcasing penetration testing services and security solutions." />
        <link rel="canonical" href="https://about.surf/" />
      </Helmet>

      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Penetration Testing 3D Scene */}
        <div className="absolute inset-0 -z-10">
          <PenetrationTestingScene />
        </div>
        
        {/* Background Hacking Animation with reduced opacity */}
        <div className="absolute inset-0 -z-5 opacity-30">
          <HackingAnimation opacity={0.3} />
        </div>
        
        <div className="absolute inset-0 -z-10">
          {/* Background layers for parallax effect */}
          <div className="absolute inset-0 parallax-layer" style={{ zIndex: 1 }}>
            <div className="absolute top-[20%] left-[20%] h-40 w-40 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-[30%] right-[20%] h-60 w-60 rounded-full bg-primary/5 blur-3xl"></div>
          </div>
          
          <div className="absolute inset-0 parallax-layer" style={{ zIndex: 2 }}>
            <div className="absolute top-[30%] right-[30%] h-20 w-20 rounded-full bg-primary/10 blur-2xl"></div>
            <div className="absolute bottom-[20%] left-[30%] h-32 w-32 rounded-full bg-primary/10 blur-2xl"></div>
          </div>
        </div>
        
        <div className="container px-4 sm:px-6 relative z-10 max-w-full">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <ParallaxEffect speed={0.05} direction="up">
              <h1 className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
                Ulfat Ibadov
              </h1>
            </ParallaxEffect>
            
            <ParallaxEffect speed={0.08} direction="up">
              <div className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                <p className="mb-2">
                  Interested in penetration testing and offensive security, with a focus on finding and understanding real-world vulnerabilities.
                </p> 
              </div>
            </ParallaxEffect>
            
            <ParallaxEffect speed={0.12} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  to="/portfolio"
                  className="group inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-md text-sm font-medium hover:scale-105"
                >
                  Explore My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent transition-all duration-300 rounded-md text-sm font-medium hover:scale-105"
                >
                  Get In Touch
                </Link>
              </div>
            </ParallaxEffect>
          </div>
        </div>
        
        <ScrollIndicator targetId="featured-work" />
      </div>
      
      {/* Featured Work Section */}
      <Section id="featured-work" className="pt-24 pb-32 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="section-heading">Featured Projects</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              A selection of my recent work, showcasing my skills and expertise in design and development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card 
                key={project.id}
                className="group overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="p-0">
                  <div className="aspect-video w-full bg-muted/30 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-background/80 backdrop-blur-sm"
                            onClick={() => setOpenDialog(project.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-display">{project.title}</CardTitle>
                    <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setOpenDialog(project.id)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Project Detail Dialogs */}
            {featuredProjects.map((project) => (
              <Dialog key={project.id} open={openDialog === project.id} onOpenChange={() => setOpenDialog(null)}>
                <DialogContent className="sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-display">{project.title}</DialogTitle>
                    <DialogDescription>
                      <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs mt-2">
                        {project.category}
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Overview</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-muted rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button onClick={() => setOpenDialog(null)}>
                      Close
                    </Button>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="ml-4">
                                            {project.url && (
                                              <a 
                                                href={project.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="ml-4"
                                              >
                                                <Button variant="outline">
                                                  <ExternalLink className="h-4 w-4 mr-2" />
                                                  Visit Project
                                                </Button>
                                              </a>
                                            )}                      </a>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center px-6 py-3 border border-input rounded-md text-sm font-medium transition-colors hover:bg-accent hover:scale-105"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
      
      {/* About Teaser Section */}
      <Section className="bg-secondary/50 py-24 md:py-32 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center flex-col-reverse md:flex-row">
            <div className="animate-fade-in order-2 md:order-1">
              <h2 className="section-heading mb-6">About Me</h2>
              <div className="space-y-4 text-md text-muted-foreground animate-slide-up">
                <p>
                I am Ulfat Ibadov, a cybersecurity professional with an adversary-driven approach to security testing.
                </p>

                <p>
                I analyze systems like real attackers - mapping attack surfaces, fingerprinting technologies, and challenging the trust and logic defenders rely on.
                </p>

                <p>
                I turn subtle weaknesses into real attack paths by abusing parameters, sessions, protocols, misconfigurations, and privilege boundaries.
                </p>

                <p>
                Once access is achieved, I operate quietly and deliberately, evading controls, pivoting environments, and validating real impact.
                </p>

                <p>
                My work exposes risks that scanners miss by focusing on realistic, detection-aware, high-fidelity security testing.
                </p>

              </div>
            </div>
            
            <div className="animate-fade-in animate-delay-300 order-1 md:order-2">
              <div className="aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden">
                <img 
                  src="/upload/profile.png" 
                  alt="Ulfat Ibadov" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Index;
