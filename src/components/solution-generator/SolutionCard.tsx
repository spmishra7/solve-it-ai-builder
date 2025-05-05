
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSolution } from "@/contexts/SolutionContext";
import UICode from "./SolutionPreview";
import DatabaseSchema from "./DatabaseSchema";
import AutomationCode from "./AutomationCode";
import ExpertInsights from "./ExpertInsights";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Save, Download } from "lucide-react";
import ExportOptions from "./ExportOptions";
import { motion } from "framer-motion";

interface SolutionCardProps {
  handleSave: () => Promise<void>;
}

const SolutionCard = ({ handleSave }: SolutionCardProps) => {
  const { solution, solutionTitle, isSaving, selectedRoles, roleNames } = useSolution();
  const [currentTab, setCurrentTab] = useState("ui");
  const [showExport, setShowExport] = useState(false);

  const handleExport = (type: 'ui' | 'database' | 'automation' | 'all') => {
    // Export implementation (will be added in future)
    console.log('Exporting:', type);
  };

  // Add ID and class for easier targeting
  return (
    <Card id="solution-preview" className="mt-8 border-accent/20 solution-card">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 pt-6 px-6">
        <div>
          <CardTitle className="text-2xl font-bold">{solutionTitle || "Your SaaS Solution"}</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Based on your business description</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setShowExport(!showExport)}>
            <Download className="h-4 w-4 mr-2" />
            {showExport ? "Hide Export" : "Export"}
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </CardHeader>

      {showExport && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardContent className="py-4 border-b">
            <ExportOptions handleExport={handleExport} />
          </CardContent>
        </motion.div>
      )}

      <CardContent className="p-0">
        <Tabs defaultValue="ui" value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="w-full justify-start p-0 bg-transparent border-b rounded-none">
            <TabsTrigger value="ui" className="py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-accent">
              UI Solution
            </TabsTrigger>
            <TabsTrigger value="database" className="py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-accent">
              Database Schema
            </TabsTrigger>
            <TabsTrigger value="automation" className="py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-accent">
              Workflow Automation
            </TabsTrigger>
            <TabsTrigger value="insights" className="py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-accent">
              Expert Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ui" className="p-6">
            <UICode 
              content={solution?.ui || ""} 
              selectedRoles={selectedRoles}
              roleNames={roleNames}
            />
          </TabsContent>
          
          <TabsContent value="database" className="p-6">
            <DatabaseSchema content={solution?.database || ""} />
          </TabsContent>
          
          <TabsContent value="automation" className="p-6">
            <AutomationCode content={solution?.automation || ""} />
          </TabsContent>

          <TabsContent value="insights" className="p-6">
            <ExpertInsights 
              insights={solution?.expertInsights || {}} 
              selectedRoles={selectedRoles}
              roleNames={roleNames}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
