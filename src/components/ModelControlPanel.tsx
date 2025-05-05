
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { fetchAvailableModels } from "@/lib/api";
import { toast } from "sonner";

interface ModelConfig {
  provider: string;
  model: string;
  enabled: boolean;
}

const ModelControlPanel = () => {
  const [activeModels, setActiveModels] = useState<ModelConfig[]>([
    { provider: "openai", model: "gpt-4o-mini", enabled: true },
  ]);
  
  const [newModel, setNewModel] = useState<ModelConfig>({ 
    provider: "openai", 
    model: "gpt-4o-mini", 
    enabled: true 
  });

  const { data: availableModels, isLoading, error } = useQuery({
    queryKey: ['availableModels'],
    queryFn: fetchAvailableModels
  });
  
  useEffect(() => {
    // Could load from local storage or API in the future
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
  
  const saveModelsConfig = (models: ModelConfig[]) => {
    setActiveModels(models);
    localStorage.setItem('activeModels', JSON.stringify(models));
    toast.success("Model configuration saved");
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
  
  const handleAddModel = () => {
    // Check if model is already in the list
    const exists = activeModels.some(
      model => model.provider === newModel.provider && model.model === newModel.model
    );
    
    if (exists) {
      toast.error("This model is already in your list");
      return;
    }
    
    const updatedModels = [...activeModels, { ...newModel }];
    saveModelsConfig(updatedModels);
    toast.success("Model added successfully");
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Add New Model</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select 
                  value={newModel.provider}
                  onValueChange={(value) => setNewModel({...newModel, provider: value})}
                >
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select
                  value={newModel.model}
                  onValueChange={(value) => setNewModel({...newModel, model: value})}
                  disabled={isLoading || !availableModels}
                >
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels && availableModels[newModel.provider]?.map((model: string) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleAddModel}
                disabled={isLoading || !newModel.provider || !newModel.model}
              >
                Add Model
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Default Configuration</h3>
          <p className="text-muted-foreground mb-4">
            Select which model should be used as the default for solution generation.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-provider">Default Provider</Label>
              <Select defaultValue="openai">
                <SelectTrigger id="default-provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="default-model">Default Model</Label>
              <Select defaultValue="gpt-4o-mini">
                <SelectTrigger id="default-model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                  <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button>Save Default Configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelControlPanel;
