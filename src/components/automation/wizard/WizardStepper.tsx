
import React from "react";
import { Stepper, Step } from "@/components/ui/stepper";

interface WizardStepperProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
  activeStep: number;
  setActiveStep: (step: number) => void;
  completedSteps?: number[];
}

const WizardStepper = ({ 
  steps, 
  activeStep, 
  setActiveStep,
  completedSteps = []
}: WizardStepperProps) => {
  return (
    <div className="px-2">
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((step, index) => (
          <Step 
            key={index} 
            label={step.title} 
            description={step.description}
            onClick={() => index < activeStep && setActiveStep(index)}
            className={index < activeStep ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
            completed={completedSteps.includes(index)}
          />
        ))}
      </Stepper>
    </div>
  );
};

export default WizardStepper;
