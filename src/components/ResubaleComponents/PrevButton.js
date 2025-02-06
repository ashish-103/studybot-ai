import React from 'react'
import Button from './Button'
import leftArrow from "../../assets/images/leftArrow.png";

export const PrevButton = ({ currentQuestion, handleClick, handleDisable }) => {
  return (
    <div
      className={`items-center justify-center bg-white border-2 pr-2 border-[#E4F9FF] text-[#0AA6D7] ${currentQuestion === 0 ? "hidden" : "flex"
        }`}
    >
      <img src={leftArrow} className="w-6 h-6" alt="leftarrow" />
      <Button
        label="Prev"
        type="button"
        className="px-0"
        onClick={handleClick}
        disabled={handleDisable}
      />
    </div>
  )
}
