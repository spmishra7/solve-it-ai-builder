
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Solution Generation
export async function generateSolution(
  businessPrompt: string,
  userType: string = "business owner",
  selectedTemplate: string = "standard",
  modelConfig?: { provider: string; model: string }
) {
  try {
    // Clear any previously stored template prompts
    localStorage.removeItem("selectedTemplatePrompt");
    localStorage.removeItem("selectedTemplateTitle");

    const { data, error } = await supabase.functions.invoke('generate-solution', {
      body: {
        businessPrompt,
        userType,
        selectedTemplate,
        modelConfig
      },
    });

    if (error) {
      console.error("Error generating solution:", error);
      toast.error("Failed to generate solution");
      throw error;
    }

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
    const { error } = await supabase
      .from('solutions')
      .insert(solutionData);

    if (error) {
      console.error("Error saving solution:", error);
      toast.error("Failed to save solution");
      throw error;
    }

    toast.success("Solution saved successfully");
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
      toast.error("Failed to generate response");
      throw error;
    }

    return data.content;
  } catch (error) {
    console.error("Error in generateWithLLM:", error);
    toast.error("Failed to generate response");
    throw error;
  }
}
