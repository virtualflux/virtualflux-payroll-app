'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaBuilding, FaIndustry, FaUsers, FaGlobe, FaMapMarkerAlt, FaHome, FaUpload, FaArrowLeft, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'

const SignupPage = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    country: '',
    state: '',
    localGovernment: '',
    companyAddress: '',
    logo: null,
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPassword: '',
    verificationCode: ['', '', '', '', '', '', '']
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [errors, setErrors] = useState({})

  const steps = [
    { number: 1, title: "Company's account", active: true },
    { number: 2, title: "Admin's account", active: false },
    { number: 3, title: "Email verification", active: false },
    { number: 4, title: "2FA setup", active: false },
    { number: 5, title: "Zoho sync", active: false },
    { number: 6, title: "Complete", active: false }
  ]

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Construction',
    'Transportation',
    'Food & Beverage',
    'Real Estate'
  ]

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ]

  const countries = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'Egypt'
  ]

  const states = [
    'Lagos',
    'Abuja',
    'Kano',
    'Rivers',
    'Oyo',
    'Delta',
    'Kaduna',
    'Ogun',
    'Cross River',
    'Bayelsa'
  ]

  const localGovernments = [
    'Ikeja 1',
    'Ikeja 2',
    'Victoria Island',
    'Ikoyi',
    'Surulere',
    'Yaba',
    'Mushin',
    'Alimosho',
    'Agege',
    'Kosofe'
  ]

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

  const handleSelectChange = (name) => (e) => {
    const value = e.target.value
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

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }))
    }
  }

  const handleVerificationCodeChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return
    
    const newCode = [...formData.verificationCode]
    newCode[index] = value
    
    setFormData(prev => ({
      ...prev,
      verificationCode: newCode
    }))
    
    // Auto-focus next input
    if (value && index < 6) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleVerificationKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !formData.verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      // Clear verification code
      setFormData(prev => ({
        ...prev,
        verificationCode: ['', '', '', '', '', '', '']
      }))
    }, 2000)
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.industry) newErrors.industry = 'Industry is required'
    if (!formData.companySize) newErrors.companySize = 'Company size is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.localGovernment) newErrors.localGovernment = 'Local government is required'
    if (!formData.companyAddress.trim()) newErrors.companyAddress = 'Company address is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.adminFirstName.trim()) newErrors.adminFirstName = 'First name is required'
    if (!formData.adminLastName.trim()) newErrors.adminLastName = 'Last name is required'
    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Email is invalid'
    }
    if (!formData.adminPassword) {
      newErrors.adminPassword = 'Password is required'
    } else if (formData.adminPassword.length < 8) {
      newErrors.adminPassword = 'Password must contain uppercase, numbers and special characters and it must not be less than 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.adminPassword)) {
      newErrors.adminPassword = 'Password must contain uppercase, numbers and special characters and it must not be less than 8 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const code = formData.verificationCode.join('')
    return code.length === 7
  }

  const handleContinue = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4)
      console.log('Verification code:', formData.verificationCode.join(''))
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/login')
    }
  }

  const getStepStatus = (stepNumber) => {
    if (stepNumber === currentStep) return 'current'
    if (stepNumber < currentStep) return 'completed'
    return 'upcoming'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
          </button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Create Account</h1>
            <p className="text-gray-600">Set up your company's payroll account</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center min-w-0">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${getStepStatus(step.number) === 'current' 
                        ? 'bg-black text-white' 
                        : getStepStatus(step.number) === 'completed'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {step.number}
                    </div>
                    <span className="text-xs text-gray-600 mt-1 text-center whitespace-nowrap">
                      {step.title}
                    </span>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className={`
                      w-12 h-0.5 mx-2 mt-[-20px]
                      ${getStepStatus(step.number) === 'completed' 
                        ? 'bg-gray-800' 
                        : 'bg-gray-300'
                      }
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Fields - Left Side */}
              <div className="lg:col-span-2 space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    className={errors.companyName ? 'border-red-500' : ''}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                  )}
                </div>

                {/* Industry and Company Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Industry
                    </label>
                    <Select
                      name="industry"
                      value={formData.industry}
                      onChange={handleSelectChange('industry')}
                      placeholder="Select industry"
                      className={errors.industry ? 'border-red-500' : ''}
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </Select>
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Company Size
                    </label>
                    <Select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleSelectChange('companySize')}
                      placeholder="Select company size"
                      className={errors.companySize ? 'border-red-500' : ''}
                    >
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </Select>
                    {errors.companySize && (
                      <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>
                    )}
                  </div>
                </div>

                {/* Country and State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Country
                    </label>
                    <Select
                      name="country"
                      value={formData.country}
                      onChange={handleSelectChange('country')}
                      placeholder="Enter country"
                      className={errors.country ? 'border-red-500' : ''}
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      State
                    </label>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={handleSelectChange('state')}
                      placeholder="Enter state"
                      className={errors.state ? 'border-red-500' : ''}
                    >
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </Select>
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>

                {/* Local Government and Company Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Local Government
                    </label>
                    <Select
                      name="localGovernment"
                      value={formData.localGovernment}
                      onChange={handleSelectChange('localGovernment')}
                      placeholder="Enter local government"
                      className={errors.localGovernment ? 'border-red-500' : ''}
                    >
                      {localGovernments.map(lg => (
                        <option key={lg} value={lg}>{lg}</option>
                      ))}
                    </Select>
                    {errors.localGovernment && (
                      <p className="text-red-500 text-sm mt-1">{errors.localGovernment}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Company Address
                    </label>
                    <Input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      placeholder="Enter your company address"
                      className={errors.companyAddress ? 'border-red-500' : ''}
                    />
                    {errors.companyAddress && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyAddress}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Logo Upload - Right Side */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <label className="block text-sm font-medium text-black mb-4">
                    Upload Logo
                  </label>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <FaUpload className="mx-auto text-gray-400 text-2xl mb-4" />
                      <p className="text-sm text-gray-600">Upload Logo</p>
                      {formData.logo && (
                        <p className="text-xs text-green-600 mt-2">
                          {formData.logo.name}
                        </p>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleContinue}
                className="px-12 py-3 text-lg font-medium"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 - Admin Account */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Admin First Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Admin First Name
                </label>
                <Input
                  type="text"
                  name="adminFirstName"
                  value={formData.adminFirstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className={errors.adminFirstName ? 'border-red-500' : ''}
                />
                {errors.adminFirstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.adminFirstName}</p>
                )}
              </div>

              {/* Admin Last Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Admin Last Name
                </label>
                <Input
                  type="text"
                  name="adminLastName"
                  value={formData.adminLastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className={errors.adminLastName ? 'border-red-500' : ''}
                />
                {errors.adminLastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.adminLastName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={errors.adminEmail ? 'border-red-500' : ''}
                />
                {errors.adminEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.adminEmail}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="adminPassword"
                    value={formData.adminPassword}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className={`pr-10 ${errors.adminPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-4 w-4 text-gray-500" />
                    ) : (
                      <FaEye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.adminPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.adminPassword}</p>
                )}
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleContinue}
                className="px-12 py-3 text-lg font-medium"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {currentStep >= 3 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-black mb-4">
              Step {currentStep}: {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 mb-6">
              This step is coming soon...
            </p>
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-8 py-2"
              disabled={currentStep >= 6}
            >
              {currentStep >= 6 ? 'Completed' : 'Continue'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignupPage