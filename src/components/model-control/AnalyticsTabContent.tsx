
import { Card, CardContent } from "../ui/card";

const AnalyticsTabContent = () => {
  return (
    <div className="space-y-6 pt-6">
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
    </div>
  );
};

export default AnalyticsTabContent;
