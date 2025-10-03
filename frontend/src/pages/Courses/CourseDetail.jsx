import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { courseAPI } from '../../services/api'

function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourse()
  }, [id])

  const fetchCourse = async () => {
    try {
      const response = await courseAPI.getById(id)
      if (response.data.success) {
        setCourse(response.data.data)
      }
    } catch (err) {
      console.error('Failed to load course')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-12">Loading...</div>
  if (!course) return <div className="container mx-auto px-4 py-12">Course not found</div>

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-primary-100 mb-4">{course.description}</p>
          <div className="flex items-center space-x-6">
            <span>👤 {course.teacherName}</span>
            <span>📖 {course.totalLessons} lessons</span>
            <span>⏱️ {course.duration} hours</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-4">
              <div className="text-3xl font-bold text-primary-600 mb-4">
                ${course.price === 0 ? 'Free' : course.price}
              </div>
              <button className="w-full btn-primary py-3 mb-4">
                Enroll Now
              </button>
              <div className="border-t pt-4 space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold">{course.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Lessons</span>
                  <span className="font-semibold">{course.totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Students</span>
                  <span className="font-semibold">{course.totalEnrollments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail

