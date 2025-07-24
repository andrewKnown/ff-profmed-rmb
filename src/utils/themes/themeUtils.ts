
// Main themeUtils file that re-exports all functionality from the separate modules

// Import functionality from individual modules
import { applyThemeClasses } from './themeClasses';
import { fetchThemeImage } from './themeImages';
import { 
  generateFallbackContent,
  fetchExistingThemeContent,
  generateContentWithEdgeFunction,
  generateContentWithAI
} from './themeContent';
import {
  detectAndApplyTheme,
  updateThemeInURL
} from './themeUrl';

// Re-export everything to maintain the same API
export {
  applyThemeClasses,
  fetchThemeImage,
  generateFallbackContent,
  fetchExistingThemeContent,
  generateContentWithEdgeFunction,
  generateContentWithAI,
  detectAndApplyTheme,
  updateThemeInURL
};
