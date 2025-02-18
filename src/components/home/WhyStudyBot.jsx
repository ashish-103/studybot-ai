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
        <div className="text-5xl md:text-6xl font-semibold">
          Why Studybot AI makes the best choice
        </div>
      </div>
      <div className="flex flex-col mx-auto">
        <div className="flex flex-col md:flex-row md:justify-center md:items-center">
          <div className="md:w-1/2 flex flex-col justify-center items-start text-left">
            <div className="text-4xl font-bold pb-3">Actionable Feedback in Real-Time</div>
            <p className="font-medium text-lg">
              Our AI provides instant, detailed feedback tailored to your answers helping you identify and fix mistakes quickly.
            </p>
            <ul className="custom-list pt-4 text-lg">
              <li className="">Automated scoring tailored to your performance.</li>
              <li className="">Immediate suggestions to improve your answers.</li>
              <li className="">Feedback focused on accuracy, clarity, and relevance.</li>
            </ul>
            <Button
              variant="orange"
              text='Learn More'
              style={{ marginTop: "1rem" }}
            />

          </div>
          <div className="md:w-1/2">
            {/* <img src={course} alt="about1" className='w-full' /> */}
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
        <div className="hidden md:flex flex-col md:flex-row md:justify-center md:items-center">
          <div className=" sha dow-lg md:w-1/2">
            <Lottie options={defaultOptions2} height={400} width={400} />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-start text-left">
            <div className="text-4xl font-bold pb-3">Study Smarter, Not Harder</div>
            <p className="font-medium text-lg">Get a study plan that adapts to your strengths and weaknesses, ensuring maximum efficiency in your preparation.</p>
            <ul className="custom-list text-left pt-4 text-lg">
              <li>Customized learning paths.</li>
              <li>Dynamic adjustments to fit your pace.</li>
              <li>Targeted exercises to boost weak areas.</li>
            </ul>
            <Button
              variant="orange"
              text='Learn More'
              style={{ marginTop: "1rem" }}
            />

          </div>
        </div>
        <div className="flex md:hidden flex-col md:flex-row md:justify-center md:items-center">
          <div className="md:w-1/2">
            <div className="text-4xl font-bold pb-3">A Study Plan Built Just for You</div>
            Recommendations based on your strengths and weaknesses. <br />
            Real-time adjustments to match your learning pace. <br />
            Access to updated examples and targeted exercises.
          </div>
          <div className=" sha dow-lg md:w-1/2">
            <Lottie options={defaultOptions3} height={400} width={400} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-center md:items-center">
          <div className="md:w-1/2 flex flex-col justify-center items-start text-left">
            <div className="text-4xl font-bold pb-3">Track Your Progress Like Never Before</div>
            <p className="font-medium text-lg">Visualize your growth with detailed analytics, weekly reports, and actionable insights to stay on top of your preparation.</p>
            <ul className="custom-list text-left pt-4 text-lg">
              <li>Detailed performance analytics with easy-to-read graphs.</li>
              <li>Per exam progress reports to keep you motivated.</li>
              <li>Thousands of exams to choose from</li>
            </ul>
            <Button
              variant="orange"
              text='Start Now'
              style={{ marginTop: "1rem" }}
            />
          </div>
          <div className="bg-white rounded-md sha dow-lg md:w-1/2">
            <Lottie options={defaultOptions3} height={400} width={400} />
          </div>
        </div>
      </div>
    </section>
  );
}
