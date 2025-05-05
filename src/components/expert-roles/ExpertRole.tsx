
import { Check } from "lucide-react";

interface ExpertRoleProps {
  role: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
  isSelected: boolean;
  onToggle: (roleId: string) => void;
}

const ExpertRole = ({ role, isSelected, onToggle }: ExpertRoleProps) => {
  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start ${
        isSelected
          ? "bg-brand-600/10 border-brand-600"
          : "border-border hover:border-brand-400"
      }`}
      onClick={() => onToggle(role.id)}
    >
      <div className="h-8 w-8 text-xl flex items-center justify-center mr-3">
        {role.icon}
      </div>
      <div>
        <div className="flex items-center">
          <h4 className="text-sm font-medium">{role.name}</h4>
          {isSelected && (
            <Check size={14} className="ml-2 text-brand-600" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {role.description}
        </p>
      </div>
    </div>
  );
};

export default ExpertRole;
