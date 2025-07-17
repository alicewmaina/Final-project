import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Plus, 
  Hash, 
  Users, 
  Search,
  Paperclip,
  Smile,
  MoreHorizontal,
  UserPlus
} from 'lucide-react';
import { UserRole } from '../App';

interface GroupChatProps {
  userRole: UserRole;
}

export const GroupChat: React.FC<GroupChatProps> = ({ userRole }) => {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [message, setMessage] = useState('');

  const channels = [
    { id: 'general', name: 'General', type: 'public', unread: 3 },
    { id: 'engineering', name: 'Engineering', type: 'public', unread: 1 },
    { id: 'hr-announcements', name: 'HR Announcements', type: 'public', unread: 0 },
    { id: 'project-alpha', name: 'Project Alpha', type: 'private', unread: 5 },
    { id: 'performance-reviews', name: 'Performance Reviews', type: 'private', unread: 2 }
  ];

  const messages = [
    {
      id: '1',
      user: 'Sarah Johnson',
      avatar: 'SJ',
      message: 'Great work on the Q4 performance reviews everyone! The feedback has been really constructive.',
      timestamp: '2:30 PM',
      type: 'message'
    },
    {
      id: '2',
      user: 'John Doe',
      avatar: 'JD',
      message: 'Thanks! The new review system made it much easier to provide detailed feedback.',
      timestamp: '2:35 PM',
      type: 'message'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      avatar: 'MJ',
      message: 'I have a question about the goal-setting process for Q1. Should we schedule a meeting?',
      timestamp: '2:40 PM',
      type: 'message'
    },
    {
      id: '4',
      user: 'Sarah Johnson',
      avatar: 'SJ',
      message: 'Good idea! Let\'s schedule a team meeting for next week to discuss Q1 goals.',
      timestamp: '2:42 PM',
      type: 'message'
    },
    {
      id: '5',
      user: 'System',
      avatar: 'S',
      message: 'Jane Smith joined the channel',
      timestamp: '2:45 PM',
      type: 'system'
    }
  ];

  const onlineUsers = [
    { name: 'Sarah Johnson', avatar: 'SJ', status: 'online' },
    { name: 'John Doe', avatar: 'JD', status: 'online' },
    { name: 'Mike Johnson', avatar: 'MJ', status: 'away' },
    { name: 'Jane Smith', avatar: 'JS', status: 'offline' }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Team Chat</h2>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Channels
              </h3>
              <div className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedChannel === channel.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Hash className="h-4 w-4" />
                    <span className="flex-1 text-left truncate">{channel.name}</span>
                    {channel.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Online ({onlineUsers.filter(u => u.status === 'online').length})
              </h3>
              <div className="space-y-1">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-2 px-3 py-2">
                    <div className="relative">
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{user.avatar}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                        user.status === 'online' ? 'bg-green-500' :
                        user.status === 'away' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`} />
                    </div>
                    <span className="text-sm text-gray-700 truncate">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Hash className="h-5 w-5 text-gray-600" />
            <h1 className="text-lg font-semibold text-gray-900">
              {channels.find(c => c.id === selectedChannel)?.name}
            </h1>
            <span className="text-sm text-gray-500">
              {onlineUsers.filter(u => u.status === 'online').length} members
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <UserPlus className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-3 ${
              msg.type === 'system' ? 'justify-center' : ''
            }`}>
              {msg.type === 'system' ? (
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {msg.message}
                </div>
              ) : (
                <>
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{msg.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Paperclip className="h-4 w-4" />
            </button>
            <div className="flex-1 flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Message #${channels.find(c => c.id === selectedChannel)?.name}`}
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              <button className="p-1 text-gray-600 hover:text-gray-900">
                <Smile className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};