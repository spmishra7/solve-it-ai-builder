// Demo/offline solution service
export interface DemoSolution {
  id: string;
  title: string;
  description: string;
  business_prompt: string;
  ui_solution: string;
  database_solution: string;
  automation_solution: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

// Collection of demo solutions
const demoSolutions: DemoSolution[] = [
  {
    id: "demo-crm-solution",
    title: "Customer Relationship Management System",
    description: "A complete CRM solution for managing customer interactions, sales pipeline, and support tickets.",
    business_prompt: "I need a CRM system that helps my sales team track leads, manage customer interactions, and handle support tickets. It should have a dashboard with key metrics and allow for easy data entry.",
    ui_solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRM Dashboard</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            background-color: #f8f9fa;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid #e9ecef;
            margin-bottom: 20px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #3498db;
        }
        .user-info {
            display: flex;
            align-items: center;
        }
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #3498db;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            font-weight: bold;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .metric-card:hover {
            transform: translateY(-5px);
        }
        .metric-title {
            font-size: 14px;
            color: #6c757d;
            margin-bottom: 5px;
        }
        .metric-value {
            font-size: 28px;
            font-weight: bold;
            color: #343a40;
        }
        .metric-trend {
            font-size: 12px;
            display: flex;
            align-items: center;
        }
        .positive {
            color: #28a745;
        }
        .negative {
            color: #dc3545;
        }
        .main-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
        }
        .chart-container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .leads-container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            max-height: 400px;
            overflow-y: auto;
        }
        .chart {
            width: 100%;
            height: 300px;
            margin-top: 15px;
            position: relative;
        }
        .chart-bar {
            display: inline-block;
            width: 8%;
            margin: 0 1%;
            background-color: #3498db;
            position: absolute;
            bottom: 0;
            border-radius: 5px 5px 0 0;
            transition: height 0.5s;
        }
        .lead-item {
            padding: 15px 0;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .lead-info h4 {
            font-size: 16px;
            margin-bottom: 5px;
        }
        .lead-info p {
            font-size: 14px;
            color: #6c757d;
        }
        .lead-status {
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
        .hot {
            background-color: #ffcdd2;
            color: #c62828;
        }
        .warm {
            background-color: #fff9c4;
            color: #f9a825;
        }
        .cold {
            background-color: #e1f5fe;
            color: #0288d1;
        }
        .menu {
            margin-bottom: 30px;
            display: flex;
            gap: 10px;
        }
        .menu-button {
            padding: 10px 15px;
            background-color: white;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
        }
        .menu-button:hover {
            background-color: #f1f3f5;
        }
        .menu-button.active {
            background-color: #3498db;
            color: white;
            border-color: #3498db;
        }
        .add-lead {
            padding: 10px 15px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 5px;
            margin-left: auto;
        }
        .add-lead:hover {
            background-color: #2980b9;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo">CRM Dashboard</div>
            <div class="user-info">
                <div class="avatar">JD</div>
                <div>John Doe</div>
            </div>
        </header>
        
        <div class="menu">
            <button class="menu-button active">Dashboard</button>
            <button class="menu-button">Leads</button>
            <button class="menu-button">Customers</button>
            <button class="menu-button">Support Tickets</button>
            <button class="menu-button">Reports</button>
            <button class="add-lead">+ Add Lead</button>
        </div>
        
        <section class="metrics">
            <div class="metric-card">
                <div class="metric-title">Total Leads</div>
                <div class="metric-value">1,248</div>
                <div class="metric-trend positive">↑ 12% from last month</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">Conversion Rate</div>
                <div class="metric-value">24%</div>
                <div class="metric-trend positive">↑ 3% from last month</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">Open Tickets</div>
                <div class="metric-value">37</div>
                <div class="metric-trend negative">↑ 5% from last month</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">New Customers</div>
                <div class="metric-value">56</div>
                <div class="metric-trend positive">↑ 8% from last month</div>
            </div>
        </section>
        
        <div class="main-content">
            <div class="chart-container">
                <h3>Sales Performance (Last 12 Months)</h3>
                <div class="chart">
                    <div class="chart-bar" style="height: 40%; left: 1%"></div>
                    <div class="chart-bar" style="height: 65%; left: 10%"></div>
                    <div class="chart-bar" style="height: 85%; left: 19%"></div>
                    <div class="chart-bar" style="height: 75%; left: 28%"></div>
                    <div class="chart-bar" style="height: 60%; left: 37%"></div>
                    <div class="chart-bar" style="height: 70%; left: 46%"></div>
                    <div class="chart-bar" style="height: 90%; left: 55%"></div>
                    <div class="chart-bar" style="height: 95%; left: 64%"></div>
                    <div class="chart-bar" style="height: 80%; left: 73%"></div>
                    <div class="chart-bar" style="height: 75%; left: 82%"></div>
                    <div class="chart-bar" style="height: 65%; left: 91%"></div>
                </div>
            </div>
            
            <div class="leads-container">
                <h3>Recent Leads</h3>
                <div class="lead-item">
                    <div class="lead-info">
                        <h4>Acme Corporation</h4>
                        <p>Software Solution • $12,000</p>
                    </div>
                    <span class="lead-status hot">Hot</span>
                </div>
                <div class="lead-item">
                    <div class="lead-info">
                        <h4>Wayne Enterprises</h4>
                        <p>Security Systems • $35,000</p>
                    </div>
                    <span class="lead-status warm">Warm</span>
                </div>
                <div class="lead-item">
                    <div class="lead-info">
                        <h4>Stark Industries</h4>
                        <p>AI Integration • $85,000</p>
                    </div>
                    <span class="lead-status hot">Hot</span>
                </div>
                <div class="lead-item">
                    <div class="lead-info">
                        <h4>Umbrella Corp</h4>
                        <p>Data Services • $9,500</p>
                    </div>
                    <span class="lead-status cold">Cold</span>
                </div>
                <div class="lead-item">
                    <div class="lead-info">
                        <h4>Nakatomi Trading</h4>
                        <p>Cloud Migration • $28,000</p>
                    </div>
                    <span class="lead-status warm">Warm</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Simple animation for the chart
        document.addEventListener('DOMContentLoaded', function() {
            const bars = document.querySelectorAll('.chart-bar');
            setTimeout(() => {
                bars.forEach(bar => {
                    const height = bar.style.height;
                    bar.style.height = '0';
                    setTimeout(() => {
                        bar.style.height = height;
                    }, 300);
                });
            }, 500);
            
            // Add click handler to menu buttons
            const menuButtons = document.querySelectorAll('.menu-button');
            menuButtons.forEach(button => {
                button.addEventListener('click', function() {
                    menuButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Add lead button handler
            document.querySelector('.add-lead').addEventListener('click', function() {
                alert('Add Lead form would appear here');
            });
        });
    </script>
</body>
</html>`,
    database_solution: `-- Customers table to store customer information
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_first_name VARCHAR(100),
    contact_last_name VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100),
    industry VARCHAR(100),
    customer_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_to UUID REFERENCES auth.users(id)
);

-- Leads table for tracking potential customers
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_first_name VARCHAR(100),
    contact_last_name VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100),
    industry VARCHAR(100),
    lead_source VARCHAR(100),
    lead_status VARCHAR(50) NOT NULL,
    lead_score INT,
    estimated_value DECIMAL(12, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_to UUID REFERENCES auth.users(id)
);

-- Interactions table for tracking all customer interactions
CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,
    interaction_type VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    interaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    customer_id INT REFERENCES customers(id),
    lead_id INT REFERENCES leads(id),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Opportunities (deals) table for tracking sales pipeline
CREATE TABLE opportunities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    customer_id INT REFERENCES customers(id),
    lead_id INT REFERENCES leads(id),
    stage VARCHAR(50) NOT NULL,
    amount DECIMAL(12, 2),
    probability INT,
    expected_close_date DATE,
    actual_close_date DATE,
    won_lost VARCHAR(10),
    reason_lost TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_to UUID REFERENCES auth.users(id)
);

-- Support tickets table
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    customer_id INT REFERENCES customers(id) NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    assigned_to UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_leads_status ON leads(lead_status);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_customer_id ON tickets(customer_id);

-- Optional: Create a view for dashboard metrics
CREATE VIEW dashboard_metrics AS
SELECT
    (SELECT COUNT(*) FROM leads) AS total_leads,
    (SELECT COUNT(*) FROM leads WHERE lead_status = 'Hot') AS hot_leads,
    (SELECT COUNT(*) FROM opportunities WHERE stage NOT IN ('Closed Won', 'Closed Lost')) AS open_opportunities,
    (SELECT SUM(amount) FROM opportunities WHERE stage = 'Closed Won') AS total_won_amount,
    (SELECT COUNT(*) FROM tickets WHERE status != 'Resolved') AS open_tickets;
`,
    automation_solution: `// Lead Scoring Automation
async function calculateLeadScore(leadId) {
  // Get lead details
  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();
    
  if (error) throw error;
  
  let score = 0;
  
  // Scoring based on company size and estimated value
  if (lead.estimated_value > 50000) score += 30;
  else if (lead.estimated_value > 10000) score += 20;
  else score += 10;
  
  // Scoring based on interaction count
  const { count: interactionCount, error: interactionError } = await supabase
    .from('interactions')
    .select('*', { count: 'exact' })
    .eq('lead_id', leadId);
    
  if (interactionError) throw interactionError;
  
  if (interactionCount > 5) score += 30;
  else if (interactionCount > 2) score += 15;
  else score += 5;
  
  // Update lead score
  const { error: updateError } = await supabase
    .from('leads')
    .update({ lead_score: score })
    .eq('id', leadId);
    
  if (updateError) throw updateError;
  
  // Categorize lead based on score
  let status = 'Cold';
  if (score >= 50) status = 'Hot';
  else if (score >= 30) status = 'Warm';
  
  // Update lead status if score changes category
  if (status !== lead.lead_status) {
    const { error: statusUpdateError } = await supabase
      .from('leads')
      .update({ lead_status: status })
      .eq('id', leadId);
      
    if (statusUpdateError) throw statusUpdateError;
    
    // Notify sales rep about lead status change
    await notifySalesRep(lead.assigned_to, leadId, status);
  }
  
  return { score, status };
}

// Follow-up Reminder Automation
function scheduleFollowUp(userId, leadId, daysToFollow) {
  return cron('0 9 * * *', async () => {
    // Get leads that need follow up
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() - daysToFollow);
    
    const { data: interactions, error } = await supabase
      .from('interactions')
      .select('lead_id, MAX(interaction_date) as last_interaction')
      .eq('lead_id', leadId)
      .group('lead_id')
      .single();
      
    if (error) throw error;
    
    // If last interaction is older than the specified days
    if (new Date(interactions.last_interaction) < followUpDate) {
      // Create notification for the user
      await createNotification({
        user_id: userId,
        title: 'Lead Follow-Up Reminder',
        message: `It's been ${daysToFollow} days since your last interaction with lead #${leadId}.`,
        type: 'follow-up',
        reference_id: leadId
      });
      
      // Optionally send an email
      await sendFollowUpEmail(userId, leadId);
    }
  });
}

// Customer activity monitoring
async function trackCustomerActivity(customerId, activityType, details) {
  // Record the activity
  const { error } = await supabase
    .from('interactions')
    .insert({
      interaction_type: activityType,
      subject: 'Customer activity tracked',
      description: JSON.stringify(details),
      customer_id: customerId,
      created_by: 'system'
    });
    
  if (error) throw error;
  
  // Check if activity triggers any automation
  switch (activityType) {
    case 'support_request':
      await createSupportTicket(customerId, details);
      break;
    case 'high_value_purchase':
      await notifyAccountManager(customerId, details);
      break;
    case 'feedback':
      await processFeedback(customerId, details);
      break;
  }
}

// Support ticket escalation
async function checkTicketEscalation() {
  return cron('0 * * * *', async () => {
    // Find tickets that need escalation
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .in('status', ['Open', 'In Progress'])
      .is('escalated', false)
      .lt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
      
    if (error) throw error;
    
    // Escalate each ticket
    for (const ticket of tickets) {
      // Update ticket status
      const { error: updateError } = await supabase
        .from('tickets')
        .update({ 
          escalated: true,
          priority: 'High'
        })
        .eq('id', ticket.id);
        
      if (updateError) throw updateError;
      
      // Notify manager
      await notifyManager(ticket);
    }
  });
}

// Helper function to send notifications
async function createNotification(notificationData) {
  const { error } = await supabase
    .from('notifications')
    .insert(notificationData);
    
  if (error) throw error;
}`,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo-task-management",
    title: "Team Task Management System",
    description: "A collaborative task management system for teams to track projects, assign tasks, and monitor progress.",
    business_prompt: "Our team needs a task management system where we can create projects, assign tasks to team members, track progress, and set deadlines. We want to see a dashboard with upcoming deadlines and project status.",
    ui_solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Management Dashboard</title>
    <style>
        :root {
            --primary: #6366f1;
            --primary-light: #818cf8;
            --primary-dark: #4f46e5;
            --success: #22c55e;
            --warning: #eab308;
            --danger: #ef4444;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-300: #d1d5db;
            --gray-400: #9ca3af;
            --gray-500: #6b7280;
            --gray-600: #4b5563;
            --gray-700: #374151;
            --gray-800: #1f2937;
            --gray-900: #111827;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f9fafb;
            color: var(--gray-800);
            line-height: 1.5;
        }
        
        .container {
            display: grid;
            grid-template-columns: 240px 1fr;
            min-height: 100vh;
        }
        
        /* Sidebar */
        .sidebar {
            background-color: white;
            border-right: 1px solid var(--gray-200);
            padding: 1.5rem 1rem;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-bottom: 1.5rem;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid var(--gray-200);
        }
        
        .logo-icon {
            height: 2rem;
            width: 2rem;
            background-color: var(--primary);
            color: white;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .logo-text {
            font-weight: 600;
            font-size: 1.25rem;
            color: var(--gray-800);
        }
        
        .nav-section {
            margin-bottom: 1.5rem;
        }
        
        .nav-title {
            text-transform: uppercase;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--gray-500);
            margin-bottom: 0.75rem;
            padding-left: 0.5rem;
        }
        
        .nav-items {
            list-style: none;
        }
        
        .nav-item {
            margin-bottom: 0.25rem;
        }
        
        .nav-link {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border-radius: 0.375rem;
            color: var(--gray-700);
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s;
        }
        
        .nav-link:hover, .nav-link.active {
            background-color: var(--gray-100);
            color: var(--primary);
        }
        
        .nav-icon {
            margin-right: 0.75rem;
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
        }
        
        .team-section {
            margin-top: 2rem;
        }
        
        .team-member {
            display: flex;
            align-items: center;
            padding: 0.5rem;
            border-radius: 0.375rem;
            margin-bottom: 0.5rem;
        }
        
        .avatar {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background-color: var(--gray-300);
            color: var(--gray-700);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            margin-right: 0.75rem;
            font-size: 0.875rem;
        }
        
        .team-member-status {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            margin-left: auto;
        }
        
        .status-online {
            background-color: var(--success);
        }
        
        .status-offline {
            background-color: var(--gray-400);
        }
        
        /* Main content */
        .main-content {
            padding: 1.5rem;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .header h1 {
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .search-bar {
            position: relative;
            width: 20rem;
        }
        
        .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray-500);
        }
        
        .search-input {
            width: 100%;
            padding: 0.625rem;
            padding-left: 2.5rem;
            border: 1px solid var(--gray-300);
            border-radius: 0.375rem;
            font-size: 0.875rem;
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        
        .action-buttons {
            display: flex;
            gap: 0.5rem;
        }
        
        .btn {
            padding: 0.625rem 1.25rem;
            border: none;
            border-radius: 0.375rem;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }
        
        .btn-primary {
            background-color: var(--primary);
            color: white;
        }
        
        .btn-primary:hover {
            background-color: var(--primary-dark);
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .stat-card {
            background-color: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .stat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .stat-icon {
            width: 2.5rem;
            height: 2.5rem;
            background-color: var(--primary-light);
            color: white;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
        
        .stat-title {
            font-weight: 500;
            color: var(--gray-600);
            font-size: 0.875rem;
        }
        
        .stat-value {
            font-size: 1.875rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .stat-change {
            font-size: 0.75rem;
            display: flex;
            align-items: center;
        }
        
        .stat-positive {
            color: var(--success);
        }
        
        .stat-negative {
            color: var(--danger);
        }
        
        .tasks-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        .tasks-column {
            background-color: white;
            border-radius: 0.5rem;
            padding: 1.25rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .column-header {
            display: flex;
            justify-content: space-between;
            align-
