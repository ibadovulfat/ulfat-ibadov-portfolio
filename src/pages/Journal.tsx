
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Clock, Tag } from "lucide-react";
import Section from "@/components/UI/Section";
import ParallaxEffect from "@/components/UI/ParallaxEffect";

// Sample blog post data
const posts = [
  {
    id: 1,
    title: "Modern Attack Techniques in Web Applications",
    excerpt: "Exploring the latest vulnerabilities and attack vectors that threaten web applications in today's landscape.",
    date: "May 15, 2023",
    author: "Ulfat Ibadov",
    readTime: "8 min read",
    category: "Web Security",
    image: "journal-1",
  },
  {
    id: 2,
    title: "Understanding Polymorphic Malware Analysis",
    excerpt: "Techniques for identifying and analyzing malware that changes its code to evade detection.",
    date: "April 22, 2023",
    author: "Ulfat Ibadov",
    readTime: "10 min read",
    category: "Malware Analysis",
    image: "journal-2",
  },
  {
    id: 3,
    title: "Social Engineering in the Digital Age",
    excerpt: "How attackers exploit human psychology to bypass technical security controls and what you can do about it.",
    date: "March 10, 2023",
    author: "Ulfat Ibadov",
    readTime: "7 min read",
    category: "Social Engineering",
    image: "journal-3",
  },
  {
    id: 4,
    title: "Reverse Engineering Techniques for Security Professionals",
    excerpt: "Essential skills and tools for breaking down malicious software to understand its functionality and purpose.",
    date: "February 28, 2023",
    author: "Ulfat Ibadov",
    readTime: "6 min read",
    category: "Reverse Engineering",
    image: "journal-4",
  },
  {
    id: 5,
    title: "Bug Bounty Hunting: Tips from the Trenches",
    excerpt: "Practical advice for finding, reporting, and getting rewarded for security vulnerabilities in popular platforms.",
    date: "January 15, 2023",
    author: "Ulfat Ibadov",
    readTime: "9 min read",
    category: "Bug Bounty",
    image: "journal-5",
  },
  {
    id: 6,
    title: "Secure Development Practices for Modern Applications",
    excerpt: "How developers can integrate security into the development lifecycle to build more robust applications.",
    date: "December 10, 2022",
    author: "Ulfat Ibadov",
    readTime: "11 min read",
    category: "Secure Coding",
    image: "journal-6",
  }
];

// Sample categories
const categories = [
  { name: "Web Security", count: 12 },
  { name: "Malware Analysis", count: 8 },
  { name: "Penetration Testing", count: 15 },
  { name: "Social Engineering", count: 7 },
  { name: "Reverse Engineering", count: 9 },
  { name: "Bug Bounty", count: 6 },
];

const Journal: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Section fullHeight className="flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <ParallaxEffect speed={0.1} direction="up">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-4">
              Blog
            </span>
            <h1 className="section-heading mb-6">
              Cybersecurity Insights & Research
            </h1>
            <p className="section-subheading max-w-2xl mx-auto">
              Sharing technical analysis, case studies, and trends in penetration testing and malware analysis.
            </p>
          </ParallaxEffect>
        </div>
      </Section>

      {/* Featured Post */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary inline-block mb-4">
                Featured Post
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">
                {posts[0].title}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {posts[0].excerpt}
              </p>
              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {posts[0].date}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {posts[0].author}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {posts[0].readTime}
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  {posts[0].category}
                </div>
              </div>
              <a 
                href="#" 
                className="group inline-flex items-center text-primary font-medium hover:underline"
              >
                Read full article
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-video w-full rounded-lg bg-muted/30 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-muted/50 to-muted/20 flex items-center justify-center">
                  <span className="text-muted-foreground/50">Featured Cybersecurity Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Recent Posts */}
      <Section className="bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Recent Articles</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore my latest research, technical write-ups, and security insights from the field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <article 
                key={post.id}
                className="bg-background rounded-lg border border-border overflow-hidden hover-lift"
              >
                <div className="aspect-video w-full bg-muted/30 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-tr from-muted/50 to-muted/20 flex items-center justify-center">
                    <span className="text-muted-foreground/50">Security Research</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary inline-block mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    <a href="#" className="hover:text-primary transition-colors">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center px-6 py-3 border border-input bg-background hover:bg-accent transition-all duration-300 rounded-md text-sm font-medium">
              Load More Articles
            </button>
          </div>
        </div>
      </Section>

      {/* Categories & Newsletter */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 px-4 sm:px-6">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-display font-bold mb-8">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex justify-between items-center p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm px-2 py-1 rounded-full bg-muted/50 text-muted-foreground">
                    {category.count} articles
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-lg border border-border p-8">
            <h2 className="text-2xl font-display font-bold mb-4">Subscribe</h2>
            <p className="text-muted-foreground mb-6">
              Join my newsletter to receive updates on the latest security research, vulnerabilities, and defensive techniques.
            </p>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-md text-sm font-medium"
              >
                Subscribe
              </button>
              <p className="text-xs text-muted-foreground">
                I respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-display font-semibold mb-4">
            Have a Security Topic in Mind?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Is there a specific cybersecurity concept, vulnerability, or defense strategy you'd like me to analyze? I'm always looking for new research areas.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-all duration-300 rounded-md text-sm font-medium"
          >
            Suggest a Topic
          </Link>
        </div>
      </Section>
    </>
  );
};

export default Journal;
