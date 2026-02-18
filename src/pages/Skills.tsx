import React, { useState } from "react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";
import ScrollReveal from "@/components/UI/ScrollReveal";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet";

interface SkillItem {
  name: string;
  details?: string[];
}

interface SkillSubcategory {
  name: string;
  skills: string[];
}

interface SkillCategory {
  name: string;
  color: string;
  subcategories: SkillSubcategory[];
}

const offensiveSkills: SkillCategory[] = [
  {
    name: "red_team",
    color: "#ef4444",
    subcategories: [
      {
        name: "adversary_ops",
        skills: ["ATT&CK mapping", "threat emulation", "encrypted C2", "beacon timing"]
      },
      {
        name: "evasion",
        skills: ["EDR evasion", "custom loaders", "process injection", "AMSI awareness", "parent spoofing"]
      },
      {
        name: "post_exploitation",
        skills: ["LOLBins", "C2 chaining", "lateral movement", "AD manipulation"]
      }
    ]
  },
  {
    name: "exploitation",
    color: "#f59e0b",
    subcategories: [
      {
        name: "malware_ops",
        skills: ["in-memory execution", "runtime patching", "execution context manipulation"]
      },
      {
        name: "vuln_research",
        skills: ["CWE/CAPEC", "CVSSv3 modelling"]
      },
      {
        name: "custom_exploits",
        skills: ["logic chains", "memory corruption", "priv-esc vectors"]
      },
      {
        name: "reverse_engineering",
        skills: ["PE/ELF", "shellcode crafting", "Ghidra/IDA workflows"]
      }
    ]
  },
  {
    name: "web_pentest",
    color: "#3b82f6",
    subcategories: [
      {
        name: "recon",
        skills: ["subdomain enum", "JS endpoint extraction", "tech fingerprinting"]
      },
      {
        name: "enumeration",
        skills: ["auth flows", "parameters", "access control mapping"]
      },
      {
        name: "fuzzing",
        skills: ["state-based fuzzing", "input mutation", "logic discovery"]
      },
      {
        name: "vulnerability_analysis",
        skills: ["session/auth flaws", "IDOR", "SSRF", "deserialization"]
      },
      {
        name: "exploitation",
        skills: ["advanced XSS/SSTI", "SQLi bypasses", "desync vectors", "LFI→RCE chains"]
      }
    ]
  },
  {
    name: "network_pentest",
    color: "#8b5cf6",
    subcategories: [
      {
        name: "recon",
        skills: ["host discovery", "mapping", "service profiling"]
      },
      {
        name: "enumeration",
        skills: ["protocol inspection", "auth probing", "share/ACL analysis"]
      },
      {
        name: "attack_surface",
        skills: ["misconfig hunting", "network segmentation testing"]
      },
      {
        name: "exploitation",
        skills: ["credential abuse", "relay paths", "auth weaknesses"]
      },
      {
        name: "post_access",
        skills: ["pivoting", "tunneling", "traffic redirection"]
      }
    ]
  },
  {
    name: "offensive_tooling",
    color: "#10b981",
    subcategories: [
      {
        name: "C2_frameworks",
        skills: ["Metasploit", "Cobalt Strike", "Sliver", "Covenant", "Mythic", "Havoc"]
      },
      {
        name: "post-exploitation",
        skills: ["Impacket/Rubeus", "Mimikatz", "LinPEAS/pspy", "lateral pivots", "credential extraction"]
      },
      {
        name: "web_tooling",
        skills: ["BurpSuite", "smuggling analyzers", "FFUF", "JS deobfuscation"]
      },
      {
        name: "recon/intel",
        skills: ["Subfinder", "Amass", "Nuclei", "Katana", "OSINT automation"]
      }
    ]
  },
  {
    name: "programming",
    color: "#06b6d4",
    subcategories: [
      {
        name: "scripting",
        skills: ["Python", "Bash", "PowerShell"]
      },
      {
        name: "webstack",
        skills: ["HTML", "CSS", "JavaScript", "Tailwind", "React"]
      }
    ]
  }
];

const Skills: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["red_team"]));

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <>
      <Helmet>
        <title>Skills | Ulfat Ibadov - Offensive Security Expertise</title>
        <meta name="description" content="Comprehensive offensive security skills including red teaming, exploitation, web/network penetration testing, and offensive tooling expertise." />
      </Helmet>

      {/* Hero Section */}
      <Section fullHeight className="flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <ParallaxEffect speed={0.1} direction="up">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-4">
              Skills
            </span>
            <h1 className="section-heading mb-6">
              Offensive Security Arsenal
            </h1>
            <p className="section-subheading max-w-2xl mx-auto">
              Comprehensive expertise across red teaming, exploitation, and penetration testing disciplines.
            </p>
          </ParallaxEffect>
        </div>
      </Section>

      {/* Terminal Skills Section */}
      <Section className="py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="terminal-window p-6">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-4 text-sm text-muted-foreground font-mono">skills.sh</span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-4">
                <div className="text-sm font-mono">
                  <span className="text-green-500">$</span>
                  <span className="text-muted-foreground ml-2">cat offensive_skills.txt</span>
                </div>

                <div className="space-y-3 mt-6">
                  {offensiveSkills.map((category, catIndex) => (
                    <ScrollReveal key={category.name} variant="slideUp" delay={catIndex * 50}>
                      <div className="space-y-2">
                        {/* Category Header */}
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className="flex items-center gap-2 w-full text-left hover:bg-primary/5 p-2 rounded transition-colors group"
                        >
                          {expandedCategories.has(category.name) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-lg font-mono" style={{ color: category.color }}>
                            ▐ {category.name}
                          </span>
                        </button>

                        {/* Subcategories */}
                        {expandedCategories.has(category.name) && (
                          <div className="ml-6 space-y-2 animate-in slide-in-from-top-2 duration-300">
                            {category.subcategories.map((sub, subIndex) => (
                              <div key={subIndex} className="space-y-1">
                                <div className="flex items-start gap-2">
                                  <span className="text-muted-foreground font-mono text-sm mt-0.5">├─</span>
                                  <div className="flex-1">
                                    <span className="font-mono text-sm" style={{ color: category.color, opacity: 0.9 }}>
                                      {sub.name}
                                    </span>
                                    <div className="ml-4 mt-1 space-y-0.5">
                                      {sub.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex} className="flex items-start gap-2">
                                          <span className="text-muted-foreground/50 font-mono text-xs mt-0.5">│  ├─</span>
                                          <span className="text-sm font-mono text-green-500/80">
                                            {skill}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Terminal Cursor */}
                <div className="flex items-center gap-1 mt-6">
                  <span className="text-green-500 font-mono text-sm">$</span>
                  <span className="terminal-cursor inline-block w-2 h-4 bg-green-500/80 ml-1"></span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
};

export default Skills;
