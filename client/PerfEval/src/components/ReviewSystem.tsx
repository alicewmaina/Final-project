import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  User, 
  Star,
  Send,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../hooks/useData';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

interface ReviewSystemProps {
  userRole: string;
}

export const ReviewSystem: React.FC<ReviewSystemProps> = ({ userRole }) => {
  const { user } = useAuth();
  const { reviews, isLoading, addReview, updateReview, deleteReview, addActivity } = useData();
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'scheduled'>('pending');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [newReview, setNewReview] = useState({
    title: '',
    type: 'self-evaluation' as 'self-evaluation' | 'peer-review' | 'performance-review',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    reviewer: user?.name || '',
    reviewee: '',
  });

  if (isLoading) {
    return <LoadingState message="Loading reviews..." />;
  }

  // Filter reviews for current user
  const userReviews = reviews.filter(review => 
    review.userId === user?.id || 
    review.reviewer === user?.name || 
    review.reviewee === user?.name
  );

  const categorizedReviews = {
    pending: userReviews.filter(review => review.status === 'pending'),
    completed: userReviews.filter(review => review.status === 'completed'),
    scheduled: userReviews.filter(review => review.status === 'scheduled')
  };

  const handleCreateReview = () => {
    if (!newReview.title.trim()) return;

    const review = addReview({
      ...newReview,
      status: 'pending',
      progress: 0,
      userId: user?.id || '',
    });

    addActivity({
      type: 'review-created',
      title: `Created review: ${newReview.title}`,
      user: user?.name || '',
      time: 'Just now',
      icon: 'FileText',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    });

    setNewReview({
      title: '',
      type: 'self-evaluation',
      dueDate: '',
      priority: 'medium',
      reviewer: user?.name || '',
      reviewee: '',
    });
    setShowCreateReview(false);
  };

  const handleCompleteReview = (reviewId: string) => {
    updateReview(reviewId, {
      status: 'completed',
      progress: 100,
      completedDate: new Date().toISOString().split('T')[0],
      score: 4.2 // This would come from the actual review form
    });

    addActivity({
      type: 'review-completed',
      title: 'Completed performance review',
      user: user?.name || '',
      time: 'Just now',
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    });
  };

  const getTypeColor = (reviewType: string) => {
    switch (reviewType) {
      case 'self-evaluation': return 'bg-blue-100 text-blue-700';
      case 'peer-review': return 'bg-green-100 text-green-700';
      case 'performance-review': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const ReviewCard = ({ review }: { review: any }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <FileText className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{review.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(review.type)}`}>
                {review.type.replace('-', ' ')}
              </span>
              {review.priority && (
                <span className={`text-xs font-medium ${getPriorityColor(review.priority)}`}>
                  {review.priority} priority
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {activeTab === 'pending' && (
            <button 
              onClick={() => handleCompleteReview(review.id)}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
            >
              Complete
            </button>
          )}
          <button
            onClick={() => setSelectedReview(review.id)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
          >
            {activeTab === 'pending' ? 'Start' : 'View'}
          </button>
          <button
            onClick={() => deleteReview(review.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Reviewer:</span>
          <span className="font-medium">{review.reviewer}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Reviewee:</span>
          <span className="font-medium">{review.reviewee}</span>
        </div>
        {review.dueDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Due Date:</span>
            <span className="font-medium">{review.dueDate}</span>
          </div>
        )}
        {review.completedDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Completed:</span>
            <span className="font-medium">{review.completedDate}</span>
          </div>
        )}
        {review.score && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Score:</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium">{review.score}/5.0</span>
            </div>
          </div>
        )}
        {review.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress:</span>
              <span className="font-medium">{review.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${review.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (showCreateReview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowCreateReview(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Review</h1>
          </div>
          <button 
            onClick={handleCreateReview}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Review
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter review title..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Type
                </label>
                <select 
                  value={newReview.type}
                  onChange={(e) => setNewReview(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="self-evaluation">Self Evaluation</option>
                  <option value="peer-review">Peer Review</option>
                  <option value="performance-review">Performance Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select 
                  value={newReview.priority}
                  onChange={(e) => setNewReview(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newReview.dueDate}
                  onChange={(e) => setNewReview(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reviewee
              </label>
              <input
                type="text"
                value={newReview.reviewee}
                onChange={(e) => setNewReview(prev => ({ ...prev, reviewee: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter reviewee name..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedReview) {
    const review = userReviews.find(r => r.id === selectedReview);
    if (!review) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSelectedReview(null)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{review.title}</h1>
          </div>
          <button 
            onClick={() => handleCompleteReview(review.id)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Submit Review</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Performance (1-5 scale)
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Star className="h-6 w-6 text-gray-400 hover:text-yellow-500" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Achievements
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Describe key achievements..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas for Improvement
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Identify areas for improvement..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goals for Next Period
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Set goals for the next period..."
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
          <h1 className="text-2xl font-bold text-gray-900">Performance Reviews</h1>
          <p className="text-gray-600">Manage and track performance evaluations</p>
        </div>
        <button 
          onClick={() => setShowCreateReview(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Review</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'pending', label: 'Pending', icon: Clock, count: categorizedReviews.pending.length },
            { id: 'completed', label: 'Completed', icon: CheckCircle, count: categorizedReviews.completed.length },
            { id: 'scheduled', label: 'Scheduled', icon: Calendar, count: categorizedReviews.scheduled.length }
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
          {categorizedReviews[activeTab].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedReviews[activeTab].map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title={`No ${activeTab} Reviews`}
              description={
                activeTab === 'pending' ? "No pending reviews. Create a new review to get started!" :
                activeTab === 'completed' ? "No completed reviews yet. Complete some pending reviews!" :
                "No scheduled reviews. Schedule reviews for future dates!"
              }
              actionLabel={activeTab === 'pending' ? "Create Review" : undefined}
              onAction={activeTab === 'pending' ? () => setShowCreateReview(true) : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
};