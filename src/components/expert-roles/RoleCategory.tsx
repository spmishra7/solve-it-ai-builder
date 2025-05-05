
import { useState } from "react";
import ExpertRole from "./ExpertRole";

interface RoleCategoryProps {
  category: {
    id: string;
    name: string;
    roles: Array<{
      id: string;
      name: string;
      icon: string;
      description: string;
    }>;
  };
  selectedRoles: string[];
  onRoleToggle: (roleId: string) => void;
  isExpanded: boolean;
  onToggle: (categoryId: string) => void;
}

const RoleCategory = ({ 
  category, 
  selectedRoles, 
  onRoleToggle,
  isExpanded,
  onToggle 
}: RoleCategoryProps) => {
  return (
    <div key={category.id} className="border rounded-lg overflow-hidden">
      <button
        className={`w-full p-3 text-left flex items-center justify-between ${
          isExpanded ? "bg-accent" : "bg-card"
        }`}
        onClick={() => onToggle(category.id)}
      >
        <span className="font-medium">{category.name}</span>
        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
          {category.roles.length} roles
        </span>
      </button>
      
      {isExpanded && (
        <div className="p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {category.roles.map((role) => (
              <ExpertRole
                key={role.id}
                role={role}
                isSelected={selectedRoles.includes(role.id)}
                onToggle={onRoleToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleCategory;
