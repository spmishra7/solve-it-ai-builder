
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExpertInsights from './ExpertInsights';

interface SolutionPreviewProps {
  content: string;
  selectedRoles?: string[];
  roleNames?: Record<string, string>;
}

const UICode = ({ content, selectedRoles = [], roleNames = {} }: SolutionPreviewProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Simple HTML sanitization for safety
  const sanitizeHtml = (html: string) => {
    // This is a very basic sanitization
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '');
  };

  return (
    <div className="space-y-4">
      {selectedRoles && selectedRoles.length > 0 && roleNames && (
        <ExpertInsights 
          insights={{}} // Providing empty object as fallback
          selectedRoles={selectedRoles}
          roleNames={roleNames}
        />
      )}
      
      <div>
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div 
            className={`transition-all duration-500 ease-in-out ${
              expanded ? 'max-h-[2000px]' : 'max-h-[500px]'
            } overflow-hidden`}
          >
            <iframe
              title="Solution Preview"
              srcDoc={sanitizeHtml(content)}
              className="w-full h-[500px] border-0"
              sandbox="allow-scripts"
            />
          </div>
          
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 shadow-md"
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                Show More
              </>
            )}
          </Button>
        </div>
        
        <Card className="mt-4 p-4 bg-gray-50">
          <h3 className="text-sm font-medium mb-2">Implementation Notes</h3>
          <p className="text-sm text-gray-600">
            This preview shows a prototype of your solution's user interface. The actual implementation 
            may require additional development to fully connect to your database and backend services.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default UICode;
