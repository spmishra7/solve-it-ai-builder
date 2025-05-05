
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, Eye, Loader2, Trash } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

type Solution = {
  id: string;
  title: string;
  description: string;
  created_at: string;
};

export default function MySolutions() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) return;
    
    async function fetchSolutions() {
      try {
        const { data, error } = await supabase
          .from('solutions')
          .select('id, title, description, created_at')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setSolutions(data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load your solutions.",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSolutions();
  }, [user, toast]);
  
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this solution?")) return;
    
    setDeleting(id);
    
    try {
      const { error } = await supabase
        .from('solutions')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setSolutions(solutions.filter(s => s.id !== id));
      
      toast({
        title: "Solution deleted",
        description: "Your solution has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete solution.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };
  
  const handleView = async (id: string) => {
    navigate(`/solutions/${id}`);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-10 w-10 animate-spin text-brand-600" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">My Solutions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          View and manage all your saved SaaS solutions
        </p>
      </div>
      
      {solutions.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No solutions found</h3>
          <p className="text-gray-500 mb-6">You haven't created any solutions yet.</p>
          <Button onClick={() => navigate("/")} className="bg-brand-600 hover:bg-brand-700">
            Create Your First Solution
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => (
            <Card key={solution.id} className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-1">{solution.title}</CardTitle>
                <CardDescription className="flex items-center text-xs">
                  <Clock size={12} className="mr-1" />
                  {format(new Date(solution.created_at), 'MMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">{solution.description}</p>
              </CardContent>
              <CardFooter className="pt-1 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleView(solution.id)}
                  className="border-brand-200 text-brand-700 hover:bg-brand-50"
                >
                  <Eye size={16} className="mr-1" /> View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(solution.id)}
                  disabled={deleting === solution.id}
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  {deleting === solution.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Trash size={16} className="mr-1" /> Delete
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
