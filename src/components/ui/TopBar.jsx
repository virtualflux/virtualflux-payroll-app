'use client'

import { IoMenu } from "react-icons/io5";
import { AiOutlineBell, AiOutlineUser } from 'react-icons/ai';

const TopBar = ({ title = "Overview", onMenuClick }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden block p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <IoMenu size={25} className="text-black" />
        </button>
        {/* <h1 className="text-2xl font-semibold text-gray-900">{title}</h1> */}
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <AiOutlineBell size={24} className="text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <AiOutlineUser size={24} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;