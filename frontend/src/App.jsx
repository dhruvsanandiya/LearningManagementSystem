import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import StudentDashboard from './pages/student/Dashboard';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Add more routes here as needed */}
          </Routes>
          <Toaster 
            position="top-right" 
            richColors 
            toastOptions={{
              style: {
                background: 'var(--color-background)',
                color: 'var(--color-foreground)',
                border: '1px solid var(--color-border)',
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
