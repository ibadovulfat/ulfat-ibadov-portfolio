
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";
import Section from "@/components/UI/Section";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Ulfat Ibadov</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Section fullHeight className="flex items-center justify-center">
        <div className="max-w-md mx-auto text-center relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 animate-pulse">
            <AlertTriangle className="h-16 w-16 text-primary/60" />
          </div>
          
          <h1 className="text-9xl font-display font-bold text-primary/20 mb-6 animate-scale-in">404</h1>
          <h2 className="text-3xl font-display font-bold mb-4 animate-fade-in">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 animate-fade-in">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild>
              <Link to="/" className="inline-flex items-center justify-center transition-transform hover:scale-105">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center transition-transform hover:scale-105"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground animate-fade-in animate-delay-300">
            <p>Looking for something specific? Try navigating through the main menu.</p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default NotFound;
