import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react'
import { authAPI } from '../../services/api'
import { useAuthStore } from '../../store/authStore'

function Register() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'Student'
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
      const response = await authAPI.register(formData)
      
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
        navigate('/dashboard')
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg py-12 px-4 sm:px-6 lg:px-8 animate-fade-in pt-24">
      <div className="max-w-md w-full glass-effect rounded-xl shadow-2xl p-8 animate-slide-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 animate-bounce-slow">
            <Sparkles size={64} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Join our learning community</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <UserIcon size={16} />
                <span>First Name</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="input-field"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <UserIcon size={16} />
                <span>Last Name</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="input-field"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

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
              placeholder="john@example.com"
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
              minLength="6"
              className="input-field"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              I want to join as
            </label>
            <select
              id="role"
              name="role"
              className="input-field"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

