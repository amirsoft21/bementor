const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Set auth token in localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  }

  // Remove auth token from localStorage
  removeToken() {
    localStorage.removeItem('token');
  }

  // Get headers for API requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Make API request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async logout() {
    this.removeToken();
    return { success: true };
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Teacher endpoints
  async getTeachers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/teachers?${queryString}`);
  }

  async getTeacher(id) {
    return this.request(`/teachers/${id}`);
  }

  async getFeaturedTeachers() {
    return this.request('/teachers/featured');
  }

  async createTeacherProfile(profileData) {
    return this.request('/teachers', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  async updateTeacherProfile(id, profileData) {
    return this.request(`/teachers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Booking endpoints
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getUserBookings() {
    return this.request('/bookings');
  }

  // Message endpoints
  async getConversations() {
    return this.request('/messages/conversations');
  }

  async sendMessage(messageData) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  // Payment endpoints
  async createSubscription(subscriptionData) {
    return this.request('/payments/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async getUserSubscriptions() {
    return this.request('/payments/subscriptions');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService(); 