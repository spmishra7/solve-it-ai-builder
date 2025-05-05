
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AppPreviewFrame from "@/components/playground/AppPreviewFrame";
import PlaygroundChat from "@/components/playground/PlaygroundChat";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Solution {
  id: string;
  title: string;
  ui_solution: string;
  database_solution: string;
  automation_solution: string;
}

export default function AppPlayground() {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSolution = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('solutions')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setSolution(data);
      } catch (error) {
        console.error("Error fetching solution:", error);
        toast({
          title: "Error",
          description: "Failed to load solution details.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSolution();
  }, [id, toast]);
  
  const handleApplyChanges = (changes: string) => {
    // In a real implementation, this would parse the changes and apply them
    // For now, we'll just show a toast notification
    toast({
      title: "Changes Requested",
      description: "In a production environment, these changes would be applied to your app."
    });
    
    // You could implement actual changes by updating the solution in the database
    // and refreshing the preview
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand-600" />
      </div>
    );
  }
  
  if (!solution) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Solution Not Found</h2>
          <p className="mb-6">The solution you're looking for does not exist or you don't have permission to view it.</p>
          <Button asChild>
            <Link to="/my-solutions">Back to My Solutions</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link to={`/solutions/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Solution
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{solution.title} - Playground</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppPreviewFrame
            solutionId={solution.id}
            uiSolution={solution.ui_solution}
            databaseSolution={solution.database_solution}
            automationSolution={solution.automation_solution}
          />
        </div>
        
        <div className="h-[700px]">
          <PlaygroundChat 
            solutionId={solution.id}
            onApplyChanges={handleApplyChanges}
          />
        </div>
      </div>
    </div>
  );
}
