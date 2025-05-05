
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Loader2, Code, Database, Zap } from "lucide-react";
import DeploymentOptions from "@/components/DeploymentOptions";
import DatabaseExecutor from "@/components/DatabaseExecutor";
import AutomationWizard from "@/components/AutomationWizard";

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
  const [implementationTab, setImplementationTab] = useState("overview");
  
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="preview" className="flex items-center gap-1">
            <Code size={16} />
            UI Preview
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-1">
            <Database size={16} />
            Database Schema
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-1">
            <Zap size={16} />
            Automations
          </TabsTrigger>
          <TabsTrigger value="implement" className="flex items-center gap-1">
            <ArrowLeft size={16} className="rotate-180" />
            Implement
          </TabsTrigger>
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
        
        <TabsContent value="implement">
          <Tabs value={implementationTab} onValueChange={setImplementationTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Implementation Overview</TabsTrigger>
              <TabsTrigger value="deploy">Deploy Frontend</TabsTrigger>
              <TabsTrigger value="database-setup">Setup Database</TabsTrigger>
              <TabsTrigger value="automation-setup">Configure Automation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                      <Code className="h-6 w-6 text-brand-600" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">1. Deploy Frontend</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Deploy your UI to a hosting platform of your choice
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto"
                      onClick={() => setImplementationTab("deploy")}
                    >
                      Start
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                      <Database className="h-6 w-6 text-brand-600" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">2. Set Up Database</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Create your database schema in Supabase
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto"
                      onClick={() => setImplementationTab("database-setup")}
                    >
                      Start
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-brand-600" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">3. Configure Automations</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Set up your automation workflows
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto"
                      onClick={() => setImplementationTab("automation-setup")}
                    >
                      Start
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="deploy">
              <DeploymentOptions 
                solutionId={solution.id}
                uiSolution={solution.ui_solution}
              />
            </TabsContent>
            
            <TabsContent value="database-setup">
              <DatabaseExecutor 
                databaseSolution={solution.database_solution}
              />
            </TabsContent>
            
            <TabsContent value="automation-setup">
              <AutomationWizard 
                automationSolution={solution.automation_solution}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
