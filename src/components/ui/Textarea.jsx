'use client'
import React from "react"

const Textarea = ({type, className, register, rows, placeholder}) => {
  return (
    <textarea type={type} className={`w-full p-2 border-[1px] border-gray-300  rounded-md 
        text-sm flex ring-offset-white file:border-0 file:bg-transparent file:text-sm 
        file:font-medium placeholder:text-gray-500 focus:border-gray-200 focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed 
        disabled:opacity-50 ${className} resize-none`}
        {...register}
        rows={rows}
        placeholder={placeholder}
    />
  )
}

export default Textarea