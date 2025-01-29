import React, { useState } from "react";


const Accordin = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const faqs = [
    {
      question: "Strength",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, industry's standard dummy text ever since the 1500s.",
    },
    {
      question: "Weekness",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, industry's standard dummy text ever since the 1500s.",
    },
    {
      question: "Areas to improve",
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const TabContent = [
    {
      title: "Ask AI For Suggestion",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Improvements in Solutions",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  ",
    },
    {
      title: "AI - sample answer",
      content: "Content for AI Sample Answer.",
    },
  ];



  return (
    <section className="  bg-gray-50 ">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-4xl ">
          <h2 className="text-3xl font-bold leading-tight text-[#2A4563] sm:text-4xl lg:text-4xl">
            Strengths and weaknesses
          </h2>
        </div>
        <div className="max-w-6xl mx-auto mt-8 space-y-4 md:mt-16 ">
          {faqs.map((faq, index) => (
            <div
              key={`accordian-${index}`}
              className="rounded-xl transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
            >
              <button
                type="button"
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full px-4 py-3 sm:p-3 bg-[#0aa4d4] rounded-tl-xl rounded-tr-xl"
              >
                <span className="flex text-lg font-semibold text-white  ">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-white transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  {index === 2 && (
                    <>
                      <div className="  sm:flex justify-center gap-5 flex-wrap py-6 ">
                        {TabContent.map((tab, idx) => (
                          <button
                            key={`accordian--${idx}`}
                            className={`mt-4  px-12 py-2 xl:px-16 xl:py-2 bg-[#0aa4d4] font-semibold  rounded-md hover:bg-white hover:text-[#2A4563] hover:border border-[#0AA6D7] ${activeTab === idx
                                ? "bg-white border border-[#0AA6D7] text-[#2A4563] "
                                : "text-white"
                              }`}
                            onClick={() => setActiveTab(idx)}
                          >
                            {tab.title}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <p className="text-[#2A4563]">
                          {TabContent[activeTab].content}
                        </p>
                      </div>
                    </>
                  )}
                  <p className="text-[#2A4563]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordin;
