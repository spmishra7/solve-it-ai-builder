
import { SolutionProvider } from "@/contexts/SolutionContext";
import { useSolution } from "@/contexts/SolutionContext";
import { useSolutionGenerator } from "@/hooks/useSolutionGenerator";
import SolutionInputForm from "./solution-generator/SolutionInputForm";
import SolutionCard from "./solution-generator/SolutionCard";
import { motion } from "framer-motion";

const SolutionGeneratorContent = () => {
  const { solution } = useSolution();
  const { 
    handleRoleToggle, 
    handleContentAnalyzed, 
    handleGenerate, 
    handleImprovePrompt,
    handleSave
  } = useSolutionGenerator();

  return (
    <>
      <SolutionInputForm 
        handleImprovePrompt={handleImprovePrompt}
        handleGenerate={handleGenerate}
        handleRoleToggle={handleRoleToggle}
        handleContentAnalyzed={handleContentAnalyzed}
      />
      
      {solution && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
        >
          <SolutionCard handleSave={handleSave} />
        </motion.div>
      )}
    </>
  );
};

const SolutionGenerator = () => {
  return (
    <section id="solution-generator" className="py-12 relative">
      <motion.div 
        className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-accent/5 to-transparent -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-brand-600"
            >
              Create Your SaaS Solution
            </motion.span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your business problem, and our AI will generate a complete SaaS solution with UI, database schema, and workflow automation.
          </p>
        </motion.div>
        
        <SolutionProvider>
          <SolutionGeneratorContent />
        </SolutionProvider>
      </div>
    </section>
  );
};

export default SolutionGenerator;
