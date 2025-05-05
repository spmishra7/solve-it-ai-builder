
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

    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { 
      businessPrompt, 
      userType = "business owner", 
      selectedTemplate = "standard", 
      modelConfig,
      expertRoles = [],
      priorKnowledge = ""
    } = requestBody as GenerateSolutionRequest;
    
    console.log(`Request received: Business prompt: "${businessPrompt?.substring(0, 50) || ""}..."`);
    console.log(`User type: ${userType}, Template: ${selectedTemplate}`);
    
    if (!businessPrompt) {
      return new Response(
        JSON.stringify({ error: "Business prompt is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use provided model config or defaults
    const provider = modelConfig?.provider || DEFAULT_PROVIDER;
    const model = modelConfig?.model || DEFAULT_MODEL;
    
    console.log(`Using LLM provider: ${provider}, model: ${model}`);
    console.log(`Expert roles selected: ${expertRoles.length}`);
    
    if (priorKnowledge) {
      console.log("Using prior knowledge from similar solutions");
    }

    // Generate solutions using our llm-proxy
    console.log("Starting generation for UI solution");
    const uiPromise = generateSolutionPart("ui", businessPrompt, userType, selectedTemplate, provider, model, expertRoles, priorKnowledge);
    
    console.log("Starting generation for database solution");
    const dbPromise = generateSolutionPart("database", businessPrompt, userType, selectedTemplate, provider, model, expertRoles, priorKnowledge);
    
    console.log("Starting generation for automation solution");
    const automationPromise = generateSolutionPart("automation", businessPrompt, userType, selectedTemplate, provider, model, expertRoles, priorKnowledge);
    
    try {
      const [uiSolution, dbSolution, automationSolution] = await Promise.all([
        uiPromise, dbPromise, automationPromise
      ]);
      
      console.log("All solutions generated successfully");

      // Create title from business prompt or use template name if it's one of our predefined templates
      const title = businessPrompt.length > 40 
        ? `${businessPrompt.substring(0, 40)}...`
        : businessPrompt;

      const response = {
        title: title,
        description: `Solution for ${userType}`,
        business_prompt: businessPrompt,
        ui_solution: uiSolution,
        database_solution: dbSolution,
        automation_solution: automationSolution,
        expert_insights: {}, // Will be populated in the future
      };

      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parallelError) {
      console.error('Error in Promise.all for solution parts:', parallelError);
      throw parallelError;
    }
  } catch (error) {
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
});

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
  const systemPrompts = {
    ui: "You are an expert UI/UX designer. Create a detailed UI solution for the following business need:",
    database: "You are a database architect. Create a comprehensive database schema for the following business need:",
    automation: "You are a workflow automation expert. Create automation workflows for the following business need:"
  };

  const solutionPrompts = {
    ui: "Please create a detailed UI solution for this business need. Include component hierarchy, UX flow, and key screens. Focus on creating a clean, modern interface that is intuitive for users.",
    database: "Please create a comprehensive database schema for this business need. Include tables, relationships, key fields, and sample data. Consider security, performance, and scalability concerns.",
    automation: "Please create detailed automation workflows for this business need. Include process flows, trigger events, conditional logic, and any external integrations needed. Focus on efficiency and error handling."
  };

  // Add expert roles context if any are selected
  let expertContext = "";
  if (expertRoles.length > 0) {
    expertContext = `\nConsider the following expert perspectives in your solution:\n${expertRoles.join(", ")}\n`;
  }

  // Add prior knowledge if available
  let priorKnowledgeContext = "";
  if (priorKnowledge) {
    priorKnowledgeContext = `\nInsights from similar past solutions:\n${priorKnowledge}\n`;
  }

  const prompt = `
Business Prompt: ${businessPrompt}
User Type: ${userType}
Template: ${template}
${expertContext}
${priorKnowledgeContext}
${solutionPrompts[solutionType]}
`;

  try {
    console.log(`Calling llm-proxy for ${solutionType} solution`);
    
    // Check if API key exists
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      console.error("OPENAI_API_KEY not set, returning mock data");
      
      // Return mock data for each solution type
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
);

CREATE TABLE medical_records (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  record_date DATE NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  prescription TEXT,
  doctor_id INTEGER REFERENCES doctors(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  appointment_id INTEGER REFERENCES appointments(id),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'unpaid',
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER REFERENCES invoices(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Authentication and Authorization

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  profile_type VARCHAR(20) NOT NULL,
  reference_id INTEGER,
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
  
  // 5. Create calendar event
  addToCalendar(patientId, doctorId, date, time, appointmentId);
  
  return { success: true, appointmentId };
}

// Payment Processing Workflow
function processPayment(invoiceId, amount, paymentMethod, transactionDetails) {
  // 1. Validate payment amount against invoice
  const invoice = getInvoice(invoiceId);
  if (!invoice) {
    return { success: false, message: "Invoice not found" };
  }
  
  if (amount < invoice.amount) {
    return { success: false, message: "Payment amount is less than invoice amount" };
  }
  
  // 2. Process payment through payment gateway
  const paymentResult = processPaymentTransaction(amount, paymentMethod, transactionDetails);
  if (!paymentResult.success) {
    return { success: false, message: "Payment transaction failed", details: paymentResult.error };
  }
  
  // 3. Record payment in database
  const paymentId = recordPayment(invoiceId, amount, paymentMethod, paymentResult.transactionId);
  
  // 4. Update invoice status
  updateInvoiceStatus(invoiceId, "paid");
  
  // 5. Send receipt to patient
  const patientId = invoice.patientId;
  sendPaymentReceipt(patientId, invoiceId, paymentId);
  
  return { success: true, paymentId, transactionId: paymentResult.transactionId };
}

// Medical Records Management Workflow
function createMedicalRecord(patientId, doctorId, diagnosis, treatment, prescription) {
  // 1. Validate patient and doctor
  if (!isValidPatient(patientId) || !isValidDoctor(doctorId)) {
    return { success: false, message: "Invalid patient or doctor" };
  }
  
  // 2. Create medical record
  const recordId = insertMedicalRecord(patientId, doctorId, diagnosis, treatment, prescription);
  
  // 3. Link to related appointment if applicable
  linkToAppointment(recordId, patientId, doctorId);
  
  // 4. Notify patient about new record
  notifyPatientAboutNewRecord(patientId, recordId);
  
  // 5. Schedule follow-up if needed
  if (treatment.requiresFollowUp) {
    scheduleFollowUp(patientId, doctorId, treatment.followUpDays);
  }
  
  // 6. Process any prescriptions
  if (prescription) {
    processPrescription(patientId, prescription);
  }
  
  return { success: true, recordId };
}`;
      }
    }
    
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
      console.error(`Error from llm-proxy (${solutionType}): Status ${response.status}`, errorText);
      throw new Error(`Failed to generate ${solutionType} solution: ${errorText || response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully received ${solutionType} solution response`);
    return data.content || `Failed to generate ${solutionType} solution.`;
  } catch (error) {
    console.error(`Error generating ${solutionType} solution:`, error);
    return `Error generating ${solutionType} solution: ${error instanceof Error ? error.message : String(error)}`;
  }
}
