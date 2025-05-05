
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "💬",
    title: "Natural Language Input",
    description: "Describe your business problem in plain English. No technical jargon needed."
  },
  {
    icon: "🧠",
    title: "Multi-Perspective Analysis",
    description: "Get insights from CEO, CFO, Product Manager, Designer, and Engineering perspectives to build a comprehensive plan."
  },
  {
    icon: "🤖",
    title: "AI-Powered Generation",
    description: "Advanced AI analyzes your needs and generates complete solutions tailored to your requirements."
  },
  {
    icon: "🖥️",
    title: "Custom UI Design",
    description: "Beautiful, functional user interfaces designed specifically for your business workflows."
  },
  {
    icon: "🗃️", 
    title: "Database Schema",
    description: "Fully normalized database schemas with the right tables, relationships, and fields."
  },
  {
    icon: "⚙️",
    title: "Workflow Automation",
    description: "Built-in automations for notifications, reports, and business processes."
  },
  {
    icon: "💰",
    title: "Cost-Effective Solutions",
    description: "Optimized implementations that deliver maximum value while minimizing resource usage."
  },
  {
    icon: "🚀",
    title: "Export & Deploy",
    description: "Export the full codebase or deploy to a custom subdomain in one click."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-card/30 grid-bg-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">DrSolveIt</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate complete SaaS solutions with powerful features designed to solve your specific business problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-gradient-border bg-card/50 hover:bg-card/80 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-accent/10 text-3xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
