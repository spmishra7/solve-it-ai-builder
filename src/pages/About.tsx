import React from 'react';

const About: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1837] to-[#0e223f] text-white px-4 py-16">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">About DrSolveIt</h1>
    <p className="max-w-2xl text-lg text-blue-100 text-center mb-4">
      DrSolveIt is a no-code, AI-powered platform that empowers professionals, startups, and enterprises to describe their business problems in natural language and receive fully customized SaaS tools and automation solutions instantly. Our mission is to democratize software creation and accelerate innovation for everyone.
    </p>
    <p className="max-w-2xl text-blue-200 text-center">
      Whether you need a custom workflow, automation, or a full SaaS product, DrSolveIt makes it possible—no coding required.
    </p>
  </div>
);

export default About; 