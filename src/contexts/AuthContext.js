import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = api.getToken();
    if (token) {
      loadCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadCurrentUser = async () => {
    try {
      const response = await api.getCurrentUser();
      setCurrentUser(response.user);
    } catch (error) {
      console.error('Failed to load current user:', error);
      api.removeToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, role) => {
    try {
      const response = await api.login({ email, password, role });
      setCurrentUser(response.user);
      api.setToken(response.token);
      toast.success(response.message || 'წარმატებით შეხვედით!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'შესვლისას შეცდომა მოხდა');
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.register(userData);
      setCurrentUser(response.user);
      api.setToken(response.token);
      toast.success(response.message || 'ანგარიში წარმატებით შეიქმნა!');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message.includes('already exists')) {
        toast.error('მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს');
      } else {
        toast.error(error.message || 'რეგისტრაციისას შეცდომა მოხდა');
      }
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    api.removeToken();
    toast.success('წარმატებით გამოხვედით');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 