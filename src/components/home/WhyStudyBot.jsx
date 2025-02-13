import React, { createContext, useState } from "react";
import about1 from "../../images/about1.jpg";
import about2 from "../../images/about2.jpg";
import about3 from "../../images/about3.jpg";
import AboutCard from "../ui/AboutCard";
import Slider from "react-slick";
import course from "../../images/courses.jpg";
import "./aboutus.css";
import Button from "../ui/Button";
import Lottie from "react-lottie";
import animationData from "../../assets/Ai_powered.json";
import animationData1 from "../../assets/Ai_powered2.json";
import animationData2 from "../../assets/Ai_powered3.json";
// src/assets/Ai_powered.json

export const AboutContext = createContext();

export default function WhyStudyBot() {
  const [current, setCurrent] = useState(-1);
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    arrows: false,
    appendDots: (dots) => (
      <ul id="aboutDots" className="">
        {dots}
      </ul>
    ),
  };

  const defaultOptions = {
    loop: true, // Animation will loop
    autoplay: true, // Animation will play automatically
    animationData: animationData, // Your animation JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Optional: adjust the aspect ratio
    },
  };
  const defaultOptions2 = {
    loop: true, // Animation will loop
    autoplay: true, // Animation will play automatically
    animationData: animationData2, // Your animation JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Optional: adjust the aspect ratio
    },
  };
  const defaultOptions3 = {
    loop: true, // Animation will loop
    autoplay: true, // Animation will play automatically
    animationData: animationData1, // Your animation JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Optional: adjust the aspect ratio
    },
  };

  return (
    <section id="all_features" className="container mx-auto p-web text-center">
      <div className="w-4/5 mx-auto">
        <div className="text-5xl md:text-6xl font-semibold py-5 pt-10">
          Why Study Bot AI?
        </div>
      </div>
      <div className="flex flex-col mx-auto">
        <div className="flex flex-col md:flex-row md:justify-center md:items-center">
          <div className="my-5 md:m-5 md:w-1/2 md:p-7">
            <div className="text-3xl font-bold pb-3">AI Powered Feedback</div>
            Automated scoring tailored to your performance.
            Immediate suggestions to improve your answers.
            Feedback focused on accuracy, clarity, and relevance.
          </div>
          <div className="md:w-1/2 md:p-7">
            {/* <img src={course} alt="about1" className='w-full' /> */}
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
        <div className="hidden md:flex flex-col md:flex-row md:justify-center md:items-center">
          <div className=" sha dow-lg md:w-1/2 md:p-7">
            <Lottie options={defaultOptions2} height={400} width={400} />
          </div>
          <div className=" my-5 md:m-5 md:w-1/2 md:p-7">
            <div className="text-3xl font-bold pb-3">A Study Plan Built Just for You
            </div>
            Recommendations based on your strengths and weaknesses.
            Real-time adjustments to match your learning pace.
            Access to updated examples and targeted exercises.
          </div>
        </div>
        <div className="flex md:hidden flex-col md:flex-row md:justify-center md:items-center">
          <div className="my-5 md:m-5 md:w-1/2 md:p-7">
            <div className="text-3xl font-bold pb-3">A Study Plan Built Just for You
            </div>
            Recommendations based on your strengths and weaknesses.
            Real-time adjustments to match your learning pace.
            Access to updated examples and targeted exercises.
          </div>
          <div className=" sha dow-lg md:w-1/2 md:p-7">
            <Lottie options={defaultOptions3} height={400} width={400} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-center md:items-center">
          <div className="my-5 md:m-5 md:w-1/2 md:p-7">
            <div className="text-3xl font-bold pb-3">Performance tracking</div>
            Detailed performance analytics with easy-to-read graphs.
            Weekly progress reports to keep you motivated.
            Insights into trends for continuous growth.
          </div>
          <div className="bg-white rounded-md sha dow-lg md:w-1/2 md:p-7">
            <Lottie options={defaultOptions3} height={400} width={400} />
          </div>
        </div>
      </div>
    </section>
  );
}
