import React, { useState } from "react";
import Button from "../ui/Button";

export default function ContactUs() {
  const [contactData, setContactData] = useState({
    fname: "",
    lname: "",
    company: "",
    email: "",
  });
  return (
    <section className="container mx-auto">
      <div className="bg-white p-web md:p-[80px]">
        <div className="text-5xl md:text-6xl text-center font-semibold pb-5">
          CONTACT US
        </div>
        <div className="bg-white rounded-3xl md:p-web md:border-[4px] md:border-primary-orange">
          <div className="flex-col flex lg:grid lg:grid-cols-9 gap-5">
            <div className="grid grid-rows-2 gap-5 col-span-3">
              <div className="p-5 rounded-xl shadow-lg flex justify-center items-center gap-3">
                <div className="p-2 rounded-full border-2 border-primary-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={24}
                    width={24}
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                      fill="#003060"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <div>Call us directly at</div>
                  <div className="text-primary-orange">+91 1234567890</div>
                </div>
              </div>
              <div className="p-5 rounded-xl shadow-lg flex justify-center items-center gap-3">
                <div className="p-2 rounded-full border-2 border-primary-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={24}
                    width={24}
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z"
                      fill="#003060"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <div>Chat with our team</div>
                  <div className="">
                    <Button variant="blue" text="CHAT WITH US"></Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6 p-5 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-center pb-5">
                SUBMIT FORM
              </div>
              <p className="text-left pb-5">
                Studybot AI is an AI-powered subjective answer analysis tool
                that can help students to improve their subjective answers and
                prepare for competitive exams better.
              </p>
              <div className="md:grid md:grid-cols-2 text-center">
                <div className="md:grid md:grid-rows-2">
                  <div className="flex flex-col px-5 gap-3">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      required
                      value={contactData.fname}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          fname: e.target.value,
                        })
                      }
                      type="text"
                      className="border-[1px] border-primary-orange rounded-md mb-3 px-2 py-2"
                      id="firstname"
                    />
                  </div>
                  <div className="flex flex-col px-5 gap-3">
                    <label htmlFor="company">Company</label>
                    <input
                      required
                      value={contactData.company}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          company: e.target.value,
                        })
                      }
                      type="text"
                      className="border-[1px] border-primary-orange rounded-md mb-3 px-2 py-2"
                      id="company"
                    />
                  </div>
                </div>
                <div className="md:grid md:grid-rows-2">
                  <div className="flex flex-col px-5 gap-3">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      required
                      value={contactData.lname}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          lname: e.target.value,
                        })
                      }
                      type="text"
                      className="border-[1px] border-primary-orange rounded-md mb-3 px-2 py-2"
                      id="lastname"
                    />
                  </div>
                  <div className="flex flex-col px-5 gap-3">
                    <label htmlFor="email">Email</label>
                    <input
                      required
                      value={contactData.email}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          email: e.target.value,
                        })
                      }
                      type="email"
                      className="border-[1px] border-primary-orange rounded-md mb-3 px-2 py-2"
                      id="email"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  onSubmit={() => console.log(contactData)}
                  variant="orange"
                  text="Submit now"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
