
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { contentType, url, fileUrl, fileName } = await req.json();
    
    console.log(`Analyzing content. Type: ${contentType}`);
    
    let content = '';
    let insights = '';
    
    // Content extraction logic
    if (contentType === 'url' && url) {
      console.log(`Fetching URL: ${url}`);
      
      try {
        // Fetch URL content
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch URL: ${response.status}`);
        }
        
        // Get content type from response headers
        const contentTypeHeader = response.headers.get('content-type') || '';
        
        if (contentTypeHeader.includes('text/html')) {
          // For HTML pages, get text content
          content = await response.text();
          
          // Basic extraction of meaningful content (simplified)
          // In a production app, we would use a more sophisticated approach
          const titleMatch = content.match(/<title>(.*?)<\/title>/i);
          const metaDescMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
          
          let extractedContent = '';
          
          if (titleMatch && titleMatch[1]) {
            extractedContent += `Page Title: ${titleMatch[1]}\n\n`;
          }
          
          if (metaDescMatch && metaDescMatch[1]) {
            extractedContent += `Description: ${metaDescMatch[1]}\n\n`;
          }
          
          // Extract text from body (very simplified)
          const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
          if (bodyMatch && bodyMatch[1]) {
            // Remove HTML tags to get plain text (simplified)
            const bodyText = bodyMatch[1]
              .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
              .replace(/<[^>]*>/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
              
            // Take first 5000 characters to avoid processing too much
            extractedContent += `Page Content: ${bodyText.substring(0, 5000)}`;
          }
          
          content = extractedContent;
        } else {
          // For non-HTML content, use a simplified approach
          content = await response.text();
          // Limit content size
          content = content.substring(0, 10000);
        }
      } catch (error) {
        console.error("Error fetching URL:", error);
        throw new Error(`Failed to process URL: ${error.message}`);
      }
    } else if (contentType === 'file' && fileUrl) {
      console.log(`Processing file: ${fileName} from ${fileUrl}`);
      
      try {
        // Fetch file content from storage URL
        const response = await fetch(fileUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status}`);
        }
        
        // Get file content based on file type
        if (fileName.endsWith('.pdf')) {
          // For PDF, we would need a PDF parser
          // This is simplified for the example
          content = `[PDF content from: ${fileName}]`;
        } else if (fileName.endsWith('.docx')) {
          // For DOCX, we would need a DOCX parser
          // This is simplified for the example
          content = `[DOCX content from: ${fileName}]`;
        } else {
          // For text-based files, get the content directly
          content = await response.text();
          // Limit content size
          content = content.substring(0, 10000);
        }
      } catch (error) {
        console.error("Error processing file:", error);
        throw new Error(`Failed to process file: ${error.message}`);
      }
    } else {
      throw new Error("Invalid content type or missing required parameters");
    }
    
    // Generate insights
    if (content) {
      console.log("Content extracted, generating insights...");
      
      // In a real implementation, we would use a more sophisticated approach
      // Here we're using a simplified approach to generate insights
      
      // Identify potential features or aspects
      const features = [];
      
      // Check for user authentication mentions
      if (/login|register|sign[- ]?in|sign[- ]?up|auth|user|password/i.test(content)) {
        features.push("User authentication system");
      }
      
      // Check for e-commerce elements
      if (/shop|product|cart|checkout|payment|order|price|buy|purchas/i.test(content)) {
        features.push("E-commerce capabilities");
      }
      
      // Check for content management
      if (/cms|content|post|blog|article|edit|publish/i.test(content)) {
        features.push("Content management system");
      }
      
      // Check for analytics
      if (/analytics|track|stats|metric|report|dashboard/i.test(content)) {
        features.push("Analytics and reporting");
      }
      
      // Check for subscription/membership
      if (/subscri|member|premium|plan|pricing|tier/i.test(content)) {
        features.push("Subscription or membership system");
      }
      
      // Check for booking/appointment
      if (/book|appoint|schedul|calendar|reserv|avail/i.test(content)) {
        features.push("Booking or scheduling system");
      }
      
      // Generate insights text
      insights = `Based on the analyzed content, we identified the following potential features or aspects of your existing solution:\n\n`;
      
      if (features.length > 0) {
        insights += features.map(feature => `- ${feature}`).join("\n");
      } else {
        insights += "No specific features were detected. The solution generation will focus on your business description.";
      }
      
      // Add general insights
      insights += `\n\nThe analyzed content will be used to enhance the generated solution to better match your existing digital presence.`;
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        insights: insights,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in analyze-content function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
