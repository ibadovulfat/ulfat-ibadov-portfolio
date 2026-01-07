import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Resume", href: "/resume" },
  { name: "Blog", href: "/journal" },
  { name: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }

    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 lg:px-12",
        scrolled
          ? "bg-background/95 border-b"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight z-50"
        >
          Ulfat Ibadov
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80 relative py-1",
                location.pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60",
                "after:absolute after:block after:w-full after:h-[1px] after:bottom-0 after:left-0 after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300",
                location.pathname === item.href
                  ? "after:scale-x-100"
                  : "hover:after:scale-x-100 hover:after:origin-left"
              )}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-lg flex flex-col justify-center items-center transition-transform duration-500 ease-in-out md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex flex-col space-y-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-lg font-medium transition-all duration-300",
                  location.pathname === item.href
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
