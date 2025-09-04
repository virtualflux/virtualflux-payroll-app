'use client'

import React, { useState } from 'react';

const SearchableSelect = ({ options, placeholder, selectedOption, setSelectedOption}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setSearchQuery('');
    };

    const filteredOptions = options?.filter((option) =>
        option?.groupname?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className='w-full relative'>
        <div
            onClick={() => setIsOpen(!isOpen)}
            className='border border-gray-400 py-1.5 px-4 rounded-md 
            cursor-pointer bg-white'
        >
            {selectedOption ? selectedOption?.groupname : placeholder}
        </div>
        {isOpen && (
            <div
            className='absolute top-full left-0 right-0 border border-gray-400 
            rounded-md bg-white z-[1000] shadow-md overflow-hidden'
            >
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className='w-full text-xs text-black p-2 box-border
                border-b-2 border-b-gray-400'
            />
            <div className='max-h-[250px] overflow-y-auto'>
                {filteredOptions?.map((option, i) => (
                    <div
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        className='text-xs text-black p-2 cursor-pointer'
                    >
                        {option?.groupname}
                    </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default SearchableSelect;
