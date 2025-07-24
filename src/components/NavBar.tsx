
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mobile";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery();
  const location = useLocation();
  const isAdminPage = location.pathname.includes('admin');
  
  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false); // Close mobile menu
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-4 md:px-8 sticky top-0 z-50 h-[150px]">
      <div className="max-w-[1152px] mx-auto flex items-center justify-between h-full">
        {/* Logo - PROFMED Logo Image */}
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/da9196e2-00f5-41df-8da0-41ad5c159164.png" 
              alt="PROFMED Logo" 
              className="h-8 w-auto" 
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className={cn(
          "items-center md:flex space-x-4",
          isMobile ? (isOpen ? "absolute top-full left-0 right-0 flex flex-col items-start space-y-2 space-x-0 bg-background shadow-md p-4" : "hidden") : ""
        )}>
          <div className={cn(
            "flex items-center space-x-6",
            isMobile && isOpen ? "flex-col space-y-2 space-x-0 w-full" : ""
          )}>
            <Link to="/" className="text-foreground hover:text-accent transition-colors font-medium">
              Home
            </Link>
            
            <button 
              onClick={() => scrollToSection('plans-overview')} 
              className="text-foreground hover:text-accent transition-colors text-left font-medium"
            >
              Plans
            </button>
            
            <button 
              onClick={() => scrollToSection('reviews')} 
              className="text-foreground hover:text-accent transition-colors text-left font-medium"
            >
              Testimonials
            </button>

            <button 
              onClick={() => scrollToSection('trust-section')} 
              className="text-foreground hover:text-accent transition-colors text-left font-medium"
            >
              Why Choose Us
            </button>

            {/* Only show the Admin link on admin pages */}
            {isAdminPage && (
              <Link to="/admin" className="text-foreground hover:text-primary transition-colors">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
