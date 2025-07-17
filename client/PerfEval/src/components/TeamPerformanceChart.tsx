import React from 'react';

export const TeamPerformanceChart: React.FC = () => {
  const teamData = [
    { name: 'John', performance: 4.2, color: 'bg-blue-600' },
    { name: 'Jane', performance: 4.5, color: 'bg-green-600' },
    { name: 'Mike', performance: 3.8, color: 'bg-yellow-600' },
    { name: 'Sarah', performance: 4.3, color: 'bg-purple-600' },
    { name: 'Tom', performance: 4.0, color: 'bg-pink-600' }
  ];

  const maxPerformance = 5.0;

  return (
    <div className="h-64 flex items-end justify-between px-4 pb-8 space-x-4">
      {teamData.map((member, index) => (
        <div key={index} className="flex flex-col items-center space-y-2 flex-1">
          <div className="relative w-full max-w-12">
            <div 
              className={`${member.color} rounded-t-lg transition-all duration-300 hover:opacity-80`}
              style={{ height: `${(member.performance / maxPerformance) * 150}px` }}
            />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
              {member.performance}
            </div>
          </div>
          <span className="text-xs text-gray-600 text-center">{member.name}</span>
        </div>
      ))}
    </div>
  );
};