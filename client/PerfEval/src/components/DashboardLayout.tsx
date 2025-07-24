import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { EmployeeDashboard } from './EmployeeDashboard';
import { Analytics } from './Analytics';
import TaskTable from './TaskTable';

// Example: Integrate all main dashboard widgets in the layout
const DashboardLayout: React.FC = () => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Topbar />
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <EmployeeDashboard />
        <Analytics userRole="employee" />
        <TaskTable />
      </main>
    </div>
  </div>
);

export default DashboardLayout;
