
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// N8n API details
// The N8n API key will need to be set in Supabase secrets
const N8N_API_URL = Deno.env.get("N8N_API_URL") || "https://your-n8n-instance.com/api/v1";
const N8N_API_KEY = Deno.env.get("N8N_API_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    if (!N8N_API_KEY) {
      console.error("N8N_API_KEY not set in environment variables");
      return new Response(
        JSON.stringify({ error: "N8n configuration missing. Please check your environment variables." }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Parse the request body
    const { action, workflowId, workflowData, automationCode } = await req.json();
    
    switch (action) {
      case "getWorkflows":
        return await getWorkflows();
      
      case "createWorkflow":
        return await createWorkflow(automationCode, workflowData);
        
      case "executeWorkflow":
        return await executeWorkflow(workflowId, workflowData);
        
      case "convertAutomationToWorkflow":
        return await convertAutomationToWorkflow(automationCode);
        
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action specified" }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error("Error in n8n-automation function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Fetch available workflows from n8n
async function getWorkflows() {
  try {
    const response = await fetch(`${N8N_API_URL}/workflows`, {
      method: 'GET',
      headers: {
        'X-N8N-API-KEY': N8N_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch workflows: ${response.status}`);
    }
    
    const workflows = await response.json();
    
    return new Response(
      JSON.stringify({ workflows }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Create a new workflow in n8n
async function createWorkflow(automationCode, workflowData) {
  try {
    // If no workflow data is provided, try to generate it from automation code
    if (!workflowData && automationCode) {
      const convertedWorkflow = await convertAutomationToWorkflow(automationCode);
      const conversionResult = await convertedWorkflow.json();
      
      if (conversionResult.error) {
        throw new Error(conversionResult.error);
      }
      
      workflowData = conversionResult.workflowData;
    }
    
    if (!workflowData) {
      throw new Error("No workflow data provided and couldn't generate from automation code");
    }
    
    // Ensure workflow has a name
    if (!workflowData.name) {
      workflowData.name = "Generated Workflow " + new Date().toISOString();
    }
    
    const response = await fetch(`${N8N_API_URL}/workflows`, {
      method: 'POST',
      headers: {
        'X-N8N-API-KEY': N8N_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflowData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create workflow: ${response.status}`);
    }
    
    const createdWorkflow = await response.json();
    
    return new Response(
      JSON.stringify({ workflow: createdWorkflow }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error creating workflow:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Execute an existing workflow
async function executeWorkflow(workflowId, workflowData) {
  try {
    if (!workflowId) {
      throw new Error("No workflow ID provided");
    }
    
    const response = await fetch(`${N8N_API_URL}/workflows/${workflowId}/execute`, {
      method: 'POST',
      headers: {
        'X-N8N-API-KEY': N8N_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflowData || {})
    });
    
    if (!response.ok) {
      throw new Error(`Failed to execute workflow: ${response.status}`);
    }
    
    const executionResult = await response.json();
    
    return new Response(
      JSON.stringify({ execution: executionResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error executing workflow:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Convert automation code to n8n workflow using AI
async function convertAutomationToWorkflow(automationCode) {
  try {
    if (!automationCode) {
      throw new Error("No automation code provided for conversion");
    }
    
    // Get OpenAI API key from environment
    const openAiApiKey = Deno.env.get("OPENAI_API_KEY");
    
    if (!openAiApiKey) {
      throw new Error("OPENAI_API_KEY not set in environment variables");
    }
    
    // Use OpenAI to convert the automation code to n8n workflow format
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system", 
            content: `You are an expert at converting JavaScript automation code to n8n workflows. 
                      Return ONLY a valid JSON object that can be imported into n8n as a workflow.
                      The JSON object should follow n8n workflow format with nodes and connections.`
          },
          {
            role: "user",
            content: `Convert this automation code to an n8n workflow:\n\n${automationCode}`
          }
        ],
        temperature: 0.2
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to convert automation code: ${response.status}`);
    }
    
    const result = await response.json();
    const workflowData = JSON.parse(result.choices[0].message.content.trim());
    
    return new Response(
      JSON.stringify({ workflowData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error converting automation code:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
