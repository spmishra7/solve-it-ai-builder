
import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  description?: string;
  status?: "incomplete" | "current" | "complete";
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ label, description, status = "incomplete", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center text-center", className)}
        {...props}
      >
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border-2 text-center font-medium",
            status === "complete" 
              ? "border-brand-600 bg-brand-600 text-white" 
              : status === "current"
              ? "border-brand-600 text-brand-600"
              : "border-gray-300 text-gray-400"
          )}
        >
          {status === "complete" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <span className="text-sm"></span>
          )}
        </div>
        <div className="mt-2">
          <p
            className={cn(
              "text-sm font-medium",
              status === "complete" || status === "current"
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500"
            )}
          >
            {label}
          </p>
          {description && (
            <p
              className={cn(
                "text-xs",
                status === "complete" || status === "current"
                  ? "text-gray-600 dark:text-gray-400"
                  : "text-gray-400"
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Step.displayName = "Step";

interface StepperProps {
  activeStep: number;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
  className?: string;
}

const Stepper = ({
  activeStep,
  orientation = "horizontal",
  children,
  className,
}: StepperProps) => {
  const steps = React.Children.toArray(children);

  return (
    <div
      className={cn(
        orientation === "horizontal" ? "flex justify-between w-full" : "flex flex-col space-y-4",
        className
      )}
    >
      {steps.map((step, index) => {
        let status: "incomplete" | "current" | "complete" = "incomplete";
        
        if (index < activeStep) {
          status = "complete";
        } else if (index === activeStep) {
          status = "current";
        }
        
        if (!React.isValidElement(step)) return null;
        
        // Create a new props object that includes valid StepProps
        const stepProps = {
          ...step.props,
          status,
          key: index,
        };
        
        return (
          <React.Fragment key={index}>
            {React.cloneElement(step, stepProps)}
            
            {index < steps.length - 1 && orientation === "horizontal" && (
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={cn(
                    "h-0.5 w-full",
                    index < activeStep ? "bg-brand-600" : "bg-gray-200"
                  )}
                ></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export { Stepper, Step };
