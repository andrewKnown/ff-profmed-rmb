
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">Disclaimer</h1>
        
        <div className="prose prose-sm max-w-none">
          <p>This disclaimer governs your use of our website; by using our website, you accept this disclaimer in full. If you disagree with any part of this disclaimer, you must not use our website.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Information on this Website</h2>
          <p>The information on this website is intended to provide users with general information about Profmed and its products and services. We endeavour to ensure that the information is accurate and up to date. However, we make no representations or warranties about the accuracy, completeness, reliability, suitability or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Medical Information</h2>
          <p>The medical information provided on this website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
          <p>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Links to Other Websites</h2>
          <p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this disclaimer.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Changes to Website</h2>
          <p>We reserve the right to make changes to this website and this disclaimer at any time without notice. It is your responsibility to check this disclaimer periodically for changes.</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Governing Law</h2>
          <p>This disclaimer is governed by and construed in accordance with the laws of South Africa. Any disputes relating to this disclaimer shall be subject to the exclusive jurisdiction of the courts of South Africa.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Disclaimer;
