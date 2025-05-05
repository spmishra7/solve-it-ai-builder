
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
    const roleSpecificInsights: Record<string, string> = {};
    
    // Healthcare professionals
    if (expertRoles.includes("doctor") || expertRoles.includes("nurse") || expertRoles.includes("therapist")) {
      roleSpecificInsights.doctor = "Solutions for healthcare providers should comply with patient data protection regulations and focus on reducing administrative overhead.";
      roleSpecificInsights.nurse = "Nursing solutions should prioritize patient care workflow optimization and clear team communication features.";
      roleSpecificInsights.therapist = "Therapy solutions benefit from secure private messaging, scheduling tools, and progress tracking features.";
    }
    
    // Education professionals
    if (expertRoles.includes("teacher") || expertRoles.includes("student") || expertRoles.includes("professor")) {
      roleSpecificInsights.teacher = "Educational tools should focus on reducing grading time, simplifying communication with students and parents, and enabling easy assignment management.";
      roleSpecificInsights.student = "Student-focused solutions should optimize for mobile devices and provide clear organization of course materials and assignments.";
      roleSpecificInsights.professor = "Higher education solutions should include robust analytics for student performance tracking and research management tools.";
    }
    
    // Service industry
    if (expertRoles.includes("barber") || expertRoles.includes("beautician")) {
      roleSpecificInsights.barber = "Barber shop solutions should prioritize appointment scheduling, customer profiles with style preferences, and simple payment processing.";
      roleSpecificInsights.beautician = "Beauty salon applications benefit from inventory management, detailed customer records with treatment history, and before/after image galleries.";
    }
    
    // Real estate
    if (expertRoles.includes("landlord") || expertRoles.includes("tenant") || expertRoles.includes("propertyManager")) {
      roleSpecificInsights.landlord = "Property management solutions should focus on rent collection, maintenance request tracking, and tenant communication tools.";
      roleSpecificInsights.tenant = "Tenant applications should prioritize maintenance request submission, payment records, and communication with building management.";
      roleSpecificInsights.propertyManager = "Property management solutions need robust reporting, maintenance coordination, and financial tracking features.";
    }
    
    // Travel
    if (expertRoles.includes("traveler") || expertRoles.includes("tourGuide")) {
      roleSpecificInsights.traveler = "Travel solutions should prioritize offline access, location-based recommendations, and itinerary management.";
      roleSpecificInsights.tourGuide = "Tour guide applications should include route planning, group management, and local business partnerships/integrations.";
    }
    
    // Home care
    if (expertRoles.includes("homeCareProvider")) {
      roleSpecificInsights.homeCareProvider = "Home care solutions should focus on visit scheduling, care plan management, and secure communication with healthcare providers.";
    }
    
    // Indian professions
    if (expertRoles.includes("tutor") || expertRoles.includes("chaiwala") || 
        expertRoles.includes("autorickshawDriver") || expertRoles.includes("kathakDancer") ||
        expertRoles.includes("ayurvedicDoctor")) {
      roleSpecificInsights.tutor = "Tutoring solutions should include video call capabilities, assignment tracking, and progress reports for students and parents.";
      roleSpecificInsights.chaiwala = "Tea stall management solutions should focus on inventory tracking, sales analytics, and simple order management.";
      roleSpecificInsights.autorickshawDriver = "Auto-rickshaw driver apps should feature fare calculation, navigation with local knowledge, and maintenance tracking.";
      roleSpecificInsights.kathakDancer = "Dance professional apps should include performance scheduling, student progress tracking, and choreography documentation.";
      roleSpecificInsights.ayurvedicDoctor = "Ayurvedic practice management should include patient records with treatment history, herb inventory, and appointment scheduling.";
    }
    
    // American professions
    if (expertRoles.includes("softwareDeveloper") || expertRoles.includes("truckDriver") ||
        expertRoles.includes("realEstateAgent") || expertRoles.includes("financialAdvisor") ||
        expertRoles.includes("personalTrainer")) {
      roleSpecificInsights.softwareDeveloper = "Developer tools should focus on project tracking, code snippets management, and client communication capabilities.";
      roleSpecificInsights.truckDriver = "Logistics solutions should prioritize route optimization, rest stop identification, and delivery tracking.";
      roleSpecificInsights.realEstateAgent = "Real estate solutions need listing management, client matching, and easy property comparison features.";
      roleSpecificInsights.financialAdvisor = "Financial advisory tools should include portfolio analysis, client goal tracking, and regulatory compliance features.";
      roleSpecificInsights.personalTrainer = "Fitness professional tools should focus on client workout tracking, progress visualization, and schedule management.";
    }
    
    // Chinese professions
    if (expertRoles.includes("teaArtist") || expertRoles.includes("acupuncturist") ||
        expertRoles.includes("eCommerceStreamer") || expertRoles.includes("calligrapher") ||
        expertRoles.includes("streetFoodVendor")) {
      roleSpecificInsights.teaArtist = "Tea ceremony applications should include inventory of tea varieties, customer preferences, and ceremony scheduling.";
      roleSpecificInsights.acupuncturist = "Acupuncture practice management should focus on treatment point documentation, patient progress tracking, and appointment scheduling.";
      roleSpecificInsights.eCommerceStreamer = "Livestream commerce solutions need product inventory management, viewer engagement tools, and sales analytics.";
      roleSpecificInsights.calligrapher = "Calligraphy business management should include project tracking, client galleries, and materials inventory.";
      roleSpecificInsights.streetFoodVendor = "Street food business apps should focus on inventory tracking, popular location mapping, and simple order management.";
    }
    
    // Generate generic insights if no role-specific ones were created
    if (Object.keys(roleSpecificInsights).length === 0) {
      roleSpecificInsights.general = "Based on similar past solutions, consider focusing on user experience, data security, and scalability for this type of solution.";
    }
    
    return new Response(JSON.stringify({ insights: roleSpecificInsights }), {
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
