
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Download, Info } from "lucide-react";

interface ExportOptionsProps {
  handleExport: (type: 'ui' | 'database' | 'automation' | 'all') => void;
}

const ExportOptions = ({ handleExport }: ExportOptionsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">
                <Code className="h-12 w-12 text-brand-600" />
              </div>
              <h4 className="text-center font-medium mb-2">Frontend UI</h4>
              <p className="text-sm text-gray-500 text-center mb-4">
                Export the UI code to integrate with your existing project
              </p>
              <Button onClick={() => handleExport('ui')} variant="outline" className="w-full">
                Export UI Code
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                </svg>
              </div>
              <h4 className="text-center font-medium mb-2">Database Schema</h4>
              <p className="text-sm text-gray-500 text-center mb-4">
                Export SQL schema to set up your database
              </p>
              <Button onClick={() => handleExport('database')} variant="outline" className="w-full">
                Export Schema
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h4 className="text-center font-medium mb-2">Automation Code</h4>
              <p className="text-sm text-gray-500 text-center mb-4">
                Export backend logic and automation workflows
              </p>
              <Button onClick={() => handleExport('automation')} variant="outline" className="w-full">
                Export Automation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-2">Complete Solution Package</h3>
          <p className="text-sm text-gray-500 text-center mb-4">
            Download everything you need to implement or host this solution yourself
          </p>
          <Button onClick={() => handleExport('all')} className="bg-brand-600 hover:bg-brand-700">
            <Download className="mr-2 h-4 w-4" />
            Download Complete Package
          </Button>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-800 mb-1">Need help with implementation?</h4>
          <p className="text-sm text-blue-700">
            Our team can help you deploy this solution, or we can host and manage it for you.
            Check out our <a href="#pricing" className="underline">pricing plans</a> or contact our sales team for custom solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
