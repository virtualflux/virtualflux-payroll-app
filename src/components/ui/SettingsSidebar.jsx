'use client'
import React, { useState } from 'react';
import { 
  AiOutlineSetting, 
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BiShield, BiKey } from 'react-icons/bi';
import { MdOutlineIntegrationInstructions } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const SettingsSidebar = ({ activeItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const menuItems = [
    { icon: AiOutlineSetting, label: "Company Settings", href: "/company-settings" },
    { icon: MdOutlineIntegrationInstructions, label: "Integration", href: "/integration-settings" },
    { icon: BiShield, label: "Security", href: "/security-settings" },
    { icon: BiKey, label: "Privacy Settings", href: "/privacy-settings" },
    { icon: AiOutlineShoppingCart, label: "Payment Settings", href: "/payment-settings" },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine header title based on active item
  const headerTitle = activeItem === "Company Settings" ? "Company Settings" : "System Settings";

  return (
    <div className="fixed left-0 top-0 h-screen bg-black text-white w-64 z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-semibold">{headerTitle}</h2>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-black pl-10 pr-4 py-2 rounded-lg text-sm outline-none"
          />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        {filteredMenuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.href)}
            className={`flex items-center w-full px-6 py-3 transition-colors ${
              item.label === activeItem
                ? 'bg-white text-black' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="text-xl" />
            <span className="ml-4">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SettingsSidebar;