
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Download, 
  Github, 
  GitBranch, 
  Globe, 
  Lock,
  Key,
  Code,
  Share2,
  Server
} from "lucide-react";

interface ExportOptionsProps {
  solutionId: string;
  isAuthenticated: boolean;
  isPremium: boolean;
}

const ExportOptions = ({ solutionId, isAuthenticated, isPremium = false }: ExportOptionsProps) => {
  const [activeTab, setActiveTab] = useState("code");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  const handleExport = async (type: string) => {
    if (!isAuthenticated || !isPremium) {
      toast({
        title: "Feature Locked",
        description: "This feature is available for premium users only.",
        variant: "destructive"
      });
      return;
    }
    
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Export Successful",
        description: `Your ${type} export has been processed.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error processing your export.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleGenerateApiKey = async () => {
    if (!isAuthenticated || !isPremium) {
      toast({
        title: "Feature Locked",
        description: "API access is available for premium users only.",
        variant: "destructive"
      });
      return;
    }
    
    setIsExporting(true);
    
    try {
      // Simulate API key generation process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "API Key Generated",
        description: "Your API key has been generated and can be found in your account settings.",
      });
    } catch (error) {
      toast({
        title: "Key Generation Failed",
        description: "There was an error generating your API key.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export & Deployment</CardTitle>
        <CardDescription>
          Take your generated SaaS application and use it however you want
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b px-6 py-2">
            <TabsList>
              <TabsTrigger value="code">Export Code</TabsTrigger>
              <TabsTrigger value="hosting">Live Hosting</TabsTrigger>
              <TabsTrigger value="api">API Access</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="px-6 py-4">
            <TabsContent value="code" className="mt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium mb-1">Download as ZIP</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Get the complete codebase including frontend, database schema, and automation code.
                        </p>
                      </div>
                      <Download className="h-8 w-8 text-brand-600" />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleExport('zip')}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download ZIP
                        </>
                      )}
                    </Button>
                    {!isPremium && (
                      <div className="flex items-center mt-4 py-2 px-3 bg-gray-50 border rounded-md">
                        <Lock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-xs text-gray-500">Premium feature</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium mb-1">Export to GitHub</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Push the code directly to a new GitHub repository under your account.
                        </p>
                      </div>
                      <Github className="h-8 w-8 text-brand-600" />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleExport('github')}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <GitBranch className="mr-2 h-4 w-4" />
                          Export to GitHub
                        </>
                      )}
                    </Button>
                    {!isPremium && (
                      <div className="flex items-center mt-4 py-2 px-3 bg-gray-50 border rounded-md">
                        <Lock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-xs text-gray-500">Premium feature</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <div className="flex">
                  <Code className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-700 mb-1">What's included in the code export</h3>
                    <ul className="text-xs text-blue-600 space-y-1 list-disc ml-4">
                      <li>Complete React frontend with all components</li>
                      <li>Database schema SQL for setup</li>
                      <li>API endpoints and server-side logic</li>
                      <li>Automation scripts and workflows</li>
                      <li>Documentation and setup instructions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="hosting" className="mt-0 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-1">Deploy to Our Platform</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        We'll host your solution on our secure platform with a custom subdomain.
                      </p>
                    </div>
                    <Globe className="h-8 w-8 text-brand-600" />
                  </div>
                  
                  <div className="mb-6">
                    <label className="text-sm font-medium">Your Subdomain</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        className="flex-1 rounded-l-md border border-r-0 border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="your-subdomain"
                      />
                      <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                        .drsolveit.com
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => handleExport('hosting')}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Server className="mr-2 h-4 w-4" />
                        Deploy Solution
                      </>
                    )}
                  </Button>
                  
                  {!isPremium && (
                    <div className="flex items-center mt-4 py-2 px-3 bg-gray-50 border rounded-md">
                      <Lock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Premium feature</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <div className="flex">
                  <Server className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-700 mb-1">Hosting Features</h3>
                    <ul className="text-xs text-blue-600 space-y-1 list-disc ml-4">
                      <li>Custom subdomain (yourname.drsolveit.com)</li>
                      <li>SSL certificate included</li>
                      <li>Automatic database setup</li>
                      <li>Scheduled backups</li>
                      <li>High-availability infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="mt-0 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-1">API Access</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Connect your solution to other platforms with our auto-generated API endpoints.
                      </p>
                    </div>
                    <Key className="h-8 w-8 text-brand-600" />
                  </div>
                  
                  <Button 
                    className="w-full mb-4"
                    onClick={handleGenerateApiKey}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 h-4 w-4" />
                        Generate API Key
                      </>
                    )}
                  </Button>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Available Endpoints</h4>
                    <div className="bg-gray-50 p-3 rounded-md border text-sm">
                      <p className="font-mono text-gray-600 text-xs mb-1">GET /api/v1/data</p>
                      <p className="text-xs text-gray-500">Retrieve all records</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border text-sm">
                      <p className="font-mono text-gray-600 text-xs mb-1">POST /api/v1/data</p>
                      <p className="text-xs text-gray-500">Create a new record</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border text-sm">
                      <p className="font-mono text-gray-600 text-xs mb-1">PUT /api/v1/data/:id</p>
                      <p className="text-xs text-gray-500">Update an existing record</p>
                    </div>
                  </div>
                  
                  {!isPremium && (
                    <div className="flex items-center mt-4 py-2 px-3 bg-gray-50 border rounded-md">
                      <Lock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Premium feature</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <div className="flex">
                  <Share2 className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-700 mb-1">API Integration Benefits</h3>
                    <ul className="text-xs text-blue-600 space-y-1 list-disc ml-4">
                      <li>RESTful API with full CRUD operations</li>
                      <li>Secure authentication with API keys</li>
                      <li>Rate limiting to prevent abuse</li>
                      <li>Comprehensive API documentation</li>
                      <li>Webhooks for real-time integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
