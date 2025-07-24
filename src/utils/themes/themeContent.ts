
import { supabase } from "@/integrations/supabase/client";
import { extractJsonFromResponse, queryFlowise } from '@/utils/flowiseApi';
import { ThemeContent } from './themeTypes';

// Generate fallback content when API calls fail
export const generateFallbackContent = (theme: string): ThemeContent => {
  // Format the profession name for display
  const professionName = theme.charAt(0).toUpperCase() + theme.slice(1);
  
  return {
    title: `Tailored Medical Aid for You as a ${professionName}`,
    subtitle: `Specialised healthcare options designed for your unique needs as a ${theme.toLowerCase()} professional`,
    cta: `Explore Your ${professionName} Healthcare Benefits`,
    // Use the default medical image instead of the logo
    headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
  };
};

// Function to check for existing theme content in database
export const fetchExistingThemeContent = async (theme: string): Promise<ThemeContent | null> => {
  try {
    const { data: existingContent, error } = await supabase
      .from('profession_content')
      .select('*')
      .eq('profession', theme.toLowerCase())
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching profession content:", error);
      return null;
    }
    
    if (existingContent) {
      console.log("Found existing content for profession:", theme);
      return {
        title: existingContent.title,
        subtitle: existingContent.subtitle,
        cta: existingContent.cta,
        // Use the default medical image instead of the logo
        headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error checking for existing content:", error);
    return null;
  }
};

// Function to generate content using edge function (now primary method)
export const generateContentWithEdgeFunction = async (theme: string): Promise<ThemeContent | null> => {
  try {
    console.log("Generating content with edge function for profession:", theme);
    const response = await supabase.functions.invoke('generate-profession-content', {
      body: { profession: theme },
    });
    
    if (response.error) {
      console.error("Error generating profession content with edge function:", response.error);
      return null;
    }
    
    const generatedContent = response.data;
    console.log("Successfully generated content with edge function:", generatedContent);
    return {
      title: generatedContent.title,
      subtitle: generatedContent.subtitle,
      cta: generatedContent.cta,
      // Use the default medical image instead of the logo
      headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
    };
  } catch (error) {
    console.error("Error in edge function:", error);
    return null;
  }
};

// Function to generate content using AI (now fallback method)
export const generateContentWithAI = async (theme: string): Promise<ThemeContent | null> => {
  try {
    console.log("Using Flowise as fallback for content generation");
    
    // Format the profession name for display
    const professionName = theme.charAt(0).toUpperCase() + theme.slice(1);
    
    const query = `Create personalized marketing content for medical aid services targeted at individual ${professionName} professionals. Address the reader directly as "you" - an individual ${theme} seeking medical aid coverage for themselves. Include:
      1. A catchy title that directly mentions ${professionName}s (max 60 chars)
      2. A compelling subtitle that explains the value proposition specifically for a ${professionName} (max 100 chars)
      3. A clear call-to-action that speaks directly to the ${professionName} (max 50 chars)
      Format the response as JSON with title, subtitle, and cta fields. Use proper British English.`;
    
    const aiResponse = await queryFlowise(query, []);
    
    if (aiResponse && aiResponse.text) {
      // Try to extract JSON from the response
      const contentJson = extractJsonFromResponse(aiResponse.text);
      
      if (contentJson && contentJson.title && contentJson.subtitle && contentJson.cta) {
        // Store the AI-generated content in the database
        const { data, error } = await supabase
          .from('profession_content')
          .insert([{
            profession: theme.toLowerCase(),
            title: contentJson.title,
            subtitle: contentJson.subtitle,
            cta: contentJson.cta
          }])
          .select();
          
        if (error) {
          console.error("Error storing profession content:", error);
        } else {
          console.log("Successfully stored AI-generated content:", data);
        }
        
        return {
          title: contentJson.title,
          subtitle: contentJson.subtitle,
          cta: contentJson.cta,
          // Use the default medical image instead of the logo
          headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
        };
      } else {
        console.error("Failed to extract valid JSON from AI response:", aiResponse.text);
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating content with AI:", error);
    return null;
  }
};
