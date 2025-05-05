
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Download, Cloud, Code } from "lucide-react";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const pricingPlans = [
    {
      name: "UI Only",
      price: {
        monthly: 0,
        annual: 0
      },
      description: "Take the generated UI and integrate it into your own codebase",
      features: [
        "Natural language input",
        "5 AI solution generations per month",
        "Basic UI preview and export",
        "Community support",
        "Frontend code only",
        "No backend support"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      mostPopular: false,
      icon: <Code className="h-12 w-12 mb-4 text-brand-500" />
    },
    {
      name: "Managed Backend",
      price: {
        monthly: 49,
        annual: 39
      },
      description: "We host and manage the backend, you integrate the frontend",
      features: [
        "Unlimited AI generations",
        "Full UI customization & export",
        "Complete database schemas",
        "Managed API endpoints",
        "Cloud hosting included",
        "Email support",
        "Self-healing error correction",
        "Cost-optimized infrastructure"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      mostPopular: true,
      icon: <Cloud className="h-12 w-12 mb-4 text-brand-500" />
    },
    {
      name: "Complete Solution",
      price: {
        monthly: null,
        annual: null,
        oneTime: 999
      },
      description: "One-time purchase for complete ownership of solution",
      features: [
        "All Managed Backend features",
        "Full source code ownership",
        "Database export and setup",
        "Deployment documentation",
        "30-day implementation support",
        "Custom integrations",
        "Priority support",
        "Multi-role AI consulting",
        "Lightweight optimized builds"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      mostPopular: false,
      icon: <Download className="h-12 w-12 mb-4 text-brand-500" />
    }
  ];

  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our AI-powered solution generation with expert roles.
          </p>

          <div className="flex items-center justify-center mt-6">
            {pricingPlans[2].price.monthly === null ? (
              <div className="bg-gray-100 p-1 rounded-full inline-flex">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isAnnual ? "bg-white shadow-sm" : ""
                  }`}
                  onClick={() => setIsAnnual(true)}
                >
                  Annual (Save 20%)
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    !isAnnual ? "bg-white shadow-sm" : ""
                  }`}
                  onClick={() => setIsAnnual(false)}
                >
                  Monthly
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            const isOneTimePayment = plan.price.oneTime !== undefined;
            
            return (
              <Card key={index} className={`relative ${plan.mostPopular ? 'border-2 border-brand-500 shadow-lg' : ''}`}>
                {plan.mostPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <CardContent className={`p-6 ${plan.mostPopular ? 'pt-8' : 'pt-6'}`}>
                  <div className="flex flex-col items-center">
                    {plan.icon}
                    <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                  </div>
                  <div className="mb-4 text-center">
                    {isOneTimePayment ? (
                      <>
                        <span className="text-3xl font-bold">${plan.price.oneTime}</span>
                        <span className="text-gray-600"> one-time</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">${price}</span>
                        <span className="text-gray-600">/month</span>
                        {isAnnual && price > 0 && (
                          <span className="text-xs text-brand-600 block mt-1">
                            Billed annually (${price * 12}/year)
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6 text-center">{plan.description}</p>
                  
                  <Button variant={plan.buttonVariant} className={`w-full mb-6 ${plan.buttonVariant === 'default' ? 'bg-brand-600 hover:bg-brand-700' : ''}`}>
                    {plan.buttonText}
                  </Button>
                  
                  <div>
                    <p className="font-medium mb-2">What's included:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-brand-600 mr-2 shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom plan for your enterprise?
          </p>
          <Button variant="outline" className="mr-4">
            Contact Our Sales Team
          </Button>
          <Button variant="default" className="bg-brand-600 hover:bg-brand-700">
            <Shield className="mr-2 h-4 w-4" />
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
