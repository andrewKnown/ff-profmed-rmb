
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BenefitCategory } from "./PlanSelectionSection";

interface BenefitCategorySelectorProps {
  selectedCategory: BenefitCategory;
  onCategoryChange: (category: BenefitCategory) => void;
}

const BenefitCategorySelector = ({ 
  selectedCategory, 
  onCategoryChange 
}: BenefitCategorySelectorProps) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-3">Benefit Categories</h4>
      <Tabs 
        defaultValue="hospital" 
        value={selectedCategory}
        onValueChange={(value) => onCategoryChange(value as BenefitCategory)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-7 h-10">
          <TabsTrigger value="hospital">Hospital</TabsTrigger>
          <TabsTrigger value="chronic">Chronic</TabsTrigger>
          <TabsTrigger value="dayToDay">Day-to-day</TabsTrigger>
          <TabsTrigger value="maternity">Maternity</TabsTrigger>
          <TabsTrigger value="specialists">Specialists</TabsTrigger>
          <TabsTrigger value="optical">Optical</TabsTrigger>
          <TabsTrigger value="dental">Dental</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default BenefitCategorySelector;
