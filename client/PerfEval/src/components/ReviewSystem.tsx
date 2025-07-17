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
  Users
} from 'lucide-react';
import { UserRole } from '../App';

interface ReviewSystemProps {
  userRole: UserRole;
}

export const ReviewSystem: React.FC<ReviewSystemProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'scheduled'>('pending');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  const reviews = {
    pending: [
      {
        id: '1',
        title: 'Q1 2024 Self-Evaluation',
        type: 'self-evaluation',
        dueDate: '2024-01-15',
        priority: 'high',
        reviewer: 'John Doe',
        reviewee: 'John Doe',
        progress: 0
      },
      {
        id: '2',
        title: 'Peer Review - Sarah Wilson',
        type: 'peer-review',
        dueDate: '2024-01-20',
        priority: 'medium',
        reviewer: 'John Doe',
        reviewee: 'Sarah Wilson',
        progress: 30
      }
    ],
    completed: [
      {
        id: '3',
        title: 'Q4 2023 Performance Review',
        type: 'performance-review',
        completedDate: '2023-12-30',
        score: 4.2,
        reviewer: 'Sarah Johnson',
        reviewee: 'John Doe'
      }
    ],
    scheduled: [
      {
        id: '4',
        title: 'Q2 2024 Performance Review',
        type: 'performance-review',
        scheduledDate: '2024-04-15',
        reviewer: 'Sarah Johnson',
        reviewee: 'John Doe'
      }
    ]
  };

  const ReviewCard = ({ review, type }: { review: any, type: string }) => {
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

    return (
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
          {type === 'pending' && (
            <button 
              onClick={() => setSelectedReview(review.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Start Review
            </button>
          )}
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
          {review.scheduledDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Scheduled:</span>
              <span className="font-medium">{review.scheduledDate}</span>
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
  };

  if (selectedReview) {
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
            <h1 className="text-2xl font-bold text-gray-900">Q1 2024 Self-Evaluation</h1>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Send className="h-4 w-4 mr-2 inline" />
            Submit Review
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-8">
            {/* Review Form */}
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
                  placeholder="Describe your key achievements this quarter..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas for Improvement
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Identify areas where you can improve..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goals for Next Quarter
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Set your goals for the next quarter..."
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
        {userRole === 'manager' && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Schedule Review
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'pending', label: 'Pending', icon: Clock },
            { id: 'completed', label: 'Completed', icon: CheckCircle },
            { id: 'scheduled', label: 'Scheduled', icon: Calendar }
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
              </button>
            );
          })}
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews[activeTab].map((review) => (
              <ReviewCard key={review.id} review={review} type={activeTab} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};