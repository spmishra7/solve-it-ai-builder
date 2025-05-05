
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
    const { provider, model, prompt, maxTokens = 1000, temperature = 0.7, systemPrompt = "" } = await req.json() as CompletionRequest;
    
    console.log(`Request received for provider: ${provider}, model: ${model}`);
    
    let response;
    
    switch (provider.toLowerCase()) {
      case 'openai':
        if (!OPENAI_API_KEY) {
          throw new Error('OpenAI API key not configured');
        }
        response = await callOpenAI(model, prompt, maxTokens, temperature, systemPrompt);
        break;
      
      case 'anthropic':
        if (!ANTHROPIC_API_KEY) {
          throw new Error('Anthropic API key not configured');
        }
        response = await callAnthropic(model, prompt, maxTokens, temperature, systemPrompt);
        break;
      
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in llm-proxy function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
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
    const error = await response.json();
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
  }
  
  const data = await response.json();
  return {
    provider: 'openai',
    model,
    content: data.choices[0].message.content,
    usage: data.usage,
  };
}

async function callAnthropic(model: string, prompt: string, maxTokens: number, temperature: number, systemPrompt: string) {
  const url = 'https://api.anthropic.com/v1/messages';
  
  const systemPromptHeader = systemPrompt ? { system: systemPrompt } : {};
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
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
    const error = await response.json();
    console.error('Anthropic API error:', error);
    throw new Error(`Anthropic API error: ${error.error?.message || 'Unknown error'}`);
  }
  
  const data = await response.json();
  return {
    provider: 'anthropic',
    model,
    content: data.content[0].text,
    usage: { input_tokens: data.usage?.input_tokens, output_tokens: data.usage?.output_tokens },
  };
}
