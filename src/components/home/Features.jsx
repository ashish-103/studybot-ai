import React, { createContext } from "react";
import "./aboutus.css";
import Button from "../ui/Button";
import { featuresData } from "../../data/data";
import { Element } from "react-scroll";
import scrollToSection from "../reusableFunctions/scrollToSection";

export const AboutContext = createContext();

export default function Features() {
  return (
    <Element name="section2">
      <section id="features" className="container mx-auto p-web text-center">
        <div className="w-4/5 mx-auto">
          <div className="text-5xl md:text-6xl font-semibold pb-5 mt-8">
            How Study Bot AI works
          </div>
        </div>
        <div className="flex flex-col md:flex-row mx-auto gap-4 text-left">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-md shadow-lg md:w-1/4 p-5 hover:scale-[1.03] cursor-pointer transition-transform duration-100"
            >
              <img
                src={feature.image}
                alt={`Feature ${feature.id}`}
                className="rounded-md"
              />
              <div className="text-xl font-bold pt-3 pb-1">{feature.name}</div>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="pt-10">
          <Button
            onClick={() => scrollToSection("all_features")}
            variant={"orange"} text="Discover all features" />
        </div>
      </section>
    </Element>
  );
}
