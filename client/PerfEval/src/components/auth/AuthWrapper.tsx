import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginPage } from './LoginPage';
import { SignUpPage } from './SignUpPage';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return showSignUp ? (
      <SignUpPage onSwitchToLogin={() => setShowSignUp(false)} />
    ) : (
      <LoginPage onSwitchToSignup={() => setShowSignUp(true)} />
    );
  }

  return <>{children}</>;
};