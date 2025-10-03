import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <div className={`theme-toggle-slider ${isDarkMode ? 'dark' : ''}`}>
        {isDarkMode ? (
          <Moon size={14} className="text-gray-800" />
        ) : (
          <Sun size={14} className="text-yellow-500" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle

