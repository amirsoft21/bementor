import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Image, 
  Paperclip,
  Smile,
  ArrowLeft
} from 'lucide-react';


const ChatPage = () => {
  const { 
    conversations, 
    activeConversation, 
    messages, 
    sendMessage, 
    setActiveConversation,
    markConversationAsRead 
  } = useChat();
  const { currentUser } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversation]);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    sendMessage(activeConversation, newMessage);
    setNewMessage('');
  };

  const handleConversationClick = (conversationId) => {
    setActiveConversation(conversationId);
    markConversationAsRead(conversationId);
  };

  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = conv.participants.find(p => p.id !== currentUser.id);
    return otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const activeConversationData = conversations.find(conv => conv.id === activeConversation);
  const activeMessages = messages[activeConversation] || [];

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participants.find(p => p.id !== currentUser.id);
  };

  if (conversations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No conversations yet</h2>
          <p className="text-gray-600 mb-4">
            Start a conversation by contacting a teacher from their profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Conversations List */}
        <div className={`w-full md:w-80 bg-white border-r border-gray-200 flex flex-col ${isMobileView && activeConversation ? 'hidden' : 'block'}`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conversation => {
              const otherParticipant = getOtherParticipant(conversation);
              const isActive = conversation.id === activeConversation;
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isActive ? 'bg-primary-50 border-primary-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={otherParticipant.avatar}
                      alt={otherParticipant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">
                          {otherParticipant.name}
                        </h3>
                        {conversation.lastMessage && (
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                          {conversation.lastMessage.text}
                        </p>
                      )}
                      {conversation.unreadCount > 0 && (
                        <div className="flex items-center justify-between mt-1">
                          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        {activeConversation && activeConversationData && (
          <div className={`flex-1 flex flex-col ${isMobileView ? 'block' : ''}`}>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isMobileView && (
                    <button
                      onClick={() => setActiveConversation(null)}
                      className="md:hidden p-1"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                  )}
                  <img
                    src={getOtherParticipant(activeConversationData).avatar}
                    alt={getOtherParticipant(activeConversationData).name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {getOtherParticipant(activeConversationData).name}
                    </h2>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeMessages.map(message => {
                const isOwnMessage = message.senderId === currentUser.id;
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isOwnMessage
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        isOwnMessage ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Image className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* No Conversation Selected */}
        {!activeConversation && !isMobileView && (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h2>
              <p className="text-gray-600">
                Choose a conversation from the list to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage; 