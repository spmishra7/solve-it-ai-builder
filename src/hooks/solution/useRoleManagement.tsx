
import { useSolution } from "@/contexts/SolutionContext";

export const useRoleManagement = () => {
  const { selectedRoles, setSelectedRoles } = useSolution();

  const handleRoleToggle = (roleId: string) => {
    const newSelectedRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter(id => id !== roleId)
      : [...selectedRoles, roleId];
    
    setSelectedRoles(newSelectedRoles);
  };

  return { handleRoleToggle, selectedRoles };
};
