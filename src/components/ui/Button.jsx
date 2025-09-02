'use client'

import React from "react"

const Button = ({className,children,...props}) => {
  return (
    <button
    className={`bg-catalineBlue text-white md:text-base text-sm 
    py-2 px-6 rounded-lg transition-all duration-300 ease-in-out hover:opacity-60 
    disabled:opacity-25 ${className}`} 
    {...props}>
        {children}
    </button>
  )
}

export default Button