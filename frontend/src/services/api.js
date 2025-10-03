import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const API_BASE_URL = 'https://localhost:7001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/Auth/register', data),
  login: (data) => api.post('/Auth/login', data)
}

// Course API
export const courseAPI = {
  getAll: () => api.get('/Courses'),
  getById: (id) => api.get(`/Courses/${id}`),
  create: (data) => api.post('/Courses', data),
  getMyCourses: () => api.get('/Courses/my-courses'),
  updateStatus: (id, status) => api.put(`/Courses/${id}/status?status=${status}`)
}

// Enrollment API
export const enrollmentAPI = {
  getMyEnrollments: () => api.get('/Enrollments/my-enrollments'),
  enroll: (courseId) => api.post(`/Enrollments/enroll/${courseId}`),
  getProgress: (enrollmentId) => api.get(`/Enrollments/${enrollmentId}/progress`),
  updateProgress: (enrollmentId, lessonId) => api.post(`/Enrollments/${enrollmentId}/lessons/${lessonId}/complete`)
}

// Certificate API
export const certificateAPI = {
  getMyCertificates: () => api.get('/Certificates/my-certificates'),
  download: (certificateId) => api.get(`/Certificates/${certificateId}/download`, { responseType: 'blob' })
}

// Assignment API
export const assignmentAPI = {
  getMyAssignments: () => api.get('/Assignments/my-assignments'),
  submit: (assignmentId, data) => api.post(`/Assignments/${assignmentId}/submit`, data)
}

// User API
export const userAPI = {
  getProfile: () => api.get('/User/profile'),
  updateProfile: (data) => api.put('/User/profile', data),
  getStats: () => api.get('/User/stats')
}

export default api

