
import React from "react";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn("min-h-screen w-full overflow-x-hidden", className)}>
      <Navbar />
      <main className="pt-16 w-full max-w-full overflow-hidden">{children}</main>
    </div>
  );
};

export default Layout;
