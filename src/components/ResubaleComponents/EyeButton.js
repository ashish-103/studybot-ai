import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

export const EyeButton = ({ handleClick, password }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute right-2 bottom-0 transform -translate-y-1/2 text-gray-500"
    >
      {password ? (
        <FaRegEye size={20} />
      ) : (
        <FaRegEyeSlash size={20} />
      )}
    </button>
  )
}
