import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import facebook from "../assets/images/facebook.svg";
import linkdin from "../assets/images/linkdin.svg";
import instgram from "../assets/images/instgram.svg";
import { countries } from "../utils/data";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CountryDropdown from "./CountryDropdown";
import { apiCall } from "../api/login";
import { ErrorMessage } from "./ResubaleComponents/ErrorMessage";

export default function ContactUsModal({ activeModal, closeModal, valueSend }) {
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    country: "",
    reason: "",
    otherReason: "",
  });

  const validateForm = () => {
    const newErrors = {};
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Enter your first and last name.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Provide a valid email address so we can contact you.";
    }

    // Phone validation: 10 digits + country code
    const phoneRegex = /^\+\d{2}\s\d{10}$/;;
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    } else if (formData.phone_number.trim() && !phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Invalid phone number format. Use XXX XXXX XXX.";
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    }
    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handler to update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          name: formData.name,
          phone_number: formData.phone_number,
          email: formData.email,
          country: formData.country,
          reason: formData.reason,
          otherReason: formData.otherReason
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://studybot.zapto.org/contact-us", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result) {
              toast.success(result.message);
              closeModal();
            }
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Transition show={activeModal === 'contactus'}>
      <Dialog className="relative contact-us" onClose={closeModal}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#000000bf] z-[1000] transition-opacity" />
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
              <DialogPanel className="relative transform overflow-hidden rounded-[1rem] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl h-full">
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
                <div className="flex flex-col sm:flex-row">
                  {/* left Section */}
                  <div className="right-panel  md:w-1/2  text-white gradient">
                    <div className="p-5 pt-2 ">
                      <p className="mt-5 text-sm leading-7 font-regular ">
                        Contact Us
                      </p>
                      <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
                        Get In <span className="text-[#f4812d]">Touch</span>
                      </h3>
                      <div className="mt-10">
                        <p className="mt-4 leading-7 mb-3 text-sm">
                          We’re here to help! <br /> If you have any questions, need assistance, or want to share feedback, please reach out to us through any of the following channels:
                        </p>
                        <div className="mb-3">
                          <p className="text-sm leading-7 font-semibold ">
                            Email Us
                          </p>
                          <span className="text-sm">
                            <strong>support@studybot.in</strong><br />
                            We aim to respond within 2-4 working days.
                          </span>
                        </div>
                        <div className="mb-3 w-full">
                          <p className="text-sm leading-7 font-semibold ">
                            Follow Us
                          </p>
                          <span className="text-sm">Stay updated by following us on:</span>
                          <div className="pt-4">
                            {/* <p className="text-sm leading-7 font-semibold ">
                            Social Media
                          </p> */}
                            <span className="flex  gap-2">
                              {/* <Link >
                              <img
                                src={facebook}
                                alt="facebook"
                                className="w-[20px] h-auto cursor-pointer"
                              />
                            </Link> */}
                              <Link to={'https://www.instagram.com/studybotai?igsh=MWtpaHlsenZ2Z2p0eA=='}>
                                <img
                                  src={instgram}
                                  alt="instgram"
                                  className="w-[20px] h-auto cursor-pointer"
                                />
                              </Link>
                              <Link to={"https://www.linkedin.com/company/studybot-ai/"}>
                                <img
                                  src={linkdin}
                                  alt="linkdin"
                                  className="w-[20px] h-auto cursor-pointer"
                                />
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right Section */}
                  <div className="mx-10 my-10 left-panel w-full md:w-1/2 bg-white flex flex-col justify-center">
                    <div>
                      {/* <h2 className="mb-8 font-bold text-2xl">Contact Us</h2> */}
                      <form>
                        <p className="mb-4 text-sm">
                          <strong className="text-base">Need Help Fast?</strong><br />
                          Fill out the form below, and our team will get back to you as soon as possible.
                        </p>
                        <div className="mb-2">
                          <label
                            className="block required  font-bold tracking-wide"
                            htmlFor="name"
                          >Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your first and last Name"
                            id="name"
                            className="flex-1 w-full border border-gray-500 rounded-lg p-2 bg-transparent focus:outline-none top"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />{errors.name && <ErrorMessage message={errors.name}/>}
                        </div>

                        <div className="mb-2">
                          <label
                            className="block required  font-bold tracking-wide"
                            htmlFor="email"
                          >Email
                          </label>
                          <input
                            type="email"
                            placeholder="Provide a valid email address"
                            name="email"
                            className="email flex-1 w-full border border-gray-500 rounded-lg p-2 bg-transparent focus:outline-none"
                            value={formData.email}
                            onChange={handleInputChange}
                          />{errors.email && <ErrorMessage message={errors.email}/>}
                        </div>
                        <div className="mb-2">
                          {/* <label
                            className="block required  font-bold tracking-wide"
                            htmlFor="country"
                          >Country
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full py-2 px-2 text-sm bg-transparent border border-gray-500 rounded-lg outline-none block required mb-4"
                          >
                            <option value="">select Country</option>
                            {countries.map((country, index) => (
                              <option key={index} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </select> */}
                          <CountryDropdown value={formData.country} handleChange={handleInputChange} />
                          {errors.country && <ErrorMessage message={errors.country} />}
                        </div>
                        <div className="mb-2">
                          <label
                            className="block required  font-bold tracking-wide"
                            htmlFor="phone_number"
                          >Phone Number
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. +1 XXX XXXX XXX"
                            name="phone_number"
                            className="flex-1 w-full border border-gray-500 rounded-lg p-2 bg-transparent focus:outline-none"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                          />{errors.phone_number && <ErrorMessage message={errors.phone_number} />}
                        </div>
                        <div className="mb-2">
                          <label
                            className="block required  font-bold tracking-wide"
                            htmlFor="reason"
                          >Reason</label>
                          <select
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            className="w-full py-2 px-2 text-sm bg-transparent border border-gray-500 rounded-lg outline-none block required mb-4"
                          >
                            <option value="">select reason</option>
                            <option value="General Inquiry">
                              General Inquiry
                            </option>
                            <option value="Feedback/Suggestions">
                              Feedback/Suggestions
                            </option>
                            <option value="Technical Support">
                              Technical Support
                            </option>
                            <option value="Subscription or Payment Query">
                              Subscription or Payment Query
                            </option>
                            <option value="Account/Login Assistance">
                              Account/Login Assistance
                            </option>
                            <option value="Partnership/Collaboration">
                              Partnership/Collaboration
                            </option>
                            <option value="Report a Bug">
                              Report a Bug
                            </option>
                            <option
                              selected={valueSend}
                              value="Enterprise Account"
                            >
                              Enterprise Account
                            </option>
                            <option value="Others">
                              Others (Please Specify)
                            </option>
                          </select>
                          {errors.reason && <ErrorMessage message={errors.reason}/>}
                        </div>
                        {formData.reason === 'Others' && (
                          <textarea
                            name="otherReason"
                            value={formData.otherReason}
                            onChange={handleInputChange}
                            placeholder="Please type your message"
                            className="w-full py-2 px-2 text-sm bg-transparent border border-gray-500 rounded-lg outline-none block"
                          ></textarea>
                        )}

                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn bg-primary-blue text-white w-full fw-semibold py-2 mt-2 hover:bg-primary-orange"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};


