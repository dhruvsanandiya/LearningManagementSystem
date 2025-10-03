import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (user, token) => set({
        user,
        token,
        isAuthenticated: true
      }),
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })
        // Clear all storage
        localStorage.removeItem('auth-storage')
        sessionStorage.clear()
        // Clear history state
        window.history.replaceState(null, '', '/login')
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)

