
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// LLM Providers and Models Configuration
const DEFAULT_PROVIDER = "openai";
const DEFAULT_MODEL = "gpt-4o-mini";

// Types for request and response
interface GenerateSolutionRequest {
  businessPrompt: string;
  userType?: string;
  selectedTemplate?: string;
  modelConfig?: {
    provider: string;
    model: string;
  };
  expertRoles?: string[];
  priorKnowledge?: string;
}

interface LlmProxyRequest {
  provider: string;
  model: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

/**
 * Main handler for the generate-solution function
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check for API keys early
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      console.error("OPENAI_API_KEY not set in environment variables");
      return handleMissingApiKey();
    }

    // Parse and validate request
    const requestData = await parseAndValidateRequest(req);
    if ('error' in requestData) {
      return new Response(
        JSON.stringify({ error: requestData.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { 
      businessPrompt, 
      userType, 
      selectedTemplate, 
      modelConfig,
      expertRoles,
      priorKnowledge
    } = requestData;
    
    // Log request information
    logRequestInfo(businessPrompt, userType, selectedTemplate, expertRoles, priorKnowledge);
    
    // Determine model to use
    const { provider, model } = determineModel(modelConfig);
    console.log(`Using LLM provider: ${provider}, model: ${model}`);

    // Generate solutions in parallel
    const solutionPromises = generateSolutionPromises(
      businessPrompt, 
      userType, 
      selectedTemplate, 
      provider, 
      model, 
      expertRoles, 
      priorKnowledge
    );

    // Wait for all solutions to be generated
    const [uiSolution, dbSolution, automationSolution] = await Promise.all(solutionPromises);
    console.log("All solutions generated successfully");

    // Create response
    const response = createSolutionResponse(businessPrompt, userType, uiSolution, dbSolution, automationSolution);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleGeneralError(error);
  }
});

/**
 * Parse and validate the request body
 */
async function parseAndValidateRequest(req: Request): Promise<GenerateSolutionRequest | { error: string }> {
  try {
    const requestBody = await req.json();
    
    const { 
      businessPrompt, 
      userType = "business owner", 
      selectedTemplate = "standard", 
      modelConfig,
      expertRoles = [],
      priorKnowledge = ""
    } = requestBody as GenerateSolutionRequest;
    
    if (!businessPrompt) {
      return { error: "Business prompt is required" };
    }

    return {
      businessPrompt,
      userType,
      selectedTemplate,
      modelConfig,
      expertRoles,
      priorKnowledge
    };
  } catch (parseError) {
    console.error("Error parsing request body:", parseError);
    return { error: "Invalid request format" };
  }
}

/**
 * Handle missing API key error
 */
function handleMissingApiKey(): Response {
  return new Response(
    JSON.stringify({ 
      error: "API key configuration error. Please contact the administrator to set up the OpenAI API key." 
    }),
    { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

/**
 * Handle general errors
 */
function handleGeneralError(error: unknown): Response {
  console.error('Error in generate-solution function:', error);
  let errorMessage = "Unknown error occurred";
  
  if (error instanceof Error) {
    errorMessage = error.message;
    console.error('Error details:', error.stack);
  }
  
  return new Response(
    JSON.stringify({ error: errorMessage }),
    { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * Log request information
 */
function logRequestInfo(
  businessPrompt: string,
  userType: string,
  selectedTemplate: string,
  expertRoles: string[],
  priorKnowledge: string
): void {
  console.log(`Request received: Business prompt: "${businessPrompt?.substring(0, 50) || ""}..."`);
  console.log(`User type: ${userType}, Template: ${selectedTemplate}`);
  console.log(`Expert roles selected: ${expertRoles.length}`);
  
  if (priorKnowledge) {
    console.log("Using prior knowledge from similar solutions");
  }
}

/**
 * Determine which LLM provider and model to use
 */
function determineModel(modelConfig?: { provider: string; model: string }): { provider: string; model: string } {
  return {
    provider: modelConfig?.provider || DEFAULT_PROVIDER,
    model: modelConfig?.model || DEFAULT_MODEL,
  };
}

/**
 * Generate promises for each solution part
 */
function generateSolutionPromises(
  businessPrompt: string,
  userType: string,
  selectedTemplate: string,
  provider: string,
  model: string,
  expertRoles: string[],
  priorKnowledge: string
): [Promise<string>, Promise<string>, Promise<string>] {
  console.log("Starting generation for UI solution");
  const uiPromise = generateSolutionPart(
    "ui", 
    businessPrompt, 
    userType, 
    selectedTemplate, 
    provider, 
    model, 
    expertRoles, 
    priorKnowledge
  );
  
  console.log("Starting generation for database solution");
  const dbPromise = generateSolutionPart(
    "database", 
    businessPrompt, 
    userType, 
    selectedTemplate, 
    provider, 
    model, 
    expertRoles, 
    priorKnowledge
  );
  
  console.log("Starting generation for automation solution");
  const automationPromise = generateSolutionPart(
    "automation", 
    businessPrompt, 
    userType, 
    selectedTemplate, 
    provider, 
    model, 
    expertRoles, 
    priorKnowledge
  );

  return [uiPromise, dbPromise, automationPromise];
}

/**
 * Create the final solution response object
 */
function createSolutionResponse(
  businessPrompt: string,
  userType: string,
  uiSolution: string,
  dbSolution: string,
  automationSolution: string
): Record<string, unknown> {
  // Create title from business prompt
  const title = businessPrompt.length > 40 
    ? `${businessPrompt.substring(0, 40)}...`
    : businessPrompt;

  return {
    title: title,
    description: `Solution for ${userType}`,
    business_prompt: businessPrompt,
    ui_solution: uiSolution,
    database_solution: dbSolution,
    automation_solution: automationSolution,
    expert_insights: {}, // Will be populated in the future
  };
}

/**
 * Generate a specific part of the solution (UI, database, or automation)
 */
async function generateSolutionPart(
  solutionType: "ui" | "database" | "automation", 
  businessPrompt: string,
  userType: string,
  template: string,
  provider: string,
  model: string,
  expertRoles: string[] = [],
  priorKnowledge: string = ""
): Promise<string> {
  const systemPrompts = getSystemPrompts();
  const solutionPrompts = getSolutionPrompts();
  
  const expertContext = getExpertContext(expertRoles);
  const priorKnowledgeContext = getPriorKnowledgeContext(priorKnowledge);

  const prompt = buildPrompt(
    businessPrompt, 
    userType, 
    template, 
    expertContext, 
    priorKnowledgeContext, 
    solutionPrompts[solutionType]
  );

  try {
    console.log(`Calling llm-proxy for ${solutionType} solution`);
    
    // Check if API key exists, otherwise return mock data
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      console.error("OPENAI_API_KEY not set, returning mock data");
      return getMockSolution(solutionType);
    }
    
    // Call our llm-proxy edge function
    return await callLlmProxy(
      provider, 
      model, 
      prompt, 
      systemPrompts[solutionType]
    );
  } catch (error) {
    console.error(`Error generating ${solutionType} solution:`, error);
    return `Error generating ${solutionType} solution: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Get system prompts for each solution type
 */
function getSystemPrompts(): Record<string, string> {
  return {
    ui: "You are an expert UI/UX designer. Create a detailed UI solution for the following business need:",
    database: "You are a database architect. Create a comprehensive database schema for the following business need:",
    automation: "You are a workflow automation expert. Create automation workflows for the following business need:"
  };
}

/**
 * Get solution prompts for each solution type
 */
function getSolutionPrompts(): Record<string, string> {
  return {
    ui: "Please create a detailed UI solution for this business need. Include component hierarchy, UX flow, and key screens. Focus on creating a clean, modern interface that is intuitive for users.",
    database: "Please create a comprehensive database schema for this business need. Include tables, relationships, key fields, and sample data. Consider security, performance, and scalability concerns.",
    automation: "Please create detailed automation workflows for this business need. Include process flows, trigger events, conditional logic, and any external integrations needed. Focus on efficiency and error handling."
  };
}

/**
 * Build expert context if any roles are selected
 */
function getExpertContext(expertRoles: string[]): string {
  if (expertRoles.length === 0) {
    return "";
  }
  
  return `\nConsider the following expert perspectives in your solution:\n${expertRoles.join(", ")}\n`;
}

/**
 * Build prior knowledge context if available
 */
function getPriorKnowledgeContext(priorKnowledge: string): string {
  if (!priorKnowledge) {
    return "";
  }
  
  return `\nInsights from similar past solutions:\n${priorKnowledge}\n`;
}

/**
 * Build the final prompt for the LLM
 */
function buildPrompt(
  businessPrompt: string,
  userType: string,
  template: string,
  expertContext: string,
  priorKnowledgeContext: string,
  solutionPrompt: string
): string {
  return `
Business Prompt: ${businessPrompt}
User Type: ${userType}
Template: ${template}
${expertContext}
${priorKnowledgeContext}
${solutionPrompt}
`;
}

/**
 * Call the llm-proxy edge function
 */
async function callLlmProxy(
  provider: string,
  model: string,
  prompt: string,
  systemPrompt: string
): Promise<string> {
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
      systemPrompt,
    } as LlmProxyRequest),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error from llm-proxy: Status ${response.status}`, errorText);
    throw new Error(`Failed to generate solution: ${errorText || response.statusText}`);
  }

  const data = await response.json();
  console.log(`Successfully received solution response`);
  return data.content || `Failed to generate solution.`;
}

/**
 * Provide mock solutions when API key is missing
 */
function getMockSolution(solutionType: "ui" | "database" | "automation"): string {
  if (solutionType === "ui") {
    return `<div class="patient-management-system">
      <header class="bg-blue-600 text-white p-4">
        <h1 class="text-2xl">MedClinic Manager</h1>
      </header>
      <div class="container mx-auto p-4">
        <h2 class="text-xl mb-4">Patient Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded shadow">
            <h3>Appointments Today: 12</h3>
          </div>
          <div class="bg-white p-4 rounded shadow">
            <h3>Pending Reports: 5</h3>
          </div>
          <div class="bg-white p-4 rounded shadow">
            <h3>Payment Due: $1,250</h3>
          </div>
        </div>
      </div>
    </div>`;
  } else if (solutionType === "database") {
    return `-- Main Tables

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20),
  address TEXT,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  insurance_provider VARCHAR(100),
  insurance_policy_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  doctor_id INTEGER REFERENCES doctors(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
  } else {
    return `// Appointment Scheduling Workflow
function scheduleAppointment(patientId, doctorId, date, time) {
  // 1. Check doctor availability
  if (!checkDoctorAvailability(doctorId, date, time)) {
    return { success: false, message: "Doctor is not available at this time" };
  }
  
  // 2. Check patient existing appointments
  if (hasOverlappingAppointment(patientId, date, time)) {
    return { success: false, message: "Patient already has an appointment at this time" };
  }
  
  // 3. Create the appointment
  const appointmentId = createAppointmentRecord(patientId, doctorId, date, time);
  
  // 4. Send confirmation notifications
  sendPatientConfirmation(patientId, appointmentId);
  sendDoctorNotification(doctorId, appointmentId);
  
  return { success: true, appointmentId };
}`;
  }
}
