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
    id: 11,
    title: "130 Flags, Five Ranges: What the CPENT Practice Labs Actually Teach You",
    excerpt: "I spent weeks living inside the CPENT practice range - Active Directory, Linux CTF, IoT firmware, binary exploitation and web. This is what stuck: the techniques, the rabbit holes, and the mindset the labs quietly force on you.",
    date: "September 24, 2026",
    author: "Ulfat Ibadov",
    readTime: "14 min read",
    category: "Penetration Testing",
    image: "/upload/cpent_live.jpeg",
    content: `
      <p>I just finished the full CPENT practice range - all 130 flags across five separate lab networks, and more 2 a.m. sessions than I'd like to admit. If you've only skimmed the syllabus, "Certified Penetration Testing Professional" reads like another multiple-choice badge. It isn't. The range drops you onto a live enterprise network and then walks away. No hints, no "did you try this?", no reset button that saves your progress. You either read the box or you don't.</p>

      <img src="/upload/cpent_live.jpeg" alt="CPENT practice range console" class="rounded-lg border border-border my-6 w-full" />

      <p class="font-medium text-lg my-4">CPENT doesn't test whether you know an attack exists. It tests whether you can chain a dozen of them together, under time pressure, without a walkthrough holding your hand.</p>

      <p>The 130 challenges are split across five ranges, and each one has its own personality:</p>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>Binary</strong> - Windows and Linux stack overflows, Ghidra reversing, ROP gadgets and mitigation analysis (Ch 1-25)</li>
        <li><strong>IoT</strong> - firmware teardown, Squashfs/JFFS2 unpacking, and XOR-encrypted images that don't want to be read (Ch 26-61)</li>
        <li><strong>Active Directory</strong> - a genuine multi-domain forest with real inter-domain trusts (Ch 62-99)</li>
        <li><strong>Linux CTF</strong> - service misconfiguration to root, the honest way (Ch 100-118)</li>
        <li><strong>Web</strong> - SQL injection, arbitrary upload, Git leaks and CMS RCE (Ch 119-129)</li>
      </ul>

      <p>I'm not going to reprint every flag here - the full challenge-by-challenge write-ups are in the repo linked at the bottom. What I want to talk about is the part that doesn't fit in an answer key: how you actually move through a range like this, and where people lose hours.</p>

      <h2>The Active Directory range is the whole exam in miniature</h2>

      <p>If you take one thing seriously, make it AD. The forest here spans five generations of Windows Server - 2008 R2 through 2022 - across four domains (<code>CPENT.LOCALNET</code>, <code>LPT.COM</code>, <code>ECC.LOCALNET</code>, and a child domain), plus an Exchange 2016 box wired in for good measure. That mix is deliberate. It forces you to care about SMB signing, legacy protocol support, and trust direction all at once.</p>

      <p>Recon sets the tone. Before touching a single exploit I sweep the subnet with NetExec just to build a map - who's a DC, who requires SMB signing, which host is stuck on 2008:</p>

      <pre class="bg-muted/40 border border-border rounded-lg p-4 overflow-x-auto text-sm my-4"><code>for ip in 172.25.170.12 172.25.170.80 172.25.170.190 172.25.170.200; do
  echo "=== $ip ==="
  netexec smb $ip
done</code></pre>

      <p>From there it's a Kerberos game. Kerbrute for user enumeration, then a bruteuser pass to turn a valid SPN account into credentials:</p>

      <pre class="bg-muted/40 border border-border rounded-lg p-4 overflow-x-auto text-sm my-4"><code>kerbrute userenum -d LPT.COM --dc 172.25.170.190 Usernames.txt
kerbrute bruteuser -d LPT.COM --dc 172.25.170.190 Passwords.txt user-one</code></pre>

      <p>One detail the range quietly teaches: expired passwords. You'll crack a valid credential and still get bounced, because the account's password has expired. The fix isn't in most cheat sheets - you reset it in-place over the network with <code>impacket-changepasswd</code>, then carry on with RPC enumeration. That single gotcha eats people alive on exam day.</p>

      <p>The part I enjoyed most was mapping trusts. Once you psexec onto the forest-root DC, a single command lays the whole topology bare:</p>

      <pre class="bg-muted/40 border border-border rounded-lg p-4 overflow-x-auto text-sm my-4"><code>nltest /domain_trusts /all_trusts /v</code></pre>

      <p>Reading that output - spotting the <em>foresttrans</em> trust to ECC, the <em>withinforest</em> child, the direction of each arrow - is what turns a pile of boxes into an attack path. Kerberoasting with <code>GetUserSPNs</code>, ACL abuse to grab a hash, medusa/NetExec for the older signing-optional hosts: those are all just tools. The trust map is the strategy.</p>

      <p class="font-medium text-lg my-4">In AD, enumeration isn't the boring part before the hack. It <em>is</em> the hack. The exploit is usually a two-line afterthought once you understand who trusts whom.</p>

      <h2>Linux CTF: root is almost always a misconfiguration, not a 0-day</h2>

      <p>The CTF range (192.168.1.0/24) is a reminder that most real compromises are boring in the best way. Six targets, and the escalation vector on nearly every one is something an admin got wrong, not something exotic:</p>

      <ul class="list-disc pl-6 mb-4">
        <li>A Hydra SSH spray gets you <code>rebecca</code>, then a sudo-permitted <code>python3</code> is a straight GTFOBins ride to root.</li>
        <li>Another box hands you <code>awk</code> as root - <code>sudo /usr/bin/awk 'BEGIN {system("/bin/sh")}'</code> and you're done.</li>
        <li>An anonymous RSYNC module (port 873) leaks a flag with zero exploitation at all.</li>
        <li>"Online Book Store 1.0" and "Job Portal 1.0" give web RCE footholds; the second escalates with PwnKit (CVE-2021-4034), which in 2022 turned nearly every Linux box on the planet into an instant root.</li>
      </ul>

      <p>The one I want people to internalise is the SSH key hidden behind a file-read bug. On the last target, a <code>killmyeye.php</code> LFI lets you pull an <code>id_rsa</code> - but it's base64-encoded on disk. Miss the encoding and you'll swear the key is corrupt. Decode it, fix the permissions to <code>600</code>, and you SSH straight in as root. The lesson isn't "know PwnKit." It's <em>always check how the thing is stored before you decide it's broken.</em></p>

      <h2>IoT firmware: the flags are inside files that don't want to open</h2>

      <p>The IoT range was my favourite, because it rewards patience over speed. You're handed raw firmware images and asked structural questions - filesystem type, inode counts, header offsets, compression format. Everything starts with <code>binwalk</code>:</p>

      <pre class="bg-muted/40 border border-border rounded-lg p-4 overflow-x-auto text-sm my-4"><code>binwalk -t FileOne.bin
# 0x0      BIN-Header, board ID 1550, firmware version 1.0.0
# 0x20     TRX firmware header, little endian
# 0x3C     gzip compressed data, original file name: "piggy"
# 0x192728 Squashfs filesystem, v3.0, 447 inodes</code></pre>

      <p>Squashfs, JFFS2, uImage, TRX, LZMA, gzip "piggy" blobs - you learn to recognise them by their header bytes, carve them out with <code>dd</code>, and unpack recursively until a real filesystem falls out. Then it's grep archaeology: hardcoded credentials in <code>check_fwmode</code>, HNAP/SOAP endpoints, service binaries compiled for MIPS.</p>

      <p>The standout challenge is an XOR-encrypted uImage. Its entropy is flat and high - a dead giveaway that it's encrypted, not compressed. You recover an 8-byte repeating XOR key by comparing the encrypted header against the known uImage magic, decrypt the image, and only then can binwalk see the LZMA payload underneath. That single problem taught me more about entropy analysis than any course chapter did.</p>

      <p class="font-medium text-lg my-4">Firmware work is 10% exploitation and 90% "what format is this, and what is it hiding under the compression?"</p>

      <h2>Binary: the fundamentals still decide everything</h2>

      <p>The binary range keeps you honest. It opens with a Windows classic - CesarFTP 0.99g, vulnerable to a stack overflow through the <code>MKD</code> verb - and makes you understand the exploit rather than just fire a Metasploit module at it. On Linux it swings to reversing: pull an ELF apart in Ghidra, read <code>checksec</code> like a weather report (NX, PIE, canary, RELRO), and decide your approach based on which mitigations are actually on.</p>

      <p>The overflow work is the muscle-memory loop every exploit dev knows by heart - fuzz to crash, find the exact offset, control the instruction pointer:</p>

      <pre class="bg-muted/40 border border-border rounded-lg p-4 overflow-x-auto text-sm my-4"><code>pattern_create.rb -l 200
# crash the service, capture the value in RIP/EIP
pattern_offset.rb -q &lt;value&gt;   # exact offset to overwrite</code></pre>

      <p>When NX is on, you can't just drop shellcode on the stack - so the range pushes you toward ROP: hunting gadgets with <code>readelf</code> and <code>ropper</code>, stitching them into a chain, doing ret2libc when the binary is kind enough to leak an address. None of this is new, and that's exactly the point. The primitives from 15 years ago still work because the fundamentals never changed.</p>

      <h2>Web: chained bugs, not single findings</h2>

      <p>The web range (10.10.1.0/24) is where "real pentest" and "CTF" meet. Individually the bugs are textbook; the difficulty is chaining them into root. A few that stuck:</p>

      <ul class="list-disc pl-6 mb-4">
        <li><strong>Time-based blind SQLi</strong> on a login parameter, automated with sqlmap, dumps a <code>users</code> table - and that reused password is your SSH foothold, which then escalates through a sudo <code>awk</code>. One bug feeds the next.</li>
        <li><strong>Git repository disclosure</strong> - anonymous FTP leaks a repo, and the credentials aren't in the current code, they're in the <em>commit history</em>. Credential reuse does the rest.</li>
        <li><strong>Arbitrary file upload</strong> to a foothold, then a SUID <code>/usr/bin/find</code> for root - <code>find . -exec /bin/sh \\; -quit</code>.</li>
        <li><strong>WordPress 5.8.1</strong> with weak admin creds, theme-editor RCE, and then the real prize: a world-writable cron script (<code>data.sh</code>) running as root. Write to it, wait one minute, collect root.</li>
      </ul>

      <p class="font-medium text-lg my-4">No web target here falls to a single vulnerability. Every one is a chain - foothold bug, then a privilege bug, then patience. That's what makes it feel like real work.</p>

      <h2>What actually mattered</h2>

      <p>After 130 flags, the things that saved me weren't tools - they were habits:</p>

      <ul class="list-disc pl-6 mb-4">
        <li><strong>Notes as you go.</strong> Every credential, every IP, every trust arrow, written down the moment you find it. Half the range is remembering something you saw two hours ago on a different box.</li>
        <li><strong>Enumerate wider than feels necessary.</strong> The flag is often in the service you almost skipped - the RSYNC module, port 3000 running Git, the "boring" 2008 host with signing disabled.</li>
        <li><strong>Respect the file, not just the exploit.</strong> Base64 keys, XOR firmware, credentials buried in Git history - the range punishes anyone who assumes data is in the format they expected.</li>
        <li><strong>Chains over findings.</strong> A single vuln is a screenshot. A chain is a compromise. CPENT only pays you for the chain.</li>
      </ul>

      <p>Would I recommend the practice range? Without hesitation - but treat it as training for a mindset, not a checklist of exploits. The tooling you'll forget. The instinct to map trust before you attack, to question a file format before you call it corrupt, to keep enumerating when the obvious path dead-ends - that's what you keep.</p>

      <div class="my-6 p-4 bg-muted/30 rounded border border-border text-center flex flex-col gap-3">
        <a href="https://github.com/ibadovulfat/CPENT-Practice-Range-Labs" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center items-center text-primary hover:underline font-bold text-lg">
          Full walkthroughs - all 130 challenges on GitHub
        </a>
      </div>

      <p class="text-sm text-muted-foreground">Everything here is from EC-Council's CPENT <em>practice</em> range, documented for educational and methodology purposes. Test only systems you're authorised to test.</p>
    `
  },
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
    excerpt: "A Windows-focused cybersecurity investigation platform built for behavioral monitoring, threat hunting, incident triage, and response-oriented defensive workflows.",
    date: "January 2026",
    author: "Ulfat Ibadov",
    readTime: "10 min read",
    category: "Security Research",
    image: "/upload/proje.jpeg",
    content: `
      <h2>ShadowLab: Cybersecurity Investigation Platform</h2>
      <p class="text-sm text-yellow-600 bg-yellow-100 p-2 rounded mb-4 border border-yellow-200"><strong>Note:</strong> This project is intended strictly for owned, isolated, and authorized lab environments. Usage requires explicit permission from the author. Created by Ulfat Ibadov.</p>

      <p>ShadowLab is a Windows-focused cybersecurity investigation platform built for behavioral monitoring, threat hunting, incident triage, and response-oriented defensive workflows.</p>

      <p>ShadowLab was redesigned from an earlier dashboard-style prototype into an API-first security platform with a FastAPI backend and a native PySide6 desktop client. The project is now structured around modular services for telemetry, detection, process intelligence, incident handling, and response orchestration.</p>
      
      <p class="font-medium text-lg my-4">This is not a bypass or exploitation project. Its purpose is to study host behavior, investigation workflows, signal enrichment, and analyst-facing response operations in controlled environments.</p>

      <h3>What Is ShadowLab?</h3>
      <p>ShadowLab is a defensive cybersecurity research platform designed to support Windows-oriented investigation and response workflows. It brings together:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Process intelligence and behavioral inspection</li>
        <li>Host telemetry and event visibility</li>
        <li>Persistence hunting and remediation</li>
        <li>YARA-based process inspection</li>
        <li>Threat-intelligence enrichment</li>
        <li>Incident and timeline management</li>
        <li>Quarantine and response actions</li>
        <li>Deception-oriented controls such as honeypots, canaries, and evidence capture</li>
      </ul>
      <p>Rather than acting as a simple monitoring dashboard, ShadowLab is designed as an operator-focused investigation surface where detection, context, triage, and response are handled inside a unified workflow.</p>

      <h3>Purpose</h3>
      <p>ShadowLab was developed as part of an advanced cybersecurity portfolio to demonstrate applied security engineering across multiple areas, including:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Behavioral detection and rule-based scoring</li>
        <li>Process investigation and forensic visibility</li>
        <li>Persistence analysis and remediation workflows</li>
        <li>Threat-intelligence correlation</li>
        <li>Incident triage and response orchestration</li>
        <li>Deception-based defensive controls</li>
        <li>Desktop product design for cybersecurity operations</li>
        <li>API-first architecture for extensibility, Docker portability, and future integration paths</li>
      </ul>
      <p>The project reflects a product-oriented security engineering approach rather than a proof-of-concept dashboard.</p>

      <h3>How It Works</h3>
      <p>ShadowLab operates as a modular investigation pipeline:</p>

      <div class="space-y-4 my-6">
        <div>
          <h4 class="font-bold text-primary">1. Telemetry and Process Visibility</h4>
          <p>ShadowLab collects behavioral and system-level telemetry, surfaces process metadata, command-line context, hashes, signature status, and other host-level signals relevant to analyst workflows.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">2. Investigation and Hunt Workflows</h4>
          <p>Operators can inspect process internals, extract strings, run YARA scans, review process trees, perform sandbox-style traces, and enrich suspicious artifacts with external intelligence sources.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">3. Incident and Response Operations</h4>
          <p>The platform supports incident creation, timeline review, ownership and status tracking, quarantine handling, and controlled response actions such as suspend, kill, kill-tree, and supported persistence remediation.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">4. Deception and Evidence Collection</h4>
          <p>ShadowLab includes controlled defensive deception workflows such as honeypots, canaries, and evidence capture paths to support lab-based research and incident simulation.</p>
        </div>
        
        <div>
          <h4 class="font-bold text-primary">5. Platform Architecture</h4>
          <p>The project follows an API-first model:<br/>FastAPI powers the backend service layer, while PySide6 provides the native desktop interface. This architecture makes the platform more maintainable, extensible, and closer to a real security product direction.</p>
        </div>
      </div>

      <h3>Technical Features & Stack</h3>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm my-4 bg-muted/20 p-4 rounded border border-border list-disc pl-8">
        <li>API-first backend with FastAPI</li>
        <li>Native desktop client with PySide6</li>
        <li>Process intelligence and behavioral inspection</li>
        <li>Threat intel integration (VirusTotal, MalwareBazaar, AbuseIPDB)</li>
        <li>YARA scanning with local and curated rule packs</li>
        <li>Persistence discovery and remediation workflows</li>
        <li>Timeline, incident, host, and quarantine views</li>
        <li>Deception workflows with honeypots and canaries</li>
        <li>Artifact generation and report export</li>
        <li>Docker-ready backend and Windows EXE direction</li>
      </ul>

      <p class="text-sm bg-muted/30 p-4 rounded border border-border">
        <strong>Tech Stack:</strong> Python, FastAPI, Uvicorn, PySide6, SQLite, YAML, YARA, psutil, Scapy, Requests, Watchdog, Pandas, NumPy, scikit-learn, Plotly, Matplotlib, pyvis, ReportLab, PyAutoGUI, PyInstaller, Docker, VirusTotal API, MalwareBazaar API, AbuseIPDB API
      </p>

      <h3>Links</h3>
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
