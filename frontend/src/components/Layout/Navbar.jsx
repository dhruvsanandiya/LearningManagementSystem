import { Link } from 'react-router-dom'
import { GraduationCap, Home, BookOpen, LayoutDashboard, Library, Plus, LogIn, UserPlus } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import ThemeToggle from '../ThemeToggle'
import ProfileDropdown from '../ProfileDropdown'

function Navbar() {
  const { user, token } = useAuthStore()

  return (
    <nav className="glass-effect fixed top-0 left-0 right-0 z-50 shadow-lg animate-slide-in">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300"
          >
            <GraduationCap className="text-primary-600 dark:text-primary-400" size={32} />
            <span>LMS</span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium hover:scale-110 transition-all duration-200"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/courses" 
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium hover:scale-110 transition-all duration-200"
            >
              <BookOpen size={18} />
              <span>Courses</span>
            </Link>
            {token && (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium hover:scale-110 transition-all duration-200"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                {user?.roles?.includes('Student') && (
                  <Link 
                    to="/my-courses" 
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium hover:scale-110 transition-all duration-200"
                  >
                    <Library size={18} />
                    <span>My Courses</span>
                  </Link>
                )}
                {(user?.roles?.includes('Teacher') || user?.roles?.includes('Admin')) && (
                  <Link 
                    to="/teacher/create-course" 
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium hover:scale-110 transition-all duration-200"
                  >
                    <Plus size={18} />
                    <span>Create Course</span>
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {token ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-secondary flex items-center gap-2">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="btn-primary flex items-center gap-2">
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

