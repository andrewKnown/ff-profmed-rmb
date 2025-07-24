
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, ArrowRight } from "lucide-react";
import { queryFlowise, getSessionId } from "@/utils/flowiseApi";

interface PremiumCalculatorProps {
  profession: string;
}

const PremiumCalculator = ({ profession }: PremiumCalculatorProps) => {
  const [age, setAge] = useState<number>(30);
  const [selectedProfession, setSelectedProfession] = useState<string>(profession !== 'default' ? profession : '');
  const [dependants, setDependants] = useState<number>(0);
  const [planType, setPlanType] = useState<string>("proactive");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [result, setResult] = useState<{amount: string; description: string} | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);

  // Initialize with a session ID
  useEffect(() => {
    getSessionId();
  }, []);

  const handleCalculate = async () => {
    setIsCalculating(true);
    setResult(null);
    
    try {
      // Build a query for the AI to estimate the premium
      const query = `Estimate a monthly premium for Profmed medical aid with these details: 
      - Profession: ${selectedProfession}
      - Age: ${age}
      - Number of dependants: ${dependants}
      - Plan type: ${planType}
      
      Please respond with just an estimated monthly premium amount (in Pounds) and a brief explanation.`;
      
      // Pass the current chat history to maintain context
      console.log("Premium calculator - Sending with history:", chatHistory);
      const response = await queryFlowise(query, chatHistory);
      
      // Extract price from response
      const responseText = response?.text || '';
      let priceMatch = responseText.match(/£\s*([0-9,]+)/);
      if (!priceMatch) {
        priceMatch = responseText.match(/(\£|\$|R)\s*([0-9,]+)/);
      }
      let price = priceMatch ? priceMatch[0] : "£250 - £450";
      
      // Update chat history with the complete history from response
      if (response.chatHistory) {
        setChatHistory(response.chatHistory);
        console.log("Premium Calculator - Updated chat history:", response.chatHistory);
      }
      
      setResult({
        amount: price,
        description: responseText
      });
    } catch (error) {
      console.error("Error calculating premium:", error);
      setResult({
        amount: "Unavailable",
        description: "Sorry, we couldn't calculate your premium at this time. Please try again later or contact us directly for a quote."
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="mb-8 shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Premium Calculator</h3>
        <p className="mb-6 text-muted-foreground">
          Get an estimate of your monthly premium based on your age, profession, and chosen plan.
        </p>
        
        <div className="space-y-6">
          {/* Profession Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Your Profession</label>
            <Input
              placeholder="Enter your profession"
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
            />
          </div>
          
          {/* Age Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium">Your Age: {age}</label>
            </div>
            <Slider
              value={[age]}
              min={18}
              max={75}
              step={1}
              onValueChange={(values) => setAge(values[0])}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>18</span>
              <span>75</span>
            </div>
          </div>
          
          {/* Dependants Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium">Number of Dependants: {dependants}</label>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => dependants > 0 && setDependants(dependants - 1)}
              >
                -
              </Button>
              <Input 
                type="number" 
                value={dependants} 
                onChange={(e) => setDependants(parseInt(e.target.value) || 0)} 
                className="text-center" 
                min={0}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDependants(dependants + 1)}
              >
                +
              </Button>
            </div>
          </div>
          
          {/* Plan Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Plan Type</label>
            <Select value={planType} onValueChange={setPlanType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proactive">ProActive</SelectItem>
                <SelectItem value="propinnacle">ProPinnacle</SelectItem>
                <SelectItem value="prosecure">ProSecure</SelectItem>
                <SelectItem value="proselect">ProSelect</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full"
            disabled={isCalculating || !selectedProfession}
          >
            {isCalculating ? (
              <span className="flex items-center">Calculating... <ArrowRight className="ml-2 h-4 w-4" /></span>
            ) : (
              <span className="flex items-center">Calculate Premium <Calculator className="ml-2 h-4 w-4" /></span>
            )}
          </Button>
          
          {/* Results */}
          {result && (
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Estimated Monthly Premium</p>
                <h4 className="text-3xl font-bold text-primary">{result.amount}</h4>
              </div>
              <p className="text-sm">{result.description}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <p>This is only an estimate. Final premiums may vary based on additional factors and underwriting.</p>
              </div>
              <Button variant="default" className="mt-4 w-full">Request Detailed Quote</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumCalculator;
