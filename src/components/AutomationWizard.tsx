
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AutomationTypeSelector from "./automation/wizard/AutomationTypeSelector";
import ConfigurationStep from "./automation/wizard/ConfigurationStep";
import ReviewCodeStep from "./automation/wizard/ReviewCodeStep";
import DeployStep from "./automation/wizard/DeployStep";
import StepNavigation from "./automation/wizard/StepNavigation";
import WizardStepper from "./automation/wizard/WizardStepper";

interface AutomationWizardProps {
  automationSolution: string;
}

const AutomationWizard = ({ automationSolution }: AutomationWizardProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [implementingType, setImplementingType] = useState("");
  const [selectedTab, setSelectedTab] = useState("built-in");
  const [workflowId, setWorkflowId] = useState("");
  const { toast } = useToast();
  
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
          <AutomationTypeSelector
            implementingType={implementingType}
            setImplementingType={setImplementingType}
          />
        );
        
      case 1:
        return <ConfigurationStep />;
        
      case 2:
        return (
          <ReviewCodeStep
            automationSolution={automationSolution}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            onWorkflowCreated={handleWorkflowCreated}
          />
        );
        
      case 3:
        return (
          <DeployStep
            selectedTab={selectedTab}
            onReviewClick={() => setActiveStep(2)}
            onDeployClick={handleNext}
          />
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
        <WizardStepper 
          steps={steps} 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
        />
        
        <div className="min-h-[300px] py-4">
          {renderStepContent()}
        </div>
        
        <StepNavigation
          activeStep={activeStep}
          implementingType={implementingType}
          selectedTab={selectedTab}
          workflowId={workflowId}
          steps={steps}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      </CardContent>
    </Card>
  );
};

export default AutomationWizard;
