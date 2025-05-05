
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelContextProtocol from "./ModelContextProtocol";
import AppPreviewFrame from "../playground/AppPreviewFrame";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MCPIntegration = () => {
  const [generatedSolution, setGeneratedSolution] = useState<{
    ui: string;
    database: string;
    automation: string;
  } | null>(null);
  
  const [activeTab, setActiveTab] = useState<"configure" | "preview">("configure");
  const [solutionId, setSolutionId] = useState(`mcp-${Date.now().toString(36)}`);
  
  const handleSolutionGenerated = (solution: {
    ui: string;
    database: string;
    automation: string;
  }) => {
    setGeneratedSolution(solution);
    setActiveTab("preview");
    setSolutionId(`mcp-${Date.now().toString(36)}`);
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "configure" | "preview")}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="configure">Configure MCP</TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedSolution}>
              Preview Solution
            </TabsTrigger>
          </TabsList>
          
          {activeTab === "configure" && generatedSolution && (
            <Button
              size="sm"
              onClick={() => setActiveTab("preview")}
              className="flex items-center gap-2"
            >
              View Generated Solution
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <TabsContent value="configure" className="mt-0">
          <ModelContextProtocol onSolutionGenerated={handleSolutionGenerated} />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          {generatedSolution ? (
            <AppPreviewFrame 
              solutionId={solutionId} 
              uiSolution={generatedSolution.ui}
              databaseSolution={generatedSolution.database}
              automationSolution={generatedSolution.automation}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">Generate a solution first to see the preview</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveTab("configure")}
              >
                Configure MCP
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MCPIntegration;
