
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SelectAllButtonProps {
  allSelected: boolean;
  onSelectAll: () => void;
}

const SelectAllButton = ({ allSelected, onSelectAll }: SelectAllButtonProps) => {
  return (
    <Button 
      variant={allSelected ? "default" : "outline"} 
      size="sm" 
      className="flex items-center gap-1"
      onClick={onSelectAll}
    >
      {allSelected && <Check className="w-4 h-4" />}
      {allSelected ? "Deselect All" : "Select All for Solopreneurs"}
    </Button>
  );
};

export default SelectAllButton;
