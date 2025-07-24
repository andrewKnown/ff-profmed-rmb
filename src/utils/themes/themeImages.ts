
import { supabase } from "@/integrations/supabase/client";

// Function to fetch a theme-specific image from Unsplash through the edge function
export const fetchThemeImage = async (theme: string): Promise<string | null> => {
  try {
    console.log("Fetching theme-specific image for:", theme);
    
    if (!theme || theme === 'default') {
      console.log("No theme specified or using default, returning null");
      return null;
    }
    
    // Try to fetch from the edge function
    const response = await supabase.functions.invoke('generate-profession-image', {
      body: { profession: theme },
    });
    
    if (response.error) {
      console.error("Error generating profession image:", response.error);
      return null;
    }
    
    if (response.data && response.data.imageUrl) {
      console.log("Successfully fetched theme image:", response.data.imageUrl);
      console.log("Image source:", response.data.source || "unknown");
      
      // Ensure we're not returning the Profmed logo or any relative paths
      if (response.data.imageUrl.includes('ac603f38-2bca-4dd2-a8d2-360052790072') || 
          response.data.imageUrl.startsWith('/lovable-uploads/')) {
        console.log("Received logo or relative path as image, using default medical image instead");
        return 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3';
      }
      
      return response.data.imageUrl;
    }
    
    console.log("No image URL in response, returning null");
    return null;
  } catch (error) {
    console.error("Error fetching theme image:", error);
    return null;
  }
};
