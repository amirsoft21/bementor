import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      participants: [
        { id: 1, name: 'John Student', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
        { id: 2, name: 'Dr. Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }
      ],
      lastMessage: {
        text: 'Thank you for the lesson!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        senderId: 1
      },
      unreadCount: 0
    },
    {
      id: 2,
      participants: [
        { id: 1, name: 'John Student', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
        { id: 3, name: 'Prof. Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }
      ],
      lastMessage: {
        text: 'When is our next session?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        senderId: 3
      },
      unreadCount: 1
    }
  ];

  // Mock messages data
  const mockMessages = {
    1: [
      {
        id: 1,
        text: 'Hi Dr. Johnson, I need help with calculus',
        senderId: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        type: 'text'
      },
      {
        id: 2,
        text: 'Of course! I\'d be happy to help. What specific topic are you struggling with?',
        senderId: 2,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
        type: 'text'
      },
      {
        id: 3,
        text: 'Thank you for the lesson!',
        senderId: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        type: 'text'
      }
    ],
    2: [
      {
        id: 4,
        text: 'Hello Professor Chen',
        senderId: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        type: 'text'
      },
      {
        id: 5,
        text: 'When is our next session?',
        senderId: 3,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        type: 'text'
      }
    ]
  };

  useEffect(() => {
    if (currentUser) {
      // Initialize conversations and messages
      setConversations(mockConversations);
      setMessages(mockMessages);
      
      // Calculate unread count
      const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
      setUnreadCount(totalUnread);

      // Mock Socket.IO connection
      const mockSocket = {
        emit: (event, data) => {
          console.log('Socket emit:', event, data);
          // Simulate message delivery
          if (event === 'send_message') {
            setTimeout(() => {
              const newMessage = {
                id: Date.now(),
                text: data.text,
                senderId: currentUser.id,
                timestamp: new Date(),
                type: 'text'
              };
              
              setMessages(prev => ({
                ...prev,
                [data.conversationId]: [...(prev[data.conversationId] || []), newMessage]
              }));
            }, 1000);
          }
        },
        on: (event, callback) => {
          console.log('Socket listening for:', event);
        },
        disconnect: () => {
          console.log('Socket disconnected');
        }
      };

      setSocket(mockSocket);
    } else {
      setSocket(null);
      setConversations([]);
      setMessages({});
      setActiveConversation(null);
      setUnreadCount(0);
    }
  }, [currentUser]);

  const sendMessage = (conversationId, text) => {
    if (!socket || !text.trim()) return;

    const messageData = {
      conversationId,
      text: text.trim(),
      senderId: currentUser.id
    };

    socket.emit('send_message', messageData);

    // Optimistically add message to UI
    const newMessage = {
      id: Date.now(),
      text: text.trim(),
      senderId: currentUser.id,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));

    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { 
              ...conv, 
              lastMessage: {
                text: text.trim(),
                timestamp: new Date(),
                senderId: currentUser.id
              }
            }
          : conv
      )
    );
  };

  const createConversation = (participantId, participantName, participantAvatar) => {
    const newConversation = {
      id: Date.now(),
      participants: [
        { id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar },
        { id: participantId, name: participantName, avatar: participantAvatar }
      ],
      lastMessage: null,
      unreadCount: 0
    };

    setConversations(prev => [newConversation, ...prev]);
    setMessages(prev => ({ ...prev, [newConversation.id]: [] }));
    setActiveConversation(newConversation.id);

    return newConversation.id;
  };

  const markConversationAsRead = (conversationId) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    // Recalculate total unread count
    const updatedConversations = conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    );
    const totalUnread = updatedConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
    setUnreadCount(totalUnread);
  };

  const value = {
    socket,
    conversations,
    activeConversation,
    messages,
    unreadCount,
    sendMessage,
    createConversation,
    setActiveConversation,
    markConversationAsRead
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 