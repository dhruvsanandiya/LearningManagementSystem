import apiClient from './client';

export const quizzesAPI = {
  // Get quizzes for a course
  getCourseQuizzes: async (courseId) => {
    const response = await apiClient.get(`/courses/${courseId}/quizzes`);
    return response.data;
  },

  // Get quiz by ID
  getQuizById: async (quizId) => {
    const response = await apiClient.get(`/quizzes/${quizId}`);
    return response.data;
  },

  // Create quiz
  createQuiz: async (courseId, quizData) => {
    const response = await apiClient.post(`/courses/${courseId}/quizzes`, quizData);
    return response.data;
  },

  // Update quiz
  updateQuiz: async (quizId, quizData) => {
    const response = await apiClient.put(`/quizzes/${quizId}`, quizData);
    return response.data;
  },

  // Delete quiz
  deleteQuiz: async (quizId) => {
    const response = await apiClient.delete(`/quizzes/${quizId}`);
    return response.data;
  },

  // Submit quiz attempt
  submitQuizAttempt: async (quizId, answers) => {
    const response = await apiClient.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data;
  },

  // Get quiz results
  getQuizResults: async (quizId) => {
    const response = await apiClient.get(`/quizzes/${quizId}/results`);
    return response.data;
  },

  // Get student quiz attempts
  getStudentAttempts: async (quizId) => {
    const response = await apiClient.get(`/quizzes/${quizId}/attempts`);
    return response.data;
  },
};