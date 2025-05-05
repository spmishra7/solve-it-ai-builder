import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'No-code, natural language input',
    icon: '🗣️',
    desc: 'Describe your needs in plain English. No tech skills required.'
  },
  {
    title: 'Instant deployment',
    icon: '⚡',
    desc: 'Get your SaaS tool or automation in seconds.'
  },
  {
    title: 'Secure & scalable',
    icon: '🔒',
    desc: 'Enterprise-grade security and cloud scalability.'
  },
  {
    title: 'Integrates with your stack',
    icon: '🔗',
    desc: 'Connect with your favorite tools and platforms.'
  },
  {
    title: 'Custom automations',
    icon: '🤖',
    desc: 'Automate repetitive tasks and workflows.'
  },
  {
    title: 'Admin dashboard',
    icon: '📊',
    desc: 'Manage, monitor, and scale your solutions.'
  },
];

const testimonials = [
  {
    quote: 'DrSolveIt turned my idea into a working SaaS in minutes. No code, no hassle!',
    name: 'Alex P.',
    company: 'Startup Founder'
  },
  {
    quote: 'We automated our onboarding process and saved 20+ hours a week.',
    name: 'Priya S.',
    company: 'HR Lead'
  },
  {
    quote: 'The fastest way to build and launch business tools. Game changer!',
    name: 'Jordan M.',
    company: 'Product Manager'
  }
];

const Landing: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#0a1837] to-[#0e223f] min-h-screen text-white flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-16 px-4 text-center relative overflow-hidden">
        {/* Animated Glow */}
        <div aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-transparent opacity-40 blur-3xl animate-pulse-slow z-0"></div>
        <img src="/logo.png" alt="DrSolveIt Logo" className="w-32 h-32 mb-6 drop-shadow-lg relative z-10" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Describe your business problem.<br />Get a custom SaaS tool. Instantly.</h1>
        <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl">No code. No waiting. Just solutions. DrSolveIt empowers you to turn ideas into reality with AI-powered automation and SaaS tools, tailored to your needs.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center z-10">
          <Link to="/auth">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition">Get Started</button>
          </Link>
          <Link to="/playground/demo">
            <button className="px-8 py-3 rounded-full bg-white text-blue-700 font-bold text-lg shadow-lg hover:bg-blue-100 transition border border-blue-200">Try Demo</button>
          </Link>
        </div>
      </header>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-200">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-4 border-2 border-blue-400">📝</div>
            <h3 className="font-semibold text-xl mb-2">Describe</h3>
            <p className="text-blue-100">Tell us your business challenge in plain English.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-4 border-2 border-blue-400">🤖</div>
            <h3 className="font-semibold text-xl mb-2">AI Builds</h3>
            <p className="text-blue-100">Our AI architects your custom SaaS or automation.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-4 border-2 border-blue-400">🚀</div>
            <h3 className="font-semibold text-xl mb-2">Launch</h3>
            <p className="text-blue-100">Deploy, use, and scale instantly.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features-section" className="bg-[#101e36] py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-200">Features</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-[#142447] rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-blue-100">{f.title}</h3>
              <p className="text-blue-200 text-center text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-200">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#142447] rounded-xl p-6 shadow-md flex flex-col items-center">
              <div className="text-blue-400 text-3xl mb-4">"</div>
              <p className="text-blue-100 italic mb-4">{t.quote}</p>
              <div className="text-blue-300 font-semibold">{t.name}</div>
              <div className="text-blue-400 text-sm">{t.company}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-200">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-[#142447] rounded-lg p-5 group" open>
            <summary className="cursor-pointer font-semibold text-blue-100 text-lg flex items-center justify-between">
              How does DrSolveIt work?
              <span className="ml-2 text-cyan-300 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-2 text-blue-200 text-sm">
              Just describe your business problem in plain English. Our AI analyzes your needs and instantly generates a custom SaaS tool or automation for you—no code required.
            </div>
          </details>
          <details className="bg-[#142447] rounded-lg p-5 group">
            <summary className="cursor-pointer font-semibold text-blue-100 text-lg flex items-center justify-between">
              Is my data secure?
              <span className="ml-2 text-cyan-300 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-2 text-blue-200 text-sm">
              Yes! We use enterprise-grade security and encryption. You control your data and can request deletion at any time.
            </div>
          </details>
          <details className="bg-[#142447] rounded-lg p-5 group">
            <summary className="cursor-pointer font-semibold text-blue-100 text-lg flex items-center justify-between">
              Can I integrate with other tools?
              <span className="ml-2 text-cyan-300 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-2 text-blue-200 text-sm">
              Absolutely! DrSolveIt supports integrations with popular platforms and APIs. Just mention your integration needs in your description.
            </div>
          </details>
          <details className="bg-[#142447] rounded-lg p-5 group">
            <summary className="cursor-pointer font-semibold text-blue-100 text-lg flex items-center justify-between">
              Is there a free trial?
              <span className="ml-2 text-cyan-300 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-2 text-blue-200 text-sm">
              Yes! You can try DrSolveIt for free. No credit card required to get started.
            </div>
          </details>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-xl mx-auto py-12 px-4 w-full">
        <div className="bg-[#142447] rounded-xl p-8 shadow-md flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2 text-blue-200">Stay in the loop</h2>
          <p className="text-blue-100 mb-4 text-center">Sign up for updates, new features, and early access invites.</p>
          {newsletterSubmitted ? (
            <div className="text-green-400 font-semibold">Thank you for subscribing!</div>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-2 w-full justify-center"
              onSubmit={e => { e.preventDefault(); setNewsletterSubmitted(true); }}
              aria-label="Newsletter signup form"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="rounded px-4 py-2 bg-[#101e36] text-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 flex-1 min-w-0"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-400 py-10 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to solve it? Start for free.</h2>
        <Link to="/auth">
          <button className="px-8 py-3 rounded-full bg-white text-blue-700 font-bold text-lg shadow-lg hover:bg-blue-100 transition">Sign Up Now</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1837] py-8 px-4 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-blue-200">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="DrSolveIt Logo" className="w-8 h-8" />
            <span className="font-bold text-lg">DrSolveIt</span>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </nav>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/></svg></a>
          </div>
        </div>
      </footer>

      {/* Style */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; filter: blur(32px); }
          50% { opacity: 0.7; filter: blur(40px); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Landing; 