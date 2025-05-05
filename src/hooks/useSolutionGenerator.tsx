
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { generateSolution } from "@/lib/api";
import { improvePrompt } from "@/lib/fileUtils";
import { useSolution } from "@/contexts/SolutionContext";

export const useSolutionGenerator = () => {
  const {
    businessDescription, 
    setBusinessDescription,
    solution,
    setSolution,
    isGenerating,
    setIsGenerating,
    progress,
    setProgress,
    solutionTitle,
    setSolutionTitle,
    selectedRoles,
    setSelectedRoles,
    isImprovingPrompt,
    setIsImprovingPrompt,
    contentInsights,
    setContentInsights
  } = useSolution();
  
  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();

  // Reset progress when not generating
  useEffect(() => {
    if (!isGenerating) setProgress(0);
  }, [isGenerating, setProgress]);

  // Update progress bar while generating
  useEffect(() => {
    let progressTimer: number | null = null;
    
    if (isGenerating && progress < 95) {
      progressTimer = window.setTimeout(() => {
        // Create an incremental progress that slows down as it approaches 95%
        const increment = Math.max(0.5, (95 - progress) * 0.1);
        // Fix: Convert to number and not use a function callback
        setProgress(Math.min(95, progress + increment));
      }, 300);
    }
    
    return () => {
      if (progressTimer !== null) {
        clearTimeout(progressTimer);
      }
    };
  }, [isGenerating, progress, setProgress]);

  const handleRoleToggle = (roleId: string) => {
    // Fix: Update to directly set the new array without using a callback function
    const newSelectedRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter(id => id !== roleId)
      : [...selectedRoles, roleId];
    
    setSelectedRoles(newSelectedRoles);
  };

  const handleContentAnalyzed = (insights: string) => {
    setContentInsights(insights);
    
    if (!businessDescription.trim()) {
      setBusinessDescription(insights);
    } else {
      // Fix: Create the new string directly and pass it to the setter
      const updatedDescription = `${businessDescription}\n\nContent Analysis Insights:\n${insights}`;
      setBusinessDescription(updatedDescription);
    }
    
    toast({
      title: "Content Analyzed",
      description: "Insights from your content have been added to the business description."
    });
  };

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
      // Show toast for selected roles
      if (selectedRoles.length > 0) {
        toast({
          title: `Including ${selectedRoles.length} expert perspective${selectedRoles.length === 1 ? '' : 's'}`,
          description: "Your solution will include these specialized insights."
        });
      }
      
      const result = await generateSolution(
        businessDescription,
        "business owner",  // default user type
        "standard",        // default template
        undefined,         // use default model config
        selectedRoles      // pass selected roles
      );
      
      setProgress(100);
      
      // Transform the result to match our component's expected format
      const transformedResult = {
        ui: result.ui_solution,
        database: result.database_solution,
        automation: result.automation_solution,
        expertInsights: result.expert_insights || {}
      };
      
      setSolution(transformedResult);
      setSolutionTitle(result.title || businessDescription.substring(0, 50) + '...');
      
      toast({
        title: "Solution Generated",
        description: "Your SaaS solution is ready."
      });
      
      // Scroll to the solution
      setTimeout(() => {
        const solutionElement = document.querySelector("#solution-preview");
        if (solutionElement) {
          solutionElement.scrollIntoView({ behavior: "smooth" });
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

  const handleImprovePrompt = async () => {
    if (!businessDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description to improve.",
        variant: "destructive"
      });
      return;
    }

    setIsImprovingPrompt(true);

    try {
      const improved = await improvePrompt(businessDescription);
      setBusinessDescription(improved);
      
      toast({
        title: "Prompt Improved",
        description: "Your business description has been enhanced."
      });
    } catch (error) {
      toast({
        title: "Improvement Failed",
        description: "There was an error improving your description.",
        variant: "destructive"
      });
    } finally {
      setIsImprovingPrompt(false);
    }
  };

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

  return {
    handleRoleToggle,
    handleContentAnalyzed,
    handleGenerate,
    handleImprovePrompt,
    handleSave
  };
};
