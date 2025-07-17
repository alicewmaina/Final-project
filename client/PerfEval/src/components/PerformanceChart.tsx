import React from 'react';
import { TrendingUp } from 'lucide-react';

export const PerformanceChart: React.FC = () => {
  const data = [
    { month: 'Jan', performance: 3.8, goals: 70 },
    { month: 'Feb', performance: 4.0, goals: 75 },
    { month: 'Mar', performance: 4.1, goals: 82 },
    { month: 'Apr', performance: 4.2, goals: 85 },
    { month: 'May', performance: 4.0, goals: 78 },
    { month: 'Jun', performance: 4.3, goals: 90 }
  ];

  const maxPerformance = 5.0;
  const maxGoals = 100;

  return (
    <div className="h-64 relative">
      <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="flex flex-col items-center space-y-1">
              {/* Performance bar */}
              <div 
                className="w-6 bg-blue-600 rounded-t-sm transition-all duration-300 hover:bg-blue-700"
                style={{ height: `${(item.performance / maxPerformance) * 120}px` }}
              />
              {/* Goals bar */}
              <div 
                className="w-6 bg-green-600 rounded-t-sm transition-all duration-300 hover:bg-green-700"
                style={{ height: `${(item.goals / maxGoals) * 80}px` }}
              />
            </div>
            <span className="text-xs text-gray-600">{item.month}</span>
          </div>
        ))}
      </div>
      
      <div className="absolute top-0 right-0 flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span className="text-gray-600">Performance</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span className="text-gray-600">Goals</span>
        </div>
      </div>
    </div>
  );
};