
// Define the categories and roles
export const roleCategories = [
  {
    id: "executive",
    name: "Executive Team",
    roles: [
      {
        id: "ceo",
        name: "CEO",
        icon: "👑",
        description: "Strategic vision, market positioning, and business model evaluation."
      },
      {
        id: "coo",
        name: "COO",
        icon: "⚙️",
        description: "Operational efficiency, process optimization, and resource allocation."
      },
      {
        id: "cfo",
        name: "CFO",
        icon: "💰",
        description: "Cost optimization, revenue models, and financial projections."
      },
      {
        id: "cto",
        name: "CTO",
        icon: "💻",
        description: "Technical feasibility, architecture decisions, and technology stack."
      },
    ]
  },
  {
    id: "management",
    name: "Management",
    roles: [
      {
        id: "product",
        name: "Product Manager",
        icon: "📊",
        description: "Feature prioritization, user stories, and product roadmap."
      },
      {
        id: "marketing",
        name: "Marketing Director",
        icon: "📣",
        description: "Go-to-market strategy, audience targeting, and brand positioning."
      },
      {
        id: "sales",
        name: "Sales Director",
        icon: "🤝",
        description: "Sales strategy, pricing models, and customer acquisition."
      }
    ]
  },
  {
    id: "dataTeam",
    name: "Data Team",
    roles: [
      {
        id: "dataAnalyst",
        name: "Data Analyst",
        icon: "📈",
        description: "Data interpretation, metrics definition, and business insights."
      },
      {
        id: "dataScientist",
        name: "Data Scientist",
        icon: "🧪",
        description: "Statistical modeling, predictive analytics, and machine learning solutions."
      },
      {
        id: "dataEngineer",
        name: "Data Engineer",
        icon: "🔌",
        description: "Data pipeline design, ETL processes, and data infrastructure."
      }
    ]
  },
  {
    id: "specialists",
    name: "Specialists",
    roles: [
      {
        id: "designer",
        name: "UX Designer",
        icon: "🎨",
        description: "User experience, interface design, and visual aesthetics."
      },
      {
        id: "engineer",
        name: "Software Engineer",
        icon: "🧰",
        description: "Technical implementation, scalability, and coding best practices."
      },
      {
        id: "security",
        name: "Security Specialist",
        icon: "🔒",
        description: "Data protection, compliance, and security best practices."
      },
      {
        id: "analyst",
        name: "Business Analyst",
        icon: "📊",
        description: "Requirements gathering, process analysis, and solution documentation."
      }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    roles: [
      {
        id: "physician",
        name: "Physician",
        icon: "👨‍⚕️",
        description: "Medical workflows, patient care protocols, and clinical decision support."
      },
      {
        id: "nurse",
        name: "Nurse",
        icon: "🏥",
        description: "Patient care tracking, shift management, and medical documentation tools."
      },
      {
        id: "medicalAdmin",
        name: "Medical Administrator",
        icon: "📋",
        description: "Healthcare facility management, staff coordination, and regulatory compliance."
      },
      {
        id: "therapist",
        name: "Therapist",
        icon: "🧠",
        description: "Patient session notes, treatment planning, and appointment scheduling systems."
      }
    ]
  },
  {
    id: "education",
    name: "Education",
    roles: [
      {
        id: "teacher",
        name: "Teacher",
        icon: "👩‍🏫",
        description: "Classroom management, assignment tracking, and student assessment tools."
      },
      {
        id: "student",
        name: "Student",
        icon: "📝",
        description: "Assignment management, study scheduling, and learning resource organization."
      },
      {
        id: "schoolAdmin",
        name: "School Administrator",
        icon: "🏫",
        description: "Staff management, curriculum planning, and educational facility administration."
      },
      {
        id: "tutor",
        name: "Tutor",
        icon: "📚",
        description: "Student progress tracking, lesson planning, and educational resource management."
      }
    ]
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    roles: [
      {
        id: "storeManager",
        name: "Store Manager",
        icon: "🏪",
        description: "Inventory management, staff scheduling, and sales performance tracking."
      },
      {
        id: "ecommerceManager",
        name: "E-commerce Manager",
        icon: "🛒",
        description: "Online store management, product listings, and digital marketing coordination."
      },
      {
        id: "inventorySpecialist",
        name: "Inventory Specialist",
        icon: "📦",
        description: "Stock management, supply chain optimization, and inventory forecasting."
      },
      {
        id: "customerService",
        name: "Customer Service",
        icon: "🙋",
        description: "Customer inquiry handling, return processing, and satisfaction monitoring."
      }
    ]
  },
  {
    id: "finance",
    name: "Finance & Banking",
    roles: [
      {
        id: "accountant",
        name: "Accountant",
        icon: "💹",
        description: "Financial reporting, tax preparation, and expense tracking systems."
      },
      {
        id: "financialAdvisor",
        name: "Financial Advisor",
        icon: "💼",
        description: "Investment planning, portfolio management, and client financial guidance."
      },
      {
        id: "bankManager",
        name: "Bank Manager",
        icon: "🏦",
        description: "Banking operations, loan processing, and financial service delivery."
      },
      {
        id: "insuranceAgent",
        name: "Insurance Agent",
        icon: "📊",
        description: "Policy management, risk assessment, and claims processing workflows."
      }
    ]
  },
  {
    id: "hospitality",
    name: "Hospitality & Tourism",
    roles: [
      {
        id: "hotelManager",
        name: "Hotel Manager",
        icon: "🏨",
        description: "Accommodation management, staff coordination, and guest service optimization."
      },
      {
        id: "restaurantOwner",
        name: "Restaurant Owner",
        icon: "🍽️",
        description: "Menu planning, inventory control, and dining service management."
      },
      {
        id: "tourGuide",
        name: "Tour Guide",
        icon: "🧭",
        description: "Tour group management, itinerary planning, and local attraction information systems."
      },
      {
        id: "eventPlanner",
        name: "Event Planner",
        icon: "📅",
        description: "Event coordination, venue management, and attendee experience design."
      }
    ]
  },
  {
    id: "transportation",
    name: "Transportation & Logistics",
    roles: [
      {
        id: "fleetManager",
        name: "Fleet Manager",
        icon: "🚚",
        description: "Vehicle maintenance scheduling, driver coordination, and route optimization."
      },
      {
        id: "logisticsCoordinator",
        name: "Logistics Coordinator",
        icon: "📦",
        description: "Supply chain management, shipping coordination, and delivery tracking."
      },
      {
        id: "driver",
        name: "Driver",
        icon: "🚗",
        description: "Route optimization, fare management, and vehicle maintenance tracking."
      },
      {
        id: "warehouseManager",
        name: "Warehouse Manager",
        icon: "🏭",
        description: "Inventory storage, order fulfillment, and warehouse operations management."
      }
    ]
  },
  {
    id: "technology",
    name: "Technology & IT",
    roles: [
      {
        id: "softwareDeveloper",
        name: "Software Developer",
        icon: "👨‍💻",
        description: "Application development, code management, and technical implementation."
      },
      {
        id: "networkAdmin",
        name: "Network Administrator",
        icon: "🌐",
        description: "Network infrastructure management, security implementation, and system monitoring."
      },
      {
        id: "productOwner",
        name: "Product Owner",
        icon: "📱",
        description: "Product vision, backlog management, and feature prioritization."
      },
      {
        id: "qaEngineer",
        name: "QA Engineer",
        icon: "🧪",
        description: "Testing methodology, quality assurance, and bug tracking procedures."
      }
    ]
  },
  {
    id: "serviceProviders",
    name: "Professional Services",
    roles: [
      {
        id: "lawyer",
        name: "Lawyer",
        icon: "⚖️",
        description: "Case management, legal document processing, and client representation workflows."
      },
      {
        id: "consultant",
        name: "Consultant",
        icon: "💡",
        description: "Client engagement management, project delivery, and solution implementation."
      },
      {
        id: "realEstateAgent",
        name: "Real Estate Agent",
        icon: "🏠",
        description: "Property listing management, client tracking, and market analysis tools."
      },
      {
        id: "marketingConsultant",
        name: "Marketing Consultant",
        icon: "📊",
        description: "Campaign planning, audience targeting, and marketing performance analysis."
      }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Production",
    roles: [
      {
        id: "productionManager",
        name: "Production Manager",
        icon: "🏭",
        description: "Production scheduling, resource allocation, and quality control management."
      },
      {
        id: "qualityControl",
        name: "Quality Control Specialist",
        icon: "✅",
        description: "Product inspection, quality standard implementation, and defect reduction."
      },
      {
        id: "supplyChainManager",
        name: "Supply Chain Manager",
        icon: "⛓️",
        description: "Materials sourcing, vendor management, and production supply coordination."
      },
      {
        id: "maintenanceTech",
        name: "Maintenance Technician",
        icon: "🔧",
        description: "Equipment maintenance scheduling, repair tracking, and facility upkeep management."
      }
    ]
  }
];

export type RoleCategory = typeof roleCategories[number];
export type ExpertRole = RoleCategory['roles'][number];

