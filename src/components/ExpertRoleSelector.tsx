
import { useState } from "react";
import { Check } from "lucide-react";

type ExpertRole = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

interface ExpertRoleSelectorProps {
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
}

const ExpertRoleSelector = ({ selectedRoles, onRoleToggle }: ExpertRoleSelectorProps) => {
  const expertRoles: ExpertRole[] = [
    {
      id: "ceo",
      name: "CEO",
      icon: "👑",
      description: "Strategic vision, market positioning, and business model evaluation."
    },
    {
      id: "cfo",
      name: "CFO",
      icon: "💰",
      description: "Cost optimization, revenue models, and financial projections."
    },
    {
      id: "product",
      name: "Product Manager",
      icon: "📊",
      description: "Feature prioritization, user stories, and product roadmap."
    },
    {
      id: "designer",
      name: "UX Designer",
      icon: "🎨",
      description: "User experience, interface design, and visual aesthetics."
    },
    {
      id: "engineer",
      name: "Engineer",
      icon: "🧰",
      description: "Technical architecture, scalability, and implementation strategy."
    },
    {
      id: "security",
      name: "Security Expert",
      icon: "🔒",
      description: "Data protection, compliance, and security best practices."
    }
  ];

  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground mb-3">
        Select expert perspectives to include in your solution (optional):
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {expertRoles.map((role) => (
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
  );
};

export default ExpertRoleSelector;
