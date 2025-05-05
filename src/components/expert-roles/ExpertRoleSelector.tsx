
import { useState } from "react";
import RoleCategoryList from "./RoleCategoryList";
import { roleCategories } from "./roleData";
import RoleSelectorHeader from "./RoleSelectorHeader";

interface ExpertRoleSelectorProps {
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
}

const ExpertRoleSelector = ({ selectedRoles, onRoleToggle }: ExpertRoleSelectorProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([roleCategories[0].id]);
  
  const allRoles = roleCategories.flatMap(category => category.roles.map(role => role.id));
  const allSelected = allRoles.every(roleId => selectedRoles.includes(roleId));
  
  const handleExpandToggle = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleSelectAll = () => {
    if (allSelected) {
      // If all are selected, deselect all
      allRoles.forEach(roleId => {
        if (selectedRoles.includes(roleId)) {
          onRoleToggle(roleId);
        }
      });
    } else {
      // Select all roles that aren't already selected
      allRoles.forEach(roleId => {
        if (!selectedRoles.includes(roleId)) {
          onRoleToggle(roleId);
        }
      });
    }
  };
  
  return (
    <div className="space-y-3 rounded-lg bg-gradient-to-br from-secondary/40 to-secondary/80 p-4 border border-accent/10">
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
