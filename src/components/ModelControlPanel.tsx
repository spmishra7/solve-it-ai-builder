
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
import { toast } from "@/components/ui/use-toast";
import { Network, BarChart3, Settings2, Cpu } from "lucide-react";

interface ModelConfig {
  provider: string;
  model: string;
  enabled: boolean;
}

interface N8nConfig {
  url: string;
  apiKey: string;
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

  const [n8nConfig, setN8nConfig] = useState<N8nConfig>({
    url: localStorage.getItem("n8nUrl") || "",
    apiKey: "",
    enabled: Boolean(localStorage.getItem("n8nEnabled") === "true")
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
    saveModelsConfig(updatedModels);
    toast({
      title: "Success",
      description: "Model added successfully"
    });
  };
  
  const handleSaveN8nConfig = () => {
    localStorage.setItem("n8nUrl", n8nConfig.url);
    localStorage.setItem("n8nEnabled", String(n8nConfig.enabled));
    
    if (n8nConfig.apiKey) {
      // In a production environment, API keys should be stored securely
      // For demo purposes, we're using localStorage
      localStorage.setItem("n8nApiKey", n8nConfig.apiKey);
    }
    
    toast({
      title: "Success",
      description: "n8n configuration saved successfully"
    });
  };
  
  const handleToggleN8n = () => {
    setN8nConfig(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="n8n" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            n8n Integration
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="space-y-6 pt-6">
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
        </TabsContent>
        
        <TabsContent value="n8n" className="space-y-6 pt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">n8n Integration Configuration</h3>
              <p className="text-muted-foreground mb-4">
                Connect to n8n to enhance automation capabilities
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable n8n Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Use n8n for advanced workflow automation
                    </p>
                  </div>
                  <Switch 
                    checked={n8nConfig.enabled}
                    onCheckedChange={handleToggleN8n}
                  />
                </div>
                
                {n8nConfig.enabled && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="n8n-url">n8n Instance URL</Label>
                      <Input
                        id="n8n-url"
                        placeholder="https://your-n8n-instance.com"
                        value={n8nConfig.url}
                        onChange={(e) => setN8nConfig(prev => ({ ...prev, url: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="n8n-api-key">n8n API Key (Optional)</Label>
                      <Input
                        id="n8n-api-key"
                        type="password"
                        placeholder="Your n8n API key"
                        value={n8nConfig.apiKey}
                        onChange={(e) => setN8nConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                      />
                    </div>
                    
                    <Button onClick={handleSaveN8nConfig}>
                      Save n8n Configuration
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Workflow Conversion Settings</h3>
              <p className="text-muted-foreground mb-4">
                Configure how automation code is converted to n8n workflows
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="conversion-model">AI Model for Code Conversion</Label>
                  <Select defaultValue="gpt-4o-mini">
                    <SelectTrigger id="conversion-model">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                      <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Convert Generated Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically convert generated automation code to n8n workflows
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Preserve Original Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep original automation code when converting to n8n
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <Button>Save Workflow Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6 pt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Automation Analytics</h3>
              <p className="text-muted-foreground mb-4">
                View analytics for your automation workflows
              </p>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                <h3 className="text-lg font-medium mb-4">Coming Soon</h3>
                <p>Detailed analytics for AI model usage and workflow performance will be available in a future update.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelControlPanel;
