
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSolution } from "@/contexts/SolutionContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useSolutionSaver = () => {
  const {
    businessDescription,
    solution,
    solutionTitle,
    selectedRoles
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
      const { data, error } = await supabase
        .from('solutions')
        .insert([
          {
            title: solutionTitle,
            business_prompt: businessDescription,
            ui_solution: solution.ui,
            database_solution: solution.database,
            automation_solution: solution.automation,
            expert_insights: solution.expertInsights || {},
            user_id: session.user.id
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Solution Saved",
        description: "Your solution has been saved to your account."
      });

      // Redirect to the solution detail page
      if (data && data[0]) {
        navigate(`/solutions/${data[0].id}`);
      }
    } catch (error) {
      console.error("Error saving solution:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your solution.",
        variant: "destructive"
      });
    }
  };

  return { handleSave };
};
