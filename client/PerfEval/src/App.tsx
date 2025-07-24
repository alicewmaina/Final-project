import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import { AuthWrapper } from './components/auth/AuthWrapper';
import AppContent from './AppContent';
import { ReviewSystem } from './components/ReviewSystem';
import { GoalTracking } from './components/GoalTracking';
import { GroupChat } from './components/GroupChat';
import { Analytics } from './components/Analytics';
import { ManagerDashboard } from './components/ManagerDashboard';
import { useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import { SignUpPage } from './components/auth/SignUpPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <>{children}</>;
};

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/auth" element={<AuthWrapper />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    } />
    <Route path="/reviews" element={<ReviewSystem userRole="employee" />} />
    <Route path="/goals" element={<GoalTracking userRole="employee" />} />
    <Route path="/chat" element={<GroupChat userRole="employee" />} />
      <Route path="/analytics" element={<Analytics userRole="employee" />} />
      <Route path="/manager-dashboard" element={<ManagerDashboard />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default App;
