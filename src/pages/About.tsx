
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";

const About: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Section fullHeight className="flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <ParallaxEffect speed={0.1} direction="up">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-4">
              About Me
            </span>
            <h1 className="section-heading mb-6">
              Dedicated Cybersecurity Professional
            </h1>
            <p className="section-subheading max-w-2xl mx-auto">
              Specializing in penetration testing, malware analysis, and vulnerability management
            </p>
          </ParallaxEffect>
        </div>
      </Section>

      {/* Bio Section */}
      <Section className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center px-4 sm:px-6">
          <ParallaxEffect speed={0.05} direction="left">
            <div className="aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden">
              <img 
                src="/upload/profile.png" 
                alt="Ulfat Ibadov" 
                className="w-full h-full object-cover"
              />
            </div>
          </ParallaxEffect>

          <ParallaxEffect speed={0.1} direction="right">
            <h2 className="text-3xl font-display font-bold mb-6">My Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ▐  Skills

                ▐ red_team
                ▪ adversary_ops (ATT&CK tactics, threat emulation, covert entry, persistence)
                ▪ evasion (JA3 morphing, payload shaping, signature deviation)
                ▪ post_exploitation (LOLbins, C2 chaining, lateral movement, AD manipulation)

                ▐ exploitation
                ▪ vuln_research (CWE/CAPEC, CVSSv3 modelling)
                ▪ custom_exploits (logic chains, memory corruption, priv-esc vectors)
                ▪ reverse_engineering (PE/ELF, shellcode crafting, Ghidra/IDA workflows)
                ▪ malware_ops (static/dynamic analysis, stealth packing, obfuscation)

                ▐ web_pentest
                ▪ recon (subdomain enum, JS endpoint extraction, tech fingerprinting)
                ▪ enumeration (auth flows, parameters, access control mapping)
                ▪ fuzzing (state-based fuzzing, input mutation, logic discovery)
                ▪ vulnerability_analysis (session/auth flaws, IDOR, SSRF, deserialization)
                ▪ exploitation (advanced XSS/SSTI, SQLi bypasses, desync vectors, LFI→RCE chains)

                ▐ network_pentest
                ▪ recon (host discovery, mapping, service profiling)
                ▪ enumeration (protocol inspection, auth probing, share/ACL analysis)
                ▪ attack_surface (misconfig hunting, network segmentation testing)
                ▪ exploitation (credential abuse, relay paths, auth weaknesses)
                ▪ post_access (pivoting, tunneling, traffic redirection)

                ▐ offensive_tooling
                ▪ C2 frameworks (Metasploit, Cobalt Strike, Sliver, Covenant, Mythic, Havoc)
                ▪ post-exploitation (Impacket/Rubeus; Mimikatz; LinPEAS/pspy; lateral pivots, credential extraction)
                ▪ web_tooling (BurpSuite, smuggling analyzers, FFUF, JS deobfuscation)
                ▪ recon/intel (Subfinder, Amass, Nuclei, Katana, OSINT automation)
              
              </p>

            </div>
          </ParallaxEffect>
        </div>
      </Section>

      {/* Education Section */}
      <Section className="bg-secondary/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">Education & Certifications</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              My academic background and professional certifications in cybersecurity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-12">
              <div className="relative pl-8 border-l border-muted pb-8">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2"></div>
                <div>
                  <span className="text-sm text-muted-foreground">2023-2025</span>
                  <h3 className="text-xl font-display font-medium mt-1 mb-2">Hack The Box Academy</h3>
                  <p className="text-base text-muted-foreground mb-2">
                    Completed Bug Bounty Hunter, Certified Penetration Testing Specialist (CPTS)
                  </p>
                  <p className="text-sm font-medium">STUDENT ID: HTB-5642792B2C</p>
                </div>
              </div>
              
              <div className="relative pl-8 border-l border-muted pb-8">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2"></div>
                <div>
                  <span className="text-sm text-muted-foreground">2023</span>
                  <h3 className="text-xl font-display font-medium mt-1 mb-2">EC-Council</h3>
                  <p className="text-base text-muted-foreground">
                    Completed intensive training programs, including the Certified Cybersecurity
                    Technician (C|CT), Certified Ethical Hacker (C|EH), Web Application Hacking and
                    Security (W|AHS) certifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="relative pl-8 border-l border-muted pb-8">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2"></div>
                <div>
                  <span className="text-sm text-muted-foreground">2022-2023</span>
                  <h3 className="text-xl font-display font-medium mt-1 mb-2">Ankara Science University</h3>
                  <p className="text-base text-muted-foreground">
                    Ethics/White Hat Hacker Expertise, Cybercrime Expertise, Cyber Security
                  </p>
                  <p className="text-sm font-medium">Diploma</p>
                </div>
              </div>
              
              <div className="relative pl-8 border-l border-muted pb-8">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2"></div>
                <div>
                  <span className="text-sm text-muted-foreground">2017-2021</span>
                  <h3 className="text-xl font-display font-medium mt-1 mb-2">Azerbaijan Technical University</h3>
                  <p className="text-base text-muted-foreground mb-2">
                    Mechanical engineering is a broad engineering discipline that is essentially
                    concerned with the design, production, and operation of machines.
                  </p>
                  <p className="text-sm font-medium">Diploma in mechanical - Bachelor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Work Experience Section */}
      <Section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">Work Experience</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              My professional journey in the cybersecurity field
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-12">
              <div className="relative pl-8 border-l border-muted pb-8">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2"></div>
                <div>
                  <span className="text-sm text-muted-foreground">2024</span>
                  <h3 className="text-xl font-display font-medium mt-1 mb-2">HackerOne</h3>
                  <p className="text-base text-muted-foreground">
                    BugBounty Hunter
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-12">
              <div className="relative pl-8 border-l border-muted pb-8">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2"></div>
                <div>
                  <span className="text-sm text-muted-foreground">2023</span>
                  <h3 className="text-xl font-display font-medium mt-1 mb-2">EC-Council</h3>
                  <p className="text-base text-muted-foreground">
                    Apprenticeship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section className="bg-secondary/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">My Values</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              The core principles that guide my work and approach to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Security-First Approach",
                description: "Prioritizing robust security measures in every aspect of the digital environment."
              },
              {
                title: "Ethical Practices",
                description: "Conducting all security testing and assessments with the highest ethical standards."
              },
              {
                title: "Continuous Learning",
                description: "Constantly exploring new security threats, techniques, and countermeasures."
              },
              {
                title: "Clear Communication",
                description: "Translating complex technical findings into actionable insights for all stakeholders."
              },
              {
                title: "Proactive Protection",
                description: "Identifying and addressing vulnerabilities before they can be exploited."
              },
              {
                title: "Thorough Analysis",
                description: "Leaving no stone unturned when assessing security postures and potential risks."
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-background rounded-lg border border-border p-6 md:p-8 hover-lift"
              >
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-display font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience Overview - Skills Section */}
      <Section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">Skills & Expertise</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              My key areas of specialization in cybersecurity and penetration testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-2xl font-display font-semibold mb-6">Penetration Tester Skills</h3>
              <div className="space-y-6">
                {[
                  {
                    category: "Network Security",
                    skills: ["Network Penetration Testing", "Vulnerability Assessment", "Firewall Configuration", "Network Architecture Analysis", "Remote Access Security"]
                  },
                  {
                    category: "Web Application Security",
                    skills: ["OWASP Top 10 Assessment", "API Security Testing", "Authentication Bypass", "Session Management", "SQL Injection"]
                  },
                  {
                    category: "Social Engineering",
                    skills: ["Phishing Campaigns", "Pretexting", "Physical Security Assessment", "Security Awareness Training", "Spear Phishing"]
                  }
                ].map((group, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-medium mb-3">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="text-sm px-3 py-1 rounded-full bg-muted/50 text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/skills"
                  className="group inline-flex items-center text-primary font-medium"
                >
                  View detailed skills
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-semibold mb-6">Malware Analyst Skills & Tools</h3>
              <div className="space-y-6">
                {[
                  {
                    category: "Malware Analysis",
                    skills: ["Static Analysis", "Dynamic Analysis", "Reverse Engineering", "Sandboxing", "Behavioral Analysis"]
                  },
                  {
                    category: "Security Tools",
                    skills: ["Wireshark", "Metasploit", "Burp Suite", "Nmap", "OWASP ZAP", "Kali Linux", "IDA Pro", "Ghidra"]
                  },
                  {
                    category: "Threat Intelligence",
                    skills: ["Threat Hunting", "IoC Analysis", "Malware Family Identification", "APT Tracking", "Threat Reporting"]
                  }
                ].map((group, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-medium mb-3">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="text-sm px-3 py-1 rounded-full bg-muted/50 text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-primary text-primary-foreground py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
            Let's Secure Your Digital Assets Together
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Looking for expert cybersecurity services to protect your organization from evolving threats? I'd love to discuss how I can help enhance your security posture.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all duration-300 rounded-md text-sm font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </Section>
    </>
  );
};

export default About;
