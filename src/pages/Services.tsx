import React from "react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";
import { Shield, Bug, FileSearch, Lock, Code, EyeOff } from "lucide-react";

const securityServices = [
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Penetration Testing",
    description: "Comprehensive assessment of your systems, networks, and applications to identify vulnerabilities before malicious actors do.",
    features: [
      "Web Application Penetration Testing",
      "Network Infrastructure Testing",
      "Mobile Application Security Assessment",
      "Physical Security Testing",
      "Detailed remediation guidance",
    ]
  },
  {
    icon: <Bug className="w-10 h-10 text-primary" />,
    title: "Offensive Security Testing",
    description: "Simulated cyber attacks to evaluate your organization's security posture and response capabilities.",
    features: [
      "Red Team Operations",
      "Social Engineering Campaigns",
      "Physical Security Assessment",
      "Advanced Persistent Threat Simulation",
      "Security Control Validation",
    ]
  },
  {
    icon: <FileSearch className="w-10 h-10 text-primary" />,
    title: "Malware Analysis",
    description: "In-depth examination of malicious software to understand its behavior, purpose, and potential impact on your systems.",
    features: [
      "Static and Dynamic Analysis",
      "Reverse Engineering",
      "Threat Intelligence Integration",
      "Incident Response Support",
      "Custom Detection Development",
    ]
  },
  {
    icon: <Lock className="w-10 h-10 text-primary" />,
    title: "Security Architecture Review",
    description: "Evaluation of your security design and implementation to identify weaknesses and recommend improvements.",
    features: [
      "Security Control Assessment",
      "Architecture Design Review",
      "Secure Configuration Validation",
      "Defense-in-Depth Analysis",
      "Security Roadmap Development",
    ]
  },
  {
    icon: <Code className="w-10 h-10 text-primary" />,
    title: "Secure Code Review",
    description: "Manual and automated assessment of application source code to identify security vulnerabilities.",
    features: [
      "SAST & DAST Integration",
      "Manual Code Review",
      "Secure Coding Practices",
      "Developer Security Training",
      "CI/CD Security Integration",
    ]
  },
  {
    icon: <EyeOff className="w-10 h-10 text-primary" />,
    title: "Security Awareness Training",
    description: "Educate your team about security threats and best practices to create a security-conscious culture.",
    features: [
      "Phishing Awareness",
      "Social Engineering Defense",
      "Security Best Practices",
      "Compliance Training",
      "Simulated Attack Exercises",
    ]
  },
];

const Services = () => {
  return (
    <>
      {/* Hero Section */}
      <Section fullHeight className="flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <ParallaxEffect speed={0.1} direction="up">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-4">
              Services
            </span>
            <h1 className="section-heading mb-6">
              Expert Cybersecurity Services
            </h1>
            <p className="section-subheading max-w-2xl mx-auto">
              Comprehensive security solutions to protect your digital assets and infrastructure from evolving cyber threats.
            </p>
          </ParallaxEffect>
        </div>
      </Section>

      {/* Services Grid */}
      <Section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityServices.map((service, index) => (
            <div
              key={index}
              className="p-8 border border-border rounded-lg hover-lift transition-all duration-500 hover:border-primary/40 dark:hover:border-primary/20"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-display font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section className="bg-secondary/50 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-semibold mb-12 text-center">Our Security Assessment Process</h2>
          
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <h3 className="text-xl font-display font-medium mb-4">1. Discovery & Scoping</h3>
                <p className="text-muted-foreground mb-4">
                  We begin by understanding your environment, goals, and concerns to define a precise scope for security assessment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Identify critical assets and business processes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Determine testing boundaries and constraints</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Establish clear objectives and success criteria</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-semibold">01</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-semibold">02</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-display font-medium mb-4">2. Security Assessment</h3>
                <p className="text-muted-foreground mb-4">
                  Our team conducts comprehensive testing using a combination of automated tools and manual techniques.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Vulnerability identification and exploitation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Security control effectiveness evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Risk assessment based on real-world scenarios</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <h3 className="text-xl font-display font-medium mb-4">3. Analysis & Reporting</h3>
                <p className="text-muted-foreground mb-4">
                  We analyze our findings and develop detailed reports with actionable recommendations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Prioritized vulnerability assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Clear remediation guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Executive summary and detailed technical report</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-semibold">03</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-semibold">04</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-display font-medium mb-4">4. Remediation Support</h3>
                <p className="text-muted-foreground mb-4">
                  We provide guidance and support to help you address the identified issues effectively.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Technical remediation assistance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Security control implementation guidance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Validation testing for implemented fixes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-4">
            Ready to secure your digital assets?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact us to discuss how our cybersecurity services can help protect your organization from evolving threats.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-md text-sm font-medium"
          >
            Schedule a Consultation
          </a>
        </div>
      </Section>
    </>
  );
};

export default Services;
