
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Eye, RefreshCcw } from "lucide-react";

interface LivePreviewPlaygroundProps {
  solutionId: string;
  uiSolution: string;
  title: string;
  isAuthenticated: boolean;
}

const LivePreviewPlayground = ({ solutionId, uiSolution, title, isAuthenticated }: LivePreviewPlaygroundProps) => {
  const [activeView, setActiveView] = useState("desktop");
  const [isLoading, setIsLoading] = useState(false);
  const [sampleData, setSampleData] = useState(true);
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };
  
  const handleToggleSampleData = () => {
    setSampleData(!sampleData);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
        <CardTitle className="text-lg">Interactive Preview</CardTitle>
        <div className="flex items-center gap-2">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-fit">
            <TabsList>
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="tablet">Tablet</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Preview toolbar */}
          <div className="flex items-center justify-between border-t border-b bg-gray-50 px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-500">
              {title} - Preview Mode
            </span>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 px-2 text-xs"
                onClick={handleToggleSampleData}
              >
                {sampleData ? "Hide" : "Show"} Sample Data
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-7 w-7 p-0"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCcw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          
          {/* Preview frame */}
          <div 
            className={`border-b overflow-hidden transition-all ${
              activeView === "mobile" ? "max-w-[320px] mx-auto h-[480px]" :
              activeView === "tablet" ? "max-w-[768px] mx-auto h-[600px]" :
              "w-full h-[600px]"
            }`}
          >
            {isAuthenticated ? (
              <div className="w-full h-full overflow-auto bg-white p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                  </div>
                ) : (
                  <div className="h-full overflow-auto" dangerouslySetInnerHTML={{ __html: uiSolution }} />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
                  <Lock className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Preview Locked</h3>
                  <p className="text-gray-600 mb-6">
                    Interactive preview is available for registered users. Sign in or create an account to access this feature.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" className="w-28">Sign In</Button>
                    <Button className="w-28 bg-brand-600 hover:bg-brand-700">Sign Up</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Feature lock overlay for advanced functionality */}
          {isAuthenticated && (
            <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Try out basic functionality</p>
                <p className="text-xs text-gray-500">Interact with the UI to see how it would work</p>
              </div>
              <Button className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700">
                <Eye className="h-4 w-4" />
                <span>Full Preview</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePreviewPlayground;
