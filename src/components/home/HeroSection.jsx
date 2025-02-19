import React, { useContext } from "react";
import heroBg from "../../images/hero-bg.png";
import Button from "../ui/Button";
import scrollToSection from "../reusableFunctions/scrollToSection";
import { UserContext } from "../../context/userContext";
import { Element } from "react-scroll";
import { useModal } from "../../context/ModalProvider";
import CountUp from "react-countup";

export default function HeroSection() {
  const { user } = useContext(UserContext);
  const { openModal } = useModal();
  return (
    <Element name="section1">
      <section id="hero__section" className="relative mt-[55px]">
        <div className="bg-primary-blue">
          <div className="flex md:flex-row flex-col items-center gap-10 mx-auto p-web container">
            <div className="w-full font-bold text-white lg:text-[3.75rem] text-4xl text-center md:leading-snug">
              <div className="md:pt-10 lg:pt-20 pb-10 md:text-[3.5rem] lg:text-7xl">Revolutionize Exam Prep <br /> with <br /> Studybot AI</div>
              <p className="font-medium md:text-xl lg:text-2xl"> Experience smarter preparation with personalized feedback,<br /> adaptive learning, and performance tracking <br />your ultimate exam companion</p>

              <div className="flex justify-center items-center gap-4 pt-10">
                {!user && (
                  <Button
                    variant={"orange"}
                    text="Try Studybot Free"
                    onClick={() => {
                      if (!user) {
                        openModal('signup')
                      }
                    }}
                  />
                )}
                <Button
                  variant={"orange"}
                  text="Watch Demo"
                  onClick={() => scrollToSection("counter")}
                />
              </div>

            </div>

          </div>
        </div>



        <div className="top-[75%] lg:top-[70%] xl:top-[66%] left-[71%] lg:left-[72%] xl:left-[73%] absolute flex flex-col justify-center items-center pt-20 md:pt-0">

          <div className="relative bg-primary-orange mx-auto rounded-full w-[220px] md:w-56 lg:w-72 xl:w-[22rem] h-[220px] md:h-56 lg:h-72 xl:h-[22rem] text-center">
            <div className="flex justify-center items-center mx-auto w-1/2 h-full font-bold text-white md:text-xl lg:text-3xl text-center">
              10000 + Happy Students
            </div>

            {/* Partner Experts */}
            <div className="-top-10 lg:-top-4 left-1/2 lg:left-44 absolute flex flex-col justify-center items-center bg-white shadow-counter p-5 rounded-full w-[80px] lg:w-[5.5rem] xl:w-32 h-[80px] lg:h-[5.5rem] xl:h-32 text-sm">
              <div className="font-bold text-primary-blue text-xl">
                <CountUp start={0} end={300} duration={3} />+
              </div>
              Partner Experts
            </div>

            {/* Accuracy in AI-Analysis */}
            <div className="lg:top-28 bottom-10 -left-10 absolute flex flex-col justify-center items-center bg-white shadow-counter p-5 rounded-full w-[90px] lg:w-[6.5rem] xl:w-32 h-[90px] lg:h-[6.5rem] xl:h-32 text-sm">
              <div className="font-bold text-primary-blue text-xl">
                <CountUp start={0} end={98} duration={5} />%
              </div>
              Accuracy in AI-Analysis
            </div>

            {/* Answers Reviewed */}
            <div className="top-2/3 md:top-40 lg:top-[12.5rem] xl:top-[68%] right-0 md:left-32 lg:left-[12rem] xl:left-[60%] absolute flex flex-col justify-center items-center bg-white shadow-counter p-5 rounded-full w-[100px] xl:w-32 h-[100px] xl:h-32 text-sm">
              <div className="font-bold text-primary-blue text-xl">
                <CountUp start={0} end={50000} duration={2} />+
              </div>
              Answers Reviewed
            </div>
            <div className="hidden top-0 left-0 absolute bg-primary-blue rounded-full w-[30px] h-[30px]" />
            <div className="hidden -bottom-10 left-1/3 absolute bg-primary-blue rounded-full w-[30px] h-[30px]" />
            <div className="hidden top-1/2 -right-10 absolute bg-primary-blue rounded-full w-[30px] h-[30px]" />
          </div>
        </div>


        <img src={heroBg} alt="hero-bg" className="w-full" />
      </section>
    </Element>
  );
}
