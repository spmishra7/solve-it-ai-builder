
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">AIExperts</span>
          </Link>

          {isMobile ? (
            <>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-4 px-4 shadow-lg">
                  <nav className="flex flex-col space-y-4">
                    <Link
                      to="/"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/model-manager"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="mr-1 h-4 w-4" />
                      Models
                    </Link>
                    {user ? (
                      <>
                        <Link
                          to="/my-solutions"
                          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
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
                        <Button>Sign In</Button>
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
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Home
                </Link>
                <Link
                  to="/model-manager"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center"
                >
                  <Settings className="mr-1 h-4 w-4" />
                  Models
                </Link>
                {user && (
                  <Link
                    to="/my-solutions"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
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
                  <Button>Sign In</Button>
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
