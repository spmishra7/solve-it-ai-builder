
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import RoleCategory from "@/components/expert-roles/RoleCategory";
import { roleCategories } from "@/components/expert-roles/roleData";

interface ExpertRoleSelectorProps {
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
}

const ExpertRoleSelector = ({ selectedRoles, onRoleToggle }: ExpertRoleSelectorProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Get all role IDs for Select All functionality
  const getAllRoleIds = () => {
    return roleCategories.flatMap(category => 
      category.roles.map(role => role.id)
    );
  };

  // Handle Select All functionality
  const handleSelectAll = () => {
    const allRoleIds = getAllRoleIds();
    
    // If all are already selected, deselect all
    if (allRoleIds.every(id => selectedRoles.includes(id))) {
      // Clear selections by passing empty array
      allRoleIds.forEach(id => onRoleToggle(id));
    } else {
      // Select all that aren't already selected
      allRoleIds.forEach(id => {
        if (!selectedRoles.includes(id)) {
          onRoleToggle(id);
        }
      });
    }
  };
  
  // Check if all roles are selected
  const allSelected = getAllRoleIds().every(id => selectedRoles.includes(id));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select Expert Perspectives</h3>
        <Button 
          variant={allSelected ? "default" : "outline"} 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleSelectAll}
        >
          {allSelected && <Check className="w-4 h-4" />}
          {allSelected ? "Deselect All" : "Select All for Solopreneurs"}
        </Button>
      </div>

      <div className="space-y-2">
        {roleCategories.map((category) => (
          <RoleCategory
            key={category.id}
            category={category}
            isExpanded={expandedCategory === category.id}
            onToggle={() => toggleCategory(category.id)}
            selectedRoles={selectedRoles}
            onRoleToggle={onRoleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpertRoleSelector;
