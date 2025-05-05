
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Shield, Users, Layout, PieChart, Filter } from 'lucide-react';
import { Stepper, Step } from '@/components/ui/stepper';
import { toast } from 'sonner';

// Define admin UI types
interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
}

interface SolutionData {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  business_prompt: string;
}

interface TemplateData {
  id: string;
  title: string;
  category: string;
  active: boolean;
}

interface GuardrailData {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<UserData[]>([]);
  const [solutions, setSolutions] = useState<SolutionData[]>([]);
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [guardrails, setGuardrails] = useState<GuardrailData[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSolutions: 0,
    activeSubscriptions: 0,
    usageLast30Days: 0
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // In a real application, you would check against a roles table or admin users list
        // For now, we'll simulate this check based on user email
        // TODO: Replace this with proper role-based access control
        const isAdminUser = user.email === 'admin@example.com'; // Example admin check
        setIsAdmin(isAdminUser);
        
        if (!isAdminUser) {
          toast("Access denied. You don't have admin privileges.");
          navigate('/');
          return;
        }

        await loadAdminData();
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Failed to verify admin privileges');
        navigate('/');
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const loadAdminData = async () => {
    try {
      // Load users
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .limit(100);
      
      if (usersError) throw usersError;
      setUsers(usersData || []);
      
      // Load solutions
      const { data: solutionsData, error: solutionsError } = await supabase
        .from('solutions')
        .select('*')
        .limit(100);
      
      if (solutionsError) throw solutionsError;
      setSolutions(solutionsData || []);
      
      // For demo purposes, let's create some sample template and guardrail data
      setTemplates([
        { id: '1', title: 'Patient Manager', category: 'Healthcare', active: true },
        { id: '2', title: 'Invoice Generator', category: 'Finance', active: true },
        { id: '3', title: 'Learning Tracker', category: 'Education', active: true },
        { id: '4', title: 'Inventory Tracker', category: 'Retail', active: true },
      ]);
      
      setGuardrails([
        { id: '1', name: 'Content Filter', description: 'Filter inappropriate content', enabled: true },
        { id: '2', name: 'Bias Detection', description: 'Detect and mitigate bias in AI responses', enabled: true },
        { id: '3', name: 'Usage Limits', description: 'Enforce daily usage limits for free users', enabled: true },
      ]);
      
      // Set overview stats
      setStats({
        totalUsers: usersData?.length || 0,
        totalSolutions: solutionsData?.length || 0,
        activeSubscriptions: Math.floor(Math.random() * 50), // Demo data
        usageLast30Days: Math.floor(Math.random() * 1000) // Demo data
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    }
  };

  // Toggle template status
  const toggleTemplateStatus = async (id: string, currentStatus: boolean) => {
    try {
      // Update local state first for immediate feedback
      setTemplates(templates.map(template => 
        template.id === id ? { ...template, active: !currentStatus } : template
      ));
      
      // In a real app, you would update this in the database
      toast.success(`Template ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error('Error toggling template status:', error);
      toast.error('Failed to update template status');
    }
  };

  // Toggle guardrail status
  const toggleGuardrailStatus = async (id: string, currentStatus: boolean) => {
    try {
      // Update local state
      setGuardrails(guardrails.map(guardrail => 
        guardrail.id === id ? { ...guardrail, enabled: !currentStatus } : guardrail
      ));
      
      // In a real app, update the database
      toast.success(`Guardrail ${currentStatus ? 'disabled' : 'enabled'} successfully`);
    } catch (error) {
      console.error('Error toggling guardrail status:', error);
      toast.error('Failed to update guardrail status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Should never reach here due to navigation in useEffect, but just in case
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Site
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="solutions" className="flex items-center gap-2">
            <Layout className="h-4 w-4" /> Solutions
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Templates
          </TabsTrigger>
          <TabsTrigger value="guardrails" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Guardrails
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Generated Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.totalSolutions}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.activeSubscriptions}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Usage (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.usageLast30Days}</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Platform Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Stepper activeStep={3} orientation="horizontal">
                  <Step label="System Health" description="All systems operational" />
                  <Step label="API Status" description="APIs responding normally" />
                  <Step label="Database" description="0 pending migrations" />
                  <Step label="AI Models" description="All models available" />
                </Stepper>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Sign In</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {user.last_sign_in_at 
                              ? new Date(user.last_sign_in_at).toLocaleDateString() 
                              : 'Never'}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solutions Tab */}
          <TabsContent value="solutions">
            <Card>
              <CardHeader>
                <CardTitle>Generated Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {solutions.length > 0 ? (
                      solutions.map((solution) => (
                        <TableRow key={solution.id}>
                          <TableCell>{solution.title}</TableCell>
                          <TableCell>{new Date(solution.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{solution.user_id}</TableCell>
                          <TableCell className="space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          No solutions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Sector Templates</CardTitle>
                <Button>Add New Template</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>{template.title}</TableCell>
                        <TableCell>{template.category}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            template.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {template.active ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleTemplateStatus(template.id, template.active)}
                          >
                            {template.active ? 'Disable' : 'Enable'}
                          </Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guardrails Tab */}
          <TabsContent value="guardrails">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>AI Guardrails</CardTitle>
                <Button>Add New Guardrail</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guardrails.map((guardrail) => (
                      <TableRow key={guardrail.id}>
                        <TableCell>{guardrail.name}</TableCell>
                        <TableCell>{guardrail.description}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            guardrail.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {guardrail.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleGuardrailStatus(guardrail.id, guardrail.enabled)}
                          >
                            {guardrail.enabled ? 'Disable' : 'Enable'}
                          </Button>
                          <Button variant="outline" size="sm">Configure</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
