import apiClient from './client';

export const assignmentsAPI = {
  // Get assignments for a course
  getCourseAssignments: async (courseId) => {
    const response = await apiClient.get(`/courses/${courseId}/assignments`);
    return response.data;
  },

  // Get assignment by ID
  getAssignmentById: async (assignmentId) => {
    const response = await apiClient.get(`/assignments/${assignmentId}`);
    return response.data;
  },

  // Create assignment
  createAssignment: async (courseId, assignmentData) => {
    const response = await apiClient.post(`/courses/${courseId}/assignments`, assignmentData);
    return response.data;
  },

  // Update assignment
  updateAssignment: async (assignmentId, assignmentData) => {
    const response = await apiClient.put(`/assignments/${assignmentId}`, assignmentData);
    return response.data;
  },

  // Delete assignment
  deleteAssignment: async (assignmentId) => {
    const response = await apiClient.delete(`/assignments/${assignmentId}`);
    return response.data;
  },

  // Submit assignment
  submitAssignment: async (assignmentId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(`/assignments/${assignmentId}/submit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Grade submission
  gradeSubmission: async (submissionId, gradeData) => {
    const response = await apiClient.post(`/submissions/${submissionId}/grade`, gradeData);
    return response.data;
  },

  // Get submissions for assignment (Teacher)
  getAssignmentSubmissions: async (assignmentId) => {
    const response = await apiClient.get(`/assignments/${assignmentId}/submissions`);
    return response.data;
  },

  // Get student's submission
  getStudentSubmission: async (assignmentId) => {
    const response = await apiClient.get(`/assignments/${assignmentId}/my-submission`);
    return response.data;
  },
};