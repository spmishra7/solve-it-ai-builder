
import { ChevronDown, ChevronRight } from "lucide-react";
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
  onToggle: () => void;
}

const RoleCategory = ({ 
  category, 
  selectedRoles, 
  onRoleToggle,
  isExpanded,
  onToggle 
}: RoleCategoryProps) => {
  const selectedCount = category.roles.filter(role => selectedRoles.includes(role.id)).length;
  
  return (
    <div key={category.id} className="border rounded-lg overflow-hidden shadow-md bg-white/10">
      <button
        className={`w-full p-3 text-left flex items-center justify-between transition-colors ${
          isExpanded 
            ? "bg-white/30 border-b border-brand-200" 
            : "bg-white/20 hover:bg-white/30"
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronDown size={16} className="mr-2 text-brand-600" />
          ) : (
            <ChevronRight size={16} className="mr-2 text-white" />
          )}
          <span className={`font-medium ${isExpanded ? "text-brand-800" : "text-white"}`}>{category.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          {selectedCount > 0 && (
            <span className="text-xs bg-white/30 text-brand-800 px-2 py-1 rounded font-medium">
              {selectedCount} selected
            </span>
          )}
          <span className="text-xs bg-white/10 text-white px-2 py-1 rounded hidden sm:inline-block">
            {category.roles.length} roles
          </span>
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-3 bg-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
