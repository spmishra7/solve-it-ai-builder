
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
    console.log("AuthProvider mounted, setting up auth state listener");
    let mounted = true;

    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoading(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      console.log("AuthProvider unmounted");
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
    console.log("Attempting sign in for:", email);
    try {
      checkRateLimit(email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error);
        incrementAttempts(email);
        throw error;
      }
      
      console.log("Sign in successful:", data.user?.email);
      // Reset attempts on successful login
      delete attemptsRef.current[email];
      
      toast({
        title: "Login successful",
        description: "You have been signed in",
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error("Sign in error caught:", authError);
      
      // More user-friendly error messages
      let errorMessage = authError.message;
      if (errorMessage === "Invalid login credentials") {
        errorMessage = "Invalid email or password. Please check your credentials or sign up if you don't have an account.";
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw authError;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    console.log("Attempting sign up for:", email);
    try {
      checkRateLimit(email);
      
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) {
        console.error("Sign up error:", error);
        incrementAttempts(email);
        throw error;
      }
      
      // This means the user already exists but has not verified their email
      if (data.user && !data.session) {
        console.log("Sign up requires email verification");
        toast({
          title: "Email verification required",
          description: "Please check your email to verify your account.",
        });
      } 
      // This means auto-confirm email is enabled and the user is signed in
      else if (data.session) {
        console.log("Sign up successful with immediate session:", data.user?.email);
        toast({
          title: "Account created",
          description: "Your account has been created and you're now signed in.",
        });
      }
      
      // Reset attempts on successful registration
      delete attemptsRef.current[email];
    } catch (error) {
      const authError = error as AuthError;
      console.error("Sign up error caught:", authError);
      
      // More user-friendly error messages
      let errorMessage = authError.message;
      if (errorMessage.includes("already registered")) {
        errorMessage = "This email is already registered. Please sign in instead.";
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw authError;
    }
  };

  const signOut = async () => {
    console.log("Attempting sign out");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      console.log("Sign out successful");
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error("Sign out error caught:", authError);
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
