import React from 'react'

export const ErrorMessage = ({ message, top="", left="" }) => {

  return (
    <span className={`w-fit error-message text-red-500 text-sm absolute  ${top} ${left}`}>
      {message}
    </span>)
}
