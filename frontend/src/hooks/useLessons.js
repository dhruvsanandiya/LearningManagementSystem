import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lessonsAPI } from '../api/lessonsApi';
import { toast } from 'sonner';

export const useCourseLessons = (courseId) => {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: () => lessonsAPI.getCourseLessons(courseId),
    enabled: !!courseId,
  });
};

export const useLesson = (lessonId) => {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonsAPI.getLessonById(lessonId),
    enabled: !!lessonId,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, lessonData }) => 
      lessonsAPI.createLesson(courseId, lessonData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['lessons', variables.courseId]);
      toast.success('Lesson created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create lesson');
    },
  });
};

export const useMarkLessonComplete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId) => lessonsAPI.markLessonComplete(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries(['lessons']);
      queryClient.invalidateQueries(['course-progress']);
      toast.success('Lesson marked as complete!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to mark lesson complete');
    },
  });
};


