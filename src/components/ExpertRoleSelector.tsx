
import { useState } from "react";
import { Check, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the categories and roles
const roleCategories = [
  {
    id: "executive",
    name: "Executive Team",
    roles: [
      {
        id: "ceo",
        name: "CEO",
        icon: "👑",
        description: "Strategic vision, market positioning, and business model evaluation."
      },
      {
        id: "coo",
        name: "COO",
        icon: "⚙️",
        description: "Operational efficiency, process optimization, and resource allocation."
      },
      {
        id: "cfo",
        name: "CFO",
        icon: "💰",
        description: "Cost optimization, revenue models, and financial projections."
      },
      {
        id: "cto",
        name: "CTO",
        icon: "💻",
        description: "Technical feasibility, architecture decisions, and technology stack."
      },
    ]
  },
  {
    id: "management",
    name: "Management",
    roles: [
      {
        id: "product",
        name: "Product Manager",
        icon: "📊",
        description: "Feature prioritization, user stories, and product roadmap."
      },
      {
        id: "marketing",
        name: "Marketing Director",
        icon: "📣",
        description: "Go-to-market strategy, audience targeting, and brand positioning."
      },
      {
        id: "sales",
        name: "Sales Director",
        icon: "🤝",
        description: "Sales strategy, pricing models, and customer acquisition."
      }
    ]
  },
  {
    id: "specialists",
    name: "Specialists",
    roles: [
      {
        id: "designer",
        name: "UX Designer",
        icon: "🎨",
        description: "User experience, interface design, and visual aesthetics."
      },
      {
        id: "engineer",
        name: "Software Engineer",
        icon: "🧰",
        description: "Technical implementation, scalability, and coding best practices."
      },
      {
        id: "security",
        name: "Security Specialist",
        icon: "🔒",
        description: "Data protection, compliance, and security best practices."
      },
      {
        id: "analyst",
        name: "Data Analyst",
        icon: "📈",
        description: "Data modeling, metrics definition, and analytics implementation."
      }
    ]
  }
];

interface ExpertRoleSelectorProps {
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
}

const ExpertRoleSelector = ({ selectedRoles, onRoleToggle }: ExpertRoleSelectorProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("executive");
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground">
          Select expert perspectives to include in your solution (optional):
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <Info size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Get specialized insights from different roles in the organization. Each role provides unique perspectives on your solution.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {roleCategories.map((category) => (
          <div key={category.id} className="border rounded-lg overflow-hidden">
            <button
              className={`w-full p-3 text-left flex items-center justify-between ${
                expandedCategory === category.id ? "bg-accent" : "bg-card"
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                {category.roles.length} roles
              </span>
            </button>
            
            {expandedCategory === category.id && (
              <div className="p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {category.roles.map((role) => (
                    <div
                      key={role.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start ${
                        selectedRoles.includes(role.id)
                          ? "bg-brand-600/10 border-brand-600"
                          : "border-border hover:border-brand-400"
                      }`}
                      onClick={() => onRoleToggle(role.id)}
                    >
                      <div className="h-8 w-8 text-xl flex items-center justify-center mr-3">
                        {role.icon}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium">{role.name}</h4>
                          {selectedRoles.includes(role.id) && (
                            <Check size={14} className="ml-2 text-brand-600" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertRoleSelector;
