
import { Toaster } from "@/components/UI/toaster";
import { Toaster as Sonner } from "@/components/UI/sonner";
import { TooltipProvider } from "@/components/UI/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout/Layout";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Resume from "./pages/Resume";
import Journal from "./pages/Journal";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import RedTeamShowcase from "./pages/RedTeamShowcase";
import Skills from "./pages/Skills";
import TerminalResumePage from "./pages/TerminalResumePage";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/red-team-showcase" element={<RedTeamShowcase />} />
              <Route path="/terminal-resume" element={<TerminalResumePage />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/upload" element={<Navigate to="/access-denied" replace />} />
              <Route path="/upload/*" element={<Navigate to="/access-denied" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
