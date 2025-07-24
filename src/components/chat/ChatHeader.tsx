
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, RefreshCw } from "lucide-react";

interface ChatHeaderProps {
  onReset: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onReset }) => {
  return (
    <div className="p-4 bg-primary text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        <h3 className="font-semibold">Profmed Assistant</h3>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-white hover:bg-primary-dark"
        onClick={onReset}
        title="Reset Chat"
      >
        <RefreshCw className="w-4 h-4" />
        <span className="sr-only">Reset Chat</span>
      </Button>
    </div>
  );
};
