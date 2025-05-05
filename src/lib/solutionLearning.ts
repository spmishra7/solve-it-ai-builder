
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SimilarityCriteria {
  businessPrompt: string;
  userType?: string;
  selectedTemplate?: string;
}

interface CachedSolution {
  id: string;
  title: string;
  description: string;
  business_prompt: string;
  ui_solution: string;
  database_solution: string;
  automation_solution: string;
  similarity_score: number;
}

// Find similar solutions based on business prompt and other criteria
export async function findSimilarSolutions(
  criteria: SimilarityCriteria,
  threshold: number = 0.65
): Promise<CachedSolution[]> {
  try {
    // Call the edge function that handles similarity search
    const { data, error } = await supabase.functions.invoke('find-similar-solutions', {
      body: {
        ...criteria,
        threshold,
      },
    });

    if (error) {
      console.error("Error finding similar solutions:", error);
      return [];
    }

    return data?.solutions || [];
  } catch (error) {
    console.error("Error in findSimilarSolutions:", error);
    return [];
  }
}

// Learn from a new solution by storing it with embeddings
export async function learnFromSolution(solutionData: any): Promise<void> {
  try {
    // Call the edge function that handles learning from solutions
    const response = await supabase.functions.invoke('learn-from-solution', {
      body: solutionData,
    });
    
    if (response.error) {
      console.error("Error in learn-from-solution:", response.error);
    } else {
      console.log("Solution successfully processed for learning");
    }
  } catch (error) {
    console.error("Error in learnFromSolution:", error);
    // We don't need to throw here as this is a background learning process
  }
}

// Get insights from past solutions to enhance new generations
export async function getSolutionInsights(businessPrompt: string): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('get-solution-insights', {
      body: {
        businessPrompt,
      },
    });

    if (error) {
      console.error("Error getting solution insights:", error);
      return "";
    }

    return data?.insights || "";
  } catch (error) {
    console.error("Error in getSolutionInsights:", error);
    return "";
  }
}
