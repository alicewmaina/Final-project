import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import { AuthProvider } from './contexts/AuthContext';
import { AuthWrapper } from './components/auth/AuthWrapper';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import AppContent from './AppContent';
import { ReviewSystem } from './components/ReviewSystem';
import { GoalTracking } from './components/GoalTracking';
import { GroupChat } from './components/GroupChat';
import { Analytics } from './components/Analytics';
import { useAuth } from './contexts/AuthContext';

// Auth config
const authConfig = {
  companyName: "Performance Evaluation Tool",
  showDemoCredentials: true,
  primaryColor: "blue",
  backgroundGradient: "bg-gradient-to-br from-blue-50 via-white to-purple-50",
  customDepartments: [
    'Engineering',
    'Design', 
    'Product',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations'
  ]
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
};

// App Component
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthWrapper authConfig={authConfig}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onSwitchToSignup={() => {}} />} />
            <Route path="/signup" element={<SignUpPage onSwitchToLogin={() => {}} />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            } />
            <Route path="/reviews" element={<ReviewSystem userRole="employee" />} />
            <Route path="/goals" element={<GoalTracking userRole="employee" />} />
            <Route path="/chat" element={<GroupChat userRole="employee" />} />
            <Route path="/analytics" element={<Analytics userRole="employee" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
