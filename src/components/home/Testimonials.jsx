import React from "react";
import TestimonialCard from "../ui/TestimonialCard";
import person from "../../images/person.jpg";
import Marquee from "react-fast-marquee";
import "./testimonials.css";

const Blob = ({ rotate, scale, position }) => {
  return (
    <div
      className={` ${rotate} ${scale} ${position} absolute z-10 h-[150px] w-[150px] rounded-full bg-gradient-to-tr from-primary-orange via-primary-orange to-transparent`}
    />
  );
};

export default function Testimonials() {
  const arr1 = [
    {
      clientImage: { person },
      clientName: "Jane Doe",
      clientRole: "Software Developer",
      rating: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do eiusmod.",
    },
    {
      clientImage: { person },
      clientName: "Jane Doe",
      clientRole: "Software Developer",
      rating: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      clientImage: { person },
      clientName: "Jane Doe",
      clientRole: "Software Developer",
      rating: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      clientImage: { person },
      clientName: "Jane Doe",
      clientRole: "Software Developer",
      rating: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do.",
    },
  ];
  const arr2 = [
    {
      clientImage: { person },
      clientName: "Jane Doe",
      clientRole: "Software Developer",
      rating: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      clientImage: { person },
      clientName: "Jane Doe",
      clientRole: "Software Developer",
      rating: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      clientImage: { person },
      clientName: "Jane Doe",
      clientRole: "Software Developer",
      rating: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do.",
    },
  ];
  return (
    <section className="container mx-auto">
      <div className="bg-white py-[40px] p-web lg:pl-0 lg:pr-[80px] lg:flex flex-col lg:flex-row items-center justify-center relative overflow-hidden">
        <div className="bg-white rounded-3xl lg:py-web lg:flex flex-col lg:flex-row item justify-center lg:h-[100vh] gap-10">
          <div className="w-[50%] h-full hidden lg:block">
            <Marquee
              direction="down"
              id="marquee-left"
              className="bg-white -ml-[120px]"
              speed={30}
            >
              {arr1.map((item) => (
                <TestimonialCard
                  // key={`${item}testimonial1`}
                  key={item.clientName}
                  clientImage={person}
                  clientName={item.clientName}
                  clientRole={item.clientRole}
                  rating={item.rating}
                  content={item.content}
                />
              ))}
            </Marquee>
            <Marquee
              direction="up"
              className="hidden md:block ml-[180px]"
              speed={30}
            >
              {arr2.map((item) => (
                <TestimonialCard
                  // key={`${item}testimonial2`}
                  key={item.clientName}
                  clientImage={person}
                  clientName={item.clientName}
                  clientRole={item.clientRole}
                  rating={item.rating}
                  content={item.content}
                />
              ))}
            </Marquee>
          </div>
          <div className="flex flex-col justify-center items-center pb-10 lg:pb-0">
            <div className="lg:w-1/2 text-5xl md:text-6xl font-semibold pb-5 mb-5 border-b-[10px] border-primary-orange">
              WHAT PEOPLE SAY ABOUT US
            </div>
            <p className="lg:w-1/2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="lg:hidden">
            <Marquee>
              {arr1.map((item, index) => (
                <TestimonialCard
                  // key={`${item}testimonial3`}
                  key={index}
                  clientImage={person}
                  clientName={item.clientName}
                  clientRole={item.clientRole}
                  rating={item.rating}
                  content={item.content}
                />
              ))}
            </Marquee>
          </div>
        </div>
        <Blob
          rotate={"rotate-90"}
          scale="scale-[0.9]"
          position={"bottom-[40px] right-0 hidden lg:block"}
        />
        <Blob
          rotate={"rotate-180"}
          scale="scale-[0.9]"
          position={"top-[10px] right-[100px] hidden xl:block"}
        />
      </div>
    </section>
  );
}
