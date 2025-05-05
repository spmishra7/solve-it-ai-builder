
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAvailableModels } from "@/lib/api";
import ActiveModelsList from "./ActiveModelsList";
import AddModelForm from "./AddModelForm";
import DefaultModelConfig from "./DefaultModelConfig";

interface ModelConfig {
  provider: string;
  model: string;
  enabled: boolean;
}

const ModelsTabContent = () => {
  const [activeModels, setActiveModels] = useState<ModelConfig[]>([
    { provider: "openai", model: "gpt-4o-mini", enabled: true },
  ]);
  
  const { data: availableModels, isLoading } = useQuery({
    queryKey: ['availableModels'],
    queryFn: fetchAvailableModels
  });
  
  useEffect(() => {
    // Load from local storage or API in the future
    const savedModels = localStorage.getItem('activeModels');
    if (savedModels) {
      try {
        const parsed = JSON.parse(savedModels);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setActiveModels(parsed);
        }
      } catch (e) {
        console.error("Error parsing saved models:", e);
      }
    }
  }, []);
  
  return (
    <div className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveModelsList 
          activeModels={activeModels} 
          setActiveModels={setActiveModels} 
        />
        
        <AddModelForm 
          activeModels={activeModels}
          setActiveModels={setActiveModels}
          availableModels={availableModels}
          isLoading={isLoading}
        />
      </div>
      
      <DefaultModelConfig />
    </div>
  );
};

export default ModelsTabContent;
