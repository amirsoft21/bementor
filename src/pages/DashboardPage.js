import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Star, 
  TrendingUp, 
  BookOpen,
  Settings,
  Bell,
  Search,
  Filter,
  ArrowRight,
  Clock,
  DollarSign,
  Award,
  Eye,
  Heart,
  UserPlus,
  Shield,
  Database
} from 'lucide-react';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { conversations, unreadCount } = useChat();
  const [activeTab, setActiveTab] = useState('overview');

  const isTeacher = currentUser?.role === 'teacher';
  const isAdmin = currentUser?.role === 'admin';

  // Mock data for dashboard
  const stats = {
    totalStudents: 45,
    totalEarnings: 2840,
    totalHours: 127,
    averageRating: 4.8,
    upcomingLessons: 3,
    unreadMessages: unreadCount
  };

  // Mock admin data
  const adminStats = {
    totalUsers: 1250,
    totalTeachers: 89,
    totalStudents: 1161,
    activeUsers: 342,
    newRegistrations: 23
  };

  const recentUsers = [
    { id: 1, name: 'ნინო ბერიძე', email: 'nino@example.com', role: 'teacher', status: 'active', joined: '2 hours ago' },
    { id: 2, name: 'გიორგი მაისურაძე', email: 'giorgi@example.com', role: 'teacher', status: 'pending', joined: '4 hours ago' },
    { id: 3, name: 'ელენა როდრიგესი', email: 'elena@example.com', role: 'student', status: 'active', joined: '1 day ago' },
    { id: 4, name: 'დავით კიმი', email: 'david@example.com', role: 'teacher', status: 'active', joined: '2 days ago' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'lesson',
      title: 'Math tutoring session with Alex',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'message',
      title: 'New message from Sarah',
      time: '4 hours ago',
      status: 'unread'
    },
    {
      id: 3,
      type: 'booking',
      title: 'New lesson booking from Mike',
      time: '1 day ago',
      status: 'pending'
    }
  ];

  const upcomingLessons = [
    {
      id: 1,
      student: 'Emma Wilson',
      subject: 'Calculus',
      time: 'Tomorrow, 2:00 PM',
      duration: '1 hour'
    },
    {
      id: 2,
      student: 'John Davis',
      subject: 'Physics',
      time: 'Wednesday, 4:00 PM',
      duration: '1.5 hours'
    }
  ];

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Teachers</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalTeachers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Students</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Today</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.newRegistrations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Database Management */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Database className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">View All Users</p>
              <p className="text-sm text-gray-600">Browse registered users</p>
            </div>
          </button>

          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Verify Teachers</p>
              <p className="text-sm text-gray-600">Review teacher applications</p>
            </div>
          </button>

          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Settings className="w-6 h-6 text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">System Settings</p>
              <p className="text-sm text-gray-600">Manage platform settings</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Users */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Registrations</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all users
          </button>
        </div>
        <div className="space-y-4">
          {recentUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'teacher' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.status}
                </span>
                <span className="text-sm text-gray-600">{user.joined}</span>
                <button className="text-primary-600 hover:text-primary-700">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Teaching Hours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/chat"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-primary-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">View Messages</p>
              <p className="text-sm text-gray-600">{stats.unreadMessages} unread</p>
            </div>
          </Link>

          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Calendar className="w-6 h-6 text-accent-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Schedule Lesson</p>
              <p className="text-sm text-gray-600">Book new session</p>
            </div>
          </button>

          <Link
            to="/my-profile"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">ჩემი პროფილი</p>
              <p className="text-sm text-gray-600">Edit your information and CV</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Upcoming Lessons */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Lessons</h2>
          <Link to="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {upcomingLessons.map(lesson => (
            <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{lesson.student}</p>
                  <p className="text-sm text-gray-600">{lesson.subject}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{lesson.time}</p>
                <p className="text-sm text-gray-600">{lesson.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map(activity => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'lesson' ? 'bg-green-100' :
                activity.type === 'message' ? 'bg-blue-100' : 'bg-accent-100'
              }`}>
                {activity.type === 'lesson' && <BookOpen className="w-4 h-4 text-green-600" />}
                {activity.type === 'message' && <MessageCircle className="w-4 h-4 text-blue-600" />}
                {activity.type === 'booking' && <Calendar className="w-4 h-4 text-accent-600" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                activity.status === 'unread' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Teachers</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Lessons</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.unreadMessages}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/explore"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Search className="w-6 h-6 text-primary-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Find Teachers</p>
              <p className="text-sm text-gray-600">Browse available tutors</p>
            </div>
          </Link>

          <Link
            to="/chat"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-accent-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Messages</p>
              <p className="text-sm text-gray-600">{stats.unreadMessages} unread</p>
            </div>
          </Link>

          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Heart className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Favorites</p>
              <p className="text-sm text-gray-600">View saved teachers</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Teachers */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Teachers</h2>
          <Link to="/explore" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=150&h=150&fit=crop&crop=face`}
                alt="Teacher"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-600">Mathematics</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.9</span>
                </div>
              </div>
              <button className="text-primary-600 hover:text-primary-700">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {currentUser?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                {isAdmin ? 'Admin Dashboard - Manage platform and users' :
                 isTeacher ? 'Here\'s what\'s happening with your teaching business' : 
                 'Track your learning progress and connect with teachers'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {isAdmin ? 
              ['overview', 'users', 'teachers', 'analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              )) :
              ['overview', 'lessons', 'messages', 'analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))
            }
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            isAdmin ? renderAdminDashboard() :
            isTeacher ? renderTeacherDashboard() : 
            renderStudentDashboard()
          )}
          
          {activeTab === 'lessons' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Lessons</h2>
              <p className="text-gray-600">Lesson management features coming soon...</p>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
              <Link to="/chat" className="btn-primary">
                Go to Messages
              </Link>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          )}

          {isAdmin && activeTab === 'users' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
              <p className="text-gray-600">User management features coming soon...</p>
            </div>
          )}

          {isAdmin && activeTab === 'teachers' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teacher Management</h2>
              <p className="text-gray-600">Teacher verification and management features coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 