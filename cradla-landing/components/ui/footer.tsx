import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-none border-t border-gray-100 py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            
            <span className="text-white font-bold text-lg">Cradla</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:llano@stanford.edu" className="text-lg text-white hover:text-gray-900">
              Contact
            </a>
            <a href="#" className="text-lg text-white hover:text-gray-900">
              Pitch
            </a>
            <a href="#" className="text-lg text-white hover:text-gray-900">
              Research
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-lg text-white">
              © {currentYear} Cradla
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;