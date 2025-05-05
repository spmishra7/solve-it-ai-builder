import React from 'react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      'Describe problems in natural language',
      'Basic SaaS/automation generation',
      'Community support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29/mo',
    features: [
      'All Free features',
      'Priority AI generation',
      'Integrations (Zapier, Slack, etc.)',
      'Advanced automations',
      'Email support',
    ],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    features: [
      'All Pro features',
      'Custom integrations',
      'Dedicated support',
      'On-premise options',
      'SLA & compliance',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const Pricing: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1837] to-[#0e223f] text-white px-4 py-16">
    <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Pricing</h1>
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`flex-1 bg-[#142447] rounded-xl p-8 shadow-md flex flex-col items-center border-2 ${plan.highlight ? 'border-cyan-400 scale-105' : 'border-blue-900'} transition`}
        >
          <h2 className="text-2xl font-bold mb-2 text-blue-100">{plan.name}</h2>
          <div className="text-3xl font-extrabold mb-4 text-cyan-300">{plan.price}</div>
          <ul className="mb-6 space-y-2 text-blue-200">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-cyan-400">✔</span> {f}
              </li>
            ))}
          </ul>
          <button className={`px-6 py-2 rounded-full font-semibold shadow ${plan.highlight ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white' : 'bg-white text-blue-700'} hover:scale-105 transition`}>{plan.cta}</button>
        </div>
      ))}
    </div>
  </div>
);

export default Pricing; 