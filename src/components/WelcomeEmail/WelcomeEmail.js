import React from "react";
import logo from "../../assets/images/welcome-page-logo.png";

const WelcomeEmail = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <div className="text-center">
            <div className="flex justify-center items-center w-20 h-20 mx-auto bg-blue-100 rounded-full mb-4">
              <img src={logo} alt="logo" className="cursor-pointer" />
            </div>

            <h2 className="text-2xl font-semibold mt-4 text-gray-800">
              Welcome to StudyBot AI!
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 mt-2">
              Your smart companion for IELTS success. Let’s achieve your dream
              score together!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeEmail;
