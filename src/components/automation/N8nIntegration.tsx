
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useN8nAutomation } from "@/hooks/useN8nAutomation";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Play, Plus, ExternalLink, Code } from "lucide-react";

interface N8nIntegrationProps {
  automationSolution: string;
  onWorkflowCreated?: (workflowId: string) => void;
}

const N8nIntegration = ({ automationSolution, onWorkflowCreated }: N8nIntegrationProps) => {
  const { toast } = useToast();
  const [n8nUrl, setN8nUrl] = useState<string>(localStorage.getItem("n8nUrl") || "");
  const [activeTab, setActiveTab] = useState<string>("workflows");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
  
  const {
    isLoading,
    workflows,
    error,
    fetchWorkflows,
    createWorkflow,
    executeWorkflow
  } = useN8nAutomation();

  useEffect(() => {
    if (n8nUrl) {
      fetchWorkflows();
    }
  }, [n8nUrl]);

  const handleSaveN8nUrl = () => {
    if (!n8nUrl) {
      toast({
        title: "Error",
        description: "Please enter your n8n URL",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem("n8nUrl", n8nUrl);
    toast({
      title: "Success",
      description: "n8n URL saved successfully"
    });
    
    fetchWorkflows();
  };

  const handleCreateWorkflow = async () => {
    if (!automationSolution) {
      toast({
        title: "Error",
        description: "No automation solution available to convert",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await createWorkflow(automationSolution);
      if (result?.workflow?.id) {
        setSelectedWorkflowId(result.workflow.id);
        if (onWorkflowCreated) {
          onWorkflowCreated(result.workflow.id);
        }
      }
    } catch (error) {
      console.error("Error creating workflow:", error);
    }
  };

  const handleExecuteWorkflow = async () => {
    if (!selectedWorkflowId) {
      toast({
        title: "Error",
        description: "Please select a workflow to execute",
        variant: "destructive"
      });
      return;
    }

    try {
      await executeWorkflow(selectedWorkflowId);
    } catch (error) {
      console.error("Error executing workflow:", error);
    }
  };

  const renderWorkflowList = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 p-4 rounded-md text-red-800">
          <p className="font-medium">Failed to fetch workflows</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }

    if (!workflows.length) {
      return (
        <div className="bg-gray-50 p-6 rounded-md text-center">
          <p className="text-gray-600 mb-4">No workflows found</p>
          <Button onClick={handleCreateWorkflow}>
            <Plus className="mr-2 h-4 w-4" /> Create from Automation Code
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <div 
            key={workflow.id}
            className={`flex items-center justify-between p-4 border rounded-md cursor-pointer ${
              selectedWorkflowId === workflow.id ? "border-brand-500 bg-brand-50" : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedWorkflowId(workflow.id)}
          >
            <div>
              <p className="font-medium">{workflow.name}</p>
              <p className="text-sm text-gray-500">Created: {new Date(workflow.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              {workflow.active && <Badge variant="outline" className="bg-green-50 text-green-800">Active</Badge>}
              <Button size="sm" variant="ghost" onClick={() => window.open(`${n8nUrl}/workflow/${workflow.id}`, '_blank')}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>n8n Workflow Integration</CardTitle>
        <CardDescription>
          Connect your automation code to n8n for advanced workflow management
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Label htmlFor="n8nUrl" className="mb-2 block">n8n Instance URL</Label>
            <Input
              id="n8nUrl"
              placeholder="https://your-n8n-instance.com"
              value={n8nUrl}
              onChange={(e) => setN8nUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveN8nUrl} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Connect
          </Button>
        </div>
        
        {n8nUrl && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="workflows">Available Workflows</TabsTrigger>
              <TabsTrigger value="code">Automation Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="workflows" className="pt-4">
              <div className="space-y-4">
                {renderWorkflowList()}
                
                {selectedWorkflowId && (
                  <div className="flex justify-end mt-4">
                    <Button onClick={handleExecuteWorkflow} disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                      Execute Workflow
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="pt-4">
              <div className="space-y-4">
                <div className="bg-gray-900 text-blue-400 p-4 rounded-md overflow-auto max-h-[300px] font-mono text-sm">
                  <pre>{automationSolution}</pre>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleCreateWorkflow} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Code className="mr-2 h-4 w-4" />}
                    Convert to n8n Workflow
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default N8nIntegration;
