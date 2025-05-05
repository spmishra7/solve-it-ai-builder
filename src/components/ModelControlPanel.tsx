
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Network, BarChart3, Cpu } from "lucide-react";
import ModelsTabContent from "./model-control/ModelsTabContent";
import N8nTabContent from "./model-control/N8nTabContent";
import AnalyticsTabContent from "./model-control/AnalyticsTabContent";

const ModelControlPanel = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="n8n" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            n8n Integration
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models">
          <ModelsTabContent />
        </TabsContent>
        
        <TabsContent value="n8n">
          <N8nTabContent />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelControlPanel;
