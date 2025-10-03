import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { courseAPI } from '../../services/api'

function CreateCourse() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    difficultyLevel: 0,
    price: 0,
    categoryId: 1,
    duration: 0,
    tags: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await courseAPI.create(formData)
      if (response.data.success) {
        navigate('/teacher/my-courses')
      }
    } catch (err) {
      setError('Failed to create course. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Create New Course</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            name="title"
            required
            className="input-field"
            value={formData.title}
            onChange={handleChange}
            placeholder="Introduction to Web Development"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows="4"
            className="input-field"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what students will learn in this course..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              name="difficultyLevel"
              className="input-field"
              value={formData.difficultyLevel}
              onChange={handleChange}
            >
              <option value="0">Beginner</option>
              <option value="1">Intermediate</option>
              <option value="2">Advanced</option>
              <option value="3">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              className="input-field"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (hours)
          </label>
          <input
            type="number"
            name="duration"
            min="0"
            className="input-field"
            value={formData.duration}
            onChange={handleChange}
            placeholder="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            className="input-field"
            value={formData.tags}
            onChange={handleChange}
            placeholder="web development, html, css, javascript"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail URL
          </label>
          <input
            type="url"
            name="thumbnailUrl"
            className="input-field"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-3 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Course'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary px-8 py-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCourse

