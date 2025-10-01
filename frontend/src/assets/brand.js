// Brand configuration and assets
export const brandConfig = {
  name: 'LMS Pro',
  tagline: 'Empowering Education Through Technology',
  description: 'A comprehensive learning management system designed for modern education',
  
  // Brand colors
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
  },
  
  // Typography
  fonts: {
    display: 'Poppins',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    secondary: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
    hero: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #a855f7 100%)',
    success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
  
  // Shadows
  shadows: {
    soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    large: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
    glow: '0 0 20px rgba(14, 165, 233, 0.15)',
    glowLarge: '0 0 40px rgba(14, 165, 233, 0.2)',
  },
  
  // Animations
  animations: {
    fadeIn: 'fadeIn 0.6s ease-out',
    slideUp: 'slideUp 0.4s ease-out',
    slideDown: 'slideDown 0.4s ease-out',
    scaleIn: 'scaleIn 0.3s ease-out',
    bounceGentle: 'bounceGentle 2s infinite',
    pulseSoft: 'pulseSoft 2s infinite',
  },
  
  // Spacing scale
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
};

// Feature highlights for marketing
export const features = [
  {
    icon: 'Zap',
    title: 'Interactive Courses',
    description: 'Engage with dynamic content, multimedia lessons, and real-time collaboration',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: 'Users',
    title: 'Track Your Progress',
    description: 'Monitor your learning journey with detailed analytics and personalized insights',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: 'Award',
    title: 'Earn Certificates',
    description: 'Get recognized for your achievements with industry-standard certifications',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    icon: 'BookOpen',
    title: 'Comprehensive Library',
    description: 'Access thousands of courses across multiple disciplines and skill levels',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    icon: 'MessageCircle',
    title: 'Community Learning',
    description: 'Connect with peers, instructors, and industry experts in discussion forums',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    icon: 'Smartphone',
    title: 'Mobile Learning',
    description: 'Learn anywhere, anytime with our responsive mobile-optimized platform',
    gradient: 'from-pink-400 to-rose-500',
  },
];

// Demo accounts
export const demoAccounts = [
  {
    role: 'Admin',
    email: 'admin@lms.com',
    password: 'admin123',
    description: 'Full system access and management capabilities',
    color: 'error',
  },
  {
    role: 'Teacher',
    email: 'teacher@lms.com',
    password: 'teacher123',
    description: 'Course creation and student management',
    color: 'warning',
  },
  {
    role: 'Student',
    email: 'student@lms.com',
    password: 'student123',
    description: 'Course enrollment and learning features',
    color: 'success',
  },
];

// Social proof and testimonials
export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    content: 'LMS Pro has transformed my learning experience. The interactive courses and progress tracking keep me motivated.',
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Professor of Mathematics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'As an instructor, I love how easy it is to create engaging content and track student progress.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Online Learning Coordinator',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'The platform\'s analytics and reporting features help us make data-driven decisions about our curriculum.',
    rating: 5,
  },
];

// Statistics for landing page
export const stats = [
  {
    number: '50K+',
    label: 'Active Students',
    description: 'Students learning on our platform',
  },
  {
    number: '1,200+',
    label: 'Courses Available',
    description: 'Comprehensive course library',
  },
  {
    number: '98%',
    label: 'Satisfaction Rate',
    description: 'Student satisfaction score',
  },
  {
    number: '24/7',
    label: 'Support Available',
    description: 'Round-the-clock assistance',
  },
];
