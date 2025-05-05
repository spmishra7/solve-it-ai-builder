
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSolution } from "@/contexts/SolutionContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { saveSolution } from "@/lib/api";

export const useSolutionSaver = () => {
  const {
    businessDescription,
    solution,
    solutionTitle,
    selectedRoles,
    setIsSaving
  } = useSolution();
  
  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!session?.user || !solution) {
      toast({
        title: "Cannot Save",
        description: session ? "No solution to save." : "You must be logged in to save solutions.",
        variant: "destructive"
      });
      
      if (!session?.user) {
        navigate("/auth");
      }
      
      return;
    }

    try {
      setIsSaving(true);
      
      const solutionData = {
        title: solutionTitle,
        description: businessDescription.substring(0, 200) + (businessDescription.length > 200 ? '...' : ''),
        business_prompt: businessDescription,
        ui_solution: solution.ui,
        database_solution: solution.database,
        automation_solution: solution.automation,
        expert_insights: solution.expertInsights || {},
        user_id: session.user.id
      };
      
      // Use the API service to save the solution
      const solutionId = await saveSolution(solutionData);

      toast({
        title: "Solution Saved",
        description: "Your solution has been saved to your account."
      });

      // Redirect to the solution detail page if we have an ID
      if (solutionId) {
        navigate(`/solutions/${solutionId}`);
      }
    } catch (error: any) {
      console.error("Error saving solution:", error);
      toast({
        title: "Save Failed",
        description: error.message || "There was an error saving your solution.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSave };
};
