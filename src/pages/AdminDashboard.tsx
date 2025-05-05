
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PieChart, Users, Layout, Shield, Filter } from 'lucide-react';
import { toast } from 'sonner';

// Import our new components
import { AdminOverview } from '@/components/admin/AdminOverview';
import { UsersTable } from '@/components/admin/UsersTable';
import { SolutionsTable } from '@/components/admin/SolutionsTable';
import { TemplatesTable } from '@/components/admin/TemplatesTable';
import { GuardrailsTable } from '@/components/admin/GuardrailsTable';

// Import our custom hook for data fetching
import { useAdminData } from '@/hooks/useAdminData';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Use our custom hook to handle all data fetching and state management
  const {
    users,
    solutions,
    templates,
    setTemplates,
    guardrails,
    setGuardrails,
    stats,
    isLoading,
    loadAdminData
  } = useAdminData();

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
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Failed to verify admin privileges');
        navigate('/');
      }
    };

    checkAdminStatus();
  }, [user, navigate, loadAdminData]);

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
            <AdminOverview stats={stats} />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <UsersTable users={users} />
          </TabsContent>

          {/* Solutions Tab */}
          <TabsContent value="solutions">
            <SolutionsTable solutions={solutions} />
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <TemplatesTable templates={templates} setTemplates={setTemplates} />
          </TabsContent>

          {/* Guardrails Tab */}
          <TabsContent value="guardrails">
            <GuardrailsTable guardrails={guardrails} setGuardrails={setGuardrails} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
