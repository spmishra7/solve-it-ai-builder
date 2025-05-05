
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// API keys from environment variables
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

interface CompletionRequest {
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
    // Check API keys first before parsing the request
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key not configured. Please set the OPENAI_API_KEY environment variable in your Supabase project." 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse the request body
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
    
    const { provider, model, prompt, maxTokens = 1000, temperature = 0.7, systemPrompt = "" } = requestBody as CompletionRequest;
    
    // Validate required fields
    if (!provider) {
      return new Response(
        JSON.stringify({ error: "Provider is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!model) {
      return new Response(
        JSON.stringify({ error: "Model is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Request received for provider: ${provider}, model: ${model}`);
    console.log(`Prompt length: ${prompt.length} characters`);
    
    let response;
    
    switch (provider.toLowerCase()) {
      case 'openai':
        if (!OPENAI_API_KEY) {
          throw new Error('OpenAI API key not configured');
        }
        console.log(`Calling OpenAI API with model: ${model}`);
        response = await callOpenAI(model, prompt, maxTokens, temperature, systemPrompt);
        break;
      
      case 'anthropic':
        if (!ANTHROPIC_API_KEY) {
          throw new Error('Anthropic API key not configured');
        }
        console.log(`Calling Anthropic API with model: ${model}`);
        response = await callAnthropic(model, prompt, maxTokens, temperature, systemPrompt);
        break;
      
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
    
    console.log("API call successful, returning response");
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in llm-proxy function:', error);
    let errorMessage = "An unknown error occurred";
    
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

async function callOpenAI(model: string, prompt: string, maxTokens: number, temperature: number, systemPrompt: string) {
  const url = 'https://api.openai.com/v1/chat/completions';
  
  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });
  
  console.log(`Calling OpenAI API with ${messages.length} messages`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
    });
    
    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch (e) {
        // If JSON parsing fails, use the status text
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }
      
      console.error('OpenAI API error response:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`OpenAI API response received: ${data.choices?.[0]?.message?.content?.substring(0, 50)}...`);
    
    return {
      provider: 'openai',
      model,
      content: data.choices[0].message.content,
      usage: data.usage,
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

async function callAnthropic(model: string, prompt: string, maxTokens: number, temperature: number, systemPrompt: string) {
  const url = 'https://api.anthropic.com/v1/messages';
  
  const systemPromptHeader = systemPrompt ? { system: systemPrompt } : {};
  
  console.log('Calling Anthropic API');
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
        temperature,
        ...systemPromptHeader,
      }),
    });
    
    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch (e) {
        // If JSON parsing fails, use the status text
        throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
      }
      
      console.error('Anthropic API error response:', errorData);
      throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Anthropic API response received');
    
    return {
      provider: 'anthropic',
      model,
      content: data.content[0].text,
      usage: { input_tokens: data.usage?.input_tokens, output_tokens: data.usage?.output_tokens },
    };
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    throw error;
  }
}
