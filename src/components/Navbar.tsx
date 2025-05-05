import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to features section if on home page
  const handleFeaturesClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const section = document.getElementById('features-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-30 bg-[#0a1837]/90 backdrop-blur border-b border-blue-900 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="DrSolveIt Logo" className="w-8 h-8" />
          <span className="font-bold text-xl text-blue-200">DrSolveIt</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-cyan-300 transition">Home</Link>
          <a href="#features-section" onClick={handleFeaturesClick} className="hover:text-cyan-300 transition">Features</a>
          <Link to="/about" className="hover:text-cyan-300 transition">About</Link>
          <Link to="/pricing" className="hover:text-cyan-300 transition">Pricing</Link>
          <Link to="/contact" className="hover:text-cyan-300 transition">Contact</Link>
          <Link to="/auth" className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition">Sign In</Link>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className="text-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded p-2"
          >
            {menuOpen ? (
              // Close (X) icon
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              // Hamburger icon
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" /></svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a1837]/95 border-b border-blue-900 shadow animate-fade-in-down">
          <div className="flex flex-col gap-2 px-6 py-4 text-blue-100">
            <Link to="/" className="py-2 hover:text-cyan-300 transition" onClick={() => setMenuOpen(false)}>Home</Link>
            <a href="#features-section" className="py-2 hover:text-cyan-300 transition" onClick={handleFeaturesClick}>Features</a>
            <Link to="/about" className="py-2 hover:text-cyan-300 transition" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/pricing" className="py-2 hover:text-cyan-300 transition" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <Link to="/contact" className="py-2 hover:text-cyan-300 transition" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/auth" className="mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition text-center" onClick={() => setMenuOpen(false)}>Sign In</Link>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.2s ease; }
      `}</style>
    </nav>
  );
};

export default Navbar;
