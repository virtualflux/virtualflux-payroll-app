'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Input from './ui/Input'
import Button from './ui/Button'
import Modal from './ui/Modal'
import { FaEye, FaEyeSlash, FaTimes, FaCheck } from 'react-icons/fa'

const ChangePasswordModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Password validation checks
  const passwordChecks = {
    length: formData.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(formData.newPassword),
    lowercase: /[a-z]/.test(formData.newPassword),
    number: /\d/.test(formData.newPassword),
    special: /[@$!%*?&]/.test(formData.newPassword)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (!Object.values(passwordChecks).every(check => check)) {
      newErrors.newPassword = 'Password does not meet all requirements'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // TODO: Replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Password changed successfully', formData)
      
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setErrors({})
      setShowSuccess(true)
      
    } catch (error) {
      setErrors({ submit: 'Failed to change password. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setErrors({})
    setOpen(false)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    setOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {open && !showSuccess && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Side Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-[500px] bg-white shadow-2xl z-[1000] overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-black">Change Password</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Create a strong unique password to protect your account
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPasswords.current ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Enter current password"
                        className={`pr-10 ${errors.currentPassword ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.current ? (
                          <FaEyeSlash className="h-5 w-5 text-gray-500" />
                        ) : (
                          <FaEye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                        className={`pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.new ? (
                          <FaEyeSlash className="h-5 w-5 text-gray-500" />
                        ) : (
                          <FaEye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                    )}
                    {formData.newPassword && !Object.values(passwordChecks).every(check => check) && (
                      <p className="text-red-500 text-xs mt-1">Weak strength</p>
                    )}
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                        className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPasswords.confirm ? (
                          <FaEyeSlash className="h-5 w-5 text-gray-500" />
                        ) : (
                          <FaEye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-black mb-3">Password Requirements</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          passwordChecks.length ? 'bg-green-500' : 'bg-black'
                        }`}>
                          {passwordChecks.length && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <span className={`text-sm ${
                          passwordChecks.length ? 'text-green-600' : 'text-gray-700'
                        }`}>
                          At least eight characters long
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          passwordChecks.uppercase ? 'bg-green-500' : 'bg-black'
                        }`}>
                          {passwordChecks.uppercase && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <span className={`text-sm ${
                          passwordChecks.uppercase ? 'text-green-600' : 'text-gray-700'
                        }`}>
                          Contains uppercase letters
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          passwordChecks.lowercase ? 'bg-green-500' : 'bg-black'
                        }`}>
                          {passwordChecks.lowercase && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <span className={`text-sm ${
                          passwordChecks.lowercase ? 'text-green-600' : 'text-gray-700'
                        }`}>
                          Contains lowercase letter
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          passwordChecks.number ? 'bg-green-500' : 'bg-black'
                        }`}>
                          {passwordChecks.number && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <span className={`text-sm ${
                          passwordChecks.number ? 'text-green-600' : 'text-gray-700'
                        }`}>
                          Contains numbers
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          passwordChecks.special ? 'bg-green-500' : 'bg-black'
                        }`}>
                          {passwordChecks.special && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <span className={`text-sm ${
                          passwordChecks.special ? 'text-green-600' : 'text-gray-700'
                        }`}>
                          Contains special characters
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <p className="text-red-500 text-sm text-center">{errors.submit}</p>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-3 text-base font-medium"
                  >
                    {isLoading ? 'Changing Password...' : 'Change Password'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <Modal open={showSuccess} setOpen={setShowSuccess}>
        <div className="p-8 text-center relative">
          <button
            onClick={handleSuccessClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <FaCheck className="text-white text-3xl" />
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-xl font-semibold text-black mb-3">
            Password Changed Successfully!
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Your password has been updated. You will be redirected shortly.
          </p>

          {/* Done Button */}
          <Button
            onClick={handleSuccessClose}
            className="w-full py-3 text-base font-medium"
          >
            Done
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ChangePasswordModal