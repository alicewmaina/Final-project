import React from 'react';
import { User, Menu, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  // Defensive coding: render nothing or a loading state if user is not yet available.
  if (!user) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* You can add a loading skeleton here */}
          </div>
        </div>
      </header>
    );
  }

  const userInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-shrink-0 flex items-center ml-2 lg:ml-0">
            <div className="flex items-center space-x-2 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                <span className="text-sm font-medium text-gray-600">
                  <p className="text-xs text-gray-500">{user.email}</p>
                    onClick={logout}
                    <span>Sign Out</span>
};
// File removed for scaffold cleanup