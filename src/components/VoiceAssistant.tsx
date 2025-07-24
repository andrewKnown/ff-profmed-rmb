
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const VoiceAssistant = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Show a toast when the component mounts
    toast({
      title: "Voice Assistant Active",
      description: "You can now speak to our Profmed assistant",
      duration: 5000, // Changed from 3000 to 5000 milliseconds (5 seconds)
    });
  }, [toast]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ElevenLabs Convai Widget - directly embedded without additional UI */}
      <elevenlabs-convai agent-id="vkLXQIvPclVEUEYP5zhM"></elevenlabs-convai>
    </div>
  );
};

export default VoiceAssistant;
