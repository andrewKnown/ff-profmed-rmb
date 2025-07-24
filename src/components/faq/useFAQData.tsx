
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  question: string;
  answer: string;
}

export const useFAQData = (profession: string) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("");
  const { toast } = useToast();

  const loadFAQs = async () => {
    if (profession === 'default') {
      setFaqs([
        {
          question: "What makes Profmed different from other medical schemes?",
          answer: "Profmed is exclusive to professionals with a 4-year degree or equivalent professional qualification. We focus on delivering tailored healthcare solutions specifically for educated professionals and their unique healthcare needs."
        },
        {
          question: "How do I determine which plan is right for me?",
          answer: "The best plan depends on your healthcare needs, budget, and preferences. Our AI assistant can help guide you through the selection process based on your specific requirements. You can also book a consultation with one of our advisors for personalised guidance."
        },
        {
          question: "Are there waiting periods for new members?",
          answer: "Yes, standard waiting periods may apply depending on your previous medical coverage. Generally, there's a 3-month general waiting period and a 12-month condition-specific waiting period for pre-existing conditions. These may be waived in certain circumstances."
        }
      ]);
      setIsLoading(false);
      setLoadingProgress(100);
      setLoadingStatus("");
      return;
    }

    setIsLoading(true);
    setLoadingProgress(10);
    setLoadingStatus("Loading information...");

    try {
      // First check if we already have FAQs cached in the database
      console.log(`Checking for existing FAQs for profession: ${profession}`);
      setLoadingProgress(25);
      
      const { data: existingFaqs, error: queryError } = await supabase
        .from("profession_faqs")
        .select("faqs")
        .eq("profession", profession.toLowerCase())
        .maybeSingle();
      
      // If we have cached FAQs, use them
      if (existingFaqs) {
        console.log(`Found existing FAQs for ${profession}:`, existingFaqs.faqs);
        setLoadingProgress(50);
        setLoadingStatus("Processing information...");
        
        // Properly type check and convert the JSON data to FAQ array
        if (Array.isArray(existingFaqs.faqs) && 
            existingFaqs.faqs.every(item => 
              typeof item === 'object' && item !== null && 
              'question' in item && 'answer' in item)) {
          // Use type assertion with unknown as intermediary
          setFaqs(existingFaqs.faqs as unknown as FAQ[]);
          setLoadingProgress(100);
          setLoadingStatus("");
          setIsLoading(false);
          return;
        } else {
          console.error("Retrieved FAQs are not in the expected format:", existingFaqs.faqs);
          setLoadingStatus("Processing information...");
          // Continue to generate new FAQs if the format is incorrect
        }
      }
      
      if (queryError && queryError.code !== 'PGRST116') {
        console.error("Error querying FAQs:", queryError);
      }

      // If no existing FAQs, call edge function to generate them
      console.log(`Generating new FAQs for profession: ${profession}`);
      setLoadingProgress(60);
      setLoadingStatus("Loading additional information...");
      
      const { data: response, error } = await supabase.functions.invoke(
        'generate-profession-faqs', 
        { 
          body: JSON.stringify({ 
            profession
          }) 
        }
      );
      
      if (error) {
        throw new Error(`Edge function error: ${error.message}`);
      }
      
      if (!response || !response.faqs) {
        throw new Error("Invalid response from FAQ generator");
      }

      setLoadingProgress(80);
      setLoadingStatus("Finalising information...");
      console.log(`Received FAQs for ${profession}:`, response);
      
      // Set the FAQs from the response with proper type checking
      if (Array.isArray(response.faqs) && 
          response.faqs.every(item => 
            typeof item === 'object' && item !== null && 
            'question' in item && 'answer' in item)) {
        setFaqs(response.faqs as unknown as FAQ[]);
      } else {
        throw new Error("Received FAQs are not in the expected format");
      }
      
      setLoadingProgress(100);
      
    } catch (error) {
      console.error("Error loading FAQs:", error);
      toast({
        title: "Error",
        description: "Could not load information. Please try again later.",
        variant: "destructive",
      });
      
      // Fallback FAQs for error cases
      setFaqs([
        {
          question: "What medical plans are recommended for professionals in my field?",
          answer: "Profmed offers several plans suitable for different professional needs. Chat with our AI assistant for personalised recommendations based on your specific requirements and healthcare needs."
        },
        {
          question: "Are there any profession-specific benefits I should know about?",
          answer: "Yes, Profmed designs coverage with professionals in mind. For specific benefits related to your profession, we recommend speaking with one of our consultants who can provide tailored information."
        }
      ]);
    } finally {
      setIsLoading(false);
      setLoadingStatus("");
    }
  };

  useEffect(() => {
    loadFAQs();
  }, [profession]);

  return {
    faqs,
    isLoading,
    loadingProgress,
    loadingStatus
  };
};
