
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import ExpertRoleSelector from "./ExpertRoleSelector";
import PromptInput from "./solution-generator/PromptInput";
import GenerateButton from "./solution-generator/GenerateButton";
import SolutionPreview from "./solution-generator/SolutionPreview";
import DatabaseSchema from "./solution-generator/DatabaseSchema";
import AutomationCode from "./solution-generator/AutomationCode";
import ExportOptions from "./solution-generator/ExportOptions";
import { downloadAsFile, improvePrompt } from "@/lib/fileUtils";
import { generateSolution } from "@/lib/api";

const SolutionGenerator = () => {
  const [businessDescription, setBusinessDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImprovingPrompt, setIsImprovingPrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [solution, setSolution] = useState<null | {
    ui: string, 
    database: string, 
    automation: string, 
    expertInsights?: Record<string, string>
  }>(null);
  const [activeTab, setActiveTab] = useState("preview");
  const [progress, setProgress] = useState(0);
  const [solutionTitle, setSolutionTitle] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [roleNames, setRoleNames] = useState<Record<string, string>>({});

  const { toast } = useToast();
  const { session } = useAuth();
  const navigate = useNavigate();

  // Reset progress when not generating
  useEffect(() => {
    if (!isGenerating) setProgress(0);
  }, [isGenerating]);

  // Update progress bar while generating
  useEffect(() => {
    if (isGenerating && progress < 95) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + (95 - prev) * 0.2);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, progress]);
  
  // Get role display names when roles are selected
  useEffect(() => {
    if (selectedRoles.length > 0) {
      // This would normally come from your roles data
      // For now we'll set some example names
      const tempRoleNames: Record<string, string> = {};
      selectedRoles.forEach(roleId => {
        // This is a placeholder - in a real app, you'd get this from your roleData
        tempRoleNames[roleId] = roleId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      });
      setRoleNames(tempRoleNames);
    }
  }, [selectedRoles]);

  const handleRoleToggle = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter(id => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  const handleGenerate = async () => {
    if (!businessDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe your business problem.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(10);

    try {
      // Here we're using the actual API function instead of the mock
      const result = await generateSolution(
        businessDescription,
        "business owner",  // default user type
        "standard",        // default template
        undefined,         // use default model config
        selectedRoles      // pass selected roles
      );
      
      setProgress(100);
      
      // Transform the result to match our component's expected format
      const transformedResult = {
        ui: result.ui_solution,
        database: result.database_solution,
        automation: result.automation_solution,
        // Note: expertInsights would come from the API response in a real implementation
      };
      
      setSolution(transformedResult);
      
      // Generate a title based on the business description
      setSolutionTitle(result.title || businessDescription.substring(0, 50) + '...');
      
      toast({
        title: "Solution Generated",
        description: "Your SaaS solution is ready."
      });
    } catch (error) {
      console.error("Error generating solution:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your solution.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImprovePrompt = async () => {
    if (!businessDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description to improve.",
        variant: "destructive"
      });
      return;
    }

    setIsImprovingPrompt(true);

    try {
      const improved = await improvePrompt(businessDescription);
      setBusinessDescription(improved);
      
      toast({
        title: "Prompt Improved",
        description: "Your business description has been enhanced."
      });
    } catch (error) {
      toast({
        title: "Improvement Failed",
        description: "There was an error improving your description.",
        variant: "destructive"
      });
    } finally {
      setIsImprovingPrompt(false);
    }
  };

  const handleExport = (type: 'ui' | 'database' | 'automation' | 'all') => {
    if (!solution) return;

    switch(type) {
      case 'ui':
        downloadAsFile(solution.ui, 'ui-code.html');
        break;
      case 'database':
        downloadAsFile(solution.database, 'database-schema.sql');
        break;
      case 'automation':
        downloadAsFile(solution.automation, 'automation-code.js');
        break;
      case 'all':
        const allContent = `
/* UI CODE */
${solution.ui}

/* DATABASE SCHEMA */
${solution.database}

/* AUTOMATION CODE */
${solution.automation}
`;
        downloadAsFile(allContent, 'complete-solution.txt');
        break;
    }

    toast({
      title: "Export Complete",
      description: `Your ${type === 'all' ? 'complete solution' : type + ' code'} has been downloaded.`
    });
  };

  const handleSave = async () => {
    if (!session?.user || !solution) {
      toast({
        title: "Cannot Save",
        description: session ? "No solution to save." : "You must be logged in to save solutions.",
        variant: "destructive"
      });
      
      if (!session?.user) {
        navigate("/auth");
      }
      
      return;
    }

    setIsSaving(true);

    try {
      const { data, error } = await supabase
        .from('solutions')
        .insert([
          {
            title: solutionTitle,
            business_prompt: businessDescription,
            ui_solution: solution.ui,
            database_solution: solution.database,
            automation_solution: solution.automation,
            user_id: session.user.id
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Solution Saved",
        description: "Your solution has been saved to your account."
      });

      // Redirect to the solution detail page
      if (data && data[0]) {
        navigate(`/solutions/${data[0].id}`);
      }
    } catch (error) {
      console.error("Error saving solution:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your solution.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section id="solution-generator" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your SaaS Solution</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your business problem, and our AI will generate a complete SaaS solution with UI, database schema, and workflow automation.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <PromptInput
                businessDescription={businessDescription}
                setBusinessDescription={setBusinessDescription}
                isGenerating={isGenerating}
                isImprovingPrompt={isImprovingPrompt}
                handleImprovePrompt={handleImprovePrompt}
              />

              <ExpertRoleSelector
                selectedRoles={selectedRoles}
                onRoleToggle={handleRoleToggle}
              />

              <GenerateButton
                handleGenerate={handleGenerate}
                isGenerating={isGenerating}
                disabled={!businessDescription.trim()}
                progress={progress}
              />
            </div>
          </CardContent>
        </Card>

        {solution && (
          <Card>
            <CardContent className="p-0">
              <div className="border-b">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <div className="flex justify-between items-center px-6 py-4">
                    <TabsList className="grid grid-cols-4 w-fit">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="database">Database</TabsTrigger>
                      <TabsTrigger value="automation">Automation</TabsTrigger>
                      <TabsTrigger value="export">Export</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      {session?.user && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Solution
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </Tabs>
              </div>

              <TabsContent value="preview" className="p-6">
                <SolutionPreview 
                  solution={solution} 
                  selectedRoles={selectedRoles}
                  roleNames={roleNames}
                />
              </TabsContent>

              <TabsContent value="database" className="p-6">
                <DatabaseSchema schema={solution.database} />
              </TabsContent>

              <TabsContent value="automation" className="p-6">
                <AutomationCode code={solution.automation} />
              </TabsContent>

              <TabsContent value="export" className="p-6">
                <ExportOptions handleExport={handleExport} />
              </TabsContent>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default SolutionGenerator;
