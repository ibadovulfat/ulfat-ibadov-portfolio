import PageHero from '@/components/UI/PageHero';
import React, { useState } from "react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { Briefcase, GraduationCap, Download, Bug, Terminal, Crosshair, Binary, HeartHandshake, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

interface TimelineItemProps {
  period?: string;
  title: string;
  subtitle: string;
  meta?: string[];
  description: string;
  link?: { url: string; label: string };
}

const TimelineItem: React.FC<TimelineItemProps> = ({ period, title, subtitle, meta = [], description, link }) => (
  <div className="mb-12 relative pl-8 border-l-2 border-muted/50 pb-2">
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary/20 border-4 border-background"></div>
    {period && <div className="mb-1 text-sm text-muted-foreground">{period}</div>}
    <h3 className="text-xl font-display font-semibold mb-1">{title}</h3>
    <div className="flex flex-wrap items-center mb-4">
      <span className="font-medium">{subtitle}</span>
      {meta.map((m) => (
        <React.Fragment key={m}>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-muted-foreground">{m}</span>
        </React.Fragment>
      ))}
    </div>
    <p className="text-muted-foreground">{description}</p>
    {link && (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-3 text-sm font-medium text-primary hover:underline"
      >
        <ExternalLink className="mr-1.5 h-4 w-4" />
        {link.label}
      </a>
    )}
  </div>
);

const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState("work");

  const handleDownloadClick = () => {
    const win = window.open('/terminal-resume', '_blank', 'noopener,noreferrer');
    if (win) win.opener = null;
  };

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
      <PageHero
        eyebrow="Resume"
        title={<>Cybersecurity <span className="text-red-500">Experience</span> & Education</>}
        subtitle="A comprehensive overview of my professional journey in penetration testing, ethical hacking, and cybersecurity."
        scrollCue={false}
      >
        <button
          onClick={handleDownloadClick}
          className="inline-flex items-center px-5 py-2.5 border border-input bg-background hover:bg-accent transition-all duration-300 rounded-md text-sm font-medium"
        >
          <Download className="mr-2 h-4 w-4" />
          View Terminal Resume
        </button>
      </PageHero>

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
              <h2 className="text-2xl font-display font-semibold mb-8 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-primary" />
                Experience
              </h2>
              {[
                {
                  role: "CEH Practical Beta Testing Committee Member",
                  company: "EC-Council",
                  type: "Part-time",
                  location: "Remote",
                  period: "Jun 2026 - Present",
                  description: "Selected as a CEH (Practical) Beta Testing Committee Member, contributing to the validation and quality assurance of cybersecurity certification examinations through hands-on technical review."
                },
                {
                  role: "Cybersecurity Career Mentor",
                  company: "EC-Council",
                  type: "Part-time",
                  location: "Remote",
                  period: "Jun 2025 - Jun 2026",
                  link: { url: "https://aspen.eccouncil.org/VerifyBadge?type=mentor&a=Ztv/rZ6b4CBTZ5QkBYYsBCMRBusX32vCssd5M3BXpLQ=", label: "Verify Mentor Badge" },
                  description: "Mentored 100+ aspiring cybersecurity professionals as a Recognized EC-Council Career Mentor, guiding candidates through CEH, CEH Practical, CEH Master, and W|AHS certification paths."
                },
                {
                  role: "Cybersecurity Practical Labs Trainee",
                  company: "EC-Council",
                  type: "Apprenticeship",
                  location: "Baku, Azerbaijan",
                  period: "Apr 2023 - Jun 2025",
                  description: "Applied practical penetration testing and vulnerability assessment skills through hands-on labs on EC-Council's CyberQ, BTC, and Skillable platforms."
                }
              ].map((job, index) => (
                <TimelineItem
                  key={index}
                  period={job.period}
                  title={job.role}
                  subtitle={job.company}
                  meta={[job.type, job.location]}
                  description={job.description}
                  link={job.link}
                />
              ))}

              <h2 className="text-2xl font-display font-semibold mt-16 mb-8 flex items-center">
                <HeartHandshake className="mr-2 h-5 w-5 text-primary" />
                Volunteering
              </h2>
              {[
                {
                  role: "CTF Player | Global Ranking: Top 1%",
                  organization: "Hack The Box",
                  period: "Mar 2024 - Present",
                  link: { url: "https://app.hackthebox.com/public/users/1600744", label: "View Hack The Box Profile" },
                  description: "Recognized in the Global Top 1% on Hack The Box, a leading platform for offensive security training and cyber talent assessment. Regularly take part in advanced Capture The Flag (CTF) exercises."
                },
                {
                  role: "CTF Player | Global Ranking: Top 1%",
                  organization: "TryHackMe",
                  period: "Feb 2023 - Aug 2023",
                  link: { url: "https://tryhackme.com/p/ibadovulfat", label: "View TryHackMe Profile" },
                  description: "Ranked in the Global Top 1% with 12,600+ points and 215 completed rooms across 200+ labs."
                },
                {
                  role: "Web Security Community Contributor & CTF Player",
                  organization: "PortSwigger",
                  description: "Completed the PortSwigger Academy path with 200+ labs solved across Apprentice (61/61), Practitioner (128/173), and Master/Expert (11/39) levels."
                }
              ].map((item, index) => (
                <TimelineItem
                  key={index}
                  period={item.period}
                  title={item.role}
                  subtitle={item.organization}
                  description={item.description}
                  link={item.link}
                />
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
                  degree: "EC-Council Offensive Security Certifications",
                  institution: "EC-Council",
                  location: "Online",
                  period: "2023 - 2026",
                  description: "Completed EC-Council's offensive security track, progressing from foundational to advanced penetration testing programs: Certified Cybersecurity Technician (C|CT), Certified Ethical Hacker (C|EH Master), Web Application Hacking and Security (W|AHS), Certified Penetration Testing Professional (C|PENT), and Licensed Penetration Tester (LPT Master).",
                  achievements: [
                    "C|PENT (Certified Penetration Testing Professional) - completed all 130 live-range challenges across AD, network, web, binary, and IoT",
                    "LPT (Licensed Penetration Tester) Master - EC-Council's highest hands-on penetration testing credential",
                    "C|EH Master, W|AHS, and C|CT - ethical hacking, web app exploitation, and core cybersecurity",
                    "Specialized in Active Directory attacks, web/network exploitation, and binary & firmware analysis"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Crosshair className="h-6 w-6 text-primary" />,
                category: "Red Team & Adversary Emulation",
                skills: [
                  { name: "Adversary Emulation (MITRE ATT&CK)", level: 90 },
                  { name: "Command & Control (Cobalt Strike, Sliver, Mythic)", level: 88 },
                  { name: "EDR / AV Evasion & Malware Operations", level: 85 },
                  { name: "Active Directory Attacks (Kerberoasting, ACL, Trusts)", level: 90 },
                  { name: "Lateral Movement & Pivoting", level: 91 },
                  { name: "Post-Exploitation & Persistence", level: 89 }
                ]
              },
              {
                icon: <Bug className="h-6 w-6 text-primary" />,
                category: "Web & Application Exploitation",
                skills: [
                  { name: "Web App Penetration Testing (OWASP Top 10)", level: 93 },
                  { name: "Advanced Injection (SQLi, SSTI, XXE, Deserialization)", level: 89 },
                  { name: "Authentication & Session Attacks", level: 90 },
                  { name: "Access Control & Business Logic (IDOR)", level: 91 },
                  { name: "API & GraphQL Security Testing", level: 85 },
                  { name: "HTTP Request Smuggling & Desync", level: 82 }
                ]
              },
              {
                icon: <Binary className="h-6 w-6 text-primary" />,
                category: "Reverse Engineering & Exploit Dev",
                skills: [
                  { name: "Binary Exploitation (BOF, ROP, ret2libc)", level: 82 },
                  { name: "Reverse Engineering (Ghidra, IDA Pro)", level: 85 },
                  { name: "Mitigation Bypass (ASLR, NX, PIE, Canary)", level: 80 },
                  { name: "Firmware & IoT Analysis (Squashfs, XOR, Entropy)", level: 83 },
                  { name: "Malware Behavior & Detection Engineering", level: 84 },
                  { name: "Shellcode Crafting & Custom Exploits", level: 81 }
                ]
              },
              {
                icon: <Terminal className="h-6 w-6 text-primary" />,
                category: "Core Skills & Development",
                skills: [
                  { name: "Python (Offensive Tooling & Automation)", level: 90 },
                  { name: "Bash & PowerShell Scripting", level: 88 },
                  { name: "Linux & Windows Internals", level: 87 },
                  { name: "Networking & Protocol Analysis (TCP/IP)", level: 89 },
                  { name: "Web Development (React, TypeScript, Tailwind)", level: 85 },
                  { name: "Git, Automation & Secure Development", level: 84 }
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
              { name: "Cobalt Strike", category: "C2 Framework" },
              { name: "Sliver / Mythic", category: "C2 & Post-Exploitation" },
              { name: "Metasploit", category: "Exploitation Framework" },
              { name: "Burp Suite Pro", category: "Web Application Testing" },
              { name: "BloodHound", category: "AD Attack Paths" },
              { name: "NetExec (CME)", category: "Network Exploitation" },
              { name: "Impacket", category: "AD / Protocol Toolkit" },
              { name: "Mimikatz & Rubeus", category: "Credential Abuse" },
              { name: "Kerbrute", category: "Kerberos Enumeration" },
              { name: "Nmap", category: "Recon & Scanning" },
              { name: "sqlmap", category: "SQL Injection" },
              { name: "ffuf & Nuclei", category: "Fuzzing & Recon" },
              { name: "Ghidra / IDA Pro", category: "Reverse Engineering" },
              { name: "binwalk", category: "Firmware / IoT Analysis" },
              { name: "Hashcat", category: "Password Cracking" }
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
