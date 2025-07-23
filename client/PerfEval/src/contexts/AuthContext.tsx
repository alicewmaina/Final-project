import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, SignUpData } from '../types/auth';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: { email: string; password: string; name: string; department: string; role: 'employee' | 'manager' }) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
          credentials: 'include',
        });
        if (response.ok) {
          const { user } = await response.json();
          setAuthState({ user, isLoading: false, isAuthenticated: true });
        } else {
          setAuthState({ user: null, isLoading: false, isAuthenticated: false });
        }
      } catch (err) {
        setAuthState({ user: null, isLoading: false, isAuthenticated: false });
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { user } = await response.json();
      setAuthState({ user, isLoading: false, isAuthenticated: true });
    } catch (error) {
      setAuthState({ user: null, isLoading: false, isAuthenticated: false });
      throw error;
    }
  };

  const signup = async (data: { email: string; password: string; name: string; department: string; role: 'employee' | 'manager' }) : Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }
      
      const { user } = await response.json();
      setAuthState({ user, isLoading: false, isAuthenticated: true });
      navigate('/'); // Redirect to dashboard
      
    } catch (error) {
      setAuthState({ user: null, isLoading: false, isAuthenticated: false });
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    navigate('/login');
  };

  const updateUser = (user: User) => {
    setAuthState(prev => ({
      ...prev,
      user,
    }));
  };

  const value: AuthContextType = {
    ...authState,
    token,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};