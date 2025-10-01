import axios from 'axios';
import useAuthStore from '../store/authStore';

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token?.accessToken) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { token, logout } = useAuthStore.getState();
        
        if (token?.refreshToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/refresh`,
            { refreshToken: token.refreshToken }
          );

          const { accessToken, refreshToken } = response.data;
          
          // Update tokens in store
          useAuthStore.setState({
            token: { accessToken, refreshToken }
          });

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Error handling utility
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return {
          message: data.message || 'Bad request. Please check your input.',
          status,
          data: data.errors || null,
        };
      case 401:
        return {
          message: 'Unauthorized. Please log in again.',
          status,
        };
      case 403:
        return {
          message: 'Access forbidden. You don\'t have permission to perform this action.',
          status,
        };
      case 404:
        return {
          message: 'Resource not found.',
          status,
        };
      case 422:
        return {
          message: data.message || 'Validation failed.',
          status,
          data: data.errors || null,
        };
      case 429:
        return {
          message: 'Too many requests. Please try again later.',
          status,
        };
      case 500:
        return {
          message: 'Internal server error. Please try again later.',
          status,
        };
      default:
        return {
          message: data.message || 'An unexpected error occurred.',
          status,
        };
    }
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error. Please check your connection and try again.',
      status: 0,
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred.',
      status: 0,
    };
  }
};

export default apiClient;

