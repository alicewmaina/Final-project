import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  BarChart3,
  PieChart,
  Calendar,
  Download
} from 'lucide-react';
import { UserRole } from '../App';

interface AnalyticsProps {
  userRole: UserRole;
}

export const Analytics: React.FC<AnalyticsProps> = ({ userRole }) => {
  const metrics = [
    {
      title: 'Team Performance',
      value: '4.2/5.0',
      change: '+0.3 from last quarter',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Goal Completion',
      value: '85%',
      change: '+12% from last quarter',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Review Completion',
      value: '92%',
      change: '+5% from last quarter',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Team Satisfaction',
      value: '4.1/5.0',
      change: '+0.2 from last quarter',
      icon: Users,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const departmentData = [
    { name: 'Engineering', performance: 4.3, employees: 25, completion: 88 },
    { name: 'Design', performance: 4.1, employees: 8, completion: 92 },
    { name: 'Product', performance: 4.2, employees: 12, completion: 85 },
    { name: 'Marketing', performance: 4.0, employees: 15, completion: 90 },
    { name: 'Sales', performance: 3.9, employees: 20, completion: 78 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Performance insights and trends</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Last Quarter</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{metric.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <BarChart3 className="h-5 w-5 text-gray-600" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Performance chart visualization</p>
            </div>
          </div>
        </div>

        {/* Goal Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Goal Distribution</h3>
            <PieChart className="h-5 w-5 text-gray-600" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Goal distribution chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Details
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Employees</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Performance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Goal Completion</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map((dept, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {dept.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{dept.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{dept.employees}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{dept.performance}/5.0</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(dept.performance / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{dept.completion}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${dept.completion}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+5%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};