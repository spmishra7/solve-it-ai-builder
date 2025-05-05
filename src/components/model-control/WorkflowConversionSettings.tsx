
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const WorkflowConversionSettings = () => {
  return (
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
  );
};

export default WorkflowConversionSettings;
