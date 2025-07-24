
import { useState, useEffect } from 'react';
import { getSessionId } from '@/utils/flowiseApi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);

  // Initialize chat session on component mount
  useEffect(() => {
    // Ensure we have a valid session ID
    getSessionId();
    
    // We could potentially retrieve previous messages from localStorage here
    // if we wanted to persist conversations between page refreshes
  }, []);

  return {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    chatHistory,
    setChatHistory
  };
};
