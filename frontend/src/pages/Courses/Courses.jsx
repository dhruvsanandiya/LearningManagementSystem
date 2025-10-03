import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, User, FileText, Folder, DollarSign } from 'lucide-react'
import { courseAPI } from '../../services/api'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAll()
      if (response.data.success) {
        setCourses(response.data.data)
      }
    } catch (err) {
      setError('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (level) => {
    const colors = {
      0: 'bg-green-100 text-green-800',
      1: 'bg-yellow-100 text-yellow-800',
      2: 'bg-orange-100 text-orange-800',
      3: 'bg-red-100 text-red-800'
    }
    return colors[level] || colors[0]
  }

  const getDifficultyText = (level) => {
    const texts = {
      0: 'Beginner',
      1: 'Intermediate',
      2: 'Advanced',
      3: 'Expert'
    }
    return texts[level] || 'Beginner'
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading courses...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
          <BookOpen size={40} className="text-primary-600 dark:text-primary-400" />
          <span>Explore Courses</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Discover our wide range of courses taught by expert instructors</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg animate-fade-in">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Link 
            key={course.id} 
            to={`/courses/${course.id}`} 
            className="card overflow-hidden group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center overflow-hidden">
              {course.thumbnailUrl ? (
                <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <BookOpen size={64} className="text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficultyLevel)}`}>
                  {getDifficultyText(course.difficultyLevel)}
                </span>
                <span className="flex items-center gap-1 text-primary-600 font-bold text-lg">
                  {course.price === 0 ? (
                    <span>Free</span>
                  ) : (
                    <>
                      <DollarSign size={16} />
                      <span>{course.price}</span>
                    </>
                  )}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <User size={14} />
                  <span>{course.teacherName}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <FileText size={14} />
                  <span>{course.totalLessons} lessons</span>
                </span>
              </div>
              
              {course.categoryName && (
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Folder size={14} />
                  <span>{course.categoryName}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {courses.length === 0 && !loading && (
        <div className="text-center py-12 animate-fade-in">
          <div className="flex justify-center mb-4 animate-bounce-slow">
            <BookOpen size={80} className="text-gray-400 dark:text-gray-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">No courses available at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default Courses

