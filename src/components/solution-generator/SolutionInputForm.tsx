
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSolution } from "@/contexts/SolutionContext";
import { motion } from "framer-motion";
import PromptInput from "./PromptInput";
import ExpertRoleSelector from "../expert-roles/ExpertRoleSelector";
import ContentUploader from "./ContentUploader";
import GenerateButton from "./GenerateButton";
import { useToast } from "@/hooks/use-toast";

interface SolutionInputFormProps {
  handleImprovePrompt: () => Promise<void>;
  handleGenerate: () => Promise<void>;
  handleRoleToggle: (roleId: string) => void;
  handleContentAnalyzed: (insights: string) => void;
  handleSelectAll?: (allRoleIds: string[], allSelected: boolean) => void;
}

const SolutionInputForm = ({ 
  handleImprovePrompt, 
  handleGenerate, 
  handleRoleToggle,
  handleContentAnalyzed,
  handleSelectAll
}: SolutionInputFormProps) => {
  const [showUploader, setShowUploader] = useState(false);
  const { 
    businessDescription, 
    setBusinessDescription,
    isGenerating, 
    isImprovingPrompt,
    progress,
    selectedRoles,
    contentInsights
  } = useSolution();
  const { toast } = useToast();

  // Check for template prompt in localStorage on component mount
  useEffect(() => {
    const templatePrompt = localStorage.getItem("selectedTemplatePrompt");
    const templateTitle = localStorage.getItem("selectedTemplateTitle");
    
    if (templatePrompt && !businessDescription) {
      setBusinessDescription(templatePrompt);
      
      if (templateTitle) {
        toast({
          title: "Template Loaded",
          description: `"${templateTitle}" template has been loaded.`
        });
      }
      
      // Clear localStorage to prevent unintended reuse
      localStorage.removeItem("selectedTemplatePrompt");
      localStorage.removeItem("selectedTemplateTitle");
    }
  }, [setBusinessDescription, businessDescription, toast]);

  const toggleUploader = () => {
    setShowUploader(prev => !prev);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  const handleGenerateClick = () => {
    console.log("Generate button clicked in SolutionInputForm");
    // Add a debugging output to see if we have a business description
    console.log("Business description:", businessDescription);
    handleGenerate();
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card className="mb-8 border-accent/20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <PromptInput
                businessDescription={businessDescription}
                setBusinessDescription={setBusinessDescription}
                isGenerating={isGenerating}
                isImprovingPrompt={isImprovingPrompt}
                handleImprovePrompt={handleImprovePrompt}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleUploader}
                  disabled={isGenerating}
                  className="group"
                >
                  <motion.span
                    animate={showUploader ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mr-2"
                  >
                    {showUploader ? "−" : "+"}
                  </motion.span>
                  {showUploader ? "Hide Content Analyzer" : "Analyze Existing Content"}
                </Button>
                
                <span className="text-sm text-gray-500">
                  {contentInsights ? "✓ Content analyzed" : ""}
                </span>
              </div>
            </motion.div>

            {showUploader && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ContentUploader 
                  onContentAnalyzed={handleContentAnalyzed}
                  isGenerating={isGenerating}
                />
              </motion.div>
            )}

            <ExpertRoleSelector
              selectedRoles={selectedRoles}
              onRoleToggle={handleRoleToggle}
              onSelectAll={handleSelectAll}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GenerateButton
                handleGenerate={handleGenerateClick}
                isGenerating={isGenerating}
                disabled={!businessDescription.trim()}
                progress={progress}
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SolutionInputForm;
