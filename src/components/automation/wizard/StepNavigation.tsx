
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Network, Zap } from "lucide-react";

interface StepNavigationProps {
  activeStep: number;
  implementingType: string;
  selectedTab: string;
  workflowId: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
  handleBack: () => void;
  handleNext: () => void;
}

const StepNavigation = ({
  activeStep,
  implementingType,
  selectedTab,
  workflowId,
  steps,
  handleBack,
  handleNext,
}: StepNavigationProps) => {
  const isFinalStep = activeStep === steps.length - 1;
  const isDeploying = implementingType === "deploy";
  const isDisabled = !implementingType || isDeploying || (selectedTab === "n8n" && activeStep === 3 && !workflowId);

  return (
    <div className="flex justify-between">
      <Button 
        variant="outline"
        onClick={handleBack}
        disabled={activeStep === 0 || isDeploying}
      >
        Back
      </Button>
      <Button 
        onClick={handleNext}
        disabled={isDisabled}
      >
        {isDeploying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {selectedTab === "n8n" ? "Activating..." : "Deploying..."}
          </>
        ) : isFinalStep ? (
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
  );
};

export default StepNavigation;
