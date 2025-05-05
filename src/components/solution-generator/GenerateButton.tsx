
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface GenerateButtonProps {
  handleGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
  progress: number;
}

const GenerateButton = ({ handleGenerate, isGenerating, disabled, progress }: GenerateButtonProps) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <Button
          onClick={() => {
            console.log("Generate button clicked");
            handleGenerate();
          }}
          className="bg-brand-600 hover:bg-brand-700 w-full relative overflow-hidden group"
          disabled={isGenerating || disabled}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Solution...
            </>
          ) : (
            <>
              <span className="relative z-10 flex items-center">
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                </motion.span>
                Generate Solution
              </span>
              
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-brand-600 via-brand-700 to-brand-600 bg-[length:200%_100%]"
                animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }} 
                transition={{ duration: 5, repeat: Infinity }} 
                style={{ zIndex: 0 }}
              />
            </>
          )}
        </Button>
      </motion.div>

      {isGenerating && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
          <motion.div
            className="bg-brand-600 h-2.5 rounded-full"
            initial={{ width: "5%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </>
  );
};

export default GenerateButton;
