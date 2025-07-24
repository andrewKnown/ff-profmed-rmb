
/// <reference types="vite/client" />

// Define custom ElevenLabs Convai Widget element for TypeScript
declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      'agent-id'?: string;
    }, HTMLElement>;
  }
}
