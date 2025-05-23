
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
import { toast as sonnerToast } from "sonner";

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

  const { handleRoleToggle, handleSelectAll } = useRoleManagement();
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
      currentProgress += 5;
      setProgress(currentProgress);
      console.log("Progress updated:", currentProgress);
    }, 1000);

    try {
      console.log("Starting solution generation with description:", businessDescription.substring(0, 50) + "...");
      console.log("Selected roles:", selectedRoles);
      
      // Show toast for selected roles with the count
      if (selectedRoles.length > 0) {
        sonnerToast.info(`Including ${selectedRoles.length} expert perspective${selectedRoles.length === 1 ? '' : 's'}`, {
          description: "Your solution will include these specialized insights."
        });
      }

      // Define mock solution for testing when API key is missing
      const mockSolution = {
        ui: "<div><h1>Patient Management System</h1><p>This is a mock UI solution</p></div>",
        database: "CREATE TABLE patients (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);\n\nCREATE TABLE appointments (\n  id SERIAL PRIMARY KEY,\n  patient_id INTEGER REFERENCES patients(id),\n  appointment_date TIMESTAMP NOT NULL\n);",
        automation: "function scheduleAppointment() {\n  // Mock automation workflow\n  console.log('Appointment scheduled');\n}",
        expertInsights: {}
      };
      
      try {
        // Try to call the real API
        const result = await generateSolution(
          businessDescription,
          "business owner",
          "standard",
          undefined,
          selectedRoles
        );
        
        console.log("Solution generation result received:", result ? "success" : "undefined or null");

        // Clear the interval and set progress to 100
        if (progressTimerRef.current !== null) {
          clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
        }
        setProgress(100);
        
        // Transform the result to match our component's expected format
        const transformedResult = {
          ui: result?.ui_solution || "No UI solution generated",
          database: result?.database_solution || "No database schema generated",
          automation: result?.automation_solution || "No automation solution generated",
          expertInsights: result?.expert_insights || {}
        };
        
        console.log("Transformed result:", transformedResult);
        setSolution(transformedResult);
        setSolutionTitle(result?.title || businessDescription.substring(0, 50) + '...');
      } catch (apiError) {
        console.error("API Error:", apiError);
        
        // If there's an API error, show a message and use mock data for testing
        toast({
          title: "API Configuration Issue",
          description: "Using demo data. Set up OpenAI API key for full functionality.",
          variant: "destructive"
        });
        
        // Use mock solution when API fails
        setProgress(100);
        setSolution(mockSolution);
        setSolutionTitle(businessDescription.substring(0, 50) + '... (Demo)');
      }
      
      toast({
        title: "Solution Generated",
        description: "Your SaaS solution is ready."
      });
      
      // Scroll to the solution - using improved scrolling with ID
      setTimeout(() => {
        const solutionElement = document.querySelector("#solution-preview");
        if (solutionElement) {
          console.log("Found solution preview element, scrolling to it");
          solutionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          console.error("Solution preview element not found for ID #solution-preview");
          // Try alternative scroll method
          const solutionCard = document.querySelector(".solution-card");
          if (solutionCard) {
            console.log("Found solution card via class, scrolling to it");
            solutionCard.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            console.error("Solution card element not found via class either");
          }
        }
      }, 300);
    } catch (error) {
      console.error("Error generating solution:", error);
      
      // Clear the progress interval
      if (progressTimerRef.current !== null) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      
      // Show more detailed error message
      let errorMessage = "There was an error generating your solution.";
      if (error instanceof Error) {
        errorMessage += " " + error.message;
        console.error("Error details:", error.message);
      }
      
      // Display API error if available
      if (typeof error === 'object' && error !== null && 'message' in error) {
        console.error("API Error:", (error as any).message);
      }
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      // Set progress to 0 to indicate failure
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    handleRoleToggle,
    handleContentAnalyzed,
    handleGenerate,
    handleImprovePrompt,
    handleSelectAll,
    handleSave
  };
};
