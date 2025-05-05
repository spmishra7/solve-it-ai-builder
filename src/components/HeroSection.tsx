
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Wrench } from "lucide-react";

const HeroSection = () => {
  const handleGetStarted = () => {
    console.log("Get Started clicked in HeroSection");
    // Scroll to solution generator section
    const solutionGeneratorSection = document.getElementById("solution-generator");
    if (solutionGeneratorSection) {
      console.log("Found solution-generator section, scrolling to it");
      solutionGeneratorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Solution generator section not found");
      // Alternative selector approach
      const alternativeElement = document.querySelector("[id='solution-generator']");
      if (alternativeElement) {
        console.log("Found solution-generator using alternative selector");
        alternativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      
      // Fallback: scroll to the approximate position
      console.log("Using fallback scroll");
      window.scrollTo({
        top: 800,
        behavior: "smooth"
      });
    }
  };

  const handleViewDemo = () => {
    console.log("View Demo clicked in HeroSection");
    // Scroll to the templates section which has solution examples
    const templatesSection = document.getElementById("templates");
    if (templatesSection) {
      console.log("Found templates section, scrolling to it");
      templatesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Templates section not found");
      // Alternative selector approach
      const alternativeElement = document.querySelector("[id='templates']");
      if (alternativeElement) {
        console.log("Found templates using alternative selector");
        alternativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      
      // Fallback: scroll to the approximate position
      console.log("Using fallback scroll for templates");
      window.scrollTo({
        top: 1600,
        behavior: "smooth"
      });
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="relative pt-24 pb-16 overflow-hidden min-h-[90vh] flex items-center" id="hero">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#0A1120] -z-10"></div>
      
      {/* Add nebula effects */}
      <div className="hero-nebula-blue"></div>
      <div className="hero-nebula-red"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <img 
              src="/lovable-uploads/b8bd828d-1db2-4ecf-ad16-701fd9844c9e.png" 
              alt="DrSolveIt Logo" 
              className="h-16 md:h-20 w-auto"
            />
          </motion.div>
          
          <motion.span 
            className="inline-block text-[#00B5D8] text-xs font-medium rounded-full px-3 py-1 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            AI-POWERED SAAS PLATFORM
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight text-white hero-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Solve Your Business Problems with AI.
          </motion.h1>
          
          <motion.p 
            className="text-white text-xl max-w-2xl mb-8 hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Tell us what you need. We'll build your custom SaaS solution - instantly.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              className="text-lg py-6 px-8 bg-[#00B5D8] hover:bg-[#00A3C4] text-white group flex items-center gap-2 w-full sm:w-auto get-started-button"
              onClick={handleGetStarted}
            >
              <span className="flex items-center">
                Get Started
              </span>
            </Button>
            <Button 
              variant="outline" 
              className="text-lg py-6 px-8 border-white/20 bg-transparent text-white hover:bg-white/10 w-full sm:w-auto demo-button"
              onClick={handleViewDemo}
            >
              View Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <div className="flex -space-x-2">
              {['JD', 'SM', 'RJ'].map((initials, i) => (
                <motion.div 
                  key={initials}
                  className="w-8 h-8 rounded-full bg-[#00B5D8]/20 border border-[#00B5D8]/50 flex items-center justify-center text-xs font-medium text-white user-avatar"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.0 + (i * 0.1) }}
                >
                  {initials}
                </motion.div>
              ))}
            </div>
            <p className="text-white text-sm">
              <span className="font-bold">Trusted by 1,000+ Businesses</span>
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-16 space-y-4 text-white text-left max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-start gap-3">
              <Wrench className="h-6 w-6 text-[#00B5D8] flex-shrink-0 mt-1" />
              <p>
                Automate tasks, create tools, and streamline operations in minutes, not months.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-[#00B5D8] flex-shrink-0 mt-1" />
              <p>
                No coding needed. Just describe your problem.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Hero background with radial gradient */}
      <div className="hero-background"></div>
    </div>
  );
};

export default HeroSection;
