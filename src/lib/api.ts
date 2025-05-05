
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { findSimilarSolutions, learnFromSolution, getSolutionInsights } from "./solutionLearning";

// Solution Generation
export async function generateSolution(
  businessPrompt: string,
  userType: string = "business owner",
  selectedTemplate: string = "standard",
  modelConfig?: { provider: string; model: string },
  expertRoles: string[] = []
) {
  try {
    // Clear any previously stored template prompts
    localStorage.removeItem("selectedTemplatePrompt");
    localStorage.removeItem("selectedTemplateTitle");

    console.log("Generating solution for:", businessPrompt);
    console.log("Selected expert roles:", expertRoles);

    // First check if we have similar solutions
    const similarSolutions = await findSimilarSolutions({
      businessPrompt,
      userType,
      selectedTemplate
    });

    // If we have very similar solutions, we can use them as a starting point
    let priorKnowledge = "";
    if (similarSolutions.length > 0) {
      console.log("Found similar solutions:", similarSolutions.length);
      toast.info(`Found ${similarSolutions.length} similar past solutions to learn from`);
      
      // Get insights based on similar solutions
      priorKnowledge = await getSolutionInsights(businessPrompt);
    }

    // Call the generate-solution edge function with our prior knowledge
    const { data, error } = await supabase.functions.invoke('generate-solution', {
      body: {
        businessPrompt,
        userType,
        selectedTemplate,
        modelConfig,
        expertRoles,
        priorKnowledge
      },
    });

    if (error) {
      console.error("Error generating solution:", error);
      toast.error("Failed to generate solution: " + error.message);
      throw error;
    }

    console.log("Solution generated successfully:", data);

    // Learn from this new solution asynchronously
    // We don't need to await this as it's a background process
    learnFromSolution(data);

    return data;
  } catch (error) {
    console.error("Error in generateSolution:", error);
    toast.error("Failed to generate solution");
    throw error;
  }
}

// Model Management
export async function fetchAvailableModels() {
  try {
    // For now we'll use a static list until we implement a more dynamic solution
    return {
      openai: ["gpt-4o-mini", "gpt-4o"],
      anthropic: ["claude-3-haiku-20240307", "claude-3-sonnet-20240229", "claude-3-opus-20240229"]
    };
  } catch (error) {
    console.error("Error fetching available models:", error);
    toast.error("Failed to fetch available models");
    throw error;
  }
}

// Save generated solution to the database
export async function saveSolution(solutionData: any) {
  try {
    // Add timestamps if they don't exist
    if (!solutionData.created_at) {
      solutionData.created_at = new Date().toISOString();
    }
    
    if (!solutionData.updated_at) {
      solutionData.updated_at = new Date().toISOString();
    }
    
    const { data, error } = await supabase
      .from('solutions')
      .insert(solutionData)
      .select();

    if (error) {
      console.error("Error saving solution:", error);
      toast.error("Failed to save solution: " + error.message);
      throw error;
    }

    // Learn from this solution after saving
    learnFromSolution(solutionData);
    
    toast.success("Solution saved successfully");
    
    return data?.[0]?.id;
  } catch (error) {
    console.error("Error in saveSolution:", error);
    toast.error("Failed to save solution");
    throw error;
  }
}

// LLM direct access API
export async function generateWithLLM(
  prompt: string,
  provider: string = "openai", 
  model: string = "gpt-4o-mini",
  systemPrompt: string = "",
  maxTokens: number = 1000,
  temperature: number = 0.7
) {
  try {
    const { data, error } = await supabase.functions.invoke('llm-proxy', {
      body: {
        provider,
        model,
        prompt,
        maxTokens,
        temperature,
        systemPrompt
      },
    });

    if (error) {
      console.error("Error calling LLM:", error);
      toast.error("Failed to generate response: " + error.message);
      throw error;
    }

    return data.content;
  } catch (error) {
    console.error("Error in generateWithLLM:", error);
    toast.error("Failed to generate response");
    throw error;
  }
}
