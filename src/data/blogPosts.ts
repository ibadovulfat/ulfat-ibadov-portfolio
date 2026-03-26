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
    title: "Certified Ethical Hacker (CEH ANSI) - What I Passed and What It Really Means",
    excerpt: "On 22 October 2025, I passed the EC-Council Certified Ethical Hacker (CEH ANSI) theory examination. This exam tests whether you understand how real attacks are executed, detected, and abused.",
    date: "October 22, 2025",
    author: "Ulfat Ibadov",
    readTime: "7 min read",
    category: "Certification",
    image: "/upload/ceh_theory.jpg",
    content: `
      <p>On 22 October 2025, I passed the EC-Council Certified Ethical Hacker (CEH ANSI) theory examination with a score of 109 / 125.</p>

      <p>This exam does not test memorization. It tests whether you understand how real attacks are executed, detected, and abused across modern infrastructures.</p>

      <p class="font-medium text-lg my-4">CEH is about offensive reasoning - knowing how attackers think so defenders can stop them.</p>

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
      <p>CEH is no longer limited to Windows and Linux - it covers hybrid and embedded systems:</p>
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
      
      <p>This is not automated scanning - every task requires manual thinking, tool selection, and attack logic.</p>

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
      <p>My research and projects - including ShadowLab Defender - focus on how real attacker behavior is observed, scored, and detected by modern EDRs.</p>
      
      <p>CEH Practical validates the offensive side of this equation: How attacks actually look when executed against live systems.</p>
      
      <p>This gives me the unique position of understanding both sides of the telemetry: How attackers operate and How defenders see them. That intersection is where modern cybersecurity lives.</p>

      <img src="/upload/ceh_practical_result.jpeg" alt="CEH Practical Result" class="rounded-lg shadow-lg w-full mt-8 mb-6" />
    `
  },
  {
    id: 10,
    title: "ShadowLab",
    excerpt: "An API-first Windows security operations and research platform for telemetry, process investigation, ATT&CK-aware detection, enterprise casework, and controlled response workflows.",
    date: "March 2026",
    author: "Ulfat Ibadov",
    readTime: "12 min read",
    category: "Security Research",
    image: "/upload/proje.jpeg",
    content: `
      <h2>ShadowLab: API-First Windows Security Operations Lab</h2>
      <p class="text-sm text-yellow-600 bg-yellow-100 p-2 rounded mb-4 border border-yellow-200"><strong>Note:</strong> This project is intended strictly for owned, isolated, and authorized lab environments. Usage requires explicit permission from the author. Created by Ulfat Ibadov.</p>

      <p>ShadowLab is an API-first Windows security operations and research platform built for telemetry collection, process investigation, detection engineering, case-driven triage, and controlled response in local lab environments.</p>

      <p>The project evolved from a dashboard-style prototype into a more complete platform with a FastAPI backend, a native PySide6 desktop client, modular services, RBAC-aware APIs, and an investigation workflow designed to feel closer to a real security product than a simple demo panel.</p>
      
      <p class="font-medium text-lg my-4">This is not a bypass or exploitation project. Its purpose is to study host behavior, investigation workflows, signal enrichment, and analyst-facing response operations in controlled environments.</p>

      <h3>What Is ShadowLab?</h3>
      <p>ShadowLab is a defensive cybersecurity research platform designed around Windows-oriented investigation workflows. It brings together:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Host telemetry, event visibility, and incident artifact collection</li>
        <li>Process intelligence with command-line, hash, signature, tree, and memory-analysis context</li>
        <li>Persistence hunting, remediation, rollback, and quarantine workflows</li>
        <li>Layered YARA triage with YARAify, local rules, and memory-focused rule packs</li>
        <li>Threat-intelligence enrichment for suspicious hashes and IPs</li>
        <li>Timeline, graph, evidence, history, and artifact management</li>
        <li>Enterprise case handling with tasks, notes, stories, assignments, and reporting</li>
        <li>Controlled deception workflows such as honeypots, canaries, and evidence capture</li>
      </ul>
      <p>Rather than acting as a passive dashboard, ShadowLab is built as an operator-facing investigation surface where detections, context, triage, ATT&amp;CK mapping, and response are handled in one workflow.</p>

      <h3>Purpose</h3>
      <p>ShadowLab was developed as part of an advanced cybersecurity portfolio to demonstrate applied security engineering across multiple areas, including:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Behavioral detection and rule-based scoring</li>
        <li>Process investigation and forensic visibility</li>
        <li>Persistence analysis and remediation workflows</li>
        <li>Threat-intelligence correlation</li>
        <li>Incident triage, enterprise case management, and response orchestration</li>
        <li>MITRE ATT&amp;CK lifecycle, coverage, and technique-aware investigation mapping</li>
        <li>WHIDS and HIDS integration for multi-source visibility</li>
        <li>Deception-based defensive controls</li>
        <li>Desktop product design for cybersecurity operations</li>
        <li>API-first architecture for extensibility, auth enforcement, and future automation paths</li>
      </ul>
      <p>The project reflects a product-oriented security engineering approach rather than a proof-of-concept dashboard.</p>

      <h3>How It Works</h3>
      <p>ShadowLab operates as a modular investigation pipeline:</p>

      <div class="space-y-4 my-6">
        <div>
          <h4 class="font-bold text-primary">1. Telemetry and Process Visibility</h4>
          <p>ShadowLab collects behavioral and system-level telemetry, tracks incidents and artifacts, and surfaces process metadata such as hashes, signer state, command-line context, tree relationships, and host-level signals useful to analysts.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">2. Investigation and Hunt Workflows</h4>
          <p>Operators can inspect process internals, extract strings, review trees, trigger layered YARA scans, enrich artifacts with external intelligence, and pivot through graph and timeline views to understand suspicious behavior faster.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">3. Incident and Response Operations</h4>
          <p>The platform supports incident creation, ownership and status tracking, quarantine handling, persistence review, evidence retention, and controlled response actions such as suspend, kill, kill-tree, and supported remediation workflows.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">4. Enterprise and ATT&amp;CK Context</h4>
          <p>ShadowLab also includes enterprise investigation workflows with case boards, tasks, notes, stories, saved views, and ATT&amp;CK lifecycle support for bundle loading, coverage review, tactic heat, and export-oriented reporting.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">5. Deception and Evidence Collection</h4>
          <p>Controlled deception workflows such as honeypots, canaries, and evidence lockers support defensive experimentation and lab-based incident simulation without turning the platform into an offensive toolkit.</p>
        </div>

        <div>
          <h4 class="font-bold text-primary">6. Platform Architecture</h4>
          <p>The project follows an API-first model:<br/>FastAPI powers the backend, PySide6 provides the native desktop interface, and modular services handle telemetry, graph correlation, reporting, response, and enterprise logic. This makes the platform easier to extend and closer to a production-minded SOC workstation.</p>
        </div>
      </div>

      <h3>Current Desktop Surface</h3>
      <p>The latest desktop workflow spans dashboards, process investigation, persistence, threat intel, static analysis, deception, network visibility, hosts, graph, timeline, quarantine, artifacts, enterprise operations, security ops, and scenario-oriented analysis views.</p>

      <h3>Technical Features & Stack</h3>
      <div class="my-4 bg-muted/20 p-4 rounded border border-border">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>API-first backend with FastAPI</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>Native desktop client with PySide6</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>RBAC-aware auth model with viewer, analyst, and admin roles</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>Process intelligence and behavioral inspection</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>Threat intel integration and artifact enrichment</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>Layered YARA scanning with local, community, and memory-focused rule packs</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>Persistence discovery and remediation workflows</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>Timeline, graph, host, artifact, and quarantine views</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>MITRE ATT&amp;CK coverage, bundle lifecycle, and export flows</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>WHIDS and OSSEC/HIDS ingest and enterprise correlation</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>Deception workflows with honeypots and canaries</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>Case workflow, reporting, and executive investigation exports</span></div>
          <div class="flex items-start gap-3"><span class="mt-1 text-primary">•</span><span>SQLite default with PostgreSQL-ready persistence support</span></div>
        </div>
      </div>

      <p class="text-sm bg-muted/30 p-4 rounded border border-border">
        <strong>Tech Stack:</strong> Python, FastAPI, Uvicorn, PySide6, SQLite, PostgreSQL support, YAML, YARA, psutil, Requests, Pandas, NumPy, Plotly, Matplotlib, pyvis, ReportLab, Docker, WHIDS integrations, OSSEC/HIDS integrations, and ATT&amp;CK-oriented investigation/export workflows
      </p>

      <div class="my-6 p-4 bg-muted/30 rounded border border-border text-center flex flex-col gap-3">
        <a href="https://shadowlab.about.surf/" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center items-center text-primary hover:underline font-bold text-lg">
          🔗 ShadowLab Site
        </a>
        <a href="https://github.com/ibadovulfat/shadowlab-detection-lab" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center items-center text-primary hover:underline font-bold text-lg">
          🔗 GitHub Repository
        </a>
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
      
      <p class="font-medium text-lg my-4">The goal was simple: Break into web applications the way real attackers do - and prove it.</p>

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
      
      <p>This is a performance-based credential, not theory. You do not pass WAHS by memorizing OWASP - you pass it by owning systems.</p>

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
      
      <p>These weren’t CTF puzzles - they were real-world attack chains: HTTP → CMS → Web Shell → SSH → Root. This is exactly how real attackers compromise production servers. The WAHS exam proves you can replicate that workflow under pressure.</p>

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
      <p>I earned the Professional level - meaning I can independently perform full-scope web application penetration testing.</p>

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
      <p>Passing it confirms that I can operate as a professional web penetration tester - not just someone who reads about vulnerabilities, but someone who can turn them into access.</p>

      <img src="/upload/wahs_result.jpeg" alt="WAHS Exam Result" class="rounded-lg shadow-lg w-full mt-8 mb-6" />
    `
  }
];
