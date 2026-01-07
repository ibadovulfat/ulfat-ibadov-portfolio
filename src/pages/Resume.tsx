import React, { useState } from "react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, Download, Shield, Bug, Terminal, Code, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState("work");

  return (
    <>
      <Helmet>
        <title>Resume - Ulfat Ibadov | Penetration Testing & Cybersecurity</title>
        <meta name="description" content="Professional resume of Ulfat Ibadov - specializing in penetration testing, malware analysis, ethical hacking, and offensive security." />
        <meta name="keywords" content="cybersecurity resume, penetration tester, ethical hacker, offensive security, malware analyst, red teaming, bug bounty hunter" />
        <meta property="og:title" content="Resume - Ulfat Ibadov | Cybersecurity Professional" />
        <meta property="og:description" content="View the professional background and cybersecurity qualifications of Ulfat Ibadov - expert in penetration testing and ethical hacking." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/resume" />
      </Helmet>

      {/* Hero Section */}
      <Section fullHeight className="flex items-center justify-center overflow-x-hidden animate-fade-in">
        <div className="max-w-4xl mx-auto text-center px-4">
          <ParallaxEffect speed={0.1} direction="up">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-4">
              Resume
            </span>
            <h1 className="section-heading mb-6">
              Cybersecurity Experience & Education
            </h1>
            <p className="section-subheading max-w-2xl mx-auto">
              A comprehensive overview of my professional journey in penetration testing, ethical hacking, and cybersecurity.
            </p>
            <div className="flex justify-center mt-8">
              <button className="inline-flex items-center px-4 py-2 border border-input bg-background hover:bg-accent transition-all duration-300 rounded-md text-sm font-medium">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </button>
            </div>
          </ParallaxEffect>
        </div>
      </Section>

      {/* Resume Tabs */}
      <Section className="py-20 overflow-x-hidden animate-fade-in">
        <Tabs defaultValue="work" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-16">
            <TabsList className="bg-muted/30 p-1 rounded-full">
              <TabsTrigger
                value="work"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Work Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Education
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Work Experience Tab */}
          <TabsContent value="work" className="mt-0">
            <div className="max-w-3xl mx-auto">
              {[
                {
                  role: "Cybersecurity Career Mentor (Self-employed)",
                  company: "Ec-Council",
                  location: "Remote",
                  period: "2025 - Present",
                  description: "Recognized by EC-Council as a Cybersecurity Career Mentor, providing structured guidance to aspiring professionals in building practical offensive security skills and career paths in cybersecurity.",
                  achievements: [
                    "Mentored candidates on CEH, CEH Practical, CEH Master, and W|AHS certifications with a focus on real-world exam readiness",
                    "Provided hands-on guidance in penetration testing, bug bounty methodologies, and offensive security fundamentals",
                    "Supported learners through real-world labs, custom training paths, and practical skill development"
                  ]
                },

                {
                  role: "Bug Bounty Hunter",
                  company: "HackerOne",
                  location: "Remote",
                  period: "2024 - Present",
                  description: "Working as an independent security researcher identifying and reporting vulnerabilities in web applications, APIs, and network infrastructure for various organizations.",
                  achievements: [
                    "Discovered and reported critical security vulnerabilities to major tech companies",
                    "Specialized in finding OWASP Top 10 vulnerabilities, including SQLi, XSS, and CSRF",
                    "Developed custom scripts and tools to automate parts of the testing process"
                  ]
                },
                
                {
                  role: "Cybersecurity Apprentice",
                  company: "EC-Council",
                  location: "Remote",
                  period: "2023",
                  description: "Completed a hands-on apprenticeship focused on practical application of ethical hacking methodologies and penetration testing techniques.",
                  achievements: [
                    "Conducted penetration tests on simulated corporate networks",
                    "Performed vulnerability assessments and created detailed technical reports",
                    "Practiced exploit development and privilege escalation techniques in controlled environments"
                  ]
                }
              ].map((job, index) => (
                <div 
                  key={index} 
                  className="mb-12 relative pl-8 border-l-2 border-muted/50 pb-2"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary/20 border-4 border-background"></div>
                  <div className="mb-1 text-sm text-muted-foreground">{job.period}</div>
                  <h3 className="text-xl font-display font-semibold mb-1">{job.role}</h3>
                  <div className="flex items-center mb-4">
                    <span className="font-medium">{job.company}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{job.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="mt-0">
            <div className="max-w-3xl mx-auto">
              {[
                {
                  degree: "Penetration Testing & Bug Bounty Certification",
                  institution: "Hack The Box Academy",
                  location: "Online",
                  period: "2023 - 2025",
                  description: "Completed Bug Bounty Hunter and Certified Penetration Testing Specialist (CPTS) programs.",
                  achievements: [
                    "Student ID: HTB-5642792B2C",
                    "Specialized in web application penetration testing and network exploitation",
                    "Mastered practical offensive security techniques in lab environments"
                  ]
                },
                {
                  degree: "Ethics/White Hat Hacker Expertise, Cybercrime Expertise",
                  institution: "Ankara Science University",
                  location: "Ankara, Turkey",
                  period: "2022 - 2023",
                  description: "Specialized training in cyber security with focus on ethical hacking and cybercrime investigation.",
                  achievements: [
                    "Diploma in Cyber Security",
                    "Studied advanced penetration testing methodologies",
                    "Trained in digital forensics and incident response"
                  ]
                },
                {
                  degree: "Certified Ethical Hacker & Cybersecurity Certifications",
                  institution: "EC-Council",
                  location: "Online",
                  period: "2023",
                  description: "Completed intensive training programs, including the Certified Cybersecurity Technician (C|CT), Certified Ethical Hacker (C|EH), Web Application Hacking and Security (W|AHS) certifications.",
                  achievements: [
                    "Mastered ethical hacking techniques and methodologies",
                    "Specialized in web application security assessment",
                    "Trained in network penetration testing and vulnerability management"
                  ]
                },
                {
                  degree: "Bachelor of Mechanical Engineering",
                  institution: "Azerbaijan Technical University",
                  location: "Baku, Azerbaijan",
                  period: "2017 - 2021",
                  description: "Mechanical engineering is a broad engineering discipline that is essentially concerned with the design, production, and operation of machines.",
                  achievements: [
                    "Diploma in mechanical - Bachelor",
                    "Studied principles of engineering and system design",
                    "Developed analytical and problem-solving skills applicable to cybersecurity"
                  ]
                }
              ].map((edu, index) => (
                <div
                  key={index}
                  className="mb-12 relative pl-8 border-l-2 border-muted/50 pb-2"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary/20 border-4 border-background"></div>
                  <div className="mb-1 text-sm text-muted-foreground">{edu.period}</div>
                  <h3 className="text-xl font-display font-semibold mb-1">{edu.degree}</h3>
                  <div className="flex items-center mb-4">
                    <span className="font-medium">{edu.institution}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{edu.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{edu.description}</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Highlights:</h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* Skills Overview */}
      <Section className="bg-secondary/50 py-20 overflow-x-hidden animate-fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Cybersecurity Skills & Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A snapshot of my technical capabilities in offensive security and penetration testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-6 w-6 text-primary" />,
                category: "Offensive Security",
                skills: [
                  { name: "Penetration Testing", level: 90 },
                  { name: "Vulnerability Assessment", level: 95 },
                  { name: "Exploit Development", level: 80 },
                  { name: "Social Engineering", level: 85 },
                  { name: "Network Security", level: 90 }
                ]
              },
              {
                icon: <Bug className="h-6 w-6 text-primary" />,
                category: "Malware Analysis",
                skills: [
                  { name: "Reverse Engineering", level: 85 },
                  { name: "Malware Behavior Analysis", level: 80 },
                  { name: "Sandboxing", level: 90 },
                  { name: "Memory Forensics", level: 75 },
                  { name: "Static/Dynamic Analysis", level: 85 }
                ]
              },
              {
                icon: <Palette className="h-6 w-6 text-primary" />,
                category: "Frontend Skills",
                skills: [
                  { name: "HTML/CSS", level: 90 },
                  { name: "JavaScript/TypeScript", level: 85 },
                  { name: "React", level: 80 },
                  { name: "Responsive Design", level: 90 },
                  { name: "UI/UX Principles", level: 85 }
                ]
              }
            ].map((skillGroup, index) => (
              <div
                key={index}
                className="bg-background rounded-lg border border-border p-8 hover-lift transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  {skillGroup.icon}
                  <h3 className="text-xl font-display font-medium ml-2">{skillGroup.category}</h3>
                </div>
                <div className="space-y-5">
                  {skillGroup.skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
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
            ))}
          </div>
        </div>
      </Section>

      {/* Tools Section */}
      <Section className="py-20 overflow-x-hidden animate-fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Security Tools & Software</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The primary tools and platforms I use for penetration testing and security assessments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Kali Linux", category: "Operating System" },
              { name: "Metasploit", category: "Exploitation Framework" },
              { name: "Burp Suite", category: "Web Application Testing" },
              { name: "Wireshark", category: "Network Analysis" },
              { name: "Nmap", category: "Network Scanning" },
              { name: "OWASP ZAP", category: "Web Security" },
              { name: "Ghidra", category: "Reverse Engineering" },
              { name: "IDA Pro", category: "Disassembler" },
              { name: "Bloodhound", category: "AD Assessment" },
              { name: "Hashcat", category: "Password Cracking" },
              { name: "Aircrack-ng", category: "Wireless Security" },
              { name: "OSINT Framework", category: "Information Gathering" }
            ].map((tool, index) => (
              <div
                key={index}
                className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
              >
                <Terminal className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-medium">{tool.name}</h3>
                <p className="text-xs text-muted-foreground">{tool.category}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-20 text-center overflow-x-hidden animate-fade-in">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold mb-4">
            Need Cybersecurity Expertise?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm available for penetration testing, vulnerability assessments, and security consulting. Let's secure your digital assets together.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-md text-sm font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </Section>
    </>
  );
};

export default Resume;
