
import { Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start ${
              isSelected
                ? "bg-brand-600/10 border-brand-600 shadow-sm"
                : "border-border hover:border-brand-400 hover:bg-brand-50/50"
            }`}
            onClick={() => onToggle(role.id)}
          >
            <div className="h-8 w-8 text-xl flex items-center justify-center mr-3 text-brand-600">
              {role.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{role.name}</h4>
                {isSelected && (
                  <Check size={14} className="ml-2 text-brand-600" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {role.description}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-xs">{role.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExpertRole;
