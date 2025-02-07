import React from 'react'

export const UploadFile = ({ display, file }) => {
  return (
    <div className={display}>
      <svg
        onClick={() => {
          const item = document.getElementById("addFile");
          item.click();
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
        />
      </svg>
      <input
        id="addFile"
        type="file"
        required
        className="hidden"
        onChange={(e) => {
          file(e.target.files[0]);
        }}
      />
    </div>)
}
