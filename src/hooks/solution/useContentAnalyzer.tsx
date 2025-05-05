
import { useSolution } from "@/contexts/SolutionContext";
import { useToast } from "@/hooks/use-toast";

export const useContentAnalyzer = () => {
  const { 
    businessDescription, 
    setBusinessDescription, 
    contentInsights,
    setContentInsights 
  } = useSolution();
  
  const { toast } = useToast();

  const handleContentAnalyzed = (insights: string) => {
    setContentInsights(insights);
    
    if (!businessDescription.trim()) {
      setBusinessDescription(insights);
    } else {
      const updatedDescription = `${businessDescription}\n\nContent Analysis Insights:\n${insights}`;
      setBusinessDescription(updatedDescription);
    }
    
    toast({
      title: "Content Analyzed",
      description: "Insights from your content have been added to the business description."
    });
  };

  return { 
    handleContentAnalyzed,
    contentInsights,
    businessDescription
  };
};
