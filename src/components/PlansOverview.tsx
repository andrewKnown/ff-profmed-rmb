
import { Button } from "@/components/ui/button";
import { MessageSquare, BarChart3, HelpCircle } from "lucide-react";
import { useThemeParam, getThemeContent } from "@/hooks/useThemeParam";
import { useState, useEffect } from "react";
import BenefitsComparisonTool from "./BenefitsComparisonTool";
import ProfessionFAQ from "./faq/ProfessionFAQ";
import PlansCategoryCard from "./plans/PlansCategoryCard";
import ProfessionalTool from "./plans/ProfessionalTool";
import PlanFeatureBox from "./plans/PlanFeatureBox";
import PlanTabs from "./plans/PlanTabs";
import OverviewCard from "./plans/OverviewCard";
import NetworkInfoCard from "./plans/NetworkInfoCard";
import { formatProfessionName } from "./ThemeSelector";

const PlansOverview = () => {
  const { theme, themeSource } = useThemeParam();
  const [content, setContent] = useState({
    title: "Loading content...",
    subtitle: "Please wait while we personalise your experience",
    cta: "Find the Right Medical Plan",
    headerImage: '/lovable-uploads/ac603f38-2bca-4dd2-a8d2-360052790072.png',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showComparisonTool, setShowComparisonTool] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const themeContent = await getThemeContent(theme);
        setContent(themeContent);
      } catch (error) {
        console.error("Error loading theme content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, [theme]);

  // Function to toggle different sections
  const toggleSection = (section: string) => {
    if (section === 'comparison') {
      setShowComparisonTool(prev => !prev);
      setShowFAQ(false);
    } else if (section === 'faq') {
      setShowFAQ(prev => !prev);
      setShowComparisonTool(false);
    }
  };

  const scrollToChatbot = () => {
    const chatbotElement = document.querySelector('.chatbot-section');
    if (chatbotElement) {
      chatbotElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Plans Overview</h2>
          {theme !== 'default' && (
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Tailored Medical Cover for {formatProfessionName(theme)} Professionals – Choose the Right Plan for Your Career and Lifestyle
              {themeSource === 'AI Customised' && (
                <span className="block mt-2 text-sm italic">
                  This content has been specially personalised for your profession.
                </span>
              )}
            </p>
          )}
          {theme === 'default' && (
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Tailored Medical Cover for South Africa's Professionals with University Degrees – Choose the Right Plan for Your Career and Lifestyle.
            </p>
          )}
        </div>

        {/* Professional Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ProfessionalTool 
            icon={<BarChart3 className="h-8 w-8 text-primary" />}
            title="Benefits Comparison Tool"
            description={theme !== 'default' ? 
              `Compare different plan benefits side-by-side based on your needs as a ${formatProfessionName(theme)} professional` : 
              "Compare different plan benefits side-by-side based on your healthcare needs as a graduate professional"}
            buttonText={showComparisonTool ? 'Hide Comparison Tool' : 'Compare Benefits'}
            isActive={showComparisonTool}
            onClick={() => toggleSection('comparison')}
          />
          
          <ProfessionalTool 
            icon={<HelpCircle className="h-8 w-8 text-primary" />}
            title={theme !== 'default' ? `FAQs for ${formatProfessionName(theme)} Professionals` : "FAQs for Graduate Professionals"}
            description={theme !== 'default' ? 
              `Find answers to common questions about coverage for ${formatProfessionName(theme)} professionals` : 
              "Find answers to common questions about coverage for professionals with university degrees"}
            buttonText={showFAQ ? 'Hide FAQs' : 'View FAQs'}
            isActive={showFAQ}
            onClick={() => toggleSection('faq')}
          />
        </div>

        {/* Conditionally render tool components */}
        {showComparisonTool && <BenefitsComparisonTool profession={theme} />}
        {showFAQ && <ProfessionFAQ profession={theme} />}

        {/* Overview Card */}
        <OverviewCard 
          description={theme !== 'default' ? 
            `Profmed offers 10 tailored medical aid plans designed specifically for ${formatProfessionName(theme)} professionals across different life stages and financial positions.` :
            "Profmed offers 10 tailored medical aid plans, designed for graduate professionals across different life stages and financial positions."}
        />

        {/* Plan Comparison Tabs */}
        <PlanTabs />

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <PlanFeatureBox 
            title="Trusted Excellence" 
            description={theme !== 'default' ? 
              `Trusted by thousands of ${formatProfessionName(theme)} professionals nationwide` : 
              "Trusted by thousands of graduate professionals nationwide"}
          />
          <PlanFeatureBox 
            title="Decades of Experience" 
            description="60+ years of healthcare expertise" 
          />
          <PlanFeatureBox 
            title="Tailored Solutions" 
            description={theme !== 'default' ? 
              `Customised options for different ${formatProfessionName(theme)} professional needs and budgets` : 
              "Customised options for different graduate professional needs and budgets"}
          />
        </div>

        {/* Plan Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <PlansCategoryCard 
            imageSrc="/lovable-uploads/bbe89f56-4bd2-42fb-b686-d855be63abb3.png"
            altText="ProActive Plus Options"
          />
          <PlansCategoryCard 
            imageSrc="/lovable-uploads/46a0c5d4-8f12-44e6-a115-7be8c5c615be.png"
            altText="ProPinnacle Options"
          />
          <PlansCategoryCard 
            imageSrc="/lovable-uploads/715c4516-021f-44a7-9a7e-1febdc3f270d.png"
            altText="ProSecure Options"
          />
          <PlansCategoryCard 
            imageSrc="/lovable-uploads/3e36fd0c-8307-416e-9ea3-186669ae3a28.png"
            altText="ProSelect Options"
          />
        </div>

        {/* Additional Networks */}
        <NetworkInfoCard 
          title="Day Procedure Network"
          description="Certain plans (Pro Active Plus, Pro Secure, Pro Secure Plus) require use of a specific network for selected day procedures to manage costs and maintain quality."
        />

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-lg px-8 py-6 bg-secondary hover:bg-secondary/90 shadow-lg"
          >
            {content.cta}
            <MessageSquare className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlansOverview;
