
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cloud, Download, Sparkles, Wrench, Shield } from "lucide-react";

const CtaSection = () => {
  const handleGetStarted = () => {
    // Scroll to solution generator section
    const element = document.getElementById("solution-generator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTryAISolutionBuilder = () => {
    // Also scroll to solution generator section
    const element = document.getElementById("solution-generator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSales = () => {
    // In a real-world scenario, this would navigate to a contact page
    // For now, let's just alert
    alert("Contact sales feature coming soon!");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-white/10">
          <div className="px-6 py-12 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Ready to transform your business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Plan like a CEO, budget like a CFO, design like a pro. Get multi-perspective SaaS solutions with flexible deployment options.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-card/20 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center text-center">
                <Code className="h-10 w-10 mb-4 text-brand-500" />
                <h3 className="text-lg font-medium mb-2">UI Export</h3>
                <p className="text-sm text-muted-foreground mb-4">Take our UI code and integrate it into your existing projects</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-auto border-white/20 text-white hover:bg-white/10"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="bg-brand-600/20 backdrop-blur-sm border border-brand-500/30 rounded-lg p-6 flex flex-col items-center text-center">
                <Cloud className="h-10 w-10 mb-4 text-brand-500" />
                <h3 className="text-lg font-medium mb-2">Managed Backend</h3>
                <p className="text-sm text-muted-foreground mb-4">We host and run the backend, you focus on your frontend</p>
                <Button 
                  className="mt-auto bg-brand-600 text-white hover:bg-brand-700 glow-effect"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </div>
              
              <div className="bg-card/20 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center text-center">
                <Download className="h-10 w-10 mb-4 text-brand-500" />
                <h3 className="text-lg font-medium mb-2">Full Solution</h3>
                <p className="text-sm text-muted-foreground mb-4">One-time purchase for complete code ownership</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-auto border-white/20 text-white hover:bg-white/10"
                  onClick={handleContactSales}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-2xl font-semibold mb-6">Our AI Expert Agents</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card/10 backdrop-blur-sm border border-white/5 rounded-lg p-4 flex flex-col items-center">
                  <Sparkles className="h-8 w-8 mb-2 text-blue-400" />
                  <h4 className="text-sm font-medium">CEO Vision</h4>
                  <p className="text-xs text-muted-foreground">Strategic market positioning</p>
                </div>
                <div className="bg-card/10 backdrop-blur-sm border border-white/5 rounded-lg p-4 flex flex-col items-center">
                  <Shield className="h-8 w-8 mb-2 text-green-400" />
                  <h4 className="text-sm font-medium">CFO Planning</h4>
                  <p className="text-xs text-muted-foreground">Cost optimization & ROI focus</p>
                </div>
                <div className="bg-card/10 backdrop-blur-sm border border-white/5 rounded-lg p-4 flex flex-col items-center">
                  <Wrench className="h-8 w-8 mb-2 text-purple-400" />
                  <h4 className="text-sm font-medium">Engineer Solutions</h4>
                  <p className="text-xs text-muted-foreground">Scalable architecture design</p>
                </div>
                <div className="bg-card/10 backdrop-blur-sm border border-white/5 rounded-lg p-4 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-2 text-orange-400">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 9.05v-.1"></path>
                    <path d="M16 9.05v-.1"></path>
                    <path d="M12 13a4 4 0 0 1-4 4"></path>
                    <path d="M16 17a4 4 0 0 0-4-4"></path>
                  </svg>
                  <h4 className="text-sm font-medium">Designer Touch</h4>
                  <p className="text-xs text-muted-foreground">Beautiful, intuitive interfaces</p>
                </div>
              </div>
              <div className="mt-8">
                <Button 
                  className="bg-brand-600 hover:bg-brand-700"
                  onClick={handleTryAISolutionBuilder}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Try Our AI Solution Builder
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
