
import { useState } from "react";
import { Info, CheckSquare } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { roleCategories } from "./expert-roles/roleData";
import RoleCategory from "./expert-roles/RoleCategory";
import { motion } from "framer-motion";

interface ExpertRoleSelectorProps {
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
}

const ExpertRoleSelector = ({ selectedRoles, onRoleToggle }: ExpertRoleSelectorProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("executive");
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  
  // Select all roles functionality
  const handleSelectAll = () => {
    // Get all role IDs
    const allRoleIds = roleCategories.flatMap(category => 
      category.roles.map(role => role.id)
    );
    
    // If all roles are already selected, deselect all
    const isAllSelected = allRoleIds.every(id => selectedRoles.includes(id));
    
    if (isAllSelected) {
      // Deselect all roles
      allRoleIds.forEach(id => {
        if (selectedRoles.includes(id)) {
          onRoleToggle(id);
        }
      });
    } else {
      // Select all roles
      allRoleIds.forEach(id => {
        if (!selectedRoles.includes(id)) {
          onRoleToggle(id);
        }
      });
    }
  };
  
  // Get all role IDs
  const allRoleIds = roleCategories.flatMap(category => 
    category.roles.map(role => role.id)
  );
  
  // Check if all roles are selected
  const isAllSelected = allRoleIds.every(id => selectedRoles.includes(id));
  
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Select expert perspectives to include in your solution:
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
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          className="flex items-center gap-2"
        >
          <CheckSquare size={16} />
          {isAllSelected ? "Deselect All" : "Select All"}
          <span className="text-xs text-muted-foreground">(Solopreneur)</span>
        </Button>
      </div>

      <div className="space-y-4">
        {roleCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <RoleCategory
              category={category}
              selectedRoles={selectedRoles}
              onRoleToggle={onRoleToggle}
              isExpanded={expandedCategory === category.id}
              onToggle={toggleCategory}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpertRoleSelector;
