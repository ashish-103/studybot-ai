import React, { useContext } from "react";
import heroBg from "../../images/hero-bg.png";
import Button from "../ui/Button";
import scrollToSection from "../reusableFunctions/scrollToSection";
import { UserContext } from "../../context/userContext";
import { Element } from "react-scroll";
import { useModal } from "../../context/ModalProvider";

export default function HeroSection({ toggleSubmitModal, closeMenu }) {
  const { user } = useContext(UserContext);
  const { openModal } = useModal();
  return (
    <Element name="section1">
      <section id="hero__section" className="mt-[55px]">
        <div className="bg-primary-blue">
          <div className="container mx-auto p-web lg:py-[60px] flex-col flex md:flex-row gap-5">
            <div className="w-full text-white text-center font-bold text-4xl md:leading-snug lg:text-[3.75rem]">
              Unlock the Power of AI for Smarter Learning and Exam Preparation
              <br />
              <p className="text-lg pt-4 font-medium">
                Transform the way you learn with AI-driven insights, feedback,
                and personalized support for your competitive and academic exams
              </p>
              <div className="flex justify-center items-center gap-4 pt-10">
                {!user && (
                  <Button
                    variant={"orange"}
                    text="Get Started"
                    onClick={() => {
                      if (!user) {
                        // toggleSubmitModal();
                        // closeMenu();
                        openModal('signup')
                      }
                    }}
                  />
                )}
                <Button
                  variant={"orange"}
                  text="How it works"
                  onClick={() => scrollToSection("features")}
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
