
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface ExpertInsightsProps {
  insights: Record<string, string>;
  selectedRoles: string[];
  roleNames?: Record<string, string>;
}

const ExpertInsights = ({ 
  insights, 
  selectedRoles,
  roleNames = {}
}: ExpertInsightsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // No insights to show
  if (!insights || Object.keys(insights).length === 0 || selectedRoles.length === 0) {
    return null;
  }
  
  // Filter insights to only show those for selected roles
  const relevantInsights = Object.entries(insights)
    .filter(([role]) => selectedRoles.includes(role))
    .map(([role, insight]) => ({
      role,
      displayName: roleNames[role] || role,
      insight
    }));
  
  if (relevantInsights.length === 0) {
    return null;
  }
  
  if (relevantInsights.length === 1) {
    // If only one role is selected, show a simple card
    const { displayName, insight } = relevantInsights[0];
    
    return (
      <Alert className="bg-amber-50 border-amber-200 mb-4">
        <div className="flex items-start">
          <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
          <AlertDescription className="text-amber-800">
            <span className="font-medium block mb-1">{displayName} Insight:</span>
            <span className="text-sm">{insight}</span>
          </AlertDescription>
        </div>
      </Alert>
    );
  }
  
  // For multiple insights, use tabs
  return (
    <Card className="mb-4 bg-amber-50 border-amber-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-amber-800 flex items-center">
            <Lightbulb className="h-4 w-4 mr-1.5" /> Professional Insights
          </h3>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-700 hover:text-amber-900"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {isExpanded && (
          <Tabs defaultValue={relevantInsights[0].role}>
            <TabsList className="mb-2 bg-amber-100/50">
              {relevantInsights.map(({ role, displayName }) => (
                <TabsTrigger 
                  key={role} 
                  value={role}
                  className="data-[state=active]:bg-amber-200 data-[state=active]:text-amber-900"
                >
                  {displayName}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {relevantInsights.map(({ role, insight }) => (
              <TabsContent key={role} value={role} className="text-sm text-amber-800">
                {insight}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpertInsights;
