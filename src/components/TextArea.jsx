import React from 'react'

export default function TextArea ({ value, q, onChange, plan }) {
  
  return (
    <textarea
      className="w-[800px] h-[150px] mt-10 appearance-none lg:h-[170px] text-md py-1 px-2 focus:outline-none border-2 rounded-lg border-[#E4F9FF] focus:ring-blue-600 focus:border-[#0AA6D7] text-black placeholder-blue-300 dark:placeholder-gray-600"
      type="search"
      spellCheck={false}
      placeholder="Answer :"
      value={value || ""}
      onChange={(e) => { onChange(q, e.target.value) }}
      // onPaste={(e) => plan !== "Basic" && e.preventDefault()}
    />)
}
