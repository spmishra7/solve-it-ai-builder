
import { useSolution } from "@/contexts/SolutionContext";
import { useToast } from "@/components/ui/use-toast";

export const useContentAnalyzer = () => {
  const { 
    businessDescription, 
    setBusinessDescription, 
    contentInsights,
    setContentInsights 
  } = useSolution();
  
  const { toast } = useToast();

  const handleContentAnalyzed = (insights: string) => {
    if (!insights.trim()) {
      toast({
        title: "Analysis Failed",
        description: "No insights could be generated from the uploaded content.",
        variant: "destructive"
      });
      return;
    }

    setContentInsights(insights);
    
    // Better merging of content insights with business description
    if (!businessDescription.trim()) {
      // If no description exists, use the insights as the description
      setBusinessDescription(insights);
      toast({
        title: "Content Analyzed",
        description: "Insights from your content have been added as your business description."
      });
    } else {
      // Check if insights are already part of the description to avoid duplication
      if (!businessDescription.includes(insights)) {
        const updatedDescription = `${businessDescription}\n\nContent Analysis Insights:\n${insights}`;
        setBusinessDescription(updatedDescription);
        toast({
          title: "Content Analyzed",
          description: "Insights from your content have been added to your business description."
        });
      } else {
        toast({
          title: "Content Analyzed",
          description: "These insights are already included in your description."
        });
      }
    }
  };

  return { 
    handleContentAnalyzed,
    contentInsights,
    businessDescription
  };
};
