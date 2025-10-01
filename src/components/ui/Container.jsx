 'use client'

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ChangePasswordModal from '../ChangePasswordModal';

const Container = ({ children, title = "Overview" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Automatically close sidebar on mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex w-full relative bg-gray-50 min-h-screen">
      <Sidebar 
        isOpen={sidebarOpen} 
        onChangePasswordClick={() => setIsChangePasswordOpen(true)}
      />
      <div className={`w-full transition-all duration-300 ${sidebarOpen ? 'md:ml-64 ml-0' : 'ml-0'}`}>
        <TopBar title={title} onMenuClick={toggleSidebar} />
        <main className="w-full min-h-screen p-4 md:p-8 pt-20">
          {children}
        </main>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        open={isChangePasswordOpen}
        setOpen={setIsChangePasswordOpen}
      />
    </div>
  );
};

export default Container;