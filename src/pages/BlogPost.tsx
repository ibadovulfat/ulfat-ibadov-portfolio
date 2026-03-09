import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import Section from "@/components/UI/Section";
import { blogPosts, BlogPost as BlogPostType } from "@/data/blogPosts";
import { Button } from "@/components/UI/button";

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post: BlogPostType | undefined = blogPosts.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <Section className="py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/journal">
          <Button>Back to Journal</Button>
        </Link>
      </Section>
    );
  }

  return (
    <>
      <Section className="pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Link
              to="/journal"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journal
            </Link>
          </div>

          <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mb-6">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-8 gap-6 border-b border-border pb-8">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              {post.category}
            </div>
          </div>

          {/* 
            Note: Content is sourced from trusted local data (@/data/blogPosts). 
            If content ever comes from an external API, a robust sanitizer like DOMPurify should be used.
          */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </Section>
    </>
  );
};

export default BlogPost;
