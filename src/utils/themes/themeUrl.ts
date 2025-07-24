
import { ProfessionalTheme } from './themeTypes';

// Function to detect theme from URL and apply it (DISABLED - always returns default)
export const detectAndApplyTheme = (): ProfessionalTheme => {
  console.log("Theme URL detection disabled, always using default theme");
  return 'default';
};

// Update URL when theme changes without page reload (DISABLED)
export const updateThemeInURL = (theme: ProfessionalTheme): void => {
  console.log("URL update disabled, theme changes will not affect URL");
};
