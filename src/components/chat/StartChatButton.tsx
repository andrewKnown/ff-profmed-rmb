import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
interface StartChatButtonProps {
  onClick: () => void;
  isLoading: boolean;
}
export const StartChatButton: React.FC<StartChatButtonProps> = ({
  onClick,
  isLoading
}) => {
  return <>
      
      <Button className="w-full py-6 text-lg bg-accent hover:bg-accent/90 text-white font-medium transition-colors flex items-center justify-center gap-2" onClick={onClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Start Your Membership Assessment"}
        {!isLoading && <MessageSquare className="h-5 w-5" />}
      </Button>
    </>;
};