import React from "react";
import { Link } from "react-router-dom"
export default function Gmodal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          height: "80%",
          width: "60%",
          minWidth: "60%",
          maxHeight: "80%",
          overflowY: "auto",
          padding: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}>
        {children}
        <div className="flex justify-between items-center mx-8 my-4">
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
          <button className="bg-[#007BFF] text-white border-none rounded-[4px] px-[20px] py-[10px]"
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