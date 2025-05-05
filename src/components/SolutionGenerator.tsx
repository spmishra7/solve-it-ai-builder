import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// This would normally come from an API call to GPT-4/Claude
const mockSolutionGeneration = (prompt: string) => {
  return new Promise<{ui: string, database: string, automation: string}>((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const firstWord = prompt.split(' ')[0].toLowerCase();
      
      // Very simplified mock response based on first word
      if (firstWord.includes('patient') || firstWord.includes('health') || firstWord.includes('doctor')) {
        resolve({
          ui: `<div class="p-5 bg-white rounded-lg shadow">
            <h1 class="text-xl font-bold mb-4">Patient Management Dashboard</h1>
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-medium">Total Patients</h3>
                <p class="text-2xl font-bold">1,248</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h3 class="font-medium">Appointments Today</h3>
                <p class="text-2xl font-bold">28</p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <h3 class="font-medium">Reports Pending</h3>
                <p class="text-2xl font-bold">13</p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-gray-300"></div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">Jane Cooper</div>
                          <div class="text-sm text-gray-500">jane.cooper@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 10, 2023</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`,
          database: `-- Patients Table
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  date_of_birth DATE,
  phone VARCHAR(20),
  address TEXT,
  medical_history TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  appointment_date TIMESTAMP NOT NULL,
  reason VARCHAR(255),
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical Records Table
CREATE TABLE medical_records (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  record_date DATE NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  prescription TEXT,
  doctor_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
          automation: `// Weekly Patient Report Generation
schedule.weekly(() => {
  // Get all patient activity from the past week
  const patients = db.query('SELECT * FROM patients WHERE created_at > now() - interval \'7 days\'');
  const appointments = db.query('SELECT * FROM appointments WHERE appointment_date > now() - interval \'7 days\'');
  
  // Generate PDF report
  const report = generatePDF({
    title: 'Weekly Patient Report',
    data: {
      newPatients: patients.length,
      completedAppointments: appointments.filter(a => a.status === 'completed').length,
      cancelledAppointments: appointments.filter(a => a.status === 'cancelled').length,
    }
  });
  
  // Email report to admin
  email.send({
    to: 'admin@healthcare.com',
    subject: 'Weekly Patient Report',
    body: 'Please find attached the weekly patient report.',
    attachments: [report]
  });
});

// Appointment Reminders
schedule.daily(() => {
  // Get tomorrow's appointments
  const tomorrowsAppointments = db.query(\`
    SELECT a.*, p.first_name, p.last_name, p.email, p.phone
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    WHERE a.appointment_date BETWEEN now() + interval '1 day' AND now() + interval '2 days'
    AND a.status = 'scheduled'
  \`);
  
  // Send SMS reminders
  tomorrowsAppointments.forEach(appointment => {
    sms.send({
      to: appointment.phone,
      body: \`Hi \${appointment.first_name}, reminder of your appointment tomorrow at \${formatTime(appointment.appointment_date)}. Reply CONFIRM to confirm or CANCEL to cancel.\`
    });
    
    // Also send email
    email.send({
      to: appointment.email,
      subject: 'Appointment Reminder',
      body: \`<h1>Appointment Reminder</h1><p>Dear \${appointment.first_name},</p><p>This is a reminder of your appointment scheduled for \${formatDate(appointment.appointment_date)} at \${formatTime(appointment.appointment_date)}.</p><p>Please click <a href="https://healthcare.com/confirm/\${appointment.id}">here</a> to confirm your appointment.</p>\`
    });
  });
});`
        });
      } else if (firstWord.includes('invoice') || firstWord.includes('finance') || firstWord.includes('payment')) {
        resolve({
          ui: `<div class="p-6 bg-white rounded-lg shadow-lg">
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-2xl font-bold">Invoice Generator</h1>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">New Invoice</button>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-600">Total Revenue</h3>
                <p class="text-2xl font-bold">$24,382.44</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-600">Paid Invoices</h3>
                <p class="text-2xl font-bold">$18,203.90</p>
              </div>
              <div class="bg-red-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-600">Overdue</h3>
                <p class="text-2xl font-bold">$6,178.54</p>
              </div>
            </div>
            
            <div class="border rounded-lg overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-2023-001</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">Acme Corp</div>
                      <div class="text-sm text-gray-500">billing@acme.com</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$2,400.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 14, 2023</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900 mr-3">View</a>
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">Download</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`,
          database: `-- Clients Table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices Table
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  client_id INTEGER REFERENCES clients(id),
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_rate DECIMAL(5, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoice Items Table
CREATE TABLE invoice_items (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER REFERENCES invoices(id),
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER REFERENCES invoices(id),
  payment_date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
          automation: `// Invoice Due Reminders
schedule.daily(() => {
  // Find invoices due soon
  const upcomingInvoices = db.query(\`
    SELECT i.*, c.company_name, c.email
    FROM invoices i
    JOIN clients c ON i.client_id = c.id
    WHERE i.due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
    AND i.status = 'pending'
  \`);
  
  // Send reminders for upcoming invoices
  upcomingInvoices.forEach(invoice => {
    email.send({
      to: invoice.email,
      subject: \`Invoice #\${invoice.invoice_number} Payment Reminder\`,
      body: \`
        <h1>Payment Reminder</h1>
        <p>Dear \${invoice.company_name},</p>
        <p>This is a friendly reminder that invoice #\${invoice.invoice_number} for \${formatCurrency(invoice.total_amount)} is due on \${formatDate(invoice.due_date)}.</p>
        <p>Please click <a href="https://finance.app/pay/\${invoice.id}">here</a> to view and pay your invoice.</p>
        <p>Thank you for your business!</p>
      \`
    });
  });
  
  // Find overdue invoices
  const overdueInvoices = db.query(\`
    SELECT i.*, c.company_name, c.email
    FROM invoices i
    JOIN clients c ON i.client_id = c.id
    WHERE i.due_date < CURRENT_DATE
    AND i.status = 'pending'
  \`);
  
  // Send overdue notices
  overdueInvoices.forEach(invoice => {
    email.send({
      to: invoice.email,
      subject: \`OVERDUE: Invoice #\${invoice.invoice_number}\`,
      body: \`
        <h1>Overdue Invoice Notice</h1>
        <p>Dear \${invoice.company_name},</p>
        <p>Your payment for invoice #\${invoice.invoice_number} for \${formatCurrency(invoice.total_amount)} was due on \${formatDate(invoice.due_date)} and is now overdue.</p>
        <p>Please click <a href="https://finance.app/pay/\${invoice.id}">here</a> to make your payment as soon as possible.</p>
        <p>If you have already made this payment, please disregard this notice.</p>
      \`
    });
  });
});

// Monthly Revenue Reports
schedule.monthly(() => {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  
  const endDate = new Date();
  
  // Get monthly revenue data
  const revenueData = db.query(\`
    SELECT 
      SUM(p.amount) as total_revenue,
      COUNT(DISTINCT i.id) as invoices_paid,
      AVG(p.amount) as average_payment
    FROM payments p
    JOIN invoices i ON p.invoice_id = i.id
    WHERE p.payment_date BETWEEN $1 AND $2
  \`, [startDate, endDate]);
  
  // Get top clients
  const topClients = db.query(\`
    SELECT 
      c.company_name, 
      SUM(p.amount) as total_paid
    FROM payments p
    JOIN invoices i ON p.invoice_id = i.id
    JOIN clients c ON i.client_id = c.id
    WHERE p.payment_date BETWEEN $1 AND $2
    GROUP BY c.company_name
    ORDER BY total_paid DESC
    LIMIT 5
  \`, [startDate, endDate]);
  
  // Generate PDF report
  const report = generatePDF({
    title: 'Monthly Revenue Report',
    period: \`\${formatDate(startDate)} - \${formatDate(endDate)}\`,
    data: {
      revenue: revenueData[0],
      topClients: topClients
    }
  });
  
  // Email report to admin
  email.send({
    to: 'finance@company.com',
    subject: \`Monthly Revenue Report: \${formatMonthYear(startDate)}\`,
    body: 'Please find attached the monthly revenue report.',
    attachments: [report]
  });
});`
        });
      } else {
        // Default response if no specific match
        resolve({
          ui: `<div class="p-6 bg-white rounded-lg shadow-lg">
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-2xl font-bold">Custom SaaS Dashboard</h1>
              <div class="flex space-x-2">
                <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Export</button>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ New Item</button>
              </div>
            </div>
            
            <div class="grid grid-cols-4 gap-4 mb-6">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-600">Total Users</h3>
                <p class="text-2xl font-bold">2,543</p>
                <p class="text-xs text-green-600">↑ 12% from last month</p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-600">Active Projects</h3>
                <p class="text-2xl font-bold">48</p>
                <p class="text-xs text-green-600">↑ 4% from last month</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-600">Completed Tasks</h3>
                <p class="text-2xl font-bold">352</p>
                <p class="text-xs text-green-600">↑ 8% from last month</p>
              </div>
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-600">Pending Reviews</h3>
                <p class="text-2xl font-bold">16</p>
                <p class="text-xs text-red-600">↑ 3% from last month</p>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-2 bg-white rounded-lg border p-4">
                <h3 class="text-lg font-medium mb-4">Recent Activity</h3>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">JD</div>
                    <div class="ml-4">
                      <p class="text-sm font-medium">John Doe completed Task #352</p>
                      <p class="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">AS</div>
                    <div class="ml-4">
                      <p class="text-sm font-medium">Alice Smith created Project #48</p>
                      <p class="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">RJ</div>
                    <div class="ml-4">
                      <p class="text-sm font-medium">Robert Johnson updated Task #349</p>
                      <p class="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg border p-4">
                <h3 class="text-lg font-medium mb-4">Quick Actions</h3>
                <div class="space-y-2">
                  <button class="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600">Create New Task</button>
                  <button class="w-full text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-600">Add Team Member</button>
                  <button class="w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-600">Generate Report</button>
                  <button class="w-full text-left px-4 py-2 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-yellow-600">View Analytics</button>
                </div>
              </div>
            </div>
          </div>`,
          database: `-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  owner_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deadline DATE
);

-- Project Members Table
CREATE TABLE project_members (
  project_id INTEGER REFERENCES projects(id),
  user_id INTEGER REFERENCES users(id),
  role VARCHAR(50) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (project_id, user_id)
);

-- Tasks Table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'medium',
  assigned_to INTEGER REFERENCES users(id),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE
);

-- Task Comments Table
CREATE TABLE task_comments (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id),
  user_id INTEGER REFERENCES users(id),
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs Table
CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action_type VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INTEGER NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
          automation: `// Daily Digest Emails
schedule.daily(() => {
  // Get all active users
  const users = db.query('SELECT * FROM users WHERE role != \'inactive\'');
  
  users.forEach(user => {
    // Get user's projects
    const projects = db.query(\`
      SELECT p.* FROM projects p
      JOIN project_members pm ON p.id = pm.project_id
      WHERE pm.user_id = $1 AND p.status = 'active'
    \`, [user.id]);
    
    // Get user's tasks due soon
    const tasks = db.query(\`
      SELECT t.*, p.name as project_name
      FROM tasks t
      JOIN projects p ON t.project_id = p.id
      WHERE t.assigned_to = $1
      AND t.status = 'pending'
      AND t.due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '3 days'
      ORDER BY t.due_date ASC
    \`, [user.id]);
    
    // Get recent activity in user's projects
    const activity = db.query(\`
      SELECT al.*, u.first_name, u.last_name
      FROM activity_logs al
      JOIN users u ON al.user_id = u.id
      WHERE al.entity_type = 'project'
      AND al.entity_id IN (
        SELECT project_id FROM project_members WHERE user_id = $1
      )
      AND al.created_at > CURRENT_DATE - INTERVAL '1 day'
      ORDER BY al.created_at DESC
      LIMIT 10
    \`, [user.id]);
    
    // Only send email if there's relevant content
    if (tasks.length > 0 || activity.length > 0) {
      email.send({
        to: user.email,
        subject: 'Your Daily Project Digest',
        body: \`
          <h1>Your Daily Project Digest</h1>
          
          <h2>Tasks Due Soon</h2>
          \${tasks.length === 0 ? '<p>No tasks due soon.</p>' : \`
            <ul>
              \${tasks.map(task => \`
                <li>
                  <strong>\${task.title}</strong> (Due: \${formatDate(task.due_date)})
                  <br><span style="color:#777">Project: \${task.project_name}</span>
                </li>
              \`).join('')}
            </ul>
          \`}
          
          <h2>Recent Activity</h2>
          \${activity.length === 0 ? '<p>No recent activity.</p>' : \`
            <ul>
              \${activity.map(item => \`
                <li>
                  <strong>\${item.first_name} \${item.last_name}</strong> \${formatActivity(item.action_type, item.entity_type)}
                  <br><span style="color:#777">\${formatTimeAgo(item.created_at)}</span>
                </li>
              \`).join('')}
            </ul>
          \`}
        \`
      });
    }
  });
});

// Task Due Notifications
schedule.hourly(() => {
  // Find tasks due in 24 hours
  const dueTasks = db.query(\`
    SELECT t.*, p.name as project_name, u.email, u.first_name
    FROM tasks t
    JOIN users u ON t.assigned_to = u.id
    JOIN projects p ON t.project_id = p.id
    WHERE t.status = 'pending'
    AND t.due_date BETWEEN CURRENT_TIMESTAMP AND CURRENT_TIMESTAMP + INTERVAL '1 day'
  \`);
  
  // Send notification for each task
  dueTasks.forEach(task => {
    email.send({
      to: task.email,
      subject: \`Task Due Soon: \${task.title}\`,
      body: \`
        <h1>Task Reminder</h1>
        <p>Hi \${task.first_name},</p>
        <p>Your task <strong>\${task.title}</strong> in project <strong>\${task.project_name}</strong> is due in less than 24 hours.</p>
        <a href="https://app.example.com/tasks/\${task.id}" style="padding:10px 15px; background:#4F46E5; color:white; border-radius:5px; text-decoration:none;">View Task</a>
      \`
    });
    
    // Also send push notification if enabled
    pushNotifications.send({
      userId: task.assigned_to,
      title: 'Task Due Soon',
      body: \`\${task.title} is due in less than 24 hours\`,
      data: {
        taskId: task.id,
        projectId: task.project_id
      }
    });
  });
});`
        });
      }
    }, 2000);
  });
};

const SolutionGenerator = () => {
  const [businessDescription, setBusinessDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [solution, setSolution] = useState<null | {ui: string, database: string, automation: string}>(null);
  const [activeTab, setActiveTab] = useState("preview");
  const [progress, setProgress] = useState(0);
  const [examplePrompts] = useState([
    "I need a patient management system for my small clinic.",
    "We need an invoice generation tool for our accounting department.",
    "Create a project management dashboard for our marketing team."
  ]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          const increment = Math.floor(Math.random() * 10) + 1;
          return Math.min(prev + increment, 95);
        });
      }, 500);
      
      return () => clearInterval(interval);
    } else if (solution) {
      setProgress(100);
    }
  }, [isGenerating, solution]);
  
  const handleGenerate = async () => {
    if (!businessDescription.trim()) {
      toast({
        title: "Error",
        description: "Please describe your business problem first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    setSolution(null);
    
    try {
      const generatedSolution = await mockSolutionGeneration(businessDescription);
      setSolution(generatedSolution);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const useExamplePrompt = (prompt: string) => {
    setBusinessDescription(prompt);
  };
  
  return (
    <section id="generator" className="py-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build Your <span className="gradient-text">Custom SaaS Tool</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your business problem in natural language and our AI will generate a complete, customized SaaS solution for you.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-1 text-sm">
                Describe your business problem
              </p>
              <Textarea
                placeholder="I need a CRM system for my real estate business to track clients, properties, and follow-ups..."
                className="mb-4 h-32"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
              />
              
              <div className="flex flex-wrap gap-2 mb-4">
                <p className="text-sm text-gray-600 w-full md:w-auto shrink-0">Try an example:</p>
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => useExamplePrompt(prompt)}
                    className="text-sm text-brand-600 hover:text-brand-800 underline"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              
              <Button 
                className="w-full bg-brand-600 hover:bg-brand-700 text-white py-6" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Solution...
                  </>
                ) : (
                  <>
                    Generate SaaS Tool
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {(isGenerating || solution) && (
            <div className="mt-10">
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Generating solution...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-600 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              {progress === 100 && solution && (
                <>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-center mb-6">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">Solution Generated Successfully!</p>
                      <p className="text-green-600 text-sm">Preview your custom SaaS tool below or explore the code.</p>
                    </div>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="database">Database Schema</TabsTrigger>
                      <TabsTrigger value="automation">Automations</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview">
                      <Card>
                        <CardContent className="p-2">
                          <div className="border-b pb-2 mb-2 flex justify-between items-center">
                            <div className="flex space-x-1">
                              <div className="h-3 w-3 rounded-full bg-red-500"></div>
                              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                              <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs text-gray-400">Generated SaaS Preview</div>
                          </div>
                          <div className="relative border rounded-lg shadow-inner p-2 overflow-hidden bg-gray-50">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none z-10"></div>
                            <div className="p-4 overflow-auto max-h-96" dangerouslySetInnerHTML={{ __html: solution.ui }}></div>
                            <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                              <Button className="bg-brand-600 hover:bg-brand-700">
                                Unlock Full Access
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="database">
                      <Card>
                        <CardContent className="p-4">
                          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 font-mono text-sm relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 pointer-events-none z-10"></div>
                            <pre>{solution.database}</pre>
                            <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                              <Button className="bg-brand-600 hover:bg-brand-700">
                                Unlock Full Database Schema
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="automation">
                      <Card>
                        <CardContent className="p-4">
                          <div className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-auto max-h-96 font-mono text-sm relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 pointer-events-none z-10"></div>
                            <pre>{solution.automation}</pre>
                            <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                              <Button className="bg-brand-600 hover:bg-brand-700">
                                Unlock Full Automation
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SolutionGenerator;
