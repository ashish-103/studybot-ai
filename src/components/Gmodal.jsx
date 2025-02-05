import React from "react";
import { Link } from "react-router-dom"
export default function Gmodal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[80%] md:h-full  bg-[rgba(0, 0, 0, 0.5)] flex justify-center items-start mt-36 md:items-center md:mt-0 mx-4 overflow-y-auto mb-12">
      <div className="bg-white rounded-lg h-fit min-w-[90%] md:min-w-[60%]  md:max-w-[60%] md:max-h-[80%] md:h-fit overflow-y-auto p-5 shadow-md">
        {children}
        <div className="flex justify-between items-center mx-8 my-4 cursor-pointer">
          <Link
            to="/dashboard/tests"
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Back
          </Link>
          <button className="bg-[#007BFF] text-white border-none rounded-[4px] px-[20px] py-[10px] cursor-pointer"
            onClick={() => closeModal()}
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};