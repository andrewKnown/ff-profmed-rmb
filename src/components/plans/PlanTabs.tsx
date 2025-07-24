import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanTabContent from "./PlanTabContent";
const PlanTabs = () => {
  const planData = {
    proactive: {
      title: "ProActive",
      badge: "Popular",
      benefits: ["Comprehensive hospital cover", "Day-to-day benefits with savings", "Cover for 48 chronic conditions"],
      description: "Young professionals seeking balanced coverage at a reasonable premium. Perfect for those starting their career who need both hospital and day-to-day coverage.",
      monthlyPremium: "From R2,600"
    },
    proactiveplus: {
      title: "ProActive Plus",
      badge: "Enhanced Benefits",
      benefits: ["Comprehensive hospital cover", "Enhanced savings and Above Threshold Benefits", "Additional specialist coverage"],
      description: "Established professionals seeking better day-to-day coverage with comprehensive hospital benefits. Ideal for growing families.",
      monthlyPremium: "From R3,100"
    },
    propinnacle: {
      title: "ProPinnacle",
      badge: "Premium Coverage",
      benefits: ["Unlimited hospital cover at any hospital", "Comprehensive day-to-day benefits", "Coverage for 67 chronic conditions"],
      description: "Established professionals seeking premium healthcare with no compromises. Perfect for senior executives, specialists and consultants who require comprehensive coverage.",
      monthlyPremium: "From R5,850"
    },
    propinnaclesavvy: {
      title: "ProPinnacle Savvy",
      badge: "Network Option",
      benefits: ["Unlimited hospital cover within network", "Comprehensive day-to-day benefits", "Coverage for 67 chronic conditions"],
      description: "Professionals seeking premium benefits at a lower cost through network providers. Ideal for those who don't mind using specific network providers.",
      monthlyPremium: "From R5,250"
    },
    prosecure: {
      title: "ProSecure",
      badge: "Cost Effective",
      benefits: ["Private hospital cover up to annual limit", "Basic chronic benefit coverage", "No day-to-day benefits"],
      description: "Budget-conscious professionals who primarily need hospital cover. Good for young, healthy professionals with minimal healthcare needs.",
      monthlyPremium: "From R1,780"
    },
    prosecureplus: {
      title: "ProSecure Plus",
      badge: "Affordable",
      benefits: ["Private hospital cover up to annual limit", "Basic chronic benefit coverage", "Day-to-day savings account"],
      description: "Budget-conscious professionals who need some day-to-day benefits along with hospital cover. Suitable for young professionals or small families.",
      monthlyPremium: "From R2,100"
    },
    proselect: {
      title: "ProSelect",
      badge: "Flexible",
      benefits: ["Comprehensive hospital cover", "Day-to-day savings account", "Coverage for 35 chronic conditions"],
      description: "Professionals who want flexibility with their healthcare plan. Perfect for those with specific healthcare needs or who want to optimise their coverage.",
      monthlyPremium: "From R2,250"
    },
    proselectplus: {
      title: "ProSelect Plus",
      badge: "Enhanced Flexibility",
      benefits: ["Enhanced hospital cover", "Enhanced savings with Above Threshold Benefits", "Coverage for 35 chronic conditions"],
      description: "Professionals who want enhanced flexibility and more comprehensive coverage. Ideal for established professionals with specific healthcare requirements.",
      monthlyPremium: "From R2,800"
    }
  };
  return <div className="mb-12">
      <h3 className="text-2xl font-bold text-center mb-6">Explore Benefit Options</h3>
      <Tabs defaultValue="proactive" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="proactive">ProActive</TabsTrigger>
          <TabsTrigger value="propinnacle">ProPinnacle</TabsTrigger>
          <TabsTrigger value="prosecure">ProSecure</TabsTrigger>
          <TabsTrigger value="proselect">ProSelect</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proactive" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlanTabContent {...planData.proactive} />
            <PlanTabContent {...planData.proactiveplus} />
          </div>
        </TabsContent>
        
        <TabsContent value="propinnacle" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlanTabContent {...planData.propinnacle} />
            <PlanTabContent {...planData.propinnaclesavvy} />
          </div>
        </TabsContent>
        
        <TabsContent value="prosecure" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlanTabContent {...planData.prosecure} />
            <PlanTabContent {...planData.prosecureplus} />
          </div>
        </TabsContent>
        
        <TabsContent value="proselect" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PlanTabContent {...planData.proselect} />
            <PlanTabContent {...planData.proselectplus} />
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default PlanTabs;