import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const attemptsRef = useRef<{ [key: string]: { count: number; timestamp: number } }>({});

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const checkRateLimit = (email: string): boolean => {
    const now = Date.now();
    const attempt = attemptsRef.current[email];

    if (attempt) {
      if (now - attempt.timestamp < LOCKOUT_DURATION) {
        if (attempt.count >= MAX_ATTEMPTS) {
          const remainingTime = Math.ceil((LOCKOUT_DURATION - (now - attempt.timestamp)) / 60000);
          throw new Error(`Too many attempts. Please try again in ${remainingTime} minutes.`);
        }
      } else {
        // Reset if lockout duration has passed
        attemptsRef.current[email] = { count: 0, timestamp: now };
      }
    } else {
      attemptsRef.current[email] = { count: 0, timestamp: now };
    }

    return true;
  };

  const incrementAttempts = (email: string) => {
    const attempt = attemptsRef.current[email];
    if (attempt) {
      attempt.count++;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      checkRateLimit(email);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        incrementAttempts(email);
        throw error;
      }
      // Reset attempts on successful login
      delete attemptsRef.current[email];
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Login failed",
        description: authError.message,
        variant: "destructive",
      });
      throw authError;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      checkRateLimit(email);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      if (error) {
        incrementAttempts(email);
        throw error;
      }
      // Reset attempts on successful registration
      delete attemptsRef.current[email];
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Registration failed",
        description: authError.message,
        variant: "destructive",
      });
      throw authError;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Sign out failed",
        description: authError.message,
        variant: "destructive",
      });
      throw authError;
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
