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
      <section id="hero__section" className="mt-[55px] relative">
        <div className="bg-primary-blue">
          <div className="container mx-auto p-web flex-col flex md:flex-row items-center gap-10 ">

            <div className="w-full text-white text-center font-bold text-4xl md:leading-snug lg:text-[3.75rem]">
              <div className="text-7xl pt-20 pb-10">Revolutionize Exam Prep <br /> with <br /> Studybot AI</div>
              <p className="text-2xl  font-medium"> Experience smarter preparation with personalized feedback,<br /> adaptive learning, and performance tracking <br />your ultimate exam companion</p>

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

        <div className="md:w-1/2 pt-20 md:pt-0 flex flex-col justify-center items-center absolute lg:top-[31rem] lg:left-[72rem]">
          <div className="w-[220px] h-[220px] md:w-[22rem] md:h-[22rem] mx-auto bg-primary-orange rounded-full relative text-center">
            <div className="text-white flex items-center justify-center mx-auto w-1/2 h-full text-2xl md:text-3xl font-bold text-center">
              10000 + Happy Students
            </div>

            <div className="bg-white shadow-counter rounded-full p-5 h-[80px] w-[80px] md:h-[8rem] md:w-[8rem] absolute -top-10 left-1/2 flex flex-col items-center justify-center text-sm">
              <div className="font-bold text-xl text-primary-blue">
                <CountUp start={0} end={300} duration={3} />+
              </div>
              Partner Experts
            </div>
            <div className="bg-white shadow-counter rounded-full p-5 h-[90px] w-[90px] md:h-[8rem] md:w-[8rem] absolute bottom-10 -left-10 flex flex-col items-center justify-center text-sm">
              <div className="font-bold text-xl text-primary-blue">
                <CountUp start={0} end={98} duration={5} />%
              </div>
              Accuracy in AI-Analysis
            </div>
            <div className="bg-white shadow-counter rounded-full p-5 h-[100px] w-[100px] md:h-[8rem] md:w-[8rem] absolute top-2/3 right-0 flex flex-col items-center justify-center text-sm">
              <div className="font-bold text-xl text-primary-blue">
                <CountUp start={0} end={50000} duration={2} />+
              </div>
              Answers Reviewed
            </div>
            <div className="absolute bg-primary-blue h-[30px] w-[30px] rounded-full top-0 left-0" />
            <div className="absolute bg-primary-blue h-[30px] w-[30px] rounded-full -bottom-10 left-1/3 hidden" />
            <div className="absolute bg-primary-blue h-[30px] w-[30px] rounded-full top-1/2 -right-10" />
          </div>
        </div>
        <img src={heroBg} alt="hero-bg" className="w-full" />
      </section>
    </Element>
  );
}
