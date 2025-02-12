/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import loginImage from "../images/login2.png";
import { toast } from "react-toastify";
import { apiCall } from "../api/login";
import { useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { ErrorMessage } from "./ResubaleComponents/ErrorMessage";

const SignUpModal = ({ openModal, closeModal, activeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [errors, setErrors] = useState({});
  const [showOtpSignup, setShowOtpSignup] = useState(false); // false ->otpscreen, true->signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
    username: "",
  });

  const { loading, error } = useSelector((state) => state.auth);

  const clearFormData = () => {
    setFormData({
      email: "",
      password: "",
      re_password: "",
      username: "",
    });
  };

  const validate = () => {
    let tempErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameRegex = /^[a-zA-Z]+[0-9]*$/;
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Valid email is required";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      tempErrors.password = "Password must be at least 8 characters, include an uppercase, a lowercase, a number, and a special character.";
    }
    if (!formData.re_password) {
      tempErrors.re_password = "Password is required";
    } else if (formData.password !== formData.re_password) {
      tempErrors.re_password = "Confirm Password must be same as password"
    }
    if (!formData.username) {
      tempErrors.username = "Name is required";
    } else if (!usernameRegex.test(formData.username)) {
      tempErrors.username =
        "Username must start with letters and can optionally include numbers after.";
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

  const sendWelcomeEmail = async (email) => {
    const emailData = new FormData();
    emailData.append("email", formData.username);
    try {
      const response = await apiCall.post("/send-welcome-email", emailData);
      if (response.data.success === true) {
        setTimeout(() => {
          window.location.href = `dashboard/tests?message=${encodeURIComponent(
            response.data.message
          )}`;
        }, 300);
      }
      return response;
    } catch (error) {
      console.error(
        "Failed to send welcome email:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (showOtpSignup) {
      // Check OTP verification status
      const signupData = new FormData();
      signupData.append("email", formData.email);
      signupData.append("password", formData.password);
      signupData.append("username", formData.username);
      signupData.append("re_password", formData.re_password);
      try {
        const { data } = await apiCall.post("signup", signupData);
        setIsLoading(false);
        if (data.message === "Account created") {
          toast.success(data.message);
          const result = {
            email: data.email,
            token: data.token,
            name: data.username,
            userid: data.userid,
            plan_name: data.plan_name,
            plan_amount: data.plan_amount,
          };
          localStorage.setItem("user", JSON.stringify(result));
          await sendWelcomeEmail(formData.email); // Helper function for welcome email
          clearFormData();
        } else {
          toast.error(data.message || "Signup failed.");
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || "Signup request failed.";
        console.error("Request failed:", errorMsg);
        toast.error(errorMsg);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error("OTP verification is required.");
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const email = { email: formData.email };
        const { data } = await apiCall.post("generate-otp1", email);
        if (data.message === `OTP sent to ${formData.email}`) {
          toast.success(data.message);
          setShowOtpSignup(true); // Show OTP input field
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.error || "Failed to generate OTP.";
        console.error("Request failed:", errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  return (
    <>
      <Transition show={activeModal === 'signup'}>
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
                    {!showOtpSignup ? (
                      <div className="left-panel w-full md:w-1/2  bg-white py-10 sm:py-0 sm:p-10 flex flex-col justify-center">
                        <div className="my-5">
                          <h2 className="mb-4 font-bold text-2xl">
                            Sign up to your account
                          </h2>
                          <form>
                            <div className="mb-4">
                              <div className="row">
                                <div className="col-sm-6 col-md-12">
                                  <div className="mb-6 relative">
                                    <input
                                      type="username"
                                      className="flex-1 w-full border rounded-lg  p-2 bg-transparent focus:outline-none "
                                      id="username"
                                      name="username"
                                      value={formData.username}
                                      onChange={handleChange}
                                      placeholder="Username"
                                    />

                                    {errors.username && <ErrorMessage message={errors.username} top="top-11" left="left-1" />}
                                  </div>
                                  <div className="mb-6 relative">
                                    <input
                                      type="email"
                                      className="flex-1 w-full border rounded-lg  p-2 bg-transparent focus:outline-none "
                                      id="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleChange}
                                      placeholder="Email"
                                    />
                                    {errors.email && <ErrorMessage message={errors.email} top="top-11" left="left-1" />}
                                  </div>
                                  <div className="col-sm-6 col-md-12 mb-2">
                                    <div className="mb-6 relative">
                                      <div className="input-group relative">
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
                                          onClick={()=>{ setShowPassword(!showPassword);}}
                                          className="absolute  top-5 right-1 transform -translate-y-1/2 text-gray-500 rounded-full outline-gray-200 focus:bg-gray-100"
                                        >
                                          <div className="hover:bg-gray-100 p-2 rounded-full">
                                            {
                                              showPassword ?
                                                <FaRegEye size={20} />
                                                :
                                                <FaRegEyeSlash size={20} />
                                            }
                                          </div>
                                        </button>
                                      </div>
                                      {errors.password && <ErrorMessage message={errors.password} top="top-11" left="left-1" />}
                                    </div>
                                  </div>
                                  <div className="col-sm-6 col-md-12 mb-2">
                                    <div className="mb-6 relative">
                                      <div className="input-group relative">
                                        <input
                                          type={
                                            showConfirmPassword
                                              ? "text"
                                              : "password"
                                          }
                                          className="flex-1  w-full border rounded-lg p-2 bg-transparent focus:outline-none "
                                          id="re_password"
                                          name="re_password"
                                          value={formData.re_password}
                                          onChange={handleChange}
                                          placeholder="Confirm Password"
                                        />
                                        <button
                                          type="button"
                                          onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}
                                          className="absolute  top-5 right-1 transform -translate-y-1/2 text-gray-500 rounded-full outline-gray-200 focus:bg-gray-100"
                                        >
                                          <div className="hover:bg-gray-100 p-2 rounded-full">
                                            {
                                              showConfirmPassword ?
                                                <FaRegEye size={20} />
                                                :
                                                <FaRegEyeSlash size={20} />
                                            }
                                          </div>
                                        </button>
                                      </div>
                                      {errors.re_password && <ErrorMessage message={errors.re_password} top="top-11" left="left-1"  />}
                                    </div>
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
                                      Sign Up
                                      <div
                                        className="spinner-border spinner-border-sm ms-2"
                                        role="status"
                                      >
                                        <span className="visually-hidden">
                                          Loading...
                                        </span>
                                      </div>
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      className="btn btn-primary w-full fw-semibold py-2 mt-2"
                                      style={{
                                        background: "#f4812d",
                                        border: 0,
                                      }}
                                      onClick={handleOtp}
                                    >
                                      Sign Up
                                    </button>
                                  )}
                                  <div className="text-center my-4">
                                    <p>Already have an Account?
                                      <button
                                        type="button"
                                        onClick={() => { openModal("login") }}
                                        className="ms-2"
                                        style={{
                                          color: "#f4812d",
                                          textDecoration: "none",
                                        }}
                                      >
                                        Login
                                      </button></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div className="left-panel w-full md:w-1/2  bg-white py-10 sm:py-0 sm:p-10 flex flex-col justify-center">
                        <div className="">
                          <h2 className="mb-4 font-bold text-2xl">
                            OTP Verification
                          </h2>

                          <form>
                            <div>
                              <div className="mb-3 otp-container                                                                                                            ">
                                <OtpInput
                                  value={formData.otp}
                                  onChange={(value) =>
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      otp: value,
                                    }))
                                  }
                                  numInputs={6}
                                  inputStyle="otp-input"
                                  renderInput={(props) => (
                                    <input
                                      {...props}
                                      type="text"
                                      maxLength="1"
                                    />
                                  )}
                                />
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary w-full fw-semibold py-2 mt-2"
                                style={{
                                  background: "#f4812d",
                                  border: 0,
                                  cursor: "pointer",
                                }}
                                onClick={handleClick}
                              >
                                Verify OTP
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    <div className="right-panel w-full md:w-1/2 bg-white   bg-gradient-custom ">
                      <div
                        className="  bg-[#e0e7ff] justify-center items-center flex-1 text-center   lg:flex rounded-tr-[10px] rounded-br-[10px]"
                        style={{ padding: "100px 0px" }}
                      >
                        <img
                          src={loginImage}
                          alt="login"
                          className="h-full lg:w-full lg:h-auto"
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
};

export default SignUpModal;
