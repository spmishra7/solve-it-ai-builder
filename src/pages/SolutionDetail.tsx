import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Stepper, Step } from "@/components/ui/stepper";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Loader2, Code, Database, Zap, PlayCircle } from "lucide-react";
import DeploymentOptions from "@/components/DeploymentOptions";
import DatabaseExecutor from "@/components/DatabaseExecutor";
import AutomationWizard from "@/components/AutomationWizard";
import LivePreviewPlayground from "@/components/LivePreviewPlayground";
import ExportOptions from "@/components/ExportOptions";

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
  const [implementationStep, setImplementationStep] = useState(0);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // This would come from a user subscription check in a real app
  const isPremiumUser = true;
  
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
      
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{solution.title}</h1>
          <p className="text-gray-600 mb-4 max-w-4xl">{solution.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            Created on {format(new Date(solution.created_at), 'MMMM d, yyyy')}
          </div>
        </div>
        <Button asChild className="flex items-center gap-2">
          <Link to={`/playground/${solution.id}`}>
            <PlayCircle size={18} />
            Open in Playground
          </Link>
        </Button>
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
          <LivePreviewPlayground
            solutionId={solution.id}
            uiSolution={solution.ui_solution}
            title={solution.title}
            isAuthenticated={!!user}
          />
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
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="export">Export & Deploy</TabsTrigger>
              <TabsTrigger value="workflow">Implementation Workflow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                      <Code className="h-6 w-6 text-brand-600" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">1. Preview Solution</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Interact with a live version of your SaaS solution
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto"
                      onClick={() => setImplementationTab("preview")}
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
                    <h3 className="font-medium text-lg mb-2">2. Export & Deploy</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Download or deploy your solution to start using it
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto"
                      onClick={() => setImplementationTab("export")}
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
                    <h3 className="font-medium text-lg mb-2">3. Step-by-Step Workflow</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Follow our guided implementation workflow
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto"
                      onClick={() => setImplementationTab("workflow")}
                    >
                      Start
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <LivePreviewPlayground
                solutionId={solution.id}
                uiSolution={solution.ui_solution}
                title={solution.title}
                isAuthenticated={!!user}
              />
            </TabsContent>
            
            <TabsContent value="export">
              <ExportOptions
                solutionId={solution.id}
                isAuthenticated={!!user}
                isPremium={isPremiumUser}
              />
            </TabsContent>
            
            <TabsContent value="workflow">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Implementation Workflow</h3>
                    <p className="text-gray-600">Follow these steps to implement your SaaS solution</p>
                  </div>
                  
                  <div className="mb-8">
                    <Stepper activeStep={implementationStep}>
                      <Step label="Database Setup" description="Create your database schema" />
                      <Step label="Deploy Frontend" description="Set up the user interface" />
                      <Step label="Configure Automations" description="Set up background tasks" />
                      <Step label="Test and Launch" description="Final verification" />
                    </Stepper>
                  </div>
                  
                  <div className="mt-8 space-y-6">
                    {implementationStep === 0 && (
                      <DatabaseExecutor databaseSolution={solution.database_solution} />
                    )}
                    
                    {implementationStep === 1 && (
                      <DeploymentOptions 
                        solutionId={solution.id}
                        uiSolution={solution.ui_solution}
                      />
                    )}
                    
                    {implementationStep === 2 && (
                      <AutomationWizard automationSolution={solution.automation_solution} />
                    )}
                    
                    {implementationStep === 3 && (
                      <div className="text-center py-12">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Ready to Launch!</h2>
                        <p className="text-gray-600 mb-6">
                          Your SaaS solution has been successfully implemented and is ready to use.
                        </p>
                        <Button className="bg-brand-600 hover:bg-brand-700">
                          Launch Your Solution
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setImplementationStep((prev) => Math.max(0, prev - 1))}
                        disabled={implementationStep === 0}
                      >
                        Previous Step
                      </Button>
                      
                      <Button 
                        onClick={() => {
                          if (implementationStep < 3) {
                            setImplementationStep((prev) => prev + 1);
                          } else {
                            // Completed all steps
                            toast({
                              title: "Implementation Complete",
                              description: "Your solution is now fully implemented!"
                            });
                          }
                        }}
                        disabled={implementationStep === 3}
                        className="bg-brand-600 hover:bg-brand-700"
                      >
                        {implementationStep === 3 ? 'Complete' : 'Next Step'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
