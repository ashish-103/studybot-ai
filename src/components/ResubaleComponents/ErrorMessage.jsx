import React from 'react'

export const ErrorMessage = ({ message }) => {

  return (
    <span className={`w-fit error-message text-red-500 text-sm `}>
      {message}
    </span>)
}
