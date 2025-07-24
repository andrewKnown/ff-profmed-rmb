
import { useState, useEffect } from 'react';
import { 
  ProfessionalTheme, 
  predefinedThemes, 
  defaultThemeContent,
  ThemeContent,
  ThemeSourceType
} from '@/utils/themes/themeTypes';
import { 
  applyThemeClasses, 
  fetchExistingThemeContent,
  generateContentWithAI,
  generateContentWithEdgeFunction,
  generateFallbackContent,
  detectAndApplyTheme,
  updateThemeInURL,
  fetchThemeImage
} from '@/utils/themes/themeUtils';
import { useToast } from "@/hooks/use-toast";

export const useThemeParam = () => {
  const [theme, setTheme] = useState<ProfessionalTheme>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [themeSource, setThemeSource] = useState<ThemeSourceType>('Loading...');
  const { toast } = useToast();
  
  // Function to load theme from URL (DISABLED - always loads default)
  const loadThemeFromURL = () => {
    // Always use default theme
    const detectedTheme = 'default';
    setTheme(detectedTheme);
    
    // Apply theme classes (though this won't do much for default)
    applyThemeClasses(detectedTheme, predefinedThemes);
    
    // Always use standard template for default theme
    setThemeSource('Standard Template');
    
    setIsLoading(false);
    
    console.log("Theme system disabled, using default theme only");
  };
  
  useEffect(() => {
    // Initial load only - no URL listening
    loadThemeFromURL();
  }, []);
  
  // Function to change the theme programmatically (DISABLED)
  const changeTheme = (newTheme: ProfessionalTheme) => {
    console.log(`Theme changing disabled, ignoring request to change to: ${newTheme}`);
    // Do nothing - theme changes are disabled
  };
  
  return { 
    theme, 
    isLoading, 
    changeTheme,
    themeSource
  };
};

// Function to fetch or generate theme-specific content
export const getThemeContent = async (theme: ProfessionalTheme): Promise<ThemeContent> => {
  console.log(`Getting content for theme: ${theme}`);
  
  // Default content structure
  if (theme === 'default' || theme in defaultThemeContent) {
    console.log(`Using predefined content for theme: ${theme}`);
    
    // For predefined themes, get the default content first
    const baseContent = defaultThemeContent[theme as keyof typeof defaultThemeContent] || defaultThemeContent.default;
    
    // If it's not the default theme, try to get a specific image
    if (theme !== 'default') {
      const themeImage = await fetchThemeImage(theme);
      if (themeImage && !themeImage.includes('ac603f38-2bca-4dd2-a8d2-360052790072')) {
        console.log(`Using custom image for predefined theme: ${theme}`);
        return {
          ...baseContent,
          headerImage: themeImage
        };
      }
    }
    
    return baseContent;
  }
  
  try {
    // Check if we already have content for this profession in the database
    const existingContent = await fetchExistingThemeContent(theme);
    if (existingContent) {
      console.log(`Using existing content for theme: ${theme}`);
      // Try to fetch a theme-specific image
      const themeImage = await fetchThemeImage(theme);
      if (themeImage && !themeImage.includes('ac603f38-2bca-4dd2-a8d2-360052790072')) {
        existingContent.headerImage = themeImage;
      } else {
        // Use a default medical image
        existingContent.headerImage = 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3';
      }
      return existingContent;
    }
    
    // If not found, first try to generate content using the edge function
    console.log("No existing content found, trying edge function first");
    const edgeFunctionContent = await generateContentWithEdgeFunction(theme);
    if (edgeFunctionContent) {
      console.log(`Generated content using edge function for: ${theme}`);
      // Try to fetch a theme-specific image
      const themeImage = await fetchThemeImage(theme);
      if (themeImage && !themeImage.includes('ac603f38-2bca-4dd2-a8d2-360052790072')) {
        edgeFunctionContent.headerImage = themeImage;
      } else {
        // Use a default medical image
        edgeFunctionContent.headerImage = 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3';
      }
      return edgeFunctionContent;
    }
    
    // If edge function fails, try Flowise AI as fallback
    console.log("Edge function failed, trying Flowise AI as fallback");
    const aiGeneratedContent = await generateContentWithAI(theme);
    if (aiGeneratedContent) {
      console.log(`Generated content using Flowise AI for: ${theme}`);
      // Try to fetch a theme-specific image
      const themeImage = await fetchThemeImage(theme);
      if (themeImage && !themeImage.includes('ac603f38-2bca-4dd2-a8d2-360052790072')) {
        aiGeneratedContent.headerImage = themeImage;
      } else {
        // Use a default medical image
        aiGeneratedContent.headerImage = 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3';
      }
      return aiGeneratedContent;
    }
    
    // If all else fails, generate fallback content
    console.log("All content generation methods failed, using fallback content");
    const fallbackContent = generateFallbackContent(theme);
    
    // Try to fetch a theme-specific image for the fallback content
    const themeImage = await fetchThemeImage(theme);
    if (themeImage && !themeImage.includes('ac603f38-2bca-4dd2-a8d2-360052790072')) {
      fallbackContent.headerImage = themeImage;
    }
    
    return fallbackContent;
  } catch (error) {
    console.error("Error in getThemeContent:", error);
    const fallbackContent = generateFallbackContent(theme);
    return fallbackContent;
  }
};
