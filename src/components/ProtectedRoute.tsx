
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
  redirectPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  requireAuth = true,
  redirectPath = '/auth'
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      // If authentication is required and user is not logged in
      if (requireAuth && !user) {
        // Show a toast notification to inform users why they are being redirected
        toast({
          title: "Authentication Required",
          description: "Please log in to access this feature.",
          variant: "destructive",
        });
        
        navigate(redirectPath);
        return;
      }

      // Role-based access implementation
      if (allowedRoles.length > 0 && user) {
        // Get user roles from app_metadata
        const userRoles = user.app_metadata?.roles || [];
        const hasRole = allowedRoles.some(role => userRoles.includes(role));
        
        if (!hasRole) {
          toast({
            title: "Access Restricted",
            description: "You don't have permission to access this section.",
            variant: "destructive",
          });
          
          navigate('/');
          return;
        }
      }
    }
  }, [user, loading, navigate, requireAuth, allowedRoles, toast, redirectPath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Show content if:
  // 1. Authentication is not required, OR
  // 2. Authentication is required AND user is authenticated
  if (!requireAuth || (requireAuth && user)) {
    return <>{children}</>;
  }

  return null;
}
