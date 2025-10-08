'use client'
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import SettingsSidebar from '@/components/ui/SettingsSidebar';
import Button from '@/components/ui/Button';

const PrivacySettingsPage = () => {
  const router = useRouter();
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('');
  const [usagePolicyUrl, setUsagePolicyUrl] = useState('');

  const handleViewPolicy = (type) => {
    // Handle view policy action
    console.log(`View ${type} policy`);
  };

  return (
    <div className="flex min-h-screen bg-black">
      <SettingsSidebar activeItem="Privacy Settings" />

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

        {/* Privacy Section */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl text-black font-semibold mb-8">Privacy</h2>
          
          <div className="space-y-6">
            {/* Privacy Policy */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-black">Privacy Policy</h3>
                </div>
                <button
                  onClick={() => handleViewPolicy('privacy')}
                  className="bg-black text-white py-2 px-6 rounded-lg text-sm transition-all duration-300 ease-in-out hover:opacity-80"
                >
                  View
                </button>
              </div>
            </div>

            {/* Application Usage Policy */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-black">Application Usage Policy</h3>
                </div>
                <button
                  onClick={() => handleViewPolicy('usage')}
                  className="bg-black text-white py-2 px-6 rounded-lg text-sm transition-all duration-300 ease-in-out hover:opacity-80"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="flex items-center gap-2 bg-white text-black border border-gray-300 py-2 px-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100">
              Cancel
            </button>
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsPage;
