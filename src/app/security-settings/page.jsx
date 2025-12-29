'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import SettingsSidebar from '@/components/ui/SettingsSidebar';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import axiosClient from '@/components/axiosClient';
import toast from 'react-hot-toast';

const SecurityPage = () => {
  const router = useRouter();
  const [twoFactor, setTwoFactor] = useState(true);
  const [passwordExpiration, setPasswordExpiration] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [ipRestriction, setIpRestriction] = useState(true);
  const [timeoutDuration, setTimeoutDuration] = useState('15 minutes');

   const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? 'bg-black' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? 'transform translate-x-6' : ''
        }`}
      />
    </button>
  );

  const fetchSettings = async () => {
      try {
        const { data } = await axiosClient.get('/payroll/company/security/settings');

        const settings = data?.data;
  
        setTwoFactor(!!settings?.twoFA);
        setPasswordExpiration(!!settings?.passwordExpiration);
        setSessionTimeout(!!settings?.sessionTimeout);
        setIpRestriction(!!settings?.ipRestriction);
        setTimeoutDuration(!!settings?.sessionTimeoutDuration || '15 minutes');
      } catch (error) {
        toast.error('Failed to load payroll settings');
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
    
        try {
          const res =await axiosClient.patch('/payroll/company/security/settings', {
            twoFA: twoFactor,
            passwordExpiration,
            sessionTimeout,
            ipRestriction,
            sessionTimeoutDuration: timeoutDuration
          });
    
          await fetchSettings()
          toast.success('Payroll settings updated successfully');
        } catch (error) {
          console.log(error)
          const message =
            error.response?.data?.message ||
            'Failed to update payroll settings';
    
          toast.error(message);
        } finally {
          setIsSaving(false);
        }
      };

  return (
    <div className="flex min-h-screen bg-black">
      <SettingsSidebar activeItem="Security" />

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

        {/* Security Section */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl text-black font-semibold mb-8">Security</h2>
          
          <div className="space-y-6">
            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-base font-medium text-black">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Require 2FA for all users logins</p>
              </div>
              <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
            </div>

            {/* Password Expiration */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-base font-medium text-black">Password Expiration</h3>
                <p className="text-sm text-gray-600">Reset password change every 90 days</p>
              </div>
              <ToggleSwitch checked={passwordExpiration} onChange={setPasswordExpiration} />
            </div>

            {/* Session Timeout */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-base font-medium text-black">Session Timeout</h3>
                <p className="text-sm text-gray-600">Automatically log users after 30 minutes of inactivity</p>
              </div>
              <ToggleSwitch checked={sessionTimeout} onChange={setSessionTimeout} />
            </div>

            {/* IP Restriction */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-base font-medium text-black">IP Restriction</h3>
                <p className="text-sm text-gray-600">White access only from specific IP address</p>
              </div>
              <ToggleSwitch checked={ipRestriction} onChange={setIpRestriction} />
            </div>

            {/* Session Timeout Duration */}
            <div>
              <label className="block text-base font-medium text-black mb-2">
                Session Timeout Duration
              </label>
              <Select
                value={timeoutDuration}
                onChange={(e) => setTimeoutDuration(e.target.value)}
                placeholder="Select duration"
              >
                <option value="5 minutes">5 minutes</option>
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="flex items-center gap-2 bg-white text-black border border-gray-300 py-2 px-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100">
              <AiOutlineClose className="text-lg" />
              Cancel
            </button>
            
           <Button disabled={isSaving} onClick={handleSave}>
              {isSaving ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;