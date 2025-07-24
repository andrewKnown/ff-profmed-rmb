
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { queryFlowise, resetChatSession } from "@/utils/flowiseApi";
import { 
  trackChatStarted,
  trackUserMessageSent,
  analyzeAndTrackMessage,
  trackBotLoading
} from "@/utils/analytics";
import { ChatWindow } from "./chat/ChatWindow";
import { ChatInput } from "./chat/ChatInput";
import { StartChatButton } from "./chat/StartChatButton";
import { ChatHeader } from "./chat/ChatHeader";
import { useChat } from "@/hooks/useChat";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const lastInteractionRef = useRef<number>(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    messages, 
    chatHistory,
    isLoading, 
    setMessages,
    setChatHistory,
    setIsLoading 
  } = useChat();

  // Focus on input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Multiple attempts to focus the input
      const attemptFocus = () => {
        if (inputRef.current) {
          inputRef.current.focus();
          console.log("Focus attempt made");
        }
      };
      
      // Try immediately
      attemptFocus();
      
      // Try after a short delay
      setTimeout(attemptFocus, 100);
      
      // Try after DOM has definitely updated
      setTimeout(attemptFocus, 300);
    }
  }, [isOpen]);

  const handleStartChat = async () => {
    setIsOpen(true);
    setIsLoading(true);
    
    // Track chat started
    trackChatStarted();
    trackBotLoading(true);
    
    try {
      // Start with an empty history array
      const response = await queryFlowise("Start membership assessment", []);
      if (response?.text) {
        setMessages([{
          role: 'assistant',
          content: response.text
        }]);
        
        // Save the chat history
        if (response.chatHistory) {
          setChatHistory(response.chatHistory);
          console.log("Membership assessment started - Chat history updated:", response.chatHistory);
        }
        
        // Track first bot message
        analyzeAndTrackMessage(response.text, true);
      }
    } catch (error) {
      toast({
        title: "Connection Issue",
        description: "Unable to connect to our membership assessment assistant. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      trackBotLoading(false);
      lastInteractionRef.current = Date.now();
      
      // Additional attempt to focus after loading completes
      if (inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  const handleResetChat = () => {
    // Reset the session ID
    resetChatSession();
    
    // Clear the UI chat history
    setMessages([]);
    setChatHistory([]);
    
    // Restart the chat
    handleStartChat();
    
    toast({
      title: "Assessment Reset",
      description: "Your membership assessment has been reset with a new session.",
    });
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Update messages and clear input
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Track user message
    trackUserMessageSent(message);
    lastInteractionRef.current = Date.now();
    
    // Track loading state
    setIsLoading(true);
    trackBotLoading(true);
    
    try {
      // Pass the current chat history to maintain context
      console.log("Sending message with chat history:", chatHistory);
      const response = await queryFlowise(message, chatHistory);
      if (response?.text) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.text
        }]);
        
        // Update chat history
        if (response.chatHistory) {
          setChatHistory(response.chatHistory);
          console.log("Message sent - Chat history updated:", response.chatHistory);
        }
        
        // Track bot response and analyse for special messages
        analyzeAndTrackMessage(response.text);
        lastInteractionRef.current = Date.now();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      trackBotLoading(false);
      
      // Multiple attempts to refocus after sending message
      const refocusInput = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
      
      // Try immediately and with delays
      refocusInput();
      setTimeout(refocusInput, 100);
    }
  };

  if (!isOpen) {
    return <StartChatButton onClick={handleStartChat} isLoading={isLoading} />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <ChatHeader onReset={handleResetChat} />
      <ChatWindow messages={messages} isLoading={isLoading} />
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
        inputRef={inputRef}
      />
    </div>
  );
};

export default ChatBot;
