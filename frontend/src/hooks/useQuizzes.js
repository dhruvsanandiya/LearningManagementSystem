import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quizzesAPI } from '../api/quizzesApi';
import { toast } from 'sonner';

export const useCourseQuizzes = (courseId) => {
  return useQuery({
    queryKey: ['quizzes', courseId],
    queryFn: () => quizzesAPI.getCourseQuizzes(courseId),
    enabled: !!courseId,
  });
};

export const useQuiz = (quizId) => {
  return useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => quizzesAPI.getQuizById(quizId),
    enabled: !!quizId,
  });
};

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, answers }) => 
      quizzesAPI.submitQuizAttempt(quizId, answers),
    onSuccess: () => {
      queryClient.invalidateQueries(['quiz-results']);
      queryClient.invalidateQueries(['course-progress']);
      toast.success('Quiz submitted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit quiz');
    },
  });
};


