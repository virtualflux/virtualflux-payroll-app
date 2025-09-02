'use client'

import React, { useState } from 'react';

export const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

  return (
    <div className='w-full flex flex-col gap-4  overflow-x-auto'>
        <div className="flex items-center md:gap-4 gap-3 border-b border-gray-300 pb-2">
            {children.map((child, index) => (
                <div className='flex items-center gap-2'>
                    <button
                        type='button'
                        key={index}
                        className={`py-2 transition-colors duration-300
                            text-sm font-semibold capitalize ${
                        activeTab === index
                            ? 'border-b-2 border-main text-main'
                            : 'text-gray-500 hover:text-main'
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.title}
                    </button>
                    {child.props.addOns}
                </div>
            ))}
        </div>

        <div className="p-4">
            {children[activeTab]}
        </div>
    </div>
  );
};

export const Tab = ({ children }) => {
  return <>{children}</>;
};

