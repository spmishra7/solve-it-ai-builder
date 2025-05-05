
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  UserData 
} from '@/components/admin/UsersTable';
import { 
  SolutionData 
} from '@/components/admin/SolutionsTable';
import { 
  TemplateData 
} from '@/components/admin/TemplatesTable';
import { 
  GuardrailData 
} from '@/components/admin/GuardrailsTable';

interface StatsData {
  totalUsers: number;
  totalSolutions: number;
  activeSubscriptions: number;
  usageLast30Days: number;
}

export const useAdminData = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [solutions, setSolutions] = useState<SolutionData[]>([]);
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [guardrails, setGuardrails] = useState<GuardrailData[]>([]);
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalSolutions: 0,
    activeSubscriptions: 0,
    usageLast30Days: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      // Load profiles (instead of users)
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(100);
      
      if (profilesError) throw profilesError;
      
      // Transform profiles to UserData
      const userData: UserData[] = profilesData?.map(profile => ({
        id: profile.id,
        email: null, // We'll replace this with actual email if available
        created_at: profile.created_at,
        last_sign_in_at: null,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url
      })) || [];
      
      setUsers(userData);
      
      // Load solutions
      const { data: solutionsData, error: solutionsError } = await supabase
        .from('solutions')
        .select('*')
        .limit(100);
      
      if (solutionsError) throw solutionsError;
      setSolutions(solutionsData || []);
      
      // For demo purposes, creating some sample template data
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
        totalUsers: profilesData?.length || 0,
        totalSolutions: solutionsData?.length || 0,
        activeSubscriptions: Math.floor(Math.random() * 50), // Demo data
        usageLast30Days: Math.floor(Math.random() * 1000) // Demo data
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
      setIsLoading(false);
    }
  };

  return {
    users,
    solutions,
    templates,
    setTemplates,
    guardrails,
    setGuardrails,
    stats,
    isLoading,
    loadAdminData
  };
};
