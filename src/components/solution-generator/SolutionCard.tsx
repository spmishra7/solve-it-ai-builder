
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSolution } from "@/contexts/SolutionContext";
import SolutionPreview from "./SolutionPreview";
import DatabaseSchema from "./DatabaseSchema";
import AutomationCode from "./AutomationCode";
import ExportOptions from "./ExportOptions";
import { downloadAsFile } from "@/lib/fileUtils";

const SolutionCard = ({ handleSave }: { handleSave: () => Promise<void> }) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [isSaving, setIsSaving] = useState(false);
  const { solution, selectedRoles, roleNames } = useSolution();
  const { session } = useAuth();

  if (!solution) return null;

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
  };

  const handleSaveWrapper = async () => {
    setIsSaving(true);
    await handleSave();
    setIsSaving(false);
  };

  return (
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
                    onClick={handleSaveWrapper}
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
  );
};

export default SolutionCard;
