import apiClient from './client';

export const usersAPI = {
  // Get all users (Admin)
  getAllUsers: async (params = {}) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  // Create user (Admin)
  createUser: async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (userId, userData) => {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  },

  // Get user statistics
  getUserStats: async (userId) => {
    const response = await apiClient.get(`/users/${userId}/stats`);
    return response.data;
  },
};