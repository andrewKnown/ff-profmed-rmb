
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
        
        <div className="prose prose-sm max-w-none">
          <p>Profmed respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
          <p>We collect information from you when you register on our site, subscribe to our newsletter, respond to a survey, fill out a form, or engage in other activities on our website. The information may include:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Demographic information</li>
            <li>Medical and health information necessary for providing our services</li>
            <li>Payment details</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
          <p>We may use the information we collect from you in the following ways:</p>
          <ul className="list-disc pl-6 my-4">
            <li>To personalise your experience</li>
            <li>To improve our website and services</li>
            <li>To process transactions</li>
            <li>To administer a contest, promotion, survey or other site feature</li>
            <li>To send periodic emails regarding your membership or other products and services</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Protection of Information</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
          <p>Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser that enables the site's or service provider's systems to recognise your browser and capture and remember certain information. We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as required by law or to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Changes to Privacy Policy</h2>
          <p>Profmed may update this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: info@profmed.co.za</p>
          <p>Phone: 0800 DEGREE (334 733)</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
