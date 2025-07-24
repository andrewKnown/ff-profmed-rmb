
export type ProfessionalTheme = 'default' | 'architects' | 'accountants' | 'pps' | 'attorneys' | 'doctors' | string;

// List of predefined themes
export const predefinedThemes = ['default', 'architects', 'accountants', 'pps', 'attorneys', 'doctors'];

// Default content mappings for predefined themes
export const defaultThemeContent = {
  default: {
    title: "Discover Professional Medical Aid Tailored to You",
    subtitle: "Chat with our AI Assistant to find out if you qualify in less than 2 minutes",
    cta: "Find the Right Medical Plan for You",
    headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
  },
  architects: {
    title: "Your Specialised Medical Aid as an Architect",
    subtitle: "Designed for your unique healthcare needs as an architectural professional",
    cta: "Discover Your Architect-Tailored Coverage",
    headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
  },
  accountants: {
    title: "Precision Healthcare for You as an Accountant",
    subtitle: "Medical coverage that adds up to better value for your accounting career",
    cta: "Calculate Your Optimal Healthcare Coverage",
    headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
  },
  pps: {
    title: "Your Exclusive Medical Benefits as a PPS Member",
    subtitle: "Enhanced coverage options exclusively for you as a Professional Provident Society member",
    cta: "Access Your Member-Exclusive Healthcare",
    headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
  },
  attorneys: {
    title: "Superior Medical Coverage for You as an Attorney",
    subtitle: "Healthcare plans that protect you as thoroughly as you protect your clients",
    cta: "Review Your Legal Professional Coverage",
    headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
  },
  doctors: {
    title: "Premium Healthcare Coverage for You as a Doctor",
    subtitle: "Healthcare plans designed by doctors, for you as a medical professional",
    cta: "Explore Your Medical Professional Benefits",
    headerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
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
