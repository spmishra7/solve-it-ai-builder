
const testimonials = [
  {
    quote: "DrSolveIt saved us months of development time. We described our inventory tracking problem, and within minutes, we had a working solution we could deploy.",
    author: "Sarah Johnson",
    role: "CTO, RetailPlus",
    image: "https://placehold.co/100/e2e8f0/64748b?text=SJ"
  },
  {
    quote: "As a non-technical founder, I struggled to build the tools my team needed. DrSolveIt allowed me to create custom solutions without hiring expensive developers.",
    author: "Michael Chen",
    role: "Founder, HealthTrack",
    image: "https://placehold.co/100/e2e8f0/64748b?text=MC"
  },
  {
    quote: "The AI understood exactly what we needed for our client onboarding system. The generated solution was comprehensive and required minimal tweaking.",
    author: "Rebecca Torres",
    role: "Operations Manager, ConsultPro",
    image: "https://placehold.co/100/e2e8f0/64748b?text=RT"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-brand-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Businesses of all sizes are using DrSolveIt to build custom solutions faster than ever before.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
