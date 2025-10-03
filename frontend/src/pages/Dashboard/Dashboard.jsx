import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { enrollmentAPI, certificateAPI, assignmentAPI } from '../../services/api'
import { BookOpen, FileText, Trophy, TrendingUp, User, Loader, Award, Clock } from 'lucide-react'

function Dashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    totalCertificates: 0,
    pendingAssignments: 0
  })
  const [recentCourses, setRecentCourses] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch enrollments
      const enrollmentsResponse = await enrollmentAPI.getMyEnrollments()
      if (enrollmentsResponse.data.success) {
        const enrollments = enrollmentsResponse.data.data
        setStats(prev => ({ ...prev, totalEnrollments: enrollments.length }))
        // Get 3 most recent courses
        setRecentCourses(enrollments.slice(0, 3))
      }

      // Fetch certificates
      const certificatesResponse = await certificateAPI.getMyCertificates()
      if (certificatesResponse.data.success) {
        setStats(prev => ({ ...prev, totalCertificates: certificatesResponse.data.data.length }))
      }

      // Fetch assignments
      try {
        const assignmentsResponse = await assignmentAPI.getMyAssignments()
        if (assignmentsResponse.data.success) {
          const pending = assignmentsResponse.data.data.filter(a => !a.grade).length
          setStats(prev => ({ ...prev, pendingAssignments: pending }))
        }
      } catch (err) {
        console.log('Assignments not available')
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white animate-slide-in flex items-center gap-3">
        <User size={40} className="text-primary-600 dark:text-primary-400" />
        <span>Welcome back, {user?.firstName}!</span>
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          onClick={() => navigate('/my-courses')}
          className="card p-6 group cursor-pointer animate-slide-up" 
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center justify-between mb-4">
            <BookOpen size={40} className="text-primary-600 dark:text-primary-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              {loading ? <Loader className="animate-spin" size={32} /> : stats.totalEnrollments}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            My Courses
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Enrolled courses</p>
        </div>

        <div className="card p-6 group cursor-pointer animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <FileText size={40} className="text-orange-600 dark:text-orange-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">
              {loading ? <Loader className="animate-spin" size={32} /> : stats.pendingAssignments}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            Assignments
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Pending submissions</p>
        </div>

        <div className="card p-6 group cursor-pointer animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <Trophy size={40} className="text-green-600 dark:text-green-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            <span className="text-4xl font-bold text-green-600 dark:text-green-400">
              {loading ? <Loader className="animate-spin" size={32} /> : stats.totalCertificates}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            Certificates
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Earned achievements</p>
        </div>
      </div>

      {/* Continue Learning */}
      {!loading && recentCourses.length > 0 && (
        <div className="card p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp size={24} className="text-primary-600 dark:text-primary-400" />
            <span>Continue Learning</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCourses.map((enrollment, index) => {
              const course = enrollment.course
              const progress = Math.round(enrollment.progress || 0)
              
              return (
                <div 
                  key={enrollment.id}
                  className="card overflow-hidden group cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  onClick={() => navigate(`/courses/${course?.id}`)}
                >
                  <div className="h-32 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center overflow-hidden relative">
                    {course?.thumbnailUrl ? (
                      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <BookOpen size={48} className="text-white group-hover:scale-110 transition-transform duration-300" />
                    )}
                    {enrollment.isCompleted && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Award size={12} />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {course?.title}
                    </h3>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button className="btn-primary w-full text-sm py-2 flex items-center justify-center gap-2">
                      <TrendingUp size={16} />
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && recentCourses.length === 0 && (
        <div className="card p-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <BookOpen size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4 animate-bounce-slow" />
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Start Your Learning Journey</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't enrolled in any courses yet. Explore our course catalog to get started!
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-primary-600" size={64} />
        </div>
      )}
    </div>
  )
}

export default Dashboard

