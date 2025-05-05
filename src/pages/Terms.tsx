import React from 'react';

const Terms: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1837] to-[#0e223f] text-white px-4 py-16">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Terms of Service</h1>
    <div className="max-w-2xl text-blue-100 text-center space-y-4">
      <p>
        By using DrSolveIt, you agree to our terms of service. You are responsible for the content you provide and for complying with all applicable laws.
      </p>
      <p>
        We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of the new terms.
      </p>
    </div>
  </div>
);

export default Terms; 