import React from 'react';
import { 
  Home, 
  FileText, 
  Target, 
  MessageCircle, 
  BarChart3, 
  Users, 
  Calendar,
  X
} from 'lucide-react';
import { ActiveView } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onViewChange, 
  isOpen, 
  onClose 
}) => {
  const { user } = useAuth();

  if (!user) return null;

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', roles: ['employee', 'manager', 'hr'] },
    { id: 'reviews', icon: FileText, label: 'Reviews', roles: ['employee', 'manager', 'hr'] },
    { id: 'goals', icon: Target, label: 'Goals', roles: ['employee', 'manager', 'hr'] },
    { id: 'chat', icon: MessageCircle, label: 'Team Chat', roles: ['employee', 'manager', 'hr'] },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', roles: ['manager', 'hr'] },
  ];

  const filteredItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 lg:mt-8">
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </h3>
          </div>
          
          <ul className="space-y-1 px-4">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onViewChange(item.id as ActiveView);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Team Alpha</p>
              <p className="text-xs text-gray-500">Engineering</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;