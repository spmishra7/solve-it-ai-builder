
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { useSolution } from "@/contexts/SolutionContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PromptInputProps {
  businessDescription: string;
  isGenerating: boolean;
  isImprovingPrompt: boolean;
  handleImprovePrompt: () => Promise<void>;
}

const examplePrompts = [
  "I need a patient management system for my small clinic.",
  "We need an invoice generation tool for our accounting department.",
  "Build a project management platform for remote teams."
];

const PromptInput = ({
  businessDescription,
  isGenerating,
  isImprovingPrompt,
  handleImprovePrompt
}: PromptInputProps) => {
  const { setBusinessDescription } = useSolution();
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-2">
      <motion.label 
        htmlFor="business-description" 
        className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-brand-600"
        >
          <Zap size={16} />
        </motion.span>
        Describe your business problem or SaaS idea
      </motion.label>
      
      <div className="relative">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`relative rounded-md ${focused ? 'ring-2 ring-offset-1 ring-brand-600/40' : ''}`}
        >
          <Textarea
            id="business-description"
            placeholder="e.g., I need a project management tool for my construction company to track projects, assign tasks, and generate reports."
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="min-h-[120px] bg-accent/5 border-accent/20"
            disabled={isGenerating}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </motion.div>
        
        <Button 
          size="sm"
          variant="ghost"
          className="absolute bottom-2 right-2 text-xs flex items-center gap-1 group transition-all"
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
              <motion.span
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 2, 
                  repeatDelay: 1 
                }}
                className="text-brand-600"
              >
                <Sparkles className="h-3 w-3 group-hover:text-brand-600" />
              </motion.span>
              <span className="group-hover:text-brand-600">Improve Prompt</span>
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        <motion.div 
          className="flex flex-wrap gap-2 mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {examplePrompts.map((prompt, i) => (
            <motion.button
              key={i}
              onClick={() => setBusinessDescription(prompt)}
              className="text-xs bg-accent/10 hover:bg-accent/20 text-gray-700 px-2 py-1 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3 + (i * 0.1) }
              }}
            >
              {prompt}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PromptInput;
