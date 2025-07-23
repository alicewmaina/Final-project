import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Data interfaces
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  performance?: number;
  status?: 'excellent' | 'on-track' | 'needs-attention';
  nextReview?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate?: string;
  completedDate?: string;
  priority?: 'high' | 'medium' | 'low';
  category: string;
  status: 'active' | 'completed' | 'overdue' | 'on-track' | 'behind';
  userId: string;
}

export interface Review {
  id: string;
  title: string;
  type: 'self-evaluation' | 'peer-review' | 'performance-review';
  dueDate?: string;
  completedDate?: string;
  scheduledDate?: string;
  priority?: 'high' | 'medium' | 'low';
  reviewer: string;
  reviewee: string;
  progress?: number;
  score?: number;
  status: 'pending' | 'completed' | 'scheduled';
  userId: string;
  questions?: ReviewQuestion[];
  responses?: ReviewResponse[];
}

export interface ReviewQuestion {
  id: string;
  question: string;
  type: 'rating' | 'text' | 'multiple-choice';
  required: boolean;
  options?: string[];
}

export interface ReviewResponse {
  questionId: string;
  response: string | number;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'public' | 'private';
  members: string[];
  unreadCount: number;
  lastMessage?: ChatMessage;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  type: 'message' | 'system';
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  user: string;
  time: string;
  icon: string;
  color: string;
  bgColor: string;
}

// Custom hook for data management
export const useData = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiFetch = useCallback(async (path: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(errorData.message);
    }
    return response.json();
  }, []);

  const fetchData = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const [goalsData, reviewsData] = await Promise.all([
        apiFetch('/api/goals'),
        apiFetch('/api/evaluations'),
      ]);
      setGoals(goalsData);
      setReviews(reviewsData);
      // setActivities and other data similarly if they come from the backend
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, apiFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Goal operations
  const addGoal = async (goal: Omit<Goal, 'id'>) => {
    const newGoal = await apiFetch('/api/goals', { method: 'POST', body: JSON.stringify(goal) });
    setGoals(prev => [...prev, newGoal]);
    return newGoal;
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    const updatedGoal = await apiFetch(`/api/goals/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
    setGoals(prev => prev.map(g => g.id === id ? updatedGoal : g));
    return updatedGoal;
  };

  const deleteGoal = async (id: string) => {
    await apiFetch(`/api/goals/${id}`, { method: 'DELETE' });
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Review operations
  const addReview = async (review: Omit<Review, 'id'>) => {
    const newReview = await apiFetch('/api/evaluations', { method: 'POST', body: JSON.stringify(review) });
    setReviews(prev => [...prev, newReview]);
    return newReview;
  };

  const updateReview = async (id: string, updates: Partial<Review>) => {
    const updatedReview = await apiFetch(`/api/evaluations/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
    setReviews(prev => prev.map(r => r.id === id ? updatedReview : r));
    return updatedReview;
  };

  const deleteReview = async (id: string) => {
    await apiFetch(`/api/evaluations/${id}`, { method: 'DELETE' });
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  // Activity operations (assuming they are frontend-only for now)
  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 49)]);
  };


  return {
    goals,
    reviews,
    activities,
    isLoading,
    addGoal,
    updateGoal,
    deleteGoal,
    addReview,
    updateReview,
    deleteReview,
    addActivity,
    // Note: Other functions like chat, employees are not included yet
  };
};