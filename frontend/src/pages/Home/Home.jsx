import { Link } from 'react-router-dom'
import { GraduationCap, Rocket, Sparkles, BookOpen, Target, Trophy, Users, Award, TrendingUp } from 'lucide-react'

function Home() {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 animate-fade-in">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 animate-bounce-slow">
            <GraduationCap size={80} className="mx-auto text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Transform Your Future with
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent"> Online Learning</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Access world-class courses from expert instructors. Learn at your own pace, earn certificates, and achieve your goals.
          </p>
          <div className="flex justify-center space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/courses" className="btn-primary px-8 py-3 text-lg shadow-2xl flex items-center gap-2">
              <Rocket size={20} />
              <span>Explore Courses</span>
            </Link>
            <Link to="/register" className="btn-secondary px-8 py-3 text-lg shadow-lg flex items-center gap-2">
              <Sparkles size={20} />
              <span>Get Started Free</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white animate-slide-up flex items-center justify-center gap-3">
            <Sparkles size={32} className="text-primary-600 dark:text-primary-400" />
            <span>Why Choose Our Platform?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-center mb-4">
                <BookOpen size={48} className="text-primary-600 dark:text-primary-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Expert Instructors</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn from industry professionals with years of experience in their fields.
              </p>
            </div>

            <div className="card p-8 text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-center mb-4">
                <Target size={48} className="text-primary-600 dark:text-primary-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interactive Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Engage with quizzes, assignments, and real-time discussions with peers.
              </p>
            </div>

            <div className="card p-8 text-center group animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-center mb-4">
                <Trophy size={48} className="text-primary-600 dark:text-primary-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Earn Certificates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get recognized for your achievements with industry-recognized certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gradient-bg text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-center mb-2">
                <Users size={48} className="text-primary-200" />
              </div>
              <div className="text-4xl font-bold mb-2 animate-pulse-slow">10,000+</div>
              <div className="text-primary-100">Active Students</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-center mb-2">
                <BookOpen size={48} className="text-primary-200" />
              </div>
              <div className="text-4xl font-bold mb-2 animate-pulse-slow">500+</div>
              <div className="text-primary-100">Quality Courses</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-center mb-2">
                <GraduationCap size={48} className="text-primary-200" />
              </div>
              <div className="text-4xl font-bold mb-2 animate-pulse-slow">200+</div>
              <div className="text-primary-100">Expert Instructors</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex justify-center mb-2">
                <Award size={48} className="text-primary-200" />
              </div>
              <div className="text-4xl font-bold mb-2 animate-pulse-slow">95%</div>
              <div className="text-primary-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto card p-12 animate-slide-up">
          <div className="flex justify-center mb-6 animate-bounce-slow">
            <TrendingUp size={64} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of students already learning on our platform. Start your journey today!
          </p>
          <Link to="/register" className="btn-primary px-12 py-4 text-lg shadow-2xl inline-flex items-center gap-2">
            <Target size={20} />
            <span>Sign Up Now</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

