
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={cn(
        "absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer transition-opacity",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <span className="text-sm mb-2 text-muted-foreground">Scroll</span>
        <div className="p-2 rounded-full border border-muted-foreground/20 animate-float">
          <ChevronDown 
            className="h-5 w-5 text-muted-foreground/70" 
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
