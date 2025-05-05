
import { useSolution } from "@/contexts/SolutionContext";
import { useToast } from "@/components/ui/use-toast";
import { improvePrompt } from "@/lib/fileUtils";

export const usePromptImprover = () => {
  const { 
    businessDescription, 
    setBusinessDescription, 
    isImprovingPrompt, 
    setIsImprovingPrompt 
  } = useSolution();
  
  const { toast } = useToast();

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

  return {
    handleImprovePrompt,
    isImprovingPrompt,
    businessDescription
  };
};
