
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useThemeParam } from "@/hooks/useThemeParam";
import { formatProfessionName } from "@/components/ThemeSelector";
import { BenefitCategory } from "./benefits/PlanSelectionSection";
import PlanSelectionSection from "./benefits/PlanSelectionSection";
import BenefitCategorySelector from "./benefits/BenefitCategorySelector";
import BenefitsComparisonTable from "./benefits/BenefitsComparisonTable";
import CoverageLegend from "./benefits/CoverageLegend";
import { plans } from "./benefits/BenefitsData";

interface BenefitsComparisonToolProps {
  profession: string;
}

const BenefitsComparisonTool = ({ profession }: BenefitsComparisonToolProps) => {
  const [selectedCategory, setSelectedCategory] = useState<BenefitCategory>("hospital");
  const [selectedPlans, setSelectedPlans] = useState<string[]>(["proActive", "proSecure"]);
  const { theme, themeSource } = useThemeParam();
  
  // Effect to update the preselected plans based on profession
  useEffect(() => {
    // Ensure a consistent initial selection regardless of theme
    // but still provide relevant plans for specific professions
    let defaultSelection = ["proActive", "proSecure"];
    
    // Special handling for certain professions - kept consistent across templates
    if (theme === 'doctors' || theme === 'specialists' || theme === 'surgeons') {
      defaultSelection = ["proPinnacle", "proActive"];
    } else if (theme === 'attorneys' || theme === 'lawyers' || theme === 'legal') {
      defaultSelection = ["proSelect", "proActive"];
    } else if (theme === 'accountants' || theme === 'auditors' || theme === 'finance') {
      defaultSelection = ["proActive", "proSelect"];
    } else if (theme === 'architects' || theme === 'engineers') {
      defaultSelection = ["proActive", "proActiveplus"];
    }
    
    setSelectedPlans(defaultSelection);
  }, [theme]);
  
  // Filter plans to only show selected ones
  const filteredPlans = plans.filter(plan => 
    selectedPlans.includes(plan.name.toLowerCase().replace(/\s+/g, ''))
  );
  
  return (
    <Card className="mb-8 shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">
          Benefits Comparison Tool
          {theme !== 'default' && (
            <span className="text-primary ml-2">
              for {formatProfessionName(theme)} Professionals
            </span>
          )}
        </h3>
        <p className="mb-6 text-muted-foreground">
          Compare different plan options side-by-side to find the best coverage for your healthcare needs.
          {theme !== 'default' && themeSource === 'AI Customised' && (
            <span className="block mt-1 text-sm italic">
              Showing plans intelligently preselected for {formatProfessionName(theme)} professionals.
            </span>
          )}
        </p>
        
        <div className="space-y-6">
          {/* Plan Selection */}
          <PlanSelectionSection 
            plans={plans} 
            selectedPlans={selectedPlans} 
            onPlanSelectionChange={setSelectedPlans} 
          />
          
          {/* Benefit Category Selection */}
          <BenefitCategorySelector 
            selectedCategory={selectedCategory} 
            onCategoryChange={(category) => setSelectedCategory(category)} 
          />
          
          {/* Comparison Table */}
          <BenefitsComparisonTable 
            filteredPlans={filteredPlans} 
            selectedCategory={selectedCategory} 
          />
          
          {/* Legend */}
          <CoverageLegend />
          
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              For a personalised recommendation based on your specific healthcare needs, try our AI assistant.
            </p>
            <Button onClick={() => {
              const chatbotElement = document.querySelector('.chatbot-section');
              if (chatbotElement) {
                chatbotElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}>Chat with Our AI Assistant</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsComparisonTool;
