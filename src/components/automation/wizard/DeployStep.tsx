
import React from "react";
import { Button } from "@/components/ui/button";
import { Network, Zap } from "lucide-react";

interface DeployStepProps {
  selectedTab: string;
  onReviewClick: () => void;
  onDeployClick: () => void;
}

const DeployStep = ({ selectedTab, onReviewClick, onDeployClick }: DeployStepProps) => {
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
          <Button variant="outline" onClick={onReviewClick}>
            Review Again
          </Button>
          <Button onClick={onDeployClick}>
            {selectedTab === "n8n" ? "Activate Workflow" : "Deploy Automation"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeployStep;
