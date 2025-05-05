
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, GitBranch, Globe, Rocket } from "lucide-react";

interface DeploymentOptionsProps {
  solutionId: string;
  uiSolution: string;
}

const DeploymentOptions = ({ solutionId, uiSolution }: DeploymentOptionsProps) => {
  const [deployingTo, setDeployingTo] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleDeploy = async (platform: string) => {
    setDeployingTo(platform);
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Deployment initiated!",
        description: `Your solution is being deployed to ${platform}. You'll receive an email when it's ready.`,
      });
    } catch (error) {
      toast({
        title: "Deployment failed",
        description: "There was an error deploying your solution. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setDeployingTo(null);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy Your Solution</CardTitle>
        <CardDescription>
          Choose a hosting platform to deploy your SaaS application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vercel" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="vercel">Vercel</TabsTrigger>
            <TabsTrigger value="netlify">Netlify</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vercel" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 flex items-center justify-center">
                <svg viewBox="0 0 76 65" fill="none" className="h-6 w-6">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000000" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Vercel</h3>
                <p className="text-sm text-gray-500">Zero configuration, automatic deployments</p>
              </div>
            </div>
            <Button
              onClick={() => handleDeploy("Vercel")}
              className="w-full"
              disabled={!!deployingTo}
            >
              {deployingTo === "Vercel" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Deploy to Vercel
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="netlify" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
                  <path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm-2.13 23.814L23.814 13.87 24.2 21.6c.055 1.11-.853 1.984-1.963 1.85l-8.368-1.636h.001zm3.956-18.081c.718-.718 1.881-.718 2.599 0 .718.718.718 1.881 0 2.599-.718.718-1.881.718-2.599 0-.718-.718-.718-1.881 0-2.599zm-5.436 4.36l3.107 3.107-5.643 5.643-2.75-.536a1.002 1.002 0 01-.814-.814l-.536-2.75 6.636-4.65zM11.765 6.802a2 2 0 11-2.829 2.829 2 2 0 012.829-2.829z" fill="#37A8AD"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Netlify</h3>
                <p className="text-sm text-gray-500">Simple, direct deployment with CDN</p>
              </div>
            </div>
            <Button
              onClick={() => handleDeploy("Netlify")}
              className="w-full"
              disabled={!!deployingTo}
            >
              {deployingTo === "Netlify" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Deploy to Netlify
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="github" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 flex items-center justify-center">
                <GitBranch className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">GitHub Pages</h3>
                <p className="text-sm text-gray-500">Deploy via GitHub repository</p>
              </div>
            </div>
            <Button
              onClick={() => handleDeploy("GitHub Pages")}
              className="w-full"
              disabled={!!deployingTo}
            >
              {deployingTo === "GitHub Pages" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <GitBranch className="mr-2 h-4 w-4" />
                  Deploy to GitHub Pages
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeploymentOptions;
