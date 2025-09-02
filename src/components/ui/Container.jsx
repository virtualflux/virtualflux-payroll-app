'use client'

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Container = ({ children, title = "Overview" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex w-full relative bg-gray-50 min-h-screen">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`${sidebarOpen ? 'md:ml-64' : 'ml-0'} w-full transition-all duration-300`}>
        <TopBar title={title} onMenuClick={toggleSidebar} />
        <main className="w-full min-h-screen p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Container;