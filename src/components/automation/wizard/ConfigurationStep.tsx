
import React from "react";

const ConfigurationStep = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-100 rounded-md">
        <h3 className="font-medium mb-2">Configuration Options</h3>
        <p className="text-sm text-gray-600 mb-4">
          Setup parameters for your automation
        </p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Enable automation</span>
            <div className="w-12 h-6 bg-brand-200 rounded-full relative">
              <div className="absolute right-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Auto-retry on failure</span>
            <div className="w-12 h-6 bg-gray-200 rounded-full relative">
              <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Send admin notifications</span>
            <div className="w-12 h-6 bg-brand-200 rounded-full relative">
              <div className="absolute right-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationStep;
