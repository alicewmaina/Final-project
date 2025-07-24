import React from 'react';
import { 
  CheckCircle, 
  MessageCircle, 
  Target, 
  Calendar,
  User,
  TrendingUp
} from 'lucide-react';

export const TeamActivity: React.FC = () => {
  const activities = [
    {
      type: 'performance-update',
      title: 'John completed self-evaluation',
      user: 'John Doe',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'goal-progress',
      title: 'Sarah updated goal progress',
      user: 'Sarah Wilson',
      time: '2 hours ago',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'feedback-given',
      title: 'Mike provided peer feedback',
      user: 'Mike Johnson',
      time: '3 hours ago',
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              <Icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
// File removed for scaffold cleanup