
import { ProfessionalTheme } from './themeTypes';

// Function to apply theme CSS classes
export const applyThemeClasses = (theme: ProfessionalTheme, predefinedThemes: string[]): void => {
  console.log(`Applying theme classes for: ${theme}`);
  
  // Reset all theme classes first
  document.documentElement.classList.remove(
    'theme-architects', 
    'theme-accountants', 
    'theme-pps', 
    'theme-attorneys',
    'theme-doctors',
    'theme-custom'
  );
  
  if (theme) {
    // Apply theme class for known themes
    if (predefinedThemes.includes(theme)) {
      document.documentElement.classList.add(`theme-${theme}`);
      console.log(`Applied predefined theme class: theme-${theme}`);
    } else {
      // For custom themes, apply a generic professional theme
      document.documentElement.classList.add('theme-custom');
      console.log('Applied custom theme class: theme-custom');
    }
  }
};
