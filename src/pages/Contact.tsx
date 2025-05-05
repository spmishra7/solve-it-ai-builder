import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you could send the form data to an API or email service
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1837] to-[#0e223f] text-white px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Contact Us</h1>
      <p className="max-w-2xl text-lg text-blue-100 text-center mb-4">
        Have questions, feedback, or want to partner with us? Reach out!
      </p>
      <div className="bg-[#142447] rounded-xl p-6 shadow-md w-full max-w-md mb-8">
        <p className="text-blue-200 mb-2">Email: <a href="mailto:support@drsolveit.com" className="text-cyan-300 underline">support@drsolveit.com</a></p>
        <p className="text-blue-200">Twitter: <a href="https://twitter.com/drsolveit" className="text-cyan-300 underline" target="_blank" rel="noopener noreferrer">@drsolveit</a></p>
      </div>
      <div className="w-full max-w-md">
        {submitted ? (
          <div className="bg-green-700/80 text-white rounded-lg p-6 text-center shadow">
            <h2 className="text-xl font-bold mb-2">Thank you!</h2>
            <p>We have received your message and will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#142447] rounded-xl p-6 shadow-md flex flex-col gap-4" aria-label="Contact form">
            <label htmlFor="name" className="text-blue-100 font-semibold">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="rounded px-3 py-2 bg-[#101e36] text-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-required="true"
            />
            <label htmlFor="email" className="text-blue-100 font-semibold">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="rounded px-3 py-2 bg-[#101e36] text-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-required="true"
            />
            <label htmlFor="message" className="text-blue-100 font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="rounded px-3 py-2 bg-[#101e36] text-white border border-blue-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-required="true"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact; 