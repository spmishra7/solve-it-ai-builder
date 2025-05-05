
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
  }
];

export type RoleCategory = typeof roleCategories[number];
export type ExpertRole = RoleCategory['roles'][number];
