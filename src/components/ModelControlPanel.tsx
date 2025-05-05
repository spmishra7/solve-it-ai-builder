
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Brain, Settings, AlertCircle, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define models for each provider
const MODELS = {
  openai: [
    { id: "gpt-4o", name: "GPT-4o", description: "Most capable model, best for complex tasks" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Balanced between cost and capability" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and cost-effective" }
  ],
  anthropic: [
    { id: "claude-3-opus-20240229", name: "Claude 3 Opus", description: "Most capable Claude model" },
    { id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet", description: "Balanced performance and cost" },
    { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku", description: "Fastest Claude model" }
  ]
};

export interface ModelSettings {
  provider: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  enabled: boolean;
  order: number;
}

const DEFAULT_SETTINGS: ModelSettings[] = [
  {
    provider: "openai",
    model: "gpt-4o-mini",
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: "You are an AI assistant specialized in creating business solutions.",
    enabled: true,
    order: 1
  },
  {
    provider: "anthropic",
    model: "claude-3-haiku-20240307",
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: "You are Claude, an AI assistant specialized in designing software solutions.",
    enabled: false,
    order: 2
  }
];

const ModelControlPanel: React.FC = () => {
  const [settings, setSettings] = useState<ModelSettings[]>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState("openai");
  const [testPrompt, setTestPrompt] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<Record<string, boolean>>({
    openai: false,
    anthropic: false
  });

  useEffect(() => {
    // Check API status on component mount
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const openaiStatus = await testProvider("openai", "gpt-3.5-turbo", "Hello");
      setApiStatus(prev => ({ ...prev, openai: openaiStatus }));
    } catch (error) {
      console.error("Failed to check OpenAI status:", error);
      setApiStatus(prev => ({ ...prev, openai: false }));
    }

    try {
      const anthropicStatus = await testProvider("anthropic", "claude-3-haiku-20240307", "Hello");
      setApiStatus(prev => ({ ...prev, anthropic: anthropicStatus }));
    } catch (error) {
      console.error("Failed to check Anthropic status:", error);
      setApiStatus(prev => ({ ...prev, anthropic: false }));
    }
  };

  const testProvider = async (provider: string, model: string, prompt: string): Promise<boolean> => {
    try {
      const response = await supabase.functions.invoke('llm-proxy', {
        body: { provider, model, prompt, maxTokens: 50 }
      });
      
      return !response.error && response.data && !response.data.error;
    } catch (error) {
      console.error(`Error testing ${provider}:`, error);
      return false;
    }
  };

  const updateSetting = (provider: string, key: keyof ModelSettings, value: any) => {
    setSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.provider === provider
          ? { ...setting, [key]: value }
          : setting
      )
    );
  };

  const handleTestPrompt = async () => {
    if (!testPrompt.trim()) return;
    
    setIsLoading(true);
    setTestResponse("");
    
    try {
      const activeProvider = settings.find(s => s.provider === activeTab);
      if (!activeProvider) throw new Error("No provider selected");
      
      const response = await supabase.functions.invoke('llm-proxy', {
        body: {
          provider: activeProvider.provider,
          model: activeProvider.model,
          prompt: testPrompt,
          maxTokens: activeProvider.maxTokens,
          temperature: activeProvider.temperature,
          systemPrompt: activeProvider.systemPrompt
        }
      });
      
      if (response.error) throw new Error(response.error.message);
      setTestResponse(response.data.content);
    } catch (error) {
      console.error("Error testing model:", error);
      setTestResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Model Control Panel</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="openai" className="flex items-center justify-center">
                    OpenAI
                    {!apiStatus.openai && 
                      <AlertCircle className="ml-2 h-4 w-4 text-red-500" />
                    }
                  </TabsTrigger>
                  <TabsTrigger value="anthropic" className="flex items-center justify-center">
                    Anthropic
                    {!apiStatus.anthropic && 
                      <AlertCircle className="ml-2 h-4 w-4 text-red-500" />
                    }
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="openai" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Enabled</Label>
                      <Switch
                        checked={settings.find(s => s.provider === "openai")?.enabled}
                        onCheckedChange={(checked) => updateSetting("openai", "enabled", checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="openai-model">Model</Label>
                      <Select 
                        value={settings.find(s => s.provider === "openai")?.model}
                        onValueChange={(value) => updateSetting("openai", "model", value)}
                      >
                        <SelectTrigger id="openai-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {MODELS.openai.map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              <div className="flex flex-col">
                                <span>{model.name}</span>
                                <span className="text-xs text-gray-500">{model.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="openai-temperature">Temperature: {settings.find(s => s.provider === "openai")?.temperature.toFixed(1)}</Label>
                      </div>
                      <Slider
                        id="openai-temperature"
                        min={0}
                        max={1}
                        step={0.1}
                        value={[settings.find(s => s.provider === "openai")?.temperature || 0.7]}
                        onValueChange={(value) => updateSetting("openai", "temperature", value[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="openai-max-tokens">Max Tokens</Label>
                      <Input
                        id="openai-max-tokens"
                        type="number"
                        value={settings.find(s => s.provider === "openai")?.maxTokens}
                        onChange={(e) => updateSetting("openai", "maxTokens", parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="openai-system-prompt">System Prompt</Label>
                      <Input
                        id="openai-system-prompt"
                        value={settings.find(s => s.provider === "openai")?.systemPrompt}
                        onChange={(e) => updateSetting("openai", "systemPrompt", e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="anthropic" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Enabled</Label>
                      <Switch
                        checked={settings.find(s => s.provider === "anthropic")?.enabled}
                        onCheckedChange={(checked) => updateSetting("anthropic", "enabled", checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="anthropic-model">Model</Label>
                      <Select 
                        value={settings.find(s => s.provider === "anthropic")?.model}
                        onValueChange={(value) => updateSetting("anthropic", "model", value)}
                      >
                        <SelectTrigger id="anthropic-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {MODELS.anthropic.map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              <div className="flex flex-col">
                                <span>{model.name}</span>
                                <span className="text-xs text-gray-500">{model.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="anthropic-temperature">Temperature: {settings.find(s => s.provider === "anthropic")?.temperature.toFixed(1)}</Label>
                      </div>
                      <Slider
                        id="anthropic-temperature"
                        min={0}
                        max={1}
                        step={0.1}
                        value={[settings.find(s => s.provider === "anthropic")?.temperature || 0.7]}
                        onValueChange={(value) => updateSetting("anthropic", "temperature", value[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="anthropic-max-tokens">Max Tokens</Label>
                      <Input
                        id="anthropic-max-tokens"
                        type="number"
                        value={settings.find(s => s.provider === "anthropic")?.maxTokens}
                        onChange={(e) => updateSetting("anthropic", "maxTokens", parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="anthropic-system-prompt">System Prompt</Label>
                      <Input
                        id="anthropic-system-prompt"
                        value={settings.find(s => s.provider === "anthropic")?.systemPrompt}
                        onChange={(e) => updateSetting("anthropic", "systemPrompt", e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Test Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="test-prompt">Enter a prompt to test the selected model</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="test-prompt"
                      placeholder="Enter your prompt here..."
                      value={testPrompt}
                      onChange={(e) => setTestPrompt(e.target.value)}
                    />
                    <Button onClick={handleTestPrompt} disabled={isLoading}>
                      {isLoading ? "Testing..." : "Test"}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {testResponse && (
                  <div className="mt-4">
                    <Label>Response</Label>
                    <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-md whitespace-pre-wrap">
                      {testResponse}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModelControlPanel;
