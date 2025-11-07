'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogIn, LogOut, Settings, BarChart3 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthButton() {
  const { isAuthenticated, user, experiments, syncExperiments, logout } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  if (!isAuthenticated) {
    return (
      <motion.button
        onClick={() => router.push('/auth/signin')}
        className="flex items-center space-x-1.5 sm:space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-blue-500/20 text-sm sm:text-base touch-manipulation"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogIn className="h-4 w-4" />
        <span>Sign In</span>
      </motion.button>
    )
  }

  return (
    <div className="relative z-50">
      <motion.button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-600 backdrop-blur-sm touch-manipulation"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name || 'User'}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-blue-500"
          />
        ) : (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-blue-400">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
          </div>
        )}
        <span className="hidden sm:inline text-sm font-semibold text-gray-900 dark:text-white">
          {user?.name || 'User'}
        </span>
      </motion.button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-3 w-72 sm:w-80 bg-white dark:bg-slate-800 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 z-[9999] overflow-hidden"
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
              <p className="font-bold text-lg text-gray-900 dark:text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>

            <div className="p-3">
              <div className="px-4 py-3 mb-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-1.5">
                  <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Your Statistics</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">
                  {experiments.length} {experiments.length === 1 ? 'experiment' : 'experiments'} saved
                </p>
              </div>

              <button
                onClick={() => {
                  syncExperiments()
                  setShowMenu(false)
                }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center space-x-3"
              >
                <Settings className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span>Sync Experiments</span>
              </button>

              <button
                onClick={() => {
                  logout()
                  setShowMenu(false)
                  router.push('/')
                }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center space-x-3 mt-1"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showMenu && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}