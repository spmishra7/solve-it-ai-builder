
import { useState } from "react";
import TemplateCard, { TemplateProps } from "./TemplateCard";
import { Button } from "@/components/ui/button";

const templateData: TemplateProps[] = [
  {
    title: "Patient Manager",
    description: "Complete system for healthcare providers to manage patient records, appointments, and medical history.",
    icon: "🏥",
    category: "Healthcare",
    businessPrompt: "I need a patient management system for a small medical practice. It should allow doctors and nurses to track patient information, schedule appointments, record medical history, and manage prescriptions. The system should have a dashboard showing today's appointments, recent patient interactions, and upcoming follow-ups. Patient records should include personal information, medical history, allergies, medications, and visit notes. The appointment system should prevent double-bookings and send reminders to patients."
  },
  {
    title: "Invoice Generator",
    description: "Automated tool for creating, sending, and tracking invoices with payment integration.",
    icon: "💰",
    category: "Finance",
    businessPrompt: "I need an invoice generation system for my freelance business. The system should create professional invoices with my business details, client information, itemized services with descriptions and costs, payment terms, and total amounts including any taxes. It should track payment status, send reminders for overdue invoices, and generate financial reports. The system should also include a dashboard showing pending, paid, and overdue invoices with relevant statistics. I'd like to store client information for easy reuse and have the ability to export invoices as PDFs."
  },
  {
    title: "Learning Tracker",
    description: "Comprehensive platform for educational institutions to manage students, courses, and grades.",
    icon: "🎓",
    category: "Education",
    businessPrompt: "I need a learning management system for a coding bootcamp. The system should track student progress through various modules, record completed assignments and quiz scores, and visualize learning progression. Instructors need to be able to create courses with multiple modules, upload learning materials, set assignments with deadlines, and grade student work. Students should have access to their personal dashboard showing progress, upcoming deadlines, and feedback on completed work. The system should also include a discussion forum for each course where students can ask questions."
  },
  {
    title: "Inventory Tracker",
    description: "Real-time inventory management system for retail businesses with alerts and reports.",
    icon: "🛒",
    category: "Retail",
    businessPrompt: "I need an inventory management system for my retail store that sells clothing and accessories. The system should track product details, quantities, locations, suppliers, and pricing. It should manage stock levels with automatic alerts when items reach reorder thresholds and suggest optimal reorder quantities based on sales history. The system should support barcode scanning for easy product lookup and inventory counts. It should generate reports on inventory valuation, turnover rates, and sales performance by product category. The system should also track and manage purchase orders from suppliers and received shipments."
  },
  {
    title: "Campaign Scheduler",
    description: "Marketing campaign management tool with analytics, scheduling, and performance tracking.",
    icon: "📈",
    category: "Marketing",
    businessPrompt: "I need a marketing campaign management tool for my digital marketing agency. The system should allow creation and scheduling of multi-channel marketing campaigns (email, social media, ads) with content planning calendars. It should track campaign performance metrics (reach, engagement, conversions, ROI) with visual analytics dashboards. The tool should enable team collaboration on campaign elements with task assignments and approval workflows. It should support audience segmentation and targeting, A/B testing capabilities, and provide automated reports for clients. Integration with common marketing platforms would be ideal."
  },
  {
    title: "KPI Dashboard",
    description: "Interactive data visualization tool for business metrics and key performance indicators.",
    icon: "📊",
    category: "Analytics",
    businessPrompt: "I need a KPI dashboard system for my SaaS business to track key metrics across departments. The dashboard should visualize sales metrics (new customers, MRR, churn rate), marketing performance (CAC, conversion rates, channel effectiveness), customer success metrics (NPS, ticket response time, resolution rates), and product usage statistics. I need customizable visualization options (charts, graphs, tables) with the ability to set targets and thresholds with color-coded indicators. The system should enable drill-down capabilities for detailed analysis, automated reports, and support role-based access to different dashboard views."
  },
  {
    title: "Garage Service Tool",
    description: "Appointment booking system for automotive service centers with customer management.",
    icon: "🚗",
    category: "Automotive",
    businessPrompt: "I need a service management system for my auto repair shop. The system should manage customer and vehicle information, track vehicle service history, schedule service appointments with mechanic assignments, and provide digital vehicle inspection checklists. It should generate cost estimates and invoices for repairs, track parts inventory with auto-reordering capabilities, and send automated service reminders to customers based on mileage or time intervals. The system should include a customer portal where clients can book appointments, approve repair estimates, and view their vehicle's service history."
  },
  {
    title: "Client Onboarding CRM",
    description: "Customer relationship management system designed for consulting firms.",
    icon: "🤝",
    category: "Consulting",
    businessPrompt: "I need a client onboarding system for my management consulting firm. The system should streamline the process of bringing new clients into our service workflow with standardized steps and document collection. It should include contract management, project scope definition, and assignment of consultants to projects. The system needs client profiles with contact information, project history, and communication logs. It should support automated communication for onboarding steps, document sharing and e-signatures, and progress tracking with clear milestone visualization. The system should also include internal task management for the onboarding team."
  },
  {
    title: "Video Planner Assistant",
    description: "Content planning and scheduling tool for video creators with analytics.",
    icon: "🎬",
    category: "Content Creators",
    businessPrompt: "I need a content planning system for my YouTube channel. The system should help manage my video production pipeline from idea to publication with a content calendar. It should track video ideas, outlines, scripts, filming schedules, editing progress, and publishing dates. The tool should help with SEO by suggesting tags, titles, and descriptions. It should integrate with YouTube to pull analytics data and visualize performance metrics (views, watch time, subscriber growth) to identify successful content types. The system should also allow for team collaboration, task assignments for different production roles, and set reminders for important publishing dates."
  },
  {
    title: "Employee Onboarding System",
    description: "Streamlined process for HR teams to manage new employee documentation and training.",
    icon: "👥",
    category: "HR",
    businessPrompt: "I need an employee onboarding system for our growing company. The system should manage the entire process from offer acceptance to full integration. It should automate document collection and signing (tax forms, policies, NDAs), create personalized onboarding schedules with orientation sessions and training modules, and track completion of required tasks. The system should provide new employees with a portal containing company information, team introductions, and helpful resources. It should enable task assignments to various departments (IT for equipment setup, facilities for workspace, etc.) and include feedback collection points to improve the onboarding process."
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
