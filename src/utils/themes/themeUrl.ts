
import { ProfessionalTheme } from './themeTypes';

// Function to detect theme from URL and apply it
export const detectAndApplyTheme = (): ProfessionalTheme => {
  const params = new URLSearchParams(window.location.search);
  // Check for both 'theme' and 'utm_theme' parameters
  const themeParam = params.get('theme')?.toLowerCase() as ProfessionalTheme;
  const utmThemeParam = params.get('utm_theme')?.toLowerCase() as ProfessionalTheme;
  
  const effectiveTheme = themeParam || utmThemeParam;
  
  if (effectiveTheme) {
    console.log(`Detected theme from URL: ${effectiveTheme} (from ${themeParam ? 'theme' : 'utm_theme'} parameter)`);
    return effectiveTheme;
  }
  
  console.log("No theme detected in URL, using default");
  return 'default';
};

// Update URL when theme changes without page reload
export const updateThemeInURL = (theme: ProfessionalTheme): void => {
  const url = new URL(window.location.href);
  
  if (theme === 'default') {
    url.searchParams.delete('theme');
    url.searchParams.delete('utm_theme');
    console.log("Removed theme parameters from URL");
  } else {
    url.searchParams.set('theme', theme);
    // Remove utm_theme if present to avoid confusion
    url.searchParams.delete('utm_theme');
    console.log(`Updated URL with theme parameter: ${theme}`);
  }
  
  window.history.replaceState({}, '', url.toString());
  console.log(`Current URL after update: ${url.toString()}`);
};
