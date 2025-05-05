
import { useState, useEffect } from "react";
import RoleCategoryList from "./RoleCategoryList";
import { roleCategories } from "./roleData";
import RoleSelectorHeader from "./RoleSelectorHeader";

interface ExpertRoleSelectorProps {
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
  onSelectAll?: (allRoleIds: string[], allSelected: boolean) => void;
}

const ExpertRoleSelector = ({ 
  selectedRoles, 
  onRoleToggle, 
  onSelectAll 
}: ExpertRoleSelectorProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  // Set the first category expanded by default on component mount
  useEffect(() => {
    if (roleCategories.length > 0 && expandedCategories.length === 0) {
      setExpandedCategories([roleCategories[0].id]);
    }
  }, [expandedCategories]);
  
  // Get all role IDs across all categories
  const allRoleIds = roleCategories.flatMap(category => 
    category.roles.map(role => role.id)
  );
  
  // Check if all roles are selected by comparing lengths and checking every role is included
  const allSelected = allRoleIds.length > 0 && selectedRoles.length === allRoleIds.length && 
    allRoleIds.every(roleId => selectedRoles.includes(roleId));
  
  const handleExpandToggle = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleSelectAll = () => {
    console.log("handleSelectAll called in ExpertRoleSelector, current state:", allSelected);
    
    // Use the provided onSelectAll function if available
    if (onSelectAll) {
      onSelectAll(allRoleIds, allSelected);
    }
  };
  
  return (
    <div className="space-y-3 rounded-lg bg-gradient-to-br from-accent/90 to-brand-600/80 p-4 border border-brand-600/40 shadow-lg">
      <RoleSelectorHeader 
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
      />
      
      <RoleCategoryList 
        categories={roleCategories}
        expandedCategories={expandedCategories}
        onExpandToggle={handleExpandToggle}
        selectedRoles={selectedRoles}
        onRoleToggle={onRoleToggle}
      />
    </div>
  );
};

export default ExpertRoleSelector;
