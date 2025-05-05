
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSolution } from "@/contexts/SolutionContext";
import PromptInput from "./PromptInput";
import ExpertRoleSelector from "@/components/ExpertRoleSelector";
import ContentUploader from "./ContentUploader";
import GenerateButton from "./GenerateButton";

interface SolutionInputFormProps {
  handleImprovePrompt: () => Promise<void>;
  handleGenerate: () => Promise<void>;
  handleRoleToggle: (roleId: string) => void;
  handleContentAnalyzed: (insights: string) => void;
}

const SolutionInputForm = ({ 
  handleImprovePrompt, 
  handleGenerate, 
  handleRoleToggle,
  handleContentAnalyzed
}: SolutionInputFormProps) => {
  const [showUploader, setShowUploader] = useState(false);
  const { 
    businessDescription, 
    isGenerating, 
    isImprovingPrompt,
    progress,
    selectedRoles,
    contentInsights
  } = useSolution();

  const toggleUploader = () => {
    setShowUploader(prev => !prev);
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <PromptInput
            businessDescription={businessDescription}
            isGenerating={isGenerating}
            isImprovingPrompt={isImprovingPrompt}
            handleImprovePrompt={handleImprovePrompt}
          />

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleUploader}
              disabled={isGenerating}
            >
              {showUploader ? "Hide Content Analyzer" : "Analyze Existing Content"}
            </Button>
            
            <span className="text-sm text-gray-500">
              {contentInsights ? "✓ Content analyzed" : ""}
            </span>
          </div>

          {showUploader && (
            <ContentUploader 
              onContentAnalyzed={handleContentAnalyzed}
              isGenerating={isGenerating}
            />
          )}

          <ExpertRoleSelector
            selectedRoles={selectedRoles}
            onRoleToggle={handleRoleToggle}
          />

          <GenerateButton
            handleGenerate={handleGenerate}
            isGenerating={isGenerating}
            disabled={!businessDescription.trim()}
            progress={progress}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionInputForm;
