export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'manager' | 'hr';
  department: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  department: string;
  role: 'employee' | 'manager';
}