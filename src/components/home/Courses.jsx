/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import CourseCard, { StarRating } from "../ui/CourseCard";
import course from "../../assets/images/ielts.jpg";
import person from "../../images/person.jpg";
import priya from "../../assets/images/priya.png"
import anjali from "../../assets/images/anjali.png"
import vikram from "../../assets/images/vikram.png"
import amit from "../../assets/images/amit.png"
import rajesh from "../../assets/images/rajesh.png"
import "./courses.css";
import { apiCall } from "../../api/login";
import { UserContext } from "../../context/userContext";
import { useModal } from "../../context/ModalProvider";
const Blob = ({ rotate, scale, position }) => {
  return (
    <div
      className={` ${rotate} ${scale} ${position} absolute z-10 h-[150px] w-[150px] rounded-full bg-gradient-to-tr from-primary-orange via-primary-orange to-transparent`}
    />
  );
};

const Arrow = ({ rotate, scale, position }) => (
  <div className={`${rotate} ${scale} ${position}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      height={20}
      width={20}
    >
      <path
        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
        fill="#F9943B"
      />
    </svg>
  </div>
);

export default function Courses() {
  const user_id = localStorage.getItem("user");
  const userID = JSON.parse(user_id);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const { user } = useContext(UserContext);
  const slider = useRef(null);
  const [data, setData] = useState([]);

  const { openModal } = useModal()

  const teachers = [
    {
      name: "Amit Sharma",
      image: amit
    },
    {
      name: "Priya Singh",
      image: priya
    },
    {
      name: "Rajesh Kumar",
      image: rajesh
    },
    {
      name: "Anjali Patel",
      image: anjali
    },
    {
      name: "Vikram Reddy",
      image: vikram
    },
  ];

  const getData = async () => {
    try {
      const response = (await apiCall.get(`get_exam_sets`)).data;

      const dummyArr = response.map((item) => {
        const randomTeacher =
          teachers[Math.floor(Math.random() * teachers.length)];

        return {
          courseImage: item.course,
          authorImage: randomTeacher.image,
          authorName: randomTeacher.name,
          authorRole: "Teacher",
          courseDescription: item.set_name,
          rating: item.rating,
          timing: item.time,
          set_name: item.set_name,
          task_type: item.task_type,
          exam_id: item.exam_id,
          status: item.status,
        };
      });
      setData(dummyArr);
    } catch (error) {
      console.log("error fetching question: ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const maxDots = 8;
  const settings = {
    dots: true,
    lazyLoad: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 2,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // Adjust the width as needed
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Optionally adjust for tablet
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1368, // Optionally adjust for tablet
        settings: {
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => {
      try {
        if (data.length > 0) {
          if (data.length <= maxDots) {
            return <button>{i + 1}</button>;
          }
          if (i < maxDots) {
            return <button>{i + 1}</button>;
          }
          if (i === maxDots) {
            return <span>...</span>;
          }
          return 10;
        }
      } catch (error) { }
    },
    beforeChange: (current, next) => setCurrentSlide(next),
    appendDots: (dots) => {
      return (
        <div
          id="courses-nav"
          className="absolute top-0 rounded-lg flex flex-row items-center justify-center"
        >
          <div
            className="hover:cursor-pointer"
            onClick={() => slider?.current?.slickPrev()}
          >
            <Arrow rotate="rotate-180" position="ml-[-2rem]" />
          </div>
          {/* <ul id="coursesDots" className='m-0 hidden md:block'>{dots.slice(0, maxDots)}</ul> */}
          <ul id="coursesDots" className="m-0 hidden md:hidden">
            {dots.slice(0, maxDots)}
          </ul>
          <div
            className="hover:cursor-pointer"
            onClick={() => slider?.current?.slickNext()}
          >
            <Arrow rotate={""} />
          </div>
        </div>
      );
    },
  };

  return (
    <section className="container mx-auto md:px-[100px]">
      <div className="rounded-2xl p-[50px] md:shadow-2xl relative overflow-hidden text-center md:text-left">
        <div className=" text-5xl md:text-6xl z-20 font-semibold pb-5">
          FEATURED EXAMS
        </div>
        <p className="text-base">
          Studybot AI is an AI-powered subjective answer analysis tool that can
          help students to improve their subjective answers and prepare for
          competitive exams better.
        </p>
        <div className="pt-10 ">
          {Array.isArray(data) && data.length > 0 && (
            <Slider
              {...settings}
              ref={slider}
              className="bg-white z-20 rounded-2xl px-6 pb-10 shadow-courses h-full"
            >
              {data.slice(0, 5).map((item, index) =>
                <div key={index} className="cursor-pointer" onClick={() => openModal('signup')}>
                  <div
                    className={`rounded-xl shadow-courses m-2 h-full my-6`}
                  >
                    <div className="p-3">
                      <img
                        src={course}
                        alt="coursecard"
                        className="h-full w-full rounded-lg"
                      />
                    </div>
                    <div className="border-b-[1px] border-gray-300 w-full" />
                    <div className="p-3 h-full ">
                      <div className="pb-5 flex justify-between items-center">
                        <div className="flex gap-2 items-center justify-start">
                          <img
                            src={item.authorImage}
                            alt="profile"
                            className="rounded-full h-12 w-12 border-[2px] border-primary-orange object-cover"
                          />
                          <div className="text-xs">
                            <div className="font-semibold">
                              {item.authorName}
                            </div>
                            <div className="text-xs">{item.authorRole}</div>
                          </div>
                        </div>
                        <div className={`cursor-pointer`}>
                          <svg
                            className="p-0.5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="#F9943B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-[11px] pb-3">
                        {item.courseDescription}
                      </div>
                      <div className="flex items-center justify-between">
                        <StarRating rating={item.rating} />
                        <div className="flex items-center justify-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="16"
                            height="16"
                            fill="#F9943B"
                          >
                            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                          </svg>
                          <span className="text-xs">{item.timing}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Slider>
          )}
        </div>
        <Blob
          rotate={"rotate-45"}
          scale="scale-[1.8]"
          position={"invisible lg:visible -top-[120px] right-10"}
        />
        <Blob
          rotate={"rotate-90"}
          scale="scale-[1.5]"
          position={"hidden md:block -bottom-20 left-0"}
        />
        <Blob
          rotate={"rotate-180"}
          scale="scale-[1.1]"
          position={"hidden md:block -bottom-10 right-0"}
        />
      </div>
    </section>
  );
}
