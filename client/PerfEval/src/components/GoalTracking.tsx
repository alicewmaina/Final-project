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
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../hooks/useData';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

export const GoalTracking: React.FC<{ userRole: string }> = ({ userRole }) => {
  const { user } = useAuth();
  const { goals, isLoading, addGoal, updateGoal, deleteGoal } = useData();
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'overdue'>('active');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Professional Development',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
  });

  if (isLoading) {
    return <LoadingState message="Loading goals..." />;
  }

  // Filter goals for current user
  const userGoals = goals.filter(goal => goal.userId === user?.id);

  const categorizedGoals = {
    active: userGoals.filter(goal => goal.status === 'active' || goal.status === 'on-track' || goal.status === 'behind'),
    completed: userGoals.filter(goal => goal.status === 'completed'),
    overdue: userGoals.filter(goal => goal.status === 'overdue')
  };

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return;

    addGoal({
      ...newGoal,
      progress: 0,
      status: 'active',
      userId: user?.id || '',
    });

    setNewGoal({
      title: '',
      description: '',
      category: 'Professional Development',
      priority: 'medium',
      dueDate: '',
    });
    setShowAddGoal(false);
  };

  const handleUpdateProgress = (goalId: string, newProgress: number) => {
    const status = newProgress === 100 ? 'completed' : 'active';
    updateGoal(goalId, { 
      progress: newProgress, 
      status,
      ...(newProgress === 100 && { completedDate: new Date().toISOString().split('T')[0] })
    });
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

  const GoalCard = ({ goal }: { goal: any }) => {
    const [progress, setProgress] = useState(goal.progress);

    return (
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
          <button
            onClick={() => deleteGoal(goal.id)}
            className="text-red-600 hover:text-red-800 text-xs"
          >
            Delete
          </button>
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
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                progress === 100 ? 'bg-green-600' : 'bg-blue-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => {
            const newProgress = parseInt(e.target.value);
            setProgress(newProgress);
            handleUpdateProgress(goal.id, newProgress);
          }}
          className="flex-1"
        />
        <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
          Edit
        </button>
      </div>
    </div>
    );
  };

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
            onClick={handleAddGoal}
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
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter goal title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
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
                <select 
                  value={newGoal.category}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
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
                <select 
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
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
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, dueDate: e.target.value }))}
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
            { id: 'active', label: 'Active', icon: Target, count: categorizedGoals.active.length },
            { id: 'completed', label: 'Completed', icon: CheckCircle, count: categorizedGoals.completed.length },
            { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: categorizedGoals.overdue.length }
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
          {categorizedGoals[activeTab].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedGoals[activeTab].map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Target}
              title={`No ${activeTab} Goals`}
              description={
                activeTab === 'active' ? "You don't have any active goals. Create one to get started!" :
                activeTab === 'completed' ? "No completed goals yet. Keep working on your active goals!" :
                "No overdue goals. Great job staying on track!"
              }
              actionLabel={activeTab === 'active' ? "Create Goal" : undefined}
              onAction={activeTab === 'active' ? () => setShowAddGoal(true) : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
};