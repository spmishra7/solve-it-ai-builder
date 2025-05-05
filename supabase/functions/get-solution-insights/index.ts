
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { businessPrompt, expertRoles = [] } = await req.json();
    
    console.log(`Getting insights for prompt: "${businessPrompt.substring(0, 50)}..."`);
    console.log(`Expert roles requested: ${expertRoles.join(", ")}`);
    
    // In a real implementation, this would query similar solutions 
    // and synthesize useful insights based on what worked well
    
    // Custom insights based on professional roles
    let roleSpecificInsights = "";
    
    if (expertRoles.includes("barber") || expertRoles.includes("beautician")) {
      roleSpecificInsights += "For service providers like barbers and beauticians, appointment scheduling and customer management are critical components. ";
    }
    
    if (expertRoles.includes("teacher") || expertRoles.includes("student")) {
      roleSpecificInsights += "Educational solutions benefit from clear organization of materials and progress tracking features. ";
    }
    
    if (expertRoles.includes("landlord") || expertRoles.includes("tenant") || expertRoles.includes("propertyManager")) {
      roleSpecificInsights += "Rental ecosystem solutions should focus on transparent communication and document management. ";
    }
    
    if (expertRoles.includes("traveler") || expertRoles.includes("tourGuide")) {
      roleSpecificInsights += "Mobility solutions should prioritize offline access to critical information and location-based features. ";
    }
    
    if (expertRoles.includes("nurse") || expertRoles.includes("therapist") || expertRoles.includes("homeCareProvider")) {
      roleSpecificInsights += "Healthcare solutions must prioritize data security and ease of documentation. ";
    }
    
    // Generate generic insights if no role-specific ones were created
    const genericInsights = "Based on similar past solutions, consider focusing on user experience, data security, and scalability for this type of solution.";
    
    const insights = roleSpecificInsights || genericInsights;
    
    return new Response(JSON.stringify({ insights }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in get-solution-insights function:', error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
