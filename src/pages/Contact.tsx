import React, { useState } from "react";
import { Send, Mail, MapPin, Linkedin } from "lucide-react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";




const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Sanitize and validate inputs
      const sanitizedData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      // Form validation
      if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.subject || !sanitizedData.message) {
        throw new Error("All fields are required");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // In a real application, we would send this to a backend
      console.log("Sending email to ulfat@about.surf");
      console.log("Form data:", sanitizedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Section fullHeight className="flex items-center justify-center animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <ParallaxEffect speed={0.1} direction="up">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-4">
              Contact
            </span>
            <h1 className="section-heading mb-6">
              Let's Connect
            </h1>
            <p className="section-subheading max-w-2xl mx-auto">
              I'm available to discuss cybersecurity solutions, penetration testing services, or any security concerns you may have.
            </p>
          </ParallaxEffect>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section className="py-24 animate-fade-in" id="contactForm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-display font-bold mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                    required
                    maxLength={100}
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    title="Please enter a valid email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  required
                  maxLength={200}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                  required
                  maxLength={2000}
                ></textarea>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-6 py-3 hover:scale-105 transition-all"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-display font-bold mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1 p-2 rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <HoverCard>
                    <HoverCardTrigger>
                      <a href="mailto:ulfat@about.surf" className="text-muted-foreground hover:text-primary transition-colors">
                        ulfat@about.surf
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      Click to send an email directly
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1 p-2 rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Azerbaijan, Baku
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-medium mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <HoverCard>
                  <HoverCardTrigger>
                    <a
                      href="https://www.linkedin.com/in/ibadovulfat/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Connect with me on LinkedIn
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-secondary/50 py-24 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              Find answers to common questions about my cybersecurity services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What cybersecurity services do you offer?",
                answer: "I provide comprehensive security services including penetration testing, vulnerability assessments, malware analysis, security audits, and security awareness training tailored to your organization's needs."
              },
              {
                question: "How do you approach a penetration test?",
                answer: "My approach begins with reconnaissance and information gathering, followed by vulnerability scanning, exploitation attempts, post-exploitation analysis, and comprehensive reporting with actionable remediation recommendations."
              },
              {
                question: "Do you work with clients remotely?",
                answer: "Yes, I work with clients globally and have established effective remote assessment processes while maintaining strict security and confidentiality standards."
              },
              {
                question: "What information do you need to provide a quote?",
                answer: "To provide an accurate quote, I typically need to understand your project scope, target systems or applications, testing timeframe, and specific security concerns or compliance requirements."
              },
              {
                question: "How do you ensure confidentiality during security assessments?",
                answer: "I follow strict confidentiality protocols, including signing NDAs, using secure communication channels, and adhering to industry best practices for handling sensitive information."
              },
              {
                question: "What deliverables can I expect from your services?",
                answer: "Deliverables typically include detailed technical reports with findings and recommendations, an executive summary for management, evidence of vulnerabilities, and remediation guidance prioritized by risk level."
              }
            ].map((faq, index) => (
              <Card
                key={index}
                className="p-6 bg-background hover-lift"
              >
                <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="py-20 text-center animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-semibold mb-4">
            Ready to Enhance Your Security Posture?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to identify and address your security vulnerabilities before malicious actors can exploit them.
          </p>
          <Button
            onClick={() => document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </Section>
    </>
  );
};

export default Contact;
