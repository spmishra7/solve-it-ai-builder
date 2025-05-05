
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";

type Solution = {
  id: string;
  title: string;
  description: string;
  business_prompt: string;
  ui_solution: string;
  database_solution: string;
  automation_solution: string;
  created_at: string;
  updated_at: string;
};

export default function SolutionDetail() {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("preview");
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!id || !user) return;
    
    async function fetchSolution() {
      try {
        const { data, error } = await supabase
          .from('solutions')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setSolution(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load the solution.",
          variant: "destructive",
        });
        navigate('/my-solutions');
      } finally {
        setLoading(false);
      }
    }
    
    fetchSolution();
  }, [id, user, navigate, toast]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-10 w-10 animate-spin text-brand-600" />
        </div>
      </div>
    );
  }
  
  if (!solution) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-2">Solution not found</h3>
          <p className="text-gray-500 mb-6">The solution you're looking for does not exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate("/my-solutions")} className="bg-brand-600 hover:bg-brand-700">
            Back to My Solutions
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/my-solutions')}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to My Solutions
      </Button>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{solution.title}</h1>
        <p className="text-gray-600 mb-4 max-w-4xl">{solution.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={14} className="mr-1" />
          Created on {format(new Date(solution.created_at), 'MMMM d, yyyy')}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-medium mb-2">Business Problem</h3>
        <p className="whitespace-pre-wrap">{solution.business_prompt}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="preview">UI Preview</TabsTrigger>
          <TabsTrigger value="database">Database Schema</TabsTrigger>
          <TabsTrigger value="automation">Automations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <Card>
            <CardContent className="p-2">
              <div className="border-b pb-2 mb-2 flex justify-between items-center">
                <div className="flex space-x-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-400">Generated SaaS Preview</div>
              </div>
              <div className="border rounded-lg shadow-inner p-2 overflow-hidden bg-gray-50">
                <div className="p-4 overflow-auto max-h-[600px]" dangerouslySetInnerHTML={{ __html: solution.ui_solution }}></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database">
          <Card>
            <CardContent className="p-4">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-[600px] font-mono text-sm">
                <pre>{solution.database_solution}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="automation">
          <Card>
            <CardContent className="p-4">
              <div className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-auto max-h-[600px] font-mono text-sm">
                <pre>{solution.automation_solution}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
