import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, SignUpData } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
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

  // Simulate checking for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (error) {
          localStorage.removeItem('user');
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    // Simulate loading delay
    setTimeout(checkAuthStatus, 1000);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - in real app, this would call your backend
    if (credentials.email && credentials.password) {
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email === 'manager@company.com' ? 'Sarah Johnson' : 
              credentials.email === 'hr@company.com' ? 'HR Admin' : 'John Doe',
        role: credentials.email === 'manager@company.com' ? 'manager' : 
              credentials.email === 'hr@company.com' ? 'hr' : 'employee',
        department: 'Engineering',
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setAuthState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
      });
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (data: SignUpData): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock user creation
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      department: data.department,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState(prev => ({
      ...prev,
      user,
    }));
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};