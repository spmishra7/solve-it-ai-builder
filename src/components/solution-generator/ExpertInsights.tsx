
import { Info } from "lucide-react";

interface ExpertInsightsProps {
  insights: Record<string, string> | undefined;
}

export const ExpertInsights = ({ insights }: ExpertInsightsProps) => {
  if (!insights || Object.keys(insights).length === 0) return null;
  
  // Role icons and names mapping
  const roleIcons: Record<string, string> = {
    // Executive Team
    ceo: "👑",
    coo: "⚙️",
    cfo: "💰",
    cto: "💻",
    
    // Management
    product: "📊",
    marketing: "📣",
    sales: "🤝",
    
    // Data Team
    dataAnalyst: "📈",
    dataScientist: "🧪",
    dataEngineer: "🔌",
    
    // Specialists
    designer: "🎨",
    engineer: "🧰",
    security: "🔒",
    analyst: "📊",
    
    // Industry Experts
    healthcare: "🏥",
    finance: "💹",
    retail: "🛒",
    education: "🎓",
    
    // Operations
    projectManager: "📋",
    qualityAssurance: "✅",
    devops: "⚡",
    support: "🙋"
  };
  
  const roleNames: Record<string, string> = {
    // Executive Team
    ceo: "CEO",
    coo: "COO",
    cfo: "CFO",
    cto: "CTO",
    
    // Management
    product: "Product Manager",
    marketing: "Marketing Director",
    sales: "Sales Director",
    
    // Data Team
    dataAnalyst: "Data Analyst",
    dataScientist: "Data Scientist",
    dataEngineer: "Data Engineer",
    
    // Specialists
    designer: "UX Designer",
    engineer: "Software Engineer",
    security: "Security Specialist",
    analyst: "Business Analyst",
    
    // Industry Experts
    healthcare: "Healthcare Expert",
    finance: "Finance Expert",
    retail: "Retail Expert",
    education: "Education Expert",
    
    // Operations
    projectManager: "Project Manager",
    qualityAssurance: "QA Specialist",
    devops: "DevOps Engineer",
    support: "Customer Support"
  };

  return (
    <div className="my-8 border rounded-lg overflow-hidden">
      <div className="bg-card/50 backdrop-blur-sm p-4 border-b flex items-center">
        <Info className="h-5 w-5 mr-2 text-brand-600" />
        <h3 className="font-semibold">Expert Insights</h3>
      </div>
      <div className="space-y-4 p-4">
        {Object.entries(insights).map(([role, insight]) => (
          <div key={role} className="flex gap-3 p-3 bg-card/30 rounded-lg">
            <div className="h-8 w-8 text-xl flex items-center justify-center">
              {roleIcons[role] || "👤"}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">{roleNames[role] || role}</h4>
              <p className="text-sm text-muted-foreground">{insight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
