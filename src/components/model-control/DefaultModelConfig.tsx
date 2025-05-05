
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DefaultModelConfig = () => {
  return (
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
  );
};

export default DefaultModelConfig;
