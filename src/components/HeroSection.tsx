import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
      // Fallback: scroll to the approximate position
      window.scrollTo({
        top: 800,
        behavior: "smooth"
      });
      console.log("Fallback scroll to position 800 executed");
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
      // Fallback: scroll to the approximate position
      window.scrollTo({
        top: 1600,
        behavior: "smooth"
      });
      console.log("Fallback scroll to position 1600 executed");
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

  const customSolutions = "Custom SaaS Solution".split("");

  return (
    <div className="relative pt-24 pb-16 overflow-hidden" id="hero">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animated-gradient opacity-70"></div>
      
      {/* Animated circles */}
      <div className="absolute inset-0 -z-5">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-brand-600/10 blur-3xl"
          initial={{ x: -100, y: -100 }}
          animate={{ 
            x: [-100, 50, -80], 
            y: [-100, 200, -50], 
            opacity: [0.5, 0.7, 0.5] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          initial={{ x: 100, y: 100 }}
          animate={{ 
            x: [100, -50, 80], 
            y: [100, -200, 50], 
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
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
              className="h-16 md:h-20 w-auto glow-effect"
            />
          </motion.div>
          
          <motion.span 
            className="inline-block bg-brand-100 text-accent text-xs font-medium rounded-full px-3 py-1 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            AI-POWERED SAAS PLATFORM
          </motion.span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            Describe Your Business Problem. Get a{" "}
            <span className="gradient-text inline-block">
              {customSolutions.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {letter === " " ? <span>&nbsp;</span> : letter}
                </motion.span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="inline-block"
            >
              .
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-muted-foreground text-xl max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Build custom tools and automation for your business needs with AI in minutes, not months. No coding required.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button 
              className="bg-brand-600 hover:bg-brand-700 text-lg py-6 px-8 glow-effect group w-full sm:w-auto"
              onClick={handleGetStarted}
              type="button"
            >
              Get Started
              <motion.div
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  repeatType: "loop"
                }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>
            <Button 
              variant="outline" 
              className="text-lg py-6 px-8 border-accent hover:bg-accent/10 w-full sm:w-auto"
              onClick={handleViewDemo}
              type="button"
            >
              View Demo
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex -space-x-2">
              {['JD', 'SM', 'RJ', 'KT'].map((initials, i) => (
                <motion.div 
                  key={initials}
                  className="w-8 h-8 rounded-full bg-card border-2 border-accent flex items-center justify-center text-xs"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + (i * 0.1) }}
                >
                  {initials}
                </motion.div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              <span className="font-bold text-foreground">1,000+</span> businesses already using DrSolveIt
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 relative"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 50 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <div className="rounded-lg border shadow-lg overflow-hidden glass card-shadow">
            <img 
              src="https://placehold.co/1200x600/0A192F/1EAEDB?text=DrSolveIt+AI+Dashboard" 
              alt="DrSolveIt Dashboard Preview" 
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
