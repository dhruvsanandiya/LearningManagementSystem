import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/login', { replace: true })
    // Clear browser history to prevent back navigation
    window.history.pushState(null, '', '/login')
  }

  const handleSettings = () => {
    setIsOpen(false)
    navigate('/profile')
  }

  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return 'U'
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Profile menu"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-shadow">
          {getInitials()}
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-700 dark:text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 glass-effect rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up z-50">
          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg">
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
                <div className="flex gap-1 mt-1">
                  {user?.roles?.map((role) => (
                    <span 
                      key={role} 
                      className="text-xs px-2 py-0.5 rounded-full bg-primary-600 text-white"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleSettings}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
            >
              <Settings size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 font-medium">
                Profile Settings
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left group border-t border-gray-200 dark:border-gray-700"
            >
              <LogOut size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown


