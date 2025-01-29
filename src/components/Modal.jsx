import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import loginImage from "../images/login.png";
import registerStudent from "../api/registerStudent";

const RegisterModal = ({ isOpen, setModalIsOpen }) => {
  const [studentData, setStudentData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(studentData, "studentData");
    registerStudent(studentData);
    // registerStudent({
    //   email: studentData.email,
    //   password: studentData.password,
    // });
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)", // Darker overlay background color
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      margin: "0 auto",
    },
    content: {
      width: "1000px", // Adjust content width as needed
      margin: "auto",
      borderRadius: "8px",
      padding: "0px",
      zIndex: 1001, // Ensure content is above overlay
      position: "relative", // Enable absolute positioning of the close button
    },
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Add or remove the 'no-scroll' class on body when the modal is open
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup class when component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal} // Close modal on outside click or escape key press
      contentLabel="Register Modal"
      className="ReactModalCustom"
    >
      {/* <h2>Register</h2>
      <button onClick={() => setModalIsOpen(!isOpen)} className="bg-red p-2">
        Close
      </button> */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
        aria-label="Close"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="min-h-full text-gray-900 flex justify-center">
        <div className="max-w-screen-lg   bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12  p-6">
            {" "}
            <div className=" flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold text-[#003060]">
                Register
              </h1>
              <div className="w-full flex-1 mt-4">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-2  bg-[#f9943b] hover:bg-[#003060]  text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign Up with Google</span>
                  </button>
                </div>

                <div className="my-6 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm  tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={studentData.email}
                        onChange={handleInputChange}
                        required
                      />

                      <div className="absolute left-0 inset-y-0 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2 text-gray-400 hover:text-gray-500"
                          width="800px"
                          height="800px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                            fill="#080341"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Password"
                        value={studentData.password}
                        onChange={handleInputChange}
                        required
                      />

                      <div className="absolute left-0 inset-y-0 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-4 ml-2 mt-5 text-gray-400"
                          width="800px"
                          height="800px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12.3212 10.6852L4 19L6 21M7 16L9 18M20 7.5C20 9.98528 17.9853 12 15.5 12C13.0147 12 11 9.98528 11 7.5C11 5.01472 13.0147 3 15.5 3C17.9853 3 20 5.01472 20 7.5Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <button className="mt-5 tracking-wide font-semibold bg-[#f9943b] text-gray-100 w-full py-3 rounded-lg hover:bg-[#003060] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">
                        <button type="submit">Register</button>
                      </span>
                    </button>

                    <p className="mt-2 text-xs text-center">
                      <span>
                        {" "}
                        <input
                          id="CheckBox"
                          type="checkbox"
                          className="w-3 h-3 mt-1 mr-3  accent-blue-900"
                        ></input>
                      </span>
                      I agree to abide by Studybot AI
                    </p>
                    <p className="mt-2 text-xs text-center">
                      <Link
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Terms of Service
                      </Link>
                      <span className="m-1">and its</span>
                      <Link
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-tr-[10px] rounded-br-[10px]">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${loginImage})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
