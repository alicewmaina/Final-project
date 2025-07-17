import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthWrapper } from './components/auth/AuthWrapper';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';
import { ReviewSystem } from './components/ReviewSystem';
import { GroupChat } from './components/GroupChat';
import { Analytics } from './components/Analytics';
import { GoalTracking } from './components/GoalTracking';

import { useAuth } from './contexts/AuthContext';

export type ActiveView = 'dashboard' | 'reviews' | 'goals' | 'chat' | 'analytics';

function AppContent() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const renderContent = () => {
    if (activeView === 'reviews') return <ReviewSystem userRole={user.role} />;
    if (activeView === 'goals') return <GoalTracking userRole={user.role} />;
    if (activeView === 'chat') return <GroupChat userRole={user.role} />;
    if (activeView === 'analytics') return <Analytics userRole={user.role} />;
    
    return user.role === 'manager' || user.role === 'hr' 
      ? <ManagerDashboard /> 
      : <EmployeeDashboard />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <Sidebar 
          activeView={activeView}
          onViewChange={setActiveView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-6 ml-0 lg:ml-64 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthWrapper>
        <AppContent />
      </AuthWrapper>
    </AuthProvider>
  );
}

export default App;
