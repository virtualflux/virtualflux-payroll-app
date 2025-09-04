'use client'

import Link from 'next/link'
import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { PiNotepad } from "react-icons/pi";

const EmptyBox = ({title, subTitle, link, linkTitle, className, children, onClick}) => {
  return (
    <div className={`w-full h-64 rounded-lg border border-gray-300 
    p-2 flex flex-col bg-white ${className}`}>
        {
            title && 
            <h1 className='w-full md:text-base text-sm text-black capitalize pb-2 
            border-b border-b-gray-300 font-semibold self-start text-start'>
                {title}
            </h1>
        }
        <div className='w-full h-full flex flex-col gap-4 items-center justify-center self-center relative'>
            <div className=''>
                <PiNotepad size={80} className='text-gray-400'/>
            </div>
            <div className=' flex flex-col items-center gap-4'>
                <span className='text-sm text-gray-400'>
                    No {subTitle}
                </span>
                {children}
                {
                    link &&
                    <Link href={link} onClick={onClick}
                    className='py-2 px-4 md:text-sm text-xs bg-catalineBlue 
                    text-white rounded-md flex items-center gap-2 transition-all 
                    duration-300 ease-in-out hover:bg-opacity-45'>
                        <FaPlus size={18}/> {linkTitle}
                    </Link>
                }
            </div>
        </div>
    </div>
  )
}

export default EmptyBox