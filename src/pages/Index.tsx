
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
    title: "You dream it. We'll help you achieve it.",
    subtitle: "Profmed Medical Aid + RMB Credit Card: one decision, dual support for your next step.",
    cta: "Apply now",
    headerImage: '/lovable-uploads/1cdc1410-8abb-4a6f-8e7f-3cde641b0d99.png',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        // Get initial content synchronously for faster rendering
        const placeholderContent = {
          title: "You dream it. We'll help you achieve it.",
          subtitle: "Profmed Medical Aid + RMB Credit Card: one decision, dual support for your next step.",
          cta: "Apply now",
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
      
      {/* Hero Section - Clean Social Post Aesthetic */}
      <header 
        className="py-20 md:py-32 px-4 md:px-8 bg-white relative"
        style={{ 
          backgroundImage: `url(${content.headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Brand Header */}
        <div className="absolute top-6 left-6">
          <div className="brand-header">PROFMED</div>
        </div>
        
        {/* Partnership Footer */}
        <div className="absolute bottom-6 left-6">
          <div className="partnership-footer">In partnership with RMB</div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 animate-fade-in">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-3/4 mb-6 bg-gray-200" />
              <Skeleton className="h-8 w-2/3 mb-8 bg-gray-200" />
            </>
          ) : (
            <>
              <h1 className="heading-hero text-foreground mb-6 max-w-4xl">
                {content.title.split(' + ').length > 1 ? (
                  <>
                    {content.title.split(' + ')[0]}{' '}
                    <span className="plus-symbol">+</span>{' '}
                    {content.title.split(' + ')[1]}
                  </>
                ) : (
                  content.title
                )}
              </h1>
              <p className="text-xl md:text-2xl text-secondary mb-8 max-w-3xl font-medium">
                {content.subtitle}
              </p>
              <button className="bg-accent hover:bg-accent-light text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                {content.cta}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Section 1: Value Proposition - Social Post Inspired */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="social-post-card max-w-4xl mx-auto text-center">
            <div className="brand-header mb-8">PROFMED</div>
            <h2 className="heading-section text-foreground mb-6">
              MEDICAL AID <span className="plus-symbol">+</span> CREDIT CARD
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Everything that matters.
            </h3>
            <p className="text-lg text-secondary mb-8 max-w-3xl mx-auto font-medium">
              You already know who you are, what you want, and how you're going to get there. You just need the right support at the right time.
            </p>
            <p className="text-base text-secondary max-w-3xl mx-auto">
              That's why Profmed and RMB Private Bank have partnered to offer a dual benefit that covers more than costs. This offering backs your ambition with real benefits, from upfront medical cover to credit support designed for professionals with purpose.
            </p>
            <div className="partnership-footer mt-8">In partnership with RMB</div>
          </div>
        </div>
      </section>

      {/* Section 2: Product Overview */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Two essentials. Dual-benefit solution.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              The Profmed medical aid + RMB Credit Card is a dual benefit offer that combines intelligent medical cover with a smart credit card offering designed for early-career professionals who are already moving fast and want tools that help them move smarter.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Medical Benefits */}
            <div className="bg-background p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">Built-in medical benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• ProSelect Savvy benefit for young professionals</li>
                <li>• R2,500 medical savings contribution</li>
                <li>• Preventative screenings and mental health support via the Profmed App</li>
                <li>• 150+ days of sabbatical cover</li>
              </ul>
            </div>
            
            {/* Credit Benefits */}
            <div className="bg-background p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">Exceptional credit support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Guaranteed R10k credit limit (with potential increases)</li>
                <li>• Zero underwriting fees + free metal card</li>
                <li>• Personalised interest rates + Prime+2% budget facility</li>
                <li>• Purchase and debt protection (up to R15,000 and R12,000)</li>
                <li>• Travel insurance up to R5 million</li>
                <li>• Preferential lending rates on vehicle and home finance</li>
              </ul>
            </div>
          </div>
          
          {/* Lifestyle Rewards */}
          <div className="bg-background p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-primary">Intelligent lifestyle rewards</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
              <li>• Auto-upgrade to eBucks Level 3 + earn up to eB9000/month</li>
              <li>• R1.60/l fuel cashback + tech and lifestyle rewards</li>
              <li>• 8 complimentary SLOW Lounge visits</li>
              <li>• 15–25% back on Netflix, Spotify, iStore, Hirsch's, and more</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4 italic">Spend smart, get rewarded - no extra effort needed</p>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-lg text-muted-foreground mb-6">
              Are you ready to design the life you want without restrictions and complexities?
            </p>
            <a 
              href="https://profmed.co.za/rmb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Apply now
            </a>
          </div>
        </div>
      </section>

      {/* Section 3: Eligibility */}
      <section className="py-16 px-4 md:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Do I qualify?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            This is a professional tool built for people who are already doing the hard work of building something better.
          </p>
          
          <div className="bg-muted/30 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4 text-foreground">Eligibility Requirements</h3>
            <ul className="text-left text-muted-foreground space-y-2 max-w-2xl mx-auto">
              <li>• Ages 22–30</li>
              <li>• Degree required</li>
              <li>• Must meet both RMB Private Bank's young professional account and Profmed membership criteria</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-foreground">Typical qualifying professions include:</h3>
            <p className="text-muted-foreground">
              Law, medicine, engineering, finance, architecture, sciences, and more
            </p>
          </div>
          
          <a 
            href="https://profmed.co.za/rmb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Apply now
          </a>
        </div>
      </section>

      {/* Section 4: Lived Benefit Framing */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Your tools should work as hard as you do.
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Cover your health. Grow your wealth.
            </p>
            <p className="text-lg text-muted-foreground">
              Real benefits, no fluff, just smart support for your next step.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Healthcare? Handled.</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Money? Sorted.</h3>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Time? Yours.</h3>
            </div>
          </div>
        </div>
      </section>

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
