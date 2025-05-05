import React from 'react';

const Privacy: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1837] to-[#0e223f] text-white px-4 py-16">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Privacy Policy</h1>
    <div className="max-w-2xl text-blue-100 text-center space-y-4">
      <p>
        We value your privacy. DrSolveIt collects only the information necessary to provide and improve our services. We never sell your data to third parties.
      </p>
      <p>
        All data is stored securely and you can request deletion at any time. For more details, contact us at <a href="mailto:support@drsolveit.com" className="text-cyan-300 underline">support@drsolveit.com</a>.
      </p>
    </div>
  </div>
);

export default Privacy; 