
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "@/hooks/use-toast";

interface ModelConfig {
  provider: string;
  model: string;
  enabled: boolean;
}

interface AddModelFormProps {
  activeModels: ModelConfig[];
  setActiveModels: (models: ModelConfig[]) => void;
  availableModels: any;
  isLoading: boolean;
}

const AddModelForm = ({ activeModels, setActiveModels, availableModels, isLoading }: AddModelFormProps) => {
  const [newModel, setNewModel] = useState<ModelConfig>({ 
    provider: "openai", 
    model: "gpt-4o-mini", 
    enabled: true 
  });
  
  const handleAddModel = () => {
    // Check if model is already in the list
    const exists = activeModels.some(
      model => model.provider === newModel.provider && model.model === newModel.model
    );
    
    if (exists) {
      toast({
        title: "Error",
        description: "This model is already in your list",
        variant: "destructive"
      });
      return;
    }
    
    const updatedModels = [...activeModels, { ...newModel }];
    setActiveModels(updatedModels);
    localStorage.setItem('activeModels', JSON.stringify(updatedModels));
    toast({
      title: "Success",
      description: "Model added successfully"
    });
  };
  
  return (
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
  );
};

export default AddModelForm;
