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
  UserPlus,
  Trash2,
  Edit
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../hooks/useData';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

interface GroupChatProps {
  userRole: string;
}

export const GroupChat: React.FC<GroupChatProps> = ({ userRole }) => {
  const { user } = useAuth();
  const { 
    chatChannels, 
    chatMessages, 
    isLoading, 
    addChannel, 
    updateChannel, 
    deleteChannel, 
    addMessage, 
    markChannelAsRead,
    addActivity 
  } = useData();
  
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [message, setMessage] = useState('');
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannel, setNewChannel] = useState({
    name: '',
    type: 'public' as 'public' | 'private',
  });

  if (isLoading) {
    return <LoadingState message="Loading chat..." />;
  }

  // Auto-select first channel if none selected
  React.useEffect(() => {
    if (chatChannels.length > 0 && !selectedChannel) {
      setSelectedChannel(chatChannels[0].id);
    }
  }, [chatChannels, selectedChannel]);

  const handleCreateChannel = () => {
    if (!newChannel.name.trim()) return;

    const channel = addChannel({
      ...newChannel,
      members: [user?.id || ''],
      unreadCount: 0,
    });

    addActivity({
      type: 'channel-created',
      title: `Created channel: ${newChannel.name}`,
      user: user?.name || '',
      time: 'Just now',
      icon: 'Hash',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    });

    setNewChannel({ name: '', type: 'public' });
    setShowCreateChannel(false);
    setSelectedChannel(channel.id);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChannel) return;

    addMessage({
      channelId: selectedChannel,
      userId: user?.id || '',
      userName: user?.name || '',
      userAvatar: user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'message'
    });

    addActivity({
      type: 'message-sent',
      title: `Sent message in ${chatChannels.find(c => c.id === selectedChannel)?.name}`,
      user: user?.name || '',
      time: 'Just now',
      icon: 'MessageCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    });

    setMessage('');
  };

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    markChannelAsRead(channelId);
  };

  const currentChannelMessages = chatMessages.filter(msg => msg.channelId === selectedChannel);
  const currentChannel = chatChannels.find(c => c.id === selectedChannel);

  const onlineUsers = [
    { name: user?.name || 'You', avatar: user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U', status: 'online' },
  ];

  if (showCreateChannel) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowCreateChannel(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Channel</h1>
          </div>
          <button 
            onClick={handleCreateChannel}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Channel
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel Name
              </label>
              <input
                type="text"
                value={newChannel.name}
                onChange={(e) => setNewChannel(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter channel name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="type"
                    value="public"
                    checked={newChannel.type === 'public'}
                    onChange={(e) => setNewChannel(prev => ({ ...prev, type: e.target.value as 'public' | 'private' }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Public</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="type"
                    value="private"
                    checked={newChannel.type === 'private'}
                    onChange={(e) => setNewChannel(prev => ({ ...prev, type: e.target.value as 'public' | 'private' }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Private</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Team Chat</h2>
            <button 
              onClick={() => setShowCreateChannel(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Channels ({chatChannels.length})
              </h3>
              {chatChannels.length > 0 ? (
                <div className="space-y-1">
                  {chatChannels.map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between group">
                      <button
                        onClick={() => handleChannelSelect(channel.id)}
                        className={`flex-1 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedChannel === channel.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Hash className="h-4 w-4" />
                        <span className="flex-1 text-left truncate">{channel.name}</span>
                        {channel.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {channel.unreadCount}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => deleteChannel(channel.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-600 hover:text-red-800 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Hash className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No channels yet</p>
                  <button
                    onClick={() => setShowCreateChannel(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    Create your first channel
                  </button>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Online ({onlineUsers.length})
              </h3>
              <div className="space-y-1">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-2 px-3 py-2">
                    <div className="relative">
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{user.avatar}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
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
        {currentChannel ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-gray-600" />
                <h1 className="text-lg font-semibold text-gray-900">{currentChannel.name}</h1>
                <span className="text-sm text-gray-500">
                  {currentChannel.members.length} members
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
              {currentChannelMessages.length > 0 ? (
                currentChannelMessages.map((msg) => (
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
                          <span className="text-sm font-medium text-blue-600">{msg.userAvatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{msg.userName}</span>
                            <span className="text-xs text-gray-500">{msg.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700">{msg.message}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <EmptyState
                  icon={MessageCircle}
                  title="No Messages Yet"
                  description={`Start the conversation in #${currentChannel.name}`}
                  className="py-12"
                />
              )}
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
                    placeholder={`Message #${currentChannel.name}`}
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={Hash}
              title="No Channel Selected"
              description="Select a channel from the sidebar or create a new one to start chatting"
              actionLabel="Create Channel"
              onAction={() => setShowCreateChannel(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};