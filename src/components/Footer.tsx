
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-8 bg-background border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-primary">About Profmed</h3>
            <p className="text-sm text-foreground/80">
              Profmed is a restricted medical scheme that provides exclusive medical cover to professionals with a 4-year degree or equivalent qualification.
            </p>
            <p className="text-sm text-foreground/80 mt-2">
              <strong>FSP No. 43918</strong>
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#plans-overview" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Plans
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#trust-section" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Why Choose Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-primary">Contact</h3>
            <p className="text-sm text-foreground/80">
              Call Centre: 0800 DEGREE (334 733)
            </p>
            <p className="text-sm text-foreground/80">
              Email: info@profmed.co.za
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Legal Footer */}
        <div className="flex flex-col md:flex-row justify-between text-sm text-foreground/70">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Profmed Medical Scheme. All rights reserved.
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">
              Disclaimer
            </Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
