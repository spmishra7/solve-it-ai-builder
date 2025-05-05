
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent } from "../ui/card";
import { useToast } from "@/hooks/use-toast";

interface N8nConfig {
  url: string;
  apiKey: string;
  enabled: boolean;
}

const N8nConfigForm = () => {
  const { toast } = useToast();
  const [n8nConfig, setN8nConfig] = useState<N8nConfig>({
    url: localStorage.getItem("n8nUrl") || "",
    apiKey: "",
    enabled: Boolean(localStorage.getItem("n8nEnabled") === "true")
  });
  
  const handleToggleN8n = () => {
    setN8nConfig(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
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
  
  return (
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
  );
};

export default N8nConfigForm;
