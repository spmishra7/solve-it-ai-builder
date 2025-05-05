
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface PromptInputProps {
  businessDescription: string;
  setBusinessDescription: (value: string) => void;
  isGenerating: boolean;
  isImprovingPrompt: boolean;
  handleImprovePrompt: () => void;
}

const examplePrompts = [
  "I need a patient management system for my small clinic.",
  "We need an invoice generation tool for our accounting department.",
  "Build a project management platform for remote teams."
];

const PromptInput = ({
  businessDescription,
  setBusinessDescription,
  isGenerating,
  isImprovingPrompt,
  handleImprovePrompt
}: PromptInputProps) => {
  return (
    <div className="mb-2">
      <label htmlFor="business-description" className="block text-sm font-medium text-gray-700 mb-1">
        Describe your business problem or SaaS idea
      </label>
      <div className="relative">
        <Textarea
          id="business-description"
          placeholder="e.g., I need a project management tool for my construction company to track projects, assign tasks, and generate reports."
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          className="min-h-[100px]"
          disabled={isGenerating}
        />
        <Button 
          size="sm"
          variant="ghost"
          className="absolute bottom-2 right-2 text-xs flex items-center gap-1"
          onClick={handleImprovePrompt}
          disabled={isGenerating || isImprovingPrompt || !businessDescription.trim()}
        >
          {isImprovingPrompt ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Improving...
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3" />
              Improve Prompt
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {examplePrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setBusinessDescription(prompt)}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptInput;
