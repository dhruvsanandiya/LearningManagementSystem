import apiClient from './client';

export const coursesAPI = {
  // Get all courses (with filters)
  getAllCourses: async (params = {}) => {
    const response = await apiClient.get('/courses', { params });
    return response.data;
  },

  // Get course by ID
  getCourseById: async (courseId) => {
    const response = await apiClient.get(`/courses/${courseId}`);
    return response.data;
  },

  // Create course (Teacher/Admin)
  createCourse: async (courseData) => {
    const response = await apiClient.post('/courses', courseData);
    return response.data;
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    const response = await apiClient.put(`/courses/${courseId}`, courseData);
    return response.data;
  },

  // Delete course
  deleteCourse: async (courseId) => {
    const response = await apiClient.delete(`/courses/${courseId}`);
    return response.data;
  },

  // Get teacher's courses
  getTeacherCourses: async () => {
    const response = await apiClient.get('/courses/teacher/my-courses');
    return response.data;
  },

  // Get enrolled courses (Student)
  getEnrolledCourses: async () => {
    const response = await apiClient.get('/courses/student/enrolled');
    return response.data;
  },

  // Enroll in course
  enrollInCourse: async (courseId) => {
    const response = await apiClient.post(`/courses/${courseId}/enroll`);
    return response.data;
  },

  // Get course progress
  getCourseProgress: async (courseId) => {
    const response = await apiClient.get(`/courses/${courseId}/progress`);
    return response.data;
  },

  // Approve/Reject course (Admin)
  updateCourseStatus: async (courseId, status) => {
    const response = await apiClient.patch(`/courses/${courseId}/status`, { status });
    return response.data;
  },
};