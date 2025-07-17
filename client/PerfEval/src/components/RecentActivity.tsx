import React from 'react';
import { 
  CheckCircle, 
  MessageCircle, 
  Target, 
  Calendar,
  User
} from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      type: 'goal-completed',
      title: 'Completed React certification',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'feedback-received',
      title: 'Received feedback from Sarah',
      time: '4 hours ago',
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'goal-updated',
      title: 'Updated Q1 goals progress',
      time: '1 day ago',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      type: 'review-scheduled',
      title: 'Performance review scheduled',
      time: '2 days ago',
      icon: Calendar,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      type: 'peer-request',
      title: 'Peer feedback request sent',
      time: '3 days ago',
      icon: User,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
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
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};