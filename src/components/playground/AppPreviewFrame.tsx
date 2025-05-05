
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcw, Smartphone, Tablet, Monitor, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppPreviewFrameProps {
  solutionId: string;
  uiSolution: string;
  databaseSolution?: string;
  automationSolution?: string;
}

const AppPreviewFrame = ({ 
  solutionId, 
  uiSolution, 
  databaseSolution, 
  automationSolution 
}: AppPreviewFrameProps) => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const { toast } = useToast();

  // Handle refresh of the preview
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Get frame dimensions based on view mode
  const getFrameDimensions = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-[375px] h-[667px]";
      case "tablet":
        return "max-w-[768px] h-[1024px]";
      default:
        return "w-full h-[600px]";
    }
  };

  return (
    <Card className="mt-6">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Interactive App Preview</h3>
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mr-4">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center border rounded-md p-1">
            <Button
              variant="ghost" 
              size="sm"
              className={`p-1 h-8 ${viewMode === "mobile" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone size={18} />
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              className={`p-1 h-8 ${viewMode === "tablet" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("tablet")}
            >
              <Tablet size={18} />
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              className={`p-1 h-8 ${viewMode === "desktop" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("desktop")}
            >
              <Monitor size={18} />
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      <CardContent className="p-0">
        <TabsContent value="preview" className="m-0">
          <div className={`mx-auto transition-all duration-300 ${getFrameDimensions()}`}>
            {isRefreshing ? (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <RefreshCcw className="animate-spin h-8 w-8 text-gray-400" />
              </div>
            ) : (
              <iframe
                srcDoc={uiSolution}
                className="w-full h-full border-0"
                sandbox="allow-scripts"
                title="App Preview"
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="m-0 p-4">
          <Tabs defaultValue="ui">
            <TabsList className="mb-4">
              <TabsTrigger value="ui">UI</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ui" className="mt-0">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-[500px] font-mono text-sm">
                <pre>{uiSolution}</pre>
              </div>
            </TabsContent>
            
            <TabsContent value="database" className="mt-0">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-[500px] font-mono text-sm">
                <pre>{databaseSolution || "No database solution available"}</pre>
              </div>
            </TabsContent>
            
            <TabsContent value="automation" className="mt-0">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-[500px] font-mono text-sm">
                <pre>{automationSolution || "No automation solution available"}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default AppPreviewFrame;
