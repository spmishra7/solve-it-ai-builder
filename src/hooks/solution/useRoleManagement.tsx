
import { useEffect } from "react";
import { useSolution } from "@/contexts/SolutionContext";

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
    
    const newSelectedRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter(id => id !== roleId)
      : [...selectedRoles, roleId];
    
    console.log("New selected roles:", newSelectedRoles);
    setSelectedRoles(newSelectedRoles);
  };

  return { handleRoleToggle, selectedRoles };
};
