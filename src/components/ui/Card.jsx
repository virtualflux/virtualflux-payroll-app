'use client'

import React from 'react'

const Card = ({title, icon: Icon, number}) => {
  return (
    <div className='w-full p-3 flex flex-col gap-3 bg-white border 
    border-gray-300 rounded-lg'>
        <div className='w-full flex items-center justify-between
        pb-1 border-b border-b-gray-300'>
            <h3 className='md:text-sm text-xs text-gray-400'>
                {title}
            </h3>
            <Icon size={30} className="text-gray-500"/>
        </div>
        <div>
            <h1 className='md:text-xl text-lg font-bold'>
                {number}
            </h1>
        </div>
    </div>
  )
}

export default Card