
export async function queryFlowise(question: string, history: Array<{role: string, content: string}> = []) {
  try {
    console.log("Sending query to AI:", question);
    console.log("With history:", history);
    
    // Get or create a persistent session ID
    const sessionId = getSessionId();
    
    // Convert our history format to match Flowise API expected format
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'userMessage' : 'apiMessage',
      content: msg.content
    }));
    
    const response = await fetch(
      "https://yazi.known.consulting/api/v1/prediction/29dee91c-3fde-4ac1-a028-123b42dd1800",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question,
          sessionId,
          history: formattedHistory  // Using the properly formatted history
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("AI response received:", result);
    
    // Create updated chat history with the current exchange
    const updatedHistory = [
      ...history,
      { role: "user", content: question },
      { role: "assistant", content: result.text || "" }
    ];
    
    return {
      ...result,
      chatHistory: updatedHistory
    };
  } catch (error) {
    console.error("Flowise API error:", error);
    throw error;
  }
}

// Helper function to extract potential JSON from AI responses
export function extractJsonFromResponse(text: string) {
  try {
    // Try to find JSON in code blocks
    const jsonMatch = text.match(/```json\n([\s\S]*)\n```/) || 
                     text.match(/```\n([\s\S]*)\n```/);
    
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // Try to parse the entire response as JSON
    return JSON.parse(text);
  } catch (error) {
    console.error("Error extracting JSON from response:", error);
    return null;
  }
}

// Function to get or create a session ID
export function getSessionId() {
  let sessionId = localStorage.getItem("flowise-session-id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("flowise-session-id", sessionId);
    console.log("Created new session ID:", sessionId);
  } else {
    console.log("Using existing session ID:", sessionId);
  }
  return sessionId;
}

// Function to reset the chat session
export function resetChatSession() {
  localStorage.removeItem("flowise-session-id");
  console.log("Chat session reset");
  return getSessionId(); // Generate and return a new session ID
}
