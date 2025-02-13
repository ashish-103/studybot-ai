import React, { useContext } from "react";
import heroBg from "../../images/hero-bg.png";
import Button from "../ui/Button";
import scrollToSection from "../reusableFunctions/scrollToSection";
import { UserContext } from "../../context/userContext";
import { Element } from "react-scroll";
import { useModal } from "../../context/ModalProvider";

export default function HeroSection() {
  const { user } = useContext(UserContext);
  const { openModal } = useModal();
  return (
    <Element name="section1">
      <section id="hero__section" className="mt-[55px]">
        <div className="bg-primary-blue">
          <div className="container mx-auto p-web lg:py-[60px] flex-col flex md:flex-row gap-5">
            <div className="w-full text-white text-center font-bold text-4xl md:leading-snug lg:text-[3.75rem]">
              Revolutionize Exam Prep with Studybot AI<br />
              <p className="text-lg pt-4 font-medium">
                Unlock smarter ways to prepare with AI-driven feedback, personalized learning, and performance tracking.
              </p>
              <div className="flex justify-center items-center gap-4 pt-10">
                {!user && (
                  <Button
                    variant={"orange"}
                    text="Get Started"
                    onClick={() => {
                      if (!user) {
                        openModal('signup')
                      }
                    }}
                  />
                )}
                <Button
                  variant={"orange"}
                  text="Watch a Demo"
                  onClick={() => scrollToSection("counter")}
                />
              </div>
            </div>
          </div>
        </div>
        <img src={heroBg} alt="hero-bg" className="w-full" />
      </section>
    </Element>
  );
}
