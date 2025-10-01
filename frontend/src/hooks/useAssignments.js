import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentsAPI } from '../api/assignmentsApi';
import { toast } from 'sonner';

export const useCourseAssignments = (courseId) => {
  return useQuery({
    queryKey: ['assignments', courseId],
    queryFn: () => assignmentsAPI.getCourseAssignments(courseId),
    enabled: !!courseId,
  });
};

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentId, file }) => 
      assignmentsAPI.submitAssignment(assignmentId, file),
    onSuccess: () => {
      queryClient.invalidateQueries(['assignments']);
      queryClient.invalidateQueries(['course-progress']);
      toast.success('Assignment submitted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit assignment');
    },
  });
};

export const useGradeSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ submissionId, gradeData }) => 
      assignmentsAPI.gradeSubmission(submissionId, gradeData),
    onSuccess: () => {
      queryClient.invalidateQueries(['submissions']);
      toast.success('Submission graded successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to grade submission');
    },
  });
};


