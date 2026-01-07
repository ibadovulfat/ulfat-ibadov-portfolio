
import { ProjectType } from "./types";

export const categories = ["All", "Certificates", "Sites", "Labs"];

export const projectsData: ProjectType[] = [
  {
    id: 1,
    title: "W|AHS Certification",
    category: "Certificates",
    description: "EC-Council Web Application Hacking and Security certification with a 75% score.",
    tags: ["Web App Security", "OWASP Top 10", "Penetration Testing"],
    image: "/upload/wahs.jpg",
    details: {
      completionDate: "December 10, 2024",
      role: "Web Application Security Professional",
      issuedBy: "EC-Council",
      verifyLink: "https://aspen.eccouncil.org/VerifyBadge?&type=certification&a=ed2dGj4Z1ySm68ptiidDS5Rw9ELHIbQnb35B90anBck=",
      score: "Successfully completed with a 75% score, earning the Web Application Security Professional certification.",
      skills: "Advanced Web Application Penetration Testing, OWASP Top 10 Vulnerabilities, Web Application Hacking Methodology, Web App Exploitation."
    }
  },
  {
    id: 2,
    title: "C|EH Practical",
    category: "Certificates",
    description: "EC-Council Certified Ethical Hacker Practical certification ",
    tags: ["Ethical Hacking", "Penetration Testing", "Security Assessment"],
    image: "/upload/ceh.jpg",
    details: {
      completionDate: "April 2, 2025",
      role: "Certified Ethical Hacker",
      issuedBy: "EC-Council",
      verifyLink: "https://aspen.eccouncil.org/VerifyBadge?&type=certification&a=/YLlkQtvVmd+7xqESIJS14R4jt5okTNoTO9WNRpdvO4=",
      score: "CEH Practical: 14/20 objectives completed (hands-on exam)",
      skills: "Ethical hacking techniques such as threat vector identification, network scanning, OS detection, vulnerability analysis, system hacking, web app hacking."
    }
  },
  {
    id: 3,
    title: "C|EH Theory",
    category: "Certificates",
    description: "EC-Council Certified Ethical Hacker Theory certification",
    tags: ["Ethical Hacking", "Penetration Testing", "Security Assessment"],
    image: "/upload/ceh_theory.png",
    details: {
      completionDate: "October 22, 2025",
      role: "Certified Ethical Hacker",
      issuedBy: "EC-Council",
      verifyLink: "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=/8a+zkE80PT94f4LFM7fRlipvkoMSaafVYUCRb7UQfc=",
      score: "CEH (Theory Exam): 109/125",
      skills: "Reconnaissance, Gaining Access, Enumeration, Maintaining Access, and covering your tracks."
    }
  },
  {
    id: 4,
    title: "C|EH Master",
    category: "Certificates",
    description: "EC-Council Certified Ethical Hacker Master certification",
    tags: ["Ethical Hacking", "Penetration Testing", "Security Assessment"],
    image: "/upload/ceh_master.png",
    details: {
      completionDate: "April 2, 2025",
      role: "Certified Ethical Hacker Master",
      issuedBy: "EC-Council",
      verifyLink: "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=lsOgJg9++5Mxc+0Bx/+dpKAvb6y8d8eZayUyf23qd5I=",
      score: "Successfully demonstrated practical ethical hacking skills through hands-on challenges and assessments.",
      skills: "CEH Master-level expertise across the full attack lifecycle: reconnaissance, exploitation, post-exploitation, and track covering."
    }
  },
  {
    id: 5,
    title: "ShadowLab Defender Web Simulator",
    category: "Labs",
    description: "AI-driven behavioral telemetry lab for Microsoft Defender and EDR detection research.",
    tags: ["EDR", "Behavioral Detection", "Telemetry", "Offensive Security", "Machine Learning"],
    image: "/upload/proje.jpeg",
    details: {
      completionDate: "Jun 2025 - Present",
      role: "Creator & Researcher",
      skills: "EDR detection engineering, behavioral telemetry analysis, Python-based simulation, heuristic and ML-driven visibility scoring.",
      verifyLink: "https://github.com/ibadovulfat/shadowlab-detection-lab"
    }
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "Sites",
    description: "Fully responsive and user-friendly personal portfolio website with modern design and optimized performance.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    image: "/upload/site.png",
    details: {
      description: "Developed fully responsive and user-friendly website, focusing on modern design, functionality, and performance optimization.",
      role: "Full Stack Developer"
    }
  }
];

