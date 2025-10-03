import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout/Layout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import Courses from './pages/Courses/Courses'
import CourseDetail from './pages/Courses/CourseDetail'
import Dashboard from './pages/Dashboard/Dashboard'
import MyCourses from './pages/MyCourses/MyCourses'
import CreateCourse from './pages/Teacher/CreateCourse'
import Profile from './pages/Profile/Profile'

function PrivateRoute({ children, roles }) {
  const { user, token } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    // Prevent back navigation after logout
    const handlePopState = () => {
      if (!token) {
        navigate('/login', { replace: true })
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [token, navigate])
  
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  
  if (roles && user?.roles && !roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          
          <Route path="dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          <Route path="my-courses" element={
            <PrivateRoute roles={['Student']}>
              <MyCourses />
            </PrivateRoute>
          } />
          
          <Route path="teacher/create-course" element={
            <PrivateRoute roles={['Teacher', 'Admin']}>
              <CreateCourse />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

