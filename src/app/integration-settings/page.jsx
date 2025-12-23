"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import SettingsSidebar from "@/components/ui/SettingsSidebar";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { store } from "@/state/store";
import axiosClient from "@/components/axiosClient";
import toast from 'react-hot-toast';

const IntegrationSettingsPage = () => {
  const router = useRouter();

  const handleZohoSync = async () => {
    try {
      const state = store.getState();
      const token = state.user.accessToken;
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/payroll/auth/zoho-sync?token=${token}`;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Sync failed. Please try again.";
      
      toast.error(errorMessage);
    }
  }

  return (
    <div className="flex min-h-screen bg-black">
      <SettingsSidebar activeItem="Integration" />

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

        {/* Integration Section */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl text-black font-semibold mb-8">
            Integration
          </h2>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                    <Image
                      src="/images/zohoigimg.png"
                      alt="Zoho Integration"
                      className="w-15 h-15 object-contain"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    Zoho Integration
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sync your Zoho books or Zoho books data
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    Connected
                  </span>
                </div>
              </div>
              <button 
                onClick={handleZohoSync} 
                className="bg-white text-gray-500 border border-gray-500 hover:text-black hover:border-black hover:bg-gray-100 p-2 cursor-pointer rounded-md px-4"
              >
                Re-Configure
              </button>
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
  );
};

export default IntegrationSettingsPage;
