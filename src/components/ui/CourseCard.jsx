/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
// import UpgradePlan from "../UpgradePlan/UpgradePlan";
// import { useModal } from "../../context/ModalProvider";

const Star = ({ filled }) => (
  <span
    style={{
      color: filled ? "#F9943B" : "#ccc",
      fontSize: "20px",
      marginRight: "4px",
    }}
  >
    ★
  </span>
);

export const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        if (index < filledStars) {
          return <Star key={`star-1-${index}`} filled={true} />;
        } else if (index === filledStars && hasHalfStar) {
          return (
            <Star
              key={`star-2-${index}`}
              filled={false}
              style={{ color: "#F9943B" }}
            />
          );
        } else {
          return <Star key={`star-3-${index}`} filled={false} />;
        }
      })}
    </div>
  );
};

export default function CourseCard({
  courseImage,
  authorImage,
  authorName,
  authorRole,
  courseDescription,
  rating,
  timing,
  set_name,
  task_type,
  exam_id,
  section,
  userId,
  status,
}) {
  const navigate = useNavigate();

  // const { activeModal, openModal, closeModal } = useModal();

  const enterFullScreen = () => {
    const doc = document.documentElement;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) {
      // Firefox
      doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) {
      // Chrome and Safari
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      // Internet Explorer
      doc.msRequestFullscreen();
    }
  };

  // const handleExam = () => {
  //   if (set_name.includes('exam_set')) {
  //     navigate(`/dashboard/practice2`, {
  //       state: {
  //         set_name: set_name,
  //         task_type: task_type,
  //         time: timing,
  //         exam_id: exam_id,
  //         user_id: userId,
  //         status: status,
  //       },
  //     });
  //     enterFullScreen();
  //   } else {
  //     navigate(`/dashboard/practice`, {
  //       state: {
  //         set_name: set_name,
  //         task_type: task_type,
  //         time: timing,
  //         exam_id: exam_id,
  //         user_id: userId,
  //         status: status,
  //       },
  //     });
  //     enterFullScreen();
  //   }
  // }

  return (
    <div
      className={`rounded-xl shadow-courses m-2 ${status == "True" ? "bg-white" : "bg-zinc-200"
        } ${section === "exploretests" ? "" : "my-6"} h-full`}
    >
      <div className="p-3">
        <img
          src={courseImage}
          alt="coursecard"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div className="border-b-[1px] border-gray-300 w-full" />
      <div className="p-3 h-full">
        <div className="pb-5 flex justify-between items-center">
          <div className="flex gap-2 items-center justify-start">
            <img
              src={authorImage}
              alt="profile"
              className="rounded-full h-12 w-12 border-[2px] border-primary-orange"
            />
            <div className="text-xs">
              <div className="font-semibold">{authorName}</div>
              <div className="text-xs">{authorRole}</div>
            </div>
          </div>
          <div
            className={`cursor-pointer ${section === "exploretests" ? "hidden" : ""
              }`}
          >
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
        <div className="text-[11px] pb-3">{courseDescription}</div>
        <div className="flex items-center justify-between">
          <StarRating rating={rating} />
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
            <span className="text-xs">{timing}</span>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-gray-300 w-full" />
      <div className="px-3 py-4 flex justify-between items-center">
        {status == "False" ? (
          <Button
            variant={"blueOutlineCourse"}
            text="Upgrade Now"
            onClick={() =>
              navigate('/dashboard/subscription')
            }
          />
        ) : (
          <Button
            disabled={status == "False"}
            variant={"blueOutlineCourse"}
            text="Get Started"
            onClick={() => {
              navigate(`/dashboard/practice`, {
                state: {
                  set_name: set_name,
                  task_type: task_type,
                  time: timing,
                  exam_id: exam_id,
                  user_id: userId,
                  status: status,
                },
              });
              enterFullScreen();
            }}
          />
        )}

        {/* {activeModal === 'upgradeplan' && <UpgradePlan closeModal={closeModal} />} */}
      </div>
    </div>
  );
}
