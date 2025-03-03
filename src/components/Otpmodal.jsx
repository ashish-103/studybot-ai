/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../images/google.svg";
import loginImage from "../images/login2.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { apiCall } from "../api/login";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../features/auth/authSlice";
import OtpInput from "react-otp-input";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Button from "./ui/Button";

// import { UserContext } from "../context/userContext";

export default function OtpModal({ setIsOpen, singUpPage }) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLoginSignup, setShowLoginSignup] = useState(false); // false ->login, true->signup
  const [showOtpSignup, setShowOtpSignup] = useState(false); // false ->otpscreen, true->signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
    username: "",
  });
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const clearFormData = () => {
    setFormData({
      email: "",
      password: "",
      re_password: "",
      username: "",
    });
  };

  const closeModal = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const validate = () => {
    let tempErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Valid email is required";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      tempErrors.password =
        "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }

    // Signup-specific check
    if (showLoginSignup && !formData.username) {
      tempErrors.username = "Name is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    if (validate()) {
      const loginData = new FormData();
      loginData.append("email", formData.email);
      loginData.append("password", formData.password);
      try {
        const response = await apiCall.post("login", loginData);
        setIsLoading(false); // Stop loading
        if (response.data.message === "Logged in successfully.") {
          const result = {
            email: response.data.email,
            token: response.data.token,
            name: response.data.username,
            userid: response.data.userid,
            plan_name: response.data.plan_name,
            plan_amount: response.data.plan_amount,
          };
          localStorage.setItem("user", JSON.stringify(result));
          clearFormData();
          setTimeout(() => {
            window.location.href = "dashboard/tests";
          }, 300);
          toast.success("Logged in successfully!");
        } else if (response.data.message === "Email already exists") {
          toast.error(response.data.message);
        } else {
          toast.error("An error occurred while creating account.");
        }
      } catch (error) {
        console.error("Request failed", error.response.data.message);
        toast.error(error.response.data.message);
        setIsLoading(false); // Stop loading
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Transition show={open}>
        <Dialog className="relative " onClose={() => setIsOpen(false)}>
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
                          Login to your account
                        </h2>
                        <form>
                          <div className="mb-4">
                            <div className="">
                              <div className="">
                                <div className="mb-4">
                                  {/* <label
                                    className="block required uppercase  font-bold  tracking-wide text-gray-700 mb-2"
                                    htmlFor="grid-first-name"
                                  >
                                    Email
                                  </label> */}
                                  <input
                                    type="email"
                                    className="flex-1 w-full border rounded-lg  p-2 bg-transparent focus:outline-none "
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                  />

                                  {errors.email && (
                                    <div className="error-message text-red-500">
                                      {errors.email}
                                    </div>
                                  )}
                                </div>
                                <div className="col-sm-6 col-md-12 mb-2">
                                  <div className="mb-4">
                                    <div className="input-group relative">
                                      {/* <label
                                        className="block required uppercase  font-bold  tracking-wide text-gray-700 mb-2"
                                        htmlFor="grid-first-name"
                                      >
                                        Password
                                      </label> */}
                                      <input
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        className="flex-1 w-full border rounded-lg p-2 bg-transparent focus:outline-none "
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                      />
                                      <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-2 bottom-0 transform -translate-y-1/2 text-gray-500"
                                      >
                                        {showPassword ? (
                                          <FaRegEye size={20} />
                                        ) : (
                                          <FaRegEyeSlash size={20} />
                                        )}
                                      </button>
                                    </div>
                                    {errors.password && (
                                      <div className="error-message text-red-500">
                                        {errors.password}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="text-end">
                                  <Link
                                    to="/forgot-password"
                                    className="ms-2"
                                    style={{
                                      color: "#f4812d",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Forgot Password
                                  </Link>
                                </div>
                                {loading ? (
                                  <button
                                    type="submit"
                                    className="btn btn-primary w-full fw-semibold py-2 mt-2"
                                    style={{
                                      background: "#f4812d",
                                      border: 0,
                                    }}
                                    disabled
                                  >
                                    Log in
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
                                    onClick={handleClick}
                                  >
                                    Log in
                                  </button>
                                )}
                              </div>
                              <div className="text-center my-4">
                                <p>
                                  Need an Account?
                                  <Link
                                    to="/"
                                    className="ms-2"
                                    style={{
                                      color: "#f4812d",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Sign Up
                                  </Link>
                                </p>
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
    </>
  );
}
