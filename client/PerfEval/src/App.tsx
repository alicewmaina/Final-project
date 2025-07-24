import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import { AuthWrapper } from './components/auth/AuthWrapper';
import DashboardLayout from './components/DashboardLayout';
import { useAuth } from './contexts/AuthContext';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <>{children}</>;
};


const App = () => {
  // For /auth, /login, /signup, use AuthWrapper to handle switching between login/signup
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthWrapper><></></AuthWrapper>} />
      <Route path="/login" element={<AuthWrapper><></></AuthWrapper>} />
      <Route path="/signup" element={<AuthWrapper><></></AuthWrapper>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      } />
      {/* Additional routes can be added here as needed */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
