
// Constants for analytics timing
export const CHAT_COMPLETE_TIMEOUT = 5 * 1000; // 5 seconds for preventing multiple completions
export const CHAT_INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes inactivity timeout
export const BOT_MESSAGE_THROTTLE_TIME = 10 * 1000; // Throttle bot messages every 10 seconds
export const INELIGIBILITY_THROTTLE_TIME = 1 * 1000; // Throttle ineligibility events every 1 second

// Declare global window interface with dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// State variables for throttling
let lastBotMessageTime = Date.now();
let lastIneligibilityEventTime = Date.now();

/**
 * Push events to the Google Tag Manager dataLayer
 * @param eventName The name of the event
 * @param additionalParams Additional parameters to include with the event
 */
export const pushEventToDataLayer = (eventName: string, additionalParams: Record<string, any> = {}) => {
  const eventPayload = {
    event: eventName,
    pageTitle: document.title, // Dynamically include the page title
    ...additionalParams, // Add event-specific parameters
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
  console.log(`Analytics event pushed: ${eventName}`, eventPayload);
};

/**
 * Track chat start event
 */
export const trackChatStarted = () => {
  pushEventToDataLayer('chatStarted');
};

/**
 * Track user message sent
 * @param message The message content
 */
export const trackUserMessageSent = (message: string) => {
  pushEventToDataLayer('userMessageSent', {
    messageText: message,
  });
};

/**
 * Track bot message with throttling
 * @param message The message content
 * @param isFirstMessage Whether this is the first message in the conversation
 */
export const trackBotMessage = (message: string, isFirstMessage: boolean = false) => {
  const currentTime = Date.now();
  if (isFirstMessage || currentTime - lastBotMessageTime > BOT_MESSAGE_THROTTLE_TIME) {
    pushEventToDataLayer('botMessage', {
      messageText: message,
      messageType: 'apiMessage',
    });
    lastBotMessageTime = currentTime;
  }
};

/**
 * Track chat completion
 * @param message The message that triggered completion
 */
export const trackChatCompleted = (message: string) => {
  const lastCompletionTime = localStorage.getItem('lastChatCompletedTime');
  const currentTime = new Date().getTime();
  
  if (!lastCompletionTime || (currentTime - parseInt(lastCompletionTime)) > CHAT_COMPLETE_TIMEOUT) {
    pushEventToDataLayer('chatCompleted');
    localStorage.setItem('lastChatCompletedTime', currentTime.toString());
  }
};

/**
 * Track ineligibility message with throttling
 * @param message The ineligibility message
 */
export const trackIneligibilityDetected = (message: string) => {
  const currentTime = Date.now();
  if (currentTime - lastIneligibilityEventTime > INELIGIBILITY_THROTTLE_TIME) {
    pushEventToDataLayer('ineligibilityDetected', {
      messageText: message,
    });
    lastIneligibilityEventTime = currentTime;
  }
};

/**
 * Track bot loading state
 * @param isLoading Whether the bot is currently loading
 */
export const trackBotLoading = (isLoading: boolean) => {
  pushEventToDataLayer('botLoading', {
    isLoading,
  });
};

/**
 * Check message content and trigger appropriate tracking events
 * @param message The message to analyze
 * @param isFirstMessage Whether this is the first message in the conversation
 */
export const analyzeAndTrackMessage = (message: string, isFirstMessage: boolean = false) => {
  // Track bot message
  trackBotMessage(message, isFirstMessage);
  
  // Track completion message
  if (message.includes('Your details have been sent successfully')) {
    trackChatCompleted(message);
  }
  
  // Track ineligibility message
  if (message.includes('Unfortunately, you are currently ineligible for membership')) {
    trackIneligibilityDetected(message);
  }
};
