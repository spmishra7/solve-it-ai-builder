
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/479729cb-d2dd-4061-a516-fed53c310b4c.png" 
              alt="AIExperts Logo" 
              className="h-8 w-8" 
            />
            <span className="text-xl font-bold text-gray-900">AIExperts</span>
          </Link>

          {isMobile ? (
            <>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 py-4 px-4 shadow-lg">
                  <nav className="flex flex-col space-y-4">
                    <Link
                      to="/"
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/model-manager"
                      className="text-gray-600 hover:text-gray-900 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="mr-1 h-4 w-4" />
                      Models
                    </Link>
                    {user ? (
                      <>
                        <Link
                          to="/my-solutions"
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Solutions
                        </Link>
                        <Button variant="ghost" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button className="bg-[#00B5D8] text-white hover:bg-[#00A3C4]">Sign In</Button>
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Home
                </Link>
                <Link
                  to="/model-manager"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Settings className="mr-1 h-4 w-4" />
                  Models
                </Link>
                {user && (
                  <Link
                    to="/my-solutions"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    My Solutions
                  </Link>
                )}
              </nav>
              
              {user ? (
                <Button variant="ghost" onClick={signOut}>
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth">
                  <Button className="bg-[#00B5D8] text-white hover:bg-[#00A3C4]">Sign In</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
