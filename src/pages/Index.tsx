
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SolutionGenerator from "@/components/SolutionGenerator";
import TemplateSection from "@/components/TemplateSection";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Add smooth scrolling observer for animations
  useEffect(() => {
    // Create an Intersection Observer to add animation classes
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll');
        }
      });
    }, { threshold: 0.1 });
    
    // Track all elements with animation-ready class
    const elementsToAnimate = document.querySelectorAll('.animation-ready');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    return () => {
      elementsToAnimate.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Move Solution Generator closer to the top */}
        <div id="solution-generator" className="animation-ready">
          <SolutionGenerator />
        </div>
        
        <div id="features" className="animation-ready">
          <FeaturesSection />
        </div>
        
        <div id="templates" className="animation-ready">
          <TemplateSection />
        </div>
        
        <div id="testimonials" className="animation-ready">
          <TestimonialSection />
        </div>
        
        <div id="pricing" className="animation-ready">
          <PricingSection />
        </div>
        
        <div id="cta" className="animation-ready">
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
