
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
        message: "It's been " + daysToFollow + " days since your last interaction with lead #" + leadId + ".",
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
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--gray-200);
        }
        
        .column-title {
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        
        .column-count {
            background-color: var(--gray-100);
            color: var(--gray-700);
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            margin-left: 0.5rem;
        }
        
        .column-to-do .column-title {
            color: var(--gray-700);
        }
        
        .column-in-progress .column-title {
            color: var(--primary);
        }
        
        .column-done .column-title {
            color: var(--success);
        }
        
        .task-card {
            background-color: var(--gray-50);
            border-radius: 0.375rem;
            padding: 1rem;
            margin-bottom: 0.75rem;
            border-left: 4px solid transparent;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .task-card-high {
            border-left-color: var(--danger);
        }
        
        .task-card-medium {
            border-left-color: var(--warning);
        }
        
        .task-card-low {
            border-left-color: var(--success);
        }
        
        .task-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        
        .task-priority {
            font-size: 0.75rem;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-weight: 500;
        }
        
        .priority-high {
            background-color: rgba(239, 68, 68, 0.1);
            color: var(--danger);
        }
        
        .priority-medium {
            background-color: rgba(234, 179, 8, 0.1);
            color: var(--warning);
        }
        
        .priority-low {
            background-color: rgba(34, 197, 94, 0.1);
            color: var(--success);
        }
        
        .task-title {
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .task-description {
            font-size: 0.875rem;
            color: var(--gray-600);
            margin-bottom: 1rem;
        }
        
        .task-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.75rem;
            color: var(--gray-500);
        }
        
        .task-meta {
            display: flex;
            gap: 0.75rem;
        }
        
        .task-meta-item {
            display: flex;
            align-items: center;
        }
        
        .task-meta-icon {
            margin-right: 0.25rem;
        }
        
        .task-assignees {
            display: flex;
        }
        
        .task-assignee {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background-color: var(--gray-300);
            color: var(--gray-700);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.625rem;
            font-weight: 600;
            margin-left: -0.25rem;
            border: 1px solid white;
        }
        
        .task-assignee:first-child {
            margin-left: 0;
        }
        
        @media (max-width: 1024px) {
            .container {
                grid-template-columns: 1fr;
            }
            
            .sidebar {
                display: none;
            }
            
            .tasks-container {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <aside class="sidebar">
            <div class="logo">
                <div class="logo-icon">T</div>
                <div class="logo-text">TaskBoard</div>
            </div>
            
            <nav class="nav-section">
                <div class="nav-title">Menu</div>
                <ul class="nav-items">
                    <li class="nav-item">
                        <a href="#" class="nav-link active">
                            <span class="nav-icon">📊</span>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <span class="nav-icon">📝</span>
                            Tasks
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <span class="nav-icon">📅</span>
                            Calendar
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <span class="nav-icon">📈</span>
                            Reports
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div class="nav-section">
                <div class="nav-title">Projects</div>
                <ul class="nav-items">
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <span class="nav-icon">🚀</span>
                            Website Redesign
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <span class="nav-icon">📱</span>
                            Mobile App
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <span class="nav-icon">📢</span>
                            Marketing Campaign
                        </a>
                    </li>
                </ul>
            </div>
            
            <div class="team-section">
                <div class="nav-title">Team</div>
                <div class="team-member">
                    <div class="avatar">JD</div>
                    <div class="team-member-name">John Doe</div>
                    <div class="team-member-status status-online"></div>
                </div>
                <div class="team-member">
                    <div class="avatar">JS</div>
                    <div class="team-member-name">Jane Smith</div>
                    <div class="team-member-status status-online"></div>
                </div>
                <div class="team-member">
                    <div class="avatar">RJ</div>
                    <div class="team-member-name">Robert Johnson</div>
                    <div class="team-member-status status-offline"></div>
                </div>
                <div class="team-member">
                    <div class="avatar">AL</div>
                    <div class="team-member-name">Amy Lee</div>
                    <div class="team-member-status status-offline"></div>
                </div>
            </div>
        </aside>
        
        <main class="main-content">
            <header class="header">
                <h1>Project Dashboard</h1>
                
                <div class="search-bar">
                    <span class="search-icon">🔍</span>
                    <input type="text" class="search-input" placeholder="Search tasks...">
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-primary">
                        <span>+</span> Add Task
                    </button>
                </div>
            </header>
            
            <section class="stats">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon">📝</div>
                        <div class="stat-title">Total Tasks</div>
                    </div>
                    <div class="stat-value">42</div>
                    <div class="stat-change stat-positive">↑ 8% from last week</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon">✅</div>
                        <div class="stat-title">Completed</div>
                    </div>
                    <div class="stat-value">18</div>
                    <div class="stat-change stat-positive">↑ 12% from last week</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon">⏰</div>
                        <div class="stat-title">In Progress</div>
                    </div>
                    <div class="stat-value">15</div>
                    <div class="stat-change stat-negative">↓ 3% from last week</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon">⚠️</div>
                        <div class="stat-title">Due Soon</div>
                    </div>
                    <div class="stat-value">7</div>
                    <div class="stat-change stat-negative">↑ 15% from last week</div>
                </div>
            </section>
            
            <section class="tasks-container">
                <div class="tasks-column column-to-do">
                    <div class="column-header">
                        <h3 class="column-title">To Do <span class="column-count">5</span></h3>
                    </div>
                    
                    <div class="task-card task-card-high">
                        <div class="task-header">
                            <span class="task-priority priority-high">High</span>
                        </div>
                        <h4 class="task-title">Design Homepage Wireframes</h4>
                        <p class="task-description">Create wireframe designs for the new homepage layout.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">📅</span>
                                    May 10
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">AL</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="task-card task-card-medium">
                        <div class="task-header">
                            <span class="task-priority priority-medium">Medium</span>
                        </div>
                        <h4 class="task-title">Competitor Analysis</h4>
                        <p class="task-description">Research competitors and create a comparison report.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">📅</span>
                                    May 12
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">JS</div>
                                <div class="task-assignee">RJ</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="task-card task-card-low">
                        <div class="task-header">
                            <span class="task-priority priority-low">Low</span>
                        </div>
                        <h4 class="task-title">Update Documentation</h4>
                        <p class="task-description">Update the existing documentation with new features.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">📅</span>
                                    May 15
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">JD</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tasks-column column-in-progress">
                    <div class="column-header">
                        <h3 class="column-title">In Progress <span class="column-count">3</span></h3>
                    </div>
                    
                    <div class="task-card task-card-high">
                        <div class="task-header">
                            <span class="task-priority priority-high">High</span>
                        </div>
                        <h4 class="task-title">Backend API Development</h4>
                        <p class="task-description">Implement REST API endpoints for the user module.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">📅</span>
                                    May 8
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">JD</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="task-card task-card-medium">
                        <div class="task-header">
                            <span class="task-priority priority-medium">Medium</span>
                        </div>
                        <h4 class="task-title">User Testing Preparation</h4>
                        <p class="task-description">Prepare test scenarios and recruit users for testing.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">📅</span>
                                    May 14
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">AL</div>
                                <div class="task-assignee">JS</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="task-card task-card-medium">
                        <div class="task-header">
                            <span class="task-priority priority-medium">Medium</span>
                        </div>
                        <h4 class="task-title">Create Marketing Assets</h4>
                        <p class="task-description">Design social media graphics and email templates.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">📅</span>
                                    May 11
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">RJ</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tasks-column column-done">
                    <div class="column-header">
                        <h3 class="column-title">Done <span class="column-count">4</span></h3>
                    </div>
                    
                    <div class="task-card">
                        <div class="task-header">
                            <span class="task-priority priority-high">High</span>
                        </div>
                        <h4 class="task-title">Project Setup</h4>
                        <p class="task-description">Initialize repository and set up the development environment.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">✅</span>
                                    Completed
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">JD</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="task-card">
                        <div class="task-header">
                            <span class="task-priority priority-medium">Medium</span>
                        </div>
                        <h4 class="task-title">Requirements Gathering</h4>
                        <p class="task-description">Interview stakeholders and document requirements.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">✅</span>
                                    Completed
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">JS</div>
                                <div class="task-assignee">AL</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="task-card">
                        <div class="task-header">
                            <span class="task-priority priority-low">Low</span>
                        </div>
                        <h4 class="task-title">Research Technology Stack</h4>
                        <p class="task-description">Evaluate and choose technologies for the project.</p>
                        <div class="task-footer">
                            <div class="task-meta">
                                <span class="task-meta-item">
                                    <span class="task-meta-icon">✅</span>
                                    Completed
                                </span>
                            </div>
                            <div class="task-assignees">
                                <div class="task-assignee">RJ</div>
                                <div class="task-assignee">JD</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <script>
        // Simple drag-and-drop for task cards - could be enhanced with proper libraries
        document.addEventListener('DOMContentLoaded', function() {
            const taskCards = document.querySelectorAll('.task-card');
            const columns = document.querySelectorAll('.tasks-column');
            
            taskCards.forEach(card => {
                card.setAttribute('draggable', true);
                
                card.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', card.innerHTML);
                    e.dataTransfer.effectAllowed = 'move';
                    card.classList.add('dragging');
                });
                
                card.addEventListener('dragend', function() {
                    card.classList.remove('dragging');
                });
            });
            
            columns.forEach(column => {
                column.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                });
                
                column.addEventListener('drop', function(e) {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    const draggingCard = document.querySelector('.dragging');
                    
                    if (draggingCard) {
                        draggingCard.remove();
                        
                        const newCard = document.createElement('div');
                        newCard.className = 'task-card';
                        newCard.innerHTML = data;
                        
                        // Insert after header
                        const header = column.querySelector('.column-header');
                        header.insertAdjacentElement('afterend', newCard);
                        
                        // Update column counts
                        updateColumnCounts();
                    }
                });
            });
            
            function updateColumnCounts() {
                columns.forEach(column => {
                    const count = column.querySelectorAll('.task-card').length;
                    column.querySelector('.column-count').textContent = count;
                });
            }
            
            // Add click handler for "Add Task" button
            document.querySelector('.btn-primary').addEventListener('click', function() {
                alert('This would open a task creation modal in a real application.');
            });
        });
    </script>
</body>
</html>`,
    database_solution: `-- Projects table for organizing tasks
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    start_date DATE,
    end_date DATE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task status options table (for configuration)
CREATE TABLE task_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(50),
    position INT NOT NULL,
    is_default BOOLEAN DEFAULT false
);

-- Task priorities table (for configuration)
CREATE TABLE task_priorities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(50),
    position INT NOT NULL
);

-- Tasks table for storing all task information
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    status_id INT REFERENCES task_statuses(id),
    priority_id INT REFERENCES task_priorities(id),
    due_date DATE,
    estimated_hours DECIMAL(5, 2),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    parent_task_id INT REFERENCES tasks(id)
);

-- Task assignments for assigning tasks to users
CREATE TABLE task_assignments (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_by UUID REFERENCES auth.users(id)
);

-- Comments on tasks
CREATE TABLE task_comments (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task attachments
CREATE TABLE task_attachments (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task time tracking
CREATE TABLE task_time_entries (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task dependencies
CREATE TABLE task_dependencies (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    dependent_task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    dependency_type VARCHAR(50) NOT NULL, -- e.g., 'blocks', 'is_blocked_by', 'relates_to'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_dependency UNIQUE(task_id, dependent_task_id)
);

-- Team members on projects
CREATE TABLE project_members (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    role VARCHAR(100) NOT NULL, -- e.g., 'owner', 'member', 'viewer'
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags for tasks
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(50),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task tags (many-to-many relationship)
CREATE TABLE task_tags (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    CONSTRAINT unique_task_tag UNIQUE(task_id, tag_id)
);

-- Task activity log
CREATE TABLE task_activity_log (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    activity_type VARCHAR(100) NOT NULL, -- e.g., 'created', 'updated', 'commented', 'status_changed'
    description TEXT,
    old_value TEXT,
    new_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default task statuses
INSERT INTO task_statuses (name, color, position, is_default) VALUES
('To Do', '#E2E8F0', 1, true),
('In Progress', '#3182CE', 2, false),
('Review', '#DD6B20', 3, false),
('Done', '#38A169', 4, false);

-- Insert default task priorities
INSERT INTO task_priorities (name, color, position) VALUES
('Low', '#38A169', 3),
('Medium', '#DD6B20', 2),
('High', '#E53E3E', 1);

-- Create indexes for frequently queried columns
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status_id ON tasks(status_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_task_assignments_user_id ON task_assignments(user_id);
CREATE INDEX idx_project_members_user_id ON project_members(user_id);

-- Create view for task overview
CREATE VIEW task_overview AS
SELECT 
    t.id,
    t.title,
    t.description,
    t.due_date,
    p.name AS project_name,
    ts.name AS status,
    tp.name AS priority,
    COUNT(DISTINCT ta.user_id) AS assignee_count,
    COUNT(DISTINCT tc.id) AS comment_count
FROM 
    tasks t
LEFT JOIN 
    projects p ON t.project_id = p.id
LEFT JOIN 
    task_statuses ts ON t.status_id = ts.id
LEFT JOIN 
    task_priorities tp ON t.priority_id = tp.id
LEFT JOIN 
    task_assignments ta ON t.id = ta.task_id
LEFT JOIN 
    task_comments tc ON t.id = tc.task_id
GROUP BY 
    t.id, t.title, t.description, t.due_date, p.name, ts.name, tp.name;`,
    automation_solution: `// Task automation workflows

// Function to automatically assign tasks based on team member skills and workload
async function autoAssignTask(taskId) {
  // Get task details
  const { data: task, error: taskError } = await supabase
    .from('tasks')
    .select('*, project_id')
    .eq('id', taskId)
    .single();
    
  if (taskError) throw taskError;
  
  // Find team members for this project
  const { data: teamMembers, error: teamError } = await supabase
    .from('project_members')
    .select('user_id')
    .eq('project_id', task.project_id);
    
  if (teamError) throw teamError;
  
  // If no team members, assign to project creator
  if (!teamMembers || teamMembers.length === 0) {
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('created_by')
      .eq('id', task.project_id)
      .single();
      
    if (projectError) throw projectError;
    
    await assignTaskToUser(taskId, project.created_by);
    return { assigned: true, user_id: project.created_by };
  }
  
  // Get workload for each team member
  const memberWorkloads = [];
  
  for (const member of teamMembers) {
    // Count active tasks assigned to this user
    const { count, error } = await supabase
      .from('task_assignments')
      .select('*', { count: 'exact' })
      .in('task_id', function(query) {
        query.from('tasks')
          .select('id')
          .neq('status_id', function(query) {
            query.from('task_statuses')
              .select('id')
              .eq('name', 'Done')
              .single();
          });
      })
      .eq('user_id', member.user_id);
      
    if (error) throw error;
    
    memberWorkloads.push({
      user_id: member.user_id,
      workload: count || 0
    });
  }
  
  // Find team member with lowest workload
  memberWorkloads.sort((a, b) => a.workload - b.workload);
  const assigneeId = memberWorkloads[0].user_id;
  
  // Assign task
  await assignTaskToUser(taskId, assigneeId);
  
  return { assigned: true, user_id: assigneeId };
}

// Function to assign task to user
async function assignTaskToUser(taskId, userId) {
  const { error } = await supabase
    .from('task_assignments')
    .insert({
      task_id: taskId,
      user_id: userId
    });
    
  if (error) throw error;
  
  // Log the activity
  await logTaskActivity(
    taskId, 
    userId, 
    'assigned', 
    'Task was automatically assigned',
    null,
    userId
  );
}

// Function to send reminders for upcoming/overdue tasks
async function sendTaskReminders() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Get tasks due today
  const { data: todayTasks, error: todayError } = await supabase
    .from('tasks')
    .select(`
      id, 
      title,
      due_date,
      task_assignments(user_id)
    `)
    .eq('due_date', today.toISOString().split('T')[0])
    .is('completed_at', null);
    
  if (todayError) throw todayError;
  
  // Get tasks due tomorrow
  const { data: tomorrowTasks, error: tomorrowError } = await supabase
    .from('tasks')
    .select(`
      id, 
      title,
      due_date,
      task_assignments(user_id)
    `)
    .eq('due_date', tomorrow.toISOString().split('T')[0])
    .is('completed_at', null);
    
  if (tomorrowError) throw tomorrowError;
  
  // Get overdue tasks
  const { data: overdueTasks, error: overdueError } = await supabase
    .from('tasks')
    .select(`
      id, 
      title,
      due_date,
      task_assignments(user_id)
    `)
    .lt('due_date', today.toISOString().split('T')[0])
    .is('completed_at', null);
    
  if (overdueError) throw overdueError;
  
  // Process and send notifications
  await processTaskReminders(todayTasks, 'due today');
  await processTaskReminders(tomorrowTasks, 'due tomorrow');
  await processTaskReminders(overdueTasks, 'overdue');
}

// Process task reminders and send notifications
async function processTaskReminders(tasks, reminderType) {
  for (const task of tasks) {
    // For each assigned user
    for (const assignment of task.task_assignments) {
      const userId = assignment.user_id;
      
      // Create a notification for the user
      await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title: 'Task Reminder',
          message: "Task '" + task.title + "' is " + reminderType,
          type: 'task_reminder',
          reference_id: task.id
        });
      
      // You could also send an email or push notification here
    }
  }
}

// Function to update task status when dependencies are completed
async function checkTaskDependencies() {
  // Get all tasks with dependencies that aren't completed yet
  const { data: taskDependencies, error } = await supabase
    .from('task_dependencies')
    .select(`
      task_id,
      dependent_task_id,
      tasks!task_dependencies_task_id_fkey(status_id)
    `)
    .in('dependency_type', ['blocks', 'is_blocked_by']);
    
  if (error) throw error;
  
  // Group dependencies by dependent_task_id
  const dependentTasks = {};
  for (const dep of taskDependencies) {
    if (!dependentTasks[dep.dependent_task_id]) {
      dependentTasks[dep.dependent_task_id] = {
        blocking_tasks: [],
        task_id: dep.dependent_task_id
      };
    }
    
    dependentTasks[dep.dependent_task_id].blocking_tasks.push({
      id: dep.task_id,
      status_id: dep.tasks.status_id
    });
  }
  
  // Get "Done" status ID
  const { data: doneStatus, error: statusError } = await supabase
    .from('task_statuses')
    .select('id')
    .eq('name', 'Done')
    .single();
    
  if (statusError) throw statusError;
  
  // Get "To Do" status ID
  const { data: todoStatus, error: todoStatusError } = await supabase
    .from('task_statuses')
    .select('id')
    .eq('name', 'To Do')
    .single();
    
  if (todoStatusError) throw todoStatusError;
  
  // Check each dependent task
  for (const taskId in dependentTasks) {
    const task = dependentTasks[taskId];
    
    // Check if all blocking tasks are done
    const allDone = task.blocking_tasks.every(t => t.status_id === doneStatus.id);
    
    if (allDone) {
      // Update task status to ready (To Do)
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ status_id: todoStatus.id })
        .eq('id', task.task_id);
        
      if (updateError) throw updateError;
      
      // Log the activity
      await logTaskActivity(
        task.task_id, 
        'system', 
        'status_changed', 
        'Task is now ready - all dependencies completed',
        null,
        todoStatus.id
      );
    }
  }
}

// Log task activity
async function logTaskActivity(taskId, userId, activityType, description, oldValue, newValue) {
  const { error } = await supabase
    .from('task_activity_log')
    .insert({
      task_id: taskId,
      user_id: userId,
      activity_type: activityType,
      description: description,
      old_value: oldValue ? JSON.stringify(oldValue) : null,
      new_value: newValue ? JSON.stringify(newValue) : null
    });
    
  if (error) throw error;
}

// Function to generate task progress report
async function generateTaskProgressReport(projectId) {
  // Get project details
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('name, start_date, end_date')
    .eq('id', projectId)
    .single();
    
  if (projectError) throw projectError;
  
  // Get task statuses
  const { data: taskStatuses, error: statusesError } = await supabase
    .from('task_statuses')
    .select('id, name')
    .order('position', { ascending: true });
    
  if (statusesError) throw statusesError;
  
  // Create a mapping of status ID to name
  const statusMap = {};
  taskStatuses.forEach(status => {
    statusMap[status.id] = status.name;
  });
  
  // Get tasks for this project
  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('id, title, status_id, created_at, completed_at, due_date')
    .eq('project_id', projectId);
    
  if (tasksError) throw tasksError;
  
  // Prepare report data
  const statusCounts = {};
  let completedCount = 0;
  let totalCount = tasks.length;
  let overdueCount = 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  tasks.forEach(task => {
    const statusName = statusMap[task.status_id];
    
    // Count by status
    if (!statusCounts[statusName]) {
      statusCounts[statusName] = 0;
    }
    statusCounts[statusName]++;
    
    // Count completed
    if (statusName === 'Done') {
      completedCount++;
    }
    
    // Count overdue
    if (statusName !== 'Done' && task.due_date) {
      const dueDate = new Date(task.due_date);
      if (dueDate < today) {
        overdueCount++;
      }
    }
  });
  
  // Calculate completion percentage
  const completionPercentage = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;
  
  return {
    project_name: project.name,
    total_tasks: totalCount,
    completion_percentage: completionPercentage,
    status_breakdown: statusCounts,
    overdue_tasks: overdueCount,
    report_date: new Date().toISOString()
  };
}`,
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

/**
 * Get a demo solution by ID
 * @param {string} id - Solution ID
 * @returns {DemoSolution|null} - The found solution or null
 */
export function getDemoSolutionById(id) {
  return demoSolutions.find(solution => solution.id === id) || null;
}

/**
 * Get all demo solutions
 * @returns {DemoSolution[]} - Array of demo solutions
 */
export function getAllDemoSolutions() {
  return [...demoSolutions];
}

/**
 * Add a new demo solution
 * @param {DemoSolution} solution - The solution to add
 * @returns {DemoSolution} - The added solution
 */
export function saveDemoSolution(solution) {
  // Generate ID if needed
  if (!solution.id) {
    solution.id = `demo-${Date.now()}`;
  }
  
  // Set timestamps if needed
  const now = new Date().toISOString();
  if (!solution.created_at) {
    solution.created_at = now;
  }
  solution.updated_at = now;
  
  // Check if solution already exists
  const existingIndex = demoSolutions.findIndex(s => s.id === solution.id);
  
  if (existingIndex !== -1) {
    // Update existing
    demoSolutions[existingIndex] = {...solution};
    return demoSolutions[existingIndex];
  } else {
    // Add new
    demoSolutions.push({...solution});
    return solution;
  }
}

/**
 * Delete a demo solution
 * @param {string} id - Solution ID to delete
 * @returns {boolean} - Success or failure
 */
export function deleteDemoSolution(id) {
  const initialLength = demoSolutions.length;
  const filtered = demoSolutions.filter(s => s.id !== id);
  
  // If length changed, we deleted something
  if (filtered.length < initialLength) {
    demoSolutions.splice(0, demoSolutions.length, ...filtered);
    return true;
  }
  
  return false;
}
