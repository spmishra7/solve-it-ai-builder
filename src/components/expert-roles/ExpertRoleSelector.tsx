
import { useState } from "react";
import RoleCategoryList from "./RoleCategoryList";
import RoleSelectorHeader from "./RoleSelectorHeader";
import { roleCategories } from "./roleData";

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
      <RoleSelectorHeader 
        allSelected={allSelected} 
        onSelectAll={handleSelectAll} 
      />
      <RoleCategoryList
        categories={roleCategories}
        expandedCategory={expandedCategory}
        toggleCategory={toggleCategory}
        selectedRoles={selectedRoles}
        onRoleToggle={onRoleToggle}
      />
    </div>
  );
};

export default ExpertRoleSelector;
