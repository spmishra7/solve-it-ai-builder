
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type ExpertRole = 'ceo' | 'cfo' | 'product' | 'designer' | 'engineer' | 'security' | 'qa';

interface RequestData {
  businessPrompt: string;
  selectedRoles: ExpertRole[];
}

interface SolutionResponse {
  ui: string;
  database: string;
  automation: string;
  expertInsights?: Record<string, string>;
  errorCorrection?: {
    enabled: boolean;
    autoFix: boolean;
  };
}

// Dedicated error handling and correction system
class ErrorHandler {
  static detectErrors(code: string, type: 'ui' | 'database' | 'automation'): string[] {
    // In a real implementation, this would use more sophisticated error detection
    const errors: string[] = [];
    
    if (type === 'ui') {
      if (!code.includes('</div>') && code.includes('<div')) {
        errors.push('Unclosed div tags detected');
      }
      if (code.includes('undefined') || code.includes('null')) {
        errors.push('Possible undefined or null references');
      }
    }
    
    if (type === 'database') {
      if (code.includes('CREATE TABLE') && !code.includes('PRIMARY KEY')) {
        errors.push('Table missing primary key');
      }
      if (code.includes('REFERENCES') && !code.includes('FOREIGN KEY')) {
        errors.push('Potential foreign key constraint issue');
      }
    }
    
    if (type === 'automation') {
      if (code.includes('forEach') && !code.includes('try') && !code.includes('catch')) {
        errors.push('Missing error handling in loops');
      }
      if (code.includes('db.query') && !code.includes('try')) {
        errors.push('Missing error handling in database queries');
      }
    }
    
    return errors;
  }
  
  static fixErrors(code: string, errors: string[], type: 'ui' | 'database' | 'automation'): string {
    // In a real implementation, this would attempt to fix detected errors
    let fixedCode = code;
    
    if (type === 'ui') {
      if (errors.includes('Unclosed div tags detected')) {
        // Simple fix: count opening and closing div tags and add missing ones
        const openingCount = (code.match(/<div/g) || []).length;
        const closingCount = (code.match(/<\/div>/g) || []).length;
        const diff = openingCount - closingCount;
        
        if (diff > 0) {
          fixedCode = code + '\n' + '</div>'.repeat(diff) + '\n<!-- Auto-fixed: Added closing div tags -->';
        }
      }
    }
    
    if (type === 'database') {
      if (errors.includes('Table missing primary key')) {
        // This is just a demonstration - in reality, would need more complex analysis
        fixedCode = code.replace(/CREATE TABLE (\w+) \(/g, 'CREATE TABLE $1 (\n  id SERIAL PRIMARY KEY,');
        fixedCode += '\n-- Auto-fixed: Added primary key';
      }
    }
    
    if (type === 'automation') {
      if (errors.includes('Missing error handling in database queries')) {
        // Simple fix: wrap db.query calls in try/catch
        fixedCode = fixedCode.replace(/(\w+\s*=\s*)db\.query/g, 
          'try {\n  $1db.query');
        fixedCode = fixedCode.replace(/;(\s*\n\s*(?!catch))/g, 
          ';\n} catch (error) {\n  console.error("Database query error:", error);\n}$1');
        fixedCode += '\n// Auto-fixed: Added error handling';
      }
    }
    
    return fixedCode;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { businessPrompt, selectedRoles } = await req.json() as RequestData;
    
    if (!businessPrompt) {
      return new Response(
        JSON.stringify({ error: "Business description is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Generating solution for prompt: ${businessPrompt}`);
    console.log(`Selected roles: ${selectedRoles.join(', ')}`);
    
    // For now, return mock data as we haven't integrated with OpenAI
    // In a production implementation, this would call OpenAI, Claude, or another LLM
    const mockResponse = generateMockSolution(businessPrompt, selectedRoles);
    
    // Check for errors in the generated code and fix them automatically
    const uiErrors = ErrorHandler.detectErrors(mockResponse.ui, 'ui');
    const dbErrors = ErrorHandler.detectErrors(mockResponse.database, 'database');
    const automationErrors = ErrorHandler.detectErrors(mockResponse.automation, 'automation');
    
    if (uiErrors.length > 0 || dbErrors.length > 0 || automationErrors.length > 0) {
      console.log("Detected errors:", { uiErrors, dbErrors, automationErrors });
      
      // Auto-fix errors
      mockResponse.ui = ErrorHandler.fixErrors(mockResponse.ui, uiErrors, 'ui');
      mockResponse.database = ErrorHandler.fixErrors(mockResponse.database, dbErrors, 'database');
      mockResponse.automation = ErrorHandler.fixErrors(mockResponse.automation, automationErrors, 'automation');
      
      // Add error correction metadata
      mockResponse.errorCorrection = {
        enabled: true,
        autoFix: true
      };
    }
    
    return new Response(
      JSON.stringify(mockResponse),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in generate-solution function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Mock solution generator
function generateMockSolution(prompt: string, selectedRoles: ExpertRole[] = []): SolutionResponse {
  // Simplified mock implementation
  const firstWord = prompt.split(' ')[0].toLowerCase();
  
  // Generate expert insights if roles are selected
  const expertInsights: Record<string, string> = {};
  
  if (selectedRoles.includes('ceo')) {
    expertInsights.ceo = "This solution offers strong market positioning with potential for scalable growth. Consider implementing a tiered pricing model to capture different market segments.";
  }
  
  if (selectedRoles.includes('cfo')) {
    expertInsights.cfo = "Initial development costs will be offset by an estimated 30% reduction in operational expenses. ROI projections indicate profitability within 8-12 months of deployment.";
  }
  
  if (selectedRoles.includes('product')) {
    expertInsights.product = "Prioritize user onboarding and dashboard customization features for initial release. Consider implementing A/B testing to optimize user engagement metrics.";
  }
  
  if (selectedRoles.includes('designer')) {
    expertInsights.designer = "The interface focuses on clarity and ease of use. Consider implementing dark mode and accessibility features to enhance user experience across different contexts.";
  }
  
  if (selectedRoles.includes('engineer')) {
    expertInsights.engineer = "Architecture optimized for lightweight resource usage. Consider implementing code splitting and lazy loading to improve performance and reduce bundle size.";
  }
  
  if (selectedRoles.includes('security')) {
    expertInsights.security = "Implementation follows OWASP security guidelines. Regular security audits and data encryption at rest and in transit are implemented.";
  }
  
  if (selectedRoles.includes('qa')) {
    expertInsights.qa = "Automated testing suite provides 94% code coverage. Error boundaries and fallback UI components ensure graceful error handling.";
  }
  
  // Generate custom solution based on prompt keywords
  if (firstWord.includes('patient') || firstWord.includes('health') || firstWord.includes('doctor')) {
    return {
      ui: generateHealthcareUI(prompt),
      database: generateHealthcareDB(),
      automation: generateHealthcareAutomation(),
      expertInsights
    };
  } else if (firstWord.includes('invoice') || firstWord.includes('finance') || firstWord.includes('payment')) {
    return {
      ui: generateFinanceUI(prompt),
      database: generateFinanceDB(),
      automation: generateFinanceAutomation(),
      expertInsights
    };
  } else {
    // Default response
    return {
      ui: generateDefaultUI(prompt),
      database: generateDefaultDB(),
      automation: generateDefaultAutomation(),
      expertInsights
    };
  }
}

// Mock helper functions for healthcare domain
function generateHealthcareUI(prompt: string): string {
  // Simplified mock implementation
  return `<div class="p-5 bg-white rounded-lg shadow">
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
  </div>`;
}

function generateHealthcareDB(): string {
  return `-- Patients Table
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
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP NOT NULL,
  reason VARCHAR(255),
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical Records Table
CREATE TABLE medical_records (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  record_date DATE NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  prescription TEXT,
  doctor_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add error correction logic with triggers
CREATE OR REPLACE FUNCTION validate_appointment_date()
RETURNS TRIGGER AS $$
BEGIN
  -- Basic validation: appointment can't be in the past
  IF NEW.appointment_date < NOW() THEN
    -- Auto-fix: set to tomorrow at same time
    NEW.appointment_date := NOW() + INTERVAL '1 day';
    -- Log the change
    INSERT INTO system_logs (action, entity_type, entity_id, details)
    VALUES ('AUTO_FIX', 'APPOINTMENT', NEW.id, 'Fixed past appointment date');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_appointment_insert
  BEFORE INSERT OR UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION validate_appointment_date();`;
}

function generateHealthcareAutomation(): string {
  return `// Weekly Patient Report Generation
try {
  schedule.weekly(() => {
    try {
      // Get all patient activity from the past week
      const patients = db.query('SELECT * FROM patients WHERE created_at > now() - interval \\'7 days\\'');
      const appointments = db.query('SELECT * FROM appointments WHERE appointment_date > now() - interval \\'7 days\\'');
      
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
    } catch (error) {
      console.error("Error generating weekly report:", error);
      // Send error notification to admin
      email.send({
        to: 'admin@healthcare.com',
        subject: 'ERROR: Weekly Report Generation Failed',
        body: \`The weekly report generation failed with error: \${error.message}\`
      });
    }
  });
} catch (error) {
  console.error("Error setting up schedule:", error);
}

// Appointment Reminders with error recovery
try {
  schedule.daily(() => {
    try {
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
        try {
          sms.send({
            to: appointment.phone,
            body: \`Hi \${appointment.first_name}, reminder of your appointment tomorrow at \${formatTime(appointment.appointment_date)}. Reply CONFIRM to confirm or CANCEL to cancel.\`
          });
        } catch (smsError) {
          console.error(\`SMS error for patient \${appointment.id}: \${smsError.message}\`);
          // Fallback to email if SMS fails
          email.send({
            to: appointment.email,
            subject: 'Appointment Reminder',
            body: \`<h1>Appointment Reminder</h1><p>Dear \${appointment.first_name},</p><p>This is a reminder of your appointment scheduled for tomorrow at \${formatTime(appointment.appointment_date)}.</p>\`
          });
        }
        
        // Also send email
        try {
          email.send({
            to: appointment.email,
            subject: 'Appointment Reminder',
            body: \`<h1>Appointment Reminder</h1><p>Dear \${appointment.first_name},</p><p>This is a reminder of your appointment scheduled for \${formatDate(appointment.appointment_date)} at \${formatTime(appointment.appointment_date)}.</p><p>Please click <a href="https://healthcare.com/confirm/\${appointment.id}">here</a> to confirm your appointment.</p>\`
          });
        } catch (emailError) {
          console.error(\`Email error for patient \${appointment.id}: \${emailError.message}\`);
          // Log failed communications for manual follow-up
          db.query('INSERT INTO failed_communications (patient_id, appointment_id, type, error_message) VALUES ($1, $2, $3, $4)',
            [appointment.patient_id, appointment.id, 'email', emailError.message]);
        }
      });
    } catch (error) {
      console.error("Error in appointment reminder system:", error);
      // Alert system administrator
      email.send({
        to: 'sysadmin@healthcare.com',
        subject: 'ERROR: Appointment Reminder System Failure',
        body: \`The appointment reminder system encountered an error: \${error.message}\`
      });
    }
  });
} catch (scheduleError) {
  console.error("Fatal scheduling error:", scheduleError);
}`;
}

// Mock helper functions for finance domain
function generateFinanceUI(prompt: string): string {
  return `<div class="p-6 bg-white rounded-lg shadow-lg">
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
  </div>`;
}

function generateFinanceDB(): string {
  return `-- Clients Table
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
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
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
  invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
  payment_date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Error logging table
CREATE TABLE error_logs (
  id SERIAL PRIMARY KEY,
  error_type VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INTEGER,
  error_message TEXT,
  stack_trace TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Auto-correction triggers
CREATE OR REPLACE FUNCTION validate_invoice_amounts()
RETURNS TRIGGER AS $$
BEGIN
  -- Verify tax calculations
  IF NEW.tax_amount != ROUND(NEW.subtotal * NEW.tax_rate / 100, 2) THEN
    -- Auto-fix tax amount
    NEW.tax_amount := ROUND(NEW.subtotal * NEW.tax_rate / 100, 2);
  END IF;
  
  -- Verify total amount
  IF NEW.total_amount != ROUND(NEW.subtotal + NEW.tax_amount - NEW.discount_amount, 2) THEN
    -- Auto-fix total amount
    NEW.total_amount := ROUND(NEW.subtotal + NEW.tax_amount - NEW.discount_amount, 2);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_invoice_save
  BEFORE INSERT OR UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION validate_invoice_amounts();`;
}

function generateFinanceAutomation(): string {
  return `// Invoice Due Reminders with error recovery
try {
  schedule.daily(() => {
    try {
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
        try {
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
        } catch (error) {
          console.error(\`Email error for invoice \${invoice.id}: \${error.message}\`);
          // Log failed email
          db.query('INSERT INTO error_logs (error_type, entity_type, entity_id, error_message) VALUES ($1, $2, $3, $4)',
            ['EMAIL_SEND', 'INVOICE', invoice.id, error.message]);
        }
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
        try {
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
        } catch (error) {
          console.error(\`Email error for overdue invoice \${invoice.id}: \${error.message}\`);
          // Log failed email
          db.query('INSERT INTO error_logs (error_type, entity_type, entity_id, error_message) VALUES ($1, $2, $3, $4)',
            ['EMAIL_SEND', 'INVOICE_OVERDUE', invoice.id, error.message]);
        }
      });
    } catch (error) {
      console.error("Error in invoice reminder system:", error);
      // Alert finance team
      email.send({
        to: 'finance@company.com',
        subject: 'ERROR: Invoice Reminder System Failure',
        body: \`The invoice reminder system encountered an error: \${error.message}\nPlease check the system status.\`
      });
    }
  });
} catch (scheduleError) {
  console.error("Fatal scheduling error:", scheduleError);
}

// Self-healing Monthly Revenue Reports
try {
  const MAX_RETRIES = 3;
  let retryCount = 0;
  
  const generateMonthlyReport = async () => {
    try {
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
      
      // Reset retry count on success
      retryCount = 0;
      
      // Generate PDF report
      const report = generatePDF({
        title: 'Monthly Revenue Report',
        period: \`\${formatDate(startDate)} - \${formatDate(endDate)}\`,
        data: {
          revenue: revenueData[0]
        }
      });
      
      // Email report to finance team
      email.send({
        to: 'finance@company.com',
        subject: \`Monthly Revenue Report: \${formatMonthYear(startDate)}\`,
        body: 'Please find attached the monthly revenue report.',
        attachments: [report]
      });
    } catch (error) {
      console.error(\`Monthly report error (attempt \${retryCount + 1}): \${error.message}\`);
      
      if (retryCount < MAX_RETRIES) {
        // Self-healing: retry after exponential backoff
        retryCount++;
        const delay = 1000 * Math.pow(2, retryCount); // 2, 4, 8 seconds
        
        console.log(\`Retrying in \${delay/1000} seconds...\`);
        setTimeout(generateMonthlyReport, delay);
      } else {
        // Alert after max retries
        email.send({
          to: 'sysadmin@company.com',
          subject: 'CRITICAL: Monthly Report Generation Failed',
          body: \`The monthly report generation failed after \${MAX_RETRIES} attempts.\nLast error: \${error.message}\`
        });
      }
    }
  };
  
  schedule.monthly(generateMonthlyReport);
} catch (scheduleError) {
  console.error("Fatal scheduling error:", scheduleError);
}`;
}

// Default mock data generation
function generateDefaultUI(prompt: string): string {
  return `<div class="p-6 bg-white rounded-lg shadow-lg">
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
  </div>`;
}

function generateDefaultDB(): string {
  return `-- Users Table
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
  owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deadline DATE
);

-- Project Members Table
CREATE TABLE project_members (
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (project_id, user_id)
);

-- Tasks Table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'medium',
  assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date DATE
);

-- Task Comments Table
CREATE TABLE task_comments (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs Table
CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INTEGER NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System health monitoring
CREATE TABLE system_metrics (
  id SERIAL PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC NOT NULL,
  metadata JSONB,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Error tracking and recovery
CREATE TABLE system_errors (
  id SERIAL PRIMARY KEY,
  error_type VARCHAR(100) NOT NULL,
  component VARCHAR(100) NOT NULL,
  error_message TEXT,
  stack_trace TEXT,
  status VARCHAR(50) DEFAULT 'new',
  recovery_attempts INT DEFAULT 0,
  last_recovery_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
}

function generateDefaultAutomation(): string {
  return `// Self-healing Daily Digest Emails
try {
  schedule.daily(() => {
    try {
      // Get all active users
      const users = db.query('SELECT * FROM users WHERE role != \\'inactive\\'');
      let processedUsers = 0;
      
      users.forEach(user => {
        try {
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
          
          // Only send email if there's relevant content
          if (tasks.length > 0 || projects.length > 0) {
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
              \`
            });
          }
          
          processedUsers++;
          
          // Create checkpoint after every 50 users
          if (processedUsers % 50 === 0) {
            db.query('INSERT INTO system_metrics (metric_name, metric_value, metadata) VALUES ($1, $2, $3)',
              ['email_digest_progress', processedUsers, { total: users.length }]);
          }
        } catch (userError) {
          console.error(\`Error processing digest for user \${user.id}: \${userError.message}\`);
          // Log individual user errors but continue with others
          db.query('INSERT INTO system_errors (error_type, component, error_message) VALUES ($1, $2, $3)',
            ['USER_DIGEST', 'email_system', userError.message]);
        }
      });
      
      // Log completion metrics
      db.query('INSERT INTO system_metrics (metric_name, metric_value, metadata) VALUES ($1, $2, $3)',
        ['email_digest_completed', processedUsers, { total: users.length, success_rate: processedUsers / users.length }]);
      
    } catch (error) {
      console.error("Error in digest system:", error);
      
      // Record error
      db.query('INSERT INTO system_errors (error_type, component, error_message, stack_trace) VALUES ($1, $2, $3, $4)',
        ['DIGEST_SYSTEM', 'scheduler', error.message, error.stack]);
      
      // Alert system administrator
      email.send({
        to: 'sysadmin@company.com',
        subject: 'ERROR: Daily Digest System Failure',
        body: \`The daily digest system encountered an error: \${error.message}\nStack trace: \${error.stack}\`
      });
    }
  });
} catch (scheduleError) {
  console.error("Fatal scheduling error:", scheduleError);
}

// Auto-recovery system
try {
  schedule.hourly(() => {
    try {
      // Find errors that need recovery attempts
      const recoverable = db.query(\`
        SELECT * FROM system_errors 
        WHERE status = 'new' OR (status = 'recovery_failed' AND recovery_attempts < 3)
        ORDER BY created_at ASC
        LIMIT 10
      \`);
      
      recoverable.forEach(error => {
        try {
          console.log(\`Attempting recovery for error \${error.id} (attempt \${error.recovery_attempts + 1})\`);
          
          // Update recovery attempt count
          db.query('UPDATE system_errors SET recovery_attempts = $1, last_recovery_at = NOW() WHERE id = $2',
            [error.recovery_attempts + 1, error.id]);
          
          // Attempt recovery based on error type
          if (error.component === 'email_system') {
            // Try to resend failed emails
            if (error.metadata && error.metadata.user_id) {
              // Regenerate and send specific user digest
              console.log(\`Regenerating digest for user \${error.metadata.user_id}\`);
              // Recovery implementation would go here
              
              // Mark as recovered if successful
              db.query('UPDATE system_errors SET status = $1 WHERE id = $2',
                ['recovered', error.id]);
            }
          } else if (error.component === 'database') {
            // Database recovery logic would go here
            console.log('Attempting database recovery');
            // Recovery implementation would go here
            
            // Mark as recovered if successful
            db.query('UPDATE system_errors SET status = $1 WHERE id = $2',
              ['recovered', error.id]);
          }
        } catch (recoveryError) {
          console.error(\`Recovery failed for error \${error.id}: \${recoveryError.message}\`);
          
          // Update status to recovery_failed
          db.query('UPDATE system_errors SET status = $1 WHERE id = $2',
            ['recovery_failed', error.id]);
        }
      });
      
      // Generate recovery report
      const stats = db.query(\`
        SELECT 
          status, 
          COUNT(*) as count
        FROM system_errors
        WHERE last_recovery_at > NOW() - INTERVAL '1 hour'
        GROUP BY status
      \`);
      
      if (stats && stats.length > 0) {
        console.log('Recovery stats for past hour:', stats);
      }
      
    } catch (error) {
      console.error("Error in recovery system:", error);
    }
  });
} catch (scheduleError) {
  console.error("Fatal recovery system error:", scheduleError);
}`;
}
