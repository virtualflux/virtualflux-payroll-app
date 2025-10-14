"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBuilding,
  FaIndustry,
  FaUsers,
  FaGlobe,
  FaMapMarkerAlt,
  FaHome,
  FaUpload,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaQrcode,
  FaKey,
  FaCopy,
  FaCheck,
  FaCheckCircle,
  FaIdCard,
} from "react-icons/fa";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Image from "next/image";
import axiosClient from "../axiosClient";
import { useDispatch } from "react-redux";
import { createCompanySuccess } from "@/state/slices/user.slice";

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    country: "",
    state: "",
    localGovernment: "",
    companyAddress: "",
    logo: null,
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPassword: "",
    verificationCode: ["", "", "", "", "", "", ""],
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showManualSetup, setShowManualSetup] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("JBSWY3DPEIPL2OVO");
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [step4Phase, setStep4Phase] = useState("scan");
  const [twoFactorVerificationCode, setTwoFactorVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [zohoIntegrationEnabled, setZohoIntegrationEnabled] = useState(false);
  const [showZohoForm, setShowZohoForm] = useState(false);
  const [zohoCredentials, setZohoCredentials] = useState({
    domain: "",
    id: "",
    secret: "",
  });

  const steps = [
    { number: 1, title: "Company's account", active: true },
    { number: 2, title: "Admin's account", active: false },
    { number: 3, title: "Email verification", active: false },
    { number: 4, title: "2FA setup", active: false },
    { number: 5, title: "Zoho sync", active: false },
    { number: 6, title: "Complete", active: false },
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Construction",
    "Transportation",
    "Food & Beverage",
    "Real Estate",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "500+ employees",
  ];

  const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "Egypt"];

  const states = [
    "Lagos",
    "Abuja",
    "Kano",
    "Rivers",
    "Oyo",
    "Delta",
    "Kaduna",
    "Ogun",
    "Cross River",
    "Bayelsa",
  ];

  const localGovernments = [
    "Ikeja 1",
    "Ikeja 2",
    "Victoria Island",
    "Ikoyi",
    "Surulere",
    "Yaba",
    "Mushin",
    "Alimosho",
    "Agege",
    "Kosofe",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));
    }
  };

  const handleVerificationCodeChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...formData.verificationCode];
    newCode[index] = value;

    setFormData((prev) => ({
      ...prev,
      verificationCode: newCode,
    }));

    if (value && index < 6) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerificationKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !formData.verificationCode[index] &&
      index > 0
    ) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setFormData((prev) => ({
        ...prev,
        verificationCode: ["", "", "", "", "", "", ""],
      }));
    }, 2000);
  };

  const handle2FAVerificationChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...twoFactorVerificationCode];
    newCode[index] = value;

    setTwoFactorVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`twofa-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handle2FAVerificationKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !twoFactorVerificationCode[index] &&
      index > 0
    ) {
      const prevInput = document.getElementById(`twofa-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleScannedCode = () => {
    setStep4Phase("verify");
  };

  const handleVerifyTwoFactor = () => {
    setStep4Phase("success");
  };

  const handleGoBackToScan = () => {
    setStep4Phase("scan");
    setTwoFactorVerificationCode(["", "", "", "", "", ""]);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(twoFactorCode);
      setIsCodeCopied(true);
      setTimeout(() => setIsCodeCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleZohoCredentialsChange = (field) => (e) => {
    setZohoCredentials((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleEnableZohoSync = () => {
    if (zohoIntegrationEnabled) {
      setShowZohoForm(true);
    } else {
      setShowZohoForm(false);
      setZohoCredentials({
        domain: "",
        id: "",
        secret: "",
      });
    }
  };

  const validateZohoCredentials = () => {
    return (
      zohoCredentials.domain.trim() &&
      zohoCredentials.id.trim() &&
      zohoCredentials.secret.trim()
    );
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.companySize)
      newErrors.companySize = "Company size is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.localGovernment)
      newErrors.localGovernment = "Local government is required";
    if (!formData.companyAddress.trim())
      newErrors.companyAddress = "Company address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.adminFirstName.trim())
      newErrors.adminFirstName = "First name is required";
    if (!formData.adminLastName.trim())
      newErrors.adminLastName = "Last name is required";
    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = "Email is invalid";
    }
    if (!formData.adminPassword) {
      newErrors.adminPassword = "Password is required";
    } else if (formData.adminPassword.length < 8) {
      newErrors.adminPassword =
        "Password must contain uppercase, numbers and special characters and it must not be less than 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        formData.adminPassword
      )
    ) {
      newErrors.adminPassword =
        "Password must contain uppercase, numbers and special characters and it must not be less than 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const code = formData.verificationCode.join("");
    return code.length === 7;
  };

  const validate2FAVerification = () => {
    const code = twoFactorVerificationCode.join("");
    return code.length === 6;
  };

  const validateStep4 = () => {
    return step4Phase === "success";
  };

  const handleContinue = async () => {
    if (currentStep === 1 && validateStep1()) {
      setIsLoading(true);
      try {
        const response = await axiosClient.post(
          "/payroll/auth/create-company",
          {
            name: formData.companyName,
            industry: formData.industry,
            size: formData.companySize,
            country: formData.country,
            state: formData.state,
            lga: formData.localGovernment,
            address: formData.companyAddress,
          }
        );

        dispatch(
          createCompanySuccess({
            accessToken: response.data.data.accessToken,
          })
        );

        setCurrentStep(2);
      } catch (error) {
        console.error("Company registration error:", error);
        setErrors({
          general:
            error.response?.data?.message || "Failed to register company info",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 2 && validateStep2()) {
      setIsLoading(true);
      try {
        const response = await axiosClient.post("/payroll/auth/create-admin", {
          firstName: formData.adminFirstName,
          lastName: formData.adminLastName,
          email: formData.adminEmail,
          password: formData.adminPassword,
        });

        setCurrentStep(3);
      } catch (error) {
        console.error("Company admin error:", error);
        setErrors({
          general:
            error.response?.data?.message || "Failed to register company admin",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 3 && validateStep3()) {
      setIsLoading(true);
      try {
        const response = await axiosClient.post("/payroll/auth/verify-otp", {
          email: formData.adminEmail,
          otp: formData.verificationCode.join("")
        });

        setCurrentStep(4);
      } catch (error) {
        console.error("Verify email error:", error);
        setErrors({
          general:
            error.response?.data?.message || "Failed to verify email",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 4 && validateStep4()) {
      setCurrentStep(5);
      console.log("2FA setup completed");
    } else if (currentStep === 5) {
      setCurrentStep(6);
      console.log("Zoho sync:", zohoIntegrationEnabled ? "enabled" : "skipped");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/login");
    }
  };

  const getStepStatus = (stepNumber) => {
    if (stepNumber === currentStep) return "current";
    if (stepNumber < currentStep) return "completed";
    return "upcoming";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              {currentStep === 3
                ? "Enter a verification code sent to your email"
                : currentStep === 4
                ? "Setup two-factor authentication for extra security"
                : currentStep === 5
                ? "Setup two-factor authentication for extra security"
                : "Set up your company's payroll account"}
            </p>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center min-w-0">
                    <div
                      className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${
                        getStepStatus(step.number) === "current"
                          ? "bg-black text-white"
                          : getStepStatus(step.number) === "completed"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-300 text-gray-600"
                      }
                    `}
                    >
                      {step.number}
                    </div>
                    <span className="text-xs text-gray-600 mt-1 text-center whitespace-nowrap">
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`
                      w-12 h-0.5 mx-2 mt-[-20px]
                      ${
                        getStepStatus(step.number) === "completed"
                          ? "bg-gray-800"
                          : "bg-gray-300"
                      }
                    `}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{errors.general}</p>
          </div>
        )}

        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
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
                    className={errors.companyName ? "border-red-500" : ""}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Industry
                    </label>
                    <Select
                      name="industry"
                      value={formData.industry}
                      onChange={handleSelectChange("industry")}
                      placeholder="Select industry"
                      className={errors.industry ? "border-red-500" : ""}
                    >
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </Select>
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.industry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Company Size
                    </label>
                    <Select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleSelectChange("companySize")}
                      placeholder="Select company size"
                      className={errors.companySize ? "border-red-500" : ""}
                    >
                      {companySizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </Select>
                    {errors.companySize && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.companySize}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Country
                    </label>
                    <Select
                      name="country"
                      value={formData.country}
                      onChange={handleSelectChange("country")}
                      placeholder="Enter country"
                      className={errors.country ? "border-red-500" : ""}
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      State
                    </label>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={handleSelectChange("state")}
                      placeholder="Enter state"
                      className={errors.state ? "border-red-500" : ""}
                    >
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </Select>
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Local Government
                    </label>
                    <Select
                      name="localGovernment"
                      value={formData.localGovernment}
                      onChange={handleSelectChange("localGovernment")}
                      placeholder="Enter local government"
                      className={errors.localGovernment ? "border-red-500" : ""}
                    >
                      {localGovernments.map((lg) => (
                        <option key={lg} value={lg}>
                          {lg}
                        </option>
                      ))}
                    </Select>
                    {errors.localGovernment && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.localGovernment}
                      </p>
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
                      className={errors.companyAddress ? "border-red-500" : ""}
                    />
                    {errors.companyAddress && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.companyAddress}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleContinue}
                className="px-12 py-3 text-lg font-medium"
              >
                {isLoading ? "Loading..." : "Continue"}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto space-y-6">
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
                  className={errors.adminFirstName ? "border-red-500" : ""}
                />
                {errors.adminFirstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.adminFirstName}
                  </p>
                )}
              </div>

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
                  className={errors.adminLastName ? "border-red-500" : ""}
                />
                {errors.adminLastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.adminLastName}
                  </p>
                )}
              </div>

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
                  className={errors.adminEmail ? "border-red-500" : ""}
                />
                {errors.adminEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.adminEmail}
                  </p>
                )}
              </div>

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
                    className={`pr-10 ${
                      errors.adminPassword ? "border-red-500" : ""
                    }`}
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.adminPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleContinue}
                className="px-12 py-3 text-lg font-medium"
              >
                {isLoading ? "Loading..." : "Continue"}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-lg mb-4">
                  <FaEnvelope className="text-white text-2xl" />
                </div>

                <h2 className="text-xl font-semibold text-black mb-2">
                  Verify Your Email Address
                </h2>

                <p className="text-gray-600 text-sm mb-2">
                  We've sent a verification code to{" "}
                  <span className="font-semibold text-black">
                    {formData.adminEmail}
                  </span>
                </p>
                <p className="text-gray-600 text-sm">
                  Please check your inbox and enter the code below:
                </p>
              </div>

              <div className="flex justify-center gap-3 mb-6">
                {formData.verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleVerificationCodeChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md 
                             focus:border-black outline-none transition-colors bg-gray-50 text-black"
                  />
                ))}
              </div>

              <div className="mb-8">
                <span className="text-gray-600 text-sm">
                  Didn't receive the email?{" "}
                </span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-black hover:underline text-sm font-semibold disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!validateStep3()}
                className={`px-12 py-3 text-lg font-medium ${
                  validateStep3() ? "bg-black" : "bg-gray-400"
                }`}
              >
                {isLoading ? "Verifying Email..." : "Verify Email"}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto text-center">
              {step4Phase === "scan" && (
                <>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-black mb-2">
                      Scan the QR Code
                    </h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Step 1: Open your authenticator app and scan this QR code
                    </p>

                    <div className="inline-block mb-6">
                      <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-40 h-40 bg-black relative">
                          <div className="absolute inset-2 bg-white"></div>
                          <div className="absolute top-2 left-2 w-8 h-8 bg-black"></div>
                          <div className="absolute top-2 right-2 w-8 h-8 bg-black"></div>
                          <div className="absolute bottom-2 left-2 w-8 h-8 bg-black"></div>
                          <div className="absolute top-4 left-4 w-4 h-4 bg-white"></div>
                          <div className="absolute top-4 right-4 w-4 h-4 bg-white"></div>
                          <div className="absolute bottom-4 left-4 w-4 h-4 bg-white"></div>
                          <div className="absolute top-12 left-8 w-2 h-2 bg-black"></div>
                          <div className="absolute top-16 left-6 w-2 h-2 bg-black"></div>
                          <div className="absolute top-20 left-12 w-2 h-2 bg-black"></div>
                          <div className="absolute top-14 right-8 w-2 h-2 bg-black"></div>
                          <div className="absolute top-18 right-6 w-2 h-2 bg-black"></div>
                          <div className="absolute top-22 right-10 w-2 h-2 bg-black"></div>
                          <div className="absolute bottom-12 left-10 w-2 h-2 bg-black"></div>
                          <div className="absolute bottom-16 left-14 w-2 h-2 bg-black"></div>
                          <div className="absolute top-28 left-16 w-2 h-2 bg-black"></div>
                          <div className="absolute top-24 left-20 w-2 h-2 bg-black"></div>
                          <div className="absolute top-32 right-12 w-2 h-2 bg-black"></div>
                          <div className="absolute bottom-20 right-16 w-2 h-2 bg-black"></div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className="text-gray-600 text-sm">
                        Don't have a QR scanner?{" "}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowManualSetup(!showManualSetup)}
                        className="text-black hover:underline text-sm font-semibold"
                      >
                        Enter code manually
                      </button>
                    </div>
                  </div>

                  {showManualSetup && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-center mb-4">
                        <FaKey className="text-black text-lg mr-2" />
                        <h3 className="text-lg font-semibold text-black">
                          Manual setup
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">
                        If you can't scan the QR code, enter this key manually
                        in your authenticator app
                      </p>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex-1 max-w-sm">
                          <Input
                            type="text"
                            value={twoFactorCode}
                            readOnly
                            className="text-center font-mono bg-white"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyCode}
                          className="p-2 text-gray-500 hover:text-black transition-colors"
                          title="Copy code"
                        >
                          <FaCopy className="text-lg" />
                        </button>
                      </div>

                      {isCodeCopied && (
                        <p className="text-green-600 text-sm">
                          Code copied to clipboard!
                        </p>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={handleScannedCode}
                    className="px-12 py-3 text-lg font-medium"
                  >
                    I've scanned the code
                  </Button>
                </>
              )}

              {step4Phase === "verify" && (
                <>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-black mb-2">
                      Enter Verification Code
                    </h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Enter the 6 digits from your authenticator app
                    </p>

                    <div className="flex justify-center gap-3 mb-6">
                      {twoFactorVerificationCode.map((digit, index) => (
                        <input
                          key={index}
                          id={`twofa-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handle2FAVerificationChange(index, e.target.value)
                          }
                          onKeyDown={(e) =>
                            handle2FAVerificationKeyDown(index, e)
                          }
                          className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md 
                                   focus:border-black outline-none transition-colors bg-gray-50 text-black"
                        />
                      ))}
                    </div>

                    <div className="mb-8">
                      <span className="text-gray-600 text-sm">
                        Having trouble?{" "}
                      </span>
                      <button
                        type="button"
                        onClick={handleGoBackToScan}
                        className="text-black hover:underline text-sm font-semibold"
                      >
                        Go back to scan the QR code again
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleVerifyTwoFactor}
                    disabled={!validate2FAVerification()}
                    className={`px-12 py-3 text-lg font-medium ${
                      validate2FAVerification() ? "bg-black" : "bg-gray-400"
                    }`}
                  >
                    Verify Code
                  </Button>
                </>
              )}

              {step4Phase === "success" && (
                <>
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                      <FaCheck className="text-white text-2xl" />
                    </div>

                    <h2 className="text-xl font-semibold text-black mb-4">
                      Two-Factor Authenticator Enabled!
                    </h2>

                    <p className="text-gray-600 text-sm mb-8">
                      Your AdminPayroll account has been set up successfully
                      with email verification
                      <br />
                      and two-factor authentication
                    </p>
                  </div>

                  <Button
                    onClick={handleContinue}
                    className="px-12 py-3 text-lg font-medium"
                  >
                    {isLoading ? "Syncing..." : "Sync with zoho"}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-black mb-2">
                  Connect with Zoho
                </h2>
                <p className="text-gray-600 text-sm">
                  Sync your existing Zoho account to import company data
                </p>
              </div>

              {!showZohoForm ? (
                <>
                  <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/images/zohoigimg.png"
                          alt="Zoho Integration"
                          className="w-15 h-15 object-contain"
                          width={50}
                          height={50}
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-black mb-1">
                          Zoho Integration
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Sync your Zoho people or Zoho books date
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-black text-lg flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          Import employee data automatically
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-black text-lg flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          Sync company structure and departments
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-black text-lg flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          Keep employee records updated
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-black text-lg flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          Streamline payroll processes
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-sm font-medium text-black">
                        Enable Zoho Integration
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setZohoIntegrationEnabled(!zohoIntegrationEnabled);
                          if (!zohoIntegrationEnabled) {
                            handleEnableZohoSync();
                          }
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          zohoIntegrationEnabled ? "bg-black" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            zohoIntegrationEnabled
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        if (zohoIntegrationEnabled) {
                          setShowZohoForm(true);
                        }
                      }}
                      className={`px-12 py-3 text-lg font-medium ${
                        zohoIntegrationEnabled ? "bg-black" : "bg-gray-400"
                      }`}
                      disabled={!zohoIntegrationEnabled}
                    >
                      Sync with zoho
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Zoho Credentials Form */}
                  <div className="space-y-6 mb-8">
                    {/* Zoho Domain */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Zoho Domain
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaGlobe className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input
                          type="text"
                          value={zohoCredentials.domain}
                          onChange={handleZohoCredentialsChange("domain")}
                          placeholder="Yourcompany.zoho.com"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Zoho ID */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Zoho ID
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaIdCard className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input
                          type="text"
                          value={zohoCredentials.id}
                          onChange={handleZohoCredentialsChange("id")}
                          placeholder="Enter your zoho ID"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Zoho Secret */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Zoho Secret
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-4 w-4 text-gray-500" />
                        </div>
                        <Input
                          type="text"
                          value={zohoCredentials.secret}
                          onChange={handleZohoCredentialsChange("secret")}
                          placeholder="Enter your zoho secret"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleContinue}
                      className={`px-12 py-3 text-lg font-medium ${
                        validateZohoCredentials() ? "bg-black" : "bg-gray-400"
                      }`}
                      disabled={!validateZohoCredentials()}
                    >
                      {isLoading ? "Syncing..." : "Sync with zoho"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto text-center">
              {/* Success Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                  <FaCheck className="text-white text-3xl" />
                </div>

                <h2 className="text-2xl font-bold text-black mb-3">
                  Account Create Successfully!
                </h2>

                <p className="text-gray-600 text-base mb-8">
                  Your AdminPayroll account has been sync with your Zoho
                  account.
                </p>
              </div>

              {/* Zoho Integration Status Card */}
              <div className="inline-flex items-center gap-4 border-2 border-gray-200 rounded-lg p-4 mb-8">
                <div className="w-12 h-12 border-2 border-gray-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/zohoigimg.png"
                    alt="Zoho Integration"
                    className="w-15 h-15 object-contain"
                    width={50}
                    height={50}
                  />
                </div>

                <div className="text-left">
                  <h3 className="text-base font-semibold text-black mb-1">
                    Zoho Integration
                  </h3>
                  <p className="text-green-600 text-sm font-medium">
                    Connected
                  </p>
                </div>
              </div>

              {/* Final Message */}
              <p className="text-gray-600 text-base mb-8">
                You can now access your dashboard and start managing your
                payroll.
              </p>

              {/* Go to Dashboard Button */}
              <Button
                onClick={() => router.push("/overview")}
                className="px-12 py-3 text-lg font-medium"
              >
                Go To Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
