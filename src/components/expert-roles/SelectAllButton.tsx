
import { Button } from "@/components/ui/button";
import { Check, Users } from "lucide-react";

interface SelectAllButtonProps {
  allSelected: boolean;
  onSelectAll: () => void;
}

const SelectAllButton = ({ allSelected, onSelectAll }: SelectAllButtonProps) => {
  return (
    <Button 
      variant={allSelected ? "default" : "outline"} 
      size="sm" 
      className={`flex items-center gap-1.5 transition-colors duration-300 ${
        allSelected 
          ? "bg-brand-600 hover:bg-brand-700 text-white shadow-md" 
          : "border-white text-white hover:bg-white/20"
      }`}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        console.log("Select All button clicked, current state:", allSelected);
        onSelectAll();
      }}
    >
      {allSelected ? (
        <Check className="w-4 h-4" />
      ) : (
        <Users className="w-4 h-4" />
      )}
      {allSelected ? "Deselect All Experts" : "Select All Experts"}
    </Button>
  );
};

export default SelectAllButton;
