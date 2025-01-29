import React, { createContext, useState } from "react";
import about1 from "../../images/about1.jpg";
import about2 from "../../images/about2.jpg";
import about3 from "../../images/about3.jpg";
import AboutCard from "../ui/AboutCard";
import Slider from "react-slick";
import "./aboutus.css";

export const AboutContext = createContext();

export default function AboutUs() {
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
  return (
    <section className="container mx-auto p-web text-center">
      <div className="w-4/5 mx-auto">
        <div className="text-5xl md:text-6xl font-semibold pb-5">ABOUT US</div>
        <p>
          Studybot AI is an AI-powered subjective answer analysis tool that can
          help students to improve their subjective answers and prepare for
          competitive exams better. Studybot AI provides students with feedback
          on their factual accuracy, language consistency, and other important
          parameters.
        </p>
      </div>
      <div className="hidden md:block">
        <AboutContext.Provider value={{ current, setCurrent }}>
          <div className="flex  flex-col py-2 md:flex-row gap-3 items-center justify-center">
            <AboutCard
              src={about1}
              heading={"Get feedback on your subjective answers from AI"}
              description={
                "Studybot AI uses AI to analyze your subjective answers and provide feedback on your factual accuracy, language consistency, and other important parameters."
              }
              className="md:-mt-5"
              id={1}
            />
            <AboutCard
              src={about2}
              heading={
                "Identify areas for improvement and get personalized recommendations"
              }
              description={
                "Once you have received feedback on your answers, Studybot AI will identify areas for improvement and provide you with personalized recommendations. This will help you to focus your preparation and improve your subjective answers"
              }
              className="md:mt-10"
              id={2}
            />
            <AboutCard
              src={about3}
              heading={"Prepare for competitive exams with confidence"}
              description={
                "AI is a valuable tool for students who are preparing for competitive exams that require subjective answers."
              }
              className="md:-mt-5"
              id={3}
            />
          </div>
        </AboutContext.Provider>
      </div>
      <div className="md:hidden relative pt-5">
        <AboutContext.Provider value={{ current, setCurrent }}>
          <Slider {...settings}>
            <AboutCard
              src={about1}
              heading={"Get feedback on your subjective answers from AI"}
              description={
                "Studybot AI uses AI to analyze your subjective answers and provide feedback on your factual accuracy, language consistency, and other important parameters."
              }
              className="md:-mt-5"
              id={1}
            />
            <AboutCard
              src={about2}
              heading={
                "Identify areas for improvement and get personalized recommendations"
              }
              description={
                "Once you have received feedback on your answers, Studybot AI will identify areas for improvement and provide you with personalized recommendations. This will help you to focus your preparation and improve your subjective answers"
              }
              className="md:mt-10"
              id={2}
            />
            <AboutCard
              src={about3}
              heading={"Prepare for competitive exams with confidence"}
              description={
                "AI is a valuable tool for students who are preparing for competitive exams that require subjective answers."
              }
              className="md:-mt-5"
              id={3}
            />
          </Slider>
        </AboutContext.Provider>
      </div>
    </section>
  );
}
