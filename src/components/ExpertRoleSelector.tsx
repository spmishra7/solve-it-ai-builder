
import { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { roleCategories } from "./expert-roles/roleData";
import RoleCategory from "./expert-roles/RoleCategory";

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
              <p>Get specialized insights from different roles in the organization. Each role provides unique perspectives on your solution or task.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {roleCategories.map((category) => (
          <RoleCategory
            key={category.id}
            category={category}
            selectedRoles={selectedRoles}
            onRoleToggle={onRoleToggle}
            isExpanded={expandedCategory === category.id}
            onToggle={toggleCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpertRoleSelector;
