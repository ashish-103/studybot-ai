import React, { useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { Element } from "react-scroll";

export default function Faqs() {
  const [currentFaq, setCurrentFaq] = useState(0);
  const data = [
    {
      ques: "What is Scholar AI and how does it work?",
      desc: "Studybot AI is an AI-powered exam preparation platform that analyzes your subjective answers or quiz performance, provides personalized feedback, and offers recommendations to help you improve. It uses advanced AI algorithms to grade your answers and offer insights, making your study sessions more efficient.",
    },
    {
      ques: "Which exams does Scholar AI support?",
      desc: "Currently supports a variety of exams such as IELTS speaking and writing. Our platform will continue expanding to cover more standardized and competitive exams over time.",
    },
    {
      ques: "What type of feedback does Scholar AI provide?",
      desc: "Scholar AI provides AI-generated feedback on clarity, relevance, and accuracy of your answers. For objective exams, it highlights key areas where improvement is needed. For subjective answers, it analyzes writing style, coherence, and alignment with scoring criteria (e.g., band scores for IELTS).",
    },
    {
      ques: "Are there any student discounts available?",
      desc: "Yes, we offer special discounts for students! Studybot AI provides affordable pricing plans for students preparing for the IELTS exam, and we frequently run promotions and offer discounts. Keep an eye on our website or subscribe to our newsletter to stay updated on current offers.",
    },
    {
      ques: "How can I get feedback on my tests?",
      desc: "After you submit a test, Studybot AI's AI-powered system will evaluate your answers, especially in the Writing and Speaking sections. You'll receive a detailed report highlighting your strengths, weaknesses, and suggestions for improvement, based on IELTS scoring bands.",
    },
    {
      ques: "I don't have a computer or laptop. Can I still take these tests?",
      desc: "Yes! Studybot AI is fully optimized for mobile devices and tablets. You can take practice tests, submit answers, and receive feedback directly from your phone or tablet, allowing you to study and practice anytime, anywhere.",
    },
    {
      ques: "Can I practice individual sections of the IELTS exam, or do I need to take the full test each time?",
      desc: "You can practice individual sections if you want to focus on a specific area, like Writing or Speaking. Study Bot AI allows you to customize your practice by selecting which sections you want to work on at any given time.",
    },
    {
      ques: "What are the practice tests, and how do they help?",
      desc: "Our practice tests simulate real IELTS exams and cover all four sections: Listening, Reading, Writing, and Speaking. These tests give you a chance to familiarize yourself with the format and timing of the actual exam. After completing a test, Studybot AI provides detailed feedback on your performance, helping you identify areas to focus on.",
    },
  ];
  return (
    <Element  name="section5" >
    <section className="container mx-auto p-web ">
      <div className="w-4/5 mx-auto text-center">
        <div className="text-5xl md:text-6xl font-semibold pb-5">FAQS</div>
      </div>
      <div className="lg:px-section-web md:w-[80%] mx-auto">
        <ul className="flex flex-col gap-3 md:gap-5 lg:px-section-web">
          {data.map((item, index) => {
            return (
              <li
                key={`faq${index}`}
                className={`${
                  currentFaq === index
                    ? "shadow-custom md:scale-[1.03]"
                    : "scale-100"
                } transition-transform ease-in-out duration-200 bg-white p-4 md:p-5 rounded-lg shadow-md hover:shadow-lg text-sm md:text-base`}
              >
                <div
                  onClick={() => {
                    if (currentFaq !== index) {
                      setCurrentFaq(index);
                    } else {
                      setCurrentFaq(-1);
                    }
                  }}
                  className="font-bold flex justify-between items-start gap-3 cursor-pointer"
                >
                  <div className="w-[95%] pt-1">{item.ques}</div>
                  <div className="md:w-[5%]">
                    <ArrowUpIcon
                      className={`h-5 md:h-8 w-auto p-1 md:p-2 rounded-full cursor-pointer ${
                        currentFaq === index
                          ? "bg-black text-white"
                          : "bg-primary-gray rotate-180"
                      }`}
                    />
                  </div>
                </div>
                {currentFaq === index && (
                  <>
                    <p className="pt-1 text-sm cursor-text">{item.desc}</p>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      </section>
      </Element>
  );
}
