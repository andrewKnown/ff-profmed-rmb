
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { queryFlowise, getSessionId } from "@/utils/flowiseApi";

interface ProfessionEligibilityProps {
  profession: string;
}

const ProfessionEligibility = ({ profession }: ProfessionEligibilityProps) => {
  const [inputProfession, setInputProfession] = useState(profession !== 'default' ? profession : '');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{eligible: boolean; message: string} | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);

  // Initialize with a session ID
  useEffect(() => {
    getSessionId();
  }, []);

  const checkEligibility = async () => {
    if (!inputProfession.trim()) return;
    
    setIsChecking(true);
    setResult(null);
    
    try {
      // Use the AI to determine eligibility
      const query = `Is a ${inputProfession} eligible for Profmed medical aid? Please respond with only yes or no followed by a brief one-sentence explanation.`;
      
      console.log("Checking eligibility with chat history:", chatHistory);
      
      // Pass current chat history to maintain context
      const response = await queryFlowise(query, chatHistory);
      
      // Parse the response
      const responseText = response?.text || '';
      const eligible = responseText.toLowerCase().includes('yes');
      
      // Update chat history with the new history from response
      if (response.chatHistory) {
        setChatHistory(response.chatHistory);
        console.log("Eligibility Checker - Updated chat history:", response.chatHistory);
      }
      
      setResult({
        eligible,
        message: responseText
      });
    } catch (error) {
      console.error("Error checking eligibility:", error);
      setResult({
        eligible: false,
        message: "Sorry, we couldn't process your request. Please try again later or contact us directly."
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card className="mb-8 shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Professional Qualification Checker</h3>
        <p className="mb-6 text-muted-foreground">
          Profmed medical aid is exclusively for graduate professionals. Enter your profession below to check if you qualify.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Input
            placeholder="Enter your profession (e.g., Doctor, Architect)"
            value={inputProfession}
            onChange={(e) => setInputProfession(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={checkEligibility} 
            disabled={isChecking || !inputProfession.trim()}
            className="whitespace-nowrap"
          >
            {isChecking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : "Check Eligibility"}
          </Button>
        </div>
        
        {result && (
          <div className={`p-4 rounded-lg ${result.eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-3">
              {result.eligible ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <h4 className={`font-semibold ${result.eligible ? 'text-green-700' : 'text-red-700'}`}>
                  {result.eligible ? 'You likely qualify!' : 'You may not qualify'}
                </h4>
                <p className="text-sm mt-1">{result.message}</p>
              </div>
            </div>
            
            {result.eligible && (
              <Button variant="outline" className="mt-4 w-full sm:w-auto">
                Proceed to Application
              </Button>
            )}
            
            {!result.eligible && (
              <div className="mt-4">
                <p className="text-sm mb-2">Don't worry! There might be exceptions or alternative options.</p>
                <Button variant="outline" className="w-full sm:w-auto">
                  Contact a Consultant
                </Button>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p>Profmed typically accepts professionals with at least a 3-year degree from a registered university. Some diplomas and professional designations may also qualify.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionEligibility;
