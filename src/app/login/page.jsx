'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { HiOutlineSparkles } from 'react-icons/hi'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import loginbgimg from "@images/loginbgimg.png";

const LoginPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Dummy credentials
  const DUMMY_CREDENTIALS = {
    email: 'admin@virtualflux.com',
    password: 'admin123'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
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
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Check dummy credentials
      if (formData.email === DUMMY_CREDENTIALS.email && 
          formData.password === DUMMY_CREDENTIALS.password) {
        
        const userData = {
          email: formData.email,
          fullName: 'Admin User',
          isLoggedIn: true,
          loginDate: new Date().toISOString()
        }
        
        localStorage.setItem('user', JSON.stringify(userData))
        
        setIsLoading(false)
        router.push('/overview')
        
      } else {
        setIsLoading(false)
        setErrors({
          general: 'Invalid credentials. Try: admin@virtualflux.com / admin123'
        })
      }
    }, 1000)
  }

  const handleSignupRedirect = () => {
    router.push('/signup')
  }

  const handleForgotPassword = () => {
    alert('Forgot password feature coming soon!')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-3">Welcome Back</h1>
            <p className="text-gray-600 text-base">Please login below to continue</p>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Form with Border */}
          <div className="bg-white rounded-xl border-1 border-gray-500 p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User ID Input with Icon */}
              <div className="relative mt-10 mb-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-4 w-4 text-black" />
                </div>
                <Input
                  type="text"
                  name="email"
                  placeholder="User ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 h-12 bg-white rounded-sm border-thi ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-500'}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input with Icon */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-black" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 pr-10 h-12 bg-white rounded-sm ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-500'}`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4 text-black" />
                  ) : (
                    <FaEye className="h-4 w-4 text-black" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-black hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-medium rounded-sm"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>

              {/* Signup Link */}
              <div className="text-center pt-4">
                <span className="text-gray-600 text-sm">Don't have an account? </span>
                <button
                  type="button"
                  onClick={handleSignupRedirect}
                  className="text-black hover:underline text-sm font-semibold"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Virtual Flux Branding */}
      <div className="w-1/2 bg-gray-900 relative overflow-hidden flex items-center justify-center">
        {/* Background Image - Replace this with your image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: {loginbgimg}
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-12">
          {/* Virtual Flux Logo/Brand */}
          <div className="absolute top-8 right-8 flex items-center">
            {/* <div className="w-8 h-8 mr-3">
              <HiOutlineSparkles className="w-full h-full text-white" />
            </div> */}
            {/* <span className="text-white font-semibold text-sm tracking-wide">VIRTUAL FLUX</span> */}
          </div>

          {/* Welcome Text Box */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-white text-2xl font-bold mb-4">
              Welcome to Virtual Flux Admin
              <br />
              PayRoll Account
            </h2>
            <p className="text-white/80 text-base mb-8">
              Your Team, Your Payroll-Perfectly synced
            </p>
          </div>

          {/* Bottom Text */}
          <div className="mt-12">
            <p className="text-white/70 text-sm italic">
              Sign Up to get full access, Strictly for Admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage