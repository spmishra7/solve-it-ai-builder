
import { useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Card, CardContent } from "../ui/card";
import { toast } from "@/hooks/use-toast";

interface ModelConfig {
  provider: string;
  model: string;
  enabled: boolean;
}

interface ActiveModelsListProps {
  activeModels: ModelConfig[];
  setActiveModels: (models: ModelConfig[]) => void;
}

const ActiveModelsList = ({ activeModels, setActiveModels }: ActiveModelsListProps) => {
  const saveModelsConfig = (models: ModelConfig[]) => {
    setActiveModels(models);
    localStorage.setItem('activeModels', JSON.stringify(models));
    toast({
      title: "Success",
      description: "Model configuration saved"
    });
  };
  
  const handleToggleModel = (index: number) => {
    const updatedModels = [...activeModels];
    updatedModels[index].enabled = !updatedModels[index].enabled;
    saveModelsConfig(updatedModels);
  };
  
  const handleRemoveModel = (index: number) => {
    const updatedModels = activeModels.filter((_, i) => i !== index);
    saveModelsConfig(updatedModels);
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Active Models</h3>
        {activeModels.length === 0 ? (
          <p className="text-muted-foreground">No models configured</p>
        ) : (
          <div className="space-y-4">
            {activeModels.map((model, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{model.model}</p>
                  <p className="text-sm text-muted-foreground capitalize">{model.provider}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={model.enabled} 
                    onCheckedChange={() => handleToggleModel(index)}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveModel(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveModelsList;
