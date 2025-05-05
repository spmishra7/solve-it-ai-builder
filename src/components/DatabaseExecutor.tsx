
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Code, Database, AlertCircle, Check, Loader2, Brain } from "lucide-react";

interface DatabaseExecutorProps {
  databaseSolution: string;
}

const DatabaseExecutor = ({ databaseSolution }: DatabaseExecutorProps) => {
  const [executing, setExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [learningInsight, setLearningInsight] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleExecuteSQL = async () => {
    setExecuting(true);
    
    try {
      // Call an edge function that would execute the SQL in the user's Supabase project
      const { data, error } = await supabase.functions.invoke('execute-sql', {
        body: { sql: databaseSolution },
      });
      
      if (error) throw error;
      
      setExecuted(true);
      toast({
        title: "SQL executed successfully",
        description: "Your database schema has been set up in your Supabase project.",
      });
      
      // After successful execution, check for learning insights
      try {
        const { data: insightData } = await supabase.functions.invoke('get-solution-insights', {
          body: { 
            solutionType: "database",
            solutionContent: databaseSolution
          },
        });
        
        if (insightData?.insights) {
          setLearningInsight(insightData.insights);
        }
      } catch (insightError) {
        console.error("Error getting insights:", insightError);
        // Don't display an error to the user for this optional feature
      }
      
    } catch (error: any) {
      console.error("Error executing SQL:", error);
      toast({
        title: "Failed to execute SQL",
        description: error.message || "There was an error setting up your database schema.",
        variant: "destructive",
      });
    } finally {
      setExecuting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Up Database Schema</CardTitle>
        <CardDescription>
          Execute the generated SQL in your Supabase project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Database Schema</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(databaseSolution);
                toast({
                  title: "SQL copied to clipboard",
                  description: "You can now manually execute it in your Supabase SQL editor.",
                });
              }}
            >
              <Code className="h-4 w-4 mr-2" />
              Copy SQL
            </Button>
          </div>
        </div>
        
        {executed && (
          <Alert className="border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>SQL Executed</AlertTitle>
            <AlertDescription>
              Your database schema has been successfully set up in your Supabase project.
            </AlertDescription>
          </Alert>
        )}
        
        {learningInsight && (
          <Alert className="border-blue-200 bg-blue-50">
            <Brain className="h-4 w-4 text-blue-600" />
            <AlertTitle>Learning Insight</AlertTitle>
            <AlertDescription>
              {learningInsight}
            </AlertDescription>
          </Alert>
        )}
        
        <Button
          onClick={handleExecuteSQL}
          className="w-full"
          disabled={executing || executed}
        >
          {executing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Executing SQL...
            </>
          ) : executed ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Database Schema Created
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Execute SQL in My Supabase Project
            </>
          )}
        </Button>
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Make sure your Supabase project is connected to ensure proper database setup.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default DatabaseExecutor;
