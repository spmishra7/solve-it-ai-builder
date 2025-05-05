
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // If authentication is required and user is not logged in
      if (requireAuth && !user) {
        navigate('/auth');
        return;
      }

      // If we need to implement role-based access in the future:
      // if (allowedRoles.length > 0 && user) {
      //   const hasRole = allowedRoles.some(role => user.roles?.includes(role));
      //   if (!hasRole) {
      //     navigate('/');
      //     return;
      //   }
      // }
    }
  }, [user, loading, navigate, requireAuth, allowedRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-600"></div>
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
