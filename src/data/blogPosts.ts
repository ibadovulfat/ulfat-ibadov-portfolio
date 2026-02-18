export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  content: string; // HTML string for rich text content
}

export const blogPosts: BlogPost[] = [
  {
    id: 7,
    title: "Certified Ethical Hacker (CEH ANSI) — What I Passed and What It Really Means",
    excerpt: "On 22 October 2025, I passed the EC-Council Certified Ethical Hacker (CEH ANSI) theory examination. This exam tests whether you understand how real attacks are executed, detected, and abused.",
    date: "October 22, 2025",
    author: "Ulfat Ibadov",
    readTime: "7 min read",
    category: "Certification",
    image: "/upload/ceh_theory.jpg",
    content: `
      <p>On 22 October 2025, I passed the EC-Council Certified Ethical Hacker (CEH ANSI) theory examination with a score of 109 / 125.</p>

      <p>This exam does not test memorization. It tests whether you understand how real attacks are executed, detected, and abused across modern infrastructures.</p>

      <p class="font-medium text-lg my-4">CEH is about offensive reasoning — knowing how attackers think so defenders can stop them.</p>

      <h2>What CEH Actually Tests</h2>
      <p>The CEH exam is built around how attacks move through systems, networks, users, and infrastructure. It focuses on how breaches are created, expanded, and maintained across multiple layers.</p>

      <h3>1. Network & Transport-Layer Attacks</h3>
      <p>CEH expects you to understand how TCP/IP and network traffic are abused in real intrusions:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>TCP session hijacking through sequence number prediction and spoofing</li>
        <li>Blind TCP injection attacks where the attacker cannot see responses</li>
        <li>DNS tunneling for command-and-control and data exfiltration</li>
        <li>Firewall evasion using timing, fragmentation, and protocol abuse</li>
        <li>Port scanning and service discovery using tools like Nmap</li>
      </ul>
      <p>CEH tests whether you understand how traffic itself becomes a weapon.</p>

      <h3>2. Web Application Exploitation</h3>
      <p>CEH heavily tests real web attacks, not just theory:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Blind SQL injection (Boolean-based and time-based)</li>
        <li>Cross-site scripting (XSS) for stealing session cookies</li>
        <li>Server-Side Includes (SSI) injection</li>
        <li>Intercepting and manipulating requests using Burp Suite</li>
        <li>Fuzz testing to crash applications and discover vulnerabilities</li>
      </ul>
      <p>CEH checks whether you understand how applications leak data, sessions, and control.</p>

      <h3>3. Malware, Exploitation & Persistence</h3>
      <p>CEH expects you to understand how attackers gain access and stay inside systems:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>The Cyber Kill Chain (Reconnaissance → Weaponization → Delivery → Exploitation → Command & Control → Actions)</li>
        <li>The difference between gaining access, maintaining access, and clearing tracks</li>
        <li>Remote command execution vulnerabilities such as Shellshock</li>
        <li>Persistent backdoors implanted in cloud firmware</li>
        <li>Password cracking using rainbow tables, John the Ripper, and Hashcat</li>
      </ul>
      <p>CEH verifies that you understand how a breach turns into long-term compromise.</p>

      <h3>4. Cloud, Wireless, IoT & Modern Infrastructure</h3>
      <p>CEH is no longer limited to Windows and Linux — it covers hybrid and embedded systems:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>IoT gateways, middleware, and cloud-based architectures</li>
        <li>Zigbee and short-range wireless protocols used in industrial systems</li>
        <li>Rolling codes used to prevent replay attacks in keyless entry systems</li>
        <li>SaaS, PaaS, and IaaS security responsibility models</li>
        <li>Cloud firmware persistence and infrastructure-level backdoors</li>
      </ul>
      <p>CEH tests whether you understand modern attack surfaces, not just PCs.</p>

      <h3>5. Social Engineering & Human Exploitation</h3>
      <p>Real breaches often start with people:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Quid-pro-quo attacks (fake IT support offering help in exchange for credentials)</li>
        <li>Scareware pop-ups designed to create panic and force malware installation</li>
        <li>Phishing and malicious attachments used to harvest credentials</li>
      </ul>
      <p>CEH treats humans as part of the attack surface.</p>

      <h2>Why CEH Matters</h2>
      <p>CEH does not certify you as a “tool user.” It certifies you as someone who understands:</p>
      <p>How a real attacker moves from curiosity → access → control → persistence → exfiltration.</p>
      <p>CEH is about:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Threat modeling</li>
        <li>Attack chains</li>
        <li>Infrastructure abuse</li>
        <li>Protocol exploitation</li>
        <li>Human weaknesses</li>
      </ul>

      <h2>My CEH Result</h2>
      <div class="bg-muted/30 p-6 rounded-lg my-6 border border-border">
        <h3 class="text-xl font-bold mb-2">Certified Ethical Hacker – ANSI</h3>
        <p class="mb-1"><strong>📅 Date:</strong> 22 October 2025</p>
        <p class="mb-4 text-green-600 font-bold text-lg">✅ PASSED (Score: 109 / 125)</p>
        
        <p>This confirms that I can:</p>
        <ul class="list-disc pl-6 mt-2">
          <li>Analyze attack paths</li>
          <li>Understand exploitation logic</li>
          <li>Recognize real-world offensive techniques</li>
          <li>Map how breaches actually happen</li>
        </ul>
      </div>

      <h2>Final Thought</h2>
      <p>CEH is not about memorizing ports or tools. It is about understanding how systems fail under attack.</p>
      <p class="font-bold text-lg">And that is exactly what I proved by passing it.</p>

      <img src="/upload/ceh-result.png" alt="CEH Exam Result" class="rounded-lg shadow-lg w-full mt-6" />
    `
  },
  {
    id: 8,
    title: "Certified Ethical Hacker (CEH) Practical",
    excerpt: "A hands-on, performance-based certification designed to measure real-world penetration testing and ethical hacking capability.",
    date: "April 2025",
    author: "Ulfat Ibadov",
    readTime: "6 min read",
    category: "Certification",
    image: "/upload/ceh.jpg",
    content: `
      <h2>Successful Completion: CEH Practical v12</h2>
      <p>In April 2025, I successfully passed the Certified Ethical Hacker (CEH) Practical v12 exam, a hands-on, performance-based certification designed to measure real-world penetration testing and ethical hacking capability.</p>
      
      <p>Unlike theory-based exams, CEH Practical evaluates a candidate’s ability to operate inside a live cyber range, where real systems must be discovered, analyzed, exploited, and documented under time pressure.</p>
      
      <p class="font-medium text-lg my-4">This exam validates not what you know, but what you can actually do when facing real infrastructures.</p>

      <h3>What the CEH Practical Exam Represents</h3>
      <p>The CEH Practical exam places candidates inside a simulated enterprise environment containing vulnerable servers, workstations, web applications, and network services.</p>
      
      <p>Within a 6-hour offensive engagement, the candidate must:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Discover live hosts and exposed services</li>
        <li>Enumerate users, shares, ports, and operating systems</li>
        <li>Exploit vulnerable services and web applications</li>
        <li>Escalate privileges and access restricted systems</li>
        <li>Crack passwords and analyze credential artifacts</li>
        <li>Extract hidden data using steganography and forensics</li>
      </ul>
      
      <p>Each task represents a real-world attack objective, similar to what a red team or penetration tester would face in a professional engagement.</p>

      <h3>Skills Validated by CEH Practical</h3>
      <p>CEH Practical proves operational competence across the full attack lifecycle:</p>

      <div class="space-y-4 my-6">
        <div>
          <h4 class="font-bold text-primary">🔹 Network & Host Enumeration</h4>
          <p>Nmap, service fingerprinting, SMB & Active Directory discovery. Identifying attack surfaces from raw network telemetry.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">🔹 Exploitation & Lateral Movement</h4>
          <p>Exploiting misconfigurations and vulnerable services. Using RDP, SSH, SMB, and application-level access to pivot.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">🔹 Web Application Attacks</h4>
          <p>SQL Injection, File Upload Exploits, LFI, Command Execution, XSS. Real web shells and database extraction.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">🔹 Credential Attacks</h4>
          <p>Hydra, John the Ripper. Hash extraction, cracking, and reuse.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">🔹 Digital Forensics & Steganography</h4>
          <p>Finding hidden data in files. Decoding hashes and artifacts to uncover flags.</p>
        </div>
      </div>
      
      <p>This is not automated scanning — every task requires manual thinking, tool selection, and attack logic.</p>

      <h3>Why CEH Practical Matters</h3>
      <p>Most cybersecurity certifications measure memorization. CEH Practical measures operational capability.</p>
      
      <p>Passing this exam proves that the holder can:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Think like an attacker</li>
        <li>Navigate unknown systems</li>
        <li>Chain vulnerabilities together</li>
        <li>Extract real assets from real targets</li>
      </ul>
      
      <p>This is the same skillset required in Red team operations, Penetration testing, Incident response validation, and Threat emulation.</p>

      <h3>How This Connects to My Work</h3>
      <p>My research and projects — including ShadowLab Defender — focus on how real attacker behavior is observed, scored, and detected by modern EDRs.</p>
      
      <p>CEH Practical validates the offensive side of this equation: How attacks actually look when executed against live systems.</p>
      
      <p>This gives me the unique position of understanding both sides of the telemetry: How attackers operate and How defenders see them. That intersection is where modern cybersecurity lives.</p>

      <img src="/upload/ceh_practical_result.jpeg" alt="CEH Practical Result" class="rounded-lg shadow-lg w-full mt-8 mb-6" />
    `
  },
  {
    id: 10,
    title: "ShadowLab Defender Web Simulator",
    excerpt: "An ethical, lab-only behavioral research platform designed to study how Microsoft Defender and modern EDR solutions interpret system behavior.",
    date: "January 2026",
    author: "Ulfat Ibadov",
    readTime: "10 min read",
    category: "Security Research",
    image: "/upload/proje.jpeg",
    content: `
      <h2>ShadowLab Defender: Behavioral Research Platform</h2>
      <p class="text-sm text-yellow-600 bg-yellow-100 p-2 rounded mb-4 border border-yellow-200"><strong>Note:</strong> Usage requires explicit permission from the author. Created by Ulfat Ibadov.</p>

      <p>ShadowLab Defender Web Simulator is an ethical, lab-only behavioral research platform designed to study how Microsoft Defender and modern EDR solutions interpret system behavior through local telemetry, Windows security event logs, and an AI-assisted behavioral scoring engine.</p>
      
      <p class="font-medium text-lg my-4">No bypass. No exploit. No payload.<br/>This project focuses on behavioral visibility and defensive understanding, not evasion.</p>

      <h3>What Is ShadowLab?</h3>
      <p>ShadowLab is a comprehensive behavioral security platform designed for both defensive research (Blue Team) and controlled offensive simulation (Red Team).</p>
      
      <p>It provides a high-fidelity behavioral detection environment that replicates how:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Legitimate users and adversarial actors interact with the system.</li>
        <li>Modern EDR/AV solutions (like Microsoft Defender) interpret various telemetry signals.</li>
        <li>Security analysts can hunt for persistence, analyze internals, and take active response actions.</li>
      </ul>
      <p>By combining defensive monitoring with controlled offensive modules (like ARP spoofing and stress scenarios), it allows for full-spectrum defensive understanding—seeing the attack, the telemetry it generates, and the response it requires.</p>

      <h3>Purpose</h3>
      <p>ShadowLab was developed as part of an Advanced Cybersecurity Portfolio to demonstrate a holistic range of applied offensive and defensive research skills, including:</p>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>Advanced Behavioral Detection:</strong> Monitoring and scoring complex process activities.</li>
        <li><strong>Forensic Internals:</strong> Deep-dive analysis of process memory, handles, and loaded modules.</li>
        <li><strong>Incident Response:</strong> Implementation of active mitigation (Suspend/Kill) and audit logging.</li>
        <li><strong>Deception Technology:</strong> Deploying and monitoring honeypots and ransomware canary files.</li>
        <li><strong>Threat Intelligence:</strong> Automated correlation of telemetry with VirusTotal, AbuseIPDB, and MITRE ATT&CK.</li>
        <li><strong>Offensive Network Warfare:</strong> Mastering layer-2 discovery and ARP spoofing from a defensive perspective.</li>
        <li><strong>Generative AI Analysis:</strong> Integrating LLMs for contextual threat explainability.</li>
      </ul>
      <p>All activity is conducted strictly for research and educational purposes in isolated lab environments.</p>

      <h3>How It Works (High-Level)</h3>
      <p>ShadowLab operates as a continuous behavioral analysis pipeline:</p>

      <div class="space-y-4 my-6">
        <div>
          <h4 class="font-bold text-primary">1. Telemetry & Deep Internals</h4>
          <p>Live monitoring of CPU, RAM, Disk, and Network telemetry via psutil. Enumeration of open Handles (Files/Sockets) and loaded Modules (DLL/dylib). Printable ASCII/Unicode extraction from binaries using String Inspector.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">2. Advanced Threat Hunting</h4>
          <p>Interactive parent-child relationship visualization via pyvis. Deep scanning of process binaries using custom weaponized YARA rules. Real-time packet capture and DNS query analysis via scapy.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">3. Enterprise Defense & AI</h4>
          <p><strong>Deception (Honeypot):</strong> Hidden honey-files that trigger immediate alerts on access.<br/>
          <strong>Ransomware Canary:</strong> Watchdog-monitored decoy files to detect unauthorized encryption.<br/>
          <strong>AI Analyst (GenAI):</strong> LLM-powered interpretation of process behavior for better explainability.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">4. Network Warfare (Red Team)</h4>
          <p><strong>ARP Discovery:</strong> Local subnet scanner to discover connected devices (Phones, IoT, PCs).<br/>
          <strong>WiFi Kicker:</strong> Targeted ARP Spoofing to disconnect specific devices from the network.</p>
        </div>
      </div>

      <h3>Technical Features & Stack</h3>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm my-4 bg-muted/20 p-4 rounded border border-border">
        <li><strong>Traffic Analysis:</strong> Scapy (ARP/ICMP/TCP engineering)</li>
        <li><strong>Malware Signatures:</strong> YARA</li>
        <li><strong>Host Telemetry:</strong> psutil</li>
        <li><strong>Visuals:</strong> Pyvis (Dynamic Graphviz)</li>
        <li><strong>Forensics:</strong> Watchdog, PyAutoGUI</li>
        <li><strong>MITRE ATT&CK:</strong> Automatic event correlation</li>
        <li><strong>Anomaly Detection:</strong> Z-Score based outlier detection</li>
        <li><strong>Response:</strong> Active Suspend/Kill/Resume actions</li>
      </ul>

      <h3>Live Demo (Live Research Preview)</h3>
      <p>A live demonstration is available on YouTube:</p>
      
      <div class="my-6 p-4 bg-muted/30 rounded border border-border text-center">
        <a href="https://www.youtube.com/watch?v=SchoX-Gfajg" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-primary hover:underline font-bold text-lg">
          🔗 Watch ShadowLab Defender Demo
        </a>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 mt-8">
        <h4 class="font-mono font-bold mb-4">Quickstart</h4>
        <pre class="bg-muted p-4 rounded overflow-x-auto text-sm font-mono text-foreground">
python -m venv venv
# Windows
venv\\Scripts\\activate
# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt
streamlit run app.py</pre>
      </div>
    `
  },
  {
    id: 9,
    title: "Certified Web Application Professional (WAHS)",
    excerpt: "This was not a multiple-choice exam. This was a 6-hour live offensive security operation against real vulnerable web applications. Here is my breakdown of the WAHS certification.",
    date: "December 10, 2024",
    author: "Ulfat Ibadov",
    readTime: "8 min read",
    category: "Certification",
    image: "/upload/wahs.jpg",
    content: `
      <h2>Certified Web Application Professional</h2>
      <p>On 10 December 2024, I successfully passed the EC-Council Web Application Hacking & Security (WAHS) exam and earned the title of <strong>Certified Web Application Professional</strong>.</p>
      
      <p>This was not a multiple-choice exam. This was a 6-hour live offensive security operation against real vulnerable web applications.</p>
      
      <p class="font-medium text-lg my-4">The goal was simple: Break into web applications the way real attackers do — and prove it.</p>

      <h3>📄 My Official Result</h3>
      <div class="bg-muted/30 p-6 rounded-lg my-6 border border-border">
        <p>According to my EC-Council exam transcript, I passed the WAHS exam with:</p>
        <ul class="space-y-2 mt-4">
          <li><strong>Candidate:</strong> Ulfat Ibadov</li>
          <li><strong>Certification:</strong> Certified Web Application Professional</li>
          <li><strong>Exam:</strong> EC-Council WAHS</li>
          <li><strong>Score:</strong> 300</li>
          <li><strong>Status:</strong> <span class="text-green-600 font-bold">PASSED</span></li>
          <li><strong>Date:</strong> 10 December 2024</li>
        </ul>
      </div>
      
      <p>This is a performance-based credential, not theory. You do not pass WAHS by memorizing OWASP — you pass it by owning systems.</p>

      <h3>🧠 What WAHS Really Tests</h3>
      <p>WAHS is designed to answer one question: <strong>Can you actually hack modern web applications?</strong></p>
      
      <p>Not “Do you know what SQL Injection is?” But: Can you exploit it when it’s hidden behind real logic, sessions, tokens, and filters?</p>
      
      <p>The exam measures skill across:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>OWASP Top 10</li>
        <li>CMS exploitation (WordPress, custom apps)</li>
        <li>Authentication & session attacks</li>
        <li>File upload & RCE</li>
        <li>Parameter tampering</li>
        <li>Privilege escalation</li>
        <li>Server-side exploitation</li>
      </ul>
      
      <p class="font-bold">And most importantly: Can you go from HTTP request → web shell → root?</p>

      <h3>⚔️ What I Actually Did in the Exam</h3>
      <p>During the WAHS lab I had to:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Enumerate CMS platforms using WhatWeb, WPScan, Gobuster</li>
        <li>Bypass logins using SQL Injection</li>
        <li>Take over WordPress via theme file injection</li>
        <li>Upload PHP reverse shells</li>
        <li>Pivot from www-data → real user</li>
        <li>Crack SSH private keys</li>
        <li>Use LinPEAS for Linux privilege escalation</li>
        <li>Extract flags, user.txt, and root.txt</li>
      </ul>
      
      <p>These weren’t CTF puzzles — they were real-world attack chains: HTTP → CMS → Web Shell → SSH → Root. This is exactly how real attackers compromise production servers. The WAHS exam proves you can replicate that workflow under pressure.</p>

      <h3>🔥 Why WAHS Is Different</h3>
      <p>Most certifications test “What is XSS?” or “What is SQLi?”. WAHS tests:</p>
      <blockquote class="italic border-l-4 border-primary pl-4 my-4">
        “Here is a live web application. Break it. Own it. Extract the data.”
      </blockquote>
      
      <p>No hints. No step-by-step guides. Only a target IP and a mission.</p>
      <p>That is why WAHS is respected in Web penetration testing, Red team operations, Bug bounty, and Offensive security roles.</p>

      <h3>🏆 Certification Levels</h3>
      <p>WAHS is tiered:</p>
      <ul class="list-none space-y-2 mb-4">
        <li class="flex justify-between border-b pb-1"><span>60%+</span> <span class="text-muted-foreground">Certified Web Application Associate</span></li>
        <li class="flex justify-between border-b pb-1 font-bold text-primary"><span>75%+</span> <span>Certified Web Application Professional</span></li>
        <li class="flex justify-between border-b pb-1"><span>90%+</span> <span class="text-muted-foreground">Certified Web Application Expert</span></li>
      </ul>
      <p>I earned the Professional level — meaning I can independently perform full-scope web application penetration testing.</p>

      <h3>🧑‍💻 What This Means for My Career</h3>
      <p>This certification proves that I can:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Identify OWASP Top-10 vulnerabilities in live systems</li>
        <li>Exploit logic flaws and auth weaknesses</li>
        <li>Weaponize file uploads into RCE</li>
        <li>Escalate from web access to full server compromise</li>
        <li>Translate findings into real security risk</li>
      </ul>

      <h3>🧩 My Skillset After WAHS</h3>
      <p>WAHS validated my hands-on capability in:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Advanced Web Application Penetration Testing</li>
        <li>SQLi, XSS, CSRF, SSRF</li>
        <li>File Upload → RCE</li>
        <li>CMS exploitation</li>
        <li>Session & cookie attacks</li>
        <li>Privilege escalation</li>
        <li>Server-side post-exploitation</li>
      </ul>
      <p>This is not theory. This is offensive reality.</p>

      <h3>🚀 Final Thoughts</h3>
      <p>WAHS is not easy. It is not forgiving. And it does not reward guessing.</p>
      <p>It rewards one thing: <strong>Real web hacking skill.</strong></p>
      <p>Passing it confirms that I can operate as a professional web penetration tester — not just someone who reads about vulnerabilities, but someone who can turn them into access.</p>

      <img src="/upload/wahs_result.jpeg" alt="WAHS Exam Result" class="rounded-lg shadow-lg w-full mt-8 mb-6" />
    `
  }
];
