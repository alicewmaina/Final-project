import React from 'react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
    <span className="text-blue-600 font-medium">{message}</span>
  </div>
);