import React from 'react'
import { FiSearch } from 'react-icons/fi'

const SearchInput = ({...props}) => {
  return (
    <div className='w-[250px] h-[45px] rounded-md border-2 
        border-gray-200 flex items-center gap-2 p-3 bg-white'>
        <FiSearch size={20} className='text-gray-400'/>
        <input type="text" 
        className='w-full bg-transparent border-none 
        outline-none text-black text-sm'
        placeholder='Search'
        {...props}
        />
    </div>
  )
}

export default SearchInput