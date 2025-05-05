
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Get the SQL from the request body
    const { sql } = await req.json();
    
    if (!sql) {
      return new Response(
        JSON.stringify({ error: 'No SQL provided' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Initialize Supabase client with service role for admin access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    console.log('Executing SQL:', sql);
    
    // Execute the SQL safely by splitting statements and running them individually
    const statements = sql
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove SQL comments
      .replace(/--.*$/gm, '') // Remove single line comments
      .split(';')
      .filter(statement => statement.trim().length > 0);
    
    const results = [];
    
    for (const statement of statements) {
      try {
        console.log(`Executing statement: ${statement}`);
        
        // Execute the SQL statement
        const { data, error } = await supabaseAdmin.rpc('exec_sql', {
          query: statement
        });
        
        if (error) {
          console.error('Error executing statement:', error);
          results.push({ statement, error: error.message });
        } else {
          console.log('Statement executed successfully');
          results.push({ statement, success: true });
        }
      } catch (statementError) {
        console.error('Error executing statement:', statementError);
        results.push({ 
          statement, 
          error: statementError instanceof Error ? statementError.message : String(statementError) 
        });
      }
    }
    
    // Check if there were any errors
    const hasErrors = results.some(result => result.error);
    
    if (hasErrors) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Some SQL statements failed to execute',
          results 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'SQL execution completed successfully',
        results
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in execute-sql function:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
