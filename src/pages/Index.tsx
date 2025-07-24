
import { useState, useEffect } from "react";
import ChatBot from "../components/ChatBot";
import TrustSection from "../components/TrustSection";
import NavBar from "../components/NavBar";
import PlansOverview from "../components/PlansOverview";
import ReviewsCarousel from "../components/ReviewsCarousel";
import { useThemeParam, getThemeContent } from "../hooks/useThemeParam";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Footer from "../components/Footer";

const Index = () => {
  const { toast } = useToast();
  const { theme, isLoading: isThemeLoading } = useThemeParam();
  const [content, setContent] = useState<{
    title: string;
    subtitle: string;
    cta: string;
    headerImage: string;
  }>({
    title: "FREEDOM TO LIVE YOUR PASSION",
    subtitle: "Please wait whilst we load content tailored to your professional needs",
    cta: "Finding the Best Medical Aid Options",
    headerImage: '/lovable-uploads/1cdc1410-8abb-4a6f-8e7f-3cde641b0d99.png',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        // Get initial content synchronously for faster rendering
        const placeholderContent = {
          title: "FREEDOM TO LIVE YOUR PASSION",
          subtitle: "Please wait whilst we load content tailored to your professional needs",
          cta: "Finding the Best Medical Aid Options",
          headerImage: '/lovable-uploads/1cdc1410-8abb-4a6f-8e7f-3cde641b0d99.png',
        };
        setContent(placeholderContent);
        
        // Then fetch or generate the actual content
        const themeContent = await getThemeContent(theme);
        console.log("Loaded theme content:", themeContent);
        
        // Final safety check for the Profmed logo or relative paths
        if (themeContent.headerImage && 
            (themeContent.headerImage.includes('ac603f38-2bca-4dd2-a8d2-360052790072') || 
             themeContent.headerImage.startsWith('/lovable-uploads/'))) {
          console.log("Replacing logo or relative path with rocket launch image");
          themeContent.headerImage = '/lovable-uploads/1cdc1410-8abb-4a6f-8e7f-3cde641b0d99.png';
        }
        
        setContent(themeContent);
      } catch (error) {
        console.error("Error loading theme content:", error);
        toast({
          title: "Content Error",
          description: "We encountered an issue while loading personalised content",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!isThemeLoading) {
      loadContent();
    }
  }, [theme, isThemeLoading, toast]);

  // Update the document title based on theme content
  useEffect(() => {
    if (content.title) {
      document.title = content.title;
    }
  }, [content.title]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Hero Section - Full width background with constrained content */}
      <header 
        className="py-16 md:py-24 lg:py-28 px-4 md:px-8 bg-gradient-to-br from-primary to-primary-light text-white header-background relative"
        style={{ 
          backgroundImage: `linear-gradient(to bottom right, rgba(11, 37, 75, 0.7), rgba(26, 58, 108, 0.7)), url(${content.headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-6 w-2/3 mx-auto mb-8 bg-white/20" />
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                {content.title}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
                {content.subtitle}
              </p>
            </>
          )}
          
          {/* Membership Application Notice */}
          <div className="mb-8 bg-primary/30 backdrop-blur-sm p-4 rounded-lg inline-block">
            <h2 className="text-xl font-bold mb-2">Begin Your Healthcare Journey Today</h2>
            <p className="mb-3">Use our virtual assistant below to check your eligibility and explore membership options</p>
          </div>
          
          {/* Chat Bot - Constrained width for usability */}
          <div className="max-w-md mx-auto chatbot-section">
            <ChatBot />
          </div>
        </div>
      </header>

      {/* Plans Overview Section - Full width with constrained content */}
      <div id="plans-overview">
        <PlansOverview />
      </div>

      {/* Reviews Section - Full width with constrained content */}
      <div id="reviews">
        <ReviewsCarousel />
      </div>

      {/* Trust Section - Full width with constrained content */}
      <div id="trust-section">
        <TrustSection />
      </div>

      {/* Footer - using the new Footer component */}
      <Footer />
    </div>
  );
};

export default Index;
