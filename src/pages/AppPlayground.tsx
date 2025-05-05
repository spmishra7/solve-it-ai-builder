
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import AppPreviewFrame from "@/components/playground/AppPreviewFrame";
import PlaygroundChat from "@/components/playground/PlaygroundChat";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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
  const [saving, setSaving] = useState(false);
  const [modifiedUiSolution, setModifiedUiSolution] = useState<string | null>(null);
  const [modifiedDbSolution, setModifiedDbSolution] = useState<string | null>(null);
  const [modifiedAutomationSolution, setModifiedAutomationSolution] = useState<string | null>(null);
  const [changeHistory, setChangeHistory] = useState<string[]>([]);
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSolution = async () => {
      if (!id || id === ':id') {
        toast({
          title: "Invalid Solution ID",
          description: "Unable to find the requested solution.",
          variant: "destructive"
        });
        navigate('/my-solutions');
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('solutions')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setSolution(data);
        
        // Initialize the modified solutions with the original ones
        setModifiedUiSolution(data.ui_solution);
        setModifiedDbSolution(data.database_solution);
        setModifiedAutomationSolution(data.automation_solution);
      } catch (error: any) {
        console.error("Error fetching solution:", error);
        toast({
          title: "Error",
          description: "Failed to load solution details.",
          variant: "destructive"
        });
        
        // Redirect to solutions list if we can't find this solution
        if (error.code === '22P02' || error.message?.includes('invalid input syntax')) {
          navigate('/my-solutions');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchSolution();
  }, [id, toast, navigate]);
  
  const handleApplyChanges = (changes: string) => {
    // Determine which part of the solution the changes apply to based on content
    const isUiChange = !changes.includes('CREATE TABLE') && 
                     !changes.includes('ALTER TABLE') &&
                     !changes.includes('function') &&
                     !changes.includes('async function');
    
    const isDbChange = changes.includes('CREATE TABLE') || 
                      changes.includes('ALTER TABLE') ||
                      changes.includes('ADD COLUMN') ||
                      changes.includes('INSERT INTO');
    
    const isAutomationChange = changes.includes('function') ||
                               changes.includes('async') ||
                               changes.includes('await');
    
    // Track the change history
    setChangeHistory(prev => [...prev, changes]);
    
    // Apply changes to the appropriate solution
    if (isUiChange && modifiedUiSolution) {
      // For UI changes, try to append to the body or update styles
      const newUi = applyUiChanges(modifiedUiSolution, changes);
      setModifiedUiSolution(newUi);
      toast({
        title: "UI Changes Applied",
        description: "Your UI code changes have been applied."
      });
    } else if (isDbChange && modifiedDbSolution) {
      // For DB changes, append the new SQL
      setModifiedDbSolution(prev => prev + "\n\n-- New changes\n" + changes);
      toast({
        title: "Database Changes Applied",
        description: "Your database schema changes have been applied."
      });
    } else if (isAutomationChange && modifiedAutomationSolution) {
      // For automation changes, append the new function
      setModifiedAutomationSolution(prev => prev + "\n\n// New automation\n" + changes);
      toast({
        title: "Automation Changes Applied",
        description: "Your automation workflow changes have been applied."
      });
    } else {
      // If we can't determine the type, default to UI changes
      if (modifiedUiSolution) {
        const newUi = applyUiChanges(modifiedUiSolution, changes);
        setModifiedUiSolution(newUi);
        toast({
          title: "Changes Applied",
          description: "Your changes have been applied to the UI."
        });
      }
    }
  };
  
  // Helper function to intelligently apply UI changes
  const applyUiChanges = (currentHtml: string, changes: string): string => {
    // If it's a CSS change
    if (changes.includes('{') && changes.includes('}') && !changes.includes('<')) {
      // Try to insert it into the <style> tag if it exists
      if (currentHtml.includes('<style>')) {
        return currentHtml.replace(
          /<style>([\s\S]*?)<\/style>/,
          `<style>$1\n\n/* New styles */\n${changes}\n</style>`
        );
      } else {
        // Add a new style tag
        return currentHtml.replace(
          '<head>',
          `<head>\n<style>\n/* New styles */\n${changes}\n</style>`
        );
      }
    }
    
    // If it's an HTML component
    if (changes.includes('<') && changes.includes('>')) {
      // Try to add it to the main content area
      if (currentHtml.includes('<main>')) {
        return currentHtml.replace(
          /<main>([\s\S]*?)<\/main>/,
          `<main>$1\n\n<!-- New component -->\n${changes}\n</main>`
        );
      } else if (currentHtml.includes('<body>')) {
        return currentHtml.replace(
          /<body>([\s\S]*?)<\/body>/,
          `<body>$1\n\n<!-- New component -->\n${changes}\n</body>`
        );
      }
    }
    
    // If it's a JavaScript component or function
    if (changes.includes('function') && !changes.includes('<')) {
      // Try to add it to the script tag
      if (currentHtml.includes('<script>')) {
        return currentHtml.replace(
          /<script>([\s\S]*?)<\/script>/,
          `<script>$1\n\n// New function\n${changes}\n</script>`
        );
      } else {
        // Add a new script tag
        return currentHtml.replace(
          '</body>',
          `<script>\n// New function\n${changes}\n</script>\n</body>`
        );
      }
    }
    
    // Default: append to the body
    return currentHtml.replace(
      '</body>',
      `\n<!-- New content -->\n${changes}\n</body>`
    );
  };
  
  const handleSaveSolution = async () => {
    if (!solution || !session?.user) return;
    
    setSaving(true);
    
    try {
      // Try to update on Supabase if available
      try {
        const { error } = await supabase
          .from('solutions')
          .update({
            ui_solution: modifiedUiSolution,
            database_solution: modifiedDbSolution,
            automation_solution: modifiedAutomationSolution,
            updated_at: new Date().toISOString()
          })
          .eq('id', solution.id);
        
        if (error) throw error;
        
        toast({
          title: "Changes Saved",
          description: "Your solution has been updated successfully."
        });
      } catch (supabaseError) {
        console.error("Supabase error, falling back to local storage:", supabaseError);
        // Fallback to localStorage if Supabase is not available
        const savedSolutions = JSON.parse(localStorage.getItem('savedSolutions') || '[]');
        
        const existingSolutionIndex = savedSolutions.findIndex((s: any) => s.id === solution.id);
        
        if (existingSolutionIndex !== -1) {
          savedSolutions[existingSolutionIndex] = {
            ...savedSolutions[existingSolutionIndex],
            ui_solution: modifiedUiSolution,
            database_solution: modifiedDbSolution,
            automation_solution: modifiedAutomationSolution,
            updated_at: new Date().toISOString()
          };
        } else {
          savedSolutions.push({
            ...solution,
            ui_solution: modifiedUiSolution,
            database_solution: modifiedDbSolution,
            automation_solution: modifiedAutomationSolution,
            updated_at: new Date().toISOString()
          });
        }
        
        localStorage.setItem('savedSolutions', JSON.stringify(savedSolutions));
        
        toast({
          title: "Changes Saved Locally",
          description: "Your solution has been saved to local storage."
        });
      }
    } catch (error) {
      console.error("Error saving solution:", error);
      toast({
        title: "Save Failed",
        description: "There was a problem saving your changes.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleExportSolution = () => {
    if (!solution) return;
    
    // Create a downloadable HTML file from the UI solution
    const blob = new Blob([modifiedUiSolution || solution.ui_solution], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${solution.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Your solution has been exported as an HTML file."
    });
  };
  
  const handleResetChanges = () => {
    if (!solution) return;
    
    // Reset to original solution
    setModifiedUiSolution(solution.ui_solution);
    setModifiedDbSolution(solution.database_solution);
    setModifiedAutomationSolution(solution.automation_solution);
    setChangeHistory([]);
    
    toast({
      title: "Changes Reset",
      description: "All changes have been reverted to the original solution."
    });
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
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleResetChanges}
            className="hidden sm:flex"
          >
            Reset Changes
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportSolution}
          >
            <Download className="mr-2 h-4 w-4" /> 
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button 
            onClick={handleSaveSolution}
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" /> 
            <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save Changes'}</span>
          </Button>
        </div>
      </div>
      
      {changeHistory.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Change History</h3>
            <div className="max-h-32 overflow-y-auto text-sm">
              {changeHistory.map((change, index) => (
                <div key={index} className="py-1 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-500">Change {index + 1}</span>: 
                  <span className="ml-2 font-mono text-xs">{change.length > 50 ? `${change.substring(0, 50)}...` : change}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppPreviewFrame
            solutionId={solution.id}
            uiSolution={modifiedUiSolution || solution.ui_solution}
            databaseSolution={modifiedDbSolution || solution.database_solution}
            automationSolution={modifiedAutomationSolution || solution.automation_solution}
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
