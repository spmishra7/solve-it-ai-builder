
import { useEffect } from "react";
import { useSolution } from "@/contexts/SolutionContext";
import { toast } from "sonner";

export const useRoleManagement = () => {
  const { selectedRoles, setSelectedRoles } = useSolution();

  // Load selected roles from localStorage on component mount
  useEffect(() => {
    const savedRoles = localStorage.getItem("selectedExpertRoles");
    if (savedRoles) {
      try {
        const parsedRoles = JSON.parse(savedRoles);
        if (Array.isArray(parsedRoles)) {
          console.log("Loaded saved roles:", parsedRoles);
          setSelectedRoles(parsedRoles);
        }
      } catch (error) {
        console.error("Error parsing saved roles:", error);
        // Clear invalid data
        localStorage.removeItem("selectedExpertRoles");
      }
    }
  }, [setSelectedRoles]);

  // Save selected roles to localStorage whenever they change
  useEffect(() => {
    console.log("Saving selected roles:", selectedRoles);
    localStorage.setItem("selectedExpertRoles", JSON.stringify(selectedRoles));
  }, [selectedRoles]);

  const handleRoleToggle = (roleId: string) => {
    console.log("Toggle role:", roleId);
    
    // Fix: Instead of using a callback function with setSelectedRoles,
    // create the new array first and then pass it directly
    const isCurrentlySelected = selectedRoles.includes(roleId);
    const newSelectedRoles = isCurrentlySelected
      ? selectedRoles.filter(id => id !== roleId)
      : [...selectedRoles, roleId];
    
    console.log("New selected roles:", newSelectedRoles);
    
    // Pass the array directly to setSelectedRoles
    setSelectedRoles(newSelectedRoles);
  };

  const handleSelectAll = (allRoleIds: string[], allSelected: boolean) => {
    console.log("handleSelectAll called with", allRoleIds.length, "roles. All currently selected:", allSelected);
    
    if (allSelected) {
      // If all are selected, clear the selection
      console.log("Deselecting all roles");
      setSelectedRoles([]);
    } else {
      // If not all are selected, select all roles
      console.log("Selecting all roles:", allRoleIds);
      setSelectedRoles(allRoleIds);
    }
  };

  return { handleRoleToggle, handleSelectAll, selectedRoles };
};
