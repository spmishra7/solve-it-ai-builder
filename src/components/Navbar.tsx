
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-gray-800">
              DrSolveIt
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-brand-600">Features</a>
            <a href="#generator" className="text-gray-600 hover:text-brand-600">Build Now</a>
            <a href="#templates" className="text-gray-600 hover:text-brand-600">Templates</a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-600">Pricing</a>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User size={16} />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/my-solutions")} className="cursor-pointer">
                    <FileText size={16} className="mr-2" />
                    My Solutions
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => navigate('/auth')} 
                variant="default" 
                className="bg-brand-600 hover:bg-brand-700"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-brand-600"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 py-3">
              <a href="#features" className="text-gray-600 hover:text-brand-600 py-2" onClick={toggleMenu}>Features</a>
              <a href="#generator" className="text-gray-600 hover:text-brand-600 py-2" onClick={toggleMenu}>Build Now</a>
              <a href="#templates" className="text-gray-600 hover:text-brand-600 py-2" onClick={toggleMenu}>Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-brand-600 py-2" onClick={toggleMenu}>Pricing</a>
              
              {user ? (
                <>
                  <Link to="/my-solutions" className="text-gray-600 hover:text-brand-600 py-2 flex items-center" onClick={toggleMenu}>
                    <FileText size={16} className="mr-2" />
                    My Solutions
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      toggleMenu();
                    }} 
                    className="text-red-600 hover:text-red-700 py-2 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={toggleMenu}>
                  <Button className="w-full bg-brand-600 hover:bg-brand-700">
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
