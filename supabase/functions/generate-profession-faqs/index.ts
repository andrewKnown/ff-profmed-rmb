
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Set up CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FAQ {
  question: string;
  answer: string;
}

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

// Function to pluralize profession names
function pluralizeProfession(profession: string): string {
  const formattedName = formatProfessionName(profession);
  
  // Special cases for irregular plurals
  if (formattedName.toLowerCase().endsWith('attorney')) {
    return formattedName.replace(/attorney$/i, 'attorneys');
  }
  if (formattedName.toLowerCase().endsWith('dentist')) {
    return formattedName.replace(/dentist$/i, 'dentists');
  }
  if (formattedName.toLowerCase().endsWith('doctor')) {
    return formattedName.replace(/doctor$/i, 'doctors');
  }
  if (formattedName.toLowerCase().endsWith('architect')) {
    return formattedName.replace(/architect$/i, 'architects');
  }
  if (formattedName.toLowerCase().endsWith('accountant')) {
    return formattedName.replace(/accountant$/i, 'accountants');
  }
  if (formattedName.toLowerCase().endsWith('engineer')) {
    return formattedName.replace(/engineer$/i, 'engineers');
  }
  if (formattedName.toLowerCase().endsWith('paramedic')) {
    return formattedName.replace(/paramedic$/i, 'paramedics');
  }
  
  // General cases - add 's' if it doesn't already end with 's'
  if (!formattedName.endsWith('s')) {
    return `${formattedName}s`;
  }
  
  return formattedName;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract profession from the request
    const { profession } = await req.json();
    
    if (!profession) {
      throw new Error("Profession is required");
    }

    console.log(`Processing FAQ request for profession: ${profession}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // First, check if we already have FAQs for this profession in the database
    const { data: existingFaqs, error: queryError } = await supabase
      .from("profession_faqs")
      .select("faqs")
      .eq("profession", profession.toLowerCase())
      .maybeSingle();

    // If we found existing FAQs and not forcing refresh, return them
    if (existingFaqs && !queryError) {
      console.log(`Found existing FAQs for ${profession}`);
      
      // Ensure proper validation of the existing FAQs
      const faqsData = existingFaqs.faqs;
      if (Array.isArray(faqsData) && 
          faqsData.every(item => 
            typeof item === 'object' && item !== null && 
            'question' in item && 'answer' in item)) {
        return new Response(JSON.stringify({ 
          faqs: faqsData,
          source: "database" 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        console.log(`Found FAQs for ${profession} but they were in an invalid format, regenerating...`);
        // Continue to generate new FAQs if the format is incorrect
      }
    }

    console.log(`No existing FAQs found for ${profession}, generating new ones`);

    // If no FAQs were found, generate new ones using OpenAI
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    // Format the profession with proper capitalization and pluralization
    const formattedProfession = formatProfessionName(profession);
    const pluralizedProfession = pluralizeProfession(profession);

    // Generate FAQs using OpenAI
    const prompt = `Generate 5 frequently asked questions and answers about medical aid coverage for ${pluralizedProfession} in South Africa. Refer to the profession in the singular form (e.g., "As a ${formattedProfession.toLowerCase()}..." not "As a ${formattedProfession.toLowerCase()} professional..."). Include questions about specific benefits, coverage tailored to their profession, and any special considerations. Format your response as a JSON array with 'question' and 'answer' properties. Use proper British English.`;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates content about medical aid plans for professionals in British English. When referring to professionals, use their title directly (e.g., 'architect', not 'architect professional')." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const openaiData = await openaiResponse.json();
    const aiResponse = openaiData.choices[0].message.content;
    
    console.log("OpenAI response received");
    
    // Extract the JSON array from the AI response
    const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from AI response");
    }
    
    let generatedFaqs: FAQ[] = [];
    try {
      generatedFaqs = JSON.parse(jsonMatch[0]);
      
      // Validate the structure of the generated FAQs
      if (!Array.isArray(generatedFaqs) || !generatedFaqs.every(faq => 
        typeof faq === 'object' && faq !== null && 'question' in faq && 'answer' in faq)) {
        throw new Error("Generated FAQs have incorrect format");
      }
    } catch (error) {
      console.error("Error parsing FAQs JSON:", error);
      throw new Error("Failed to parse generated FAQs");
    }

    // Store the FAQs in the database for future use
    const { error: insertError } = await supabase
      .from("profession_faqs")
      .upsert({
        profession: profession.toLowerCase(),
        faqs: generatedFaqs,
      }, { onConflict: "profession" });

    if (insertError) {
      console.log("Error storing FAQs:", insertError);
      // Continue even if storing fails, we'll still return the generated FAQs
    } else {
      console.log(`Successfully stored FAQs for ${pluralizedProfession}`);
    }

    // Return the generated FAQs
    return new Response(JSON.stringify({ 
      faqs: generatedFaqs,
      source: "generated" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in generate-profession-faqs function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
