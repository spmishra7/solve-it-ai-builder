
import { useToast } from "@/hooks/use-toast";
import { useSolution } from "@/contexts/SolutionContext";
import { generateSolution } from "@/lib/api";
import { useRoleManagement } from "./useRoleManagement";
import { useContentAnalyzer } from "./useContentAnalyzer";
import { useProgressTracking } from "./useProgressTracking";
import { usePromptImprover } from "./usePromptImprover";
import { useSolutionSaver } from "./useSolutionSaver";
import { roleCategories } from "@/components/expert-roles/roleData";
import { useEffect, useRef } from "react";

export const useSolutionGenerator = () => {
  const {
    businessDescription,
    setProgress,
    setSolution,
    setSolutionTitle,
    setIsGenerating,
    selectedRoles,
    setRoleNames
  } = useSolution();
  
  const { toast } = useToast();
  const progressTimerRef = useRef<number | null>(null);

  const { handleRoleToggle } = useRoleManagement();
  const { handleContentAnalyzed } = useContentAnalyzer();
  const { handleImprovePrompt } = usePromptImprover();
  const { handleSave } = useSolutionSaver();

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressTimerRef.current !== null) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  // Build a mapping of role IDs to role names for expert insights
  useEffect(() => {
    const roleNameMapping: Record<string, string> = {};
    roleCategories.forEach(category => {
      category.roles.forEach(role => {
        roleNameMapping[role.id] = role.name;
      });
    });
    setRoleNames(roleNameMapping);
  }, [setRoleNames]);

  const handleGenerate = async () => {
    if (!businessDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe your business problem.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(10);

    try {
      // Show toast for selected roles with the count
      if (selectedRoles.length > 0) {
        toast({
          title: `Including ${selectedRoles.length} expert perspective${selectedRoles.length === 1 ? '' : 's'}`,
          description: "Your solution will include these specialized insights."
        });
      }
      
      // Clear any existing interval
      if (progressTimerRef.current !== null) {
        clearInterval(progressTimerRef.current);
      }
      
      // Simulate progress to provide feedback during generation
      let currentProgress = 10;
      progressTimerRef.current = window.setInterval(() => {
        if (currentProgress >= 90) {
          if (progressTimerRef.current !== null) {
            clearInterval(progressTimerRef.current);
            progressTimerRef.current = null;
          }
          return;
        }
        currentProgress += 10;
        setProgress(currentProgress);
      }, 2000);
      
      const result = await generateSolution(
        businessDescription,
        "business owner",  // default user type
        "standard",        // default template
        undefined,         // use default model config
        selectedRoles      // pass selected roles
      );
      
      // Clear the interval and set progress to 100
      if (progressTimerRef.current !== null) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      setProgress(100);
      
      // Transform the result to match our component's expected format
      const transformedResult = {
        ui: result.ui_solution || "No UI solution generated",
        database: result.database_solution || "No database schema generated",
        automation: result.automation_solution || "No automation solution generated",
        expertInsights: result.expert_insights || {}
      };
      
      console.log("Solution generated:", transformedResult);
      setSolution(transformedResult);
      setSolutionTitle(result.title || businessDescription.substring(0, 50) + '...');
      
      toast({
        title: "Solution Generated",
        description: "Your SaaS solution is ready."
      });
      
      // Scroll to the solution - using improved scrolling with ID
      setTimeout(() => {
        const solutionElement = document.querySelector("#solution-preview");
        if (solutionElement) {
          solutionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          console.error("Solution preview element not found");
        }
      }, 300);
    } catch (error) {
      console.error("Error generating solution:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your solution.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    handleRoleToggle,
    handleContentAnalyzed,
    handleGenerate,
    handleImprovePrompt,
    handleSave
  };
};
