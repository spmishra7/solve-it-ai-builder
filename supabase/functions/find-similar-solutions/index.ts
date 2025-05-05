
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
    const { businessPrompt, userType, selectedTemplate, expertRoles = [], threshold = 0.65 } = await req.json();
    
    console.log(`Finding similar solutions for prompt: "${businessPrompt.substring(0, 50)}..."`);
    console.log(`Expert roles selected: ${expertRoles.length}`);
    
    // For now, we'll use a simple text-based similarity approach
    // In a production system, we would use vector embeddings for better similarity matching
    const { data: solutions, error } = await supabase
      .from('solutions')
      .select('*')
      .textSearch('business_prompt', businessPrompt.split(' ').filter((w: string) => w.length > 3).join(' & '))
      .limit(10);
    
    if (error) throw error;
    
    // Calculate a primitive similarity score
    // In a real implementation, this would use proper embeddings and cosine similarity
    const scoredSolutions = solutions.map((solution: any) => {
      // Base similarity on business prompt
      const words1 = new Set(businessPrompt.toLowerCase().split(/\W+/).filter((w: string) => w.length > 3));
      const words2 = new Set(solution.business_prompt.toLowerCase().split(/\W+/).filter((w: string) => w.length > 3));
      
      let intersection = 0;
      for (const word of words1) {
        if (words2.has(word)) intersection++;
      }
      
      let similarity = intersection / (words1.size + words2.size - intersection);
      
      // Boost score if user type matches
      if (solution.user_type === userType) {
        similarity += 0.1;
      }
      
      // Boost score if template matches
      if (solution.template === selectedTemplate) {
        similarity += 0.1;
      }
      
      // Boost scores for solutions catering to specific professional roles
      // This is a simplified approach - would be better with metadata on solutions
      if (expertRoles.length > 0 && solution.metadata?.expertRoles) {
        const roleIntersection = expertRoles.filter(role => 
          solution.metadata.expertRoles.includes(role)
        ).length;
        
        if (roleIntersection > 0) {
          similarity += 0.05 * (roleIntersection / expertRoles.length);
        }
      }
      
      return {
        ...solution,
        similarity_score: similarity
      };
    }).filter((s: any) => s.similarity_score >= threshold)
      .sort((a: any, b: any) => b.similarity_score - a.similarity_score);
    
    return new Response(JSON.stringify({ solutions: scoredSolutions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in find-similar-solutions function:', error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
