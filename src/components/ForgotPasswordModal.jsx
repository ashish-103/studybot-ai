import React, { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import loginImage from "../images/login2.png";
import { useNavigate } from 'react-router-dom';
import { apiCall } from "../api/login";
import { toast } from 'react-toastify';
import { ErrorMessage } from './ResubaleComponents/ErrorMessage';

export default function ForgotPasswordModal({ activeModal, closeModal }) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateEmail()) {
      try {
        setIsLoading(true);
        const data = new FormData();
        data.append("email", formData.email);
        const response = await apiCall.post("forgot_password", data);
        if (response.data.message === `Password reset link has been sent to your email.`) {
          setIsLoading(false)
          toast.success(response.data.message);
          navigate('/')
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Failed to send reset link.";
        console.error("Request failed:", errorMsg);
        console.log(error)
        toast.error(errorMsg);
      }
    }
  }
  return (
    <Transition show={activeModal === 'forgot_password'}>
      <Dialog className="relative " onClose={closeModal}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#000000bf]  z-[1000] transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-[10001] w-screen overflow-y-auto bgModal">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className=" relative transform overflow-hidden rounded-[1rem] bg-white text-left shadow-xl transition-all sm:my-8  sm:w-full sm:max-w-3xl ">
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
                <div className="flex flex-col sm:flex-row ">
                  {/* left section */}
                  <div className="left-panel w-full md:w-1/2  bg-white py-10 sm:py-0 sm:p-10 flex flex-col justify-center">
                    <div className="">
                      <h2 className="mb-4 font-bold text-2xl">
                        We will send you a link to reset password.</h2>
                      <form>
                        <div className="mb-4">
                          <div className="">
                            <div className="">
                              <div className="mb-4 relative">
                                <label
                                  className="block required uppercase  font-bold  tracking-wide text-gray-700 mb-2"
                                  htmlFor="grid-first-name"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="flex-1 w-full border rounded-lg  p-2 bg-transparent focus:outline-none "
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="Email"
                                />

                                {errors.email && <ErrorMessage message={errors.email} top={"top-[4.6rem]"} left={"left-1"} />}
                              </div>
                              {isLoading ? (
                                <button
                                  type="submit"
                                  className="btn btn-primary w-full fw-semibold py-2 mt-2"
                                  style={{
                                    background: "#f4812d",
                                    border: 0,
                                  }}
                                  disabled
                                >
                                  Forgot Password
                                  <div
                                    className="spinner-border spinner-border-sm ms-2"
                                    role="status"
                                  ></div>
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  className="btn btn-primary w-full fw-semibold py-2 mt-2"
                                  style={{
                                    background: "#f4812d",
                                    border: 0,
                                  }}
                                  onClick={handleSubmit}
                                >
                                  Forgot Password
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* right section */}
                  <div className="right-panel w-full md:w-1/2 bg-white   bg-gradient-custom ">
                    <div
                      className="  bg-[#e0e7ff] justify-center items-center flex-1 text-center   lg:flex rounded-tr-[10px] rounded-br-[10px]"
                      style={{ padding: "100px 0px" }}
                    >
                      <img
                        src={loginImage}
                        alt="login"
                        className="lg:w-full lg:h-auto"
                      />
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
