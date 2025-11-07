'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ExperimentLog } from '@/types/chemistry'

interface AuthContextType {
  isAuthenticated: boolean
  user: any
  experiments: ExperimentLog[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  syncExperiments: () => Promise<void>
  saveExperiment: (experiment: any) => Promise<void>
  deleteExperiment: (id: string) => Promise<void>
  getLocalExperiments: () => ExperimentLog[]
  clearLocalExperiments: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [experiments, setExperiments] = useState<ExperimentLog[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing session on mount and on focus
  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem('user-session')
      const sessionCookie = document.cookie.includes('user-session=true')
      
      if (sessionData && sessionCookie) {
        try {
          const userData = JSON.parse(sessionData)
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Invalid session data:', error)
          localStorage.removeItem('user-session')
        }
      }
    }
    
    // Check session on mount
    checkSession()
    
    // Check session when page becomes visible (handles back navigation)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkSession()
      }
    }
    
    // Check session when window gains focus
    const handleFocus = () => {
      checkSession()
    }
    
    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    
    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // Get experiments from localStorage
  const getLocalExperiments = (): ExperimentLog[] => {
    try {
      const saved = localStorage.getItem('savedExperiments')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Failed to get local experiments:', error)
      return []
    }
  }

  // Save experiment to localStorage
  const saveToLocalStorage = (experiment: ExperimentLog) => {
    try {
      const existing = getLocalExperiments()
      const updated = [experiment, ...existing.slice(0, 19)] // Keep only 20 most recent
      localStorage.setItem('savedExperiments', JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  // Clear localStorage experiments
  const clearLocalExperiments = () => {
    try {
      localStorage.removeItem('savedExperiments')
    } catch (error) {
      console.error('Failed to clear local experiments:', error)
    }
  }

  // Fetch experiments (localStorage only for now)
  const fetchExperiments = async () => {
    setExperiments(getLocalExperiments())
  }

  // Sync experiments (placeholder for future implementation)
  const syncExperiments = async () => {
    console.log('Sync experiments - not implemented yet')
  }

  // Save experiment (localStorage only for now)
  const saveExperiment = async (experimentData: any) => {
    const experiment: ExperimentLog = {
      userId: 'anonymous',
      experimentName: experimentData.name || `Experiment ${new Date().toLocaleString()}`,
      chemicals: experimentData.chemicals,
      reactionDetails: experimentData.reactionDetails,
      timestamp: new Date(),
    }

    // Save to localStorage
    saveToLocalStorage(experiment)
    
    // Update local state
    setExperiments(getLocalExperiments())
  }

  // Delete experiment (localStorage only for now)
  const deleteExperiment = async (id: string) => {
    // Handle local deletion
    const localExperiments = getLocalExperiments()
    const updated = localExperiments.filter((exp, index) => index.toString() !== id)
    localStorage.setItem('savedExperiments', JSON.stringify(updated))
    setExperiments(updated)
  }

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // For now, we'll simulate authentication
      // In a real app, this would call the API
      if (email && password) {
        const userData = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          loginTime: Date.now(),
        }
        
        // Store session with multiple methods for persistence
        localStorage.setItem('user-session', JSON.stringify(userData))
        sessionStorage.setItem('user-session', JSON.stringify(userData))
        
        // Set cookie with longer expiration (7 days)
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + 7)
        document.cookie = `user-session=true; path=/; expires=${expirationDate.toUTCString()}; SameSite=Lax`
        
        setUser(userData)
        setIsAuthenticated(true)
        
        // Prevent browser from caching login state
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', window.location.href)
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    // Clear all session storage
    localStorage.removeItem('user-session')
    sessionStorage.removeItem('user-session')
    
    // Clear cookies
    document.cookie = 'user-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax'
    
    // Clear state
    setUser(null)
    setIsAuthenticated(false)
    setExperiments([])
    
    // Clear browser history to prevent back navigation issues
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/')
    }
  }

  // Load experiments on mount and when authentication changes
  useEffect(() => {
    fetchExperiments()
  }, [isAuthenticated])

  const value = {
    isAuthenticated,
    user,
    experiments,
    isLoading,
    login,
    logout,
    syncExperiments,
    saveExperiment,
    deleteExperiment,
    getLocalExperiments,
    clearLocalExperiments,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}