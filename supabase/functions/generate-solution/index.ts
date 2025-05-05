
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// LLM Providers and Models Configuration
const DEFAULT_PROVIDER = "openai";
const DEFAULT_MODEL = "gpt-4o-mini";

interface GenerateSolutionRequest {
  businessPrompt: string;
  userType?: string;
  selectedTemplate?: string;
  modelConfig?: {
    provider: string;
    model: string;
  };
}

interface LlmProxyRequest {
  provider: string;
  model: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessPrompt, userType = "business owner", selectedTemplate = "standard", modelConfig } = 
      await req.json() as GenerateSolutionRequest;
    
    console.log(`Request received: Business prompt: "${businessPrompt.substring(0, 50)}..."`);
    console.log(`User type: ${userType}, Template: ${selectedTemplate}`);
    
    if (!businessPrompt) {
      throw new Error("Business prompt is required");
    }

    // Use provided model config or defaults
    const provider = modelConfig?.provider || DEFAULT_PROVIDER;
    const model = modelConfig?.model || DEFAULT_MODEL;
    
    console.log(`Using LLM provider: ${provider}, model: ${model}`);

    // Generate solutions using our llm-proxy
    const [uiSolution, dbSolution, automationSolution] = await Promise.all([
      generateSolutionPart("ui", businessPrompt, userType, selectedTemplate, provider, model),
      generateSolutionPart("database", businessPrompt, userType, selectedTemplate, provider, model),
      generateSolutionPart("automation", businessPrompt, userType, selectedTemplate, provider, model)
    ]);

    const response = {
      title: `${businessPrompt.substring(0, 40)}...`,
      description: `Solution for ${userType}`,
      business_prompt: businessPrompt,
      ui_solution: uiSolution,
      database_solution: dbSolution,
      automation_solution: automationSolution,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-solution function:', error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function generateSolutionPart(
  solutionType: "ui" | "database" | "automation", 
  businessPrompt: string,
  userType: string,
  template: string,
  provider: string,
  model: string
): Promise<string> {
  const systemPrompts = {
    ui: "You are an expert UI/UX designer. Create a detailed UI solution for the following business need:",
    database: "You are a database architect. Create a comprehensive database schema for the following business need:",
    automation: "You are a workflow automation expert. Create automation workflows for the following business need:"
  };

  const prompt = `
Business Prompt: ${businessPrompt}
User Type: ${userType}
Template: ${template}

Please create a detailed ${solutionType} solution for this business need. Include all necessary components and implementation details.
`;

  try {
    // Call our llm-proxy edge function
    const response = await fetch(new URL("/functions/v1/llm-proxy", Deno.env.get("SUPABASE_URL")), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
      },
      body: JSON.stringify({
        provider,
        model,
        prompt,
        maxTokens: 2000,
        temperature: 0.7,
        systemPrompt: systemPrompts[solutionType],
      } as LlmProxyRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from llm-proxy (${solutionType}):`, errorText);
      throw new Error(`Failed to generate ${solutionType} solution: ${errorText}`);
    }

    const data = await response.json();
    return data.content || `Failed to generate ${solutionType} solution.`;
  } catch (error) {
    console.error(`Error generating ${solutionType} solution:`, error);
    return `Error generating ${solutionType} solution: ${error.message}`;
  }
}
