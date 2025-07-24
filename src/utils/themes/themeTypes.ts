import youngProfessionalHero from "@/assets/young-professional-hero.jpg";

export type ProfessionalTheme = 'default' | 'architects' | 'accountants' | 'pps' | 'attorneys' | 'doctors' | string;

// List of predefined themes
export const predefinedThemes = ['default', 'architects', 'accountants', 'pps', 'attorneys', 'doctors'];

// Default content mappings for predefined themes
export const defaultThemeContent = {
  default: {
    title: "You dream it. We'll help you achieve it.",
    subtitle: "Profmed Medical Aid + RMB Credit Card: one decision, dual support for your next step.",
    cta: "Apply now",
    headerImage: youngProfessionalHero,
  },
  architects: {
    title: "Your Specialised Medical Aid as an Architect",
    subtitle: "Designed for your unique healthcare needs as an architectural professional",
    cta: "Discover Your Architect-Tailored Coverage",
    headerImage: youngProfessionalHero,
  },
  accountants: {
    title: "Precision Healthcare for You as an Accountant",
    subtitle: "Medical coverage that adds up to better value for your accounting career",
    cta: "Calculate Your Optimal Healthcare Coverage",
    headerImage: youngProfessionalHero,
  },
  pps: {
    title: "Your Exclusive Medical Benefits as a PPS Member",
    subtitle: "Enhanced coverage options exclusively for you as a Professional Provident Society member",
    cta: "Access Your Member-Exclusive Healthcare",
    headerImage: youngProfessionalHero,
  },
  attorneys: {
    title: "Superior Medical Coverage for You as an Attorney",
    subtitle: "Healthcare plans that protect you as thoroughly as you protect your clients",
    cta: "Review Your Legal Professional Coverage",
    headerImage: youngProfessionalHero,
  },
  doctors: {
    title: "Premium Healthcare Coverage for You as a Doctor",
    subtitle: "Healthcare plans designed by doctors, for you as a medical professional",
    cta: "Explore Your Medical Professional Benefits",
    headerImage: youngProfessionalHero,
  },
};

export interface ThemeContent {
  title: string;
  subtitle: string;
  cta: string;
  headerImage: string;
}

// Theme source definition for UI display
export type ThemeSourceType = 'Standard Template' | 'AI Customised' | 'Loading...';