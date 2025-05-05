
import { SolutionProvider } from "@/contexts/SolutionContext";
import { useSolution } from "@/contexts/SolutionContext";
import { useSolutionGenerator } from "@/hooks/useSolutionGenerator";
import SolutionInputForm from "./solution-generator/SolutionInputForm";
import SolutionCard from "./solution-generator/SolutionCard";

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
      
      {solution && <SolutionCard handleSave={handleSave} />}
    </>
  );
};

const SolutionGenerator = () => {
  return (
    <section id="solution-generator" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your SaaS Solution</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your business problem, and our AI will generate a complete SaaS solution with UI, database schema, and workflow automation.
          </p>
        </div>
        
        <SolutionProvider>
          <SolutionGeneratorContent />
        </SolutionProvider>
      </div>
    </section>
  );
};

export default SolutionGenerator;
