'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlineUser, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai'
import SettingsSidebar from '@/components/ui/SettingsSidebar'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

const CompanySettingsPage = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    companyName: '',
    adminName: '',
    industry: '',
    companySize: '',
    country: '',
    state: '',
    localGovernment: '',
    companyAddress: '',
    email: '',
    phoneNumber: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex min-h-screen bg-black">
      <SettingsSidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Close (Back) Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-all"
          >
            <AiOutlineClose className="text-lg" />
          </button>
        </div>

        {/* Company Information Section */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl text-black font-semibold mb-8">Company Information</h2>
          
          {/* Profile Section */}
          <div className="flex items-center gap-6 mb-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                <AiOutlineUser className="text-4xl text-gray-400" />
              </div>
              <button className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors">
                <AiOutlineEdit className="text-sm" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black">Company Name</h3>
              <p className="text-gray-600 mt-1">Admin Name</p>
              <p className="text-gray-600">Email Address</p>
            </div>
          </div>

          {/* Company's Details */}
          <h3 className="text-xl font-semibold mb-6 text-black">Company's Details</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Company Name</label>
              <Input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Admin Name</label>
              <Input
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                placeholder="Enter admin name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Industry</label>
              <Select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Select industry"
              >
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Company Size</label>
              <Select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                placeholder="Select company size"
              >
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="500+ employees">500+ employees</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Country</label>
              <Input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">State</label>
              <Input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Local Government</label>
              <Input
                name="localGovernment"
                value={formData.localGovernment}
                onChange={handleChange}
                placeholder="Enter local government"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Company Address</label>
              <Input
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                placeholder="Enter company address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Phone Number</label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="flex items-center gap-2 bg-white text-black border border-gray-300 py-2 px-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100">
              <AiOutlineClose className="text-lg" />
              Cancel
            </button>
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanySettingsPage
