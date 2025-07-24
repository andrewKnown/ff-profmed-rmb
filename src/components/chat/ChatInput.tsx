
import React from 'react';
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, inputRef }) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <form 
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const input = form.elements.namedItem('message') as HTMLInputElement;
          const message = input.value.trim();
          
          if (!message) return;
          
          onSendMessage(message);
          input.value = '';
        }}
      >
        <input
          ref={inputRef}
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-800"
          disabled={isLoading}
          autoFocus
          // Force the browser to focus this element
          onBlur={(e) => {
            // Only auto-refocus if the user isn't clicking on another interactive element
            if (!e.relatedTarget) {
              e.target.focus();
            }
          }}
        />
        <Button 
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Send
        </Button>
      </form>
    </div>
  );
};
