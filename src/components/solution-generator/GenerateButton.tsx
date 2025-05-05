
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  handleGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
  progress: number;
}

const GenerateButton = ({ handleGenerate, isGenerating, disabled, progress }: GenerateButtonProps) => {
  return (
    <>
      <Button
        onClick={handleGenerate}
        className="bg-brand-600 hover:bg-brand-700 w-full"
        disabled={isGenerating || disabled}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Solution...
          </>
        ) : (
          <>
            <ArrowRight className="mr-2 h-4 w-4" />
            Generate Solution
          </>
        )}
      </Button>

      {isGenerating && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-brand-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default GenerateButton;
