
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, HelpCircle, ArrowLeftRight } from "lucide-react";
import { useThemeParam } from "@/hooks/useThemeParam";
import { BenefitCategory, PlanBenefits, getTierBadgeVariant, isPlanRecommendedForTheme } from "./PlanSelectionSection";

interface BenefitsComparisonTableProps {
  filteredPlans: PlanBenefits[];
  selectedCategory: BenefitCategory;
}

// Render coverage indicator based on coverage type
const renderCoverageIndicator = (coverage: boolean | "partial") => {
  if (coverage === true) {
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  } else if (coverage === "partial") {
    return <HelpCircle className="h-5 w-5 text-amber-500" />;
  } else {
    return <XCircle className="h-5 w-5 text-red-500" />;
  }
};

const BenefitsComparisonTable = ({ filteredPlans, selectedCategory }: BenefitsComparisonTableProps) => {
  const { theme } = useThemeParam();
  
  // Special layout for exactly 2 plans (side-by-side comparison)
  const isTwoPlansComparison = filteredPlans.length === 2;
  
  return (
    <div className="overflow-x-auto border rounded-md">
      {isTwoPlansComparison ? (
        <div className="relative">
          <div className="flex justify-center items-center py-3 bg-slate-50">
            <Badge variant="outline" className="bg-slate-100 px-3 py-1 text-sm flex items-center gap-1">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Direct Comparison</span>
            </Badge>
          </div>
          
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-1/3">Benefit</TableHead>
                <TableHead className="w-1/3 text-center">{filteredPlans[0].name}</TableHead>
                <TableHead className="w-1/3 text-center">{filteredPlans[1].name}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Monthly Cost</TableCell>
                <TableCell className="text-center font-semibold">{filteredPlans[0].monthlyContribution}</TableCell>
                <TableCell className="text-center font-semibold">{filteredPlans[1].monthlyContribution}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Coverage</TableCell>
                <TableCell className="text-center">
                  {renderCoverageIndicator(filteredPlans[0].benefits[selectedCategory].covered)}
                </TableCell>
                <TableCell className="text-center">
                  {renderCoverageIndicator(filteredPlans[1].benefits[selectedCategory].covered)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Details</TableCell>
                <TableCell>{filteredPlans[0].benefits[selectedCategory].details}</TableCell>
                <TableCell>{filteredPlans[1].benefits[selectedCategory].details}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Suitable For</TableCell>
                <TableCell>{filteredPlans[0].suitableFor.join(", ")}</TableCell>
                <TableCell>{filteredPlans[1].suitableFor.join(", ")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[180px]">Plan</TableHead>
              <TableHead>Monthly Cost</TableHead>
              <TableHead>Coverage</TableHead>
              <TableHead className="w-[350px]">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlans.map((plan) => {
              // Use a subtle highlight that's consistent across themes
              const isRecommended = isPlanRecommendedForTheme(plan, theme);
              
              return (
                <TableRow key={plan.name} className={isRecommended ? "bg-secondary/10" : ""}>
                  <TableCell className="font-medium">
                    <div>
                      {plan.name}
                      <Badge variant={getTierBadgeVariant(plan.tier)} className="ml-2">
                        {plan.tier.charAt(0).toUpperCase() + plan.tier.slice(1)}
                      </Badge>
                      {isRecommended && (
                        <Badge variant="secondary" className="ml-1">Recommended</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {plan.suitableFor.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{plan.monthlyContribution}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {renderCoverageIndicator(plan.benefits[selectedCategory].covered)}
                    </div>
                  </TableCell>
                  <TableCell>{plan.benefits[selectedCategory].details}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BenefitsComparisonTable;
