import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../api/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (credentials) => authAPI.login(credentials),
    onSuccess: (data) => {
      login(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      toast.success('Login successful!');
      
      const role = (data.user.role || '').toLowerCase();
      navigate(`/dashboard/${role || 'student'}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData) => authAPI.register(userData),
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      logout();
      navigate('/login');
      toast.success('Logged out successfully');
    },
    onError: () => {
      logout();
      navigate('/login');
    },
  });
};


