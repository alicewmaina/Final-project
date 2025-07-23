import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Plus,
  Edit,
  Trash,
  Check
} from 'lucide-react';
  const handleMarkDone = (goal: Goal) => {
    if (updateGoal) {
      updateGoal({ ...goal, status: 'completed' });
    }
  };
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../hooks/useData';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';
import { Analytics } from './Analytics';

interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  progress?: number;
  status: 'active' | 'completed' | 'behind' | 'in-progress';
  userId: string;
}

export const EmployeeDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth(); // Also get isAuthenticated
  const {
    goals = [],
    reviews = [],
    activities = [],
    isLoading,
    addGoal,
    updateGoal,
    deleteGoal
  } = useData();

  // More robust check: wait for auth to be confirmed and user to be loaded.
  if (!isAuthenticated || !user) {
    return <LoadingState message="Authenticating..." />;
  }

  const [showAddTaskModal, setShowAddTaskModal] = React.useState(false);
  const [editTask, setEditTask] = React.useState<Goal | null>(null);
  const [taskForm, setTaskForm] = React.useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    category: 'Professional Development'
  });

  const handleEditTask = (goal: Goal) => {
    setEditTask(goal);
    setTaskForm({
      title: goal.title,
      description: goal.description,
      dueDate: goal.dueDate || '',
      priority: goal.priority,
      category: goal.category || 'Professional Development',
    });
    setShowAddTaskModal(true);
  };

  const handleUpdateTask = () => {
    if (editTask && updateGoal) {
      updateGoal({ ...editTask, ...taskForm });
      resetTaskForm();
    }
  };

  const handleDeleteTask = (goal: Goal) => {
    if (deleteGoal) deleteGoal(goal.id);
  };

  const resetTaskForm = () => {
    setShowAddTaskModal(false);
    setTaskForm({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      category: 'Professional Development',
    });
    setEditTask(null);
  };

  if (isLoading) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  const userGoals = goals.filter(goal => goal.userId === user?.id);
  const userReviews = reviews.filter(review => review.reviewee === user?.name);
  const userActivities = activities.filter(activity => activity.user === user?.name);

  const completedGoals = userGoals.filter(goal => goal.status === 'completed').length;
  const totalGoals = userGoals.length;
  const pendingReviews = userReviews.filter(review => review.status === 'pending').length;
  const avgPerformance = userReviews.length > 0
    ? userReviews.reduce((sum, review) => sum + (review.score || 0), 0) / userReviews.length
    : 0;

  const stats = [
    {
      title: 'Performance Score',
      value: avgPerformance > 0 ? `${avgPerformance.toFixed(1)}/5.0` : 'No data',
      change: userReviews.length > 0 ? 'Based on reviews' : 'Complete a review',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Goals Completed',
      value: totalGoals > 0 ? `${completedGoals}/${totalGoals}` : '0/0',
      change: totalGoals > 0 ? `${totalGoals - completedGoals} goals remaining` : 'No goals set',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Next Review',
      value: pendingReviews > 0 ? `${pendingReviews} pending` : 'None scheduled',
      change: pendingReviews > 0 ? 'Reviews waiting' : 'All up to date',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Team Ranking',
      value: 'N/A',
      change: 'Coming soon',
      icon: Award,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const upcomingTasks = [
    ...userReviews.filter(review => review.status === 'pending').map(review => ({
      title: review.title,
      dueDate: review.dueDate || 'No due date',
      priority: review.priority || 'medium',
      status: 'pending'
    })),
    ...userGoals.filter(goal => goal.status === 'active' && goal.dueDate).map(goal => ({
      title: `Update: ${goal.title}`,
      dueDate: goal.dueDate!,
      priority: goal.priority,
      status: goal.status === 'behind' ? 'behind' : 'in-progress'
    }))
  ];

  return (
    <div className="space-y-8">
      {/* Overall Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Overall Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
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
        {/* Remove Analytics chart below the stats grid */}
      </div>

      {/* Log Task Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Log Task</h2>
          <button
            type="button"
            onClick={() => setShowAddTaskModal(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>

        {userGoals.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {userGoals.map((goal) => (
                <tr key={goal.id}>
                  <td className="px-4 py-2 text-sm text-gray-900">{goal.title}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{goal.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{goal.dueDate || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{goal.priority}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{goal.status}</td>
                  <td className="px-4 py-2 text-sm text-gray-500 flex items-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-1 rounded"
                      onClick={() => handleEditTask(goal)}
                      aria-label="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 p-1 rounded"
                      onClick={() => handleDeleteTask(goal)}
                      aria-label="Delete"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No tasks logged yet.</p>
        )}

        {showAddTaskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{editTask ? 'Edit Task' : 'Add New Task'}</h2>
              <form onSubmit={e => {
                e.preventDefault();
                if (editTask) {
                  handleUpdateTask();
                } else {
                  const newGoal = {
                    title: taskForm.title,
                    description: taskForm.description,
                    dueDate: taskForm.dueDate,
                    priority: taskForm.priority,
                    category: taskForm.category,
                    progress: 0,
                    status: 'active',
                    userId: user?.id || '',
                  };
                  addGoal(newGoal);
                  resetTaskForm();
                }
              }}>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={taskForm.title} onChange={e => setTaskForm(f => ({ ...f, title: e.target.value }))} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea value={taskForm.description} onChange={e => setTaskForm(f => ({ ...f, description: e.target.value }))} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input type="date" value={taskForm.dueDate} onChange={e => setTaskForm(f => ({ ...f, dueDate: e.target.value }))} className="w-full p-2 border rounded" />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select value={taskForm.priority} onChange={e => setTaskForm(f => ({ ...f, priority: e.target.value as 'high' | 'medium' | 'low' }))} className="w-full p-2 border rounded">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" value={taskForm.category} onChange={e => setTaskForm(f => ({ ...f, category: e.target.value }))} className="w-full p-2 border rounded" />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button type="button" onClick={resetTaskForm} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                    {editTask ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Task Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900">Schedule Task</h2>
        {upcomingTasks.length > 0 ? (
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
                    task.status === 'behind' ? 'bg-red-100 text-red-700' :
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
        ) : (
          <EmptyState
            icon={CheckCircle}
            title="No Scheduled Tasks"
            description="You're all caught up! New tasks will appear here when assigned."
            actionLabel="Create Goal"
            onAction={() => {
              const newGoal = {
                title: 'My First Goal',
                description: 'Set a goal to get started',
                progress: 0,
                category: 'Professional Development',
                status: 'active' as const,
                userId: user?.id || '',
              };
              addGoal(newGoal);
            }}
          />
        )}
      </div>
    </div>
  );
};
