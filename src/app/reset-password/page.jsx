'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaArrowLeft, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { HiOutlineSparkles } from 'react-icons/hi'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import loginbgimg from "@images/loginbgimg.png";

const ResetPasswordPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [newPasswordData, setNewPasswordData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

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

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowVerification(true)
    }, 2000)
  }

  const handleVerificationInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    const code = verificationCode.join('')
    if (code.length !== 6) {
      setErrors({ verification: 'Please enter the complete 6-digit code' })
      return
    }
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setShowNewPassword(true)
    }, 2000)
  }

  const handleResendCode = () => {
    setVerificationCode(['', '', '', '', '', ''])
    alert('Verification code resent to your email!')
  }

  const handleNewPasswordChange = (e) => {
    const { name, value } = e.target
    setNewPasswordData(prev => ({
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

  const validateNewPassword = () => {
    const newErrors = {}
    if (!newPasswordData.password) {
      newErrors.password = 'Password is required'
    } else if (newPasswordData.password.length < 8) {
      newErrors.password = 'Password must contain uppercase, numbers and special characters and it must not be less than 8 characters'
    }
    if (!newPasswordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (newPasswordData.password !== newPasswordData.confirmPassword) {
      newErrors.confirmPassword = 'Password must contain uppercase, numbers and special characters and it must not be less than 8 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!validateNewPassword()) return
    setIsResetting(true)
    setTimeout(() => {
      setIsResetting(false)
      router.push('/login')
    }, 2000)
  }

  const handleBackToLogin = () => router.push('/login')
  const handleBackToReset = () => {
    setShowVerification(false)
    setVerificationCode(['', '', '', '', '', ''])
    setErrors({})
  }

  // New Password Screen
  if (showNewPassword) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - New Password Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            <button
              onClick={handleBackToLogin}
              className="flex items-center text-gray-600 hover:text-black transition-colors duration-200 mb-6"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm">Back to sign in</span>
            </button>

            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">Reset Your Password</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Follow these steps to securely reset your password and regain access to your account.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-500 p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="mt-8 sm:mt-10">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 text-black" />
                    </div>
                    <Input
                      type={showNewPass ? "text" : "password"}
                      name="password"
                      placeholder="Enter new password"
                      value={newPasswordData.password}
                      onChange={handleNewPasswordChange}
                      className={`pl-10 pr-10 h-12 bg-white rounded-sm ${
                        errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-500'
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                      onClick={() => setShowNewPass(!showNewPass)}
                    >
                      {showNewPass ? (
                        <FaEyeSlash className="h-4 w-4 text-black" />
                      ) : (
                        <FaEye className="h-4 w-4 text-black" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="mb-8 sm:mb-10">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 text-black" />
                    </div>
                    <Input
                      type={showConfirmPass ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      value={newPasswordData.confirmPassword}
                      onChange={handleNewPasswordChange}
                      className={`pl-10 pr-10 h-12 bg-white rounded-sm ${
                        errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-500'
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                    >
                      {showConfirmPass ? (
                        <FaEyeSlash className="h-4 w-4 text-black" />
                      ) : (
                        <FaEye className="h-4 w-4 text-black" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isResetting}
                  className="w-full h-12 text-base font-medium rounded-sm"
                >
                  {isResetting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Resetting Password...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Virtual Flux Branding */}
        <div className="w-full lg:w-1/2 bg-gray-900 relative overflow-hidden flex items-center justify-center min-h-[50vh] lg:min-h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${loginbgimg.src})`
            }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 sm:px-8 lg:px-12">
            <div className="absolute top-4 sm:top-8 right-4 sm:right-8 flex items-center">
              <span className="text-white font-semibold text-sm tracking-wide">VIRTUAL FLUX</span>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10">
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">
                Welcome to Virtual Flux Admin
                <br />
                PayRoll Account
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8">
                Your Team, Your Payroll-Perfectly synced
              </p>
            </div>

            <div className="mt-8 sm:mt-12">
              <p className="text-white/70 text-sm italic">
                Sign Up to get full access, Strictly for Admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Verification Screen
  if (showVerification) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Verification Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            <button
              onClick={handleBackToReset}
              className="flex items-center text-gray-600 hover:text-black transition-colors duration-200 mb-6"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm">Back to sign in</span>
            </button>

            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">Check Your Email</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                We've sent a 6-digit verification code to your email address.
              </p>
            </div>

            {errors.verification && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{errors.verification}</p>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-500 p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div className="mt-8 sm:mt-10 mb-8 sm:mb-10">
                  <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={verificationCode[index]}
                        onChange={(e) => handleVerificationInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-10 sm:w-12 h-10 sm:h-12 text-center text-base sm:text-lg font-semibold border-2 border-gray-300 rounded-md bg-white focus:border-black focus:outline-none transition-all duration-300 text-black"
                      />
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isVerifying || verificationCode.join('').length !== 6}
                  className="w-full h-12 text-base font-medium rounded-sm"
                >
                  {isVerifying ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying Code...
                    </div>
                  ) : (
                    'Verify Code'
                  )}
                </Button>

                <div className="text-center pt-4">
                  <span className="text-gray-600 text-sm">Didn't receive the code? </span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-black hover:underline text-sm font-semibold"
                  >
                    Resend code
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Virtual Flux Branding */}
        <div className="w-full lg:w-1/2 bg-gray-900 relative overflow-hidden flex items-center justify-center min-h-[50vh] lg:min-h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${loginbgimg.src})`
            }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 sm:px-8 lg:px-12">
            <div className="absolute top-4 sm:top-8 right-4 sm:right-8 flex items-center">
              <span className="text-white font-semibold text-sm tracking-wide">VIRTUAL FLUX</span>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10">
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">
                Welcome to Virtual Flux Admin
                <br />
                PayRoll Account
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8">
                Your Team, Your Payroll-Perfectly synced
              </p>
            </div>

            <div className="mt-8 sm:mt-12">
              <p className="text-white/70 text-sm italic">
                Sign Up to get full access, Strictly for Admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Initial Email Input Screen
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Reset Password Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <button
            onClick={handleBackToLogin}
            className="flex items-center text-gray-600 hover:text-black transition-colors duration-200 mb-6"
          >
            <FaArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm">Back to sign in</span>
          </button>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">Reset Your Password</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Follow these steps to securely reset your password and regain access to your account.
            </p>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-500 p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative mt-8 sm:mt-10 mb-8 sm:mb-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-4 w-4 text-black" />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 h-12 bg-white rounded-sm border-thi ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-medium rounded-sm"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Verification Code...
                  </div>
                ) : (
                  'Send Verification Code'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Virtual Flux Branding */}
      <div className="w-full lg:w-1/2 bg-gray-900 relative overflow-hidden flex items-center justify-center min-h-[50vh] lg:min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${loginbgimg.src})`
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-8 lg:px-12">
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8 flex items-center">
            <span className="text-white font-semibold text-sm tracking-wide">VIRTUAL FLUX</span>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10">
            <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">
              Welcome to Virtual Flux Admin
              <br />
              PayRoll Account
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8">
              Your Team, Your Payroll-Perfectly synced
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <p className="text-white/70 text-sm italic">
              Sign Up to get full access, Strictly for Admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage