
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SolutionGenerator from "@/components/SolutionGenerator";
import TemplateSection from "@/components/TemplateSection";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import CtaSection from "@/components/CtaSection";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// ScrollAnimationSection component for reuse
const ScrollAnimationSection = ({ 
  id, 
  children 
}: { 
  id: string, 
  children: React.ReactNode 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      id={id}
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-16"
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        
        {/* Move Solution Generator closer to the top */}
        <ScrollAnimationSection id="solution-generator">
          <SolutionGenerator />
        </ScrollAnimationSection>
        
        <ScrollAnimationSection id="features">
          <FeaturesSection />
        </ScrollAnimationSection>
        
        <ScrollAnimationSection id="templates">
          <TemplateSection />
        </ScrollAnimationSection>
        
        <ScrollAnimationSection id="testimonials">
          <TestimonialSection />
        </ScrollAnimationSection>
        
        <ScrollAnimationSection id="pricing">
          <PricingSection />
        </ScrollAnimationSection>
        
        <ScrollAnimationSection id="cta">
          <CtaSection />
        </ScrollAnimationSection>
      </main>
    </div>
  );
};

export default Index;
