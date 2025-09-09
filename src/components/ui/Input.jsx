'use client'

import React from "react"

const Input = ({type, className, name, register, value, 
  placeholder, accept, readonly,onChange, disabled,defaultValue}) => {
  return (
    <input type={type} name={name}
    className={`w-full h-10 p-2 border-2 border-gray-300 rounded-md bg-gray-50 
        text-sm flex ring-offset-white file:border-0 file:bg-transparent file:text-sm 
        file:font-medium placeholder:text-gray-300 transition-all duration-300 ease-in-out 
        focus:border-2 focus:border-black outline-none 
        disabled:cursor-not-allowed disabled:opacity-50 text-black ${className}`}
        {...register}
        placeholder={placeholder}
        accept={accept}
        readOnly={readonly}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
    />
  )
}

export default Input