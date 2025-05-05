
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
    id: "industry",
    name: "Industry Experts",
    roles: [
      {
        id: "healthcare",
        name: "Healthcare Expert",
        icon: "🏥",
        description: "Medical workflows, patient management, and healthcare compliance."
      },
      {
        id: "finance",
        name: "Finance Expert",
        icon: "💹",
        description: "Financial regulations, payment processing, and accounting practices."
      },
      {
        id: "retail",
        name: "Retail Expert",
        icon: "🛒",
        description: "Inventory management, point of sale systems, and customer loyalty."
      },
      {
        id: "education",
        name: "Education Expert",
        icon: "🎓",
        description: "Learning management, student assessment, and educational workflows."
      }
    ]
  },
  {
    id: "operations",
    name: "Operations",
    roles: [
      {
        id: "projectManager",
        name: "Project Manager",
        icon: "📋",
        description: "Project planning, resource allocation, and delivery management."
      },
      {
        id: "qualityAssurance",
        name: "QA Specialist",
        icon: "✅",
        description: "Testing methodologies, quality standards, and defect management."
      },
      {
        id: "devops",
        name: "DevOps Engineer",
        icon: "⚡",
        description: "Deployment automation, CI/CD pipelines, and infrastructure as code."
      },
      {
        id: "support",
        name: "Customer Support",
        icon: "🙋",
        description: "User onboarding, troubleshooting, and support workflows."
      }
    ]
  },
  // New Categories Below
  {
    id: "serviceProviders",
    name: "Service Providers",
    roles: [
      {
        id: "barber",
        name: "Barber",
        icon: "✂️",
        description: "Appointment scheduling, client management, and inventory tracking for salon businesses."
      },
      {
        id: "beautician",
        name: "Beautician",
        icon: "💅",
        description: "Service catalog management, client tracking, and beauty product inventory solutions."
      },
      {
        id: "tutor",
        name: "Tutor",
        icon: "📚",
        description: "Student progress tracking, lesson planning, and educational resource management."
      },
      {
        id: "personalTrainer",
        name: "Personal Trainer",
        icon: "🏋️",
        description: "Client fitness tracking, workout planning, and nutrition advisory tools."
      }
    ]
  },
  {
    id: "rentalEcosystem",
    name: "Rental Ecosystem",
    roles: [
      {
        id: "landlord",
        name: "Landlord",
        icon: "🏢",
        description: "Tenant management, rent collection, and property maintenance coordination."
      },
      {
        id: "tenant",
        name: "Tenant",
        icon: "🔑",
        description: "Rent payment tracking, maintenance requests, and accommodation search tools."
      },
      {
        id: "propertyManager",
        name: "Property Manager",
        icon: "📋",
        description: "Multi-property oversight, tenant coordination, and maintenance scheduling."
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
      }
    ]
  },
  {
    id: "mobility",
    name: "Mobility & Transportation",
    roles: [
      {
        id: "traveler",
        name: "Traveler",
        icon: "✈️",
        description: "Travel itinerary planning, expense tracking, and destination information tools."
      },
      {
        id: "tourGuide",
        name: "Tour Guide",
        icon: "🧭",
        description: "Tour group management, itinerary planning, and local attraction information systems."
      },
      {
        id: "driver",
        name: "Driver",
        icon: "🚗",
        description: "Route optimization, fare management, and vehicle maintenance tracking."
      }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare Practitioners",
    roles: [
      {
        id: "nurse",
        name: "Nurse",
        icon: "👨‍⚕️",
        description: "Patient care tracking, shift management, and medical documentation tools."
      },
      {
        id: "therapist",
        name: "Therapist",
        icon: "🧠",
        description: "Patient session notes, treatment planning, and appointment scheduling systems."
      },
      {
        id: "homeCareProvider",
        name: "Home Care Provider",
        icon: "🏡",
        description: "Patient care scheduling, medication management, and care plan tracking."
      }
    ]
  },
  // Indian Society Professions
  {
    id: "indianProfessions",
    name: "Indian Professions",
    roles: [
      {
        id: "streetVendor",
        name: "Street Vendor",
        icon: "🛒",
        description: "Digital inventory tracking, mobile payment processing, and daily sales analytics."
      },
      {
        id: "autorickshawDriver",
        name: "Auto-rickshaw Driver",
        icon: "🛺",
        description: "Ride booking management, fare calculation, and route optimization tools."
      },
      {
        id: "tailor",
        name: "Tailor",
        icon: "🧵",
        description: "Customer measurement tracking, order management, and design catalog tools."
      },
      {
        id: "agriculturalFarmer",
        name: "Agricultural Farmer",
        icon: "🌾",
        description: "Crop planning, weather tracking, and agricultural market price monitoring."
      }
    ]
  },
  {
    id: "indianServices",
    name: "Indian Services",
    roles: [
      {
        id: "dabbawalah",
        name: "Dabbawalah",
        icon: "🍱",
        description: "Tiffin delivery tracking, route optimization, and customer subscription management."
      },
      {
        id: "ayurvedicDoctor",
        name: "Ayurvedic Doctor",
        icon: "🌿",
        description: "Patient history tracking, herbal remedy inventory, and treatment planning."
      },
      {
        id: "weddingPlanner",
        name: "Wedding Planner",
        icon: "💍",
        description: "Event coordination, vendor management, and budget tracking for Indian weddings."
      },
      {
        id: "yogaInstructor",
        name: "Yoga Instructor",
        icon: "🧘",
        description: "Class scheduling, student progress tracking, and asana sequence planning."
      }
    ]
  },
  // American Society Professions
  {
    id: "americanProfessions",
    name: "American Professions",
    roles: [
      {
        id: "realEstateAgent",
        name: "Real Estate Agent",
        icon: "🏠",
        description: "Property listing management, client tracking, and market analysis tools."
      },
      {
        id: "foodTruckOwner",
        name: "Food Truck Owner",
        icon: "🚚",
        description: "Location scheduling, inventory management, and mobile ordering systems."
      },
      {
        id: "freelanceWriter",
        name: "Freelance Writer",
        icon: "✍️",
        description: "Project tracking, deadline management, and client communication tools."
      },
      {
        id: "podcastHost",
        name: "Podcast Host",
        icon: "🎙️",
        description: "Episode planning, guest scheduling, and audience analytics tracking."
      }
    ]
  },
  {
    id: "americanServices",
    name: "American Services",
    roles: [
      {
        id: "personalShopper",
        name: "Personal Shopper",
        icon: "👜",
        description: "Client preference tracking, purchase organization, and style recommendation tools."
      },
      {
        id: "dogWalker",
        name: "Dog Walker",
        icon: "🐕",
        description: "Pet schedule management, route planning, and client billing systems."
      },
      {
        id: "fitnessInfluencer",
        name: "Fitness Influencer",
        icon: "💪",
        description: "Content scheduling, engagement analytics, and sponsorship management tools."
      },
      {
        id: "virtualAssistant",
        name: "Virtual Assistant",
        icon: "💼",
        description: "Task management, calendar organization, and client communication systems."
      }
    ]
  },
  // Chinese Society Professions
  {
    id: "chineseProfessions",
    name: "Chinese Professions",
    roles: [
      {
        id: "tcmPractitioner",
        name: "TCM Practitioner",
        icon: "🧪",
        description: "Patient diagnosis tracking, herbal formula management, and treatment planning."
      },
      {
        id: "streetFoodVendor",
        name: "Street Food Vendor",
        icon: "🥢",
        description: "Menu management, ingredient inventory, and mobile payment processing."
      },
      {
        id: "calligrapher",
        name: "Calligrapher",
        icon: "🖌️",
        description: "Commission tracking, artwork catalog, and client communication tools."
      },
      {
        id: "teaMaster",
        name: "Tea Master",
        icon: "🍵",
        description: "Tea inventory management, ceremony scheduling, and customer preference tracking."
      }
    ]
  },
  {
    id: "chineseServices",
    name: "Chinese Services",
    roles: [
      {
        id: "ecommerceStreamer",
        name: "E-commerce Streamer",
        icon: "📱",
        description: "Product inventory, live stream scheduling, and sales performance analytics."
      },
      {
        id: "deliveryRider",
        name: "Delivery Rider",
        icon: "🛵",
        description: "Order tracking, route optimization, and delivery time management tools."
      },
      {
        id: "urbanFarmer",
        name: "Urban Farmer",
        icon: "🌱",
        description: "Crop planning, growth monitoring, and community-supported agriculture management."
      },
      {
        id: "digitalArtisan",
        name: "Digital Artisan",
        icon: "🖼️",
        description: "Project management, client communication, and digital asset organization."
      }
    ]
  }
];

export type RoleCategory = typeof roleCategories[number];
export type ExpertRole = RoleCategory['roles'][number];
