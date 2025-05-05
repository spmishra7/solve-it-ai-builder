import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-primary border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 