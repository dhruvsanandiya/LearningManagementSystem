import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { enrollmentAPI, certificateAPI, userAPI } from '../../services/api'
import { User, Mail, Calendar, Edit2, Save, X, BookOpen, Clock, TrendingUp, Loader } from 'lucide-react'

function Profile() {
  const { user, setAuth } = useAuthStore()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [certificates, setCertificates] = useState([])
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    totalCertificates: 0,
    completedCourses: 0
  })
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  })

  useEffect(() => {
    fetchProfileData()
  }, [])

  const fetchProfileData = async () => {
    setLoading(true)
    try {
      // Fetch enrollments
      const enrollmentsResponse = await enrollmentAPI.getMyEnrollments()
      if (enrollmentsResponse.data.success) {
        setEnrolledCourses(enrollmentsResponse.data.data)
        setStats(prev => ({ ...prev, totalEnrollments: enrollmentsResponse.data.data.length }))
      }

      // Fetch certificates
      const certificatesResponse = await certificateAPI.getMyCertificates()
      if (certificatesResponse.data.success) {
        setCertificates(certificatesResponse.data.data)
        setStats(prev => ({ ...prev, totalCertificates: certificatesResponse.data.data.length }))
      }

      // Fetch user stats if available
      try {
        const statsResponse = await userAPI.getStats()
        if (statsResponse.data.success) {
          setStats(prev => ({ ...prev, ...statsResponse.data.data }))
        }
      } catch (err) {
        // Stats endpoint might not exist yet, ignore error
        console.log('Stats not available')
      }
    } catch (error) {
      console.error('Error fetching profile data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const response = await userAPI.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName
      })

      if (response.data.success) {
        // Update auth store with new user data
        setAuth(
          {
            ...user,
            firstName: formData.firstName,
            lastName: formData.lastName
          },
          useAuthStore.getState().token
        )
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    })
    setIsEditing(false)
  }

  const getInitials = () => {
    return `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <User size={40} className="text-primary-600 dark:text-primary-400" />
            <span>My Profile</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account and view your progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 animate-slide-up">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-4xl shadow-lg mb-4">
                  {getInitials()}
                </div>
                
                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {user?.roles?.map((role) => (
                        <span 
                          key={role} 
                          className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold"
                        >
                          {role}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-primary flex items-center gap-2 w-full justify-center"
                    >
                      <Edit2 size={18} />
                      <span>Edit Profile</span>
                    </button>
                  </>
                ) : (
                  <div className="w-full space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="btn-primary flex items-center gap-2 flex-1 justify-center"
                      >
                        <Save size={18} />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-secondary flex items-center gap-2 flex-1 justify-center"
                      >
                        <X size={18} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {loading ? <Loader className="animate-spin mx-auto" size={24} /> : stats.totalEnrollments}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Enrolled Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {loading ? <Loader className="animate-spin mx-auto" size={24} /> : stats.totalCertificates}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Certificates</div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="card p-6 mt-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-primary-600 dark:text-primary-400" />
                <span>Account Info</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Account Status</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="card p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BookOpen size={24} className="text-primary-600 dark:text-primary-400" />
                <span>My Enrolled Courses</span>
              </h2>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader className="animate-spin text-primary-600" size={48} />
                </div>
              ) : enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {enrolledCourses.map((enrollment, index) => {
                    const course = enrollment.course
                    const progress = Math.round(enrollment.progress || 0)
                    const totalLessons = course?.lessons?.length || 0
                    const completedLessons = Math.round((totalLessons * progress) / 100)

                    return (
                      <div 
                        key={enrollment.id} 
                        className="card p-6 hover:shadow-xl transition-all duration-300 group animate-slide-up"
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Course Thumbnail */}
                          <div className="w-full md:w-48 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center overflow-hidden">
                            {course?.thumbnailUrl ? (
                              <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                              <BookOpen size={48} className="text-white" />
                            )}
                          </div>

                          {/* Course Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {course?.title || 'Course Title'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                              <User size={14} />
                              <span>{course?.teacherName || 'Instructor'}</span>
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                <span className="font-semibold text-primary-600 dark:text-primary-400">
                                  {progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <span>{completedLessons} of {totalLessons} lessons completed</span>
                                {enrollment.isCompleted && (
                                  <span className="text-green-600 font-semibold">✓ Completed</span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <button 
                                onClick={() => navigate(`/courses/${course?.id}`)}
                                className="btn-primary flex items-center gap-2"
                              >
                                <TrendingUp size={16} />
                                <span>{enrollment.isCompleted ? 'Review Course' : 'Resume Course'}</span>
                              </button>
                              <button 
                                onClick={() => navigate(`/courses/${course?.id}`)}
                                className="btn-secondary flex items-center gap-2"
                              >
                                <Clock size={16} />
                                <span>View Details</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <BookOpen size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4 animate-bounce-slow" />
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-2 font-semibold">
                    No Enrolled Courses Yet
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 mb-6">
                    Start your learning journey by enrolling in a course
                  </p>
                  <button 
                    onClick={() => navigate('/courses')}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <BookOpen size={18} />
                    <span>Browse Courses</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

