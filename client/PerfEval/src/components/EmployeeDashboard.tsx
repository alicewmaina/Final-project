import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';
import { PerformanceChart } from './PerformanceChart';
import { RecentActivity } from './RecentActivity';

export const EmployeeDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Performance Score',
      value: '4.2/5.0',
      change: '+0.3 from last month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Goals Completed',
      value: '8/12',
      change: '4 goals remaining',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Next Review',
      value: '15 days',
      change: 'Quarterly review',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Team Ranking',
      value: '#3/15',
      change: 'Top performer',
      icon: Award,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Complete self-evaluation',
      dueDate: '2024-01-15',
      priority: 'high',
      status: 'pending'
    },
    {
      title: 'Submit Q1 goals',
      dueDate: '2024-01-20',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      title: 'Peer feedback for Sarah',
      dueDate: '2024-01-22',
      priority: 'low',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here's your performance overview</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: 2 hours ago</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
            <PerformanceChart />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <RecentActivity />
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
        <div className="space-y-3">
          {upcomingTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-600' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};