import { GraduationCap, BookOpen, Info, Mail, Phone, MapPin, Heart } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-12 border-t border-gray-800 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="flex items-center gap-2 text-xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              <GraduationCap size={24} className="text-primary-400" />
              <span>Learning Management System</span>
            </h3>
            <p className="text-gray-400 dark:text-gray-500">
              Empowering education through technology. Learn, grow, and achieve your goals.
            </p>
          </div>
          
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/courses" className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-primary-400 transition-all duration-200 hover:translate-x-2">
                  <BookOpen size={16} />
                  <span>Courses</span>
                </a>
              </li>
              <li>
                <a href="/about" className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-primary-400 transition-all duration-200 hover:translate-x-2">
                  <Info size={16} />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-primary-400 transition-all duration-200 hover:translate-x-2">
                  <Mail size={16} />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Mail size={16} />
                <span>info@lms.com</span>
              </li>
              <li className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Phone size={16} />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <MapPin size={16} />
                <span>123 Education St, Learning City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p className="flex items-center justify-center gap-2 hover:text-primary-400 transition-colors duration-200">
            <span>&copy; {new Date().getFullYear()} Learning Management System. All rights reserved. Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

