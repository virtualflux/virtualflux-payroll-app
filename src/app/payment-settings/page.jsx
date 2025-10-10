'use client'
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import SettingsSidebar from '@/components/ui/SettingsSidebar';
import Button from '@/components/ui/Button';

const PaymentSettingsPage = () => {
  const router = useRouter();
  const [salary, setSalary] = useState(false);
  const [housingFund, setHousingFund] = useState(false);
  const [pension, setPension] = useState(false);
  const [tax, setTax] = useState(false);

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

  return (
    <div className="flex min-h-screen bg-black">
      <SettingsSidebar activeItem="Payment Settings" />

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

        {/* Payment Section */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl text-black font-semibold mb-8">Payment</h2>
          
          <div className="space-y-6">
            {/* Salary */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-base font-medium text-black">Salary</h3>
                <p className="text-sm text-gray-600">Specify how you structure and manage salaries</p>
              </div>
              <ToggleSwitch checked={salary} onChange={setSalary} />
            </div>

            {/* National Housing Fund */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-base font-medium text-black">National Housing Fund</h3>
                <p className="text-sm text-gray-600">Specify compliance with National Housing Fund regulation</p>
              </div>
              <ToggleSwitch checked={housingFund} onChange={setHousingFund} />
            </div>

            {/* Pension */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-base font-medium text-black">Pension</h3>
                <p className="text-sm text-gray-600">Simplify pension management for your entire workforce</p>
              </div>
              <ToggleSwitch checked={pension} onChange={setPension} />
            </div>

            {/* Tax */}
            <div className="flex items-center justify-between pb-6">
              <div>
                <h3 className="text-base font-medium text-black">Tax</h3>
                <p className="text-sm text-gray-600">Explain expenses tax processing - no returns, no stress</p>
              </div>
              <ToggleSwitch checked={tax} onChange={setTax} />
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

export default PaymentSettingsPage;