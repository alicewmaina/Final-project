import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Flag
} from 'lucide-react';
import { UserRole } from '../App';

interface GoalTrackingProps {
  userRole: UserRole;
}

export const GoalTracking: React.FC<GoalTrackingProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'overdue'>('active');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const goals = {
    active: [
      {
        id: '1',
        title: 'Complete React certification',
        description: 'Obtain React developer certification to enhance frontend skills',
        progress: 75,
        dueDate: '2024-02-15',
        priority: 'high',
        category: 'Professional Development',
        status: 'on-track'
      },
      {
        id: '2',
        title: 'Improve code review turnaround',
        description: 'Reduce average code review time from 2 days to 1 day',
        progress: 60,
        dueDate: '2024-01-30',
        priority: 'medium',
        category: 'Performance',
        status: 'on-track'
      },
      {
        id: '3',
        title: 'Mentor junior developer',
        description: 'Provide regular mentorship to new team member',
        progress: 30,
        dueDate: '2024-03-01',
        priority: 'low',
        category: 'Leadership',
        status: 'behind'
      }
    ],
    completed: [
      {
        id: '4',
        title: 'Implement new authentication system',
        description: 'Successfully migrated to OAuth 2.0 authentication',
        progress: 100,
        completedDate: '2023-12-20',
        category: 'Technical',
        status: 'completed'
      }
    ],
    overdue: [
      {
        id: '5',
        title: 'Update documentation',
        description: 'Update all API documentation for v2.0',
        progress: 40,
        dueDate: '2023-12-31',
        priority: 'high',
        category: 'Documentation',
        status: 'overdue'
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-50';
      case 'behind': return 'text-yellow-600 bg-yellow-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const GoalCard = ({ goal }: { goal: any }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {goal.priority && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
              {goal.priority}
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
            {goal.status}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Category:</span>
          <span className="font-medium">{goal.category}</span>
        </div>
        
        {goal.dueDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Due Date:</span>
            <span className="font-medium">{goal.dueDate}</span>
          </div>
        )}
        
        {goal.completedDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Completed:</span>
            <span className="font-medium">{goal.completedDate}</span>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress:</span>
            <span className="font-medium">{goal.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                goal.progress === 100 ? 'bg-green-600' : 'bg-blue-600'
              }`}
              style={{ width: `${goal.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm">
          Update Progress
        </button>
        <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
          Edit
        </button>
      </div>
    </div>
  );

  if (showAddGoal) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowAddGoal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Add New Goal</h1>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Save Goal
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter goal title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe your goal..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Professional Development</option>
                  <option>Performance</option>
                  <option>Leadership</option>
                  <option>Technical</option>
                  <option>Documentation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Goal Tracking</h1>
          <p className="text-gray-600">Monitor and manage your professional goals</p>
        </div>
        <button 
          onClick={() => setShowAddGoal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'active', label: 'Active', icon: Target, count: goals.active.length },
            { id: 'completed', label: 'Completed', icon: CheckCircle, count: goals.completed.length },
            { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: goals.overdue.length }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals[activeTab].map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};