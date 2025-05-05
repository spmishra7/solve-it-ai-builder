
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Cpu, Network, Layout, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useN8nAutomation } from "@/hooks/useN8nAutomation";
import WizardStepper from "./wizard/WizardStepper";
import ConfigurationStep from "./wizard/ConfigurationStep";
import DeployStep from "./wizard/DeployStep";
import { roleCategories } from "../expert-roles/roleData";
import ExpertRoleSelector from "../expert-roles/ExpertRoleSelector";
import { useRoleManagement } from "@/hooks/solution/useRoleManagement";

interface ModelContextProtocolProps {
  businessDescription?: string;
  onSolutionGenerated?: (solution: {
    ui: string;
    database: string;
    automation: string;
  }) => void;
}

type ComplexityLevel = "simple" | "moderate" | "complex";
type ModelRecommendation = {
  id: string;
  name: string;
  provider: string;
  description: string;
  suitable: boolean;
  reason: string;
};

const ModelContextProtocol = ({
  businessDescription = "",
  onSolutionGenerated
}: ModelContextProtocolProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [complexity, setComplexity] = useState<ComplexityLevel>("moderate");
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [generatedSolution, setGeneratedSolution] = useState({
    ui: "",
    database: "",
    automation: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [workflowId, setWorkflowId] = useState("");
  const [recommendedModels, setRecommendedModels] = useState<ModelRecommendation[]>([]);
  const { toast } = useToast();
  const { createWorkflow, executeWorkflow } = useN8nAutomation();
  const { selectedRoles, handleRoleToggle, handleSelectAll } = useRoleManagement();
  
  const steps = [
    { title: "Select Perspectives", description: "Choose expert perspectives" },
    { title: "Configure", description: "Set complexity and parameters" },
    { title: "Generate", description: "Create solution" },
    { title: "Review", description: "Review and deploy" },
  ];

  // Determine recommended models based on complexity and number of perspectives
  useEffect(() => {
    const perspectiveCount = selectedRoles.length;
    let newRecommendations: ModelRecommendation[] = [];
    
    switch (complexity) {
      case "simple":
        newRecommendations = [
          {
            id: "gpt-4o-mini",
            name: "GPT-4o Mini",
            provider: "OpenAI",
            description: "Fast and efficient model for simple applications",
            suitable: true,
            reason: "Optimal for simple applications with few perspectives"
          },
          {
            id: "gpt-4o",
            name: "GPT-4o",
            provider: "OpenAI",
            description: "More powerful model with greater comprehension",
            suitable: perspectiveCount > 5,
            reason: perspectiveCount > 5 ? "Better for handling multiple perspectives" : "More power than needed for this task"
          },
          {
            id: "gpt-4.5-preview",
            name: "GPT-4.5 Preview",
            provider: "OpenAI",
            description: "Advanced preview model for complex reasoning",
            suitable: false,
            reason: "Excessive for a simple application"
          }
        ];
        break;
        
      case "moderate":
        newRecommendations = [
          {
            id: "gpt-4o-mini",
            name: "GPT-4o Mini",
            provider: "OpenAI",
            description: "Fast and efficient model for simple applications",
            suitable: perspectiveCount < 4,
            reason: perspectiveCount < 4 ? "Sufficient for moderate tasks with few perspectives" : "May struggle with multiple perspectives"
          },
          {
            id: "gpt-4o",
            name: "GPT-4o",
            provider: "OpenAI",
            description: "More powerful model with greater comprehension",
            suitable: true,
            reason: "Optimal for moderate complexity applications"
          },
          {
            id: "gpt-4.5-preview",
            name: "GPT-4.5 Preview",
            provider: "OpenAI",
            description: "Advanced preview model for complex reasoning",
            suitable: perspectiveCount > 8,
            reason: perspectiveCount > 8 ? "Better for many perspectives" : "More power than needed"
          }
        ];
        break;
        
      case "complex":
        newRecommendations = [
          {
            id: "gpt-4o-mini",
            name: "GPT-4o Mini",
            provider: "OpenAI",
            description: "Fast and efficient model for simple applications",
            suitable: false,
            reason: "Insufficient for complex applications"
          },
          {
            id: "gpt-4o",
            name: "GPT-4o",
            provider: "OpenAI",
            description: "More powerful model with greater comprehension",
            suitable: perspectiveCount < 6,
            reason: perspectiveCount < 6 ? "Can handle complex apps with few perspectives" : "May struggle with many perspectives"
          },
          {
            id: "gpt-4.5-preview",
            name: "GPT-4.5 Preview",
            provider: "OpenAI",
            description: "Advanced preview model for complex reasoning",
            suitable: true,
            reason: "Optimal for complex applications with multiple perspectives"
          }
        ];
        break;
    }
    
    setRecommendedModels(newRecommendations);
    
    // Auto-select the most suitable model
    const bestMatch = newRecommendations.find(m => m.suitable);
    if (bestMatch) {
      setSelectedModel(bestMatch.id);
    }
  }, [complexity, selectedRoles.length]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return;
    }
    
    // Validation for each step
    if (activeStep === 0 && selectedRoles.length === 0) {
      toast({
        title: "Perspectives Required",
        description: "Please select at least one expert perspective.",
        variant: "destructive",
      });
      return;
    }
    
    if (activeStep === 1 && !complexity) {
      toast({
        title: "Complexity Required",
        description: "Please select the complexity level of your application.",
        variant: "destructive",
      });
      return;
    }
    
    if (activeStep === 2) {
      handleGenerateSolution();
      return;
    }
    
    setActiveStep(currentStep => currentStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(currentStep => currentStep - 1);
  };

  // Generate solution based on perspectives and complexity
  const handleGenerateSolution = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock solution for demonstration
      const mockSolution = {
        ui: `<!DOCTYPE html>
<html>
<head>
  <title>${selectedRoles.length > 0 ? "Expert-Driven Solution" : "Generated Solution"}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    header { background: #4F46E5; color: white; padding: 1rem; }
    main { padding: 2rem; }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    .badge { background: #E5E7EB; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-right: 0.5rem; }
    .complexity-${complexity} { background: ${
      complexity === "simple" ? "#D1FAE5" : 
      complexity === "moderate" ? "#FEF3C7" : 
      "#FEE2E2"
    }; padding: 0.5rem; border-radius: 4px; display: inline-block; }
    button { background: #4F46E5; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <header>
    <h1>Application Generated with Model Context Protocol</h1>
    <p>Using model: ${selectedModel}</p>
  </header>
  <main>
    <div class="card">
      <h2>Complexity Assessment</h2>
      <p>This solution was generated for a <span class="complexity-${complexity}">${complexity}</span> application.</p>
    </div>
    <div class="card">
      <h2>Expert Perspectives Included</h2>
      <div>
        ${selectedRoles.length > 0 
          ? selectedRoles.map(role => `<span class="badge">${role}</span>`).join('') 
          : '<p>No specific expert perspectives selected</p>'}
      </div>
    </div>
    <div class="card">
      <h2>Actions</h2>
      <button>Deploy Solution</button>
      <button>Edit Configuration</button>
    </div>
  </main>
</body>
</html>`,
        database: `-- Database schema for ${complexity} complexity application
-- Generated with ${selectedModel}
-- Incorporating ${selectedRoles.length} expert perspectives

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE application_settings (
  id SERIAL PRIMARY KEY,
  complexity_level VARCHAR(50) DEFAULT '${complexity}',
  model_used VARCHAR(100) DEFAULT '${selectedModel}',
  perspectives_count INTEGER DEFAULT ${selectedRoles.length}
);

CREATE TABLE perspective_logs (
  id SERIAL PRIMARY KEY,
  perspective_id VARCHAR(100) NOT NULL,
  application_area VARCHAR(100) NOT NULL,
  impact_assessment TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);`,
        automation: `// Automation workflow generated using Model Context Protocol
// Model: ${selectedModel}
// Complexity: ${complexity}
// Perspectives: ${selectedRoles.length}

async function runMcpWorkflow() {
  console.log("Starting MCP workflow execution");
  
  // Step 1: Load configuration parameters
  const config = {
    model: "${selectedModel}",
    complexity: "${complexity}",
    perspectives: ${JSON.stringify(selectedRoles)}
  };
  
  // Step 2: Initialize the context based on perspectives
  const context = await initializeContext(config.perspectives);
  
  // Step 3: Process based on complexity
  const result = await processWithComplexity(context, config.complexity);
  
  // Step 4: Apply model-specific optimizations
  const optimizedResult = await optimizeWithModel(result, config.model);
  
  console.log("MCP workflow completed successfully");
  return optimizedResult;
}

async function initializeContext(perspectives) {
  // Initialize context based on selected expert perspectives
  return { perspectives: perspectives, initialized: true };
}

async function processWithComplexity(context, complexity) {
  // Process data with appropriate strategy for the complexity level
  const processingTime = complexity === "simple" ? 1000 : 
                        complexity === "moderate" ? 2000 : 3000;
                        
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return { ...context, processed: true, complexityHandled: complexity };
}

async function optimizeWithModel(result, model) {
  // Apply optimizations specific to the selected model
  return { ...result, optimized: true, model: model };
}

// Export for n8n integration
module.exports = {
  runMcpWorkflow
};`
      };
      
      setGeneratedSolution(mockSolution);
      
      if (onSolutionGenerated) {
        onSolutionGenerated(mockSolution);
      }
      
      // Move to the next step after generation
      setActiveStep(3);
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate solution. Please try again.",
        variant: "destructive",
      });
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeployToN8n = async () => {
    setIsProcessing(true);
    
    try {
      const result = await createWorkflow(generatedSolution.automation);
      
      if (result?.workflow?.id) {
        setWorkflowId(result.workflow.id);
        toast({
          title: "Workflow Created",
          description: `n8n workflow created successfully with ID: ${result.workflow.id.substring(0, 8)}...`,
        });
      }
    } catch (error) {
      console.error("Error creating n8n workflow:", error);
      toast({
        title: "Workflow Creation Failed",
        description: "Failed to create n8n workflow. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Select Expert Perspectives</h3>
              <p className="text-muted-foreground mb-4">
                Choose the expert perspectives to consider when generating your solution.
                More perspectives may require a more powerful model.
              </p>
              
              <ExpertRoleSelector 
                selectedRoles={selectedRoles} 
                onRoleToggle={handleRoleToggle}
                onSelectAll={handleSelectAll}
              />
              
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Selected: {selectedRoles.length} perspectives</p>
              </div>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Set Application Complexity</h3>
              <p className="text-muted-foreground mb-4">
                Define the complexity level of your application to help select the appropriate model.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <Card 
                  className={`cursor-pointer border-2 ${complexity === "simple" ? "border-brand-500" : "border-transparent"}`}
                  onClick={() => setComplexity("simple")}
                >
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-center">Simple</h3>
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      Basic features, limited integrations
                    </p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer border-2 ${complexity === "moderate" ? "border-brand-500" : "border-transparent"}`}
                  onClick={() => setComplexity("moderate")}
                >
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-center">Moderate</h3>
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      Multiple features, some integrations
                    </p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer border-2 ${complexity === "complex" ? "border-brand-500" : "border-transparent"}`}
                  onClick={() => setComplexity("complex")}
                >
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-center">Complex</h3>
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      Advanced features, multiple integrations
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Model Recommendations</h3>
              <p className="text-muted-foreground mb-4">
                Based on your selected complexity and perspectives, here are our model recommendations.
              </p>
              
              <div className="space-y-4">
                {recommendedModels.map((model) => (
                  <Card 
                    key={model.id}
                    className={`cursor-pointer border-2 ${
                      selectedModel === model.id ? "border-brand-500" : "border-transparent"
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <CardContent className="flex items-center justify-between py-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">{model.name}</h3>
                          <Badge 
                            className={`ml-2 ${
                              model.suitable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {model.suitable ? "Recommended" : "Not Optimal"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                        <p className="text-xs mt-2">{model.reason}</p>
                      </div>
                      <div className="flex items-center">
                        <Cpu className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <ConfigurationStep />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <Alert>
              <AlertDescription>
                {isGenerating 
                  ? "Generating solution based on your configuration..." 
                  : "Ready to generate your solution with the selected parameters."}
              </AlertDescription>
            </Alert>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Generation Parameters</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Complexity</p>
                  <p className="text-muted-foreground capitalize">{complexity}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Selected Model</p>
                  <p className="text-muted-foreground">{selectedModel}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Perspectives</p>
                  <p className="text-muted-foreground">{selectedRoles.length} selected</p>
                </div>
              </div>
            </div>
            
            {isGenerating && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-brand-600 mb-4" />
                <p className="text-muted-foreground">Generating solution...</p>
              </div>
            )}
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <DeployStep 
              selectedTab="n8n" 
              onReviewClick={() => setActiveStep(1)}
              onDeployClick={handleDeployToN8n}
            />
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <Tabs defaultValue="preview">
                <TabsList className="mb-4">
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="automation" className="flex items-center gap-2">
                    <Network className="h-4 w-4" />
                    Automation
                  </TabsTrigger>
                  <TabsTrigger value="data" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Database
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview">
                  <div className="border rounded-md">
                    <iframe
                      srcDoc={generatedSolution.ui}
                      title="Solution Preview"
                      className="w-full h-[400px] border-0 rounded"
                      sandbox="allow-scripts"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="automation">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-[400px] overflow-auto font-mono text-sm">
                    <pre>{generatedSolution.automation}</pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="data">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-[400px] overflow-auto font-mono text-sm">
                    <pre>{generatedSolution.database}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Model Context Protocol</CardTitle>
        <CardDescription>
          Generate solutions using expert perspectives, complexity assessment, and optimal AI model selection
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <WizardStepper 
          steps={steps} 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
        />
        
        {renderStepContent()}
        
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0 || isGenerating || isProcessing}
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={isGenerating || isProcessing || (activeStep === steps.length - 1)}
          >
            {isGenerating || isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isGenerating ? "Generating..." : "Processing..."}
              </>
            ) : activeStep === 2 ? (
              "Generate Solution"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelContextProtocol;
