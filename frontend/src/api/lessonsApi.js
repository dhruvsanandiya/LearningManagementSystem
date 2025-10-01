import apiClient from './client';

export const lessonsAPI = {
  // Get lessons for a course
  getCourseLessons: async (courseId) => {
    const response = await apiClient.get(`/courses/${courseId}/lessons`);
    return response.data;
  },

  // Get lesson by ID
  getLessonById: async (lessonId) => {
    const response = await apiClient.get(`/lessons/${lessonId}`);
    return response.data;
  },

  // Create lesson
  createLesson: async (courseId, lessonData) => {
    const response = await apiClient.post(`/courses/${courseId}/lessons`, lessonData);
    return response.data;
  },

  // Update lesson
  updateLesson: async (lessonId, lessonData) => {
    const response = await apiClient.put(`/lessons/${lessonId}`, lessonData);
    return response.data;
  },

  // Delete lesson
  deleteLesson: async (lessonId) => {
    const response = await apiClient.delete(`/lessons/${lessonId}`);
    return response.data;
  },

  // Mark lesson complete
  markLessonComplete: async (lessonId) => {
    const response = await apiClient.post(`/lessons/${lessonId}/complete`);
    return response.data;
  },
};