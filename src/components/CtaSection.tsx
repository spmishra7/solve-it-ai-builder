
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cloud, Download } from "lucide-react";

const CtaSection = () => {
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
                <Button variant="outline" size="sm" className="mt-auto border-white/20 text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
              
              <div className="bg-brand-600/20 backdrop-blur-sm border border-brand-500/30 rounded-lg p-6 flex flex-col items-center text-center">
                <Cloud className="h-10 w-10 mb-4 text-brand-500" />
                <h3 className="text-lg font-medium mb-2">Managed Backend</h3>
                <p className="text-sm text-muted-foreground mb-4">We host and run the backend, you focus on your frontend</p>
                <Button className="mt-auto bg-brand-600 text-white hover:bg-brand-700 glow-effect">
                  Get Started
                </Button>
              </div>
              
              <div className="bg-card/20 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center text-center">
                <Download className="h-10 w-10 mb-4 text-brand-500" />
                <h3 className="text-lg font-medium mb-2">Full Solution</h3>
                <p className="text-sm text-muted-foreground mb-4">One-time purchase for complete code ownership</p>
                <Button variant="outline" size="sm" className="mt-auto border-white/20 text-white hover:bg-white/10">
                  Contact Sales
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
