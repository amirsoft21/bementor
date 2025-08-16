import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ExploreTeachersPage from './pages/ExploreTeachersPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import TeacherMyProfilePage from './pages/TeacherMyProfilePage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" /> : <SignupPage />} />
          <Route path="/explore" element={<ExploreTeachersPage />} />
          <Route path="/teacher/:id" element={<TeacherProfilePage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-profile" 
            element={
              <ProtectedRoute>
                <TeacherMyProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App; 