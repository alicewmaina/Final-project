import React from 'react';
import { 
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { TeamPerformanceChart } from './TeamPerformanceChart';
import { TeamActivity } from './TeamActivity';

export const ManagerDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Team Size',
      value: '15',
      change: '+2 this month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg Performance',
      value: '4.1/5.0',
      change: '+0.2 from last month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Reviews',
      value: '5',
      change: '3 due this week',
      icon: Calendar,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Action Items',
      value: '8',
      change: '2 high priority',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Senior Developer',
      performance: 4.2,
      status: 'on-track',
      avatar: 'JD',
      nextReview: '2024-01-15'
    },
    {
      name: 'Jane Smith',
      role: 'UX Designer',
      performance: 4.5,
      status: 'excellent',
      avatar: 'JS',
      nextReview: '2024-01-20'
    },
    {
      name: 'Mike Johnson',
      role: 'Frontend Developer',
      performance: 3.8,
      status: 'needs-attention',
      avatar: 'MJ',
      nextReview: '2024-01-18'
    },
    {
      name: 'Sarah Wilson',
      role: 'Product Manager',
      performance: 4.3,
      status: 'on-track',
      avatar: 'SW',
      nextReview: '2024-01-22'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Dashboard</h1>
          <p className="text-gray-600">Manage your team's performance and development</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Schedule Reviews
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Report
          </button>
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
        {/* Team Performance Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance Overview</h3>
            <TeamPerformanceChart />
          </div>
        </div>

        {/* Team Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <TeamActivity />
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{member.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <span className="font-medium">{member.performance}/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'excellent' ? 'bg-green-100 text-green-700' :
                    member.status === 'on-track' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {member.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Review</span>
                  <span className="text-sm text-gray-900">{member.nextReview}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};