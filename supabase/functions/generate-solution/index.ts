
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type ExpertRole = 'ceo' | 'cfo' | 'product' | 'designer' | 'engineer' | 'security';

interface RequestData {
  businessPrompt: string;
  selectedRoles: ExpertRole[];
}

interface SolutionResponse {
  ui: string;
  database: string;
  automation: string;
  expertInsights?: Record<string, string>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { businessPrompt, selectedRoles } = await req.json() as RequestData;
    
    if (!businessPrompt) {
      return new Response(
        JSON.stringify({ error: "Business description is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Generating solution for prompt: ${businessPrompt}`);
    console.log(`Selected roles: ${selectedRoles.join(', ')}`);
    
    // For now, return mock data as we haven't integrated with OpenAI
    // In a production implementation, this would call OpenAI, Claude, or another LLM
    const mockResponse: SolutionResponse = {
      ui: generateMockUI(businessPrompt),
      database: generateMockDatabase(businessPrompt),
      automation: generateMockAutomation(businessPrompt),
      expertInsights: generateMockInsights(selectedRoles),
    };
    
    return new Response(
      JSON.stringify(mockResponse),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in generate-solution function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Mock helper functions (in a real implementation, these would call an LLM)
function generateMockUI(prompt: string): string {
  // Simplified mock implementation
  return `<div class="p-5 bg-white rounded-lg shadow">
    <h1 class="text-xl font-bold mb-4">Generated Dashboard</h1>
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="font-medium">Key Metric 1</h3>
        <p class="text-2xl font-bold">1,248</p>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="font-medium">Key Metric 2</h3>
        <p class="text-2xl font-bold">28</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="font-medium">Key Metric 3</h3>
        <p class="text-2xl font-bold">13</p>
      </div>
    </div>
    <div class="border rounded-lg p-4">
      <h2 class="font-medium mb-2">Generated for: "${prompt}"</h2>
      <p>This is a mock implementation of a generated UI.</p>
    </div>
  </div>`;
}

function generateMockDatabase(prompt: string): string {
  // Simplified mock implementation
  return `-- Main Entity Table
CREATE TABLE entities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Related Items Table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  entity_id INTEGER REFERENCES entities(id),
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generated for prompt: "${prompt}"`;
}

function generateMockAutomation(prompt: string): string {
  // Simplified mock implementation
  return `// Daily Report Generation
schedule.daily(() => {
  // Get all recent activity
  const items = db.query('SELECT * FROM items WHERE created_at > now() - interval \'1 day\'');
  
  // Generate report
  const report = generateReport({
    title: 'Daily Activity Report',
    data: {
      newItems: items.length,
      // More metrics would go here
    }
  });
  
  // Send report to admin
  email.send({
    to: 'admin@example.com',
    subject: 'Daily Report',
    body: 'Please find attached the daily report.',
    attachments: [report]
  });
});

// Generated for prompt: "${prompt}"`;
}

function generateMockInsights(roles: ExpertRole[]): Record<string, string> {
  const insights: Record<string, string> = {};
  
  if (roles.includes('ceo')) {
    insights.ceo = "This solution addresses market needs with potential for expansion into adjacent verticals. Consider implementing a tiered pricing strategy to maximize revenue.";
  }
  
  if (roles.includes('cfo')) {
    insights.cfo = "Implementation costs will be offset by operational efficiency gains within 6-8 months. Consider subscription-based revenue model with annual prepay discounts to improve cash flow.";
  }
  
  if (roles.includes('product')) {
    insights.product = "Focus initial release on core functionality with a 3-month roadmap for feature enhancements based on user feedback. Implement analytics to track key usage metrics.";
  }
  
  if (roles.includes('designer')) {
    insights.designer = "Interface prioritizes task completion with minimal cognitive load. Recommend implementing a design system for consistency as the application scales.";
  }
  
  if (roles.includes('engineer')) {
    insights.engineer = "Architecture supports horizontal scaling to accommodate growth. Database indexing strategy optimizes for the most common queries identified in the requirements.";
  }
  
  if (roles.includes('security')) {
    insights.security = "Implemented role-based access control and data encryption. Recommend regular security audits and implementing multi-factor authentication for administrative access.";
  }
  
  return insights;
}
