
import { useState } from "react";
import TemplateCard, { TemplateProps } from "./TemplateCard";
import { Button } from "@/components/ui/button";

const templateData: TemplateProps[] = [
  {
    title: "Patient Tracker",
    description: "Complete system for healthcare providers to manage patient records, appointments, and medical history.",
    icon: "🏥",
    category: "Healthcare"
  },
  {
    title: "Invoice Generator",
    description: "Automated tool for creating, sending, and tracking invoices with payment integration.",
    icon: "💰",
    category: "Finance"
  },
  {
    title: "Student Portal",
    description: "Comprehensive platform for educational institutions to manage students, courses, and grades.",
    icon: "🎓",
    category: "Education"
  },
  {
    title: "Inventory Tracker",
    description: "Real-time inventory management system for retail businesses with alerts and reports.",
    icon: "🛒",
    category: "Retail"
  },
  {
    title: "Campaign Planner",
    description: "Marketing campaign management tool with analytics, scheduling, and performance tracking.",
    icon: "📈",
    category: "Marketing"
  },
  {
    title: "KPI Dashboard",
    description: "Interactive data visualization tool for business metrics and key performance indicators.",
    icon: "📊",
    category: "Analytics"
  },
  {
    title: "Service Scheduler",
    description: "Appointment booking system for automotive service centers with customer management.",
    icon: "🚗",
    category: "Automotive"
  },
  {
    title: "Client Onboarding CRM",
    description: "Customer relationship management system designed for consulting firms.",
    icon: "🤝",
    category: "Consulting"
  },
  {
    title: "Video Planner Assistant",
    description: "Content planning and scheduling tool for video creators with analytics.",
    icon: "🎬",
    category: "Content Creators"
  },
  {
    title: "Employee Onboarding System",
    description: "Streamlined process for HR teams to manage new employee documentation and training.",
    icon: "👥",
    category: "HR"
  }
];

const categories = ["All", "Healthcare", "Finance", "Education", "Retail", "Marketing", "Analytics", "Automotive", "Consulting", "Content Creators", "HR"];

const TemplateSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleTemplates, setVisibleTemplates] = useState(6);
  
  const filteredTemplates = activeCategory === "All" 
    ? templateData 
    : templateData.filter(template => template.category === activeCategory);
  
  const displayedTemplates = filteredTemplates.slice(0, visibleTemplates);
  const hasMore = visibleTemplates < filteredTemplates.length;
  
  const loadMore = () => {
    setVisibleTemplates(prev => Math.min(prev + 3, filteredTemplates.length));
  };
  
  return (
    <section id="templates" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pre-Built Templates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start with a template and customize it to your needs, or use them as inspiration for your own solution.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-10 overflow-x-auto pb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`rounded-full ${activeCategory === category ? 'bg-brand-600' : ''}`}
              onClick={() => {
                setActiveCategory(category);
                setVisibleTemplates(6);
              }}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {displayedTemplates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div>
        
        {hasMore && (
          <div className="text-center mt-10">
            <Button variant="outline" onClick={loadMore}>
              Load More Templates
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TemplateSection;
