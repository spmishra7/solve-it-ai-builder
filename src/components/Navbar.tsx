
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
    <nav className="bg-card/50 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-foreground flex items-center gap-2">
              <img 
                src="/lovable-uploads/b8bd828d-1db2-4ecf-ad16-701fd9844c9e.png" 
                alt="DrSolveIt Logo" 
                className="h-8 w-auto"
              />
              <span className="gradient-text">DrSolveIt</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-accent transition-colors">Features</a>
            <a href="#generator" className="text-muted-foreground hover:text-accent transition-colors">Build Now</a>
            <a href="#templates" className="text-muted-foreground hover:text-accent transition-colors">Templates</a>
            <a href="#pricing" className="text-muted-foreground hover:text-accent transition-colors">Pricing</a>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-accent">
                    <User size={16} />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem onClick={() => navigate("/my-solutions")} className="cursor-pointer hover:bg-accent/10">
                    <FileText size={16} className="mr-2" />
                    My Solutions
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-400 hover:bg-red-500/10">
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
              className="text-foreground hover:text-accent"
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
        <div className="md:hidden bg-card/80 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 py-3">
              <a href="#features" className="text-muted-foreground hover:text-accent py-2" onClick={toggleMenu}>Features</a>
              <a href="#generator" className="text-muted-foreground hover:text-accent py-2" onClick={toggleMenu}>Build Now</a>
              <a href="#templates" className="text-muted-foreground hover:text-accent py-2" onClick={toggleMenu}>Templates</a>
              <a href="#pricing" className="text-muted-foreground hover:text-accent py-2" onClick={toggleMenu}>Pricing</a>
              
              {user ? (
                <>
                  <Link to="/my-solutions" className="text-muted-foreground hover:text-accent py-2 flex items-center" onClick={toggleMenu}>
                    <FileText size={16} className="mr-2" />
                    My Solutions
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      toggleMenu();
                    }} 
                    className="text-red-400 hover:text-red-300 py-2 flex items-center"
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
