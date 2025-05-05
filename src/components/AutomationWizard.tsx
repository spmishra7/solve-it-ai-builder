
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stepper, Step } from "@/components/ui/stepper";
import { 
  Zap, Clock, Mail, BellRing, 
  CheckCircle2, ArrowRight, Loader2, Calendar,
  Network
} from "lucide-react";
import N8nIntegration from "./automation/N8nIntegration";

interface AutomationWizardProps {
  automationSolution: string;
}

const AutomationWizard = ({ automationSolution }: AutomationWizardProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [implementingType, setImplementingType] = useState("");
  const [selectedTab, setSelectedTab] = useState("built-in");
  const [workflowId, setWorkflowId] = useState("");
  const { toast } = useToast();
  
  const automationTypes = [
    { id: "email", name: "Email Notifications", icon: <Mail className="h-5 w-5" /> },
    { id: "schedule", name: "Scheduled Tasks", icon: <Calendar className="h-5 w-5" /> },
    { id: "alerts", name: "User Alerts", icon: <BellRing className="h-5 w-5" /> },
    { id: "cron", name: "Cron Jobs", icon: <Clock className="h-5 w-5" /> },
  ];
  
  const steps = [
    { title: "Select Automation Type", description: "Choose the type of automation to implement" },
    { title: "Configure Settings", description: "Set up the required parameters" },
    { title: "Review Code", description: "Check the generated automation code" },
    { title: "Deploy Automation", description: "Implement your automation workflow" },
  ];
  
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setImplementingType("deploy");
      
      if (selectedTab === "n8n" && workflowId) {
        // If n8n integration is selected and we have a workflow ID,
        // we can skip the local deployment and just show success
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "n8n workflow configured!",
          description: "Your automation workflow is now active in n8n.",
        });
      } else {
        // Simulate deployment process for built-in automation
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
          title: "Automation deployed!",
          description: "Your automation workflow is now active and running.",
        });
      }
      
      setImplementingType("");
    } else {
      setActiveStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
  
  const handleWorkflowCreated = (id: string) => {
    setWorkflowId(id);
    toast({
      title: "Workflow created",
      description: "n8n workflow has been created successfully.",
    });
  };
  
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationTypes.map((type) => (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all ${
                  implementingType === type.id ? "border-brand-500 bg-brand-50" : "hover:border-brand-200"
                }`}
                onClick={() => setImplementingType(type.id)}
              >
                <CardContent className="p-4 flex items-center space-x-3">
                  <div className="bg-brand-100 text-brand-700 p-2 rounded-full">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{type.name}</h3>
                    <p className="text-sm text-gray-500">Implement {type.name.toLowerCase()}</p>
                  </div>
                  {implementingType === type.id && <CheckCircle2 className="h-5 w-5 ml-auto text-brand-600" />}
                </CardContent>
              </Card>
            ))}
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-medium mb-2">Configuration Options</h3>
              <p className="text-sm text-gray-600 mb-4">
                Setup parameters for your {automationTypes.find(t => t.id === implementingType)?.name.toLowerCase() || "automation"}
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Enable automation</span>
                  <div className="w-12 h-6 bg-brand-200 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Auto-retry on failure</span>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                    <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Send admin notifications</span>
                  <div className="w-12 h-6 bg-brand-200 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
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
                onWorkflowCreated={handleWorkflowCreated}
              />
            </TabsContent>
          </Tabs>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="p-6 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-900 mb-4">
                {selectedTab === "n8n" ? <Network className="h-8 w-8" /> : <Zap className="h-8 w-8" />}
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to Deploy</h3>
              <p className="text-gray-600 mb-4">
                {selectedTab === "n8n" 
                  ? "Your n8n workflow is configured and ready to activate."
                  : "Your automation is configured and ready to go live."}
              </p>
              
              <div className="flex justify-center space-x-2">
                <Button variant="outline" onClick={() => setActiveStep(2)}>
                  Review Again
                </Button>
                <Button onClick={handleNext}>
                  {selectedTab === "n8n" ? "Activate Workflow" : "Deploy Automation"}
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Implement Automation Workflows</CardTitle>
        <CardDescription>
          Follow this wizard to set up your automation code
          {selectedTab === "n8n" && " using n8n workflow engine"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="px-2">
          <Stepper activeStep={activeStep} orientation="horizontal">
            {steps.map((step, index) => (
              <Step 
                key={index} 
                label={step.title} 
                description={step.description}
                onClick={() => index < activeStep && setActiveStep(index)}
                className={index < activeStep ? "cursor-pointer" : ""}
              />
            ))}
          </Stepper>
        </div>
        
        <div className="min-h-[300px] py-4">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0 || implementingType === "deploy"}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!implementingType || implementingType === "deploy" || (selectedTab === "n8n" && activeStep === 3 && !workflowId)}
          >
            {implementingType === "deploy" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {selectedTab === "n8n" ? "Activating..." : "Deploying..."}
              </>
            ) : activeStep === steps.length - 1 ? (
              <>
                {selectedTab === "n8n" ? "Activate" : "Deploy"}
                {selectedTab === "n8n" ? <Network className="ml-2 h-4 w-4" /> : <Zap className="ml-2 h-4 w-4" />}
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationWizard;
