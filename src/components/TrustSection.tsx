import { Users, Star, ShieldCheck, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
const TrustSection = () => {
  const scrollToChatbot = () => {
    const chatbotElement = document.querySelector('.chatbot-section');
    if (chatbotElement) {
      chatbotElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="py-16 md:py-20 lg:py-24 bg-medical-background">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Why Choose Profmed Medical Aid?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-medical-card hover:shadow-lg transition-all">
            <Users className="w-12 h-12 text-secondary mb-4" />
            <h3 className="font-semibold mb-2 text-primary text-xl">35,000+ Members</h3>
            <p className="text-medical-text/70">Join our growing community of healthcare professionals</p>
          </div>
          
          
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-medical-card hover:shadow-lg transition-all">
            <ShieldCheck className="w-12 h-12 text-secondary mb-4" />
            <h3 className="font-semibold mb-2 text-primary text-xl">Comprehensive Coverage</h3>
            <p className="text-medical-text/70">Professional medical aid you can truly rely on</p>
          </div>
        </div>

        {/* Membership Application CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4 text-primary">Ready to Apply for Membership?</h3>
          <p className="mb-6 max-w-2xl mx-auto">Begin your membership assessment by chatting with our assistant.</p>
          
          <div className="flex justify-center">
            <Button onClick={scrollToChatbot} size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium py-6 px-8">
              Start Text Chat <MessageSquare className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default TrustSection;