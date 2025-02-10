import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { useState } from "react";
import facebook from "../assets/images/facebook.svg";
import linkdin from "../assets/images/linkdin.svg";
import instgram from "../assets/images/instgram.svg";
import { countries } from "../utils/data";
import { toast } from "react-toastify";
import { ErrorMessage } from "../components/ResubaleComponents/ErrorMessage";

const ContactUs = ({ isOpen, closeModal, valueSend }) => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    country: "",
    reason: "",
  });

  const validateForm = () => {
    const newErrors = {};
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Phone validation: 10 digits + country code
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Invalid phone number format.";
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
    <Transition show={isOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-[1rem] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl h-full">
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
                  <div className="right-panel w-full md:w-1/2  text-white gradient">
                    <div class="p-5">
                      <p class="mt-5 text-sm leading-7 font-regular uppercase">
                        Contact Us
                      </p>
                      <h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
                        Get In <span class="text-[#f4812d]">Touch</span>
                      </h3>
                      <p class="mt-6 leading-7 mb-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                      <div className="mb-3">
                        <p class="text-sm leading-7 font-semibold uppercase">
                          Chat to us
                        </p>
                        <span class="text-sm">
                          House #14, Street #12, Darulaman Road, Kabul,
                          Afghanistan.
                        </span>
                      </div>
                      <div className="mb-3">
                        <p class="text-sm leading-7 font-semibold uppercase">
                          call us
                        </p>
                        <span class="text-sm">+93 749 99 65 50</span>
                      </div>
                      <div className="">
                        <p class="text-sm leading-7 font-semibold uppercase">
                          Social Media
                        </p>
                        <span className="flex gap-2">
                          <img
                            src={facebook}
                            alt="facebook"
                            className="w-[20px] h-auto"
                          />
                          <img
                            src={linkdin}
                            alt="linkdin"
                            className="w-[20px] h-auto"
                          />
                          <img
                            src={instgram}
                            alt="instgram"
                            className="w-[20px] h-auto"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mx-10 my-10 left-panel w-full md:w-1/2 bg-white flex flex-col justify-center">
                    <div>
                      {/* <h2 className="mb-8 font-bold text-2xl">Contact Us</h2> */}
                      <form>
                        <div className="mb-4">
                          <label
                            className="block required uppercase font-bold tracking-wide  mb-2"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="flex-1 w-full border rounded-lg p-2 bg-transparent focus:outline-none"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />{errors.name && <ErrorMessage message={errors.name} />}
                        </div>
                        <div className="mb-4">
                          <label
                            className="block required uppercase font-bold tracking-wide  mb-2"
                            htmlFor="phone_number"
                          >
                            Phone number
                          </label>
                          <input
                            type="text"
                            className="flex-1 w-full border rounded-lg p-2 bg-transparent focus:outline-none"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                          />{errors.phone_number && <ErrorMessage message={errors.phone_number} />}
                        </div>
                        <div className="mb-4">
                          <label
                            className="block required uppercase font-bold tracking-wide  mb-2"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="flex-1 w-full border rounded-lg p-2 bg-transparent focus:outline-none"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />{errors.email && <ErrorMessage message={errors.email} />}
                        </div>
                        <div className="mb-4">
                          <label
                            className="block required uppercase font-bold tracking-wide  mb-2"
                            htmlFor="country"
                          >
                            Country
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full py-2 px-2 bg-transparent border rounded-lg outline-none block required mb-2"
                          >
                            <option value="">select Country</option>
                            {countries.map((country, index) => (
                              <option key={index} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                          {errors.country && <ErrorMessage message={errors.country} />}
                        </div>
                        <div className="mb-4">
                          <label
                            className="block required uppercase font-bold tracking-wide  mb-2"
                            htmlFor="reason"
                          >
                            Reason
                          </label>
                          <select
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            className="w-full py-2 px-2 bg-transparent border rounded-lg outline-none block required mb-2"
                          >
                            <option value="">select Reason</option>
                            <option
                              selected={valueSend}
                              value="Enterprise Plan (Custom Users)"
                            >
                              Enterprise Plan (Custom Users)
                            </option>
                            <option value="Technical Support">
                              Technical Support
                            </option>
                            <option value="General Inquiry">
                              General Inquiry
                            </option>
                            <option value="Feedback/Suggestions">
                              Feedback/Suggestions
                            </option>
                          </select>
                          {errors.reason && <ErrorMessage message={errors.reason} />}
                        </div>

                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn bg-primary-blue text-white w-full fw-semibold py-2 mt-2"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContactUs;
