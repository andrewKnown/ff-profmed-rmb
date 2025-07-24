
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useThemeParam } from "@/hooks/useThemeParam";
import { formatProfessionName } from "@/components/ThemeSelector";

interface PlanSelectionProps {
  plans: PlanBenefits[];
  selectedPlans: string[];
  onPlanSelectionChange: (plans: string[]) => void;
}

export interface PlanBenefits {
  name: string;
  monthlyContribution: string;
  tier: "basic" | "standard" | "premium";
  benefits: {
    [key in BenefitCategory]: {
      covered: boolean | "partial";
      details: string;
    };
  };
  suitableFor: string[];
  recommendedFor?: string[];
}

export type BenefitCategory = "hospital" | "chronic" | "dayToDay" | "maternity" | "specialists" | "optical" | "dental";

// Get tier badge variant
export const getTierBadgeVariant = (tier: "basic" | "standard" | "premium") => {
  switch (tier) {
    case "basic": return "outline";
    case "standard": return "secondary";
    case "premium": return "default";
    default: return "outline";
  }
};

// Check if this plan is recommended for the current theme - made consistent across all themes
export const isPlanRecommendedForTheme = (plan: PlanBenefits, theme: string) => {
  if (!theme || theme === 'default' || !plan.recommendedFor) return false;
  
  // Standardised comparison logic to ensure consistency
  const normalizedTheme = theme.toLowerCase().trim();
  return plan.recommendedFor.some(profession => 
    normalizedTheme.includes(profession.toLowerCase()) || 
    profession.toLowerCase().includes(normalizedTheme)
  );
};

const PlanSelectionSection = ({ plans, selectedPlans, onPlanSelectionChange }: PlanSelectionProps) => {
  const { theme } = useThemeParam();
  
  // Toggle plan selection
  const togglePlanSelection = (planName: string) => {
    const normalizedName = planName.toLowerCase().replace(/\s+/g, '');
    
    if (selectedPlans.includes(normalizedName)) {
      // Don't remove if it's the last selected plan
      if (selectedPlans.length > 1) {
        onPlanSelectionChange(selectedPlans.filter(name => name !== normalizedName));
      }
    } else {
      // Allow selecting up to 3 plans
      if (selectedPlans.length < 3) {
        onPlanSelectionChange([...selectedPlans, normalizedName]);
      }
    }
  };
  
  // Quick select for direct comparison (exactly 2 plans) - ensuring consistency
  const selectTwoPlans = (plan1: string, plan2: string) => {
    onPlanSelectionChange([
      plan1.toLowerCase().replace(/\s+/g, ''),
      plan2.toLowerCase().replace(/\s+/g, '')
    ]);
  };
  
  // Function to get badge label for plan
  const getPlanBadgeLabel = (planName: string) => {
    if (planName.includes("Plus")) return "Plus";
    if (planName.includes("Savvy")) return "Savvy";
    return "";
  };
  
  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-3">Select Plans to Compare</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {plans.map((plan) => {
          const normalizedName = plan.name.toLowerCase().replace(/\s+/g, '');
          const isSelected = selectedPlans.includes(normalizedName);
          const badgeLabel = getPlanBadgeLabel(plan.name);
          
          return (
            <Button
              key={plan.name}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => togglePlanSelection(plan.name)}
              className="justify-center"
              disabled={!isSelected && selectedPlans.length >= 3}
            >
              {plan.name.replace(" Plus", "").replace(" Savvy", "")}
              {badgeLabel && (
                <Badge variant={getTierBadgeVariant(plan.tier)} className="ml-2 hidden sm:inline-flex">
                  {badgeLabel}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
      
      {selectedPlans.length !== 2 && (
        <div className="mt-3 p-3 bg-slate-50 rounded-md">
          <p className="text-sm font-medium mb-2">Quick comparisons:</p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => selectTwoPlans('ProActive', 'ProActive Plus')}
              className="bg-white"
            >
              Compare ProActive vs ProActive Plus
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => selectTwoPlans('ProPinnacle', 'ProPinnacle Savvy')}
              className="bg-white"
            >
              Compare ProPinnacle vs ProPinnacle Savvy
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => selectTwoPlans('ProSecure', 'ProSecure Plus')}
              className="bg-white"
            >
              Compare ProSecure vs ProSecure Plus
            </Button>
          </div>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground mt-2">
        {selectedPlans.length === 2 
          ? "Perfect for a direct comparison!" 
          : `Select up to 3 plans to compare (${selectedPlans.length}/3 selected)`}
      </p>
    </div>
  );
};

export default PlanSelectionSection;
