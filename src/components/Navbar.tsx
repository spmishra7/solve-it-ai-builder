
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white py-4 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold gradient-text">DrSolveIt</span>
          </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-brand-600 transition-colors">Features</a>
          <a href="#templates" className="text-gray-600 hover:text-brand-600 transition-colors">Templates</a>
          <a href="#pricing" className="text-gray-600 hover:text-brand-600 transition-colors">Pricing</a>
          <Button variant="outline" className="ml-2">Sign In</Button>
          <Button className="bg-brand-600 hover:bg-brand-700">Get Started</Button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-3">
            <a href="#features" className="text-gray-600 hover:text-brand-600 transition-colors py-2">Features</a>
            <a href="#templates" className="text-gray-600 hover:text-brand-600 transition-colors py-2">Templates</a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-600 transition-colors py-2">Pricing</a>
            <Button variant="outline" className="w-full mb-2">Sign In</Button>
            <Button className="bg-brand-600 hover:bg-brand-700 w-full">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
