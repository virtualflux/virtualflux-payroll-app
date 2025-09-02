'use client'
import React from "react"

const Select = ({onChange, className, register, placeholder,
  name, children, disabled, defaultValue, value}) => {
  return (
    <select 
    {...register}
    onChange={onChange}
    disabled={disabled}
    className={`w-full h-10 p-2 text-black border-2 border-gray-300 rounded-md 
        text-sm flex ring-offset-white placeholder:text-gray-300 
        transition-all duration-300 ease-in-out focus:border-2
        focus:border-catalineBlue disabled:cursor-not-allowed 
        disabled:opacity-50 outline-none bg-gray-100 ${className}`}
    defaultValue={defaultValue || ''}
    name={name}
    >
        <option value="" disabled className="text-gray-300">{placeholder}</option>
        {children}
    </select>
  )
}

export default Select