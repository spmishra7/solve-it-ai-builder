
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import N8nIntegration from "../N8nIntegration";

interface ReviewCodeStepProps {
  automationSolution: string;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  onWorkflowCreated: (id: string) => void;
}

const ReviewCodeStep = ({
  automationSolution,
  selectedTab,
  setSelectedTab,
  onWorkflowCreated,
}: ReviewCodeStepProps) => {
  const { toast } = useToast();

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
      <TabsList className="grid grid-cols-2 w-full mb-4">
        <TabsTrigger value="built-in">Built-in Automation</TabsTrigger>
        <TabsTrigger value="n8n">n8n Integration</TabsTrigger>
      </TabsList>
      
      <TabsContent value="built-in">
        <div className="space-y-4">
          <div className="p-4 bg-gray-900 text-blue-400 rounded-md font-mono text-sm overflow-auto max-h-[300px]">
            <pre>{automationSolution}</pre>
          </div>
          
          <Button variant="outline" className="w-full" onClick={() => {
            navigator.clipboard.writeText(automationSolution);
            toast({ 
              title: "Code copied to clipboard",
              description: "You can now implement this automation code in your project."
            });
          }}>
            Copy Code
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="n8n">
        <N8nIntegration 
          automationSolution={automationSolution}
          onWorkflowCreated={onWorkflowCreated}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ReviewCodeStep;
