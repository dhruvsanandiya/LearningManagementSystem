import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { authAPI } from '../../services/api'
import { useAuthStore } from '../../store/authStore'

function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login(formData)
      
      if (response.data.success) {
        const { data } = response.data
        setAuth(
          {
            userId: data.userId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            roles: data.roles
          },
          data.token
        )
        // Clear any previous history
        window.history.replaceState(null, '', '/dashboard')
        navigate('/dashboard', { replace: true })
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg py-12 px-4 sm:px-6 lg:px-8 animate-fade-in pt-24">
      <div className="max-w-md w-full glass-effect rounded-xl shadow-2xl p-8 animate-slide-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 animate-bounce-slow">
            <Lock size={64} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Mail size={16} />
              <span>Email Address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Lock size={16} />
              <span>Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

