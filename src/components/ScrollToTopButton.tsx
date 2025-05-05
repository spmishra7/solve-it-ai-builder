import React, { useEffect, useState } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      aria-label="Scroll to top"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
    </button>
  ) : null;
};

export default ScrollToTopButton; 