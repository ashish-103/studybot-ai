import React from 'react'
import Button from './Button'
import leftArrow from "../../assets/images/leftArrow.png";

export default function NextButton ({ handleClick, handleDisabled }) {
  return (
    <div className="flex items-center justify-center bg-white border-2 pl-2 border-[#E4F9FF] text-[#0AA6D7]">
      <Button
        label="Next"
        type="button"
        className="px-0"
        onClick={handleClick}
        disabled={handleDisabled}
      />
      <img
        src={leftArrow}
        className="w-6 rotate-180 h-6"
        alt="right arrow"
      />
    </div>
  )
}
