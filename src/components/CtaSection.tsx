
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto animated-gradient rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start building your custom SaaS solution today. No coding required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-brand-600 hover:bg-gray-100 hover:text-brand-700 text-lg py-6 px-8 glow-effect">
                Get Started Free
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
