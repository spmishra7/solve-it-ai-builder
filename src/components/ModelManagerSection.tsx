
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelControlPanel from "./ModelControlPanel";
import { Settings2, Cpu, BarChart3 } from "lucide-react";

const ModelManagerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("models");

  return (
    <section id="model-manager" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">AI Model Management</h2>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="models" className="flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    Model Control
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4" />
                    Advanced Settings
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="models" className="mt-0">
                <ModelControlPanel />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
                  <p>Configure advanced settings for model management here. This feature is coming soon.</p>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-0">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <h3 className="text-lg font-medium mb-4">Usage Analytics</h3>
                  <p>View detailed analytics about model usage and performance. This feature is coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ModelManagerSection;
