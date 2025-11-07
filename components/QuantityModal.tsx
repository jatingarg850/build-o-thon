'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Chemical } from '@/types/chemistry'
import { X, Plus, Minus, Beaker, Droplets, Package } from 'lucide-react'

interface QuantityModalProps {
  chemical: Chemical | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (chemical: Chemical, amount: number, unit: string) => void
}

export default function QuantityModal({ chemical, isOpen, onClose, onConfirm }: QuantityModalProps) {
  const [amount, setAmount] = useState(1)
  const [unit, setUnit] = useState('ml')

  // Update unit when chemical changes
  useEffect(() => {
    if (chemical) {
      setUnit(chemical.state === 'liquid' ? 'ml' : 'g')
      setAmount(chemical.state === 'liquid' ? 5 : 0.5)
      console.log('QuantityModal: Chemical changed to', chemical.name)
    }
  }, [chemical])

  if (!chemical || !isOpen) {
    return null
  }

  console.log('QuantityModal: Rendering for', chemical.name, 'isOpen:', isOpen)

  const handleConfirm = () => {
    console.log('Confirming chemical addition:', chemical.name, amount, unit)
    onConfirm(chemical, amount, unit)
    
    // Reset internal state
    setAmount(1)
    setUnit('ml')
    
    // Close modal
    onClose()
    
    // Force cleanup any stuck drag states
    setTimeout(() => {
      if ((window as any).forceCleanupDrag) {
        (window as any).forceCleanupDrag()
      }
      // Also remove any stuck CSS classes
      document.body.classList.remove('dragging')
      // Re-enable pointer events on chemical cards
      const chemicalCards = document.querySelectorAll('.chemical-card')
      chemicalCards.forEach(card => {
        (card as HTMLElement).style.pointerEvents = 'auto'
      })
    }, 100)
    
    console.log('Modal confirmed and closed')
  }

  const incrementAmount = () => {
    setAmount(prev => Math.min(prev + (unit === 'ml' ? 1 : 0.1), unit === 'ml' ? 50 : 10))
  }

  const decrementAmount = () => {
    setAmount(prev => Math.max(prev - (unit === 'ml' ? 1 : 0.1), 0.1))
  }

  const presetAmounts = unit === 'ml' ? [1, 2, 5, 10, 15, 20] : [0.1, 0.5, 1, 2, 5]

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl max-w-md w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Drag Handle (Mobile) */}
          <div className="sm:hidden flex justify-center mb-3">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center space-x-2.5 sm:space-x-3 flex-1 min-w-0">
              <div 
                className="p-2 sm:p-3 rounded-xl shadow-inner flex-shrink-0"
                style={{ backgroundColor: chemical.color }}
              >
                {chemical.state === 'liquid' ? (
                  <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                ) : (
                  <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                  Add {chemical.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Specify the amount to add
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose()
                // Force cleanup when modal is closed
                setTimeout(() => {
                  if ((window as any).forceCleanupDrag) {
                    (window as any).forceCleanupDrag()
                  }
                  document.body.classList.remove('dragging')
                }, 100)
              }}
              className="p-2 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0 ml-2 touch-manipulation"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Amount Input */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Amount
            </label>
            
            {/* Custom Amount Input */}
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <button
                onClick={decrementAmount}
                className="p-3 sm:p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors touch-manipulation active:scale-95"
              >
                <Minus className="h-4 w-4 sm:h-4 sm:w-4" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  className="w-full px-4 py-4 sm:py-3 text-center text-xl font-bold bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation"
                  step={unit === 'ml' ? 1 : 0.1}
                  min="0.1"
                  max={unit === 'ml' ? 50 : 10}
                />
                <span className="absolute right-3 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium text-base sm:text-base">
                  {unit}
                </span>
              </div>
              
              <button
                onClick={incrementAmount}
                className="p-3 sm:p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors touch-manipulation active:scale-95"
              >
                <Plus className="h-4 w-4 sm:h-4 sm:w-4" />
              </button>
            </div>

            {/* Preset Amounts */}
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`px-3 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation active:scale-95 ${
                    amount === preset
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {preset} {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Unit Selection */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Unit
            </label>
            <div className="grid grid-cols-2 gap-2">
              {chemical.state === 'liquid' ? (
                <>
                  <button
                    onClick={() => setUnit('ml')}
                    className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-colors touch-manipulation active:scale-95 ${
                      unit === 'ml'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="hidden sm:inline">Milliliters (ml)</span>
                    <span className="sm:hidden">ml</span>
                  </button>
                  <button
                    onClick={() => setUnit('drops')}
                    className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-colors touch-manipulation active:scale-95 ${
                      unit === 'drops'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Drops
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setUnit('g')}
                    className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-colors touch-manipulation active:scale-95 ${
                      unit === 'g'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="hidden sm:inline">Grams (g)</span>
                    <span className="sm:hidden">g</span>
                  </button>
                  <button
                    onClick={() => setUnit('mg')}
                    className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-colors touch-manipulation active:scale-95 ${
                      unit === 'mg'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="hidden sm:inline">Milligrams (mg)</span>
                    <span className="sm:hidden">mg</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 sm:space-x-3">
            <button
              onClick={() => {
                onClose()
                // Force cleanup when modal is cancelled
                setTimeout(() => {
                  if ((window as any).forceCleanupDrag) {
                    (window as any).forceCleanupDrag()
                  }
                  document.body.classList.remove('dragging')
                }, 100)
              }}
              className="flex-1 px-4 py-4 sm:py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors touch-manipulation active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-4 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 touch-manipulation active:scale-95"
            >
              <Beaker className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}