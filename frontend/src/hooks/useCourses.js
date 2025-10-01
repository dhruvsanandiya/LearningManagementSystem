import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesAPI } from '../api/coursesApi';
import { toast } from 'sonner';

export const useCourses = (filters = {}) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => coursesAPI.getAllCourses(filters),
  });
};

export const useCourse = (courseId) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () => coursesAPI.getCourseById(courseId),
    enabled: !!courseId,
  });
};

export const useTeacherCourses = () => {
  return useQuery({
    queryKey: ['teacher-courses'],
    queryFn: () => coursesAPI.getTeacherCourses(),
  });
};

export const useEnrolledCourses = () => {
  return useQuery({
    queryKey: ['enrolled-courses'],
    queryFn: () => coursesAPI.getEnrolledCourses(),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData) => coursesAPI.createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      queryClient.invalidateQueries(['teacher-courses']);
      toast.success('Course created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create course');
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, courseData }) => 
      coursesAPI.updateCourse(courseId, courseData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['course', variables.courseId]);
      queryClient.invalidateQueries(['courses']);
      toast.success('Course updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update course');
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId) => coursesAPI.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      queryClient.invalidateQueries(['teacher-courses']);
      toast.success('Course deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete course');
    },
  });
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId) => coursesAPI.enrollInCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries(['enrolled-courses']);
      queryClient.invalidateQueries(['courses']);
      toast.success('Successfully enrolled in course!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to enroll in course');
    },
  });
};

export const useCourseProgress = (courseId) => {
  return useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: () => coursesAPI.getCourseProgress(courseId),
    enabled: !!courseId,
  });
};


