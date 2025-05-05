
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/b8bd828d-1db2-4ecf-ad16-701fd9844c9e.png" 
              alt="DrSolveIt Logo" 
              className="h-16 md:h-20 w-auto"
            />
          </div>
          
          <span className="inline-block bg-brand-100 text-brand-800 text-xs font-medium rounded-full px-3 py-1 mb-6">
            AI-POWERED SAAS PLATFORM
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            Describe Your Business Problem. Get a <span className="gradient-text">Custom SaaS Solution</span>.
          </h1>
          
          <p className="text-gray-600 text-xl max-w-2xl mb-8">
            Build custom tools and automation for your business needs with AI in minutes, not months. No coding required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button className="bg-brand-600 hover:bg-brand-700 text-lg py-6 px-8">
              Get Started
            </Button>
            <Button variant="outline" className="text-lg py-6 px-8">
              View Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">JD</div>
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">SM</div>
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">RJ</div>
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">KT</div>
            </div>
            <p className="text-gray-600 text-sm">
              <span className="font-bold">1,000+</span> businesses already using DrSolveIt
            </p>
          </div>
        </div>
        
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
          <div className="rounded-lg border shadow-lg overflow-hidden">
            <img 
              src="https://placehold.co/1200x600/e2e8f0/64748b?text=DrSolveIt+AI+Dashboard" 
              alt="DrSolveIt Dashboard Preview" 
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
