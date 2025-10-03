import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { enrollmentAPI } from '../../services/api'
import { BookOpen, User, TrendingUp, Clock, Loader, Award } from 'lucide-react'

function MyCourses() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [filter, setFilter] = useState('all') // all, in-progress, completed

  useEffect(() => {
    fetchEnrolledCourses()
  }, [])

  const fetchEnrolledCourses = async () => {
    setLoading(true)
    try {
      const response = await enrollmentAPI.getMyEnrollments()
      if (response.data.success) {
        setEnrolledCourses(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = enrolledCourses.filter(enrollment => {
    if (filter === 'completed') return enrollment.isCompleted
    if (filter === 'in-progress') return !enrollment.isCompleted
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-4">
            <BookOpen size={40} className="text-primary-600 dark:text-primary-400" />
            <span>My Enrolled Courses</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Track your learning progress and continue where you left off</p>
        </div>

        {/* Stats */}
        {!loading && enrolledCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {enrolledCourses.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total Enrolled</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {enrolledCourses.filter(e => e.isCompleted).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {enrolledCourses.filter(e => !e.isCompleted).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        {!loading && enrolledCourses.length > 0 && (
          <div className="flex gap-2 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'in-progress'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'completed'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-primary-600" size={64} />
          </div>
        ) : filteredCourses.length > 0 ? (
          /* Course Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((enrollment, index) => {
              const course = enrollment.course
              const progress = Math.round(enrollment.progress || 0)
              const totalLessons = course?.totalLessons || 0
              const completedLessons = Math.round((totalLessons * progress) / 100)

              return (
                <div
                  key={enrollment.id}
                  className="card overflow-hidden hover:shadow-2xl transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  {/* Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
                    {course?.thumbnailUrl ? (
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen size={64} className="text-white group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    )}
                    {enrollment.isCompleted && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                        <Award size={16} />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {course?.title || 'Course Title'}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2 text-sm">
                      <User size={14} />
                      <span>{course?.teacherName || 'Instructor'}</span>
                    </p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
                        <span className="font-bold text-primary-600 dark:text-primary-400">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {completedLessons} / {totalLessons} lessons
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => navigate(`/courses/${course?.id}`)}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      {enrollment.isCompleted ? (
                        <>
                          <Award size={18} />
                          <span>Review Course</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp size={18} />
                          <span>Continue Learning</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="card p-12 text-center animate-fade-in">
            <BookOpen size={80} className="mx-auto text-gray-400 dark:text-gray-600 mb-6 animate-bounce-slow" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {filter === 'all' ? 'No Enrolled Courses Yet' : `No ${filter === 'completed' ? 'Completed' : 'In Progress'} Courses`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Start your learning journey by enrolling in courses that interest you'
                : `You don't have any ${filter === 'completed' ? 'completed' : 'in progress'} courses yet`
              }
            </p>
            {filter === 'all' ? (
              <button
                onClick={() => navigate('/courses')}
                className="btn-primary inline-flex items-center gap-2"
              >
                <BookOpen size={18} />
                <span>Browse Courses</span>
              </button>
            ) : (
              <button
                onClick={() => setFilter('all')}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <span>View All Courses</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses

