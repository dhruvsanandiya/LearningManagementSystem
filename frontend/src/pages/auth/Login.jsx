import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, BookOpen, Eye, EyeOff, Sparkles, Users, Award, Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import ThemeToggle from '../../components/common/ThemeToggle';
import useAuthStore from '../../store/authStore';
import apiClient, { handleApiError } from '../../api/client';
import { toast } from 'sonner';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login', data);
      
      const { user, accessToken, refreshToken } = response.data;
      
      // Store tokens and user data
      login(user, { accessToken, refreshToken });
      
      toast.success('Login successful!');
      
      // Redirect based on role
      const role = user.role.toLowerCase();
      if (role === 'admin') {
        navigate('/dashboard/admin');
      } else if (role === 'teacher') {
        navigate('/dashboard/teacher');
      } else if (role === 'student') {
        navigate('/dashboard/student');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      const apiError = handleApiError(error);
      toast.error(apiError.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Left side - Enhanced Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"></div>
        
        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col justify-between w-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <BookOpen className="w-12 h-12 text-white animate-bounce-gentle" />
                <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1 animate-pulse-soft" />
              </div>
              <span className="text-3xl font-bold text-white font-display">LMS Pro</span>
            </div>
            <ThemeToggle className="bg-white/20 hover:bg-white/30 text-white" />
          </div>
          
          {/* Main Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold font-display leading-tight">
                Welcome to the
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Future of Learning
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Empower your education journey with our comprehensive learning management system designed for modern learners.
              </p>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start space-x-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">Interactive Courses</h3>
                  <p className="text-blue-100 text-sm">Engage with dynamic content, multimedia lessons, and real-time collaboration</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">Track Your Progress</h3>
                  <p className="text-blue-100 text-sm">Monitor your learning journey with detailed analytics and personalized insights</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">Earn Certificates</h3>
                  <p className="text-blue-100 text-sm">Get recognized for your achievements with industry-standard certifications</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-blue-200 text-sm">
            © 2025 LMS Pro. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Enhanced Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200 to-secondary-200 dark:from-primary-800 dark:to-secondary-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-200 to-primary-200 dark:from-secondary-800 dark:to-primary-800 rounded-full blur-2xl opacity-20"></div>
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <BookOpen className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                <Sparkles className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1 animate-pulse-soft" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white font-display">LMS Pro</span>
            </div>
            <ThemeToggle />
          </div>

          {/* Desktop theme toggle */}
          <div className="hidden lg:flex justify-end mb-6">
            <ThemeToggle />
          </div>

          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display">
              Welcome back!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slide-up">
            {/* Email field */}
            <div className="space-y-2">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                error={errors.email?.message}
                required
                {...register('email')}
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  icon={Lock}
                  error={errors.password?.message}
                  required
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 transition-colors"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-base font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner w-5 h-5 mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">Or</span>
              </div>
            </div>

            {/* Demo accounts info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Demo Accounts</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="font-medium text-blue-800 dark:text-blue-200">Admin</span>
                  <span className="text-blue-600 dark:text-blue-300">admin@lms.com / admin123</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="font-medium text-blue-800 dark:text-blue-200">Teacher</span>
                  <span className="text-blue-600 dark:text-blue-300">teacher@lms.com / teacher123</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="font-medium text-blue-800 dark:text-blue-200">Student</span>
                  <span className="text-blue-600 dark:text-blue-300">student@lms.com / student123</span>
                </div>
              </div>
            </div>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

