
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to format profession name for prompts and display
function formatProfessionName(profession: string): string {
  if (!profession) return '';
  
  // Replace underscores and other common separators with spaces
  const withSpaces = profession.replace(/[_-]/g, ' ');
  
  // Capitalize each word
  return withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profession } = await req.json();
    
    if (!profession) {
      throw new Error("Profession is required");
    }
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error("OpenAI API key is not configured");
    }
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log(`Generating content for profession: ${profession}`);
    
    // Format the profession name for display (with proper spacing and capitalization)
    const formattedProfession = formatProfessionName(profession);
    
    // Check if content already exists for this profession
    const { data: existingContent, error: fetchError } = await supabase
      .from('profession_content')
      .select('*')
      .eq('profession', profession.toLowerCase())
      .maybeSingle();
    
    if (fetchError) {
      console.error("Error checking existing content:", fetchError);
    }
    
    // If content exists, return it
    if (existingContent) {
      console.log("Found existing content for profession:", profession);
      return new Response(
        JSON.stringify(existingContent),
        { headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Generate content with OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert in creating personalized marketing content for medical aid services tailored to specific professions. Create compelling, professional, and accurate content that speaks directly to the individual professional using British English spelling and grammar. Remember, when referring to the profession in text, use the singular form (e.g., "architect" not "architect professionals") as they are already understood to be professionals.'
          },
          { 
            role: 'user', 
            content: `Create personalized marketing content for medical aid services targeted at ${formattedProfession}. Address the reader directly as "you" - an individual ${profession} seeking medical aid coverage. Include:
            1. A catchy title that directly mentions ${formattedProfession} (max 60 chars)
            2. A compelling subtitle that explains the value proposition specifically for a ${formattedProfession} (max 100 chars)
            3. A clear call-to-action that speaks directly to the ${formattedProfession} (max 50 chars)
            
            Format the response as a JSON object with title, subtitle, and cta fields. Keep the language professional but approachable, and ensure it addresses the reader as an individual professional.`
          }
        ],
        temperature: 0.7
      }),
    });

    const openAIData = await response.json();
    console.log("OpenAI response:", openAIData);
    
    if (!openAIData.choices || openAIData.choices.length === 0) {
      throw new Error("Failed to generate content with OpenAI");
    }
    
    // Parse the response content
    const contentText = openAIData.choices[0].message.content;
    let contentJson;
    
    try {
      // Extract JSON from the response (handles cases where GPT wraps JSON in markdown code blocks)
      const jsonMatch = contentText.match(/```json\n([\s\S]*)\n```/) || 
                        contentText.match(/```\n([\s\S]*)\n```/) || 
                        [null, contentText];
      
      const jsonText = jsonMatch[1] || contentText;
      contentJson = JSON.parse(jsonText);
    } catch (err) {
      console.error("Error parsing OpenAI response:", err);
      throw new Error("Failed to parse content from OpenAI response");
    }
    
    // Validate the content
    const validatedContent = {
      profession: profession.toLowerCase(),
      title: contentJson.title || `Medical Aid for ${formattedProfession}`,
      subtitle: contentJson.subtitle || `Specialised healthcare coverage designed for your unique needs as a ${formattedProfession}`,
      cta: contentJson.cta || `Explore Your ${formattedProfession} Healthcare Benefits`
    };
    
    console.log("Generated content:", validatedContent);
    
    // Store the content in the database
    const { data, error } = await supabase
      .from('profession_content')
      .insert([validatedContent])
      .select();
      
    if (error) {
      console.error("Error storing profession content:", error);
      throw new Error("Failed to store generated content");
    }
    
    return new Response(
      JSON.stringify(data[0]),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in generate-profession-content function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
